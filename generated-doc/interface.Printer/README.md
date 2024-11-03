# `interface` Printer

[Documentation Index](../README.md)

## This interface has

- 4 methods:
[printNode](#-printnodehint-emithint-node-node-sourcefile-sourcefile-string),
[printList](#-printlistt-extends-nodeformat-listformat-list-nodearrayt-sourcefile-sourcefile-string),
[printFile](#-printfilesourcefile-sourcefile-string),
[printBundle](#-printbundlebundle-bundle-string)


#### ⚙ printNode(hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md), sourceFile: [SourceFile](../interface.SourceFile/README.md)): `string`

> Print a node and its subtree as-is, without any emit transformations.



#### ⚙ printList\<T `extends` [Node](../interface.Node/README.md)>(format: [ListFormat](../enum.ListFormat/README.md), list: [NodeArray](../interface.NodeArray/README.md)\<T>, sourceFile: [SourceFile](../interface.SourceFile/README.md)): `string`

> Prints a list of nodes using the given format flags



#### ⚙ printFile(sourceFile: [SourceFile](../interface.SourceFile/README.md)): `string`

> Prints a source file as-is, without any emit transformations.



#### ⚙ printBundle(bundle: [Bundle](../interface.Bundle/README.md)): `string`

> Prints a bundle of source files as-is, without any emit transformations.



