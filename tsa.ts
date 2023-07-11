#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read --allow-write

import {tsa, printDiagnostics} from './mod.ts';
import {Command, writeAll} from './private/deps.ts';
import {defaultLoad, defaultResolve} from './private/load_options.ts';

const program = new Command('tsa');

program
	.version('0.0.1')
	.description
	(	'Typescript compiler adapter for Deno.\n' +
		'It can perform 2 operations: `tsa doc ...`, and `tsa bundle ...`.\n' +
		'Use `tsa help [command]` to see description.\n' +
		'This tool can work on files or URLs. Example: `tsa doc https://deno.land/x/crc32hash@v1.0.0/mod.ts`.\n' +
		'There\'s also unstable support for "npm:" protocol. Example: \`tsa doc npm:chalk\`.'
	);

program
	.command('doc <file1.ts> [fileN.ts...]')
	.description
	(	'Generate JSON AST suitable for further documentation generation.'
	)
	.option('--outFile <out.json>', 'Where to save the result (default: stdout).')
	.option('--pretty', 'Produce human-readable JSON.')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const outFile = String(options.outFile || '/dev/stdout');
			const pretty = !!options.pretty;
			const entryPoints = [file1, ...files];

			// Create program
			const program = await tsa.createDenoProgram(entryPoints);
			printDiagnostics(tsa.getPreEmitDiagnostics(program));

			// Generate doc
			const result = program.emitDoc();

			// Save the result to file (or print to stdout), and exit
			await writeTextFile(outFile, JSON.stringify(result, undefined, pretty ? '\t' : undefined));
			Deno.exit();
		}
	);

program
	.command('bundle <file1.ts> [fileN.ts...]')
	.description
	(	'Bundle Typescript source files to single Javascript module.'
	)
	.option('--outFile <out.js>', 'Where to save the result (default: stdout).')
	.option('--ts', 'Bundle to `.ts`. If some of the sources is plain Javascript, the resulting bundle can be valid by the means of Typescript.')
	.action
	(	async (file1: string, files: string[], options: Record<string, string|boolean>) =>
		{	// Input options
			const outFile = String(options.outFile || '/dev/stdout');
			const entryPoints = [file1, ...files];

			// Create program to bundle source files to single `.ts`
			const program = await tsa.createDenoProgram(entryPoints);
			printDiagnostics(tsa.getPreEmitDiagnostics(program));

			// Bundle
			const result = program.emitBundle();
			const host = tsa.createCompilerHost({});
			const newLine = host.getNewLine();
			const printer = tsa.createPrinter();
			let lastSourceFile: tsa.SourceFile|undefined;
			let text = '';
			for (const {sourceFile, node} of result)
			{	if (sourceFile != lastSourceFile)
				{	lastSourceFile = sourceFile;
					const loc = node.pos>=0 ? sourceFile.getLineAndCharacterOfPosition(node.pos) : undefined;
					const info = sourceFile.fileName + (!loc ? '' : `, line ${loc.line + 1}`);
					text += `// ` + info + newLine;
					console.error(info);
				}
				const line = printer.printNode(tsa.EmitHint.Unspecified, node, sourceFile) + newLine;
				text += line;
			}

			if (options.ts)
			{	// Save the result to file (or print to stdout)
				await writeTextFile(outFile, text);
			}
			else
			{	// Create second program to transpile the bundle to Javascript
				const program2 = await tsa.createDenoProgram
				(	['/dev/stdin'],
					{	target: tsa.ScriptTarget.ESNext,
						module: tsa.ModuleKind.ESNext,
						outDir: '.',
					},
					{	resolve(specifier, referrer)
						{	if (specifier == '/dev/stdin')
							{	return specifier;
							}
							return defaultResolve(specifier, referrer);
						},
						async load(specifier, isDynamic)
						{	if (specifier == '/dev/stdin')
							{	return {kind: 'module', specifier: '/dev/stdin', content: text, headers: {'content-type': 'application/typescript'}};
							}
							return await defaultLoad(specifier, isDynamic);
						}
					}
				);
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
				await writeTextFile(outFile, contents);
			}

			// Done
			Deno.exit();
		}
	);

program.parse(Deno.args);

async function writeTextFile(filename: string, contents: string)
{	if (filename == '/dev/stdout')
	{	// Support Windows
		await writeAll(Deno.stdout, new TextEncoder().encode(contents));
	}
	else
	{	await Deno.writeTextFile(filename, contents);
	}
}
