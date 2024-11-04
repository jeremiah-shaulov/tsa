# `type` LoadOptions

[Documentation Index](../README.md)

```ts
import {LoadOptions} from "https://deno.land/x/tsa@v0.0.24/mod.ts"
```

You can pass `LoadOptions`
to [tsa.createTsaProgram()](../function.createTsaProgram/README.md) that allow to configure the way modules are resolved and loaded.

For example `LoadOptions` allow to substitute source code of a module during loading.

```ts
// To run this example:
// deno run --allow-env --allow-net --allow-read --allow-write example.ts

import {tsa, defaultLoad, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.25/mod.ts';

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

## This type has

- 4 properties:
[importMap](#-importmap-string--url),
[resolve](#-resolve-resolve),
[load](#-load-load),
[createSourceFile](#-createsourcefile-createsourcefile)


#### 📄 importMap?: `string` | URL



#### 📄 resolve?: [Resolve](../private.type.Resolve/README.md)



#### 📄 load?: [Load](../private.type.Load/README.md)



#### 📄 createSourceFile?: [CreateSourceFile](../private.type.CreateSourceFile/README.md)



