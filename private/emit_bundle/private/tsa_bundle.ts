import {path} from '../../deps.ts';
import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';

/**	This object represents bundle that contains all the source files, and can be converted to a Typescript or Javascript code (and saved to file).
 **/
export class TsaBundle
{	#text: string | undefined;

	constructor(private ts: typeof tsa, public nodesWithInfo: NodeWithInfo[], public hasExports: boolean, private lib: string[]|undefined, private newLine: string)
	{
	}

	/**	Convert this bundle to single Typescript file that contains all the imported modules.
		Returns source code of the file as string.
	 **/
	toTs(logToConsole=false)
	{	if (this.#text == undefined)
		{	const {nodesWithInfo, newLine} = this;
			const printer = this.ts.createPrinter();
			let lastSourceFile: tsa.SourceFile|undefined;
			let text = '';
			for (const {sourceFile, node} of nodesWithInfo)
			{	if (sourceFile != lastSourceFile)
				{	lastSourceFile = sourceFile;
					const loc = node.pos>=0 ? sourceFile.getLineAndCharacterOfPosition(node.pos) : undefined;
					const info = sourceFile.fileName + (!loc ? '' : `, line ${loc.line + 1}`);
					text += `// ` + info + newLine;
					if (logToConsole)
					{	console.error(info);
					}
				}
				const line = printer.printNode(this.ts.EmitHint.Unspecified, node, sourceFile) + newLine;
				text += line;
			}
			this.#text = text;
		}
		return this.#text;
	}

	/**	Convert this bundle to another
		{@link tsa.TsaProgram}, on which you can call {@link tsa.TsaProgram.emit()} to convert it to single Javascript file.
		This method first calls [toTs()]{@link TsaBundle.toTs}, and then {@link tsa.createTsaProgram()}.

		```ts
		// To run this example:
		// deno run --allow-env --allow-net --allow-read --allow-write example.ts

		import {tsa, printDiagnostics} from '../../../mod.ts';

		const SUBJ = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)
		const OUT_FILE = '/tmp/dist.js';

		// Create typescript program
		const program = await tsa.createTsaProgram([SUBJ]);

		// Print errors and warnings (if any)
		printDiagnostics(tsa.getPreEmitDiagnostics(program));

		// Bundle
		const bundle = program.emitTsaBundle();

		// Convert the bundle to another program
		const program2 = await bundle.toProgram({outFile: OUT_FILE, target: tsa.ScriptTarget.ESNext});
		printDiagnostics(tsa.getPreEmitDiagnostics(program2));

		// Transpile
		let contents = '';
		const result = program2.emit
		(	undefined,
			(_fileName, text) =>
			{	contents = text;
			}
		);
		printDiagnostics(result.diagnostics);
		if (result.emitSkipped)
		{	console.error('Fatal errors');
		}
		else
		{	// If not a module, wrap the code in an async scope
			if (!bundle.hasExports)
			{	contents = `(async function() {\n${contents}\n})()`;
			}
			// Save the code to file
			await Deno.writeTextFile(OUT_FILE, contents);
			// Done
			console.error(`File saved: ${OUT_FILE}`);
		}
		```
	 **/
	async toProgram(compilerOptions: tsa.CompilerOptions, logToConsole=false)
	{	const outFile = compilerOptions.outFile;
		if (!outFile)
		{	throw new Error(`Please, specify outFile`);
		}
		if (outFile.slice(-3).toLowerCase() == '.ts')
		{	throw new Error(`Cannot transpile to a .ts file`);
		}
		const inFile = outFile.slice(-3).toLowerCase()=='.js' ? outFile.slice(0, -2)+'ts' : outFile+'.ts';
		const outDir = path.dirname(outFile);
		compilerOptions =
		{	target: this.ts.ScriptTarget.ESNext,
			module: this.ts.ModuleKind.ESNext,
			moduleResolution: this.ts.ModuleResolutionKind.Bundler ?? this.ts.ModuleResolutionKind.NodeNext,
			lib: this.lib,
			...compilerOptions,
			outDir,
			outFile: undefined, // reset
		};
		const text = this.toTs(logToConsole);
		return await this.ts.createTsaProgram
		(	[inFile],
			compilerOptions,
			{	resolve(specifier, _referrer)
				{	return specifier;
				},
				load(specifier, _isDynamic)
				{	if (specifier == inFile)
					{	return {kind: 'module', specifier, content: text, headers: {'content-type': 'application/typescript'}};
					}
				}
			}
		);
	}

	/**	Alias of
		[toTs()]{@link TsaBundle.toTs}
	 **/
	toString()
	{	return this.toTs();
	}
}
