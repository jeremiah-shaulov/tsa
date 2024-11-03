# `interface` Program `extends` [ScriptReferenceHost](../interface.ScriptReferenceHost/README.md)

[Documentation Index](../README.md)

## This interface has

- 23 methods:
[getCurrentDirectory](#-getcurrentdirectory-string),
[getRootFileNames](#-getrootfilenames-readonly-string),
[getSourceFiles](#-getsourcefiles-readonly-sourcefile),
[emit](#-emittargetsourcefile-sourcefile-writefile-writefilecallback-cancellationtoken-cancellationtoken-emitonlydtsfiles-boolean-customtransformers-customtransformers-emitresult),
[getOptionsDiagnostics](#-getoptionsdiagnosticscancellationtoken-cancellationtoken-readonly-diagnostic),
[getGlobalDiagnostics](#-getglobaldiagnosticscancellationtoken-cancellationtoken-readonly-diagnostic),
[getSyntacticDiagnostics](#-getsyntacticdiagnosticssourcefile-sourcefile-cancellationtoken-cancellationtoken-readonly-diagnosticwithlocation),
[getSemanticDiagnostics](#-getsemanticdiagnosticssourcefile-sourcefile-cancellationtoken-cancellationtoken-readonly-diagnostic),
[getDeclarationDiagnostics](#-getdeclarationdiagnosticssourcefile-sourcefile-cancellationtoken-cancellationtoken-readonly-diagnosticwithlocation),
[getConfigFileParsingDiagnostics](#-getconfigfileparsingdiagnostics-readonly-diagnostic),
[getTypeChecker](#-gettypechecker-typechecker),
[getNodeCount](#-getnodecount-number),
[getIdentifierCount](#-getidentifiercount-number),
[getSymbolCount](#-getsymbolcount-number),
[getTypeCount](#-gettypecount-number),
[getInstantiationCount](#-getinstantiationcount-number),
[getRelationCacheSizes](#-getrelationcachesizes-assignable-number-identity-number-subtype-number-strictsubtype-number),
[isSourceFileFromExternalLibrary](#-issourcefilefromexternallibraryfile-sourcefile-boolean),
[isSourceFileDefaultLibrary](#-issourcefiledefaultlibraryfile-sourcefile-boolean),
[getModeForUsageLocation](#-getmodeforusagelocationfile-sourcefile-usage-stringliterallike-resolutionmode),
[getModeForResolutionAtIndex](#-getmodeforresolutionatindexfile-sourcefile-index-number-resolutionmode),
[getProjectReferences](#-getprojectreferences-readonly-projectreference),
[getResolvedProjectReferences](#-getresolvedprojectreferences-readonly-resolvedprojectreference)


#### ⚙ getCurrentDirectory(): `string`



#### ⚙ getRootFileNames(): readonly `string`\[]

> Get a list of root file names that were passed to a 'createProgram'



#### ⚙ getSourceFiles(): readonly SourceFile\[]

> Get a list of files in the program



#### ⚙ emit(targetSourceFile?: [SourceFile](../interface.SourceFile/README.md), writeFile?: [WriteFileCallback](../type.WriteFileCallback/README.md), cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md), emitOnlyDtsFiles?: `boolean`, customTransformers?: [CustomTransformers](../interface.CustomTransformers/README.md)): [EmitResult](../interface.EmitResult/README.md)

> Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
> the JavaScript and declaration files will be produced for all the files in this program.
> If targetSourceFile is specified, then only the JavaScript and declaration for that
> specific file will be generated.
> 
> If writeFile is not specified then the writeFile callback from the compiler host will be
> used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
> will be invoked when writing the JavaScript and declaration files.



#### ⚙ getOptionsDiagnostics(cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md)): readonly Diagnostic\[]



#### ⚙ getGlobalDiagnostics(cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md)): readonly Diagnostic\[]



#### ⚙ getSyntacticDiagnostics(sourceFile?: [SourceFile](../interface.SourceFile/README.md), cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md)): readonly DiagnosticWithLocation\[]



#### ⚙ getSemanticDiagnostics(sourceFile?: [SourceFile](../interface.SourceFile/README.md), cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md)): readonly Diagnostic\[]

> The first time this is called, it will return global diagnostics (no location).



#### ⚙ getDeclarationDiagnostics(sourceFile?: [SourceFile](../interface.SourceFile/README.md), cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md)): readonly DiagnosticWithLocation\[]



#### ⚙ getConfigFileParsingDiagnostics(): readonly Diagnostic\[]



#### ⚙ getTypeChecker(): [TypeChecker](../interface.TypeChecker/README.md)

> Gets a type checker that can be used to semantically analyze source files in the program.



#### ⚙ getNodeCount(): `number`



#### ⚙ getIdentifierCount(): `number`



#### ⚙ getSymbolCount(): `number`



#### ⚙ getTypeCount(): `number`



#### ⚙ getInstantiationCount(): `number`



#### ⚙ getRelationCacheSizes(): \{assignable: `number`, identity: `number`, subtype: `number`, strictSubtype: `number`}



#### ⚙ isSourceFileFromExternalLibrary(file: [SourceFile](../interface.SourceFile/README.md)): `boolean`



#### ⚙ isSourceFileDefaultLibrary(file: [SourceFile](../interface.SourceFile/README.md)): `boolean`



#### ⚙ getModeForUsageLocation(file: [SourceFile](../interface.SourceFile/README.md), usage: [StringLiteralLike](../type.StringLiteralLike/README.md)): ResolutionMode

> Calculates the final resolution mode for a given module reference node. This function only returns a result when module resolution
> settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided via import attributes,
> which cause an `import` or `require` condition to be used during resolution regardless of module resolution settings. In absence of
> overriding attributes, and in modes that support differing resolution, the result indicates the syntax the usage would emit to JavaScript.
> Some examples:
> 
> ```ts
> // tsc foo.mts --module nodenext
> import {} from "mod";
> // Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension
> 
> // tsc foo.cts --module nodenext
> import {} from "mod";
> // Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension
> 
> // tsc foo.ts --module preserve --moduleResolution bundler
> import {} from "mod";
> // Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
> // supports conditional imports/exports
> 
> // tsc foo.ts --module preserve --moduleResolution node10
> import {} from "mod";
> // Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
> // does not support conditional imports/exports
> 
> // tsc foo.ts --module commonjs --moduleResolution node10
> import type {} from "mod" with { "resolution-mode": "import" };
> // Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
> ```



#### ⚙ getModeForResolutionAtIndex(file: [SourceFile](../interface.SourceFile/README.md), index: `number`): ResolutionMode

> Calculates the final resolution mode for an import at some index within a file's `imports` list. This function only returns a result
> when module resolution settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided
> via import attributes, which cause an `import` or `require` condition to be used during resolution regardless of module resolution
> settings. In absence of overriding attributes, and in modes that support differing resolution, the result indicates the syntax the
> usage would emit to JavaScript. Some examples:
> 
> ```ts
> // tsc foo.mts --module nodenext
> import {} from "mod";
> // Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension
> 
> // tsc foo.cts --module nodenext
> import {} from "mod";
> // Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension
> 
> // tsc foo.ts --module preserve --moduleResolution bundler
> import {} from "mod";
> // Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
> // supports conditional imports/exports
> 
> // tsc foo.ts --module preserve --moduleResolution node10
> import {} from "mod";
> // Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
> // does not support conditional imports/exports
> 
> // tsc foo.ts --module commonjs --moduleResolution node10
> import type {} from "mod" with { "resolution-mode": "import" };
> // Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
> ```



#### ⚙ getProjectReferences(): readonly ProjectReference\[]



#### ⚙ getResolvedProjectReferences(): readonly ResolvedProjectReference\[]



