import {tsa} from '../tsa_ns.ts';
import {printDiagnostics, formatDiagnostics} from '../util.ts';

export async function testEmitTs(entryPoints: ReadonlyArray<string|URL>, compilerOptions?: tsa.CompilerOptions)
{	// Emit ts
	const program = await tsa.createDenoProgram(entryPoints, compilerOptions);
	const result = program.emitTs();
	printDiagnostics(tsa.getPreEmitDiagnostics(program));
	let str = '';
	const printer = tsa.createPrinter();
	for (const node of result)
	{	str += printer.printNode(tsa.EmitHint.Unspecified, node, node.getSourceFile()) + '\n';
	}
	// Transpile the ts to js to see that it's valid
	const mainTs = tsa.createSourceFile('main.ts', str, tsa.ScriptTarget.Latest);
	const host = tsa.createCompilerHost({});
	const {getSourceFile} = host;
	host.getSourceFile = (name, languageVersion) =>
	{	if (name === 'main.ts')
		{	return mainTs;
		}
		return getSourceFile(name, languageVersion);
	};
	const program2 = tsa.createProgram(['main.ts'], compilerOptions ?? {}, host);
	const result2 = program2.emit
	(	undefined,
		(fileName, text) =>
		{	console.log(`File ${fileName}: ${text.length} chars`);
		}
	);
	const diagnostics = tsa.getPreEmitDiagnostics(program2).concat(result2.diagnostics);
	if (diagnostics.length)
	{	printDiagnostics(diagnostics);
		throw new Error(formatDiagnostics(diagnostics));
	}
	console.log(str);
}
