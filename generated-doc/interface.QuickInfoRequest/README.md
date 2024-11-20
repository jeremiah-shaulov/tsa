# `interface` QuickInfoRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Quickinfo request; value of command field is
"quickinfo". Return response giving a quick type and
documentation string for the symbol found in file at location
line, col.

## This interface has

- 2 properties:
[command](#-command-commandtypesquickinfo),
[arguments](#-arguments-filelocationrequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Quickinfo](../enum.CommandTypes/README.md#quickinfo--quickinfo)

> The command to execute



#### 📄 arguments: [FileLocationRequestArgs](../interface.FileLocationRequestArgs/README.md)

> Object containing arguments for the command



