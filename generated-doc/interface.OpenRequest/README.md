# `interface` OpenRequest `extends` [Request](../interface.Request/README.md)

[Documentation Index](../README.md)

Open request; value of command field is "open". Notify the
server that the client has file open.  The server will not
monitor the filesystem for changes in this file and will assume
that the client is updating the server (using the change and/or
reload messages) when the file changes. Server does not currently
send a response to an open request.

## This interface has

- 2 properties:
[command](#-command-commandtypesopen),
[arguments](#-arguments-openrequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Open](../enum.CommandTypes/README.md#open--open)

> The command to execute



#### 📄 arguments: [OpenRequestArgs](../interface.OpenRequestArgs/README.md)

> Object containing arguments for the command



