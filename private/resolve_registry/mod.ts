import {resolveJsr} from './private/resolve_jsr.ts';
import {resolveNpm} from './private/resolve_npm.ts';

const known = new Map<string, {fileUrl: URL, specifier: string}|null>;

const enum Reg
{	None,
	Jsr,
	Npm,
}

export async function resolveRegistry(specifier: string)
{	const reg = specifier.startsWith('jsr:') ? Reg.Jsr : specifier.startsWith('npm:') ? Reg.Npm : Reg.None;
	if (reg != Reg.None)
	{	let result = known.get(specifier);
		if (result == undefined)
		{	if (reg == Reg.Jsr)
			{	result = await resolveJsr(specifier);
			}
			else
			{	result = await resolveNpm(specifier);
			}
			known.set(specifier, result ?? null);
			if (result)
			{	known.set(result.specifier, result ?? null);
			}
		}
		return result ?? undefined;
	}
}
