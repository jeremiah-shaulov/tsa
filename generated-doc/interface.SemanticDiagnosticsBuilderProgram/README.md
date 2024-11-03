# `interface` SemanticDiagnosticsBuilderProgram `extends` [BuilderProgram](../interface.BuilderProgram/README.md)

[Documentation Index](../README.md)

The builder that caches the semantic diagnostics for the program and handles the changed files and affected files

## This interface has

- method [getSemanticDiagnosticsOfNextAffectedFile](#-getsemanticdiagnosticsofnextaffectedfilecancellationtoken-cancellationtoken-ignoresourcefile-sourcefile-sourcefile--boolean-result-readonly-diagnostic-affected-sourcefile--program)


#### ⚙ getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md), ignoreSourceFile?: (sourceFile: [SourceFile](../interface.SourceFile/README.md)) => `boolean`): \{result: readonly Diagnostic\[], affected: SourceFile | Program}

> Gets the semantic diagnostics from the program for the next affected file and caches it
> Returns undefined if the iteration is complete



