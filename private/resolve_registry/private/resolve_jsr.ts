import {cache, path} from '../../deps.ts';

// deno-lint-ignore no-explicit-any
type Any = any;

export async function resolveJsr(specifier: string)
{	const parsed = parseJsrSpecifier(specifier);
	if (parsed)
	{	const {packageUrl, versionQuery, entryPointQuery} = parsed;
		const meta = await getMeta(packageUrl);
		const version = metaChooseVersion(meta, versionQuery);
		if (!version)
		{	throw new Error(`Version ${version} is not found in: ${packageUrl}`);
		}
		const versionMeta = await getMeta(packageUrl, version);
		const entryPoint = versionMetaChooseEntryPoint(versionMeta, entryPointQuery);
		if (!entryPoint)
		{	throw new Error(`Path ${JSON.stringify(entryPoint)} is not found in: ${packageUrl}${version}`);
		}
		const specifier = packageUrl + version + entryPoint;
		const {path: filename} = await cache(specifier);
		return {specifier, fileUrl: path.toFileUrl(filename)};
	}
}

const RE_JSR_NAME_SAN = /^[a-z0-9\-]{2,64}$/;

function parseJsrSpecifier(specifier: string)
{	if (specifier.startsWith('jsr:@'))
	{	const pos = specifier.indexOf('/', 5);
		if (pos != -1)
		{	const scope = specifier.slice(5, pos);
			const pos2 = specifier.indexOf('/', pos+1);
			const packageAndVersion = specifier.slice(pos+1, pos2==-1 ? specifier.length : pos2);
			const entryPointQuery = pos2==-1 ? '' : specifier.slice(pos2+1);
			const pos3 = packageAndVersion.indexOf('@');
			const packageName = pos3==-1 ? packageAndVersion : packageAndVersion.slice(0, pos3);
			const versionQuery = pos3==-1 ? '' : packageAndVersion.slice(pos3+1);
			if (RE_JSR_NAME_SAN.test(scope) && RE_JSR_NAME_SAN.test(packageName))
			{	const packageUrl = `https://jsr.io/@${scope}/${packageName}/`;
				return {packageUrl, versionQuery, entryPointQuery};
			}
		}
	}
}

async function getMeta(packageUrl: string, version='')
{	const metaUrl = !version ? packageUrl+'meta.json' : packageUrl+version+'_meta.json';
	const {path: metaPath} = await cache(metaUrl);
	const metaText = await Deno.readTextFile(metaPath);
	return JSON.parse(metaText);
}

function metaChooseVersion(meta: Any, versionQuery: string): string
{	return meta.latest;
}

function versionMetaChooseEntryPoint(versionMeta: Any, entryPointQuery: string)
{	if ('exports' in versionMeta && typeof(versionMeta.exports)=='object')
	{	entryPointQuery = !entryPointQuery ? '.' : './'+entryPointQuery;
		const found = versionMeta.exports[entryPointQuery];
		if (found && typeof(found)=='string')
		{	if (found.startsWith('./'))
			{	return found.slice(1);
			}
			else if (found.startsWith('/'))
			{	return found;
			}
			else
			{	return '/' + found;
			}
		}
	}
	return '';
}
