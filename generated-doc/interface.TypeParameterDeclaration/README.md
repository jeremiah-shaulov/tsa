# `interface` TypeParameterDeclaration `extends` [NamedDeclaration](../interface.NamedDeclaration/README.md), [JSDocContainer](../interface.JSDocContainer/README.md)

[Documentation Index](../README.md)

## This interface has

- 7 properties:
[kind](#-readonly-kind-syntaxkindtypeparameter),
[parent](#-readonly-parent-declarationwithtypeparameterchildren--infertypenode),
[modifiers](#-readonly-modifiers-nodearraymodifier),
[name](#-readonly-name-identifier),
[constraint](#-readonly-constraint-typenode),
[default](#-readonly-default-typenode),
[expression](#-expression-expression)
- 1 inherited member from [JSDocContainer](../interface.JSDocContainer/README.md), 1 from [Declaration](../interface.Declaration/README.md), 16 from [Node](../interface.Node/README.md), 2 from [ReadonlyTextRange](../interface.ReadonlyTextRange/README.md)


#### 📄 `readonly` kind: [SyntaxKind.TypeParameter](../enum.SyntaxKind/README.md#typeparameter--169)



#### 📄 `readonly` parent: [DeclarationWithTypeParameterChildren](../type.DeclarationWithTypeParameterChildren/README.md) | [InferTypeNode](../interface.InferTypeNode/README.md)



#### 📄 `readonly` modifiers?: [NodeArray](../interface.NodeArray/README.md)\<[Modifier](../type.Modifier/README.md)>



#### 📄 `readonly` name: [Identifier](../interface.Identifier/README.md)



#### 📄 `readonly` constraint?: [TypeNode](../interface.TypeNode/README.md)

> Note: Consider calling `getEffectiveConstraintOfTypeParameter`



#### 📄 `readonly` default?: [TypeNode](../interface.TypeNode/README.md)



#### 📄 expression?: [Expression](../interface.Expression/README.md)



