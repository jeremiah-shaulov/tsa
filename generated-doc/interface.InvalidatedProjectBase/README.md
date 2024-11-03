# `interface` InvalidatedProjectBase

[Documentation Index](../README.md)

## This interface has

- 2 properties:
[kind](#-readonly-kind-invalidatedprojectkind),
[project](#-readonly-project-resolvedconfigfilename)
- 3 methods:
[done](#-donecancellationtoken-cancellationtoken-writefile-writefilecallback-customtransformers-customtransformers-exitstatus),
[getCompilerOptions](#-getcompileroptions-compileroptions),
[getCurrentDirectory](#-getcurrentdirectory-string)


#### 📄 `readonly` kind: [InvalidatedProjectKind](../enum.InvalidatedProjectKind/README.md)



#### 📄 `readonly` project: [ResolvedConfigFileName](../type.ResolvedConfigFileName/README.md)



#### ⚙ done(cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md), writeFile?: [WriteFileCallback](../private.type.WriteFileCallback/README.md), customTransformers?: [CustomTransformers](../private.interface.CustomTransformers/README.md)): [ExitStatus](../private.enum.ExitStatus/README.md)

> To dispose this project and ensure that all the necessary actions are taken and state is updated accordingly



#### ⚙ getCompilerOptions(): [CompilerOptions](../private.interface.CompilerOptions/README.md)



#### ⚙ getCurrentDirectory(): `string`



