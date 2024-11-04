import {tsa} from './tsa_ns.ts';
import {cache, LoadResponse, resolveImportMap, path, resolveModuleSpecifier} from './deps.ts';
import {getNpmFilename} from './npm.ts';
import {isUrl} from './util.ts';

type Resolve = (specifier: string, referrer: string) => string | Promise<string>;
type Load = (specifier: string, isDynamic: boolean) => LoadResponse | undefined | Promise<LoadResponse|undefined>;
type CreateSourceFile = (this: typeof tsa, origSpecifier: string, content: string, scriptKind: tsa.ScriptKind) => tsa.SourceFile;

/**	You can pass `LoadOptions`
	to {@link tsa.createTsaProgram()} that allow to configure the way modules are resolved and loaded.

	For example `LoadOptions` allow to substitute source code of a module during loading.

	```ts
	// To run this example:
	// deno run --allow-env --allow-net --allow-read --allow-write example.ts

	import {tsa, defaultLoad, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.25/mod.ts';

	const DOCS_FOR = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)
	const OUT_FILE = '/tmp/doc.json';

	// Create typescript program
	const program = await tsa.createTsaProgram
	(	[DOCS_FOR],
		{	declaration: true,
			emitDeclarationOnly: true,
		},
		{	async load(specifier, isDynamic)
			{	// Load the module contents
				const result = await defaultLoad(specifier, isDynamic);
				// If the module was found, substitute it's contents
				if (result?.kind == 'module')
				{	result.content =
					`	/**	Example module.
							@module
						 **\/
						${result.content}
					`;
				}
				// Return the result
				return result;
			}
		}
	);

	// Print errors and warnings (if any)
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Generate the docs
	const docNodes = program.emitDoc();

	// Save the docs to file
	await Deno.writeTextFile(OUT_FILE, JSON.stringify(docNodes, undefined, '\t'));

	// Print the number of `docNodes` written
	console.log('%c%d doc-nodes %cwritten to %s', 'color:green', docNodes.length, '', OUT_FILE);
	```

	In the following example i use fake input file:

	```ts
	import {tsa, defaultResolve, defaultLoad, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.25/mod.ts';

	const INPUT =
	`	/**	The main function.
		**\/
		export function main()
		{	return 0;
		}
	`;

	// Create typescript program
	const fakeInputFilename = 'main.ts';
	const program = await tsa.createTsaProgram
	(	[fakeInputFilename],
		{	declaration: true,
			emitDeclarationOnly: true,
		},
		{	resolve(specifier, referrer)
			{	if (specifier == fakeInputFilename)
				{	return specifier;
				}
				return defaultResolve(specifier, referrer);
			},
			async load(specifier, isDynamic)
			{	if (specifier == fakeInputFilename)
				{	return {kind: 'module', specifier, content: INPUT, headers: {'content-type': 'application/typescript'}};
				}
				return await defaultLoad(specifier, isDynamic);
			}
		}
	);

	// Print errors and warnings (if any)
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Generate the docs
	const docNodes = program.emitDoc();

	// Print the docs
	console.log(JSON.stringify(docNodes, undefined, '\t'));
	```
 **/
export type LoadOptions =
{	/** An optional URL or path to an import map to be loaded and used to resolve module specifiers.
		If both `importMap` and `resolve()` are specified, the `importMap` will be preferred.
	 **/
	importMap?: string | URL;

	/** An optional callback that allows the default resolution logic of the module graph to be "overridden".
		This is intended to allow items like an import map to be used with the module graph.
		The callback takes the string of the module specifier, as it appears in `import from` or `export from`, and the string URL of the module where this import is found.
		The callback then returns a resolved URL to the module file.
	 **/
	resolve?: Resolve;

	/**	An optional callback that is called with the URL string of the resource to be loaded.
		The callback should return a `LoadResponse` or `undefined` if the module is not found.
		If there are other errors encountered, a rejected promise should be returned.

		@param specifier The URL string of the resource to be loaded and resolved
		@param isDynamic A flag that indicates if the module was being loaded dynamically
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
