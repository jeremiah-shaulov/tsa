import {tsa} from '../tsa_ns.ts';
import {printDiagnostics, formatDiagnostics, ensureTempFile} from '../util.ts';

export async function testEmitBundle(entryPoints: ReadonlyArray<string|URL>, testName: string, compilerOptions?: tsa.CompilerOptions)
{	// Emit ts
	const program = await tsa.createTsaProgram(entryPoints, compilerOptions);
	const bundle = program.emitBundle();
	printDiagnostics(tsa.getPreEmitDiagnostics(program));
	// Transpile the ts to js to see that it's valid
	const outFile = await ensureTempFile(`tsa-${testName}.js`);
	const program2 = await bundle.toProgram({outFile});
	const result2 = program2.emit();
	// Save `.ts` if needed
	if (testName)
	{	const filename = await ensureTempFile(`tsa-${testName}.ts`);
		await Deno.writeTextFile(filename, bundle.toTs());
	}
	// If there were errors during transpiling, throw exception
	const diagnostics = tsa.getPreEmitDiagnostics(program2).concat(result2.diagnostics);
	if (diagnostics.length)
	{	printDiagnostics(diagnostics);
		throw new Error(formatDiagnostics(diagnostics));
	}
	return outFile;
}
