# `function` createProgram

[Documentation Index](../README.md)

Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
that represent a compilation unit.

Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.

`function` createProgram(createProgramOptions: [CreateProgramOptions](../private.interface.CreateProgramOptions/README.md)): [Program](../private.interface.Program/README.md)