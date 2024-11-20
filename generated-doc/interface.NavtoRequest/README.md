# `interface` NavtoRequest `extends` [Request](../interface.Request/README.md)

[Documentation Index](../README.md)

Navto request message; value of command field is "navto".
Return list of objects giving file locations and symbols that
match the search term given in argument 'searchTerm'.  The
context for the search is given by the named file.

## This interface has

- 2 properties:
[command](#-command-commandtypesnavto),
[arguments](#-arguments-navtorequestargs)
- 1 inherited member from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.Navto](../enum.CommandTypes/README.md#navto--navto)

> The command to execute



#### 📄 arguments: [NavtoRequestArgs](../interface.NavtoRequestArgs/README.md)

> Object containing arguments for the command



