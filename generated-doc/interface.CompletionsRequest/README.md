# `interface` CompletionsRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Completions request; value of command field is "completions".
Given a file location (file, line, col) and a prefix (which may
be the empty string), return the possible completions that
begin with prefix.

## This interface has

- 2 properties:
[command](#-command-commandtypescompletions--commandtypescompletioninfo),
[arguments](#-arguments-completionsrequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Completions](../enum.CommandTypes/README.md#deprecated-completions--completions) | [CommandTypes.CompletionInfo](../enum.CommandTypes/README.md#completioninfo--completioninfo)

> The command to execute



#### 📄 arguments: [CompletionsRequestArgs](../interface.CompletionsRequestArgs/README.md)

> Object containing arguments for the command



