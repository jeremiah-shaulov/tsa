# `interface` SolutionBuilderHostBase\<T `extends` [BuilderProgram](../interface.BuilderProgram/README.md)> `extends` [ProgramHost](../interface.ProgramHost/README.md)\<T>

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[getCustomTransformers](#-getcustomtransformers-project-string--customtransformers--undefined),
[reportDiagnostic](#-reportdiagnostic-diagnosticreporter),
[reportSolutionBuilderStatus](#-reportsolutionbuilderstatus-diagnosticreporter)
- 7 methods:
[createDirectory](#-createdirectorypath-string-void),
[writeFile](#-writefilepath-string-data-string-writebyteordermark-boolean-void),
[getModifiedTime](#-getmodifiedtimefilename-string-date),
[setModifiedTime](#-setmodifiedtimefilename-string-date-date-void),
[deleteFile](#-deletefilefilename-string-void),
[getParsedCommandLine](#-getparsedcommandlinefilename-string-parsedcommandline),
[afterProgramEmitAndDiagnostics](#-afterprogramemitanddiagnosticsprogram-t-void)


#### 📄 getCustomTransformers?: (project: `string`) => [CustomTransformers](../interface.CustomTransformers/README.md) | `undefined`



#### 📄 reportDiagnostic: [DiagnosticReporter](../type.DiagnosticReporter/README.md)



#### 📄 reportSolutionBuilderStatus: [DiagnosticReporter](../type.DiagnosticReporter/README.md)



#### ⚙ createDirectory?(path: `string`): `void`



#### ⚙ writeFile?(path: `string`, data: `string`, writeByteOrderMark?: `boolean`): `void`

> Should provide create directory and writeFile if done of invalidatedProjects is not invoked with
> writeFileCallback



#### ⚙ getModifiedTime(fileName: `string`): Date



#### ⚙ setModifiedTime(fileName: `string`, date: Date): `void`



#### ⚙ deleteFile(fileName: `string`): `void`



#### ⚙ getParsedCommandLine?(fileName: `string`): [ParsedCommandLine](../interface.ParsedCommandLine/README.md)



#### ⚙ afterProgramEmitAndDiagnostics?(program: T): `void`



