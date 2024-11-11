# `function` visitNodes

[Documentation Index](../README.md)

`function` visitNodes\<TIn `extends` [Node](../interface.Node/README.md), TInArray `extends` [NodeArray](../interface.NodeArray/README.md)\<TIn> | `undefined`, TOut `extends` [Node](../interface.Node/README.md)>(nodes: TInArray, visitor: [Visitor](../type.Visitor/README.md)\<TIn, [Node](../interface.Node/README.md) | `undefined`>, test: (node: [Node](../interface.Node/README.md)) => node `is` TOut, start?: `number`, count?: `number`): [NodeArray](../interface.NodeArray/README.md)\<TOut>

Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.

- If the input node array is undefined, the output is undefined.
- If the visitor can return undefined, the node it visits in the array will be reused.
- If the output node array is not undefined, then its contents will satisfy the test.
- In order to obtain a return type that is more specific than `NodeArray<Node>`, a test
  function _must_ be provided, and that function must be a type predicate.

🎚️ Parameter **nodes**:

The NodeArray to visit.

🎚️ Parameter **visitor**:

The callback used to visit a Node.

🎚️ Parameter **test**:

A node test to execute for each node.

🎚️ Parameter **start**:

An optional value indicating the starting offset at which to start visiting.

🎚️ Parameter **count**:

An optional value indicating the maximum number of nodes to visit.

