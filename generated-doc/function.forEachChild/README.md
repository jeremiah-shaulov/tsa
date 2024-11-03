# `function` forEachChild

[Documentation Index](../README.md)

Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.

`function` forEachChild\<T>(node: [Node](../private.interface.Node/README.md), cbNode: (node: [Node](../private.interface.Node/README.md)) => T | `undefined`, cbNodes?: (nodes: [NodeArray](../private.interface.NodeArray/README.md)\<[Node](../private.interface.Node/README.md)>) => T | `undefined`): T