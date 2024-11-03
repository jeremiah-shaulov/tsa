# `interface` NavigationTree

[Documentation Index](../README.md)

Node in a tree of nested declarations in a file.
The top node is always a script or module node.

## This interface has

- 6 properties:
[text](#-text-string),
[kind](#-kind-scriptelementkind),
[kindModifiers](#-kindmodifiers-string),
[spans](#-spans-textspan),
[nameSpan](#-namespan-textspan--undefined),
[childItems](#-childitems-navigationtree)


#### 📄 text: `string`



#### 📄 kind: [ScriptElementKind](../enum.ScriptElementKind/README.md)



#### 📄 kindModifiers: `string`



#### 📄 spans: [TextSpan](../interface.TextSpan/README.md)\[]



#### 📄 nameSpan: [TextSpan](../interface.TextSpan/README.md) | `undefined`



#### 📄 childItems?: [NavigationTree](../interface.NavigationTree/README.md)\[]



