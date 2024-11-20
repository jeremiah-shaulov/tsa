# `interface` WatchCompilerHost\<T `extends` [BuilderProgram](../interface.BuilderProgram/README.md)> `extends` [ProgramHost](../interface.ProgramHost/README.md)\<T>, [WatchHost](../interface.WatchHost/README.md)

[Documentation Index](../README.md)

## This interface has

- 3 methods:
[useSourceOfProjectReferenceRedirect](#-usesourceofprojectreferenceredirect-boolean),
[getParsedCommandLine](#-getparsedcommandlinefilename-string-parsedcommandline),
[afterProgramCreate](#-afterprogramcreateprogram-t-void)
- 22 inherited members from [ProgramHost](../interface.ProgramHost/README.md), 6 from [WatchHost](../interface.WatchHost/README.md)


#### ⚙ useSourceOfProjectReferenceRedirect?(): `boolean`

> Instead of using output d.ts file from project reference, use its source file



#### ⚙ getParsedCommandLine?(fileName: `string`): [ParsedCommandLine](../interface.ParsedCommandLine/README.md)

> If provided, use this method to get parsed command lines for referenced projects



#### ⚙ afterProgramCreate?(program: T): `void`

> If provided, callback to invoke after every new program creation



