# `class` ExternalProject `extends` [Project](../class.Project/README.md)

[Documentation Index](../README.md)

Project whose configuration is handled externally, such as in a '.csproj'.
These are created only if a host explicitly calls `openExternalProject`.

## This class has

- 3 properties:
[externalProjectName](#-externalprojectname-string),
[compileOnSaveEnabled](#-override-compileonsaveenabled-boolean),
[excludedFiles](#-excludedfiles-readonly-normalizedpath)
- 2 methods:
[updateGraph](#-override-updategraph-boolean),
[getExcludedFiles](#-override-getexcludedfiles-readonly-normalizedpath)
- 109 inherited members from [Project](../class.Project/README.md)


#### 📄 externalProjectName: `string`



#### 📄 `override` compileOnSaveEnabled: `boolean`



#### 📄 excludedFiles: readonly [NormalizedPath](../type.NormalizedPath/README.md)\[]



#### ⚙ `override` updateGraph(): `boolean`

> Updates set of files that contribute to this project



#### ⚙ `override` getExcludedFiles(): readonly NormalizedPath\[]



