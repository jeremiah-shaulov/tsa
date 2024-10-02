import typescript from 'npm:typescript@5.6.2';
import {createTsaProgram} from './create_deno_program.ts';
import {LoadOptions} from './load_options.ts';
import {DocNode} from './doc_node/mod.ts';
import {EmitDocOptions} from './convert/mod.ts';
import {TsaBundle} from './emit_bundle/mod.ts';

// deno-lint-ignore no-explicit-any
type Any = any;

// 1. Augment the `typescript` from 'npm:typescript'

(typescript as Any).createTsaProgram = createTsaProgram;

declare module 'npm:typescript@5.6.2'
{	interface TsaProgram extends Program
	{	emitDoc(options?: EmitDocOptions): DocNode[];
		emitTsaBundle(): TsaBundle;
	}

	function createTsaProgram(entryPoints: ReadonlyArray<string|URL>, compilerOptions?: CompilerOptions, loadOptions?: LoadOptions): Promise<TsaProgram>;
}

// 2. Reexport the `typescript`

// deno-lint-ignore no-unused-vars
export import tsa = typescript;
