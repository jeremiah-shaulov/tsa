# `function` parseJsonSourceFileConfigFileContent

[Documentation Index](../README.md)

Parse the contents of a config file (tsconfig.json).

`function` parseJsonSourceFileConfigFileContent(sourceFile: [TsConfigSourceFile](../interface.TsConfigSourceFile/README.md), host: [ParseConfigHost](../interface.ParseConfigHost/README.md), basePath: `string`, existingOptions?: [CompilerOptions](../interface.CompilerOptions/README.md), configFileName?: `string`, resolutionStack?: [Path](../type.Path/README.md)\[], extraFileExtensions?: readonly [FileExtensionInfo](../interface.FileExtensionInfo/README.md)\[], extendedConfigCache?: Map\<`string`, [ExtendedConfigCacheEntry](../interface.ExtendedConfigCacheEntry/README.md)>, existingWatchOptions?: [WatchOptions](../interface.WatchOptions/README.md)): [ParsedCommandLine](../interface.ParsedCommandLine/README.md)