/**	Extension to `tsc` that adds custom file loader, and documentation generator.

	The original [Typescript Compiler]{@link https://www.npmjs.com/package/typescript} can load a Typescript module from it's source files,
	and to parse it to syntax nodes that can be analyzed, or to bundle it to a single Javascript file.

	However it cannot load files from HTTP URLs as Deno does.

	This library solves this issue, and adds facility to generate syntax nodes in less raw format, so the project structure
	can be easily analyzed. The nodes this library produces are compatible with [x/deno_doc@0.62.0]{@link https://deno.land/x/deno_doc@0.62.0}.
	Also this library can bundle Typescript project to single Typescript file (not only Javascript), and to generate project documentation in Markdown format.

	This library internally uses the official [Typescript Compiler]{@link https://www.npmjs.com/package/typescript},
	and reexports it's namespace as {@link tsa} symbol. This namespace contains all of the `ts` namespace,
	plus this library extends it by defining [createTsaProgram]{@link tsa.createTsaProgram} function within this namespace.

	When using [Typescript Compiler]{@link https://www.npmjs.com/package/typescript},
	the first step is to create [ts.Program]{@link tsa.Program} by calling [ts.createProgram()]{@link tsa.createProgram} function.
	Similarly when using this library, the first step is to create {@link tsa.TsaProgram} object by calling {@link tsa.createTsaProgram()}.

	```ts
	import {tsa, printDiagnostics, LoadOptions} from './mod.ts';

	const SUBJ = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)

	// Options for typescript compiler.
	// To generate docs, set `declaration` and `emitDeclarationOnly`.
	// To bundle leave blank.
	const compilerOptions: tsa.CompilerOptions =
	{	declaration: true,
		emitDeclarationOnly: true,
	};

	// Configures how to resolve module specifiers, and how to load module contents.
	const loadOptions: LoadOptions =
	{
	};

	// Create typescript program
	const program = await tsa.createTsaProgram([SUBJ], compilerOptions, loadOptions);

	// Print errors and warnings (if any)
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	// Now use the `program` object...
	```

	{@link tsa.TsaProgram} extends [ts.Program]{@link tsa.Program} by adding 2 methods:
	- {@link tsa.TsaProgram.emitDoc()}
	- {@link tsa.TsaProgram.emitTsaBundle()}

	The purpose of this library is to provide these 2 methods, along with extending file loader so it can load modules from HTTP URLs, as adopted in Deno.

	@module
 **/

export
{	/**	Reexport of the typescript compiler.
	 **/
	tsa
} from './private/tsa_ns.ts';

export {DocNodes} from './private/md_gen/mod.ts';
export {formatDiagnostics, printDiagnostics} from './private/util.ts';
export {defaultResolve, defaultLoad, type LoadOptions} from './private/load_options.ts';
export {type EmitDocOptions} from './private/convert/mod.ts';
export type * from './private/doc_node/mod.ts';
export {type NodeWithInfo, TsaBundle} from './private/emit_bundle/mod.ts';
export type {LoadResponse} from './private/deps.ts';
