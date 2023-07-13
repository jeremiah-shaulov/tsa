import {path} from '../../deps.ts';
import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';

export class TsaBundle
{	#text: string | undefined;

	constructor(public nodesWithInfo: NodeWithInfo[], private lib: string[]|undefined, private newLine: string)
	{
	}

	toTs(logToConsole=false)
	{	if (this.#text == undefined)
		{	const {nodesWithInfo, newLine} = this;
			const printer = tsa.createPrinter();
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
				const line = printer.printNode(tsa.EmitHint.Unspecified, node, sourceFile) + newLine;
				text += line;
			}
			this.#text = text;
		}
		return this.#text;
	}

	async toProgram(compilerOptions: tsa.CompilerOptions, logToConsole=false)
	{	const outFile = compilerOptions.outFile;
		if (!outFile)
		{	throw new Error(`Please, specify outFile`);
		}
		if (outFile.slice(-3).toLowerCase() == '.ts')
		{	throw new Error(`Cannot emit to a .ts file`);
		}
		const inFile = outFile.replace(/\.\w{1,5}$/, '.ts');
		if (inFile.slice(-3).toLowerCase() != '.ts')
		{	throw new Error(`File without extension: ${outFile}`);
		}
		const outDir = path.dirname(await Deno.realPath(outFile));
		compilerOptions =
		{	target: tsa.ScriptTarget.ESNext,
			module: tsa.ModuleKind.ESNext,
			lib: this.lib,
			...compilerOptions,
			outDir,
			outFile: undefined, // reset
		};
		const text = this.toTs(logToConsole);
		return await tsa.createTsaProgram
		(	[inFile],
			compilerOptions,
			{	resolve(specifier, _referrer)
				{	if (specifier == inFile)
					{	return specifier;
					}
					return '';
				},
				// deno-lint-ignore require-await
				async load(specifier, _isDynamic)
				{	if (specifier == inFile)
					{	return {kind: 'module', specifier: inFile, content: text, headers: {'content-type': 'application/typescript'}};
					}
				}
			}
		);
	}

	toString()
	{	return this.toTs();
	}
}
