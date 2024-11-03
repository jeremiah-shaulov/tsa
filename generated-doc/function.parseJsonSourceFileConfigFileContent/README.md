# `function` parseJsonSourceFileConfigFileContent

[Documentation Index](../README.md)

Parse the contents of a config file (tsconfig.json).

`function` parseJsonSourceFileConfigFileContent(sourceFile: [TsConfigSourceFile](../private.interface.TsConfigSourceFile/README.md), host: [ParseConfigHost](../private.interface.ParseConfigHost/README.md), basePath: `string`, existingOptions?: [CompilerOptions](../private.interface.CompilerOptions/README.md), configFileName?: `string`, resolutionStack?: [Path](../private.type.Path/README.md)\[], extraFileExtensions?: readonly [FileExtensionInfo](../private.interface.FileExtensionInfo/README.md)\[], extendedConfigCache?: Map\<`string`, [ExtendedConfigCacheEntry](../private.interface.ExtendedConfigCacheEntry/README.md)>, existingWatchOptions?: [WatchOptions](../private.interface.WatchOptions/README.md)): [ParsedCommandLine](../private.interface.ParsedCommandLine/README.md)