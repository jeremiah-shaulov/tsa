import {cache, LoadResponse, resolveImportMap, path, resolveModuleSpecifier} from './deps.ts';
import {isUrl} from './util.ts';

type Resolve = (specifier: string, referrer: string) => string;
type Load = (specifier: string, isDynamic: boolean) => Promise<LoadResponse|undefined>;

export type LoadOptions =
{	/** An optional URL or path to an import map to be loaded and used to resolve
		module specifiers.

		When a `resolve()` function is also specified, a warning will be issued
		and the import map will be used instead of the `resolve()` function.
	 **/
	importMap?: string|URL;

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
};

export class Loader
{	protected constructor(public load: Load, public resolve: Resolve)
	{
	}

	static async inst(loadOptions?: LoadOptions)
	{	const useLoad = loadOptions?.load ?? load;
		return new Loader(useLoad, await getResolve(useLoad, loadOptions?.importMap, loadOptions?.resolve));
	}
}

async function getResolve(load: Load, importMapUrlOrStr?: string|URL, resolve?: LoadOptions['resolve'])
{	if (!importMapUrlOrStr)
	{	return resolve ??
		(	(specifier: string, referrer: string) =>
			{	return hrefWithBase(specifier, new URL(referrer));
			}
		);
	}
	const importMapUrl = typeof(importMapUrlOrStr)!='string' ? importMapUrlOrStr : isUrl(importMapUrlOrStr) ? new URL(importMapUrlOrStr) : path.toFileUrl(await Deno.realPath(importMapUrlOrStr));
	const importMapResult = await load(importMapUrl.href, false);
	if (importMapResult?.kind != 'module')
	{	throw new Deno.errors.NotFound(`Import map not found: ${importMapUrl.href}`);
	}
	const importMap = resolveImportMap(JSON.parse(importMapResult.content), importMapUrl);
	if (resolve)
	{	console.error(`Both importMap and resolve() are set`);
	}
	return (specifier: string, referrer: string) =>
	{	try
		{	return resolveModuleSpecifier(specifier, importMap, new URL(referrer));
		}
		catch
		{	return hrefWithBase(specifier, new URL(referrer));
		}
	};
}

function hrefWithBase(specifier: string, referrerUrl: URL)
{	try
	{	return new URL(specifier, referrerUrl).href;
	}
	catch
	{	// URL fails for 'npm:' schema
		const prefix = 'http://http/';
		return new URL(specifier, prefix+referrerUrl).href.slice(prefix.length);
	}
}

export async function load(specifier: string, _isDynamic: boolean): Promise<LoadResponse|undefined>
{	if (specifier.startsWith('node:') || specifier.startsWith('npm:'))
	{	return {kind: 'external', specifier};
	}
	const result = specifier.startsWith('file://') ? undefined : await cache(specifier);
	return {
		kind: 'module',
		specifier: result?.url.href ?? specifier,
		headers: result?.meta.headers,
		content: await Deno.readTextFile(result?.path ?? new URL(specifier)),
	};
}
