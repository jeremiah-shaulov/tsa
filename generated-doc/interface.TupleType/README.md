# `interface` TupleType `extends` [GenericType](../private.interface.GenericType/README.md)

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


#### 📄 elementFlags: readonly [ElementFlags](../enum.ElementFlags/README.md)\[]



#### 📄 minLength: `number`



#### 📄 fixedLength: `number`



#### 📄 combinedFlags: [ElementFlags](../enum.ElementFlags/README.md)



#### 📄 readonly: `boolean`



#### 📄 labeledElementDeclarations?: readonly ([NamedTupleMember](../private.interface.NamedTupleMember/README.md) | [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md) | `undefined`)\[]



<div style="opacity:0.6">

#### 📄 `deprecated` hasRestElement: `boolean`

> `deprecated`
> 
> Use `.combinedFlags & ElementFlags.Variable` instead



</div>

