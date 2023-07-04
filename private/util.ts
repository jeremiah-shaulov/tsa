import {path} from './deps.ts';
import {tsa} from './tsa_ns.ts';

const RE_IS_URL = /^https?:\/\/|file:\/\/|npm:|node:/;

export function isUrl(str: string)
{	return RE_IS_URL.test(str);
}

export function formatDiagnostics(diagnostics: readonly tsa.Diagnostic[])
{	const formatDiagnostics = Deno.noColor ? tsa.formatDiagnostics : tsa.formatDiagnosticsWithColorAndContext;
	return formatDiagnostics
	(	diagnostics,
		{	getCurrentDirectory: tsa.sys.getCurrentDirectory,
			getNewLine: () => tsa.sys.newLine,
			getCanonicalFileName: s => s, // no need, because i use absolute URLs
		}
	);
}

export function printDiagnostics(diagnostics: readonly tsa.Diagnostic[])
{	if (diagnostics.length)
	{	console.error(formatDiagnostics(diagnostics));
	}
}

/**	File exists? If yes, return it's `stat`.
 **/
export async function exists(filespec: string|URL)
{	try
	{	return await Deno.stat(filespec);
	}
	catch (e)
	{	if (!(e instanceof Deno.errors.NotFound))
		{	throw e;
		}
	}
}

/**	File exists? If yes, return it's `stat`.
 **/
export function existsSync(filespec: string|URL)
{	try
	{	return Deno.statSync(filespec);
	}
	catch (e)
	{	if (!(e instanceof Deno.errors.NotFound))
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
	{	if (!(e instanceof Deno.errors.NotFound))
		{	throw e;
		}
	}
}*/

/**	Create file in temporary directory with given name, or ensure that such file already exists.
	@param filename Name without path of the file that will be created or reused.
 **/
export async function ensureTempFile(filename: string)
{	const tmpTmpFilename = await Deno.makeTempFile();
	const tmpFilename = path.join(path.dirname(tmpTmpFilename), filename);
	if (await exists(tmpFilename))
	{	await Deno.remove(tmpTmpFilename);
	}
	else
	{	await Deno.rename(tmpTmpFilename, tmpFilename);
	}
	return tmpFilename;
}
