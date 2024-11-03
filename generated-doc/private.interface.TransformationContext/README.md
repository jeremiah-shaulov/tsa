# `interface` TransformationContext `extends` [CoreTransformationContext](../private.interface.CoreTransformationContext/README.md)

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


#### 📄 onSubstituteNode: (hint: [EmitHint](../private.enum.EmitHint/README.md), node: [Node](../private.interface.Node/README.md)) => [Node](../private.interface.Node/README.md)



#### 📄 onEmitNode: (hint: [EmitHint](../private.enum.EmitHint/README.md), node: [Node](../private.interface.Node/README.md), emitCallback: (hint: [EmitHint](../private.enum.EmitHint/README.md), node: [Node](../private.interface.Node/README.md)) => `void`) => `void`



#### ⚙ requestEmitHelper(helper: [EmitHelper](../private.type.EmitHelper/README.md)): `void`

> Records a request for a non-scoped emit helper in the current context.



#### ⚙ readEmitHelpers(): EmitHelper\[]

> Gets and resets the requested non-scoped emit helpers.



#### ⚙ enableSubstitution(kind: [SyntaxKind](../private.enum.SyntaxKind/README.md)): `void`

> Enables expression substitutions in the pretty printer for the provided SyntaxKind.



#### ⚙ isSubstitutionEnabled(node: [Node](../private.interface.Node/README.md)): `boolean`

> Determines whether expression substitutions are enabled for the provided node.



#### ⚙ enableEmitNotification(kind: [SyntaxKind](../private.enum.SyntaxKind/README.md)): `void`

> Enables before/after emit notifications in the pretty printer for the provided
> SyntaxKind.



#### ⚙ isEmitNotificationEnabled(node: [Node](../private.interface.Node/README.md)): `boolean`

> Determines whether before/after emit notifications should be raised in the pretty
> printer when it emits a node.



