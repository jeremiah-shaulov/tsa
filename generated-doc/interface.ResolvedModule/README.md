# `interface` ResolvedModule

[Documentation Index](../README.md)

Represents the result of module resolution.
Module resolution will pick up tsx/jsx/js files even if '--jsx' and '--allowJs' are turned off.
The Program will then filter results based on these flags.

Prefer to return a `ResolvedModuleFull` so that the file type does not have to be inferred.

## This interface has

- 3 properties:
[resolvedFileName](#-resolvedfilename-string),
[isExternalLibraryImport](#-isexternallibraryimport-boolean),
[resolvedUsingTsExtension](#-resolvedusingtsextension-boolean)


#### 📄 resolvedFileName: `string`



#### 📄 isExternalLibraryImport?: `boolean`



#### 📄 resolvedUsingTsExtension?: `boolean`



