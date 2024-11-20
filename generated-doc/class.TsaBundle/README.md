# `class` TsaBundle

[Documentation Index](../README.md)

```ts
import {TsaBundle} from "https://deno.land/x/tsa@v0.0.45/mod.ts"
```

This object represents bundle that contains all the source files, and can be converted to a Typescript or Javascript code (and saved to file).

## This class has

- [constructor](#-constructorts-typeof-tsa-nodeswithinfo-nodewithinfo-hasexports-boolean-lib-string--undefined-newline-string)
- 2 properties:
[nodesWithInfo](#-nodeswithinfo-nodewithinfo),
[hasExports](#-hasexports-boolean)
- 3 methods:
[toTs](#-totslogtoconsole-booleanfalse-string),
[toProgram](#-toprogramcompileroptions-tsacompileroptions-logtoconsole-booleanfalse-promisetsaprogram),
[toString](#-tostring-string)


#### 🔧 `constructor`(ts: `typeof` tsa, nodesWithInfo: [NodeWithInfo](../type.NodeWithInfo/README.md)\[], hasExports: `boolean`, lib: `string`\[] | `undefined`, newLine: `string`)



#### 📄 nodesWithInfo: [NodeWithInfo](../type.NodeWithInfo/README.md)\[]



#### 📄 hasExports: `boolean`



#### ⚙ toTs(logToConsole: `boolean`=false): `string`

> Convert this bundle to single Typescript file that contains all the imported modules.
> Returns source code of the file as string.



#### ⚙ toProgram(compilerOptions: [tsa.CompilerOptions](../interface.CompilerOptions/README.md), logToConsole: `boolean`=false): Promise\<[TsaProgram](../interface.TsaProgram/README.md)>

> Convert this bundle to another
> [tsa.TsaProgram](../interface.TsaProgram/README.md), on which you can call [tsa.TsaProgram.emit()](../interface.Program/README.md#-emittargetsourcefile-sourcefile-writefile-writefilecallback-cancellationtoken-cancellationtoken-emitonlydtsfiles-boolean-customtransformers-customtransformers-emitresult) to convert it to single Javascript file.
> This method first calls [toTs()](../class.TsaBundle/README.md#-totslogtoconsole-booleanfalse-string), and then [tsa.createTsaProgram()](../function.createTsaProgram/README.md).
> 
> ```ts
> // To download and run this example:
> // curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.45/generated-doc/class.TsaBundle/README.md' | perl -ne '$y=$1 if /^```(.)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~<example-n53o>~)' > /tmp/example-n53o.ts
> // deno run --allow-env --allow-net --allow-read --allow-write /tmp/example-n53o.ts
> 
> import {tsa, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.45/mod.ts';
> 
> const SUBJ = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)
> const OUT_FILE = '/tmp/dist.js';
> 
> // Create typescript program
> const program = await tsa.createTsaProgram([SUBJ]);
> 
> // Print errors and warnings (if any)
> printDiagnostics(tsa.getPreEmitDiagnostics(program));
> 
> // Bundle
> const bundle = program.emitTsaBundle();
> 
> // Convert the bundle to another program
> const program2 = await bundle.toProgram({outFile: OUT_FILE, target: tsa.ScriptTarget.ESNext});
> printDiagnostics(tsa.getPreEmitDiagnostics(program2));
> 
> // Transpile
> let contents = '';
> const result = program2.emit
> (	undefined,
> 	(_fileName, text) =>
> 	{	contents = text;
> 	}
> );
> printDiagnostics(result.diagnostics);
> if (result.emitSkipped)
> {	console.error('Fatal errors');
> }
> else
> {	// If not a module, wrap the code in an async scope
> 	if (!bundle.hasExports)
> 	{	contents = `(async function() {\n${contents}\n})()`;
> 	}
> 	// Save the code to file
> 	await Deno.writeTextFile(OUT_FILE, contents);
> 	// Done
> 	console.error(`File saved: ${OUT_FILE}`);
> }
> ```



#### ⚙ toString(): `string`

> Alias of
> [toTs()](../class.TsaBundle/README.md#-totslogtoconsole-booleanfalse-string)



