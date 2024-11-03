# `interface` BuildInvalidedProject\<T `extends` [BuilderProgram](../private.interface.BuilderProgram/README.md)> `extends` [InvalidatedProjectBase](../interface.InvalidatedProjectBase/README.md)

[Documentation Index](../README.md)

## This interface has

- property [kind](#-readonly-kind-invalidatedprojectkindbuild)
- 12 methods:
[getBuilderProgram](#-getbuilderprogram-t),
[getProgram](#-getprogram-program),
[getSourceFile](#-getsourcefilefilename-string-sourcefile),
[getSourceFiles](#-getsourcefiles-readonly-sourcefile),
[getOptionsDiagnostics](#-getoptionsdiagnosticscancellationtoken-cancellationtoken-readonly-diagnostic),
[getGlobalDiagnostics](#-getglobaldiagnosticscancellationtoken-cancellationtoken-readonly-diagnostic),
[getConfigFileParsingDiagnostics](#-getconfigfileparsingdiagnostics-readonly-diagnostic),
[getSyntacticDiagnostics](#-getsyntacticdiagnosticssourcefile-sourcefile-cancellationtoken-cancellationtoken-readonly-diagnostic),
[getAllDependencies](#-getalldependenciessourcefile-sourcefile-readonly-string),
[getSemanticDiagnostics](#-getsemanticdiagnosticssourcefile-sourcefile-cancellationtoken-cancellationtoken-readonly-diagnostic),
[getSemanticDiagnosticsOfNextAffectedFile](#-getsemanticdiagnosticsofnextaffectedfilecancellationtoken-cancellationtoken-ignoresourcefile-sourcefile-sourcefile--boolean-result-readonly-diagnostic-affected-sourcefile--program),
[emit](#-emittargetsourcefile-sourcefile-writefile-writefilecallback-cancellationtoken-cancellationtoken-emitonlydtsfiles-boolean-customtransformers-customtransformers-emitresult)


#### 📄 `readonly` kind: [InvalidatedProjectKind.Build](../enum.InvalidatedProjectKind/README.md#build--0)



#### ⚙ getBuilderProgram(): T



#### ⚙ getProgram(): [Program](../private.interface.Program/README.md)



#### ⚙ getSourceFile(fileName: `string`): [SourceFile](../private.interface.SourceFile/README.md)



#### ⚙ getSourceFiles(): readonly SourceFile\[]



#### ⚙ getOptionsDiagnostics(cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly Diagnostic\[]



#### ⚙ getGlobalDiagnostics(cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly Diagnostic\[]



#### ⚙ getConfigFileParsingDiagnostics(): readonly Diagnostic\[]



#### ⚙ getSyntacticDiagnostics(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md), cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly Diagnostic\[]



#### ⚙ getAllDependencies(sourceFile: [SourceFile](../private.interface.SourceFile/README.md)): readonly `string`\[]



#### ⚙ getSemanticDiagnostics(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md), cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): readonly Diagnostic\[]



#### ⚙ getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md), ignoreSourceFile?: (sourceFile: [SourceFile](../private.interface.SourceFile/README.md)) => `boolean`): \{result: readonly Diagnostic\[], affected: SourceFile | Program}



#### ⚙ emit(targetSourceFile?: [SourceFile](../private.interface.SourceFile/README.md), writeFile?: [WriteFileCallback](../private.type.WriteFileCallback/README.md), cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md), emitOnlyDtsFiles?: `boolean`, customTransformers?: [CustomTransformers](../private.interface.CustomTransformers/README.md)): [EmitResult](../private.interface.EmitResult/README.md)



