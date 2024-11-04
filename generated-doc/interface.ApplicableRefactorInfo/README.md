# `interface` ApplicableRefactorInfo

[Documentation Index](../README.md)

A set of one or more available refactoring actions, grouped under a parent refactoring.

## This interface has

- 4 properties:
[name](#-name-string),
[description](#-description-string),
[inlineable](#-inlineable-boolean),
[actions](#-actions-refactoractioninfo)


#### 📄 name: `string`

> The programmatic name of the refactoring



#### 📄 description: `string`

> A description of this refactoring category to show to the user.
> If the refactoring gets inlined (see below), this text will not be visible.



#### 📄 inlineable?: `boolean`

> Inlineable refactorings can have their actions hoisted out to the top level
> of a context menu. Non-inlineanable refactorings should always be shown inside
> their parent grouping.
> 
> If not specified, this value is assumed to be 'true'



#### 📄 actions: [RefactorActionInfo](../interface.RefactorActionInfo/README.md)\[]



