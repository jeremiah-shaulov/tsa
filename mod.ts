/**	Extension to `tsc` that adds custom files loader, and AST generator.

	@module
 **/

export {tsa} from './private/tsa_ns.ts';
export {mdGen} from './private/md_gen/mod.ts';
export {formatDiagnostics, printDiagnostics} from './private/util.ts';
export {defaultResolve, defaultLoad, type LoadOptions} from './private/load_options.ts';
export {type EmitDocOptions} from './private/convert/mod.ts';
export type * from './private/doc_node/mod.ts';
export {type NodeWithInfo, TsaBundle} from './private/emit_bundle/mod.ts';
export type {LoadResponse} from './private/deps.ts';

// TODO: more command line arguments for `tsa`
// TODO: support `npm:` and `node:`
// TODO: docs from each function signature
// TODO: remove inherited constructors and index signatures? (`// 22.` in `makeCompatible()`)
// TODO: exclude dead code, and merge identical declarations
// TODO: source maps
// TODO: different lib.deno.ns versions
