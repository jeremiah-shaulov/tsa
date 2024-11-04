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

> Name of the declaration, or a short description, e.g. "<class>".



#### 📄 kind: [ScriptElementKind](../enum.ScriptElementKind/README.md)



#### 📄 kindModifiers: `string`

> ScriptElementKindModifier separated by commas, e.g. "public,abstract"



#### 📄 spans: [TextSpan](../interface.TextSpan/README.md)\[]

> Spans of the nodes that generated this declaration.
> There will be more than one if this is the result of merging.



#### 📄 nameSpan: [TextSpan](../interface.TextSpan/README.md) | `undefined`



#### 📄 childItems?: [NavigationTree](../interface.NavigationTree/README.md)\[]

> Present if non-empty



