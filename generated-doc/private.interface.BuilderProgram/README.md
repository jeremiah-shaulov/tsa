# `interface` BuilderProgram

[Documentation Index](../README.md)

Builder to manage the program state changes

## This interface has

- 13 methods:
[getProgram](#-getprogram-program),
[getCompilerOptions](#-getcompileroptions-compileroptions),
[getSourceFile](#-getsourcefilefilename-string-sourcefile),
[getSourceFiles](#-getsourcefiles-readonly-sourcefile),
[getOptionsDiagnostics](#-getoptionsdiagnosticscancellationtoken-cancellationtoken-readonly-diagnostic),
[getGlobalDiagnostics](#-getglobaldiagnosticscancellationtoken-cancellationtoken-readonly-diagnostic),
[getConfigFileParsingDiagnostics](#-getconfigfileparsingdiagnostics-readonly-diagnostic),
[getSyntacticDiagnostics](#-getsyntacticdiagnosticssourcefile-sourcefile-cancellationtoken-cancellationtoken-readonly-diagnostic),
[getDeclarationDiagnostics](#-getdeclarationdiagnosticssourcefile-sourcefile-cancellationtoken-cancellationtoken-readonly-diagnosticwithlocation),
[getAllDependencies](#-getalldependenciessourcefile-sourcefile-readonly-string),
[getSemanticDiagnostics](#-getsemanticdiagnosticssourcefile-sourcefile-cancellationtoken-cancellationtoken-readonly-diagnostic),
[emit](#-emittargetsourcefile-sourcefile-writefile-writefilecallback-cancellationtoken-cancellationtoken-emitonlydtsfiles-boolean-customtransformers-customtransformers-emitresult),
[getCurrentDirectory](#-getcurrentdirectory-string)


#### ⚙ getProgram(): [Program](../private.interface.Program/README.md)

> Returns current program



#### ⚙ getCompilerOptions(): [CompilerOptions](../private.interface.CompilerOptions/README.md)

> Get compiler options of the program



#### ⚙ getSourceFile(fileName: `string`): [SourceFile](../private.interface.SourceFile/README.md)

> Get the source file in the program with file name



#### ⚙ getSourceFiles(): readonly SourceFile\[]

> Get a list of files in the program



#### ⚙ getOptionsDiagnostics(cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly Diagnostic\[]

> Get the diagnostics for compiler options



#### ⚙ getGlobalDiagnostics(cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly Diagnostic\[]

> Get the diagnostics that dont belong to any file



#### ⚙ getConfigFileParsingDiagnostics(): readonly Diagnostic\[]

> Get the diagnostics from config file parsing



#### ⚙ getSyntacticDiagnostics(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md), cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly Diagnostic\[]

> Get the syntax diagnostics, for all source files if source file is not supplied



#### ⚙ getDeclarationDiagnostics(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md), cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly DiagnosticWithLocation\[]

> Get the declaration diagnostics, for all source files if source file is not supplied



#### ⚙ getAllDependencies(sourceFile: [SourceFile](../private.interface.SourceFile/README.md)): readonly `string`\[]

> Get all the dependencies of the file



#### ⚙ getSemanticDiagnostics(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md), cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly Diagnostic\[]

> Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
> The semantic diagnostics are cached and managed here
> Note that it is assumed that when asked about semantic diagnostics through this API,
> the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
> In case of SemanticDiagnosticsBuilderProgram if the source file is not provided,
> it will iterate through all the affected files, to ensure that cache stays valid and yet provide a way to get all semantic diagnostics



#### ⚙ emit(targetSourceFile?: [SourceFile](../private.interface.SourceFile/README.md), writeFile?: [WriteFileCallback](../private.type.WriteFileCallback/README.md), cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md), emitOnlyDtsFiles?: `boolean`, customTransformers?: [CustomTransformers](../private.interface.CustomTransformers/README.md)): [EmitResult](../private.interface.EmitResult/README.md)

> Emits the JavaScript and declaration files.
> When targetSource file is specified, emits the files corresponding to that source file,
> otherwise for the whole program.
> In case of EmitAndSemanticDiagnosticsBuilderProgram, when targetSourceFile is specified,
> it is assumed that that file is handled from affected file list. If targetSourceFile is not specified,
> it will only emit all the affected files instead of whole program
> 
> The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
> in that order would be used to write the files



#### ⚙ getCurrentDirectory(): `string`

> Get the current directory of the program



