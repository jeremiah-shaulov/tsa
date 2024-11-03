# `type` CreateProgram\<T `extends` [BuilderProgram](../interface.BuilderProgram/README.md)>

[Documentation Index](../README.md)

Create the program with rootNames and options, if they are undefined, oldProgram and new configFile diagnostics create new program

`type` CreateProgram\<T `extends` [BuilderProgram](../interface.BuilderProgram/README.md)> = (rootNames: readonly `string`\[] | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md) | `undefined`, host?: [CompilerHost](../interface.CompilerHost/README.md), oldProgram?: T, configFileParsingDiagnostics?: readonly [Diagnostic](../interface.Diagnostic/README.md)\[], projectReferences?: readonly [ProjectReference](../interface.ProjectReference/README.md)\[]) => T