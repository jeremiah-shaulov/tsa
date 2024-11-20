# `interface` DocumentHighlightsRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Get document highlights request; value of command field is
"documentHighlights". Return response giving spans that are relevant
in the file at a given line and column.

## This interface has

- 2 properties:
[command](#-command-commandtypesdocumenthighlights),
[arguments](#-arguments-documenthighlightsrequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.DocumentHighlights](../enum.CommandTypes/README.md#documenthighlights--documenthighlights)

> The command to execute



#### 📄 arguments: [DocumentHighlightsRequestArgs](../interface.DocumentHighlightsRequestArgs/README.md)

> Object containing arguments for the command



