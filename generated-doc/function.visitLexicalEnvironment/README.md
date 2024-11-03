# `function` visitLexicalEnvironment

[Documentation Index](../README.md)

Starts a new lexical environment and visits a statement list, ending the lexical environment
and merging hoisted declarations upon completion.

`function` visitLexicalEnvironment(statements: [NodeArray](../private.interface.NodeArray/README.md)\<[Statement](../private.interface.Statement/README.md)>, visitor: [Visitor](../private.type.Visitor/README.md), context: [TransformationContext](../private.interface.TransformationContext/README.md), start?: `number`, ensureUseStrict?: `boolean`, nodesVisitor?: [NodesVisitor](../private.interface.NodesVisitor/README.md)): [NodeArray](../private.interface.NodeArray/README.md)\<Statement>