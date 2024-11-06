# `function` visitNode

[Documentation Index](../README.md)

`function` visitNode\<TIn `extends` [Node](../interface.Node/README.md) | `undefined`, TVisited `extends` [Node](../interface.Node/README.md) | `undefined`, TOut `extends` [Node](../interface.Node/README.md)>(node: TIn, visitor: [Visitor](../type.Visitor/README.md)\<NonNullable\<TIn>, TVisited>, test: (node: [Node](../interface.Node/README.md)) => node `is` TOut, lift?: (node: readonly [Node](../interface.Node/README.md)\[]) => [Node](../interface.Node/README.md)): TOut

Visits a Node using the supplied visitor, possibly returning a new Node in its place.

- If the input node is undefined, then the output is undefined.
- If the visitor returns undefined, then the output is undefined.
- If the output node is not undefined, then it will satisfy the test function.
- In order to obtain a return type that is more specific than `Node`, a test
  function _must_ be provided, and that function must be a type predicate.

