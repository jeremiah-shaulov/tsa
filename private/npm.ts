import {cacheDirectory, path} from './deps.ts';

let npmRoots: string[] | undefined;
const known = new Map<string, {filename: string, specifier: string}|null>;

async function getNpmRoots()
{	if (!npmRoots)
	{	npmRoots = [];
		try
		{	const npmDir = path.join(cacheDirectory(), 'npm');
			for await (const {name, isDirectory} of Deno.readDir(npmDir))
			{	if (isDirectory)
				{	npmRoots.push(path.join(npmDir, name));
				}
			}
		}
		catch (e)
		{	console.error(e);
		}
	}
	return npmRoots;
}

export async function getNpmFilename(specifier: string)
{	if (specifier.startsWith('npm:'))
	{	let result = known.get(specifier);
		if (result === undefined)
		{	result = await findNpmFilename(specifier);
			known.set(specifier, result ?? null);
		}
		return result ?? undefined;
	}
}

async function findNpmFilename(specifier: string)
{	try
	{	// Load the module to cache it
		await import(specifier);
	}
	catch (e)
	{	console.error(e.message);
	}
	try
	{	// Can detect npm directory?
		const npmRoots = await getNpmRoots();
		if (npmRoots.length)
		{	// Split the specifier to parts
			const posAt = specifier.indexOf('@', 4);
			const pos = specifier.indexOf('/', 4);
			const hasVersion = posAt!=-1 && (pos==-1 || posAt<pos);
			let modulePath = pos==-1 ? '' : specifier.slice(pos);
			const moduleName = specifier.slice(4, hasVersion ? posAt : pos==-1 ? undefined : pos);
			let version = !hasVersion ? '' : specifier.slice(posAt+1, pos==-1 ? undefined : pos);
			// One of detected npm directories contains the module?
			for (const npmRoot of npmRoots)
			{	try
				{	if (!version)
					{	const registryJsonPath = path.join(npmRoot, moduleName, 'registry.json');
						const registryJson = JSON.parse(await Deno.readTextFile(registryJsonPath));
						version = registryJson['dist-tags'].latest;
					}
					if (!modulePath)
					{	const packageJsonPath = path.join(npmRoot, moduleName, version, 'package.json');
						const packageJson = JSON.parse(await Deno.readTextFile(packageJsonPath));
						modulePath = packageJson.typings || packageJson.main || 'index.js';
					}
					const dirname = path.join(npmRoot, moduleName, version);
					const filename = path.join(dirname, modulePath);
					if (filename.startsWith(dirname))
					{	// Stat to throw exception if not found, so will try another `npmRoot`
						await Deno.stat(filename);
						// Success
						return {filename, specifier: `npm:${moduleName}@${version}${filename.slice(dirname.length)}`};
					}
				}
				catch (e)
				{	if (!(e instanceof Deno.errors.NotFound))
					{	throw e;
					}
				}
			}
		}
	}
	catch (e)
	{	console.error(e.message);
	}
}
