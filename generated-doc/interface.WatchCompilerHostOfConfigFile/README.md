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


#### 📄 configFileName: `string`



#### 📄 optionsToExtend?: [CompilerOptions](../interface.CompilerOptions/README.md)



#### 📄 watchOptionsToExtend?: [WatchOptions](../interface.WatchOptions/README.md)



#### 📄 extraFileExtensions?: readonly [FileExtensionInfo](../interface.FileExtensionInfo/README.md)\[]



#### ⚙ readDirectory(path: `string`, extensions?: readonly `string`\[], exclude?: readonly `string`\[], include?: readonly `string`\[], depth?: `number`): `string`\[]

> Used to generate source file names from the config file and its include, exclude, files rules
> and also to cache the directory stucture



