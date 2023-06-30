import {tsa} from '../tsa_ns.ts';
import {printDiagnostics} from '../util.ts';

export async function testEmit(entryPoints: readonly string[], compilerOptions?: tsa.CompilerOptions)
{	const program = await tsa.createDenoProgram(entryPoints, compilerOptions);
	const result = program.emit
	(	undefined,
		(fileName, text) =>
		{	console.log(`File ${fileName}: ${text.length} chars`);
		}
	);
	const diagnostics = tsa.getPreEmitDiagnostics(program).concat(result.diagnostics);
	printDiagnostics(diagnostics, compilerOptions);
	if (result.emitSkipped)
	{	throw new Error('emit failed');
	}
}
