# `interface` MappedTypeNode `extends` [TypeNode](../interface.TypeNode/README.md), [Declaration](../interface.Declaration/README.md), [LocalsContainer](../interface.LocalsContainer/README.md)

[Documentation Index](../README.md)

## This interface has

- 7 properties:
[kind](#-readonly-kind-syntaxkindmappedtype),
[readonlyToken](#-readonly-readonlytoken-readonlykeyword--plustoken--minustoken),
[typeParameter](#-readonly-typeparameter-typeparameterdeclaration),
[nameType](#-readonly-nametype-typenode),
[questionToken](#-readonly-questiontoken-questiontoken--plustoken--minustoken),
[type](#-readonly-type-typenode),
[members](#-readonly-members-nodearraytypeelement)
- 1 inherited member from [TypeNode](../interface.TypeNode/README.md), 1 from [Declaration](../interface.Declaration/README.md), 1 from [LocalsContainer](../interface.LocalsContainer/README.md), 17 from [Node](../interface.Node/README.md), 2 from [ReadonlyTextRange](../interface.ReadonlyTextRange/README.md)


#### 📄 `readonly` kind: [SyntaxKind.MappedType](../enum.SyntaxKind/README.md#mappedtype--200)



#### 📄 `readonly` readonlyToken?: [ReadonlyKeyword](../type.ReadonlyKeyword/README.md) | [PlusToken](../type.PlusToken/README.md) | [MinusToken](../type.MinusToken/README.md)



#### 📄 `readonly` typeParameter: [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)



#### 📄 `readonly` nameType?: [TypeNode](../interface.TypeNode/README.md)



#### 📄 `readonly` questionToken?: [QuestionToken](../type.QuestionToken/README.md) | [PlusToken](../type.PlusToken/README.md) | [MinusToken](../type.MinusToken/README.md)



#### 📄 `readonly` type?: [TypeNode](../interface.TypeNode/README.md)



#### 📄 `readonly` members?: [NodeArray](../interface.NodeArray/README.md)\<[TypeElement](../interface.TypeElement/README.md)>

> Used only to produce grammar errors



