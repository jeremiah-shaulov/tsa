# `function` getParsedCommandLineOfConfigFile

[Documentation Index](../README.md)

`function` getParsedCommandLineOfConfigFile(configFileName: `string`, optionsToExtend: [CompilerOptions](../interface.CompilerOptions/README.md) | `undefined`, host: [ParseConfigFileHost](../interface.ParseConfigFileHost/README.md), extendedConfigCache?: Map\<`string`, [ExtendedConfigCacheEntry](../interface.ExtendedConfigCacheEntry/README.md)>, watchOptionsToExtend?: [WatchOptions](../interface.WatchOptions/README.md), extraFileExtensions?: readonly [FileExtensionInfo](../interface.FileExtensionInfo/README.md)\[]): [ParsedCommandLine](../interface.ParsedCommandLine/README.md)

Reads the config file, reports errors if any and exits if the config file cannot be found

