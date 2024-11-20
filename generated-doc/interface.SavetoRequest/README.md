# `interface` SavetoRequest `extends` [FileRequest](../interface.FileRequest/README.md)

[Documentation Index](../README.md)

Saveto request message; value of command field is "saveto".
For debugging purposes, save to a temporaryfile (named by
argument 'tmpfile') the contents of file named by argument
'file'.  The server does not currently send a response to a
"saveto" request.

## This interface has

- 2 properties:
[command](#-command-commandtypessaveto),
[arguments](#-arguments-savetorequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Saveto](../enum.CommandTypes/README.md#saveto--saveto)

> The command to execute



#### 📄 arguments: [SavetoRequestArgs](../interface.SavetoRequestArgs/README.md)

> Object containing arguments for the command



