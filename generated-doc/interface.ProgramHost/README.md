# `interface` ProgramHost\<T `extends` [BuilderProgram](../interface.BuilderProgram/README.md)>

[Documentation Index](../README.md)

## This interface has

- 2 properties:
[createProgram](#-createprogram-createprogramt),
[jsDocParsingMode](#-jsdocparsingmode-jsdocparsingmode)
- 18 methods:
[useCaseSensitiveFileNames](#-usecasesensitivefilenames-boolean),
[getNewLine](#-getnewline-string),
[getCurrentDirectory](#-getcurrentdirectory-string),
[getDefaultLibFileName](#-getdefaultlibfilenameoptions-compileroptions-string),
[getDefaultLibLocation](#-getdefaultliblocation-string),
[createHash](#-createhashdata-string-string),
[fileExists](#-fileexistspath-string-boolean),
[readFile](#-readfilepath-string-encoding-string-string),
[directoryExists](#-directoryexistspath-string-boolean),
[getDirectories](#-getdirectoriespath-string-string),
[readDirectory](#-readdirectorypath-string-extensions-readonly-string-exclude-readonly-string-include-readonly-string-depth-number-string),
[realpath](#-realpathpath-string-string),
[trace](#-traces-string-void),
[getEnvironmentVariable](#-getenvironmentvariablename-string-string),
[resolveModuleNameLiterals](#-resolvemodulenameliteralsmoduleliterals-readonly-stringliterallike-containingfile-string-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile-reusednames-readonly-stringliterallike--undefined-readonly-resolvedmodulewithfailedlookuplocations),
[resolveTypeReferenceDirectiveReferences](#-resolvetypereferencedirectivereferencest-extends-filereference--stringtypedirectivereferences-readonly-t-containingfile-string-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile--undefined-reusednames-readonly-t--undefined-readonly-resolvedtypereferencedirectivewithfailedlookuplocations),
[hasInvalidatedResolutions](#-hasinvalidatedresolutionsfilepath-path-boolean),
[getModuleResolutionCache](#-getmoduleresolutioncache-moduleresolutioncache)
- [2 deprecated symbols](#-deprecated-resolvemodulenamesmodulenames-string-containingfile-string-reusednames-string--undefined-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile-resolvedmodule)


#### 📄 createProgram: [CreateProgram](../type.CreateProgram/README.md)\<T>



#### 📄 jsDocParsingMode?: [JSDocParsingMode](../enum.JSDocParsingMode/README.md)



#### ⚙ useCaseSensitiveFileNames(): `boolean`



#### ⚙ getNewLine(): `string`



#### ⚙ getCurrentDirectory(): `string`



#### ⚙ getDefaultLibFileName(options: [CompilerOptions](../interface.CompilerOptions/README.md)): `string`



#### ⚙ getDefaultLibLocation?(): `string`



#### ⚙ createHash?(data: `string`): `string`



#### ⚙ fileExists(path: `string`): `boolean`

> Use to check file presence for source files and
> if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well



#### ⚙ readFile(path: `string`, encoding?: `string`): `string`

> Use to read file text for source files and
> if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well



#### ⚙ directoryExists?(path: `string`): `boolean`

> If provided, used for module resolution as well as to handle directory structure



#### ⚙ getDirectories?(path: `string`): `string`\[]

> If provided, used in resolutions as well as handling directory structure



#### ⚙ readDirectory?(path: `string`, extensions?: readonly `string`\[], exclude?: readonly `string`\[], include?: readonly `string`\[], depth?: `number`): `string`\[]

> If provided, used to cache and handle directory structure modifications



#### ⚙ realpath?(path: `string`): `string`

> Symbol links resolution



#### ⚙ trace?(s: `string`): `void`

> If provided would be used to write log about compilation



#### ⚙ getEnvironmentVariable?(name: `string`): `string`

> If provided is used to get the environment variable



#### ⚙ resolveModuleNameLiterals?(moduleLiterals: readonly [StringLiteralLike](../type.StringLiteralLike/README.md)\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), containingSourceFile: [SourceFile](../interface.SourceFile/README.md), reusedNames: readonly [StringLiteralLike](../type.StringLiteralLike/README.md)\[] | `undefined`): readonly ResolvedModuleWithFailedLookupLocations\[]



#### ⚙ resolveTypeReferenceDirectiveReferences?\<T `extends` [FileReference](../interface.FileReference/README.md) | `string`>(typeDirectiveReferences: readonly T\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), containingSourceFile: [SourceFile](../interface.SourceFile/README.md) | `undefined`, reusedNames: readonly T\[] | `undefined`): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations\[]



#### ⚙ hasInvalidatedResolutions?(filePath: [Path](../type.Path/README.md)): `boolean`

> If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives



#### ⚙ getModuleResolutionCache?(): [ModuleResolutionCache](../interface.ModuleResolutionCache/README.md)

> Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it



<div style="opacity:0.6">

#### ⚙ `deprecated` resolveModuleNames?(moduleNames: `string`\[], containingFile: `string`, reusedNames: `string`\[] | `undefined`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), containingSourceFile?: [SourceFile](../interface.SourceFile/README.md)): [ResolvedModule](../interface.ResolvedModule/README.md)\[]

> `deprecated`
> 
> supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext
> 
> If provided, used to resolve the module names, otherwise typescript's default module resolution



#### ⚙ `deprecated` resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: `string`\[] | readonly [FileReference](../interface.FileReference/README.md)\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), containingFileMode?: [ResolutionMode](../type.ResolutionMode/README.md)): [ResolvedTypeReferenceDirective](../interface.ResolvedTypeReferenceDirective/README.md)\[]

> `deprecated`
> 
> supply resolveTypeReferenceDirectiveReferences instead for resolution that can handle newer resolution modes like nodenext
> 
> If provided, used to resolve type reference directives, otherwise typescript's default resolution



</div>

