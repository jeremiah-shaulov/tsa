# tsa - Typescript source code analysis and documentation tool

This library extracts information from typescript source code that can be used for generating docs.
It produces result compatible with [x/deno_doc@0.62.0](https://deno.land/x/deno_doc@0.62.0), but uses [Typescript Compiler](https://www.npmjs.com/package/typescript) to detect variable types.

It's similar to [npm:typedoc](https://www.npmjs.com/package/typedoc), but works with Deno standards:
- uses `.ts` filename extension in module specifiers
- allows to import remote modules
- allows to use `lib.deno.ns.d.ts` library to  support `Deno` built-in objects
- (current support for `npm:` schema in module specifiers is not stable)

This tool can be used as command-line script, or from Deno projects.

## Using from command line

First install the tool:

```bash
deno install --allow-env --allow-net --allow-read --allow-write https://deno.land/x/tsa@v0.0.15/tsa.ts
```

The command supports 3 operations:
- `tsa doc` - generate JSON AST (abstract syntax tree) that contains functions and classes of the project together with their doc-comments.
- `tsa types` - generate `.d.ts` file with type declarations.
- `tsa bundle` - generate `.js` bundle that contains all the files of the project as single ECMA module.

```bash
tsa doc --pretty https://deno.land/x/dir@1.5.1/mod.ts
```

```bash
tsa types https://deno.land/x/dir@1.5.1/mod.ts
```

```bash
tsa bundle https://deno.land/x/dir@1.5.1/mod.ts
```

## Using from Deno projects

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.15/README.md' | perl -ne '$y=$1 if /^```(ts\\b)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~^// deno .*?/example1.ts~)' > /tmp/example1.ts
// deno run --allow-env --allow-net --allow-read --allow-write /tmp/example1.ts

import {tsa, printDiagnostics, LoadOptions, EmitDocOptions} from 'https://deno.land/x/tsa@v0.0.15/mod.ts';

const DOCS_FOR = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)
const OUT_FILE = '/tmp/doc.json';

/**	Options for typescript compiler.
	To generate docs, set `declaration` and `emitDeclarationOnly`.
	To bundle leave blank.
 **/
const compilerOptions: tsa.CompilerOptions =
{	declaration: true,
	emitDeclarationOnly: true,
};

/**	Configures how to resolve module specifiers, and how to load module contents.
 **/
const loadOptions: LoadOptions =
{
};

/**	Configures what symbols to include in the result.
	By default it works like `doc` from `x/deno_doc`.
 **/
const emitDocOptions: EmitDocOptions =
{
};

// Create typescript program
const program = await tsa.createTsaProgram([DOCS_FOR], compilerOptions, loadOptions);

// Print errors and warnings (if any)
printDiagnostics(tsa.getPreEmitDiagnostics(program));

// Generate the docs
const docNodes = program.emitDoc(emitDocOptions);

// Save the docs to file
await Deno.writeTextFile(OUT_FILE, JSON.stringify(docNodes, undefined, '\t'));

// Print the number of `docNodes` written
console.log('%c%d doc-nodes %cwritten to %s', 'color:green', docNodes.length, '', OUT_FILE);
```

This library exports the following symbols:
- `tsa` - Namespace that contains everything from the underlying Typescript Compiler. It's the same namespace that `npm:typescript` exports, with 2 extensions:
	1. type `TsaProgram`, that is extension of `Program`, that adds `emitDoc()` and `emitTsaBundle()` methods
	2. function `createTsaProgram()`, that is similar to `createProgram()`, but returns `TsaProgram` instead of `Program`
- `LoadOptions` - Configures how to resolve module specifiers, and how to load module contents
- `defaultResolve()` - Function that is used by default if `LoadOptions.resolve()` is not set
- `defaultLoad()` - Function that is used by default if `LoadOptions.load()` is not set. It loads from files or external URLs, and caches external resources.
- `EmitDocOptions` - Options for `TsaProgram.emitDoc()`
- `formatDiagnostics()` - Calls one of `tsa.formatDiagnostics()` or `tsa.formatDiagnosticsWithColorAndContext()` depending on the value of `Deno.noColor`
- `printDiagnostics()` - Prints the result of `formatDiagnostics()` to stderr
- Type `DocNode`, array of which `TsaProgram.emitDoc()` returns. It's assignable to the `DocNode` from [x/deno_doc@0.62.0](https://deno.land/x/deno_doc@0.62.0), but contains more information
- Types for `DocNode` fields: `DocNodeKind`, `DocNodeFunction`, `DocNodeVariable`, `DocNodeClass`, and many more
They are assignable to the same types from [x/deno_doc@0.62.0](https://deno.land/x/deno_doc@0.62.0).
- Class `TsaBundle` - what `TsaProgram.emitTsaBundle()` returns.
This object represents bundle that contains all the source files, and can be converted to a Typescript or Javascript code (and saved to file).

```ts
function tsa.createTsaProgram(entryPoints: ReadonlyArray<string|URL>, compilerOptions?: tsa.CompilerOptions, loadOptions?: LoadOptions): Promise<tsa.TsaProgram>;

interface tsa.TsaProgram extends tsa.Program
{	emitDoc(options?: EmitDocOptions): DocNode[];
	emitTsaBundle(): TsaBundle;
}
```

## How the result is different from deno_doc?

`TsaProgram.emitDoc()` returns array of `DocNode` objects, like `doc()` from [x/deno_doc](https://deno.land/x/deno_doc@0.62.0) does.
To understand the information each `DocNode` contains, you need to start from learning [x/deno_doc](https://deno.land/x/deno_doc@0.62.0).

This library adds additional information to `DocNode`:

- `Location` has additional `entryPointNumber` field.
You can pass relative paths to `createTsaProgram()` as entry points, but `Location.filename` always contains corresponding absolute URL. If this filename is one of the entry points, the `entryPointNumber` field will contain the index in `entryPoints` array.
- `DocNode` has additional `exports` field. If a symbol is reexported from several places, those places will be recorded here (including current location).
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
- `TsTypeDef.repr` field for string literals (`kind == 'string'`) contains quotes, for string template literals (`kind == 'template'`) contains backticks, and for bigint literals (`kind == 'bigInt'`) has trailing `n`.

## Configuration options for the Typescript Compiler (tsa.CompilerOptions)

You can pass `tsa.CompilerOptions` to `tsa.createTsaProgram()`. It works in the same fashion as `typescript.CompilerOptions` for `typescript.createProgram()`, with the following differences:
- `lib` has 2 additional options that you can provide: `lib.deno.ns.d.ts` and `lib.deno.unstable.d.ts`. If you don't specify `lib` explicitly, the default is `lib.deno.ns.d.ts`.
- default value for `allowJs` is `true`.
- default value for `resolveJsonModule` is `true`.
- default value for `allowSyntheticDefaultImports` is `true`.
- default value for `target` is `tsa.ScriptTarget.ESNext`.
- default value for `module` is `tsa.ModuleKind.ESNext`.
- default value for `moduleResolution` is `tsa.ModuleResolutionKind.NodeNext`.
- regardless of `allowImportingTsExtensions` value, module specifiers must include `.ts` (or different) extension.

If the goal is to generate docs, you usually need to set `declaration` and `emitDeclarationOnly` to true.
Else the compiler will not know that you're not going to write Javascript files, and can complain.

To produce bundle no special options are needed, and you can leave the options blank.

## Module resolution and loading options (LoadOptions)

You can pass `LoadOptions` to `tsa.createTsaProgram()` that allow to configure the way modules are resolved and loaded.

```ts
type LoadOptions =
{	importMap?: string | URL;
	resolve?(specifier: string, referrer: string): string | Promise<string>;
	load?(specifier: string, isDynamic: boolean): LoadResponse | undefined | Promise<LoadResponse|undefined>;
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
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.15/README.md' | perl -ne '$y=$1 if /^```(ts\\b)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~^// deno .*?/example2.ts~)' > /tmp/example2.ts
// deno run --allow-env --allow-net --allow-read --allow-write /tmp/example2.ts

import {tsa, defaultLoad, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.15/mod.ts';

const DOCS_FOR = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)
const OUT_FILE = '/tmp/doc.json';

// Create typescript program
const program = await tsa.createTsaProgram
(	[DOCS_FOR],
	{	declaration: true,
		emitDeclarationOnly: true,
	},
	{	async load(specifier, isDynamic)
		{	// Load the module contents
			const result = await defaultLoad(specifier, isDynamic);
			// If the module was found, substitute it's contents
			if (result?.kind == 'module')
			{	result.content =
				`	/**	Example module.
						@module
						**/
					${result.content}
				`;
			}
			// Return the result
			return result;
		}
	}
);

// Print errors and warnings (if any)
printDiagnostics(tsa.getPreEmitDiagnostics(program));

// Generate the docs
const docNodes = program.emitDoc();

// Save the docs to file
await Deno.writeTextFile(OUT_FILE, JSON.stringify(docNodes, undefined, '\t'));

// Print the number of `docNodes` written
console.log('%c%d doc-nodes %cwritten to %s', 'color:green', docNodes.length, '', OUT_FILE);
```

In the following example i use fake input file:

```ts
import {tsa, defaultResolve, defaultLoad, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.15/mod.ts';

const INPUT =
`	/**	The main function.
	 **/
	export function main()
	{	return 0;
	}
`;

// Create typescript program
const fakeInputFilename = 'main.ts';
const program = await tsa.createTsaProgram
(	[fakeInputFilename],
	{	declaration: true,
		emitDeclarationOnly: true,
	},
	{	resolve(specifier, _referrer)
		{	if (specifier == fakeInputFilename)
			{	return specifier;
			}
			return defaultResolve(specifier, _referrer);
		},
		async load(specifier, isDynamic)
		{	if (specifier == fakeInputFilename)
			{	return {kind: 'module', specifier: fakeInputFilename, content: INPUT, headers: {'content-type': 'application/typescript'}};
			}
			return await defaultLoad(specifier, isDynamic);
		}
	}
);

// Print errors and warnings (if any)
printDiagnostics(tsa.getPreEmitDiagnostics(program));

// Generate the docs
const docNodes = program.emitDoc();

// Print the docs
console.log(JSON.stringify(docNodes, undefined, '\t'));
```

## EmitDocOptions

You can pass options to `TsaProgram.emitDoc()` that affect what files to traverse, and what symbols to include in the result.

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

## Bundling

It's possible to assemble all the source files to a single file.

```ts
import {tsa, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.15/mod.ts';

const BUNDLE_FOR = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)
const OUT_TS_FILE = '/tmp/dist.ts';
const OUT_JS_FILE = '/tmp/dist.js';

// Create typescript program
const program = await tsa.createTsaProgram([BUNDLE_FOR]);

// Print errors and warnings (if any)
printDiagnostics(tsa.getPreEmitDiagnostics(program));

// Generate the bundle
const bundle = program.emitTsaBundle();

// Save to `.ts`
await Deno.writeTextFile(OUT_TS_FILE, bundle.toTs());

// Create another program with our bundle loaded into it
const program2 = await bundle.toProgram({outFile: OUT_JS_FILE});

// Transpile to `.js`
program2.emit();
```

If one of source files was plain Javascript, the `.ts` bundle can end up invalid by the means of Typescipt.
But still it can be transpiled to `.js`.

`TsaProgram.emitTsaBundle()` returns `TsaBundle` object, that contains array of code nodes, where to each node attached information about it's source file.

`TsaBundle` has 2 methods:

```ts
function TsaBundle.toTs(logToConsole=false): string;
function TsaBundle.toProgram(compilerOptions: tsa.CompilerOptions, logToConsole=false): Promise<tsa.TsaProgram>;
```

`TsaBundle.toTs()` uses `tsa.createPrinter()` to print all the source nodes without transpilation to Javascript.

`TsaBundle.toProgram()` creates another typescript compiler program, and loads the bundle to it.

## I want to use different tsc version

This library contains typescript compiler inside, and it's version is predefined when the library is packaged.

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.15/README.md' | perl -ne '$y=$1 if /^```(ts\\b)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~^// deno .*?/example3.ts~)' > /tmp/example3.ts
// deno run --allow-env --allow-net --allow-read --allow-write /tmp/example3.ts

import {tsa} from 'https://deno.land/x/tsa@v0.0.15/mod.ts';
console.log(tsa.version);
```

There's no guarantee that it can work with different `tsc` version, but i'll show you one hack that allows to substitute the `tsc`:

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.15/README.md' | perl -ne '$y=$1 if /^```(ts\\b)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~^// deno .*?/example4.ts~)' > /tmp/example4.ts
// deno run --allow-env --allow-net --allow-read --allow-write /tmp/example4.ts

import {tsa} from 'https://deno.land/x/tsa@v0.0.15/mod.ts';

// Different version of typescript
import tsaSubstitute from 'npm:typescript@3.9.3';

const entryPoint = 'https://deno.land/x/case@2.1.1/mod.ts';

// Use `call()` to substitute the typescript namespace
const program = await tsa.createTsaProgram.call(tsaSubstitute, [entryPoint]);

const docNodes = program.emitDoc();
await Deno.writeTextFile('/tmp/doc.json', JSON.stringify(docNodes, undefined, '\t'));
```
