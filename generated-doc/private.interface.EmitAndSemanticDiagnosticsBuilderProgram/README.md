# `interface` EmitAndSemanticDiagnosticsBuilderProgram `extends` [SemanticDiagnosticsBuilderProgram](../private.interface.SemanticDiagnosticsBuilderProgram/README.md)

[Documentation Index](../README.md)

The builder that can handle the changes in program and iterate through changed file to emit the files
The semantic diagnostics are cached per file and managed by clearing for the changed/affected files

## This interface has

- method [emitNextAffectedFile](#-emitnextaffectedfilewritefile-writefilecallback-cancellationtoken-cancellationtoken-emitonlydtsfiles-boolean-customtransformers-customtransformers-result-emitresult-affected-sourcefile--program)


#### ⚙ emitNextAffectedFile(writeFile?: [WriteFileCallback](../private.type.WriteFileCallback/README.md), cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md), emitOnlyDtsFiles?: `boolean`, customTransformers?: [CustomTransformers](../private.interface.CustomTransformers/README.md)): \{result: EmitResult, affected: SourceFile | Program}

> Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
> The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
> in that order would be used to write the files



