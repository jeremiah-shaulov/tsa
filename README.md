# tsa - Typescript source code analysis and documentation tool

This library extracts information from typescript source code that can be used for documentation generation.
It produces result compatible with [x/deno_doc@0.62.0](https://deno.land/x/deno_doc@0.62.0), but uses [Typescript Compiler](https://www.npmjs.com/package/typescript) to detect variable types.

It's similar to [npm:typedoc](https://www.npmjs.com/package/typedoc), but works with Deno standards:
- uses `.ts` filename extension in module specifiers
- allows to import remote modules
- allows to use `lib.deno.ns.d.ts` library to  support `Deno` built-in objects

### Example:

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.7/README.md' | perl -ne '$y=$1 if /^```(ts\\b)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~^// deno .*?/example1.ts~)' > /tmp/example1.ts
// deno run --allow-all /tmp/example1.ts

import {tsa, printDiagnostics, LoadOptions, EmitDocOptions} from 'https://deno.land/x/tsa@v0.0.7/mod.ts';

/**	Options for typescript compiler.
 **/
export const compilerOptions: tsa.CompilerOptions =
{	declaration: true,
	emitDeclarationOnly: true,
	lib: ['lib.esnext.d.ts', 'lib.deno.ns.d.ts'],
};

/**	Configures how to resolve module specifiers, and how to load module contents.
 **/
export const loadOptions: LoadOptions =
{
};

/**	Configures what symbols to include in the result.
	By default it works like `doc` from `x/deno_doc`.
 **/
export const emitDocOptions: EmitDocOptions =
{
};

/**	Generate doc for the current module, and write it to the provided filename.
	@param filename Where to save the doc in JSON format.
 **/
export async function writeSelfDocToFile(filename: string)
{	const program = await tsa.createDenoProgram([import.meta.url], compilerOptions, loadOptions);
	printDiagnostics(tsa.getPreEmitDiagnostics(program));
	const docNodes = program.emitDoc(emitDocOptions);
	await Deno.writeTextFile(filename, JSON.stringify(docNodes, undefined, '\t'));
	console.log('%c%d doc-nodes %cwritten to %s', 'color:green', docNodes.length, '', filename);
}

// Save to `/tmp/doc.json`
await writeSelfDocToFile('/tmp/doc.json');
```

## What's not supported

Currently `npm:` schema in module specifiers is not supported. To avoid reinventing the wheel, i'll wait for `x/deno_graph` to start supporting this.

## How to use from command line

First install the tool:

```bash
deno install --allow-all https://deno.land/x/tsa@v0.0.7/tsa.ts
```

You can use `tsa` as you use `tsc` for generating JavaScript or DTS (other usage patterns are not supported).
And it will do the same operations as `tsc` would, but on project that follows `Deno` standards.

Plus `tsa` can generate source code AST. To do this specify `--outFile` to a file with `.json` extension.

```bash
tsa --declaration --emitDeclarationOnly --outFile /tmp/ast.json 'https://deno.land/x/mysql@v2.11.0/mod.ts'
```

## How to use from Deno projects

This library exports the following symbols:
- `tsa` - Namespace that contains everything from the underlying Typescript Compiler. It's the same namespace that `npm:typescript` exports, with 2 extensions:
	1. type `DenoProgram`, that is extension of `Program`, that adds `emitDoc()` method
	2. function `createDenoProgram()`, that is similar to `createProgram()`, but returns `DenoProgram` instead of `Program`
- `LoadOptions` - Configures how to resolve module specifiers, and how to load module contents
- `EmitDocOptions` - Options for `DenoProgram.emitDoc()`
- `formatDiagnostics()` - Calls one of `tsa.formatDiagnostics()` or `tsa.formatDiagnosticsWithColorAndContext()` depending on the value of `Deno.noColor`
- `printDiagnostics()` - Prints the result of `formatDiagnostics()` to stderr
- Type `DocNode`, array of which `DenoProgram.emitDoc()` returns. It's assignable to the `DocNode` from [x/deno_doc@0.62.0](https://deno.land/x/deno_doc@0.62.0), but contains more information
- Types for `DocNode` fields: `DocNodeKind`, `DocNodeFunction`, `DocNodeVariable`, `DocNodeClass`, and many more
They are assignable to the same types from [x/deno_doc@0.62.0](https://deno.land/x/deno_doc@0.62.0).

```ts
function DenoProgram.createDenoProgram(entryPoints: readonly string[], compilerOptions?: tsa.CompilerOptions, loadOptions?: LoadOptions): Promise<tsa.DenoProgram>;

type DenoProgram = tsa.Program & {emitDoc(options?: EmitDocOptions): DocNode[]};
```

## How the result is different from deno_doc?

`DenoProgram.emitDoc()` returns array of `DocNode` objects, like `doc()` from [x/deno_doc](https://deno.land/x/deno_doc@0.62.0) does.
To understand the information each `DocNode` contains, you need to start from learning [x/deno_doc](https://deno.land/x/deno_doc@0.62.0).

This library adds additional information to `DocNode`:

- `Location` has additional `entryPointNumber` field.
You can pass relative paths to `createDenoProgram()` as entry points, but `Location.filename` always contains corresponding absolute URL. If this filename is one of the entry points, the `entryPointNumber` field will contain the index in `entryPoints` array.
- `DocNode` has additional `exports` field. If a symbol is reexported from several places, those places will be recorded here (including current location). Also if this node is returned as `DeclarationKind != 'export'`, but the symbol is exported from some other entry point or traversed file, `exports` will contain 1 record for the export.
- `ClassPropertyDef` has additional `init` field that contains property initializer (if any).
- `EnumDef` has additional `isConst` field for `const enum`s.
- Doc-comments are returned not only as `doc` string, but also `docTokens`, that have separate parts for comment text and `@link` tags.
- `JsDocTagTyped` (for `@enum`, `@extends`, `@this` and `@type` tags) and `JsDocTagParam` (for `@param`) have additional `tsType` field for the object type.
- `JsDocTagNamed` (for `@callback` and `@template` tags) has additional `tsType` and `typeParams` fields.
- `DecoratorDef` has additional `nodeIndex` field that contains node index in the results where this decorator function is returned, if it's returned.
To include referenced symbols in the result, use `EmitDocOptions.includeReferenced` option.
- References to another named types are returned as `TsTypeRefDef` objects that contain not only `typeName`, but also additional `nodeIndex` field, that contains index in the results for this type.
If the type is an enum member, also `nodeSubIndex` will be set to member number. See `EmitDocOptions.includeReferenced`.
- `ClassDef` has additional `superNodeIndex` field, that contains node index in the results for the super class. See `EmitDocOptions.includeReferenced`.

## Configuration options for the Typescript Compiler (tsa.CompilerOptions)

You can pass `tsa.CompilerOptions` to `tsa.createDenoProgram()`. It works in the same fashion as `typescript.CompilerOptions` for `typescript.createProgram()`, with the following differences:
- `lib` has 2 additional options that you can provide: `lib.deno.ns.d.ts` and `lib.deno.unstable.d.ts`. If you don't specify `lib` explicitly, the default is `lib.deno.ns.d.ts`.
- default value for `allowJs` is `true`.
- default value for `target` is `tsa.ScriptTarget.ESNext`.
- default value for `module` is `tsa.ModuleKind.ESNext`.
- regardless of `allowImportingTsExtensions` value, module specifiers must include `.ts` (or different) extension.

## Module resolution and loading options (LoadOptions)

You can pass `LoadOptions` to `tsa.createDenoProgram()` that allow to configure the way modules are resolved and loaded.

```ts
type LoadOptions =
{	importMap?: string|URL;
	resolve?(specifier: string, referrer: string): string;
	load?(specifier: string, isDynamic: boolean): Promise<LoadResponse|undefined>;
};
```

- `importMap` - An optional URL or path to an import map to be loaded and used to resolve module specifiers.
If both `importMap` and `resolve()` are specified, the `importMap` will be preferred.
- `resolve()` - An optional callback that allows the default resolution logic of the module graph to be "overridden".
This is intended to allow items like an import map to be used with the module graph.
The callback takes the string of the module specifier, as it appears in `import from` or `export from`, and the string URL of the module where this import is found.
The callback then returns a resolved URL to the module file.
- `load()` - An optional callback that is called with the URL string of the resource to be loaded.
The callback should return a `LoadResponse` or `undefined` if the module is not found.
If there are other errors encountered, a rejected promise should be returned.

For example `LoadOptions` allow to substitute source code of a module during loading.

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.7/README.md' | perl -ne '$y=$1 if /^```(ts\\b)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~^// deno .*?/example2.ts~)' > /tmp/example2.ts
// deno run --allow-all /tmp/example2.ts

import {tsa, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.7/mod.ts';
import {load} from 'https://deno.land/x/deno_graph@0.48.1/mod.ts';

/**	Generate doc for the current module, and write it to the provided filename.
	@param filename Where to save the doc in JSON format.
 **/
export async function writeSelfDocToFile(filename: string)
{	const program = await tsa.createDenoProgram
	(	[import.meta.url],
		{	declaration: true,
			emitDeclarationOnly: true,
		},
		{	async load(specifier)
			{	const result = await load(specifier);
				if (result?.kind == 'module')
				{	result.content =
					`	/**	Example module.
							@module
						 **/
						${result.content}
					`;
				}
				return result;
			}
		}
	);
	printDiagnostics(tsa.getPreEmitDiagnostics(program));
	const docNodes = program.emitDoc();
	await Deno.writeTextFile(filename, JSON.stringify(docNodes, undefined, '\t'));
	console.log('%c%d doc-nodes %cwritten to %s', 'color:green', docNodes.length, '', filename);
}

// Save to `/tmp/doc.json`
await writeSelfDocToFile('/tmp/doc.json');
```

## EmitDocOptions

You can pass options to `DenoProgram.emitDoc()` that affect what files to traverse, and what symbols to include in the result.

```ts
type EmitDocOptions =
{	followModuleImports?: boolean;
	includeReferenced?: boolean;
	includeBuiltIn?: boolean;
	ignoreIgnoreTag?: boolean;
	noImportNodes?: boolean;
	includeSymbol?(symbol: tsa.Symbol, isExported: boolean, checker: tsa.TypeChecker): boolean;
};
```

- `followModuleImports` - Work not only on entry points, but on every module that appears in `import from` or `export from` statements.
- `includeReferenced` - `DocNode`s in the result can reference another symbols.
Symbol names can appear in type aliases, type parameters, etc.
Also decorators refer to functions defined somewhere, not necessarily in entry point modules.
If this flag is set to `true`, referenced symbols will be included in the result, and their indices in the resulting array will be recorded in the nodes that refer to them.
The referrers include: `DecoratorDef.nodeIndex`, `TsTypeRefDef.nodeIndex` and `TsTypeRefDef.nodeSubIndex` (for enum members), and `ClassDef.superNodeIndex`.
- `includeBuiltIn` - Also generate docs for referenced built-in objects, like `Map`, `HTMLElement`, etc.
- `ignoreIgnoreTag` - By default symbols marked with `@ignore` tag in their doc-comments, will not be included in the result.
Set this to `true` to ignore the ignore.
- `noImportNodes` - By default, for every symbol that appears in `import from` statement there will be corresponding `DocNode` with `kind == 'import'`.
Set this to `true` to exclude such nodes from the result.
- `includeSymbol()` - Callback function that will be called to ask you whether you want to include every occured symbol in the source files to the result.
By default only exported symbols are processed, and if you set `EmitDocOptions.includeReferenced`, also not exported but referenced ones.
Specify this callback to potentially include other symbols.

## I want to use different tsc version

This library contains typescript compiler inside, and it's version is predefined when the library is packaged.

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.7/README.md' | perl -ne '$y=$1 if /^```(ts\\b)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~^// deno .*?/example3.ts~)' > /tmp/example3.ts
// deno run --allow-all /tmp/example3.ts

import {tsa} from 'https://deno.land/x/tsa@v0.0.7/mod.ts';
console.log(tsa.version);
```

There's no guarantee that it can work with different `tsc` version, but i'll show you one hack that allows to substitute the `tsc`:

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.7/README.md' | perl -ne '$y=$1 if /^```(ts\\b)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~^// deno .*?/example4.ts~)' > /tmp/example4.ts
// deno run --allow-all /tmp/example4.ts

import {tsa} from 'https://deno.land/x/tsa@v0.0.7/mod.ts';

// Different version of typescript
import tsaSubstitute from 'npm:typescript@3.9.3';

const entryPoint = 'https://deno.land/x/case@2.1.1/mod.ts';

// Use `call()` to substitute the typescript namespace
const program = await tsa.createDenoProgram.call(tsaSubstitute, [entryPoint]);

const docNodes = program.emitDoc();
await Deno.writeTextFile('/tmp/doc.json', JSON.stringify(docNodes, undefined, '\t'));
```
