# `function` createWatchCompilerHost

[Documentation Index](../README.md)

Create the watch compiler host for either configFile or fileNames and its options

`function` createWatchCompilerHost\<T `extends` [BuilderProgram](../private.interface.BuilderProgram/README.md)>(configFileName: `string`, optionsToExtend: [CompilerOptions](../private.interface.CompilerOptions/README.md) | `undefined`, system: [System](../private.interface.System/README.md), createProgram?: [CreateProgram](../private.type.CreateProgram/README.md)\<T>, reportDiagnostic?: [DiagnosticReporter](../private.type.DiagnosticReporter/README.md), reportWatchStatus?: [WatchStatusReporter](../private.type.WatchStatusReporter/README.md), watchOptionsToExtend?: [WatchOptions](../private.interface.WatchOptions/README.md), extraFileExtensions?: readonly [FileExtensionInfo](../private.interface.FileExtensionInfo/README.md)\[]): [WatchCompilerHostOfConfigFile](../private.interface.WatchCompilerHostOfConfigFile/README.md)\<T>