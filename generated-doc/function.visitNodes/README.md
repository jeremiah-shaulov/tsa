# `function` visitNodes

[Documentation Index](../README.md)

Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.

- If the input node array is undefined, the output is undefined.
- If the visitor can return undefined, the node it visits in the array will be reused.
- If the output node array is not undefined, then its contents will satisfy the test.
- In order to obtain a return type that is more specific than `NodeArray<Node>`, a test
  function _must_ be provided, and that function must be a type predicate.

`function` visitNodes\<TIn `extends` [Node](../private.interface.Node/README.md), TInArray `extends` [NodeArray](../private.interface.NodeArray/README.md)\<TIn> | `undefined`, TOut `extends` [Node](../private.interface.Node/README.md)>(nodes: TInArray, visitor: [Visitor](../private.type.Visitor/README.md)\<TIn, [Node](../private.interface.Node/README.md) | `undefined`>, test: (node: [Node](../private.interface.Node/README.md)) => node `is` TOut, start?: `number`, count?: `number`): [NodeArray](../private.interface.NodeArray/README.md)\<TOut>