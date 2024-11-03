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



#### 📄 description: `string`



#### 📄 notApplicableReason?: `string`



#### 📄 kind?: `string`



#### 📄 isInteractive?: `boolean`



#### 📄 range?: \{start: \{line: `number`, offset: `number`}, end: \{line: `number`, offset: `number`}}



