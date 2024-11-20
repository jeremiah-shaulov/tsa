# `interface` RenameRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Rename request; value of command field is "rename". Return
response giving the file locations that reference the symbol
found in file at location line, col. Also return full display
name of the symbol so that client can print it unambiguously.

## This interface has

- 2 properties:
[command](#-command-commandtypesrename),
[arguments](#-arguments-renamerequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Rename](../enum.CommandTypes/README.md#rename--rename)

> The command to execute



#### 📄 arguments: [RenameRequestArgs](../interface.RenameRequestArgs/README.md)

> Object containing arguments for the command



