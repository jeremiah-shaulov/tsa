import {tsa} from '../tsa_ns.ts';
import {printDiagnostics, getTmpDirname, writeTextFile} from '../util.ts';
import {path} from '../deps.ts';

export async function testEmitBundle(entryPoints: ReadonlyArray<string|URL>, testName: string, compilerOptions?: tsa.CompilerOptions)
{	// Emit ts
	const host = tsa.createCompilerHost(compilerOptions ?? {});
	const program = await tsa.createTsaProgram(entryPoints, compilerOptions, undefined, host);
	const bundle = program.emitTsaBundle();
	printDiagnostics(tsa.getPreEmitDiagnostics(program));
	// Transpile the ts to js to see that it's valid
	const tmpDir = await getTmpDirname();
	const outFile = path.join(tmpDir, `tsa-${testName}.js`);
	const program2 = await bundle.toProgram({outFile});
	const result2 = program2.emit();
	// Save `.ts` if needed
	if (testName)
	{	const filename = path.join(tmpDir, `tsa-${testName}.ts`);
		writeTextFile(host, filename, bundle.toTs());
	}
	// If there were errors during transpiling, throw exception
	const preDiagnostics = tsa.getPreEmitDiagnostics(program2);
	const diagnostics = preDiagnostics.concat(result2.diagnostics);
	if (diagnostics.length)
	{	printDiagnostics(diagnostics);
		throw new Error(`${preDiagnostics.length} pre-emit errors, ${result2.diagnostics.length} post-emit errors`);
	}
	return outFile;
}
