import typescript from 'npm:typescript@5.1.6';
import {createDenoProgram} from './create_deno_program.ts';
import {LoadOptions} from './load_options.ts';
import {DocNode} from './doc_node/mod.ts';
import {EmitDocOptions} from './convert/mod.ts';
import {NodeWithInfo} from './emit_ts/private/bundler.ts';

// deno-lint-ignore no-explicit-any
type Any = any;

// 1. Augment the `typescript` from 'npm:typescript'

(typescript as Any).createDenoProgram = createDenoProgram;

declare module 'npm:typescript@5.1.6'
{	interface DenoProgram extends Program
	{	emitDoc(options?: EmitDocOptions): DocNode[];
		emitTs(): NodeWithInfo[];
	}

	function createDenoProgram(entryPoints: ReadonlyArray<string|URL>, compilerOptions?: CompilerOptions, loadOptions?: LoadOptions): Promise<DenoProgram>;
}

// 2. Reexport the `typescript`

// deno-lint-ignore no-unused-vars
export import tsa = typescript;
