# `function` createEmitAndSemanticDiagnosticsBuilderProgram

[Documentation Index](../README.md)

`function` createEmitAndSemanticDiagnosticsBuilderProgram(newProgram: [Program](../interface.Program/README.md), host: [BuilderProgramHost](../interface.BuilderProgramHost/README.md), oldProgram?: [EmitAndSemanticDiagnosticsBuilderProgram](../interface.EmitAndSemanticDiagnosticsBuilderProgram/README.md), configFileParsingDiagnostics?: readonly [Diagnostic](../interface.Diagnostic/README.md)\[]): [EmitAndSemanticDiagnosticsBuilderProgram](../interface.EmitAndSemanticDiagnosticsBuilderProgram/README.md)

Create the builder that can handle the changes in program and iterate through changed files
to emit the those files and manage semantic diagnostics cache as well

