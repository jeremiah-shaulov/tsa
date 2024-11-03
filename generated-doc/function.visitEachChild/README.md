# `function` visitEachChild

[Documentation Index](../README.md)

Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.

`function` visitEachChild\<T `extends` [Node](../private.interface.Node/README.md)>(node: T, visitor: [Visitor](../private.type.Visitor/README.md), context: [TransformationContext](../private.interface.TransformationContext/README.md) | `undefined`): T