# `interface` ExportAssignment `extends` [DeclarationStatement](../private.interface.DeclarationStatement/README.md), [JSDocContainer](../private.interface.JSDocContainer/README.md)

[Documentation Index](../README.md)

This is either an `export =` or an `export default` declaration.
Unless `isExportEquals` is set, this node was parsed as an `export default`.

## This interface has

- 5 properties:
[kind](#-readonly-kind-syntaxkindexportassignment),
[parent](#-readonly-parent-sourcefile),
[modifiers](#-readonly-modifiers-nodearraymodifierlike),
[isExportEquals](#-readonly-isexportequals-boolean),
[expression](#-readonly-expression-expression)


#### 📄 `readonly` kind: [SyntaxKind.ExportAssignment](../private.enum.SyntaxKind/README.md#exportassignment--277)



#### 📄 `readonly` parent: [SourceFile](../private.interface.SourceFile/README.md)



#### 📄 `readonly` modifiers?: [NodeArray](../private.interface.NodeArray/README.md)\<[ModifierLike](../private.type.ModifierLike/README.md)>



#### 📄 `readonly` isExportEquals?: `boolean`



#### 📄 `readonly` expression: [Expression](../private.interface.Expression/README.md)



