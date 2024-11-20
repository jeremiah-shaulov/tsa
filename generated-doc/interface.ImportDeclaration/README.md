# `interface` ImportDeclaration `extends` [Statement](../interface.Statement/README.md)

[Documentation Index](../README.md)

## This interface has

- 6 properties:
[kind](#-readonly-kind-syntaxkindimportdeclaration),
[parent](#-readonly-parent-sourcefile--moduleblock),
[modifiers](#-readonly-modifiers-nodearraymodifierlike),
[importClause](#-readonly-importclause-importclause),
[moduleSpecifier](#-readonly-modulespecifier-expression),
[attributes](#-readonly-attributes-importattributes)
- [deprecated symbol](#-deprecated-readonly-assertclause-assertclause)
- 1 inherited member from [Statement](../interface.Statement/README.md), 16 from [Node](../interface.Node/README.md), 1 from [JSDocContainer](../interface.JSDocContainer/README.md), 2 from [ReadonlyTextRange](../interface.ReadonlyTextRange/README.md)


#### 📄 `readonly` kind: [SyntaxKind.ImportDeclaration](../enum.SyntaxKind/README.md#importdeclaration--272)



#### 📄 `readonly` parent: [SourceFile](../interface.SourceFile/README.md) | [ModuleBlock](../interface.ModuleBlock/README.md)



#### 📄 `readonly` modifiers?: [NodeArray](../interface.NodeArray/README.md)\<[ModifierLike](../type.ModifierLike/README.md)>



#### 📄 `readonly` importClause?: [ImportClause](../interface.ImportClause/README.md)



#### 📄 `readonly` moduleSpecifier: [Expression](../interface.Expression/README.md)

> If this is not a StringLiteral it will be a grammar error.



#### 📄 `readonly` attributes?: [ImportAttributes](../interface.ImportAttributes/README.md)



<div style="opacity:0.6">

#### 📄 `deprecated` `readonly` assertClause?: [AssertClause](../interface.AssertClause/README.md)



</div>

