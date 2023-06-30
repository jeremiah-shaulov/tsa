import typescript from 'npm:typescript@5.1.3';
import {createDenoProgram} from './create_deno_program.ts';
import {LoadOptions} from './load_options.ts';
import {DocNode} from './types/mod.ts';
import {EmitDocOptions} from './convert/mod.ts';

// deno-lint-ignore no-explicit-any
type Any = any;

// 1. Augment the `typescript` from 'npm:typescript'

(typescript as Any).createDenoProgram = createDenoProgram;

declare module 'npm:typescript@5.1.3'
{	type DenoProgram = Program & {emitDoc(options?: EmitDocOptions): DocNode[]};

	function createDenoProgram(entryPoints: readonly string[], compilerOptions?: CompilerOptions, loadOptions?: LoadOptions): Promise<DenoProgram>;
}

// 2. Reexport the `typescript`

// deno-lint-ignore no-unused-vars
export import tsa = typescript;
