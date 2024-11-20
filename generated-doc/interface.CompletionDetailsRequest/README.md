# `interface` CompletionDetailsRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Completion entry details request; value of command field is
"completionEntryDetails".  Given a file location (file, line,
col) and an array of completion entry names return more
detailed information for each completion entry.

## This interface has

- 2 properties:
[command](#-command-commandtypescompletiondetails),
[arguments](#-arguments-completiondetailsrequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.CompletionDetails](../enum.CommandTypes/README.md#completiondetails--completionentrydetails)

> The command to execute



#### 📄 arguments: [CompletionDetailsRequestArgs](../interface.CompletionDetailsRequestArgs/README.md)

> Object containing arguments for the command



