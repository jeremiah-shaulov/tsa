# `function` visitLexicalEnvironment

[Documentation Index](../README.md)

Starts a new lexical environment and visits a statement list, ending the lexical environment
and merging hoisted declarations upon completion.

`function` visitLexicalEnvironment(statements: [NodeArray](../interface.NodeArray/README.md)\<[Statement](../interface.Statement/README.md)>, visitor: [Visitor](../type.Visitor/README.md), context: [TransformationContext](../interface.TransformationContext/README.md), start?: `number`, ensureUseStrict?: `boolean`, nodesVisitor?: [NodesVisitor](../interface.NodesVisitor/README.md)): [NodeArray](../interface.NodeArray/README.md)\<[Statement](../interface.Statement/README.md)>