import {tsa} from '../tsa_ns.ts';
import {printDiagnostics, formatDiagnostics, ensureTempFile} from '../util.ts';

export async function testEmitBundle(entryPoints: ReadonlyArray<string|URL>, compilerOptions?: tsa.CompilerOptions, saveToFileTag='')
{	// Emit ts
	const program = await tsa.createTsaProgram(entryPoints, compilerOptions);
	const bundle = program.emitBundle();
	printDiagnostics(tsa.getPreEmitDiagnostics(program));
	// Transpile the ts to js to see that it's valid
	const program2 = await bundle.toProgram();
	let js = '';
	const result2 = program2.emit
	(	undefined,
		(fileName, text) =>
		{	js = text;
			console.log(`File ${fileName}: ${text.length} chars`);
		}
	);
	// Save `.ts` if needed
	if (saveToFileTag)
	{	const filename = await ensureTempFile(`deno-${saveToFileTag}.ts`);
		await Deno.writeTextFile(filename, bundle.toTs());
	}
	// If there were errors during transpiling, throw exception
	const diagnostics = tsa.getPreEmitDiagnostics(program2).concat(result2.diagnostics);
	if (diagnostics.length)
	{	printDiagnostics(diagnostics);
		throw new Error(formatDiagnostics(diagnostics));
	}
	return js;
}
