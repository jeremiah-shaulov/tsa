export {tsa} from './private/tsa_ns.ts';
export {formatDiagnostics, printDiagnostics} from './private/util.ts';
export {defaultResolve, defaultLoad, type LoadOptions} from './private/load_options.ts';
export {type EmitDocOptions} from './private/convert/mod.ts';
export type * from './private/types/mod.ts';

// TODO: `emit()` from `npm:`
// TODO: support `node:`
// TODO: docs from each function signature
// TODO: remove inherited constructors and index signatures? (`// 22.` in `makeCompatible()`)
