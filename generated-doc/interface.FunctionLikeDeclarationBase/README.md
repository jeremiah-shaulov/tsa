# `interface` FunctionLikeDeclarationBase `extends` [SignatureDeclarationBase](../interface.SignatureDeclarationBase/README.md)

[Documentation Index](../README.md)

Several node kinds share function-like features such as a signature,
a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
Examples:
- FunctionDeclaration
- MethodDeclaration
- AccessorDeclaration

## This interface has

- 5 properties:
[\_functionLikeDeclarationBrand](#-_functionlikedeclarationbrand-any),
[asteriskToken](#-readonly-asterisktoken-asterisktoken),
[questionToken](#-readonly-questiontoken-questiontoken),
[exclamationToken](#-readonly-exclamationtoken-exclamationtoken),
[body](#-readonly-body-block--expression)
- 5 inherited members from [SignatureDeclarationBase](../interface.SignatureDeclarationBase/README.md), 1 from [JSDocContainer](../interface.JSDocContainer/README.md), 1 from [Declaration](../interface.Declaration/README.md), 17 from [Node](../interface.Node/README.md), 2 from [ReadonlyTextRange](../interface.ReadonlyTextRange/README.md)


#### 📄 \_functionLikeDeclarationBrand: `any`



#### 📄 `readonly` asteriskToken?: [AsteriskToken](../type.AsteriskToken/README.md)



#### 📄 `readonly` questionToken?: [QuestionToken](../type.QuestionToken/README.md)



#### 📄 `readonly` exclamationToken?: [ExclamationToken](../type.ExclamationToken/README.md)



#### 📄 `readonly` body?: [Block](../interface.Block/README.md) | [Expression](../interface.Expression/README.md)



