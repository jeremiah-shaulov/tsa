# `interface` TupleType `extends` [GenericType](../interface.GenericType/README.md)

[Documentation Index](../README.md)

## This interface has

- 6 properties:
[elementFlags](#-elementflags-readonly-elementflags),
[minLength](#-minlength-number),
[fixedLength](#-fixedlength-number),
[combinedFlags](#-combinedflags-elementflags),
[readonly](#-readonly-boolean),
[labeledElementDeclarations](#-labeledelementdeclarations-readonly-namedtuplemember--parameterdeclaration--undefined)
- [deprecated symbol](#-deprecated-hasrestelement-boolean)
- 4 inherited members from [InterfaceType](../interface.InterfaceType/README.md), 3 from [TypeReference](../interface.TypeReference/README.md), 1 from [ObjectType](../interface.ObjectType/README.md), 28 from [Type](../interface.Type/README.md)


#### 📄 elementFlags: readonly [ElementFlags](../enum.ElementFlags/README.md)\[]



#### 📄 minLength: `number`

> Number of required or variadic elements



#### 📄 fixedLength: `number`

> Number of initial required or optional elements



#### 📄 combinedFlags: [ElementFlags](../enum.ElementFlags/README.md)



#### 📄 readonly: `boolean`



#### 📄 labeledElementDeclarations?: readonly ([NamedTupleMember](../interface.NamedTupleMember/README.md) | [ParameterDeclaration](../interface.ParameterDeclaration/README.md) | `undefined`)\[]



<div style="opacity:0.6">

#### 📄 `deprecated` hasRestElement: `boolean`

> True if tuple has any rest or variadic elements
> 
> `deprecated`
> 
> Use `.combinedFlags & ElementFlags.Variable` instead



</div>

