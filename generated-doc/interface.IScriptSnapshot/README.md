# `interface` IScriptSnapshot

[Documentation Index](../README.md)

Represents an immutable snapshot of a script at a specified time.Once acquired, the
snapshot is observably immutable. i.e. the same calls with the same parameters will return
the same values.

## This interface has

- 4 methods:
[getText](#-gettextstart-number-end-number-string),
[getLength](#-getlength-number),
[getChangeRange](#-getchangerangeoldsnapshot-iscriptsnapshot-textchangerange),
[dispose](#-dispose-void)


#### ⚙ getText(start: `number`, end: `number`): `string`

> Gets a portion of the script snapshot specified by [start, end).



#### ⚙ getLength(): `number`

> Gets the length of this script snapshot.



#### ⚙ getChangeRange(oldSnapshot: [IScriptSnapshot](../interface.IScriptSnapshot/README.md)): [TextChangeRange](../interface.TextChangeRange/README.md)

> Gets the TextChangeRange that describe how the text changed between this text and
> an older version.  This information is used by the incremental parser to determine
> what sections of the script need to be re-parsed.  'undefined' can be returned if the
> change range cannot be determined.  However, in that case, incremental parsing will
> not happen and the entire document will be re - parsed.



#### ⚙ dispose?(): `void`

> Releases all resources held by this script snapshot



