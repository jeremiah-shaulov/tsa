import {tsa} from './tsa_ns.ts';
import {cache, LoadResponse, resolveImportMap, path, resolveModuleSpecifier} from './deps.ts';
import {getNpmFilename} from './npm.ts';
import {isUrl} from './util.ts';

type Resolve = (specifier: string, referrer: string) => string | Promise<string>;
type Load = (specifier: string, isDynamic: boolean) => LoadResponse | undefined | Promise<LoadResponse|undefined>;
type CreateSourceFile = (this: typeof tsa, origSpecifier: string, content: string, scriptKind: tsa.ScriptKind) => tsa.SourceFile;

export type LoadOptions =
{	/** An optional URL or path to an import map to be loaded and used to resolve
		module specifiers.

		When a `resolve()` function is also specified, a warning will be issued
		and the import map will be used instead of the `resolve()` function.
	 **/
	importMap?: string | URL;

	/** An optional callback that allows the default resolution logic of the
		module graph to be "overridden". This is intended to allow items like an
		import map to be used with the module graph. The callback takes the string
		of the module specifier from the referrer and the string URL of the
		referrer. The callback then returns a resolved URL string specifier.

		If an `importMap` is also specified, a warning will be issued and the
		import map will be used.
	 **/
	resolve?: Resolve;

	/**	An optional callback that is called with the URL string of the resource to
		be loaded and a flag indicating if the module was required dynamically. The
		callback should resolve with a `LoadResponse` or `undefined` if the module
		is not found. If there are other errors encountered, a rejected promise
		should be returned.

		This defaults to a load function which will use `fetch()` and
		`Deno.readFile()` to load modules, and requires the appropriate permissions
		to function. If the permissions are note available at startup, the default
		function will prompt for them.

		@param specifier The URL string of the resource to be loaded and resolved
		@param isDynamic A flag that indicates if the module was being loaded
		                 dynamically
	 **/
	load?: Load;

	/**	Hook on creation `tsa.SourceFile` object from source code string.
		The default implementation is:
		```ts
		function defaultCreateSourceFile(origSpecifier: string, content: string, scriptKind: tsa.ScriptKind)
		{	return tsa.createSourceFile(origSpecifier, content, scriptKind==tsa.ScriptKind.JSON ? tsa.ScriptTarget.JSON : tsa.ScriptTarget.Latest, undefined, scriptKind);
		}
		```
	 **/
	createSourceFile?: CreateSourceFile;
};

export class Loader
{	#useResolve: Resolve;
	#useLoad: Load;
	#useCreateSourceFile: CreateSourceFile;
	#resolved = new Map<string, Map<string, string>>;

	static async inst(loadOptions?: LoadOptions)
	{	const importMap = loadOptions?.importMap;
		const resolve = loadOptions?.resolve;
		if (importMap && resolve)
		{	console.error(`Both importMap and resolve() are set`);
		}
		const load = loadOptions?.load;
		const useLoad = load ?? defaultLoad;
		const useResolve = !importMap ? (resolve ?? defaultResolve) : await getResolveWithImportMap(importMap, useLoad);
		const useCreateSourceFile = loadOptions?.createSourceFile ?? defaultCreateSourceFile;
		return new Loader(useResolve, useLoad, useCreateSourceFile);
	}

	protected constructor(useResolve: Resolve, useLoad: Load, useCreateSourceFile: CreateSourceFile)
	{	this.#useResolve = useResolve;
		this.#useLoad = useLoad;
		this.#useCreateSourceFile = useCreateSourceFile;
	}

	/**	Resolve, and remember how it was resolved.
		Later `resolved()` can return this synchronously.
	 **/
	async resolve(specifier: string, referrer: string)
	{	const result = await this.#useResolve(specifier, referrer);
		let byReferrer = this.#resolved.get(referrer);
		if (!byReferrer)
		{	byReferrer = new Map;
			this.#resolved.set(referrer, byReferrer);
		}
		byReferrer.set(specifier, result);
		return result;
	}

	load(specifier: string, isDynamic: boolean)
	{	return this.#useLoad(specifier, isDynamic);
	}

	/**	Synchronously get something that has already been resolved in the past with `resolve()`.
	 **/
	resolved(specifier: string, referrer: string)
	{	return this.#resolved.get(referrer)?.get(specifier) ?? defaultResolveSync(specifier, referrer);
	}

	createSourceFile(ts: typeof tsa, origSpecifier: string, content: string, scriptKind: tsa.ScriptKind)
	{	return this.#useCreateSourceFile.call(ts, origSpecifier, content, scriptKind);
	}
}

/**	Get function that will resolve things according to import map.
 **/
async function getResolveWithImportMap(importMapUrlOrStr: string|URL, load: Load)
{	const cwd = path.toFileUrl(await Deno.realPath(Deno.cwd())).href + '/';
	const importMapUrl = typeof(importMapUrlOrStr)!='string' ? importMapUrlOrStr : isUrl(importMapUrlOrStr) ? new URL(importMapUrlOrStr) : new URL(await defaultResolve(importMapUrlOrStr, cwd));
	const importMapResult = await load(importMapUrl.href, false);
	if (importMapResult?.kind != 'module')
	{	throw new Deno.errors.NotFound(`Import map not found: ${importMapUrl.href}`);
	}
	const importMap = resolveImportMap(JSON.parse(importMapResult.content), importMapUrl);
	return function(specifier: string, referrer: string)
	{	try
		{	return resolveModuleSpecifier(specifier, importMap, new URL(referrer));
		}
		catch
		{	return defaultResolve(specifier, referrer);
		}
	};
}

export async function defaultResolve(specifier: string, referrer: string)
{	if (specifier.startsWith('npm:'))
	{	const result = await getNpmFilename(specifier);
		if (result)
		{	return result.specifier;
		}
	}
	return defaultResolveSync(specifier, referrer);
}

function defaultResolveSync(specifier: string, referrer: string)
{	try
	{	return new URL(specifier, new URL(referrer)).href;
	}
	catch
	{	// URL fails for 'npm:' schema
		const prefix = 'http://http/';
		const {href} = new URL(specifier, prefix+referrer);
		return href.startsWith(prefix) ? href.slice(prefix.length) : href;
	}
}

export async function defaultLoad(specifier: string, _isDynamic: boolean): Promise<LoadResponse|undefined>
{	let filename;
	let headers;
	if (specifier.startsWith('npm:'))
	{	const result = await getNpmFilename(specifier);
		if (!result)
		{	return {kind: 'external', specifier};
		}
		filename = result.fileUrl;
		specifier = result.specifier;
	}
	else if (specifier.startsWith('node:'))
	{	return {kind: 'external', specifier};
	}
	else if (!specifier.startsWith('file://'))
	{	const result = await cache(specifier);
		specifier = result.url.href;
		headers = result.meta.headers;
		filename = result.path;
	}
	else
	{	filename = new URL(specifier);
	}
	return {
		kind: 'module',
		specifier,
		headers,
		content: await Deno.readTextFile(filename),
	};
}

function defaultCreateSourceFile(this: typeof tsa, origSpecifier: string, content: string, scriptKind: tsa.ScriptKind)
{	// deno-lint-ignore no-this-alias
	const ts = this;
	return ts.createSourceFile(origSpecifier, content, scriptKind==ts.ScriptKind.JSON ? ts.ScriptTarget.JSON : ts.ScriptTarget.Latest, undefined, scriptKind);
}
