# `interface` ParseConfigHost `extends` [ModuleResolutionHost](../interface.ModuleResolutionHost/README.md)

[Documentation Index](../README.md)

## This interface has

- property [useCaseSensitiveFileNames](#-usecasesensitivefilenames-boolean)
- 4 methods:
[readDirectory](#-readdirectoryrootdir-string-extensions-readonly-string-excludes-readonly-string--undefined-includes-readonly-string-depth-number-readonly-string),
[fileExists](#-fileexistspath-string-boolean),
[readFile](#-readfilepath-string-string),
[trace](#-traces-string-void)
- 4 inherited members from [ModuleResolutionHost](../interface.ModuleResolutionHost/README.md)


#### 📄 useCaseSensitiveFileNames: `boolean`



#### ⚙ readDirectory(rootDir: `string`, extensions: readonly `string`\[], excludes: readonly `string`\[] | `undefined`, includes: readonly `string`\[], depth?: `number`): readonly `string`\[]



#### ⚙ fileExists(path: `string`): `boolean`

> Gets a value indicating whether the specified path exists and is a file.
> 
> 🎚️ Parameter **path**:
> 
> The path to test.



#### ⚙ readFile(path: `string`): `string`



#### ⚙ trace?(s: `string`): `void`



