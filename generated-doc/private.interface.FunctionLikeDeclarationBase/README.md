# `interface` FunctionLikeDeclarationBase `extends` [SignatureDeclarationBase](../private.interface.SignatureDeclarationBase/README.md)

[Documentation Index](../README.md)

Several node kinds share function-like features such as a signature,
a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
Examples:
- FunctionDeclaration
- MethodDeclaration
- AccessorDeclaration

## This interface has

- 5 properties:
[\_functionLikeDeclarationBrand](#-functionlikedeclarationbrand-any),
[asteriskToken](#-readonly-asterisktoken-asterisktoken),
[questionToken](#-readonly-questiontoken-questiontoken),
[exclamationToken](#-readonly-exclamationtoken-exclamationtoken),
[body](#-readonly-body-block--expression)


#### 📄 \_functionLikeDeclarationBrand: `any`



#### 📄 `readonly` asteriskToken?: [AsteriskToken](../private.type.AsteriskToken/README.md)



#### 📄 `readonly` questionToken?: [QuestionToken](../private.type.QuestionToken/README.md)



#### 📄 `readonly` exclamationToken?: [ExclamationToken](../private.type.ExclamationToken/README.md)



#### 📄 `readonly` body?: [Block](../private.interface.Block/README.md) | [Expression](../private.interface.Expression/README.md)



