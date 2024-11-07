# `interface` CompletionEntry

[Documentation Index](../README.md)

## This interface has

- 19 properties:
[name](#-name-string),
[kind](#-kind-scriptelementkind),
[kindModifiers](#-kindmodifiers-string),
[sortText](#-sorttext-string),
[insertText](#-inserttext-string),
[filterText](#-filtertext-string),
[isSnippet](#-issnippet-true),
[replacementSpan](#-replacementspan-textspan),
[hasAction](#-hasaction-true),
[source](#-source-string),
[sourceDisplay](#-sourcedisplay-symboldisplaypart),
[labelDetails](#-labeldetails-completionentrylabeldetails),
[isRecommended](#-isrecommended-true),
[isFromUncheckedFile](#-isfromuncheckedfile-true),
[isPackageJsonImport](#-ispackagejsonimport-true),
[isImportStatementCompletion](#-isimportstatementcompletion-true),
[symbol](#-symbol-symbol),
[data](#-data-completionentrydata),
[commitCharacters](#-commitcharacters-string)


#### 📄 name: `string`



#### 📄 kind: [ScriptElementKind](../enum.ScriptElementKind/README.md)



#### 📄 kindModifiers?: `string`



#### 📄 sortText: `string`

> A string that is used for comparing completion items so that they can be ordered. This
> is often the same as the name but may be different in certain circumstances.



#### 📄 insertText?: `string`

> Text to insert instead of `name`.
> This is used to support bracketed completions; If `name` might be "a-b" but `insertText` would be `["a-b"]`,
> coupled with `replacementSpan` to replace a dotted access with a bracket access.



#### 📄 filterText?: `string`

> A string that should be used when filtering a set of
> completion items.



#### 📄 isSnippet?: `true`

> `insertText` should be interpreted as a snippet if true.



#### 📄 replacementSpan?: [TextSpan](../interface.TextSpan/README.md)

> An optional span that indicates the text to be replaced by this completion item.
> If present, this span should be used instead of the default one.
> It will be set if the required span differs from the one generated by the default replacement behavior.



#### 📄 hasAction?: `true`

> Indicates whether commiting this completion entry will require additional code actions to be
> made to avoid errors. The CompletionEntryDetails will have these actions.



#### 📄 source?: `string`

> Identifier (not necessarily human-readable) identifying where this completion came from.



#### 📄 sourceDisplay?: [SymbolDisplayPart](../interface.SymbolDisplayPart/README.md)\[]

> Human-readable description of the `source`.



#### 📄 labelDetails?: [CompletionEntryLabelDetails](../interface.CompletionEntryLabelDetails/README.md)

> Additional details for the label.



#### 📄 isRecommended?: `true`

> If true, this completion should be highlighted as recommended. There will only be one of these.
> This will be set when we know the user should write an expression with a certain type and that type is an enum or constructable class.
> Then either that enum/class or a namespace containing it will be the recommended symbol.



#### 📄 isFromUncheckedFile?: `true`

> If true, this completion was generated from traversing the name table of an unchecked JS file,
> and therefore may not be accurate.



#### 📄 isPackageJsonImport?: `true`

> If true, this completion was for an auto-import of a module not yet in the program, but listed
> in the project package.json. Used for telemetry reporting.



#### 📄 isImportStatementCompletion?: `true`

> If true, this completion was an auto-import-style completion of an import statement (i.e., the
> module specifier was inserted along with the imported identifier). Used for telemetry reporting.



#### 📄 symbol?: [Symbol](../interface.Symbol/README.md)

> For API purposes.
> Included for non-string completions only when `includeSymbol: true` option is passed to `getCompletionsAtPosition`.



#### 📄 data?: [CompletionEntryData](../type.CompletionEntryData/README.md)

> A property to be sent back to TS Server in the CompletionDetailsRequest, along with `name`,
> that allows TS Server to look up the symbol represented by the completion item, disambiguating
> items with the same name. Currently only defined for auto-import completions, but the type is
> `unknown` in the protocol, so it can be changed as needed to support other kinds of completions.
> The presence of this property should generally not be used to assume that this completion entry
> is an auto-import.



#### 📄 commitCharacters?: `string`\[]

> If this completion entry is selected, typing a commit character will cause the entry to be accepted.


