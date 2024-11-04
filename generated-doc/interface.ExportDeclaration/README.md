# `interface` ExportDeclaration `extends` [DeclarationStatement](../interface.DeclarationStatement/README.md), [JSDocContainer](../interface.JSDocContainer/README.md)

[Documentation Index](../README.md)

## This interface has

- 7 properties:
[kind](#-readonly-kind-syntaxkindexportdeclaration),
[parent](#-readonly-parent-sourcefile--moduleblock),
[modifiers](#-readonly-modifiers-nodearraymodifierlike),
[isTypeOnly](#-readonly-istypeonly-boolean),
[exportClause](#-readonly-exportclause-namedexportbindings),
[moduleSpecifier](#-readonly-modulespecifier-expression),
[attributes](#-readonly-attributes-importattributes)
- [deprecated symbol](#-deprecated-readonly-assertclause-assertclause)


#### 📄 `readonly` kind: [SyntaxKind.ExportDeclaration](../enum.SyntaxKind/README.md#exportdeclaration--278)



#### 📄 `readonly` parent: [SourceFile](../interface.SourceFile/README.md) | [ModuleBlock](../interface.ModuleBlock/README.md)



#### 📄 `readonly` modifiers?: [NodeArray](../interface.NodeArray/README.md)\<[ModifierLike](../type.ModifierLike/README.md)>



#### 📄 `readonly` isTypeOnly: `boolean`



#### 📄 `readonly` exportClause?: [NamedExportBindings](../type.NamedExportBindings/README.md)

> Will not be assigned in the case of `export * from "foo";`



#### 📄 `readonly` moduleSpecifier?: [Expression](../interface.Expression/README.md)

> If this is not a StringLiteral it will be a grammar error.



#### 📄 `readonly` attributes?: [ImportAttributes](../interface.ImportAttributes/README.md)



<div style="opacity:0.6">

#### 📄 `deprecated` `readonly` assertClause?: [AssertClause](../interface.AssertClause/README.md)



</div>

