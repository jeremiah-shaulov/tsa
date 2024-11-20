# `interface` SetCompilerOptionsForInferredProjectsRequest `extends` [Request](../interface.Request/README.md)

[Documentation Index](../README.md)

Request to set compiler options for inferred projects.
External projects are opened / closed explicitly.
Configured projects are opened when user opens loose file that has 'tsconfig.json' or 'jsconfig.json' anywhere in one of containing folders.
This configuration file will be used to obtain a list of files and configuration settings for the project.
Inferred projects are created when user opens a loose file that is not the part of external project
or configured project and will contain only open file and transitive closure of referenced files if 'useOneInferredProject' is false,
or all open loose files and its transitive closure of referenced files if 'useOneInferredProject' is true.

## This interface has

- 2 properties:
[command](#-command-commandtypescompileroptionsforinferredprojects),
[arguments](#-arguments-setcompileroptionsforinferredprojectsargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.CompilerOptionsForInferredProjects](../enum.CommandTypes/README.md#compileroptionsforinferredprojects--compileroptionsforinferredprojects)

> The command to execute



#### 📄 arguments: [SetCompilerOptionsForInferredProjectsArgs](../interface.SetCompilerOptionsForInferredProjectsArgs/README.md)

> Object containing arguments for the command



