# `interface` ModuleResolutionHost

[Documentation Index](../README.md)

## This interface has

- property [useCaseSensitiveFileNames](#-usecasesensitivefilenames-boolean----boolean)
- 7 methods:
[fileExists](#-fileexistsfilename-string-boolean),
[readFile](#-readfilefilename-string-string),
[trace](#-traces-string-void),
[directoryExists](#-directoryexistsdirectoryname-string-boolean),
[realpath](#-realpathpath-string-string),
[getCurrentDirectory](#-getcurrentdirectory-string),
[getDirectories](#-getdirectoriespath-string-string)


#### 📄 useCaseSensitiveFileNames?: `boolean` | (() => `boolean`)



#### ⚙ fileExists(fileName: `string`): `boolean`



#### ⚙ readFile(fileName: `string`): `string`



#### ⚙ trace?(s: `string`): `void`



#### ⚙ directoryExists?(directoryName: `string`): `boolean`



#### ⚙ realpath?(path: `string`): `string`

> Resolve a symbolic link.



#### ⚙ getCurrentDirectory?(): `string`



#### ⚙ getDirectories?(path: `string`): `string`\[]



