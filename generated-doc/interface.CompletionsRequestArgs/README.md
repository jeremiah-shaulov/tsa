# `interface` CompletionsRequestArgs `extends` [FileLocationRequestArgs](../interface.FileLocationRequestArgs/README.md)

[Documentation Index](../README.md)

Arguments for completions messages.

## This interface has

- 3 properties:
[prefix](#-prefix-string),
[triggerCharacter](#-triggercharacter-completionstriggercharacter),
[triggerKind](#-triggerkind-completiontriggerkind)
- [2 deprecated symbols](#-deprecated-includeexternalmoduleexports-boolean)
- 2 inherited members from [FileLocationRequestArgs](../interface.FileLocationRequestArgs/README.md), 2 from [FileRequestArgs](../interface.FileRequestArgs/README.md)


#### 📄 prefix?: `string`

> Optional prefix to apply to possible completions.



#### 📄 triggerCharacter?: [CompletionsTriggerCharacter](../type.CompletionsTriggerCharacter/README.md)

> Character that was responsible for triggering completion.
> Should be `undefined` if a user manually requested completion.



#### 📄 triggerKind?: [CompletionTriggerKind](../enum.CompletionTriggerKind/README.md)



<div style="opacity:0.6">

#### 📄 `deprecated` includeExternalModuleExports?: `boolean`

> `deprecated`
> 
> Use UserPreferences.includeCompletionsForModuleExports



#### 📄 `deprecated` includeInsertTextCompletions?: `boolean`

> `deprecated`
> 
> Use UserPreferences.includeCompletionsWithInsertText



</div>

