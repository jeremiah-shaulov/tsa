# `interface` ReferencesRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Find references request; value of command field is
"references". Return response giving the file locations that
reference the symbol found in file at location line, col.

## This interface has

- property [command](#-command-commandtypesreferences)
- 1 inherited member from [FileLocationRequest](../interface.FileLocationRequest/README.md), 1 from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.References](../enum.CommandTypes/README.md#references--references)

> The command to execute



