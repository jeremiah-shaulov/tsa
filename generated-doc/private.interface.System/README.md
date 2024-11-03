# `interface` System

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[args](#-args-string),
[newLine](#-newline-string),
[useCaseSensitiveFileNames](#-usecasesensitivefilenames-boolean)
- 29 methods:
[write](#-writes-string-void),
[writeOutputIsTTY](#-writeoutputistty-boolean),
[getWidthOfTerminal](#-getwidthofterminal-number),
[readFile](#-readfilepath-string-encoding-string-string),
[getFileSize](#-getfilesizepath-string-number),
[writeFile](#-writefilepath-string-data-string-writebyteordermark-boolean-void),
[watchFile](#-watchfilepath-string-callback-filewatchercallback-pollinginterval-number-options-watchoptions-filewatcher),
[watchDirectory](#-watchdirectorypath-string-callback-directorywatchercallback-recursive-boolean-options-watchoptions-filewatcher),
[resolvePath](#-resolvepathpath-string-string),
[fileExists](#-fileexistspath-string-boolean),
[directoryExists](#-directoryexistspath-string-boolean),
[createDirectory](#-createdirectorypath-string-void),
[getExecutingFilePath](#-getexecutingfilepath-string),
[getCurrentDirectory](#-getcurrentdirectory-string),
[getDirectories](#-getdirectoriespath-string-string),
[readDirectory](#-readdirectorypath-string-extensions-readonly-string-exclude-readonly-string-include-readonly-string-depth-number-string),
[getModifiedTime](#-getmodifiedtimepath-string-date),
[setModifiedTime](#-setmodifiedtimepath-string-time-date-void),
[deleteFile](#-deletefilepath-string-void),
[createHash](#-createhashdata-string-string),
[createSHA256Hash](#-createsha256hashdata-string-string),
[getMemoryUsage](#-getmemoryusage-number),
[exit](#-exitexitcode-number-void),
[realpath](#-realpathpath-string-string),
[setTimeout](#-settimeoutcallback-args-any--void-ms-number-args-any-any),
[clearTimeout](#-cleartimeouttimeoutid-any-void),
[clearScreen](#-clearscreen-void),
[base64decode](#-base64decodeinput-string-string),
[base64encode](#-base64encodeinput-string-string)


#### 📄 args: `string`\[]



#### 📄 newLine: `string`



#### 📄 useCaseSensitiveFileNames: `boolean`



#### ⚙ write(s: `string`): `void`



#### ⚙ writeOutputIsTTY?(): `boolean`



#### ⚙ getWidthOfTerminal?(): `number`



#### ⚙ readFile(path: `string`, encoding?: `string`): `string`



#### ⚙ getFileSize?(path: `string`): `number`



#### ⚙ writeFile(path: `string`, data: `string`, writeByteOrderMark?: `boolean`): `void`



#### ⚙ watchFile?(path: `string`, callback: [FileWatcherCallback](../private.type.FileWatcherCallback/README.md), pollingInterval?: `number`, options?: [WatchOptions](../private.interface.WatchOptions/README.md)): [FileWatcher](../private.interface.FileWatcher/README.md)



#### ⚙ watchDirectory?(path: `string`, callback: [DirectoryWatcherCallback](../private.type.DirectoryWatcherCallback/README.md), recursive?: `boolean`, options?: [WatchOptions](../private.interface.WatchOptions/README.md)): [FileWatcher](../private.interface.FileWatcher/README.md)



#### ⚙ resolvePath(path: `string`): `string`



#### ⚙ fileExists(path: `string`): `boolean`



#### ⚙ directoryExists(path: `string`): `boolean`



#### ⚙ createDirectory(path: `string`): `void`



#### ⚙ getExecutingFilePath(): `string`



#### ⚙ getCurrentDirectory(): `string`



#### ⚙ getDirectories(path: `string`): `string`\[]



#### ⚙ readDirectory(path: `string`, extensions?: readonly `string`\[], exclude?: readonly `string`\[], include?: readonly `string`\[], depth?: `number`): `string`\[]



#### ⚙ getModifiedTime?(path: `string`): Date



#### ⚙ setModifiedTime?(path: `string`, time: Date): `void`



#### ⚙ deleteFile?(path: `string`): `void`



#### ⚙ createHash?(data: `string`): `string`

> A good implementation is node.js' `crypto.createHash`. (https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)



#### ⚙ createSHA256Hash?(data: `string`): `string`

> This must be cryptographically secure. Only implement this method using `crypto.createHash("sha256")`.



#### ⚙ getMemoryUsage?(): `number`



#### ⚙ exit(exitCode?: `number`): `void`



#### ⚙ realpath?(path: `string`): `string`



#### ⚙ setTimeout?(callback: (...args: `any`\[]) => `void`, ms: `number`, ...args: `any`\[]): `any`



#### ⚙ clearTimeout?(timeoutId: `any`): `void`



#### ⚙ clearScreen?(): `void`



#### ⚙ base64decode?(input: `string`): `string`



#### ⚙ base64encode?(input: `string`): `string`



