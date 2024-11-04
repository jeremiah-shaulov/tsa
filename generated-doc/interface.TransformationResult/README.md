# `interface` TransformationResult\<T `extends` [Node](../interface.Node/README.md)>

[Documentation Index](../README.md)

## This interface has

- 2 properties:
[transformed](#-transformed-t),
[diagnostics](#-diagnostics-diagnosticwithlocation)
- 4 methods:
[substituteNode](#-substitutenodehint-emithint-node-node-node),
[emitNodeWithNotification](#-emitnodewithnotificationhint-emithint-node-node-emitcallback-hint-emithint-node-node--void-void),
[isEmitNotificationEnabled](#-isemitnotificationenablednode-node-boolean),
[dispose](#-dispose-void)


#### 📄 transformed: T\[]

> Gets the transformed source files.



#### 📄 diagnostics?: [DiagnosticWithLocation](../interface.DiagnosticWithLocation/README.md)\[]

> Gets diagnostics for the transformation.



#### ⚙ substituteNode(hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md)): [Node](../interface.Node/README.md)

> Gets a substitute for a node, if one is available; otherwise, returns the original node.



#### ⚙ emitNodeWithNotification(hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md), emitCallback: (hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md)) => `void`): `void`

> Emits a node with possible notification.



#### ⚙ isEmitNotificationEnabled?(node: [Node](../interface.Node/README.md)): `boolean`

> Indicates if a given node needs an emit notification



#### ⚙ dispose(): `void`

> Clean up EmitNode entries on any parse-tree nodes.



