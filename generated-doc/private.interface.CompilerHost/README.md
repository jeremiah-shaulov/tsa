# `interface` CompilerHost `extends` [ModuleResolutionHost](../private.interface.ModuleResolutionHost/README.md)

[Documentation Index](../README.md)

## This interface has

- 2 properties:
[writeFile](#-writefile-writefilecallback),
[jsDocParsingMode](#-jsdocparsingmode-jsdocparsingmode)
- 17 methods:
[getSourceFile](#-getsourcefilefilename-string-languageversionoroptions-scripttarget--createsourcefileoptions-onerror-message-string--void-shouldcreatenewsourcefile-boolean-sourcefile),
[getSourceFileByPath](#-getsourcefilebypathfilename-string-path-path-languageversionoroptions-scripttarget--createsourcefileoptions-onerror-message-string--void-shouldcreatenewsourcefile-boolean-sourcefile),
[getCancellationToken](#-getcancellationtoken-cancellationtoken),
[getDefaultLibFileName](#-getdefaultlibfilenameoptions-compileroptions-string),
[getDefaultLibLocation](#-getdefaultliblocation-string),
[getCurrentDirectory](#-getcurrentdirectory-string),
[getCanonicalFileName](#-getcanonicalfilenamefilename-string-string),
[useCaseSensitiveFileNames](#-usecasesensitivefilenames-boolean),
[getNewLine](#-getnewline-string),
[readDirectory](#-readdirectoryrootdir-string-extensions-readonly-string-excludes-readonly-string--undefined-includes-readonly-string-depth-number-string),
[getModuleResolutionCache](#-getmoduleresolutioncache-moduleresolutioncache),
[resolveModuleNameLiterals](#-resolvemodulenameliteralsmoduleliterals-readonly-stringliterallike-containingfile-string-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile-reusednames-readonly-stringliterallike--undefined-readonly-resolvedmodulewithfailedlookuplocations),
[resolveTypeReferenceDirectiveReferences](#-resolvetypereferencedirectivereferencest-extends-filereference--stringtypedirectivereferences-readonly-t-containingfile-string-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile--undefined-reusednames-readonly-t--undefined-readonly-resolvedtypereferencedirectivewithfailedlookuplocations),
[getEnvironmentVariable](#-getenvironmentvariablename-string-string),
[hasInvalidatedResolutions](#-hasinvalidatedresolutionsfilepath-path-boolean),
[createHash](#-createhashdata-string-string),
[getParsedCommandLine](#-getparsedcommandlinefilename-string-parsedcommandline)
- [2 deprecated symbols](#-deprecated-resolvemodulenamesmodulenames-string-containingfile-string-reusednames-string--undefined-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile-resolvedmodule)


#### 📄 writeFile: [WriteFileCallback](../private.type.WriteFileCallback/README.md)



#### 📄 jsDocParsingMode?: [JSDocParsingMode](../private.enum.JSDocParsingMode/README.md)



#### ⚙ getSourceFile(fileName: `string`, languageVersionOrOptions: [ScriptTarget](../private.enum.ScriptTarget/README.md) | [CreateSourceFileOptions](../private.interface.CreateSourceFileOptions/README.md), onError?: (message: `string`) => `void`, shouldCreateNewSourceFile?: `boolean`): [SourceFile](../private.interface.SourceFile/README.md)



#### ⚙ getSourceFileByPath?(fileName: `string`, path: [Path](../private.type.Path/README.md), languageVersionOrOptions: [ScriptTarget](../private.enum.ScriptTarget/README.md) | [CreateSourceFileOptions](../private.interface.CreateSourceFileOptions/README.md), onError?: (message: `string`) => `void`, shouldCreateNewSourceFile?: `boolean`): [SourceFile](../private.interface.SourceFile/README.md)



#### ⚙ getCancellationToken?(): [CancellationToken](../private.interface.CancellationToken/README.md)



#### ⚙ getDefaultLibFileName(options: [CompilerOptions](../private.interface.CompilerOptions/README.md)): `string`



#### ⚙ getDefaultLibLocation?(): `string`



#### ⚙ getCurrentDirectory(): `string`



#### ⚙ getCanonicalFileName(fileName: `string`): `string`



#### ⚙ useCaseSensitiveFileNames(): `boolean`



#### ⚙ getNewLine(): `string`



#### ⚙ readDirectory?(rootDir: `string`, extensions: readonly `string`\[], excludes: readonly `string`\[] | `undefined`, includes: readonly `string`\[], depth?: `number`): `string`\[]



#### ⚙ getModuleResolutionCache?(): [ModuleResolutionCache](../private.interface.ModuleResolutionCache/README.md)

> Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it



#### ⚙ resolveModuleNameLiterals?(moduleLiterals: readonly [StringLiteralLike](../private.type.StringLiteralLike/README.md)\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), containingSourceFile: [SourceFile](../private.interface.SourceFile/README.md), reusedNames: readonly [StringLiteralLike](../private.type.StringLiteralLike/README.md)\[] | `undefined`): readonly ResolvedModuleWithFailedLookupLocations\[]



#### ⚙ resolveTypeReferenceDirectiveReferences?\<T `extends` [FileReference](../private.interface.FileReference/README.md) | `string`>(typeDirectiveReferences: readonly T\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), containingSourceFile: [SourceFile](../private.interface.SourceFile/README.md) | `undefined`, reusedNames: readonly T\[] | `undefined`): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations\[]



#### ⚙ getEnvironmentVariable?(name: `string`): `string`



#### ⚙ hasInvalidatedResolutions?(filePath: [Path](../private.type.Path/README.md)): `boolean`

> If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives



#### ⚙ createHash?(data: `string`): `string`



#### ⚙ getParsedCommandLine?(fileName: `string`): [ParsedCommandLine](../private.interface.ParsedCommandLine/README.md)



<div style="opacity:0.6">

#### ⚙ `deprecated` resolveModuleNames?(moduleNames: `string`\[], containingFile: `string`, reusedNames: `string`\[] | `undefined`, redirectedReference: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), containingSourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): ResolvedModule\[]

> `deprecated`
> 
> supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext



#### ⚙ `deprecated` resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: `string`\[] | readonly [FileReference](../private.interface.FileReference/README.md)\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), containingFileMode?: [ResolutionMode](../private.type.ResolutionMode/README.md)): ResolvedTypeReferenceDirective\[]

> `deprecated`
> 
> supply resolveTypeReferenceDirectiveReferences instead for resolution that can handle newer resolution modes like nodenext
> 
> This method is a companion for 'resolveModuleNames' and is used to resolve 'types' references to actual type declaration files



</div>

