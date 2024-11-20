# `interface` CloseRequest `extends` [FileRequest](../interface.FileRequest/README.md)

[Documentation Index](../README.md)

Close request; value of command field is "close". Notify the
server that the client has closed a previously open file.  If
file is still referenced by open files, the server will resume
monitoring the filesystem for changes to file.  Server does not
currently send a response to a close request.

## This interface has

- property [command](#-command-commandtypesclose)
- 1 inherited member from [FileRequest](../interface.FileRequest/README.md), 1 from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Close](../enum.CommandTypes/README.md#close--close)

> The command to execute



