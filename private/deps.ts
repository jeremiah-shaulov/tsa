export * as path from 'https://deno.land/std@0.212.0/path/mod.ts';
export {type LoadResponse} from 'https://deno.land/x/deno_graph@0.63.3/mod.ts';
export {cache, directory as cacheDirectory} from 'https://deno.land/x/cache@0.2.13/mod.ts';
export {resolveImportMap, resolveModuleSpecifier, type ImportMap} from 'https://deno.land/x/importmap@0.2.1/mod.ts';
export {Command} from 'https://deno.land/x/cmd@v1.2.0/mod.ts';

// Also the 'npm:typescript' dependency is linked from tsa_ns.ts
