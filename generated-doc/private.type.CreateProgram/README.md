# `type` CreateProgram\<T `extends` [BuilderProgram](../private.interface.BuilderProgram/README.md)>

[Documentation Index](../README.md)

Create the program with rootNames and options, if they are undefined, oldProgram and new configFile diagnostics create new program

`type` CreateProgram\<T `extends` [BuilderProgram](../private.interface.BuilderProgram/README.md)> = (rootNames: readonly `string`\[] | `undefined`, options: [CompilerOptions](../private.interface.CompilerOptions/README.md) | `undefined`, host?: [CompilerHost](../private.interface.CompilerHost/README.md), oldProgram?: T, configFileParsingDiagnostics?: readonly [Diagnostic](../private.interface.Diagnostic/README.md)\[], projectReferences?: readonly [ProjectReference](../private.interface.ProjectReference/README.md)\[]) => T