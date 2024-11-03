# `interface` NavigationBarItem

[Documentation Index](../README.md)

Navigation bar interface designed for visual studio's dual-column layout.
This does not form a proper tree.
The navbar is returned as a list of top-level items, each of which has a list of child items.
Child items always have an empty array for their `childItems`.

## This interface has

- 8 properties:
[text](#-text-string),
[kind](#-kind-scriptelementkind),
[kindModifiers](#-kindmodifiers-string),
[spans](#-spans-textspan),
[childItems](#-childitems-navigationbaritem),
[indent](#-indent-number),
[bolded](#-bolded-boolean),
[grayed](#-grayed-boolean)


#### 📄 text: `string`



#### 📄 kind: [ScriptElementKind](../private.enum.ScriptElementKind/README.md)



#### 📄 kindModifiers: `string`



#### 📄 spans: [TextSpan](../private.interface.TextSpan/README.md)\[]



#### 📄 childItems: [NavigationBarItem](../interface.NavigationBarItem/README.md)\[]



#### 📄 indent: `number`



#### 📄 bolded: `boolean`



#### 📄 grayed: `boolean`



