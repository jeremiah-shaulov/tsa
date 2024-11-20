# `interface` ConfigureRequestArguments

[Documentation Index](../README.md)

Information found in a configure request.

## This interface has

- 6 properties:
[hostInfo](#-hostinfo-string),
[file](#-file-string),
[formatOptions](#-formatoptions-formatcodesettings),
[preferences](#-preferences-userpreferences),
[extraFileExtensions](#-extrafileextensions-fileextensioninfo),
[watchOptions](#-watchoptions-watchoptions)


#### 📄 hostInfo?: `string`

> Information about the host, for example 'Emacs 24.4' or
> 'Sublime Text version 3075'



#### 📄 file?: `string`

> If present, tab settings apply only to this file.



#### 📄 formatOptions?: [FormatCodeSettings](../type.FormatCodeSettings/README.md)

> The format options to use during formatting and other code editing features.



#### 📄 preferences?: [UserPreferences](../interface.UserPreferences/README.md)



#### 📄 extraFileExtensions?: [FileExtensionInfo](../interface.FileExtensionInfo/README.md)\[]

> The host's additional supported .js file extensions



#### 📄 watchOptions?: [WatchOptions](../interface.WatchOptions.2/README.md)



