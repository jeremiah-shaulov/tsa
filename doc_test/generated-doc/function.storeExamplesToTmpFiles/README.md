# `function` storeExamplesToTmpFiles

[Documentation Index](../README.md)

```ts
import {storeExamplesToTmpFiles} from "https://deno.land/x/tsa@v0.0.49/doc_test/mod.ts"
```

`function` storeExamplesToTmpFiles(testFilename: `string`): Promise\<\{exampleName: `string`, filename: `string`, prelude: `string`}\[]>

After generating markdown documentation for a project with [tsa](../../../README.md), you can use this function
to extract executable code examples from `.md` files, and store them to temporary directory.
Then you can use them as unit-tests.

This only works if you specified `--outUrl` and `--importUrl` when generated the docs.

First generate the docs:

```bash
tsa doc-md --outFile=README.md --outUrl https://raw.githubusercontent.com/··········/README.md --importUrl https://deno.land/x/··········/mod.ts mod.ts
```

Then create a `*.test.ts` file in any project directory. For example:

```ts
// from_readme.test.ts

import {storeExamplesToTmpFiles} from 'https://deno.land/x/tsa@v0.0.49/doc_test/mod.ts';

for (const {exampleName, filename, prelude} of await storeExamplesToTmpFiles(import.meta.url))
{	const func = async function()
	{	await import(filename);
	};
	Object.defineProperty(func, 'name', {value: exampleName, writable: false});
	Deno.test(func);
}
```

🎚️ Parameter **testFilename**:

URL or absolute filename of a file in the current project, usually the URL of this `*.test.ts` file.
The function will look for main `README.md` file starting from this directory and going to parent directories.
When found, it will extract from it all the needed information.

