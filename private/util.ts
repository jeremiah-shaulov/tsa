import {path} from './deps.ts';
import {tsa} from './tsa_ns.ts';

const RE_IS_URL = /^https?:\/\/|^file:\/\/|^npm:|^node:|^jsr:/;
const RE_JSR_URL = /^jsr:@[a-z0-9-]+\/[a-z0-9-]+(?:@[A-Za-z0-9.-]+)?\/?/;

let tmpDirname = '';

export async function getTmpDirname()
{	if (!tmpDirname)
	{	const tmpFilename = await Deno.makeTempFile();
		tmpDirname = path.dirname(tmpFilename);
		await Deno.remove(tmpFilename);
	}
	return tmpDirname;
}

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

export function readTextFile(host: tsa.CompilerHost, filename: string)
{	const contents = host.readFile(filename);
	if (contents == undefined)
	{	throw new Deno.errors.NotFound(`Couldn't read file: ${filename}`);
	}
	return contents;
}

export function writeTextFile(host: tsa.CompilerHost, filename: string, contents: string)
{	if (filename == '/dev/stdout')
	{	// Support Windows
		console.log(contents);
	}
	else
	{	host.writeFile(filename, contents, false, error => {throw new Error(error)});
	}
}

export function newURL(relPath: string, base: string)
{	try
	{	return new URL(relPath, base);
	}
	catch (e)
	{	const m = RE_JSR_URL.exec(base);
		if (m)
		{	const scopePackage = m[0];
			const url = new URL(relPath, 'http://localhost/'+base.slice(scopePackage.length));
			return new URL(scopePackage + url.href.slice('http://localhost'.length + (scopePackage.endsWith('/') ? 1 : 0)));
		}
		throw e;
	}
}
