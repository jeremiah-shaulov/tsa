# `interface` ReloadRequest `extends` [FileRequest](../interface.FileRequest/README.md)

[Documentation Index](../README.md)

Reload request message; value of command field is "reload".
Reload contents of file with name given by the 'file' argument
from temporary file with name given by the 'tmpfile' argument.
The two names can be identical.

## This interface has

- 2 properties:
[command](#-command-commandtypesreload),
[arguments](#-arguments-reloadrequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Reload](../enum.CommandTypes/README.md#reload--reload)

> The command to execute



#### 📄 arguments: [ReloadRequestArgs](../interface.ReloadRequestArgs/README.md)

> Object containing arguments for the command



