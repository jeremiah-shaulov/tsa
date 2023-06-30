const RE_IS_URL = /^(?:https?|file|npm):\/\//;

export function isUrl(str: string)
{	return RE_IS_URL.test(str);
}

/**	File exists? If yes, return it's `stat`.
 **/
export function existsSync(filespec: string|URL)
{	try
	{	return Deno.statSync(filespec);
	}
	catch (e)
	{	if (e.code !== 'ENOENT')
		{	throw e;
		}
	}
}

/**	Remove the given file if it exists.
 **/
/*export async function remove(filespec: string|URL)
{	try
	{	await Deno.remove(filespec);
	}
	catch (e)
	{	if (e.code != 'ENOENT')
		{	throw e;
		}
	}
}*/

/**	Create temporary directory with given name, or ensure that it already exists.
	@param dirName Name without path of the directory that will be created in system `/tmp`.
 **/
/*export async function ensureTempDir(dirName: string)
{	const tmpTmpDir = await Deno.makeTempDir();
	const tmpDir = path.join(path.dirname(tmpTmpDir), dirName);
	if (await exists(tmpDir))
	{	await Deno.remove(tmpTmpDir);
	}
	else
	{	await Deno.rename(tmpTmpDir, tmpDir);
	}
	return tmpDir;
}*/
