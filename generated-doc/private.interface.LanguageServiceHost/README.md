# `interface` LanguageServiceHost `extends` [GetEffectiveTypeRootsHost](../private.interface.GetEffectiveTypeRootsHost/README.md), [MinimalResolutionCacheHost](../private.interface.MinimalResolutionCacheHost/README.md)

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


#### 📄 jsDocParsingMode?: [JSDocParsingMode](../private.enum.JSDocParsingMode/README.md)



#### ⚙ getCompilationSettings(): [CompilerOptions](../private.interface.CompilerOptions/README.md)



#### ⚙ getNewLine?(): `string`



#### ⚙ getProjectVersion?(): `string`



#### ⚙ getScriptFileNames(): `string`\[]



#### ⚙ getScriptKind?(fileName: `string`): [ScriptKind](../private.enum.ScriptKind/README.md)



#### ⚙ getScriptVersion(fileName: `string`): `string`



#### ⚙ getScriptSnapshot(fileName: `string`): [IScriptSnapshot](../private.interface.IScriptSnapshot/README.md)



#### ⚙ getProjectReferences?(): readonly ProjectReference\[]



#### ⚙ getLocalizedDiagnosticMessages?(): `any`



#### ⚙ getCancellationToken?(): [HostCancellationToken](../private.interface.HostCancellationToken/README.md)



#### ⚙ getCurrentDirectory(): `string`



#### ⚙ getDefaultLibFileName(options: [CompilerOptions](../private.interface.CompilerOptions/README.md)): `string`



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



#### ⚙ getResolvedModuleWithFailedLookupLocationsFromCache?(modulename: `string`, containingFile: `string`, resolutionMode?: [ResolutionMode](../private.type.ResolutionMode/README.md)): [ResolvedModuleWithFailedLookupLocations](../private.interface.ResolvedModuleWithFailedLookupLocations/README.md)



#### ⚙ resolveModuleNameLiterals?(moduleLiterals: readonly [StringLiteralLike](../private.type.StringLiteralLike/README.md)\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), containingSourceFile: [SourceFile](../private.interface.SourceFile/README.md), reusedNames: readonly [StringLiteralLike](../private.type.StringLiteralLike/README.md)\[] | `undefined`): readonly ResolvedModuleWithFailedLookupLocations\[]



#### ⚙ resolveTypeReferenceDirectiveReferences?\<T `extends` [FileReference](../private.interface.FileReference/README.md) | `string`>(typeDirectiveReferences: readonly T\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), containingSourceFile: [SourceFile](../private.interface.SourceFile/README.md) | `undefined`, reusedNames: readonly T\[] | `undefined`): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations\[]



#### ⚙ getDirectories?(directoryName: `string`): `string`\[]



#### ⚙ getCustomTransformers?(): [CustomTransformers](../private.interface.CustomTransformers/README.md)

> Gets a set of custom transformers to use during emit.



#### ⚙ isKnownTypesPackageName?(name: `string`): `boolean`



#### ⚙ installPackage?(options: [InstallPackageOptions](../private.interface.InstallPackageOptions/README.md)): Promise\<ApplyCodeActionCommandResult>



#### ⚙ writeFile?(fileName: `string`, content: `string`): `void`



#### ⚙ getParsedCommandLine?(fileName: `string`): [ParsedCommandLine](../private.interface.ParsedCommandLine/README.md)



<div style="opacity:0.6">

#### ⚙ `deprecated` resolveModuleNames?(moduleNames: `string`\[], containingFile: `string`, reusedNames: `string`\[] | `undefined`, redirectedReference: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), containingSourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): ResolvedModule\[]

> `deprecated`
> 
> supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext



#### ⚙ `deprecated` resolveTypeReferenceDirectives?(typeDirectiveNames: `string`\[] | [FileReference](../private.interface.FileReference/README.md)\[], containingFile: `string`, redirectedReference: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md) | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md), containingFileMode?: [ResolutionMode](../private.type.ResolutionMode/README.md)): ResolvedTypeReferenceDirective\[]

> `deprecated`
> 
> supply resolveTypeReferenceDirectiveReferences instead for resolution that can handle newer resolution modes like nodenext



</div>

