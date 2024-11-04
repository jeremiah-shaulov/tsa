# `interface` CompletionInfo

[Documentation Index](../README.md)

## This interface has

- 8 properties:
[flags](#-flags-completioninfoflags),
[isGlobalCompletion](#-isglobalcompletion-boolean),
[isMemberCompletion](#-ismembercompletion-boolean),
[optionalReplacementSpan](#-optionalreplacementspan-textspan),
[isNewIdentifierLocation](#-isnewidentifierlocation-boolean),
[isIncomplete](#-isincomplete-true),
[entries](#-entries-completionentry),
[defaultCommitCharacters](#-defaultcommitcharacters-string)


#### 📄 flags?: [CompletionInfoFlags](../enum.CompletionInfoFlags/README.md)

> For performance telemetry.



#### 📄 isGlobalCompletion: `boolean`

> Not true for all global completions. This will be true if the enclosing scope matches a few syntax kinds. See `isSnippetScope`.



#### 📄 isMemberCompletion: `boolean`



#### 📄 optionalReplacementSpan?: [TextSpan](../interface.TextSpan/README.md)

> In the absence of `CompletionEntry["replacementSpan"]`, the editor may choose whether to use
> this span or its default one. If `CompletionEntry["replacementSpan"]` is defined, that span
> must be used to commit that completion entry.



#### 📄 isNewIdentifierLocation: `boolean`

> true when the current location also allows for a new identifier



#### 📄 isIncomplete?: `true`

> Indicates to client to continue requesting completions on subsequent keystrokes.



#### 📄 entries: [CompletionEntry](../interface.CompletionEntry/README.md)\[]



#### 📄 defaultCommitCharacters?: `string`\[]

> Default commit characters for the completion entries.



