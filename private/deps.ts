export const APP_GIT_TAG = 'v0.0.24';

export * as path from 'https://deno.land/std@0.224.0/path/mod.ts';
export {type LoadResponse} from 'https://deno.land/x/deno_graph@0.63.3/mod.ts';
export {cache, directory as cacheDirectory} from 'https://deno.land/x/cache@0.2.13/mod.ts';
export {resolveImportMap, resolveModuleSpecifier, type ImportMap} from 'https://deno.land/x/importmap@0.2.1/mod.ts';
export {Command} from 'https://deno.land/x/cmd@v1.2.0/mod.ts';
export {indentAndWrap} from 'https://deno.land/x/indent_and_wrap@v0.0.17/mod.ts';
export {crc32} from 'https://deno.land/x/crc32hash@v1.0.0/mod.ts';
export {jstok, TokenType as JstokTokenType} from 'https://deno.land/x/jstok@v2.0.0/mod.ts';

// Also the 'npm:typescript' dependency is linked from tsa_ns.ts
