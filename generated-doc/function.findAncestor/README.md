# `function` findAncestor

[Documentation Index](../README.md)

`function` findAncestor\<T `extends` [Node](../interface.Node/README.md)>(node: [Node](../interface.Node/README.md) | `undefined`, callback: (element: [Node](../interface.Node/README.md)) => element `is` T): T

Iterates through the parent chain of a node and performs the callback on each parent until the callback
returns a truthy value, then returns that value.
If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
At that point findAncestor returns undefined.

