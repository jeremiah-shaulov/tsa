<!--
	This file is generated with the following command:
	deno run --allow-all https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.42/tsa.ts doc-md --outFile=README.md mod.ts --importUrl https://deno.land/x/tsa@v0.0.42/mod.ts --mainTitle 'tsa - Typescript source code analysis and documentation tool' --outUrl https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.42/README.md
-->

# tsa - Typescript source code analysis and documentation tool

[Documentation Index](generated-doc/README.md)

Extension to `tsc` that adds custom file loader, and documentation generator.
It can be used as command-line tool, or programmatically as Typescript library.

The original [Typescript Compiler](https://www.npmjs.com/package/typescript) can load Typescript programs or modules from source files,
and parse them to syntax nodes. This allows to analyze the project, or to bundle it to a single Javascript file.

However `tsc` cannot load files from HTTP URLs as Deno does.

This library solves this issue by adding custom file loader. Also it adds facility to generate syntax nodes in less raw format, so the project structure
can be easily analyzed. The nodes this library produces are compatible with [x/deno\_doc@0.62.0](https://deno.land/x/deno_doc@0.62.0).
Also this library can bundle Typescript project to single Typescript file (not only Javascript), and to generate project documentation in Markdown format.

## Using as command-line tool

To install this tool do:

```bash
deno install --global --allow-env --allow-net --allow-read --allow-write https://deno.land/x/tsa@v0.0.42/tsa.ts
```

The command supports 5 operations:
- `tsa doc-json` (alias: `tsa doc`) - generate JSON AST (abstract syntax tree) that contains functions and classes of the project together with their doc-comments.
- `tsa doc-md` - generate documentation in Markdown format.
- `tsa bundle-js` (alias: `tsa bundle`) - generate `.js` bundle that contains all the files of the project as single ECMA module or program.
- `tsa bundle-ts` - generate `.ts` bundle.
- `tsa types` - generate `.d.ts` file with type declarations.

### tsa doc-json [options] <file1.ts> [fileN.ts...]

Generate JSON AST suitable for further documentation generation.

Options:
- `--outFile <out.json>` - Where to save the result (default: stdout).
- `--pretty` - Produce human-readable JSON.

Example:
```bash
tsa doc-json --pretty --outFile=/tmp/doc.json jsr:@std/bytes
```

### tsa doc-md [options] <file1.ts> [fileN.ts...]

Generate documentation in markdown format.

Options:
- `--outFile <README.md>` (required) - Where to save the result.
- `--outDir <generated-doc>` - This command also creates linked README.md files in the --outDir directory (default: "generated-doc").
The directory will be created near --outFile or existing directory will be emptied if necessary.
- `--mainTitle <My Project>` - The title that will appear in the main README.md file.
- `--importUrl <URL>` - Optionally specify one such flag per each source file in corresponding order.
This lets including in the documentation import examples for public symbols.
The specified importUrl must point to a public registry that downloads (or will download) the same file as provided to the generator.
For example: `tsa doc-md foo/mod.ts --importUrl https://deno.land/foo@1.0.0/mod.ts bar/mod.ts --importUrl https://deno.land/bar@1.0.0/mod.ts`
(the number of --importUrl options must be the same as number of given files).
- `--outUrl <URL>` - If you plan to upload the resulting files to a public resource (such as github),
you can optionally specify URL by which the --outFile will be publicly accessible.
Then you can use script examples in doc-comments marked as `// To run this example:` on the first line,
and followed by a line that contains "example.ts", like `// deno run --allow-all example.ts`, and these lines will be converted to `// To download and run this example:`...

Example:
```bash
mkdir -p /tmp/tsa-test
tsa doc-md --mainTitle 'Standard bytes library' --outFile=/tmp/tsa-test/README.md jsr:@std/bytes
```

This tool has 1 noncommon feature: if `{@linkcode Symbol}` tag lays on it's own line, and has no display text (like `[Display text]{@linkcode Symbol}` or `{@linkcode Symbol|Display text}`),
it produces typescript declaration of the symbol with links to another symbols that appear in the declaration.

### tsa bundle-js [options] <file1.ts> [fileN.ts...]

Bundle Typescript source files to single Javascript module.

Options:
- `--outFile <out.js>` - Where to save the result (default: stdout).
- `--target <ESNext>` - Target JavaScript version. One of: ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ESNext (default: ESNext).

Example:
```bash
tsa bundle --outFile=/tmp/bytes.js jsr:@std/bytes
```

### tsa bundle-ts [options] <file1.ts> [fileN.ts...]

Bundle Typescript source files to single `.ts` module.

Options:
- `--outFile <out.ts>` - Where to save the result (default: stdout).
- `--target <ESNext>` - Target JavaScript version. One of: ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, ES2021, ES2022, ESNext (default: ESNext).

Example:
```bash
tsa bundle-ts --outFile=/tmp/bytes.ts jsr:@std/bytes
```

### tsa types [options] <file1.ts> [fileN.ts...]

Generate type declarations file (DTS).

Options:
- `--outFile <out.d.ts>` - Where to save the result (default: stdout).

## Using as Typescript library

This library internally uses the official [Typescript Compiler](https://www.npmjs.com/package/typescript),
and reexports it's namespace as [tsa](generated-doc/namespace.tsa/README.md) symbol. This namespace contains all of the `ts` namespace,
plus this library extends it by defining [createTsaProgram](generated-doc/function.createTsaProgram/README.md) function within this namespace.

When using [Typescript Compiler](https://www.npmjs.com/package/typescript),
the first step is to create [ts.Program](generated-doc/interface.Program/README.md) by calling [ts.createProgram()](generated-doc/function.createProgram/README.md) function.
Similarly when using this library, the first step is to create [tsa.TsaProgram](generated-doc/interface.TsaProgram/README.md) object by calling [tsa.createTsaProgram()](generated-doc/function.createTsaProgram/README.md).

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.42/README.md' | perl -ne '$y=$1 if /^```(.)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~<example-p9mn>~)' > /tmp/example-p9mn.ts
// deno run --allow-env --allow-net --allow-read --allow-write /tmp/example-p9mn.ts

import {tsa, printDiagnostics, LoadOptions} from 'https://deno.land/x/tsa@v0.0.42/mod.ts';

const SUBJ = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)

// Options for typescript compiler.
// To generate docs, set `declaration` and `emitDeclarationOnly`.
// To bundle leave blank.
const compilerOptions: tsa.CompilerOptions =
{	declaration: true,
	emitDeclarationOnly: true,
};

// Configures how to resolve module specifiers, and how to load module contents.
const loadOptions: LoadOptions =
{
};

// Create typescript program
const program = await tsa.createTsaProgram([SUBJ], compilerOptions, loadOptions);

// Print errors and warnings (if any)
printDiagnostics(tsa.getPreEmitDiagnostics(program));

// Now use the `program` object...
```

[tsa.TsaProgram](generated-doc/interface.TsaProgram/README.md) extends [ts.Program](generated-doc/interface.Program/README.md) by adding 2 methods:
- [tsa.TsaProgram.emitDoc()](generated-doc/interface.TsaProgram/README.md#-emitdocoptions-emitdocoptions-docnodes)
- [tsa.TsaProgram.emitTsaBundle()](generated-doc/interface.TsaProgram/README.md#-emittsabundle-tsabundle)

The purpose of this library is to provide these 2 methods.