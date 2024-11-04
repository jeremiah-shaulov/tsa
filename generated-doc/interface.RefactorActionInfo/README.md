# `interface` RefactorActionInfo

[Documentation Index](../README.md)

Represents a single refactoring action - for example, the "Extract Method..." refactor might
offer several actions, each corresponding to a surround class or closure to extract into.

## This interface has

- 6 properties:
[name](#-name-string),
[description](#-description-string),
[notApplicableReason](#-notapplicablereason-string),
[kind](#-kind-string),
[isInteractive](#-isinteractive-boolean),
[range](#-range-start-line-number-offset-number-end-line-number-offset-number)


#### 📄 name: `string`

> The programmatic name of the refactoring action



#### 📄 description: `string`

> A description of this refactoring action to show to the user.
> If the parent refactoring is inlined away, this will be the only text shown,
> so this description should make sense by itself if the parent is inlineable=true



#### 📄 notApplicableReason?: `string`

> A message to show to the user if the refactoring cannot be applied in
> the current context.



#### 📄 kind?: `string`

> The hierarchical dotted name of the refactor action.



#### 📄 isInteractive?: `boolean`

> Indicates that the action requires additional arguments to be passed
> when calling `getEditsForRefactor`.



#### 📄 range?: \{start: \{line: `number`, offset: `number`}, end: \{line: `number`, offset: `number`}}

> Range of code the refactoring will be applied to.



