# `function` visitFunctionBody

[Documentation Index](../README.md)

`function` visitFunctionBody(node: [FunctionBody](../type.FunctionBody/README.md), visitor: [Visitor](../type.Visitor/README.md), context: [TransformationContext](../interface.TransformationContext/README.md)): [Block](../interface.Block/README.md)

Resumes a suspended lexical environment and visits a function body, ending the lexical
environment and merging hoisted declarations upon completion.

------

Resumes a suspended lexical environment and visits a concise body, ending the lexical
environment and merging hoisted declarations upon completion.

