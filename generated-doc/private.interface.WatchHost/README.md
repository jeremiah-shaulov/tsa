# `interface` WatchHost

[Documentation Index](../README.md)

Host that has watch functionality used in --watch mode

## This interface has

- property [preferNonRecursiveWatch](#-prefernonrecursivewatch-boolean)
- 5 methods:
[onWatchStatusChange](#-onwatchstatuschangediagnostic-diagnostic-newline-string-options-compileroptions-errorcount-number-void),
[watchFile](#-watchfilepath-string-callback-filewatchercallback-pollinginterval-number-options-watchoptions-filewatcher),
[watchDirectory](#-watchdirectorypath-string-callback-directorywatchercallback-recursive-boolean-options-watchoptions-filewatcher),
[setTimeout](#-settimeoutcallback-args-any--void-ms-number-args-any-any),
[clearTimeout](#-cleartimeouttimeoutid-any-void)


#### 📄 preferNonRecursiveWatch?: `boolean`



#### ⚙ onWatchStatusChange?(diagnostic: [Diagnostic](../private.interface.Diagnostic/README.md), newLine: `string`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), errorCount?: `number`): `void`

> If provided, called with Diagnostic message that informs about change in watch status



#### ⚙ watchFile(path: `string`, callback: [FileWatcherCallback](../private.type.FileWatcherCallback/README.md), pollingInterval?: `number`, options?: [WatchOptions](../private.interface.WatchOptions/README.md)): [FileWatcher](../private.interface.FileWatcher/README.md)

> Used to watch changes in source files, missing files needed to update the program or config file



#### ⚙ watchDirectory(path: `string`, callback: [DirectoryWatcherCallback](../private.type.DirectoryWatcherCallback/README.md), recursive?: `boolean`, options?: [WatchOptions](../private.interface.WatchOptions/README.md)): [FileWatcher](../private.interface.FileWatcher/README.md)

> Used to watch resolved module's failed lookup locations, config file specs, type roots where auto type reference directives are added



#### ⚙ setTimeout?(callback: (...args: `any`\[]) => `void`, ms: `number`, ...args: `any`\[]): `any`

> If provided, will be used to set delayed compilation, so that multiple changes in short span are compiled together



#### ⚙ clearTimeout?(timeoutId: `any`): `void`

> If provided, will be used to reset existing delayed compilation



