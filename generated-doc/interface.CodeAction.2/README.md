# `interface` CodeAction

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[description](#-description-string),
[changes](#-changes-filecodeedits),
[commands](#-commands-)


#### 📄 description: `string`

> Description of the code action to display in the UI of the editor



#### 📄 changes: [FileCodeEdits](../interface.FileCodeEdits/README.md)\[]

> Text changes to apply to each file as part of the code action



#### 📄 commands?: \{}\[]

> A command is an opaque object that should be passed to `ApplyCodeActionCommandRequestArgs` without modification.



