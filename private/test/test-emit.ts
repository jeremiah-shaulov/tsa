import {tsa} from '../tsa_ns.ts';
import {printDiagnostics} from '../util.ts';

export async function testEmit(entryPoints: ReadonlyArray<string|URL>, compilerOptions?: tsa.CompilerOptions)
{	const program = await tsa.createDenoProgram(entryPoints, compilerOptions);
	const result = program.emit
	(	undefined,
		(fileName, text) =>
		{	console.log(`File ${fileName}: ${text.length} chars`);
		}
	);
	printDiagnostics(tsa.getPreEmitDiagnostics(program));
	printDiagnostics(result.diagnostics);
	if (result.emitSkipped)
	{	throw new Error('emit failed');
	}
}
