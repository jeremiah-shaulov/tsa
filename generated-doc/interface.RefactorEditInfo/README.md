# `interface` RefactorEditInfo

[Documentation Index](../README.md)

A set of edits to make in response to a refactor action, plus an optional
location where renaming should be invoked from

## This interface has

- 5 properties:
[edits](#-edits-filetextchanges),
[renameFilename](#-renamefilename-string),
[renameLocation](#-renamelocation-number),
[commands](#-commands-codeactioncommand),
[notApplicableReason](#-notapplicablereason-string)


#### 📄 edits: [FileTextChanges](../interface.FileTextChanges/README.md)\[]



#### 📄 renameFilename?: `string`



#### 📄 renameLocation?: `number`



#### 📄 commands?: [CodeActionCommand](../type.CodeActionCommand/README.md)\[]



#### 📄 notApplicableReason?: `string`



