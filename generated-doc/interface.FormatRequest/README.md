# `interface` FormatRequest `extends` [FileLocationRequest](../interface.FileLocationRequest/README.md)

[Documentation Index](../README.md)

Format request; value of command field is "format".  Return
response giving zero or more edit instructions.  The edit
instructions will be sorted in file order.  Applying the edit
instructions in reverse to file will result in correctly
reformatted text.

## This interface has

- 2 properties:
[command](#-command-commandtypesformat),
[arguments](#-arguments-formatrequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Format](../enum.CommandTypes/README.md#format--format)

> The command to execute



#### 📄 arguments: [FormatRequestArgs](../interface.FormatRequestArgs/README.md)

> Object containing arguments for the command



