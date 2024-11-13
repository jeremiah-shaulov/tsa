import {cacheDirectory, path} from '../../deps.ts';
import {tsa} from '../../tsa_ns.ts';
import {readTextFile} from '../../util.ts';

let npmRoots: string[] | undefined;

async function getNpmRoots(host: tsa.CompilerHost)
{	if (!npmRoots)
	{	npmRoots = [];
		try
		{	const npmDir = path.join(cacheDirectory(), 'npm');
			for (const name of host.getDirectories!(npmDir))
			{	const nameFull = path.join(npmDir, name);
				if (host.directoryExists!(nameFull))
				{	npmRoots.push(nameFull);
				}
			}
		}
		catch (e)
		{	console.error(e);
		}
	}
	return npmRoots;
}

export async function resolveNpm(specifier: string, emitDeclarationOnly: boolean, host: tsa.CompilerHost)
{	try
	{	// Load the module to cache it
		await import(specifier);
	}
	catch (e)
	{	console.error(e instanceof Error ? e.message : e+'');
	}
	try
	{	// Can detect npm directory?
		const npmRoots = await getNpmRoots(host);
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
						const registryJson = JSON.parse(readTextFile(host, registryJsonPath));
						version = registryJson['dist-tags'].latest;
					}
					if (!modulePath)
					{	const packageJsonPath = path.join(npmRoot, moduleName, version, 'package.json');
						const packageJson = JSON.parse(readTextFile(host, packageJsonPath));
						if (!emitDeclarationOnly)
						{	modulePath = packageJson.main;
						}
						else
						{	modulePath = packageJson.types || packageJson.typings;
							if (!modulePath)
							{	modulePath = packageJson.main || 'index.js';
								if (modulePath.slice(-3).toLowerCase() == '.js')
								{	const modulePathDts = modulePath.slice(0, -2) + 'd.ts';
									if (host.fileExists(modulePathDts))
									{	modulePath = modulePathDts;
									}
								}
							}
						}
					}
					const dirUrl = path.toFileUrl(path.join(npmRoot, moduleName, version));
					const fileUrl = new URL(modulePath, dirUrl.href+'/');
					if (fileUrl.href.startsWith(dirUrl.href))
					{	// Stat to throw exception if not found, so will try another `npmRoot`
						if (!host.fileExists(path.fromFileUrl(fileUrl)))
						{	throw new Deno.errors.NotFound(`File not found: ${fileUrl}`);
						}
						// Success
						return {fileUrl, specifier: `npm:${moduleName}@${version}${fileUrl.href.slice(dirUrl.href.length)}`};
					}
				}
				catch (e)
				{	if (!(e instanceof Error) || !('code' in e) || e.code!=='ENOENT')
					{	throw e;
					}
				}
			}
		}
	}
	catch (e)
	{	console.error(e instanceof Error ? e.message : e+'');
	}
}
