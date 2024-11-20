# `interface` WatchCompilerHostOfConfigFile\<T `extends` [BuilderProgram](../interface.BuilderProgram/README.md)> `extends` [WatchCompilerHost](../interface.WatchCompilerHost/README.md)\<T>, [ConfigFileDiagnosticsReporter](../interface.ConfigFileDiagnosticsReporter/README.md)

[Documentation Index](../README.md)

Host to create watch with config file

## This interface has

- 4 properties:
[configFileName](#-configfilename-string),
[optionsToExtend](#-optionstoextend-compileroptions),
[watchOptionsToExtend](#-watchoptionstoextend-watchoptions),
[extraFileExtensions](#-extrafileextensions-readonly-fileextensioninfo)
- method [readDirectory](#-readdirectorypath-string-extensions-readonly-string-exclude-readonly-string-include-readonly-string-depth-number-string)
- 3 inherited members from [WatchCompilerHost](../interface.WatchCompilerHost/README.md), 1 from [ConfigFileDiagnosticsReporter](../interface.ConfigFileDiagnosticsReporter/README.md), 21 from [ProgramHost](../interface.ProgramHost/README.md), 6 from [WatchHost](../interface.WatchHost/README.md)


#### 📄 configFileName: `string`

> Name of the config file to compile



#### 📄 optionsToExtend?: [CompilerOptions](../interface.CompilerOptions/README.md)

> Options to extend



#### 📄 watchOptionsToExtend?: [WatchOptions](../interface.WatchOptions/README.md)



#### 📄 extraFileExtensions?: readonly [FileExtensionInfo](../interface.FileExtensionInfo/README.md)\[]



#### ⚙ readDirectory(path: `string`, extensions?: readonly `string`\[], exclude?: readonly `string`\[], include?: readonly `string`\[], depth?: `number`): `string`\[]

> Used to generate source file names from the config file and its include, exclude, files rules
> and also to cache the directory stucture



