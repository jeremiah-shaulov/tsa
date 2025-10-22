# `interface` UserPreferences

[Documentation Index](../README.md)

## This interface has

- 44 properties:
[disableSuggestions](#-readonly-disablesuggestions-boolean),
[quotePreference](#-readonly-quotepreference-auto--double--single),
[includeCompletionsForModuleExports](#-readonly-includecompletionsformoduleexports-boolean),
[includeCompletionsForImportStatements](#-readonly-includecompletionsforimportstatements-boolean),
[includeCompletionsWithSnippetText](#-readonly-includecompletionswithsnippettext-boolean),
[includeAutomaticOptionalChainCompletions](#-readonly-includeautomaticoptionalchaincompletions-boolean),
[includeCompletionsWithInsertText](#-readonly-includecompletionswithinserttext-boolean),
[includeCompletionsWithClassMemberSnippets](#-readonly-includecompletionswithclassmembersnippets-boolean),
[includeCompletionsWithObjectLiteralMethodSnippets](#-readonly-includecompletionswithobjectliteralmethodsnippets-boolean),
[useLabelDetailsInCompletionEntries](#-readonly-uselabeldetailsincompletionentries-boolean),
[allowIncompleteCompletions](#-readonly-allowincompletecompletions-boolean),
[importModuleSpecifierPreference](#-readonly-importmodulespecifierpreference-shortest--projectrelative--relative--nonrelative),
[importModuleSpecifierEnding](#-readonly-importmodulespecifierending-auto--minimal--index--js),
[allowTextChangesInNewFiles](#-readonly-allowtextchangesinnewfiles-boolean),
[providePrefixAndSuffixTextForRename](#-readonly-provideprefixandsuffixtextforrename-boolean),
[includePackageJsonAutoImports](#-readonly-includepackagejsonautoimports-auto--on--off),
[provideRefactorNotApplicableReason](#-readonly-providerefactornotapplicablereason-boolean),
[jsxAttributeCompletionStyle](#-readonly-jsxattributecompletionstyle-auto--braces--none),
[includeInlayParameterNameHints](#-readonly-includeinlayparameternamehints-none--literals--all),
[includeInlayParameterNameHintsWhenArgumentMatchesName](#-readonly-includeinlayparameternamehintswhenargumentmatchesname-boolean),
[includeInlayFunctionParameterTypeHints](#-readonly-includeinlayfunctionparametertypehints-boolean),
[includeInlayVariableTypeHints](#-readonly-includeinlayvariabletypehints-boolean),
[includeInlayVariableTypeHintsWhenTypeMatchesName](#-readonly-includeinlayvariabletypehintswhentypematchesname-boolean),
[includeInlayPropertyDeclarationTypeHints](#-readonly-includeinlaypropertydeclarationtypehints-boolean),
[includeInlayFunctionLikeReturnTypeHints](#-readonly-includeinlayfunctionlikereturntypehints-boolean),
[includeInlayEnumMemberValueHints](#-readonly-includeinlayenummembervaluehints-boolean),
[interactiveInlayHints](#-readonly-interactiveinlayhints-boolean),
[allowRenameOfImportPath](#-readonly-allowrenameofimportpath-boolean),
[autoImportFileExcludePatterns](#-readonly-autoimportfileexcludepatterns-string),
[autoImportSpecifierExcludeRegexes](#-readonly-autoimportspecifierexcluderegexes-string),
[preferTypeOnlyAutoImports](#-readonly-prefertypeonlyautoimports-boolean),
[organizeImportsIgnoreCase](#-readonly-organizeimportsignorecase-auto--boolean),
[organizeImportsCollation](#-readonly-organizeimportscollation-ordinal--unicode),
[organizeImportsLocale](#-readonly-organizeimportslocale-string),
[organizeImportsNumericCollation](#-readonly-organizeimportsnumericcollation-boolean),
[organizeImportsAccentCollation](#-readonly-organizeimportsaccentcollation-boolean),
[organizeImportsCaseFirst](#-readonly-organizeimportscasefirst-upper--lower--false),
[organizeImportsTypeOrder](#-readonly-organizeimportstypeorder-organizeimportstypeorder),
[excludeLibrarySymbolsInNavTo](#-readonly-excludelibrarysymbolsinnavto-boolean),
[lazyConfiguredProjectsFromExternalProject](#-readonly-lazyconfiguredprojectsfromexternalproject-boolean),
[displayPartsForJSDoc](#-readonly-displaypartsforjsdoc-boolean),
[generateReturnInDocTemplate](#-readonly-generatereturnindoctemplate-boolean),
[disableLineTextInReferences](#-readonly-disablelinetextinreferences-boolean),
[maximumHoverLength](#-readonly-maximumhoverlength-number)


#### 📄 `readonly` disableSuggestions?: `boolean`



#### 📄 `readonly` quotePreference?: <mark>"auto"</mark> | <mark>"double"</mark> | <mark>"single"</mark>



#### 📄 `readonly` includeCompletionsForModuleExports?: `boolean`

> If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
> This affects lone identifier completions but not completions on the right hand side of `obj.`.



#### 📄 `readonly` includeCompletionsForImportStatements?: `boolean`

> Enables auto-import-style completions on partially-typed import statements. E.g., allows
> `import write|` to be completed to `import { writeFile } from "fs"`.



#### 📄 `readonly` includeCompletionsWithSnippetText?: `boolean`

> Allows completions to be formatted with snippet text, indicated by `CompletionItem["isSnippet"]`.



#### 📄 `readonly` includeAutomaticOptionalChainCompletions?: `boolean`

> Unless this option is `false`, or `includeCompletionsWithInsertText` is not enabled,
> member completion lists triggered with `.` will include entries on potentially-null and potentially-undefined
> values, with insertion text to replace preceding `.` tokens with `?.`.



#### 📄 `readonly` includeCompletionsWithInsertText?: `boolean`

> If enabled, the completion list will include completions with invalid identifier names.
> For those entries, The `insertText` and `replacementSpan` properties will be set to change from `.x` property access to `["x"]`.



#### 📄 `readonly` includeCompletionsWithClassMemberSnippets?: `boolean`

> If enabled, completions for class members (e.g. methods and properties) will include
> a whole declaration for the member.
> E.g., `class A { f| }` could be completed to `class A { foo(): number {} }`, instead of
> `class A { foo }`.



#### 📄 `readonly` includeCompletionsWithObjectLiteralMethodSnippets?: `boolean`

> If enabled, object literal methods will have a method declaration completion entry in addition
> to the regular completion entry containing just the method name.
> E.g., `const objectLiteral: T = { f| }` could be completed to `const objectLiteral: T = { foo(): void {} }`,
> in addition to `const objectLiteral: T = { foo }`.



#### 📄 `readonly` useLabelDetailsInCompletionEntries?: `boolean`

> Indicates whether `CompletionEntry.labelDetailscompletion entry label details` are supported.
> If not, contents of `labelDetails` may be included in the [CompletionEntry.name](../interface.CompletionEntry/README.md#-name-string) property.



#### 📄 `readonly` allowIncompleteCompletions?: `boolean`



#### 📄 `readonly` importModuleSpecifierPreference?: <mark>"shortest"</mark> | <mark>"project-relative"</mark> | <mark>"relative"</mark> | <mark>"non-relative"</mark>



#### 📄 `readonly` importModuleSpecifierEnding?: <mark>"auto"</mark> | <mark>"minimal"</mark> | <mark>"index"</mark> | <mark>"js"</mark>

> Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js"



#### 📄 `readonly` allowTextChangesInNewFiles?: `boolean`



#### 📄 `readonly` providePrefixAndSuffixTextForRename?: `boolean`



#### 📄 `readonly` includePackageJsonAutoImports?: <mark>"auto"</mark> | <mark>"on"</mark> | <mark>"off"</mark>



#### 📄 `readonly` provideRefactorNotApplicableReason?: `boolean`



#### 📄 `readonly` jsxAttributeCompletionStyle?: <mark>"auto"</mark> | <mark>"braces"</mark> | <mark>"none"</mark>



#### 📄 `readonly` includeInlayParameterNameHints?: <mark>"none"</mark> | <mark>"literals"</mark> | <mark>"all"</mark>



#### 📄 `readonly` includeInlayParameterNameHintsWhenArgumentMatchesName?: `boolean`



#### 📄 `readonly` includeInlayFunctionParameterTypeHints?: `boolean`



#### 📄 `readonly` includeInlayVariableTypeHints?: `boolean`



#### 📄 `readonly` includeInlayVariableTypeHintsWhenTypeMatchesName?: `boolean`



#### 📄 `readonly` includeInlayPropertyDeclarationTypeHints?: `boolean`



#### 📄 `readonly` includeInlayFunctionLikeReturnTypeHints?: `boolean`



#### 📄 `readonly` includeInlayEnumMemberValueHints?: `boolean`



#### 📄 `readonly` interactiveInlayHints?: `boolean`



#### 📄 `readonly` allowRenameOfImportPath?: `boolean`



#### 📄 `readonly` autoImportFileExcludePatterns?: `string`\[]



#### 📄 `readonly` autoImportSpecifierExcludeRegexes?: `string`\[]



#### 📄 `readonly` preferTypeOnlyAutoImports?: `boolean`



#### 📄 `readonly` organizeImportsIgnoreCase?: <mark>"auto"</mark> | `boolean`

> Indicates whether imports should be organized in a case-insensitive manner.



#### 📄 `readonly` organizeImportsCollation?: <mark>"ordinal"</mark> | <mark>"unicode"</mark>

> Indicates whether imports should be organized via an "ordinal" (binary) comparison using the numeric value
> of their code points, or via "unicode" collation (via the
> [Unicode Collation Algorithm](https://unicode.org/reports/tr10/#Scope)) using rules associated with the locale
> specified in `organizeImportsCollationLocale`.
> 
> Default: `"ordinal"`.



#### 📄 `readonly` organizeImportsLocale?: `string`

> Indicates the locale to use for "unicode" collation. If not specified, the locale `"en"` is used as an invariant
> for the sake of consistent sorting. Use `"auto"` to use the detected UI locale.
> 
> This preference is ignored if [organizeImportsCollation](../interface.UserPreferences/README.md#-readonly-organizeimportscollation-ordinal--unicode) is not `"unicode"`.
> 
> Default: `"en"`



#### 📄 `readonly` organizeImportsNumericCollation?: `boolean`

> Indicates whether numeric collation should be used for digit sequences in strings. When `true`, will collate
> strings such that `a1z < a2z < a100z`. When `false`, will collate strings such that `a1z < a100z < a2z`.
> 
> This preference is ignored if [organizeImportsCollation](../interface.UserPreferences/README.md#-readonly-organizeimportscollation-ordinal--unicode) is not `"unicode"`.
> 
> Default: `false`



#### 📄 `readonly` organizeImportsAccentCollation?: `boolean`

> Indicates whether accents and other diacritic marks are considered unequal for the purpose of collation. When
> `true`, characters with accents and other diacritics will be collated in the order defined by the locale specified
> in `organizeImportsCollationLocale`.
> 
> This preference is ignored if [organizeImportsCollation](../interface.UserPreferences/README.md#-readonly-organizeimportscollation-ordinal--unicode) is not `"unicode"`.
> 
> Default: `true`



#### 📄 `readonly` organizeImportsCaseFirst?: <mark>"upper"</mark> | <mark>"lower"</mark> | `false`

> Indicates whether upper case or lower case should sort first. When `false`, the default order for the locale
> specified in `organizeImportsCollationLocale` is used.
> 
> This preference is ignored if [organizeImportsCollation](../interface.UserPreferences/README.md#-readonly-organizeimportscollation-ordinal--unicode) is not `"unicode"`. This preference is also
> ignored if we are using case-insensitive sorting, which occurs when [organizeImportsIgnoreCase](../interface.UserPreferences/README.md#-readonly-organizeimportsignorecase-auto--boolean) is `true`,
> or if [organizeImportsIgnoreCase](../interface.UserPreferences/README.md#-readonly-organizeimportsignorecase-auto--boolean) is `"auto"` and the auto-detected case sensitivity is determined to be
> case-insensitive.
> 
> Default: `false`



#### 📄 `readonly` organizeImportsTypeOrder?: [OrganizeImportsTypeOrder](../type.OrganizeImportsTypeOrder/README.md)

> Indicates where named type-only imports should sort. "inline" sorts named imports without regard to if the import is
> type-only.
> 
> Default: `last`



#### 📄 `readonly` excludeLibrarySymbolsInNavTo?: `boolean`

> Indicates whether to exclude standard library and node_modules file symbols from navTo results.



#### 📄 `readonly` lazyConfiguredProjectsFromExternalProject?: `boolean`



#### 📄 `readonly` displayPartsForJSDoc?: `boolean`



#### 📄 `readonly` generateReturnInDocTemplate?: `boolean`



#### 📄 `readonly` disableLineTextInReferences?: `boolean`



#### 📄 `readonly` maximumHoverLength?: `number`

> A positive integer indicating the maximum length of a hover text before it is truncated.
> 
> Default: `500`



