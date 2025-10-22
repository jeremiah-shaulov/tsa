export const APP_GIT_TAG = 'v0.0.55';

export {type LoadResponse} from 'https://deno.land/x/deno_graph@0.63.3/mod.ts';
export {cache, remove, directory as cacheDirectory} from 'https://deno.land/x/cache@0.2.13/mod.ts';
export {resolveImportMap, resolveModuleSpecifier, type ImportMap} from 'https://deno.land/x/importmap@0.2.1/mod.ts';
export {Command} from 'https://deno.land/x/cmd@v1.2.0/mod.ts';
export {indentAndWrap} from 'https://deno.land/x/indent_and_wrap@v0.0.17/mod.ts';
export {crc32} from 'https://deno.land/x/crc32hash@v2.0.1/mod.ts';
export {jstok, TokenType as JstokTokenType} from 'https://deno.land/x/jstok@v2.0.0/mod.ts';
export * as path from 'jsr:@std/path@1.0.8';
export * as semver from 'jsr:@std/semver@1.0.3';

// Also the 'npm:typescript' dependency is linked from tsa_ns.ts
