import typescript from 'npm:typescript@5.6.2';
import {createTsaProgram} from './create_deno_program.ts';
import {LoadOptions} from './load_options.ts';
import {DocNodes} from './md_gen/mod.ts';
import {EmitDocOptions} from './convert/mod.ts';
import {TsaBundle} from './emit_bundle/mod.ts';

// deno-lint-ignore no-explicit-any
type Any = any;

// 1. Augment the `typescript` from 'npm:typescript'

(typescript as Any).createTsaProgram = createTsaProgram;

declare module 'npm:typescript@5.6.2'
{	interface TsaProgram extends Program
	{	// methods:

		/**	Generate
			{@link DocNode} object for each symbol in the source code, which is subject to documentation.

			By default it works as [x/deno_doc@0.62.0]{@link https://deno.land/x/deno_doc@0.62.0}, that is, it generates
			nodes for each toplevel (exported or not) symbol in the module, and also for `import` statements.

			`options` allow to adjust the behavior.
			- {@link EmitDocOptions.noImportNodes} allows to exclude nodes that represent `import` statements.
			- {@link EmitDocOptions.includeReferenced} allows to generate nodes also for symbols referenced from other generated nodes.
			For example to include symbols that appear in function return types, class properties, etc.

			```ts
			// To run this example:
			// deno run --allow-env --allow-net --allow-read --allow-write example.ts

			import {tsa, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.25/mod.ts';

			const SUBJ = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)

			// Create typescript program
			const program = await tsa.createTsaProgram([SUBJ], {declaration: true, emitDeclarationOnly: true});

			// Print errors and warnings (if any)
			printDiagnostics(tsa.getPreEmitDiagnostics(program));

			// Generate doc
			const docNodes = program.emitDoc({includeReferenced: true, noImportNodes: true});

			// Print the resulting nodes (`tsa doc` command saves these nodes to a JSON file)
			console.log(docNodes.nodes);
			```
		 **/
		emitDoc(options?: EmitDocOptions): DocNodes;

		/**	Produces sequence of statements taken from source files, that can be put to a single file.
		 **/
		emitTsaBundle(): TsaBundle;
	}

	/**	### Configuration options for the Typescript Compiler (tsa.CompilerOptions)

		You can pass {@link tsa.CompilerOptions} to `tsa.createTsaProgram()`. It works in the same fashion as `typescript.CompilerOptions` for [typescript.createProgram()]{@link tsa.createProgram}, with the following differences:
		- `lib` has 2 additional options that you can provide: `lib.deno.ns.d.ts` and `lib.deno.unstable.d.ts`. If you don't specify `lib` explicitly, the default is `lib.deno.ns.d.ts`.
		- default value for {@link tsa.CompilerOptions.allowJs} is `true`.
		- default value for {@link tsa.CompilerOptions.resolveJsonModule} is `true`.
		- default value for {@link tsa.CompilerOptions.allowSyntheticDefaultImports} is `true`.
		- default value for {@link tsa.CompilerOptions.target} is {@link tsa.ScriptTarget.ESNext}.
		- default value for {@link tsa.CompilerOptions.module} is {@link tsa.ModuleKind.ESNext}.
		- default value for {@link tsa.CompilerOptions.moduleResolution} is {@link tsa.ModuleResolutionKind.NodeNext}.
		- regardless of {@link tsa.CompilerOptions.allowImportingTsExtensions} value, module specifiers must include `.ts` (or different) extension.

		If the goal is to generate docs, you usually need to set {@link tsa.CompilerOptions.declaration} and {@link tsa.CompilerOptions.emitDeclarationOnly} to true.
		Else the compiler will not know that you're not going to write Javascript files, and can complain.

		To produce bundle no special options are needed, and you can leave the options blank.
	 **/
	function createTsaProgram(entryPoints: ReadonlyArray<string|URL>, compilerOptions?: CompilerOptions, loadOptions?: LoadOptions): Promise<TsaProgram>;
}

// 2. Reexport the `typescript`

// deno-lint-ignore no-unused-vars
export import tsa = typescript;
