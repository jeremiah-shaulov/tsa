# `interface` NavtoItem `extends` [FileSpan](../interface.FileSpan/README.md)

[Documentation Index](../README.md)

An item found in a navto response.

## This interface has

- 7 properties:
[name](#-name-string),
[kind](#-kind-scriptelementkind),
[matchKind](#-matchkind-string),
[isCaseSensitive](#-iscasesensitive-boolean),
[kindModifiers](#-kindmodifiers-string),
[containerName](#-containername-string),
[containerKind](#-containerkind-scriptelementkind)
- 1 inherited member from [FileSpan](../interface.FileSpan/README.md), 2 from [TextSpan](../interface.TextSpan.2/README.md)


#### 📄 name: `string`

> The symbol's name.



#### 📄 kind: [ScriptElementKind](../enum.ScriptElementKind/README.md)

> The symbol's kind (such as 'className' or 'parameterName').



#### 📄 matchKind: `string`

> exact, substring, or prefix.



#### 📄 isCaseSensitive: `boolean`

> If this was a case sensitive or insensitive match.



#### 📄 kindModifiers?: `string`

> Optional modifiers for the kind (such as 'public').



#### 📄 containerName?: `string`

> Name of symbol's container symbol (if any); for example,
> the class name if symbol is a class member.



#### 📄 containerKind?: [ScriptElementKind](../enum.ScriptElementKind/README.md)

> Kind of symbol's container symbol (if any).



