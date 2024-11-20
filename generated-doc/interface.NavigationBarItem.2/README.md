# `interface` NavigationBarItem

[Documentation Index](../README.md)

## This interface has

- 6 properties:
[text](#-text-string),
[kind](#-kind-scriptelementkind),
[kindModifiers](#-kindmodifiers-string),
[spans](#-spans-textspan),
[childItems](#-childitems-navigationbaritem),
[indent](#-indent-number)


#### 📄 text: `string`

> The item's display text.



#### 📄 kind: [ScriptElementKind](../enum.ScriptElementKind/README.md)

> The symbol's kind (such as 'className' or 'parameterName').



#### 📄 kindModifiers?: `string`

> Optional modifiers for the kind (such as 'public').



#### 📄 spans: [TextSpan](../interface.TextSpan.2/README.md)\[]

> The definition locations of the item.



#### 📄 childItems?: [NavigationBarItem](../interface.NavigationBarItem.2/README.md)\[]

> Optional children.



#### 📄 indent: `number`

> Number of levels deep this item should appear.



