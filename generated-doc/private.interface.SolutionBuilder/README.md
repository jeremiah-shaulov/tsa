# `interface` SolutionBuilder\<T `extends` [BuilderProgram](../private.interface.BuilderProgram/README.md)>

[Documentation Index](../README.md)

## This interface has

- 5 methods:
[build](#-buildproject-string-cancellationtoken-cancellationtoken-writefile-writefilecallback-getcustomtransformers-project-string--customtransformers-exitstatus),
[clean](#-cleanproject-string-exitstatus),
[buildReferences](#-buildreferencesproject-string-cancellationtoken-cancellationtoken-writefile-writefilecallback-getcustomtransformers-project-string--customtransformers-exitstatus),
[cleanReferences](#-cleanreferencesproject-string-exitstatus),
[getNextInvalidatedProject](#-getnextinvalidatedprojectcancellationtoken-cancellationtoken-invalidatedprojectt)


#### ⚙ build(project?: `string`, cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md), writeFile?: [WriteFileCallback](../private.type.WriteFileCallback/README.md), getCustomTransformers?: (project: `string`) => [CustomTransformers](../private.interface.CustomTransformers/README.md)): [ExitStatus](../private.enum.ExitStatus/README.md)



#### ⚙ clean(project?: `string`): [ExitStatus](../private.enum.ExitStatus/README.md)



#### ⚙ buildReferences(project: `string`, cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md), writeFile?: [WriteFileCallback](../private.type.WriteFileCallback/README.md), getCustomTransformers?: (project: `string`) => [CustomTransformers](../private.interface.CustomTransformers/README.md)): [ExitStatus](../private.enum.ExitStatus/README.md)



#### ⚙ cleanReferences(project?: `string`): [ExitStatus](../private.enum.ExitStatus/README.md)



#### ⚙ getNextInvalidatedProject(cancellationToken?: [CancellationToken](../private.interface.CancellationToken/README.md)): InvalidatedProject\<T>



