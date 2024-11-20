# `interface` SignatureHelpRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Signature help request; value of command field is "signatureHelp".
Given a file location (file, line, col), return the signature
help.

## This interface has

- 2 properties:
[command](#-command-commandtypessignaturehelp),
[arguments](#-arguments-signaturehelprequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.SignatureHelp](../enum.CommandTypes/README.md#signaturehelp--signaturehelp)

> The command to execute



#### 📄 arguments: [SignatureHelpRequestArgs](../interface.SignatureHelpRequestArgs/README.md)

> Object containing arguments for the command



