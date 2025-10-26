import {path} from './deps.ts';
import {newURL} from './util.ts';

const C_CR = '\r'.charCodeAt(0);
const C_LF = '\n'.charCodeAt(0);

const RE_IMPORT = /(\nimport\s*\{[^}]+\}\s*from\s*['"])([^'"\r\n]+)['"]/g;
const RE_BASH_TOKENIZER = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\S+|(\s+)/ys;
const RE_BASH_UNESCAPE = /\\./gs;
const RE_EXAMPLE_NAME = /[^\r\n]+ > \/tmp\/(example-\w+)\.ts[\r\n]/y;
const RE_UNCOMMENT = /^\/\/[ \t]*/mg;

class NotTsaError extends Error
{
}

/**	After generating markdown documentation for a project with [tsa](../../../README.md), you can use this function
	to extract executable code examples from `.md` files, and store them to temporary directory.
	Then you can use them as unit-tests.

	This only works if you specified `--outUrl` and `--importUrl` when generated the docs.

	First generate the docs:

	```bash
	tsa doc-md --outFile=README.md --outUrl https://raw.githubusercontent.com/··········/README.md --importUrl https://deno.land/x/··········/mod.ts mod.ts
	```

	Then create a `*.test.ts` file in any project directory. For example:

	```ts
	// from_readme.test.ts

	import {storeExamplesToTmpFiles} from '../mod.ts';

	for (const {exampleName, filename, prelude} of await storeExamplesToTmpFiles(import.meta.url))
	{	const func = async function()
		{	await import(filename);
		};
		Object.defineProperty(func, 'name', {value: exampleName, writable: false});
		Deno.test(func);
	}
	```

	@param testFilename URL or absolute filename of a file in the current project, usually the URL of this `*.test.ts` file.
		The function will look for main `README.md` file starting from this directory and going to parent directories.
		When found, it will extract from it all the needed information.
 **/
export async function storeExamplesToTmpFiles(testFilename: string)
{	const examples = new Array<{exampleName: string, filename: string, prelude: string}>;
	const tmpDir = await getTmpDir();
	const {readme, modFsUrl, modPublicUrl, docDirFsUrl, docDirPublicUrl} = await findMainReadme(testFilename);
	const modDirFs = new URL('.', modFsUrl).href + '/';
	const modDirPublic = newURL('.', modPublicUrl.href).href + '/';

	// Main README.md
	for (const {exampleName, code, prelude} of extractExampleCodeBlocksSubst(readme, docDirPublicUrl, modDirFs, modDirPublic))
	{	const filename = path.join(tmpDir, `${exampleName}.ts`);
		await Deno.writeTextFile(filename, code);
		examples.push({exampleName, filename, prelude});
	}

	// generated-doc/name/README.md
	for await (const {name, isDirectory} of Deno.readDir(docDirFsUrl))
	{	if (isDirectory)
		{	const readme = await Deno.readTextFile(new URL(name+'/README.md', docDirFsUrl.href+'/'));
			for (const {exampleName, code, prelude} of extractExampleCodeBlocksSubst(readme, docDirPublicUrl, modDirFs, modDirPublic))
			{	const filename = path.join(tmpDir, `${exampleName}.ts`);
				await Deno.writeTextFile(filename, code);
				examples.push({exampleName, filename, prelude});
			}
		}
	}

	return examples;
}

async function getTmpDir()
{	const filename = await Deno.makeTempFile();
	const tmpDir = path.dirname(filename);
	await Deno.remove(filename);
	return tmpDir;
}

async function findMainReadme(testFilename: string)
{	for (let dir='.'; true; dir+='/..')
	{	const url = new URL(dir+'/README.md', testFilename.startsWith('file://') ? testFilename : path.toFileUrl(testFilename));
		if (url.pathname == '/README.md')
		{	throw new Error("Main README.md file not found in parent directories");
		}
		// Read the main `README.md` file
		let readme;
		try
		{	readme = await Deno.readTextFile(url);
		}
		catch
		{	continue;
		}
		// Parse tsa arguments used during doc generation
		try
		{	const {outDir, outUrl, importUrl, entryPoint} = parseTsaArgs(readme);
			const modFsUrl = new URL(path.toFileUrl(path.resolve(entryPoint)), url); // `file://` URL of `mod.ts`
			const modPublicUrl = newURL('.', importUrl); // `https://` URL of `mod.ts`
			const docDirFsUrl = new URL(outDir, url); // `file://` URL of `generated-doc` (or differently named)
			const docDirPublicUrl = new URL(outDir, outUrl); // `https://` URL of `generated-doc` (or differently named)
			return {readme, modFsUrl, modPublicUrl, docDirFsUrl, docDirPublicUrl};
		}
		catch (e)
		{	if (e instanceof NotTsaError)
			{	continue;
			}
			throw e;
		}
	}
}

function parseTsaArgs(readme: string)
{	const tsaCommand = readme.match(/^<!--\s*This file is generated with the following command:\s+([^\r\n]+)/)?.[1] ?? '';
	if (!/\bdoc-md\b/.test(tsaCommand))
	{	throw new NotTsaError("README.md doesn't seem to be generated with `tsa` command");
	}
	const args: Record<string, string> = {};
	let argName = '';
	let isDocMd = false;
	for (let arg of bashArgs(tsaCommand))
	{	if (arg.startsWith('-'))
		{	const pos = arg.indexOf('=');
			if (pos == -1)
			{	argName = arg;
				continue;
			}
			argName = arg.slice(0, pos);
			arg = arg.slice(pos+1);
		}
		if (isDocMd)
		{	args[argName] = arg;
			argName = '';
		}
		else if (arg == 'doc-md')
		{	isDocMd = true;
		}
	}
	const outDir = args['--outDir'] || 'generated-doc';
	const outUrl = args['--outUrl'];
	const importUrl = args['--importUrl'];
	const entryPoint = args[''];
	if (!outUrl)
	{	throw new Error("When docs were generated, no `--outUrl` was given to `tsa`");
	}
	if (!importUrl)
	{	throw new Error("When docs were generated, no `--importUrl` was given to `tsa`");
	}
	if (!entryPoint)
	{	throw new Error("Couldn't parse entryPoint from `tsa` arguments, used when docs were generated");
	}
	return {outDir, outUrl, importUrl, entryPoint};
}

function *bashArgs(command: string)
{	RE_BASH_TOKENIZER.lastIndex = 0;
	let arg = '';
	while (true)
	{	const m = RE_BASH_TOKENIZER.exec(command);
		if (!m)
		{	if (arg)
			{	yield arg;
			}
			break;
		}
		let [token, isSpace] = m;
		if (!isSpace)
		{	if (token.charAt(0)=='"' || token.charAt(0)=="'")
			{	token = token.slice(1, -1);
			}
			token = token.replace(RE_BASH_UNESCAPE, m => m.charAt(1));
			arg += token;
		}
		else if (arg)
		{	yield arg;
			arg = '';
		}
	}
}

function *extractExampleCodeBlocksSubst(readme: string, docDirPublicUrl: URL, modDirFs: string, modDirPublic: string)
{	for (let {exampleName, code, prelude} of extractExampleCodeBlocks(readme, docDirPublicUrl))
	{	code = code.replace
		(	RE_IMPORT,
			(all, before, url) =>
			{	if (url.startsWith(modDirPublic))
				{	return before + modDirFs + all.slice(before.length + modDirPublic.length);
				}
				return all;
			}
		);
		yield {exampleName, code, prelude};
	}
}

function *extractExampleCodeBlocks(readme: string, docDirPublicUrl: URL)
{	const exampleBegin = " curl '" + new URL('.', docDirPublicUrl).href;
	const banner = '\n// To download and run this example:';

	for (let {from, to} of extractCodeBlocks(readme))
	{	if (readme.startsWith(banner, from))
		{	from += banner.length;
			from = readme.indexOf('\n', from);
			if (from==-1 || from>=to)
			{	break;
			}
			const exampleFrom = from;
			while (readme.startsWith('\n//', from))
			{	from += 3;
				const lineFrom = readme.startsWith(exampleBegin, from) ? from : -1;
				from = readme.indexOf('\n', from);
				if (from==-1 || from>=to)
				{	break;
				}
				if (lineFrom != -1)
				{	RE_EXAMPLE_NAME.lastIndex = lineFrom;
					const m = RE_EXAMPLE_NAME.exec(readme);
					if (m)
					{	const exampleName = m[1];
						if (readme.charCodeAt(to-1) == C_CR)
						{	to--; // before '\r'
						}
						let prelude = readme.slice(exampleFrom+1, lineFrom-2);
						const code = prelude + readme.slice(from+1, to); // after '\n'
						prelude = prelude.replace(RE_UNCOMMENT, '');
						yield {exampleName, code, prelude};
					}
				}
			}
		}
	}
}

function *extractCodeBlocks(readme: string)
{	let from = 0;
	while (true)
	{	from = readme.indexOf('\n```', from);
		if (from == -1)
		{	break;
		}
		from += 4;
		const to = readme.indexOf('\n```', from);
		if (to == -1)
		{	break;
		}
		if (readme.slice(from, from+2).toLowerCase() == 'ts')
		{	while (from<to && readme.charCodeAt(from)!=C_LF)
			{	from++;
			}
			yield {from, to};
		}
		from = to + 4;
	}
}
