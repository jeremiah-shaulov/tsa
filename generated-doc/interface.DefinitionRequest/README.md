# `interface` DefinitionRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Go to definition request; value of command field is
"definition". Return response giving the file locations that
define the symbol found in file at location line, col.

## This interface has

- property [command](#-command-commandtypesdefinition)
- 1 inherited member from [FileLocationRequest](../interface.FileLocationRequest/README.md), 1 from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Definition](../enum.CommandTypes/README.md#definition--definition)

> The command to execute



