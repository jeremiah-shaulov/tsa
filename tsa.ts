#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read --allow-write

import {tsa, printDiagnostics, MdGen} from './mod.ts';
import {Command, path} from './private/deps.ts';

const program = new Command('tsa');

program
	.version('0.0.1')
	.description
	(	'Typescript compiler adapter for Deno.\n' +
		'It can perform 3 operations: `tsa doc ...`, `tsa bundle ...`, and `tsa types ...`.\n' +
		'Use `tsa help [command]` to see description.\n' +
		'This tool can work on files or URLs. Example: `tsa doc https://deno.land/x/crc32hash@v1.0.0/mod.ts`.\n' +
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
			await doc(entryPoints, outFile, pretty, false);

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
			await doc(entryPoints, outFile, pretty, false);

			// Done
			Deno.exit();
		}
	);

program
	.command('doc-md <file1.ts> [fileN.ts...]')
	.description
	(	'Generate JSON AST suitable for further documentation generation.'
	)
	.option('--outDir <generated-doc>', 'To what directory to save the resulting files (default: "generated-doc"). The directory will be created or emptied if necessary.')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const entryPoints = [file1, ...files];
			const outDir = String(options.outDir || 'generated-doc');

			// Gen doc
			await doc(entryPoints, outDir, false, true);

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
	.option('--outFile <out.js>', 'Where to save the result (default: stdout).')
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

program.parse(Deno.args);

async function doc(entryPoints: string[], outFileOrDir: string, pretty: boolean, isMd: boolean)
{	// Create program
	const program = await tsa.createTsaProgram(entryPoints, {declaration: true, emitDeclarationOnly: true});
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Generate doc
	const result = program.emitDoc({includeReferenced: true, noImportNodes: true});

	if (!isMd)
	{	// Save the result to file (or print to stdout), and exit
		await writeTextFile(outFileOrDir, JSON.stringify(result, undefined, pretty ? '\t' : undefined));
	}
	else
	{	const gen = new MdGen(result);
		const createdDirs = new Array<string>;
		let nRemoved = 0;
		for (const {dir, code} of gen.genFiles())
		{	// Need to write `code` to `${dir}/README.md`
			const curDir = !dir ? outFileOrDir : path.join(outFileOrDir, dir);
			const filename = path.join(curDir, 'README.md');
			// Do 2 attempts. The first attempt may fail if the parent directory doesn't exist
			for (let i=0; i<2; i++)
			{	try
				{	await Deno.writeTextFile(filename, code);
					// If successfully written from the first attempt, see what else files exist in this directory, and remove them
					if (i==0 && dir)
					{	for await (const {name} of Deno.readDir(curDir))
						{	if (name != 'README.md')
							{	// Remove this file or directory
								await Deno.remove(path.join(curDir, name), {recursive: true});
								nRemoved++;
							}
						}
					}
				}
				catch (e)
				{	if (i!=0 || e.code!='ENOENT')
					{	throw e;
					}
					await Deno.mkdir(curDir, {recursive: true});
				}
			}
			createdDirs.push(dir);
		}
		// Delete existing files that i didn't create
		if (createdDirs.length)
		{	for await (const {name} of Deno.readDir(outFileOrDir))
			{	if (name!='README.md' && !createdDirs.includes(name))
				{	// Remove this file or directory
					await Deno.remove(path.join(outFileOrDir, name), {recursive: true});
					nRemoved++;
				}
			}
		}
		// Done
		console.log(`Created ${createdDirs.length} README.md files. Removed ${nRemoved} files or directories.`);
	}
}

async function types(entryPoints: string[], outFile: string)
{	// Create program
	const program = await tsa.createTsaProgram(entryPoints, {declaration: true, emitDeclarationOnly: true, outFile});
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
	await writeTextFile(outFile, contents);
}

async function bundle(entryPoints: string[], outFile: string, target: tsa.ScriptTarget, isTs: boolean)
{	// Create program to bundle source files to single `.ts`
	const program = await tsa.createTsaProgram(entryPoints);
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Bundle
	const bundle = program.emitTsaBundle();

	if (isTs)
	{	// Save the result to file (or print to stdout)
		await writeTextFile(outFile, bundle.toTs(), !bundle.hasExports);
	}
	else
	{	// Create second program to transpile the bundle to Javascript
		const program2 = await bundle.toProgram({outFile, target});
		printDiagnostics(tsa.getPreEmitDiagnostics(program2));

		// Transpile
		let contents = '';
		const result2 = program2.emit
		(	undefined,
			(_fileName: string, text: string) =>
			{	contents = text;
			}
		);
		printDiagnostics(result2.diagnostics);
		if (result2.emitSkipped)
		{	Deno.exit(1);
		}

		// Save the result to file (or print to stdout)
		await writeTextFile(outFile, contents, !bundle.hasExports);
	}
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

async function writeTextFile(filename: string, contents: string, wrapInAsyncScope=false)
{	if (wrapInAsyncScope)
	{	contents = `(async function() {\n${contents}\n})()`;
	}
	if (filename == '/dev/stdout')
	{	// Support Windows
		const writer = Deno.stdout.writable.getWriter();
		try
		{	await writer.write(new TextEncoder().encode(contents));
		}
		finally
		{	writer.releaseLock();
		}
	}
	else
	{	await Deno.writeTextFile(filename, contents);
	}
}
