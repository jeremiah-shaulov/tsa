# `interface` Node `extends` [ReadonlyTextRange](../private.interface.ReadonlyTextRange/README.md)

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[kind](#-readonly-kind-syntaxkind),
[flags](#-readonly-flags-nodeflags),
[parent](#-readonly-parent-node)
- 15 methods:
[getSourceFile](#-getsourcefile-sourcefile),
[getChildCount](#-getchildcountsourcefile-sourcefile-number),
[getChildAt](#-getchildatindex-number-sourcefile-sourcefile-node),
[getChildren](#-getchildrensourcefile-sourcefile-readonly-node),
[getStart](#-getstartsourcefile-sourcefile-includejsdoccomment-boolean-number),
[getFullStart](#-getfullstart-number),
[getEnd](#-getend-number),
[getWidth](#-getwidthsourcefile-sourcefilelike-number),
[getFullWidth](#-getfullwidth-number),
[getLeadingTriviaWidth](#-getleadingtriviawidthsourcefile-sourcefile-number),
[getFullText](#-getfulltextsourcefile-sourcefile-string),
[getText](#-gettextsourcefile-sourcefile-string),
[getFirstToken](#-getfirsttokensourcefile-sourcefile-node),
[getLastToken](#-getlasttokensourcefile-sourcefile-node),
[forEachChild](#-foreachchildtcbnode-node-node--t--undefined-cbnodearray-nodes-nodearraynode--t--undefined-t)


#### 📄 `readonly` kind: [SyntaxKind](../private.enum.SyntaxKind/README.md)



#### 📄 `readonly` flags: [NodeFlags](../private.enum.NodeFlags/README.md)



#### 📄 `readonly` parent: [Node](../private.interface.Node/README.md)



#### ⚙ getSourceFile(): [SourceFile](../private.interface.SourceFile/README.md)



#### ⚙ getChildCount(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): `number`



#### ⚙ getChildAt(index: `number`, sourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): [Node](../private.interface.Node/README.md)



#### ⚙ getChildren(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): readonly Node\[]



#### ⚙ getStart(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md), includeJsDocComment?: `boolean`): `number`



#### ⚙ getFullStart(): `number`



#### ⚙ getEnd(): `number`



#### ⚙ getWidth(sourceFile?: [SourceFileLike](../private.interface.SourceFileLike/README.md)): `number`



#### ⚙ getFullWidth(): `number`



#### ⚙ getLeadingTriviaWidth(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): `number`



#### ⚙ getFullText(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): `string`



#### ⚙ getText(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): `string`



#### ⚙ getFirstToken(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): [Node](../private.interface.Node/README.md)



#### ⚙ getLastToken(sourceFile?: [SourceFile](../private.interface.SourceFile/README.md)): [Node](../private.interface.Node/README.md)



#### ⚙ forEachChild\<T>(cbNode: (node: [Node](../private.interface.Node/README.md)) => T | `undefined`, cbNodeArray?: (nodes: [NodeArray](../private.interface.NodeArray/README.md)\<[Node](../private.interface.Node/README.md)>) => T | `undefined`): T



