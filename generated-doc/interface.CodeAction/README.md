# `interface` CodeAction

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[description](#-description-string),
[changes](#-changes-filetextchanges),
[commands](#-commands-codeactioncommand)


#### 📄 description: `string`

> Description of the code action to display in the UI of the editor



#### 📄 changes: [FileTextChanges](../interface.FileTextChanges/README.md)\[]

> Text changes to apply to each file as part of the code action



#### 📄 commands?: [CodeActionCommand](../type.CodeActionCommand/README.md)\[]

> If the user accepts the code fix, the editor should send the action back in a `applyAction` request.
> This allows the language service to have side effects (e.g. installing dependencies) upon a code fix.



