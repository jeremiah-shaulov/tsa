# `interface` GetCompletionsAtPositionOptions `extends` [UserPreferences](../interface.UserPreferences/README.md)

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[triggerCharacter](#-triggercharacter-completionstriggercharacter),
[triggerKind](#-triggerkind-completiontriggerkind),
[includeSymbol](#-includesymbol-boolean)
- [2 deprecated symbols](#-deprecated-includeexternalmoduleexports-boolean)
- 43 inherited members from [UserPreferences](../interface.UserPreferences/README.md)


#### 📄 triggerCharacter?: [CompletionsTriggerCharacter](../type.CompletionsTriggerCharacter/README.md)

> If the editor is asking for completions because a certain character was typed
> (as opposed to when the user explicitly requested them) this should be set.



#### 📄 triggerKind?: [CompletionTriggerKind](../enum.CompletionTriggerKind/README.md)



#### 📄 includeSymbol?: `boolean`

> Default value: `false`
> 
> Include a `symbol` property on each completion entry object.
> Symbols reference cyclic data structures and sometimes an entire TypeChecker instance,
> so use caution when serializing or retaining completion entries retrieved with this option.



<div style="opacity:0.6">

#### 📄 `deprecated` includeExternalModuleExports?: `boolean`

> `deprecated`
> 
> Use includeCompletionsForModuleExports



#### 📄 `deprecated` includeInsertTextCompletions?: `boolean`

> `deprecated`
> 
> Use includeCompletionsWithInsertText



</div>

