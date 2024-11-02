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

			import {tsa, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.23/mod.ts';

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

		emitTsaBundle(): TsaBundle;
	}

	function createTsaProgram(entryPoints: ReadonlyArray<string|URL>, compilerOptions?: CompilerOptions, loadOptions?: LoadOptions): Promise<TsaProgram>;
}

// 2. Reexport the `typescript`

// deno-lint-ignore no-unused-vars
export import tsa = typescript;
