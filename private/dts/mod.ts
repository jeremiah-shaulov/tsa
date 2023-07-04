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
 **/
export async function getExtendedLibs(ts: typeof tsa, libLocation: string)
{	const extendedLibs: Record<string, string> = {};
	if ('libMap' in ts && ts.libMap instanceof Map && 'libs' in ts && Array.isArray(ts.libs) && ts.libMap.size==ts.libs.length && ts.libMap.has('esnext'))
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
