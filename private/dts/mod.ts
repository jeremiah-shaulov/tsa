/**	This module is for injecting `lib.deno.ns.d.ts` and `lib.deno.unstable.d.ts` to the typescript compiler,
	so they can be given to the `tsa.CompilerOptions.lib` compiler option.

	The compiler doesn't expose public API to allow extra libraries to be available.
	But version `5.8.3` (and maybe others) has 2 private variables that let me hook on the library lookup process:
	- `ts.libMap`
	- `ts.libs`

	This module exports 1 function called `getExtendedLibs()` that when called will try to inject the new libraries to `tsc`.
	Only the library names.
	The contents must be returned in `tsa.CompilerHost.getSourceFile()` when the library is asked by it's filename.

	The `getExtendedLibs()` returns `Record<string, string>` with mapping between the injected library names, and their file paths.
	If couldn't inject, an empty object is returned.

	@module
 **/

import {cache, path} from '../deps.ts';
import {tsa} from '../tsa_ns.ts';

const DENO_LIBS =
[	['deno.ns', 'lib.deno.ns.d.ts'],
	['deno.unstable', 'lib.deno.unstable.d.ts'],
];

/**	I have custom lib files (`DENO_LIBS`), that i want to inject to the tsc.
	I can do this by accessing private variables in the `ts` namespace.
	I will rely on the implementation that i've seen.
	If i'll think that the current `tsc` version allows me to inject the libs, i'll try to do this, and return object with paths mappings for substitution when reading files.

	@param libLocation What `tsa.CompilerHost.getDefaultLibLocation()` returned.
 **/
export async function getExtendedLibs(ts: typeof tsa, libLocation: string)
{	const extendedLibs: Record<string, string> = {};
	if ('libMap' in ts && ts.libMap instanceof Map && 'libs' in ts && Array.isArray(ts.libs) && ts.libMap.has('esnext') && ts.libs.includes('esnext'))
	{	for (const [libName, filename] of DENO_LIBS)
		{	const fileUrl = new URL('dist/'+filename, import.meta.url);
			const localFilename = fileUrl.protocol=='file:' ? path.fromFileUrl(fileUrl) : (await cache(fileUrl)).path;
			if (!ts.libMap.has(libName))
			{	ts.libMap.set(libName, filename);
				ts.libs.push(libName);
			}
			extendedLibs[path.toFileUrl(path.join(libLocation, filename)).href] = localFilename;
		}
	}
	return extendedLibs;
}
