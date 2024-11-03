# `function` createEmitAndSemanticDiagnosticsBuilderProgram

[Documentation Index](../README.md)

Create the builder that can handle the changes in program and iterate through changed files
to emit the those files and manage semantic diagnostics cache as well

`function` createEmitAndSemanticDiagnosticsBuilderProgram(newProgram: [Program](../private.interface.Program/README.md), host: [BuilderProgramHost](../private.interface.BuilderProgramHost/README.md), oldProgram?: [EmitAndSemanticDiagnosticsBuilderProgram](../private.interface.EmitAndSemanticDiagnosticsBuilderProgram/README.md), configFileParsingDiagnostics?: readonly [Diagnostic](../private.interface.Diagnostic/README.md)\[]): [EmitAndSemanticDiagnosticsBuilderProgram](../private.interface.EmitAndSemanticDiagnosticsBuilderProgram/README.md)