#!/usr/bin/env -S deno run --allow-env --allow-net --allow-read --allow-write

import {tsa, printDiagnostics} from './mod.ts';

const HELP =
`This tool works like \`tsc\` for generating JavaScript or DTS (other usage patterns are not supported).
Also you can specify \`--outFile\` to a file with \`.json\` extension to generate project AST.
This tool works on typescript projects that follow \`Deno\` standards.
See \`tsc --help\` for more information.
`;

async function main(): Promise<number>
{	const commandLine = tsa.parseCommandLine(Deno.args);

	if (commandLine.options.locale)
	{	tsa.validateLocaleAndSetLanguage(commandLine.options.locale, tsa.sys, commandLine.errors);
	}

	if (commandLine.options.version)
	{	console.error(tsa.version);
		return tsa.ExitStatus.DiagnosticsPresent_OutputsSkipped;
	}

	if (commandLine.options.help || commandLine.options.all)
	{	console.error(HELP.trim());
		return tsa.ExitStatus.DiagnosticsPresent_OutputsSkipped;
	}

	if (commandLine.options.build || commandLine.options.init || commandLine.options.watch && commandLine.options.listFilesOnly || commandLine.options.project || commandLine.options.showConfig || !commandLine.fileNames.length)
	{	console.error('This command line invokation pattern is not supported');
		return tsa.ExitStatus.DiagnosticsPresent_OutputsSkipped;
	}

	if (commandLine.errors.length > 0)
	{	printDiagnostics(commandLine.errors);
		return tsa.ExitStatus.DiagnosticsPresent_OutputsSkipped;
	}

	try
	{	const program = await tsa.createDenoProgram(commandLine.fileNames, commandLine.options);
		printDiagnostics(tsa.getPreEmitDiagnostics(program));

		if (commandLine.options.outFile?.slice(-5).toLowerCase() === '.json')
		{	const result = program.emitDoc();
			await Deno.writeTextFile(commandLine.options.outFile, JSON.stringify(result));
		}
		else if (commandLine.options.outFile?.slice(-3).toLowerCase() === '.ts')
		{	const host = tsa.createCompilerHost(commandLine.options);
			const newLine = host.getNewLine();
			const result = program.emitTs();
			let str = '';
			const printer = tsa.createPrinter();
			let lastSourceFile: tsa.SourceFile|undefined;
			for (const {sourceFile, node} of result)
			{	if (sourceFile != lastSourceFile)
				{	lastSourceFile = sourceFile;
					console.error(sourceFile.fileName);
					str += `// ` + sourceFile.fileName + newLine;
				}
				const line = printer.printNode(tsa.EmitHint.Unspecified, node, sourceFile) + newLine;
				str += line;
			}
			await Deno.writeTextFile(commandLine.options.outFile, str);
		}
		else
		{	const result = program.emit();
			printDiagnostics(result.diagnostics);
			if (result.emitSkipped)
			{	throw new Error('emit failed');
			}
		}
	}
	catch (e)
	{	console.error(e.message);
		return tsa.ExitStatus.DiagnosticsPresent_OutputsSkipped;
	}

	return tsa.ExitStatus.Success;
}

if (import.meta.main)
{	Deno.exit(await main());
}
