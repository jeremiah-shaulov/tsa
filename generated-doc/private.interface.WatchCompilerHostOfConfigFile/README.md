# `interface` WatchCompilerHostOfConfigFile\<T `extends` [BuilderProgram](../private.interface.BuilderProgram/README.md)> `extends` [WatchCompilerHost](../private.interface.WatchCompilerHost/README.md)\<T>, [ConfigFileDiagnosticsReporter](../private.interface.ConfigFileDiagnosticsReporter/README.md)

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



#### 📄 optionsToExtend?: [CompilerOptions](../private.interface.CompilerOptions/README.md)



#### 📄 watchOptionsToExtend?: [WatchOptions](../private.interface.WatchOptions/README.md)



#### 📄 extraFileExtensions?: readonly [FileExtensionInfo](../private.interface.FileExtensionInfo/README.md)\[]



#### ⚙ readDirectory(path: `string`, extensions?: readonly `string`\[], exclude?: readonly `string`\[], include?: readonly `string`\[], depth?: `number`): `string`\[]

> Used to generate source file names from the config file and its include, exclude, files rules
> and also to cache the directory stucture



