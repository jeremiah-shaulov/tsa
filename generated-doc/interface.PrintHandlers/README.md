# `interface` PrintHandlers

[Documentation Index](../README.md)

## This interface has

- 4 methods:
[hasGlobalName](#-hasglobalnamename-string-boolean),
[onEmitNode](#-onemitnodehint-emithint-node-node-emitcallback-hint-emithint-node-node--void-void),
[isEmitNotificationEnabled](#-isemitnotificationenablednode-node-boolean),
[substituteNode](#-substitutenodehint-emithint-node-node-node)


#### ⚙ hasGlobalName?(name: `string`): `boolean`

> A hook used by the Printer when generating unique names to avoid collisions with
> globally defined names that exist outside of the current source file.



#### ⚙ onEmitNode?(hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md), emitCallback: (hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md)) => `void`): `void`

> A hook used by the Printer to provide notifications prior to emitting a node. A
> compatible implementation **must** invoke `emitCallback` with the provided `hint` and
> `node` values.



#### ⚙ isEmitNotificationEnabled?(node: [Node](../interface.Node/README.md)): `boolean`

> A hook used to check if an emit notification is required for a node.



#### ⚙ substituteNode?(hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md)): [Node](../interface.Node/README.md)

> A hook used by the Printer to perform just-in-time substitution of a node. This is
> primarily used by node transformations that need to substitute one node for another,
> such as replacing `myExportedVar` with `exports.myExportedVar`.



