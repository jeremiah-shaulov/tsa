# `interface` ProjectInfo

[Documentation Index](../README.md)

Response message body for "projectInfo" request

## This interface has

- 3 properties:
[configFileName](#-configfilename-string),
[fileNames](#-filenames-string),
[languageServiceDisabled](#-languageservicedisabled-boolean)


#### 📄 configFileName: `string`

> For configured project, this is the normalized path of the 'tsconfig.json' file
> For inferred project, this is undefined



#### 📄 fileNames?: `string`\[]

> The list of normalized file name in the project, including 'lib.d.ts'



#### 📄 languageServiceDisabled?: `boolean`

> Indicates if the project has a active language service instance



