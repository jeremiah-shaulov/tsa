# `function` visitFunctionBody

[Documentation Index](../README.md)

Resumes a suspended lexical environment and visits a function body, ending the lexical
environment and merging hoisted declarations upon completion.

------

Resumes a suspended lexical environment and visits a concise body, ending the lexical
environment and merging hoisted declarations upon completion.

`function` visitFunctionBody(node: [FunctionBody](../private.type.FunctionBody/README.md), visitor: [Visitor](../private.type.Visitor/README.md), context: [TransformationContext](../private.interface.TransformationContext/README.md)): [Block](../private.interface.Block/README.md)