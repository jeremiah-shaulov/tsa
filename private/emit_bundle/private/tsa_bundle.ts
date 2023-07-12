import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';

export class TsaBundle
{	#text: string | undefined;

	constructor(public nodesWithInfo: NodeWithInfo[], private newLine: string)
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

	async toProgram(logToConsole=false, fakeTsFilename='/dev/stdin')
	{	const text = this.toTs(logToConsole);
		return await tsa.createTsaProgram
		(	[fakeTsFilename],
			{	target: tsa.ScriptTarget.ESNext,
				module: tsa.ModuleKind.ESNext,
				outDir: '.',
			},
			{	resolve(specifier, _referrer)
				{	if (specifier == fakeTsFilename)
					{	return specifier;
					}
					return '';
				},
				// deno-lint-ignore require-await
				async load(specifier, _isDynamic)
				{	if (specifier == fakeTsFilename)
					{	return {kind: 'module', specifier: fakeTsFilename, content: text, headers: {'content-type': 'application/typescript'}};
					}
				}
			}
		);
	}

	toString()
	{	return this.toTs();
	}
}
