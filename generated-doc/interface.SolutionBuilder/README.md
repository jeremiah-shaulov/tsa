# `interface` SolutionBuilder\<T `extends` [BuilderProgram](../interface.BuilderProgram/README.md)>

[Documentation Index](../README.md)

## This interface has

- 5 methods:
[build](#-buildproject-string-cancellationtoken-cancellationtoken-writefile-writefilecallback-getcustomtransformers-project-string--customtransformers-exitstatus),
[clean](#-cleanproject-string-exitstatus),
[buildReferences](#-buildreferencesproject-string-cancellationtoken-cancellationtoken-writefile-writefilecallback-getcustomtransformers-project-string--customtransformers-exitstatus),
[cleanReferences](#-cleanreferencesproject-string-exitstatus),
[getNextInvalidatedProject](#-getnextinvalidatedprojectcancellationtoken-cancellationtoken-invalidatedproject)


#### ⚙ build(project?: `string`, cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md), writeFile?: [WriteFileCallback](../type.WriteFileCallback/README.md), getCustomTransformers?: (project: `string`) => [CustomTransformers](../interface.CustomTransformers/README.md)): [ExitStatus](../enum.ExitStatus/README.md)



#### ⚙ clean(project?: `string`): [ExitStatus](../enum.ExitStatus/README.md)



#### ⚙ buildReferences(project: `string`, cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md), writeFile?: [WriteFileCallback](../type.WriteFileCallback/README.md), getCustomTransformers?: (project: `string`) => [CustomTransformers](../interface.CustomTransformers/README.md)): [ExitStatus](../enum.ExitStatus/README.md)



#### ⚙ cleanReferences(project?: `string`): [ExitStatus](../enum.ExitStatus/README.md)



#### ⚙ getNextInvalidatedProject(cancellationToken?: [CancellationToken](../interface.CancellationToken/README.md)): InvalidatedProject



