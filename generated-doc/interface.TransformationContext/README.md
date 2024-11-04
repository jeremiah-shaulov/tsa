# `interface` TransformationContext `extends` [CoreTransformationContext](../interface.CoreTransformationContext/README.md)

[Documentation Index](../README.md)

## This interface has

- 2 properties:
[onSubstituteNode](#-onsubstitutenode-hint-emithint-node-node--node),
[onEmitNode](#-onemitnode-hint-emithint-node-node-emitcallback-hint-emithint-node-node--void--void)
- 6 methods:
[requestEmitHelper](#-requestemithelperhelper-emithelper-void),
[readEmitHelpers](#-reademithelpers-emithelper),
[enableSubstitution](#-enablesubstitutionkind-syntaxkind-void),
[isSubstitutionEnabled](#-issubstitutionenablednode-node-boolean),
[enableEmitNotification](#-enableemitnotificationkind-syntaxkind-void),
[isEmitNotificationEnabled](#-isemitnotificationenablednode-node-boolean)


#### 📄 onSubstituteNode: (hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md)) => [Node](../interface.Node/README.md)

> Hook used by transformers to substitute expressions just before they
> are emitted by the pretty printer.
> 
> NOTE: Transformation hooks should only be modified during `Transformer` initialization,
> before returning the `NodeTransformer` callback.



#### 📄 onEmitNode: (hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md), emitCallback: (hint: [EmitHint](../enum.EmitHint/README.md), node: [Node](../interface.Node/README.md)) => `void`) => `void`

> Hook used to allow transformers to capture state before or after
> the printer emits a node.
> 
> NOTE: Transformation hooks should only be modified during `Transformer` initialization,
> before returning the `NodeTransformer` callback.



#### ⚙ requestEmitHelper(helper: [EmitHelper](../type.EmitHelper/README.md)): `void`

> Records a request for a non-scoped emit helper in the current context.



#### ⚙ readEmitHelpers(): EmitHelper\[]

> Gets and resets the requested non-scoped emit helpers.



#### ⚙ enableSubstitution(kind: [SyntaxKind](../enum.SyntaxKind/README.md)): `void`

> Enables expression substitutions in the pretty printer for the provided SyntaxKind.



#### ⚙ isSubstitutionEnabled(node: [Node](../interface.Node/README.md)): `boolean`

> Determines whether expression substitutions are enabled for the provided node.



#### ⚙ enableEmitNotification(kind: [SyntaxKind](../enum.SyntaxKind/README.md)): `void`

> Enables before/after emit notifications in the pretty printer for the provided
> SyntaxKind.



#### ⚙ isEmitNotificationEnabled(node: [Node](../interface.Node/README.md)): `boolean`

> Determines whether before/after emit notifications should be raised in the pretty
> printer when it emits a node.



