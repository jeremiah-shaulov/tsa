import {path} from '../../deps.ts';
import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';

export class TsaBundle
{	#text: string | undefined;

	constructor(private ts: typeof tsa, public nodesWithInfo: NodeWithInfo[], private lib: string[]|undefined, private newLine: string)
	{
	}

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

	toString()
	{	return this.toTs();
	}
}
