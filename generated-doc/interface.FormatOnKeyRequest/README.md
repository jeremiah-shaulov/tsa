# `interface` FormatOnKeyRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Format on key request; value of command field is
"formatonkey". Given file location and key typed (as string),
return response giving zero or more edit instructions.  The
edit instructions will be sorted in file order.  Applying the
edit instructions in reverse to file will result in correctly
reformatted text.

## This interface has

- 2 properties:
[command](#-command-commandtypesformatonkey),
[arguments](#-arguments-formatonkeyrequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Formatonkey](../enum.CommandTypes/README.md#formatonkey--formatonkey)

> The command to execute



#### 📄 arguments: [FormatOnKeyRequestArgs](../interface.FormatOnKeyRequestArgs/README.md)

> Object containing arguments for the command



