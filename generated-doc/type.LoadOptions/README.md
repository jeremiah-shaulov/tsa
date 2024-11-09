# `type` LoadOptions

[Documentation Index](../README.md)

```ts
import {LoadOptions} from "https://deno.land/x/tsa@v0.0.31/mod.ts"
```

You can pass `LoadOptions`
to [tsa.createTsaProgram()](../function.createTsaProgram/README.md) that allow to configure the way modules are resolved and loaded.

For example `LoadOptions` allow to substitute source code of a module during loading.

```ts
// To download and run this example:
// curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.31/generated-doc/type.LoadOptions/README.md' | perl -ne '$y=$1 if /^```(.)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~<example-7jcr>~)' > /tmp/example-7jcr.ts
// deno run --allow-env --allow-net --allow-read --allow-write /tmp/example-7jcr.ts

import {tsa, defaultLoad, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.31/mod.ts';

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
					 **\/
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
await Deno.writeTextFile(OUT_FILE, JSON.stringify(docNodes.nodes, undefined, '\t'));

// Print the number of `docNodes` written
console.log('%c%d doc-nodes %cwritten to %s', 'color:green', docNodes.nodes.length, '', OUT_FILE);
```

In the following example i use fake input file:

```ts
import {tsa, defaultResolve, defaultLoad, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.31/mod.ts';

const INPUT =
`	/**	The main function.
	**\/
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
	{	resolve(specifier, referrer)
		{	if (specifier == fakeInputFilename)
			{	return specifier;
			}
			return defaultResolve(specifier, referrer);
		},
		async load(specifier, isDynamic)
		{	if (specifier == fakeInputFilename)
			{	return {kind: 'module', specifier, content: INPUT, headers: {'content-type': 'application/typescript'}};
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
console.log(JSON.stringify(docNodes.nodes, undefined, '\t'));
```

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



