# `interface` ExportAssignment `extends` [DeclarationStatement](../interface.DeclarationStatement/README.md), [JSDocContainer](../interface.JSDocContainer/README.md)

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
- 1 inherited member from [DeclarationStatement](../interface.DeclarationStatement/README.md), 1 from [JSDocContainer](../interface.JSDocContainer/README.md), 1 from [Statement](../interface.Statement/README.md), 16 from [Node](../interface.Node/README.md), 1 from [Declaration](../interface.Declaration/README.md), 2 from [ReadonlyTextRange](../interface.ReadonlyTextRange/README.md)


#### 📄 `readonly` kind: [SyntaxKind.ExportAssignment](../enum.SyntaxKind/README.md#exportassignment--277)



#### 📄 `readonly` parent: [SourceFile](../interface.SourceFile/README.md)



#### 📄 `readonly` modifiers?: [NodeArray](../interface.NodeArray/README.md)\<[ModifierLike](../type.ModifierLike/README.md)>



#### 📄 `readonly` isExportEquals?: `boolean`



#### 📄 `readonly` expression: [Expression](../interface.Expression/README.md)



