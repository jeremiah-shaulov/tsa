# `function` createWatchCompilerHost

[Documentation Index](../README.md)

Create the watch compiler host for either configFile or fileNames and its options

`function` createWatchCompilerHost\<T `extends` [BuilderProgram](../interface.BuilderProgram/README.md)>(configFileName: `string`, optionsToExtend: [CompilerOptions](../interface.CompilerOptions/README.md) | `undefined`, system: [System](../interface.System/README.md), createProgram?: [CreateProgram](../type.CreateProgram/README.md)\<T>, reportDiagnostic?: [DiagnosticReporter](../type.DiagnosticReporter/README.md), reportWatchStatus?: [WatchStatusReporter](../type.WatchStatusReporter/README.md), watchOptionsToExtend?: [WatchOptions](../interface.WatchOptions/README.md), extraFileExtensions?: readonly [FileExtensionInfo](../interface.FileExtensionInfo/README.md)\[]): [WatchCompilerHostOfConfigFile](../interface.WatchCompilerHostOfConfigFile/README.md)\<T>