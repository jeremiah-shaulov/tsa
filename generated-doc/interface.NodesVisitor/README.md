# `interface` NodesVisitor

[Documentation Index](../README.md)

A function that walks a node array using the given visitor, returning an array whose contents satisfy the test.

- If the input node array is undefined, the output is undefined.
- If the visitor can return undefined, the node it visits in the array will be reused.
- If the output node array is not undefined, then its contents will satisfy the test.
- In order to obtain a return type that is more specific than `NodeArray<Node>`, a test
  function _must_ be provided, and that function must be a type predicate.

For the canonical implementation of this type,

