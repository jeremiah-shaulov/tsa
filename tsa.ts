#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read --allow-write

import {tsa, printDiagnostics} from './mod.ts';
import {Command, path, APP_GIT_TAG} from './private/deps.ts';
import {writeTextFile} from './private/util.ts';

const RE_BAD_SHELL_CHAR = /[^\w%+\-.\/:=@]/;

const {args} = Deno;
const program = new Command('tsa');

program
	.version(APP_GIT_TAG)
	.description
	(	'Typescript compiler adapter for Deno.\n' +
		'It can perform 3 operations: `tsa doc ...`, `tsa bundle ...`, and `tsa types ...`.\n' +
		'Use `tsa help [command]` to see description.\n' +
		'This tool can work on files or URLs. Example: `tsa doc https://deno.land/x/crc32hash@v2.0.1/mod.ts`.\n' +
		'There\'s also unstable support for "npm:" protocol. Example: \`tsa doc npm:chalk\`.'
	);

program
	.command('doc <file1.ts> [fileN.ts...]')
	.description
	(	'Alias of doc-json. Generate JSON AST suitable for further documentation generation.'
	)
	.option('--outFile <out.json>', 'Where to save the result (default: stdout).')
	.option('--pretty', 'Produce human-readable JSON.')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const entryPoints = [file1, ...files];
			const outFile = String(options.outFile || '/dev/stdout');
			const pretty = !!options.pretty;

			// Gen doc
			await doc(entryPoints, outFile, '', pretty, false);

			// Done
			Deno.exit();
		}
	);

program
	.command('doc-json <file1.ts> [fileN.ts...]')
	.description
	(	'Generate JSON AST suitable for further documentation generation.'
	)
	.option('--outFile <out.json>', 'Where to save the result (default: stdout).')
	.option('--pretty', 'Produce human-readable JSON.')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const entryPoints = [file1, ...files];
			const outFile = String(options.outFile || '/dev/stdout');
			const pretty = !!options.pretty;

			// Gen doc
			await doc(entryPoints, outFile, '', pretty, false);

			// Done
			Deno.exit();
		}
	);

program
	.command('doc-md <file1.ts> [fileN.ts...]')
	.description
	(	'Generate documentation in markdown format.'
	)
	.requiredOption('--outFile <README.md>', 'Where to save the result.')
	.option('--outDir <generated-doc>', 'This command also creates linked README.md files in the --outDir directory (default: "generated-doc"). The directory will be created near --outFile or existing directory will be emptied if necessary.')
	.option('--mainTitle <My Project>', 'The title that will appear in the main README.md file. By default the title is taken from `@summary` tag near `@module`, and this option overrides it.')
	.option('--importUrl <URL>', 'Optionally specify one such flag per each source file in corresponding order. This lets including in the documentation import examples for public symbols. The specified importUrl must point to a public registry that downloads (or will download) the same file as provided to the generator. For example: tsa doc-md foo/mod.ts --importUrl https://deno.land/foo@1.0.0/mod.ts bar/mod.ts --importUrl https://deno.land/bar@1.0.0/mod.ts (the number of --importUrl options must be the same as number of given files).', optionStringArray)
	.option('--outUrl <URL>', 'If you plan to upload the resulting files to a public resource (such as github), you can optionally specify URL by which the --outFile will be publicly accessible. Then you can use script examples in doc-comments marked as "// To run this example:" on the first line, and followed by a line that contains "example.ts", like "// deno run --allow-all example.ts", and these lines will be converted to "// To download and run this example:"...')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean|string[]>) =>
		{	// Input options
			const entryPoints = [file1, ...files];
			const outFile = String(options.outFile);
			const outDir = String(options.outDir || 'generated-doc');
			const mainTitle = String(options.mainTitle || '');
			const importUrls = Array.isArray(options.importUrl) ? options.importUrl : [];
			const outUrl = String(options.outUrl || '');

			// Validate options
			if (!outFile)
			{	throw new Error('--outFile must be specified');
			}
			if (outDir.includes('/') || outDir.includes(path.SEPARATOR))
			{	throw new Error('--outDir must be name of the directory to create/update near --outFile, not directory path');
			}
			if (importUrls.length && importUrls.length!=entryPoints.length)
			{	throw new Error(`Number of --importUrl options must be the same as number of given source files (${entryPoints.length})`);
			}

			// Gen doc
			const mainPageStart = `<!--\n\tThis file is generated with the following command:\n\tdeno run --allow-all https://raw.githubusercontent.com/jeremiah-shaulov/tsa/${APP_GIT_TAG}/tsa.ts ${args.map(a => escapeShellArg(a)).join(' ')}\n-->\n\n`;
			await doc(entryPoints, outFile, outDir, false, true, mainTitle, mainPageStart, importUrls, outUrl);

			// Done
			Deno.exit();
		}
	);

program
	.command('types <file1.ts> [fileN.ts...]')
	.description
	(	'Generate type declarations file (DTS).'
	)
	.option('--outFile <out.d.ts>', 'Where to save the result (default: stdout).')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const entryPoints = [file1, ...files];
			const outFile = String(options.outFile || '/dev/stdout');

			// Gen types
			await types(entryPoints, outFile);

			// Done
			Deno.exit();
		}
	);

program
	.command('bundle <file1.ts> [fileN.ts...]')
	.description
	(	'Alias of bundle-js. Bundle Typescript source files to single Javascript module.'
	)
	.option('--outFile <out.js>', 'Where to save the result (default: stdout).')
	.option('--target <ESNext>', 'Target JavaScript version. One of: ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ESNext (default: ESNext).')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const entryPoints = [file1, ...files];
			const outFile = String(options.outFile || '/dev/stdout');
			const target = targetToNum(options.target);

			// Bundle
			await bundle(entryPoints, outFile, target, false);

			// Done
			Deno.exit();
		}
	);

program
	.command('bundle-js <file1.ts> [fileN.ts...]')
	.description
	(	'Bundle Typescript source files to single Javascript module.'
	)
	.option('--outFile <out.js>', 'Where to save the result (default: stdout).')
	.option('--target <ESNext>', 'Target JavaScript version. One of: ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ESNext (default: ESNext).')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const entryPoints = [file1, ...files];
			const outFile = String(options.outFile || '/dev/stdout');
			const target = targetToNum(options.target);

			// Bundle
			await bundle(entryPoints, outFile, target, false);

			// Done
			Deno.exit();
		}
	);

program
	.command('bundle-ts <file1.ts> [fileN.ts...]')
	.description
	(	'Bundle Typescript source files to single `.ts` module.'
	)
	.option('--outFile <out.ts>', 'Where to save the result (default: stdout).')
	.option('--target <ESNext>', 'Target JavaScript version. One of: ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ESNext (default: ESNext).')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const entryPoints = [file1, ...files];
			const outFile = String(options.outFile || '/dev/stdout');
			const target = targetToNum(options.target);

			// Bundle
			await bundle(entryPoints, outFile, target, true);

			// Done
			Deno.exit();
		}
	);

program.parse(args);

function optionStringArray(value: unknown, previous: unknown[])
{	const arr = [String(value)];
	return !previous ? arr : previous.concat(arr);
}

/**	Enclose text in apostrophs and/or add backslashes if the text contains characters that must be escaped in bash command line.
 **/
function escapeShellArg(arg: string)
{	return RE_BAD_SHELL_CHAR.test(arg) ? "'" + arg.replaceAll("'", "'\\''") + "'" : arg;
}

async function doc(entryPoints: string[], outFile: string, outDir: string, pretty: boolean, isMd: boolean, mainTitle='', mainPageStart='', importUrls=new Array<string>, outUrl='')
{	// Create program
	const compilerOptions = {declaration: true, emitDeclarationOnly: true};
	const host = tsa.createCompilerHost(compilerOptions);
	const program = await tsa.createTsaProgram(entryPoints, compilerOptions, undefined, host);
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Generate doc
	const docNodes = program.emitDoc({includeReferenced: true, noImportNodes: true});

	if (!isMd)
	{	// Save the resulting nodes to file (or print to stdout), and exit
		writeTextFile(host, outFile, JSON.stringify(docNodes.nodes, undefined, pretty ? '\t' : undefined));
	}
	else
	{	const docDirs = new Array<string>;
		const baseDir = path.dirname(outFile);
		const outFileBasename = path.basename(outFile);
		const docDirBasename = outDir;
		const baseDirUrl = outUrl && new URL('.', outUrl).href;
		let nWritten = 0;
		let nRemoved = 0;
		for (const {dir, code} of docNodes.toMd(outFileBasename, docDirBasename, mainTitle, mainPageStart, entryPoints, importUrls, baseDirUrl))
		{	// Need to write `code` to `${dir}/README.md`
			const curDir = !dir ? baseDir : path.join(baseDir, dir);
			const filename = !dir ? outFile : path.join(curDir, 'README.md');
			// Do 2 attempts. The first attempt may fail if the parent directory doesn't exist
			for (let i=0; i<2; i++)
			{	try
				{	if (host.readFile(filename) == code)
					{	break;
					}
				}
				catch
				{	// ok
				}
				try
				{	writeTextFile(host, filename, code);
					nWritten++;
					// If successfully written from the first attempt, see what else files exist in this directory, and remove them
					if (i==0 && dir && dir!=docDirBasename)
					{	for (const name of host.getDirectories!(curDir))
						{	if (name != 'README.md')
							{	// Remove this file or directory
								await Deno.remove(path.join(curDir, name), {recursive: true});
								nRemoved++;
							}
						}
					}
					break;
				}
				catch (e)
				{	if (i!=0 || !e || typeof(e)!='object' || !('code' in e) || e.code!='ENOENT')
					{	throw e;
					}
					await Deno.mkdir(curDir, {recursive: true});
				}
			}
			if (dir && dir!=docDirBasename)
			{	docDirs.push(dir);
			}
		}
		// Delete existing files that i didn't create
		const outDirPath = path.join(baseDir, docDirBasename);
		if (docDirs.length)
		{	for (const name of host.getDirectories!(outDirPath))
			{	if (name!='README.md' && !docDirs.includes(path.join(docDirBasename, name)))
				{	// Remove this file or directory
					await Deno.remove(path.join(outDirPath, name), {recursive: true});
					nRemoved++;
				}
			}
		}
		// Done
		let log = `Written ${nWritten} README.md files`;
		if (nWritten < docDirs.length)
		{	log += ` + ${docDirs.length-nWritten} up to date`;
		}
		log += `. Removed ${nRemoved} files or directories.`;
		console.log(log);
	}
}

async function types(entryPoints: string[], outFile: string)
{	// Create program
	const compilerOptions = {declaration: true, emitDeclarationOnly: true, outFile};
	const host = tsa.createCompilerHost(compilerOptions);
	const program = await tsa.createTsaProgram(entryPoints, compilerOptions, undefined, host);
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Generate the DTS
	let contents = '';
	const result = program.emit
	(	undefined,
		(_fileName: string, text: string) =>
		{	contents = text;
		}
	);
	printDiagnostics(result.diagnostics);

	// Save the result to file (or print to stdout)
	writeTextFile(host, outFile, contents);
}

async function bundle(entryPoints: string[], outFile: string, target: tsa.ScriptTarget, isTs: boolean)
{	// Create program to bundle source files to single `.ts`
	const compilerOptions = {};
	const host = tsa.createCompilerHost(compilerOptions);
	const program = await tsa.createTsaProgram(entryPoints, compilerOptions, undefined, host);
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Bundle
	const bundle = program.emitTsaBundle();

	let contents = '';

	if (isTs)
	{	// Save the result to file (or print to stdout)
		contents = bundle.toTs();
	}
	else
	{	// Create second program to transpile the bundle to Javascript
		const program2 = await bundle.toProgram({outFile, target});
		printDiagnostics(tsa.getPreEmitDiagnostics(program2));

		// Transpile
		const result2 = program2.emit
		(	undefined,
			(_fileName, text) =>
			{	contents = text;
			}
		);
		printDiagnostics(result2.diagnostics);
		if (result2.emitSkipped)
		{	Deno.exit(1);
		}
	}

	// Save the result to file (or print to stdout)
	if (!bundle.hasExports)
	{	contents = `(async function() {\n${contents}\n})()`;
	}
	writeTextFile(host, outFile, contents);
}

function targetToNum(target?: string|boolean): tsa.ScriptTarget
{	switch (target)
	{	case undefined: return tsa.ScriptTarget.ESNext;
		case 'ESNext': return tsa.ScriptTarget.ESNext;
		case 'ES2015': return tsa.ScriptTarget.ES2015;
		case 'ES2016': return tsa.ScriptTarget.ES2016;
		case 'ES2017': return tsa.ScriptTarget.ES2017;
		case 'ES2018': return tsa.ScriptTarget.ES2018;
		case 'ES2019': return tsa.ScriptTarget.ES2019;
		case 'ES2020': return tsa.ScriptTarget.ES2020;
		case 'ES2021': return tsa.ScriptTarget.ES2021;
		case 'ES2022': return tsa.ScriptTarget.ES2022;
		default:
			console.error(`Target not supported: ${target}`);
			Deno.exit();
	}
}
