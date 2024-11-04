# `interface` RenameInfoSuccess

[Documentation Index](../README.md)

## This interface has

- 7 properties:
[canRename](#-canrename-true),
[fileToRename](#-filetorename-string),
[displayName](#-displayname-string),
[fullDisplayName](#-fulldisplayname-string),
[kind](#-kind-scriptelementkind),
[kindModifiers](#-kindmodifiers-string),
[triggerSpan](#-triggerspan-textspan)


#### 📄 canRename: `true`



#### 📄 fileToRename?: `string`

> File or directory to rename.
> If set, `getEditsForFileRename` should be called instead of `findRenameLocations`.



#### 📄 displayName: `string`



#### 📄 fullDisplayName: `string`

> Full display name of item to be renamed.
> If item to be renamed is a file, then this is the original text of the module specifer



#### 📄 kind: [ScriptElementKind](../enum.ScriptElementKind/README.md)



#### 📄 kindModifiers: `string`



#### 📄 triggerSpan: [TextSpan](../interface.TextSpan/README.md)



