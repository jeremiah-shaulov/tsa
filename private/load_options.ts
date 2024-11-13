import {tsa} from './tsa_ns.ts';
import {cache, LoadResponse, resolveImportMap, path, resolveModuleSpecifier} from './deps.ts';
import {resolveRegistry} from './resolve_registry/mod.ts';
import {isUrl, readTextFile} from './util.ts';

type Resolve = (specifier: string, referrer: string, emitDeclarationOnly: boolean, host: tsa.CompilerHost) => string | Promise<string>;
type Load = (specifier: string, isDynamic: boolean, emitDeclarationOnly: boolean, host: tsa.CompilerHost) => LoadResponse | undefined | Promise<LoadResponse|undefined>;
type CreateSourceFile = (this: typeof tsa, origSpecifier: string, content: string, scriptKind: tsa.ScriptKind) => tsa.SourceFile;

/**	You can pass `LoadOptions`
	to {@link tsa.createTsaProgram()} that allow to configure the way modules are resolved and loaded.

	For example `LoadOptions` allow to substitute source code of a module during loading.

	```ts
	// To run this example:
	// deno run --allow-env --allow-net --allow-read --allow-write example.ts

	import {tsa, defaultLoad, printDiagnostics} from '../mod.ts';

	const DOCS_FOR = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)
	const OUT_FILE = '/tmp/doc.json';

	// Create typescript program
	const program = await tsa.createTsaProgram
	(	[DOCS_FOR],
		{	declaration: true,
			emitDeclarationOnly: true,
		},
		{	async load(specifier, isDynamic, emitDeclarationOnly, host)
			{	// Load the module contents
				const result = await defaultLoad(specifier, isDynamic, emitDeclarationOnly, host);
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
	await Deno.writeTextFile(OUT_FILE, JSON.stringify(docNodes.nodes, undefined, '\t'));

	// Print the number of `docNodes` written
	console.log('%c%d doc-nodes %cwritten to %s', 'color:green', docNodes.nodes.length, '', OUT_FILE);
	```

	In the following example i use fake input file:

	```ts
	import {tsa, defaultResolve, defaultLoad, printDiagnostics} from '../mod.ts';

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
			async load(specifier, isDynamic, emitDeclarationOnly, host)
			{	if (specifier == fakeInputFilename)
				{	return {kind: 'module', specifier, content: INPUT, headers: {'content-type': 'application/typescript'}};
				}
				return await defaultLoad(specifier, isDynamic, emitDeclarationOnly, host);
			}
		}
	);

	// Print errors and warnings (if any)
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Generate the docs
	const docNodes = program.emitDoc();

	// Print the docs
	console.log(JSON.stringify(docNodes.nodes, undefined, '\t'));
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

		@param specifier The URL string of the resource to be loaded
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
{	#useResolve;
	#useLoad;
	#useCreateSourceFile;
	#emitDeclarationOnly;
	#host;
	#resolved = new Map<string, Map<string, string>>;

	static async inst(loadOptions?: LoadOptions, emitDeclarationOnly=false, host?: tsa.CompilerHost)
	{	if (!host)
		{	host = tsa.createCompilerHost({});
		}
		const importMap = loadOptions?.importMap;
		const resolve = loadOptions?.resolve;
		if (importMap && resolve)
		{	console.error(`Both importMap and resolve() are set`);
		}
		const load = loadOptions?.load;
		const useLoad = load ?? defaultLoad;
		const useResolve = !importMap ? (resolve ?? defaultResolve) : await getResolveWithImportMap(importMap, useLoad, emitDeclarationOnly, host);
		const useCreateSourceFile = loadOptions?.createSourceFile ?? defaultCreateSourceFile;
		return new Loader(useResolve, useLoad, useCreateSourceFile, emitDeclarationOnly, host);
	}

	protected constructor(useResolve: Resolve, useLoad: Load, useCreateSourceFile: CreateSourceFile, emitDeclarationOnly: boolean, host: tsa.CompilerHost)
	{	this.#useResolve = useResolve;
		this.#useLoad = useLoad;
		this.#useCreateSourceFile = useCreateSourceFile;
		this.#emitDeclarationOnly = emitDeclarationOnly;
		this.#host = host;
	}

	/**	Resolve specifier (something that appears in `import ... from`) to final URL.
		The result of resolution will be memorized, and later {@link resolved()} can return it synchronously.
	 **/
	async resolve(specifier: string, referrer: string)
	{	let byReferrer = this.#resolved.get(referrer);
		if (!byReferrer)
		{	byReferrer = new Map;
			this.#resolved.set(referrer, byReferrer);
		}
		let result = byReferrer.get(specifier);
		if (!result)
		{	result = await this.#useResolve(specifier, referrer, this.#emitDeclarationOnly, this.#host);
			byReferrer.set(specifier, result);
		}
		return result;
	}

	load(specifier: string, isDynamic: boolean)
	{	return this.#useLoad(specifier, isDynamic, this.#emitDeclarationOnly, this.#host);
	}

	/**	Synchronously get something that has already been resolved in the past with `resolve()`.
	 **/
	resolved(specifier: string, referrer: string)
	{	return this.#resolved.get(referrer)?.get(specifier) ?? defaultResolveSync(specifier, referrer, this.#emitDeclarationOnly, this.#host);
	}

	createSourceFile(ts: typeof tsa, origSpecifier: string, content: string, scriptKind: tsa.ScriptKind)
	{	return this.#useCreateSourceFile.call(ts, origSpecifier, content, scriptKind);
	}
}

/**	Get function that will resolve things according to import map.
 **/
async function getResolveWithImportMap(importMapUrlOrStr: string|URL, load: Load, emitDeclarationOnly: boolean, host: tsa.CompilerHost)
{	const cwd = path.toFileUrl(host.realpath!(host.getCurrentDirectory())).href + '/';
	const importMapUrl = typeof(importMapUrlOrStr)!='string' ? importMapUrlOrStr : isUrl(importMapUrlOrStr) ? new URL(importMapUrlOrStr) : new URL(await defaultResolve(importMapUrlOrStr, cwd, emitDeclarationOnly, host));
	const importMapResult = await load(importMapUrl.href, false, emitDeclarationOnly, host);
	if (importMapResult?.kind != 'module')
	{	throw new Deno.errors.NotFound(`Import map not found: ${importMapUrl.href}`);
	}
	const importMap = resolveImportMap(JSON.parse(importMapResult.content), importMapUrl);
	return function(specifier: string, referrer: string)
	{	try
		{	return resolveModuleSpecifier(specifier, importMap, new URL(referrer));
		}
		catch
		{	return defaultResolve(specifier, referrer, emitDeclarationOnly, host);
		}
	};
}

export async function defaultResolve(specifier: string, referrer: string, emitDeclarationOnly: boolean, host: tsa.CompilerHost)
{	const result = await resolveRegistry(specifier, emitDeclarationOnly, host);
	if (result)
	{	return result.specifier;
	}
	return defaultResolveSync(specifier, referrer, emitDeclarationOnly, host);
}

function defaultResolveSync(specifier: string, referrer: string, _emitDeclarationOnly: boolean, _host: tsa.CompilerHost)
{	try
	{	return new URL(specifier, new URL(referrer)).href;
	}
	catch
	{	// `URL` fails for schemas like 'npm:'
		const prefix = 'http://http/';
		const {href} = new URL(specifier, prefix+referrer);
		return href.startsWith(prefix) ? href.slice(prefix.length) : href;
	}
}

export async function defaultLoad(specifier: string, _isDynamic: boolean, emitDeclarationOnly: boolean, host: tsa.CompilerHost): Promise<LoadResponse|undefined>
{	let filename;
	let headers;
	if (specifier.startsWith('npm:'))
	{	const result = await resolveRegistry(specifier, emitDeclarationOnly, host);
		if (!result)
		{	return {kind: 'external', specifier};
		}
		filename = path.fromFileUrl(result.fileUrl);
		specifier = result.specifier;
	}
	else if (specifier.startsWith('node:'))
	{	return {kind: 'external', specifier};
	}
	else if (specifier.startsWith('file://'))
	{	filename = path.fromFileUrl(specifier);
	}
	else
	{	const result = await cache(specifier);
		specifier = result.url.href;
		headers = result.meta.headers;
		filename = result.path;
	}
	const content = readTextFile(host, filename);
	return {
		kind: 'module',
		specifier,
		headers,
		content,
	};
}

function defaultCreateSourceFile(this: typeof tsa, origSpecifier: string, content: string, scriptKind: tsa.ScriptKind)
{	// deno-lint-ignore no-this-alias
	const ts = this;
	return ts.createSourceFile(origSpecifier, content, scriptKind==ts.ScriptKind.JSON ? ts.ScriptTarget.JSON : ts.ScriptTarget.Latest, undefined, scriptKind);
}
