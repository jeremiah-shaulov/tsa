# `interface` ChangeRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Change request message; value of command field is "change".
Update the server's view of the file named by argument 'file'.
Server does not currently send a response to a change request.

## This interface has

- 2 properties:
[command](#-command-commandtypeschange),
[arguments](#-arguments-changerequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Change](../enum.CommandTypes/README.md#change--change)

> The command to execute



#### 📄 arguments: [ChangeRequestArgs](../interface.ChangeRequestArgs/README.md)

> Object containing arguments for the command



