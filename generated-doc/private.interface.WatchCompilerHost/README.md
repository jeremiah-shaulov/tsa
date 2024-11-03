# `interface` WatchCompilerHost\<T `extends` [BuilderProgram](../private.interface.BuilderProgram/README.md)> `extends` [ProgramHost](../private.interface.ProgramHost/README.md)\<T>, [WatchHost](../private.interface.WatchHost/README.md)

[Documentation Index](../README.md)

## This interface has

- 3 methods:
[useSourceOfProjectReferenceRedirect](#-usesourceofprojectreferenceredirect-boolean),
[getParsedCommandLine](#-getparsedcommandlinefilename-string-parsedcommandline),
[afterProgramCreate](#-afterprogramcreateprogram-t-void)


#### ⚙ useSourceOfProjectReferenceRedirect?(): `boolean`

> Instead of using output d.ts file from project reference, use its source file



#### ⚙ getParsedCommandLine?(fileName: `string`): [ParsedCommandLine](../private.interface.ParsedCommandLine/README.md)

> If provided, use this method to get parsed command lines for referenced projects



#### ⚙ afterProgramCreate?(program: T): `void`

> If provided, callback to invoke after every new program creation



