# `interface` TypeReference `extends` [ObjectType](../interface.ObjectType/README.md)

[Documentation Index](../README.md)

Type references (ObjectFlags.Reference). When a class or interface has type parameters or
a "this" type, references to the class or interface are made using type references. The
typeArguments property specifies the types to substitute for the type parameters of the
class or interface and optionally includes an extra element that specifies the type to
substitute for "this" in the resulting instantiation. When no extra argument is present,
the type reference itself is substituted for "this". The typeArguments property is undefined
if the class or interface has no type parameters and the reference isn't specifying an
explicit "this" argument.

## This interface has

- 3 properties:
[target](#-target-generictype),
[node](#-node-typereferencenode--arraytypenode--tupletypenode),
[typeArguments](#-typearguments-readonly-type)


#### 📄 target: [GenericType](../interface.GenericType/README.md)



#### 📄 node?: [TypeReferenceNode](../interface.TypeReferenceNode/README.md) | [ArrayTypeNode](../interface.ArrayTypeNode/README.md) | [TupleTypeNode](../interface.TupleTypeNode/README.md)



#### 📄 typeArguments?: readonly [Type](../interface.Type/README.md)\[]



