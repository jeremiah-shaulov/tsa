import {tsa} from '../tsa.ts';

export async function testEmit(entryPoints: readonly string[], compilerOptions?: tsa.CompilerOptions)
{	const program = await tsa.createDenoProgram(entryPoints, compilerOptions);
	const result = program.emit
	(	program.getSourceFile(entryPoints[0]),
		(fileName, text) =>
		{	console.log(`File ${fileName}: ${text.length} chars`);
		}
	);
	const diagnostics = tsa.getPreEmitDiagnostics(program).concat(result.diagnostics);
	for (const d of diagnostics)
	{	const loc = d.file && d.start && tsa.getLineAndCharacterOfPosition(d.file, d.start);
		const locText = loc && d.file ? `${d.file.fileName}(${loc.line + 1}:${loc.character + 1}): ` : '';
		console.error(locText + tsa.flattenDiagnosticMessageText(d.messageText, '\n'));
	}
	if (result.emitSkipped)
	{	throw new Error('emit failed');
	}
}
