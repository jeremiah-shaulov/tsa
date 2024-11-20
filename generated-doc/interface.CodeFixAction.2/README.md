# `interface` CodeFixAction `extends` [CodeAction](../interface.CodeAction.2/README.md)

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[fixName](#-fixname-string),
[fixId](#-fixid-),
[fixAllDescription](#-fixalldescription-string)
- 3 inherited members from [CodeAction](../interface.CodeAction.2/README.md)


#### 📄 fixName: `string`

> Short name to identify the fix, for use by telemetry.



#### 📄 fixId?: \{}

> If present, one may call 'getCombinedCodeFix' with this fixId.
> This may be omitted to indicate that the code fix can't be applied in a group.



#### 📄 fixAllDescription?: `string`

> Should be present if and only if 'fixId' is.



