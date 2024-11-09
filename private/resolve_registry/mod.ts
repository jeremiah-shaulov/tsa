import {resolveJsr} from './private/resolve_jsr.ts';
import {resolveNpm} from './private/resolve_npm.ts';

export async function resolveRegistry(specifier: string)
{	if (specifier.startsWith('jsr:') || specifier.startsWith('https://jsr.io/@'))
	{	return await resolveJsr(specifier);
	}
	else if (specifier.startsWith('npm:'))
	{	return await resolveNpm(specifier);
	}
}
