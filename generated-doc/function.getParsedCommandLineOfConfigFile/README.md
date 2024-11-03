# `function` getParsedCommandLineOfConfigFile

[Documentation Index](../README.md)

Reads the config file, reports errors if any and exits if the config file cannot be found

`function` getParsedCommandLineOfConfigFile(configFileName: `string`, optionsToExtend: [CompilerOptions](../private.interface.CompilerOptions/README.md) | `undefined`, host: [ParseConfigFileHost](../private.interface.ParseConfigFileHost/README.md), extendedConfigCache?: Map\<`string`, [ExtendedConfigCacheEntry](../private.interface.ExtendedConfigCacheEntry/README.md)>, watchOptionsToExtend?: [WatchOptions](../private.interface.WatchOptions/README.md), extraFileExtensions?: readonly [FileExtensionInfo](../private.interface.FileExtensionInfo/README.md)\[]): [ParsedCommandLine](../private.interface.ParsedCommandLine/README.md)