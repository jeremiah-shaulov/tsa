# `interface` LanguageServiceHost `extends` [GetEffectiveTypeRootsHost](../interface.GetEffectiveTypeRootsHost/README.md), [MinimalResolutionCacheHost](../interface.MinimalResolutionCacheHost/README.md)

[Documentation Index](../README.md)

## This interface has

- property [jsDocParsingMode](#-jsdocparsingmode-jsdocparsingmode)
- 30 methods:
[getCompilationSettings](#-getcompilationsettings-compileroptions),
[getNewLine](#-getnewline-string),
[getProjectVersion](#-getprojectversion-string),
[getScriptFileNames](#-getscriptfilenames-string),
[getScriptKind](#-getscriptkindfilename-string-scriptkind),
[getScriptVersion](#-getscriptversionfilename-string-string),
[getScriptSnapshot](#-getscriptsnapshotfilename-string-iscriptsnapshot),
[getProjectReferences](#-getprojectreferences-readonly-projectreference),
[getLocalizedDiagnosticMessages](#-getlocalizeddiagnosticmessages-any),
[getCancellationToken](#-getcancellationtoken-hostcancellationtoken),
[getCurrentDirectory](#-getcurrentdirectory-string),
[getDefaultLibFileName](#-getdefaultlibfilenameoptions-compileroptions-string),
[log](#-logs-string-void),
[trace](#-traces-string-void),
[error](#-errors-string-void),
[useCaseSensitiveFileNames](#-usecasesensitivefilenames-boolean),
[readDirectory](#-readdirectorypath-string-extensions-readonly-string-exclude-readonly-string-include-readonly-string-depth-number-string),
[realpath](#-realpathpath-string-string),
[readFile](#-readfilepath-string-encoding-string-string),
[fileExists](#-fileexistspath-string-boolean),
[getTypeRootsVersion](#-gettyperootsversion-number),
[getResolvedModuleWithFailedLookupLocationsFromCache](#-getresolvedmodulewithfailedlookuplocationsfromcachemodulename-string-containingfile-string-resolutionmode-resolutionmode-resolvedmodulewithfailedlookuplocations),
[resolveModuleNameLiterals](#-resolvemodulenameliteralsmoduleliterals-readonly-stringliterallike-containingfile-string-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile-reusednames-readonly-stringliterallike--undefined-readonly-resolvedmodulewithfailedlookuplocations),
[resolveTypeReferenceDirectiveReferences](#-resolvetypereferencedirectivereferencest-extends-filereference--stringtypedirectivereferences-readonly-t-containingfile-string-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile--undefined-reusednames-readonly-t--undefined-readonly-resolvedtypereferencedirectivewithfailedlookuplocations),
[getDirectories](#-getdirectoriesdirectoryname-string-string),
[getCustomTransformers](#-getcustomtransformers-customtransformers),
[isKnownTypesPackageName](#-isknowntypespackagenamename-string-boolean),
[installPackage](#-installpackageoptions-installpackageoptions-promiseapplycodeactioncommandresult),
[writeFile](#-writefilefilename-string-content-string-void),
[getParsedCommandLine](#-getparsedcommandlinefilename-string-parsedcommandline)
- [2 deprecated symbols](#-deprecated-resolvemodulenamesmodulenames-string-containingfile-string-reusednames-string--undefined-redirectedreference-resolvedprojectreference--undefined-options-compileroptions-containingsourcefile-sourcefile-resolvedmodule)
- 1 inherited member from [MinimalResolutionCacheHost](../interface.MinimalResolutionCacheHost/README.md), 1 from [ModuleResolutionHost](../interface.ModuleResolutionHost/README.md)


#### 📄 jsDocParsingMode?: [JSDocParsingMode](../enum.JSDocParsingMode/README.md)



#### ⚙ getCompilationSettings(): [CompilerOptions](../interface.CompilerOptions/README.md)



#### ⚙ getNewLine?(): `string`



#### ⚙ getProjectVersion?(): `string`



#### ⚙ getScriptFileNames(): `string`\[]



#### ⚙ getScriptKind?(fileName: `string`): [ScriptKind](../enum.ScriptKind/README.md)



#### ⚙ getScriptVersion(fileName: `string`): `string`



#### ⚙ getScriptSnapshot(fileName: `string`): [IScriptSnapshot](../interface.IScriptSnapshot/README.md)



#### ⚙ getProjectReferences?(): readonly ProjectReference\[]



#### ⚙ getLocalizedDiagnosticMessages?(): `any`



#### ⚙ getCancellationToken?(): [HostCancellationToken](../interface.HostCancellationToken/README.md)



#### ⚙ getCurrentDirectory(): `string`



#### ⚙ getDefaultLibFileName(options: [CompilerOptions](../interface.CompilerOptions/README.md)): `string`



#### ⚙ log?(s: `string`): `void`



#### ⚙ trace?(s: `string`): `void`



#### ⚙ error?(s: `string`): `void`



#### ⚙ useCaseSensitiveFileNames?(): `boolean`



#### ⚙ readDirectory?(path: `string`, extensions?: readonly `string`\[], exclude?: readonly `string`\[], include?: readonly `string`\[], depth?: `number`): `string`\[]



#### ⚙ realpath?(path: `string`): `string`

> Resolve a symbolic link.



#### ⚙ readFile(path: `string`, encoding?: `string`): `string`



#### ⚙ fileExists(path: `string`): `boolean`



#### ⚙ getTypeRootsVersion?(): `number`



#### ⚙ getResolvedModuleWithFailedLookupLocationsFromCache?(modulename: `string`, containingFile: `string`, resolutionMode?: [ResolutionMode](../type.ResolutionMode/README.md)): [ResolvedModuleWithFailedLookupLocations](../interface.ResolvedModuleWithFailedLookupLocations/README.md)



#### ⚙ resolveModuleNameLiterals?(moduleLiterals: readonly [StringLiteralLike](../type.StringLiteralLike/README.md)\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), containingSourceFile: [SourceFile](../interface.SourceFile/README.md), reusedNames: readonly [StringLiteralLike](../type.StringLiteralLike/README.md)\[] | `undefined`): readonly ResolvedModuleWithFailedLookupLocations\[]



#### ⚙ resolveTypeReferenceDirectiveReferences?\<T `extends` [FileReference](../interface.FileReference/README.md) | `string`>(typeDirectiveReferences: readonly T\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), containingSourceFile: [SourceFile](../interface.SourceFile/README.md) | `undefined`, reusedNames: readonly T\[] | `undefined`): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations\[]



#### ⚙ getDirectories?(directoryName: `string`): `string`\[]



#### ⚙ getCustomTransformers?(): [CustomTransformers](../interface.CustomTransformers/README.md)

> Gets a set of custom transformers to use during emit.



#### ⚙ isKnownTypesPackageName?(name: `string`): `boolean`



#### ⚙ installPackage?(options: [InstallPackageOptions](../interface.InstallPackageOptions/README.md)): Promise\<[ApplyCodeActionCommandResult](../interface.ApplyCodeActionCommandResult/README.md)>



#### ⚙ writeFile?(fileName: `string`, content: `string`): `void`



#### ⚙ getParsedCommandLine?(fileName: `string`): [ParsedCommandLine](../interface.ParsedCommandLine/README.md)



<div style="opacity:0.6">

#### ⚙ `deprecated` resolveModuleNames?(moduleNames: `string`\[], containingFile: `string`, reusedNames: `string`\[] | `undefined`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), containingSourceFile?: [SourceFile](../interface.SourceFile/README.md)): [ResolvedModule](../interface.ResolvedModule/README.md)\[]

> `deprecated`
> 
> supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext



#### ⚙ `deprecated` resolveTypeReferenceDirectives?(typeDirectiveNames: `string`\[] | [FileReference](../interface.FileReference/README.md)\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), containingFileMode?: [ResolutionMode](../type.ResolutionMode/README.md)): [ResolvedTypeReferenceDirective](../interface.ResolvedTypeReferenceDirective/README.md)\[]

> `deprecated`
> 
> supply resolveTypeReferenceDirectiveReferences instead for resolution that can handle newer resolution modes like nodenext



</div>

