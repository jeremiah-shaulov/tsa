export * as path from 'https://deno.land/std@0.193.0/path/mod.ts';
export {type LoadResponse} from 'https://deno.land/x/deno_graph@0.48.1/mod.ts';
export {cache, directory as cacheDirectory} from 'https://deno.land/x/cache@0.2.13/mod.ts';
export {resolveImportMap, resolveModuleSpecifier, type ImportMap} from 'https://deno.land/x/importmap@0.2.1/mod.ts';
export {Command} from 'https://deno.land/x/cmd@v1.2.0/mod.ts';
export {writeAll} from 'https://deno.land/std@0.193.0/streams/write_all.ts';

// Also the 'npm:typescript' dependency is linked from tsa_ns.ts
