# `interface` CreateSourceFileOptions

[Documentation Index](../README.md)

## This interface has

- 4 properties:
[languageVersion](#-languageversion-scripttarget),
[impliedNodeFormat](#-impliednodeformat-resolutionmode),
[setExternalModuleIndicator](#-setexternalmoduleindicator-file-sourcefile--void),
[jsDocParsingMode](#-jsdocparsingmode-jsdocparsingmode)


#### 📄 languageVersion: [ScriptTarget](../enum.ScriptTarget/README.md)



#### 📄 impliedNodeFormat?: [ResolutionMode](../type.ResolutionMode/README.md)

> Controls the format the file is detected as - this can be derived from only the path
> and files on disk, but needs to be done with a module resolution cache in scope to be performant.
> This is usually `undefined` for compilations that do not have `moduleResolution` values of `node16` or `nodenext`.



#### 📄 setExternalModuleIndicator?: (file: [SourceFile](../interface.SourceFile/README.md)) => `void`

> Controls how module-y-ness is set for the given file. Usually the result of calling
> `getSetExternalModuleIndicator` on a valid `CompilerOptions` object. If not present, the default
> check specified by `isFileProbablyExternalModule` will be used to set the field.



#### 📄 jsDocParsingMode?: [JSDocParsingMode](../enum.JSDocParsingMode/README.md)



