# `interface` Signature

[Documentation Index](../README.md)

## This interface has

- 4 properties:
[declaration](#-declaration-signaturedeclaration--jsdocsignature),
[typeParameters](#-typeparameters-readonly-typeparameter),
[parameters](#-parameters-readonly-symbol),
[thisParameter](#-thisparameter-symbol)
- 7 methods:
[getDeclaration](#-getdeclaration-signaturedeclaration),
[getTypeParameters](#-gettypeparameters-typeparameter),
[getParameters](#-getparameters-symbol),
[getTypeParameterAtPosition](#-gettypeparameteratpositionpos-number-type),
[getReturnType](#-getreturntype-type),
[getDocumentationComment](#-getdocumentationcommenttypechecker-typechecker--undefined-symboldisplaypart),
[getJsDocTags](#-getjsdoctags-jsdoctaginfo)


#### 📄 declaration?: [SignatureDeclaration](../type.SignatureDeclaration/README.md) | [JSDocSignature](../interface.JSDocSignature/README.md)



#### 📄 typeParameters?: readonly [TypeParameter](../interface.TypeParameter/README.md)\[]



#### 📄 parameters: readonly [Symbol](../interface.Symbol/README.md)\[]



#### 📄 thisParameter?: [Symbol](../interface.Symbol/README.md)



#### ⚙ getDeclaration(): SignatureDeclaration



#### ⚙ getTypeParameters(): [TypeParameter](../interface.TypeParameter/README.md)\[]



#### ⚙ getParameters(): [Symbol](../interface.Symbol/README.md)\[]



#### ⚙ getTypeParameterAtPosition(pos: `number`): [Type](../interface.Type/README.md)



#### ⚙ getReturnType(): [Type](../interface.Type/README.md)



#### ⚙ getDocumentationComment(typeChecker: [TypeChecker](../interface.TypeChecker/README.md) | `undefined`): [SymbolDisplayPart](../interface.SymbolDisplayPart/README.md)\[]



#### ⚙ getJsDocTags(): [JSDocTagInfo](../interface.JSDocTagInfo/README.md)\[]



