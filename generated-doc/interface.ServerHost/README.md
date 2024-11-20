# `interface` ServerHost `extends` [System](../interface.System/README.md)

[Documentation Index](../README.md)

## This interface has

- property [preferNonRecursiveWatch](#-prefernonrecursivewatch-boolean)
- 9 methods:
[watchFile](#-watchfilepath-string-callback-filewatchercallback-pollinginterval-number-options-watchoptions-filewatcher),
[watchDirectory](#-watchdirectorypath-string-callback-directorywatchercallback-recursive-boolean-options-watchoptions-filewatcher),
[setTimeout](#-settimeoutcallback-args-any--void-ms-number-args-any-any),
[clearTimeout](#-cleartimeouttimeoutid-any-void),
[setImmediate](#-setimmediatecallback-args-any--void-args-any-any),
[clearImmediate](#-clearimmediatetimeoutid-any-void),
[gc](#-gc-void),
[trace](#-traces-string-void),
[require](#-requireinitialpath-string-modulename-string-moduleimportresult)
- 28 inherited members from [System](../interface.System/README.md)


#### 📄 preferNonRecursiveWatch?: `boolean`



#### ⚙ watchFile(path: `string`, callback: [FileWatcherCallback](../type.FileWatcherCallback/README.md), pollingInterval?: `number`, options?: [WatchOptions](../interface.WatchOptions/README.md)): [FileWatcher](../interface.FileWatcher/README.md)



#### ⚙ watchDirectory(path: `string`, callback: [DirectoryWatcherCallback](../type.DirectoryWatcherCallback/README.md), recursive?: `boolean`, options?: [WatchOptions](../interface.WatchOptions/README.md)): [FileWatcher](../interface.FileWatcher/README.md)



#### ⚙ setTimeout(callback: (...args: `any`\[]) => `void`, ms: `number`, ...args: `any`\[]): `any`



#### ⚙ clearTimeout(timeoutId: `any`): `void`



#### ⚙ setImmediate(callback: (...args: `any`\[]) => `void`, ...args: `any`\[]): `any`



#### ⚙ clearImmediate(timeoutId: `any`): `void`



#### ⚙ gc?(): `void`



#### ⚙ trace?(s: `string`): `void`



#### ⚙ require?(initialPath: `string`, moduleName: `string`): ModuleImportResult



