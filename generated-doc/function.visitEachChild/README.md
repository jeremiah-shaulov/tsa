# `function` visitEachChild

[Documentation Index](../README.md)

`function` visitEachChild\<T `extends` [Node](../interface.Node/README.md)>(node: T, visitor: [Visitor](../type.Visitor/README.md), context: [TransformationContext](../interface.TransformationContext/README.md) | `undefined`): T

Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.

