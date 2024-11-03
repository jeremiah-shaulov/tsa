# `interface` LanguageService

[Documentation Index](../README.md)

## This interface has

- 66 methods:
[cleanupSemanticCache](#-cleanupsemanticcache-void),
[getSyntacticDiagnostics](#-getsyntacticdiagnosticsfilename-string-diagnosticwithlocation),
[getSemanticDiagnostics](#-getsemanticdiagnosticsfilename-string-diagnostic),
[getSuggestionDiagnostics](#-getsuggestiondiagnosticsfilename-string-diagnosticwithlocation),
[getCompilerOptionsDiagnostics](#-getcompileroptionsdiagnostics-diagnostic),
[getSyntacticClassifications](#-getsyntacticclassificationsfilename-string-span-textspan-format-semanticclassificationformat-classifiedspan--classifiedspan2020),
[getSemanticClassifications](#-getsemanticclassificationsfilename-string-span-textspan-format-semanticclassificationformat-classifiedspan--classifiedspan2020),
[getEncodedSyntacticClassifications](#-getencodedsyntacticclassificationsfilename-string-span-textspan-classifications),
[getEncodedSemanticClassifications](#-getencodedsemanticclassificationsfilename-string-span-textspan-format-semanticclassificationformat-classifications),
[getCompletionsAtPosition](#-getcompletionsatpositionfilename-string-position-number-options-getcompletionsatpositionoptions--undefined-formattingsettings-formatcodesettings-withmetadatacompletioninfo),
[getCompletionEntryDetails](#-getcompletionentrydetailsfilename-string-position-number-entryname-string-formatoptions-formatcodeoptions--formatcodesettings--undefined-source-string--undefined-preferences-userpreferences--undefined-data-completionentrydata--undefined-completionentrydetails),
[getCompletionEntrySymbol](#-getcompletionentrysymbolfilename-string-position-number-name-string-source-string--undefined-symbol),
[getQuickInfoAtPosition](#-getquickinfoatpositionfilename-string-position-number-quickinfo),
[getNameOrDottedNameSpan](#-getnameordottednamespanfilename-string-startpos-number-endpos-number-textspan),
[getBreakpointStatementAtPosition](#-getbreakpointstatementatpositionfilename-string-position-number-textspan),
[getSignatureHelpItems](#-getsignaturehelpitemsfilename-string-position-number-options-signaturehelpitemsoptions--undefined-signaturehelpitems),
[getRenameInfo](#-getrenameinfofilename-string-position-number-preferences-userpreferences-renameinfo),
[findRenameLocations](#-findrenamelocationsfilename-string-position-number-findinstrings-boolean-findincomments-boolean-preferences-userpreferences-readonly-renamelocation),
[getSmartSelectionRange](#-getsmartselectionrangefilename-string-position-number-selectionrange),
[getDefinitionAtPosition](#-getdefinitionatpositionfilename-string-position-number-readonly-definitioninfo),
[getDefinitionAndBoundSpan](#-getdefinitionandboundspanfilename-string-position-number-definitioninfoandboundspan),
[getTypeDefinitionAtPosition](#-gettypedefinitionatpositionfilename-string-position-number-readonly-definitioninfo),
[getImplementationAtPosition](#-getimplementationatpositionfilename-string-position-number-readonly-implementationlocation),
[getReferencesAtPosition](#-getreferencesatpositionfilename-string-position-number-referenceentry),
[findReferences](#-findreferencesfilename-string-position-number-referencedsymbol),
[getDocumentHighlights](#-getdocumenthighlightsfilename-string-position-number-filestosearch-string-documenthighlights),
[getFileReferences](#-getfilereferencesfilename-string-referenceentry),
[getNavigateToItems](#-getnavigatetoitemssearchvalue-string-maxresultcount-number-filename-string-excludedtsfiles-boolean-excludelibfiles-boolean-navigatetoitem),
[getNavigationBarItems](#-getnavigationbaritemsfilename-string-navigationbaritem),
[getNavigationTree](#-getnavigationtreefilename-string-navigationtree),
[prepareCallHierarchy](#-preparecallhierarchyfilename-string-position-number-callhierarchyitem--callhierarchyitem),
[provideCallHierarchyIncomingCalls](#-providecallhierarchyincomingcallsfilename-string-position-number-callhierarchyincomingcall),
[provideCallHierarchyOutgoingCalls](#-providecallhierarchyoutgoingcallsfilename-string-position-number-callhierarchyoutgoingcall),
[provideInlayHints](#-provideinlayhintsfilename-string-span-textspan-preferences-userpreferences--undefined-inlayhint),
[getOutliningSpans](#-getoutliningspansfilename-string-outliningspan),
[getTodoComments](#-gettodocommentsfilename-string-descriptors-todocommentdescriptor-todocomment),
[getBraceMatchingAtPosition](#-getbracematchingatpositionfilename-string-position-number-textspan),
[getIndentationAtPosition](#-getindentationatpositionfilename-string-position-number-options-editoroptions--editorsettings-number),
[getFormattingEditsForRange](#-getformattingeditsforrangefilename-string-start-number-end-number-options-formatcodeoptions--formatcodesettings-textchange),
[getFormattingEditsForDocument](#-getformattingeditsfordocumentfilename-string-options-formatcodeoptions--formatcodesettings-textchange),
[getFormattingEditsAfterKeystroke](#-getformattingeditsafterkeystrokefilename-string-position-number-key-string-options-formatcodeoptions--formatcodesettings-textchange),
[getDocCommentTemplateAtPosition](#-getdoccommenttemplateatpositionfilename-string-position-number-options-doccommenttemplateoptions-formatoptions-formatcodesettings-textinsertion),
[isValidBraceCompletionAtPosition](#-isvalidbracecompletionatpositionfilename-string-position-number-openingbrace-number-boolean),
[getJsxClosingTagAtPosition](#-getjsxclosingtagatpositionfilename-string-position-number-jsxclosingtaginfo),
[getLinkedEditingRangeAtPosition](#-getlinkededitingrangeatpositionfilename-string-position-number-linkededitinginfo),
[getSpanOfEnclosingComment](#-getspanofenclosingcommentfilename-string-position-number-onlymultiline-boolean-textspan),
[toLineColumnOffset](#-tolinecolumnoffsetfilename-string-position-number-lineandcharacter),
[getCodeFixesAtPosition](#-getcodefixesatpositionfilename-string-start-number-end-number-errorcodes-readonly-number-formatoptions-formatcodesettings-preferences-userpreferences-readonly-codefixaction),
[getCombinedCodeFix](#-getcombinedcodefixscope-combinedcodefixscope-fixid--formatoptions-formatcodesettings-preferences-userpreferences-combinedcodeactions),
[applyCodeActionCommand](#-applycodeactioncommandaction-codeactioncommand-formatsettings-formatcodesettings-promiseapplycodeactioncommandresult),
[applyCodeActionCommand](#-applycodeactioncommandaction-codeactioncommand-formatsettings-formatcodesettings-promiseapplycodeactioncommandresult),
[applyCodeActionCommand](#-applycodeactioncommandaction-codeactioncommand--codeactioncommand-formatsettings-formatcodesettings-promiseapplycodeactioncommandresult--applycodeactioncommandresult),
[getApplicableRefactors](#-getapplicablerefactorsfilename-string-positionorrange-number--textrange-preferences-userpreferences--undefined-triggerreason-refactortriggerreason-kind-string-includeinteractiveactions-boolean-applicablerefactorinfo),
[getEditsForRefactor](#-geteditsforrefactorfilename-string-formatoptions-formatcodesettings-positionorrange-number--textrange-refactorname-string-actionname-string-preferences-userpreferences--undefined-interactiverefactorarguments-interactiverefactorarguments-refactoreditinfo),
[getMoveToRefactoringFileSuggestions](#-getmovetorefactoringfilesuggestionsfilename-string-positionorrange-number--textrange-preferences-userpreferences--undefined-triggerreason-refactortriggerreason-kind-string-newfilename-string-files-string),
[organizeImports](#-organizeimportsargs-organizeimportsargs-formatoptions-formatcodesettings-preferences-userpreferences--undefined-readonly-filetextchanges),
[getEditsForFileRename](#-geteditsforfilerenameoldfilepath-string-newfilepath-string-formatoptions-formatcodesettings-preferences-userpreferences--undefined-readonly-filetextchanges),
[getEmitOutput](#-getemitoutputfilename-string-emitonlydtsfiles-boolean-forcedtsemit-boolean-emitoutput),
[getProgram](#-getprogram-program),
[toggleLineComment](#-togglelinecommentfilename-string-textrange-textrange-textchange),
[toggleMultilineComment](#-togglemultilinecommentfilename-string-textrange-textrange-textchange),
[commentSelection](#-commentselectionfilename-string-textrange-textrange-textchange),
[uncommentSelection](#-uncommentselectionfilename-string-textrange-textrange-textchange),
[getSupportedCodeFixes](#-getsupportedcodefixesfilename-string-readonly-string),
[dispose](#-dispose-void),
[getPasteEdits](#-getpasteeditsargs-pasteeditsargs-formatoptions-formatcodesettings-pasteedits)
- [7 deprecated symbols](#-deprecated-getsyntacticclassificationsfilename-string-span-textspan-classifiedspan)


#### ⚙ cleanupSemanticCache(): `void`

> This is used as a part of restarting the language service.



#### ⚙ getSyntacticDiagnostics(fileName: `string`): DiagnosticWithLocation\[]

> Gets errors indicating invalid syntax in a file.
> 
> In English, "this cdeo have, erorrs" is syntactically invalid because it has typos,
> grammatical errors, and misplaced punctuation. Likewise, examples of syntax
> errors in TypeScript are missing parentheses in an `if` statement, mismatched
> curly braces, and using a reserved keyword as a variable name.
> 
> These diagnostics are inexpensive to compute and don't require knowledge of
> other files. Note that a non-empty result increases the likelihood of false positives
> from `getSemanticDiagnostics`.
> 
> While these represent the majority of syntax-related diagnostics, there are some
> that require the type system, which will be present in `getSemanticDiagnostics`.



#### ⚙ getSemanticDiagnostics(fileName: `string`): Diagnostic\[]

> Gets warnings or errors indicating type system issues in a given file.
> Requesting semantic diagnostics may start up the type system and
> run deferred work, so the first call may take longer than subsequent calls.
> 
> Unlike the other get*Diagnostics functions, these diagnostics can potentially not
> include a reference to a source file. Specifically, the first time this is called,
> it will return global diagnostics with no associated location.
> 
> To contrast the differences between semantic and syntactic diagnostics, consider the
> sentence: "The sun is green." is syntactically correct; those are real English words with
> correct sentence structure. However, it is semantically invalid, because it is not true.



#### ⚙ getSuggestionDiagnostics(fileName: `string`): DiagnosticWithLocation\[]

> Gets suggestion diagnostics for a specific file. These diagnostics tend to
> proactively suggest refactors, as opposed to diagnostics that indicate
> potentially incorrect runtime behavior.



#### ⚙ getCompilerOptionsDiagnostics(): Diagnostic\[]

> Gets global diagnostics related to the program configuration and compiler options.



#### ⚙ getSyntacticClassifications(fileName: `string`, span: [TextSpan](../private.interface.TextSpan/README.md), format: [SemanticClassificationFormat](../private.enum.SemanticClassificationFormat/README.md)): ClassifiedSpan\[] | ClassifiedSpan2020\[]



#### ⚙ getSemanticClassifications(fileName: `string`, span: [TextSpan](../private.interface.TextSpan/README.md), format: [SemanticClassificationFormat](../private.enum.SemanticClassificationFormat/README.md)): ClassifiedSpan\[] | ClassifiedSpan2020\[]



#### ⚙ getEncodedSyntacticClassifications(fileName: `string`, span: [TextSpan](../private.interface.TextSpan/README.md)): [Classifications](../private.interface.Classifications/README.md)

> Encoded as triples of [start, length, ClassificationType].



#### ⚙ getEncodedSemanticClassifications(fileName: `string`, span: [TextSpan](../private.interface.TextSpan/README.md), format?: [SemanticClassificationFormat](../private.enum.SemanticClassificationFormat/README.md)): [Classifications](../private.interface.Classifications/README.md)

> Gets semantic highlights information for a particular file. Has two formats, an older
> version used by VS and a format used by VS Code.



#### ⚙ getCompletionsAtPosition(fileName: `string`, position: `number`, options: [GetCompletionsAtPositionOptions](../private.interface.GetCompletionsAtPositionOptions/README.md) | `undefined`, formattingSettings?: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): WithMetadata\<CompletionInfo>

> Gets completion entries at a particular position in a file.



#### ⚙ getCompletionEntryDetails(fileName: `string`, position: `number`, entryName: `string`, formatOptions: [FormatCodeOptions](../private.interface.FormatCodeOptions/README.md) | [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md) | `undefined`, source: `string` | `undefined`, preferences: [UserPreferences](../private.interface.UserPreferences/README.md) | `undefined`, data: [CompletionEntryData](../private.type.CompletionEntryData/README.md) | `undefined`): [CompletionEntryDetails](../private.interface.CompletionEntryDetails/README.md)

> Gets the extended details for a completion entry retrieved from `getCompletionsAtPosition`.



#### ⚙ getCompletionEntrySymbol(fileName: `string`, position: `number`, name: `string`, source: `string` | `undefined`): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getQuickInfoAtPosition(fileName: `string`, position: `number`): [QuickInfo](../private.interface.QuickInfo/README.md)

> Gets semantic information about the identifier at a particular position in a
> file. Quick info is what you typically see when you hover in an editor.



#### ⚙ getNameOrDottedNameSpan(fileName: `string`, startPos: `number`, endPos: `number`): [TextSpan](../private.interface.TextSpan/README.md)



#### ⚙ getBreakpointStatementAtPosition(fileName: `string`, position: `number`): [TextSpan](../private.interface.TextSpan/README.md)



#### ⚙ getSignatureHelpItems(fileName: `string`, position: `number`, options: [SignatureHelpItemsOptions](../private.interface.SignatureHelpItemsOptions/README.md) | `undefined`): [SignatureHelpItems](../private.interface.SignatureHelpItems/README.md)



#### ⚙ getRenameInfo(fileName: `string`, position: `number`, preferences: [UserPreferences](../private.interface.UserPreferences/README.md)): RenameInfo



#### ⚙ findRenameLocations(fileName: `string`, position: `number`, findInStrings: `boolean`, findInComments: `boolean`, preferences: [UserPreferences](../private.interface.UserPreferences/README.md)): readonly RenameLocation\[]



#### ⚙ getSmartSelectionRange(fileName: `string`, position: `number`): [SelectionRange](../private.interface.SelectionRange/README.md)



#### ⚙ getDefinitionAtPosition(fileName: `string`, position: `number`): readonly DefinitionInfo\[]



#### ⚙ getDefinitionAndBoundSpan(fileName: `string`, position: `number`): [DefinitionInfoAndBoundSpan](../private.interface.DefinitionInfoAndBoundSpan/README.md)



#### ⚙ getTypeDefinitionAtPosition(fileName: `string`, position: `number`): readonly DefinitionInfo\[]



#### ⚙ getImplementationAtPosition(fileName: `string`, position: `number`): readonly ImplementationLocation\[]



#### ⚙ getReferencesAtPosition(fileName: `string`, position: `number`): ReferenceEntry\[]



#### ⚙ findReferences(fileName: `string`, position: `number`): ReferencedSymbol\[]



#### ⚙ getDocumentHighlights(fileName: `string`, position: `number`, filesToSearch: `string`\[]): DocumentHighlights\[]



#### ⚙ getFileReferences(fileName: `string`): ReferenceEntry\[]



#### ⚙ getNavigateToItems(searchValue: `string`, maxResultCount?: `number`, fileName?: `string`, excludeDtsFiles?: `boolean`, excludeLibFiles?: `boolean`): NavigateToItem\[]



#### ⚙ getNavigationBarItems(fileName: `string`): NavigationBarItem\[]



#### ⚙ getNavigationTree(fileName: `string`): [NavigationTree](../private.interface.NavigationTree/README.md)



#### ⚙ prepareCallHierarchy(fileName: `string`, position: `number`): CallHierarchyItem | CallHierarchyItem\[]



#### ⚙ provideCallHierarchyIncomingCalls(fileName: `string`, position: `number`): CallHierarchyIncomingCall\[]



#### ⚙ provideCallHierarchyOutgoingCalls(fileName: `string`, position: `number`): CallHierarchyOutgoingCall\[]



#### ⚙ provideInlayHints(fileName: `string`, span: [TextSpan](../private.interface.TextSpan/README.md), preferences: [UserPreferences](../private.interface.UserPreferences/README.md) | `undefined`): InlayHint\[]



#### ⚙ getOutliningSpans(fileName: `string`): OutliningSpan\[]



#### ⚙ getTodoComments(fileName: `string`, descriptors: [TodoCommentDescriptor](../private.interface.TodoCommentDescriptor/README.md)\[]): TodoComment\[]



#### ⚙ getBraceMatchingAtPosition(fileName: `string`, position: `number`): TextSpan\[]



#### ⚙ getIndentationAtPosition(fileName: `string`, position: `number`, options: [EditorOptions](../private.interface.EditorOptions/README.md) | [EditorSettings](../private.interface.EditorSettings/README.md)): `number`



#### ⚙ getFormattingEditsForRange(fileName: `string`, start: `number`, end: `number`, options: [FormatCodeOptions](../private.interface.FormatCodeOptions/README.md) | [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): TextChange\[]



#### ⚙ getFormattingEditsForDocument(fileName: `string`, options: [FormatCodeOptions](../private.interface.FormatCodeOptions/README.md) | [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): TextChange\[]



#### ⚙ getFormattingEditsAfterKeystroke(fileName: `string`, position: `number`, key: `string`, options: [FormatCodeOptions](../private.interface.FormatCodeOptions/README.md) | [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): TextChange\[]



#### ⚙ getDocCommentTemplateAtPosition(fileName: `string`, position: `number`, options?: [DocCommentTemplateOptions](../private.interface.DocCommentTemplateOptions/README.md), formatOptions?: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): [TextInsertion](../private.interface.TextInsertion/README.md)



#### ⚙ isValidBraceCompletionAtPosition(fileName: `string`, position: `number`, openingBrace: `number`): `boolean`



#### ⚙ getJsxClosingTagAtPosition(fileName: `string`, position: `number`): [JsxClosingTagInfo](../private.interface.JsxClosingTagInfo/README.md)

> This will return a defined result if the position is after the `>` of the opening tag, or somewhere in the text, of a JSXElement with no closing tag.
> Editors should call this after `>` is typed.



#### ⚙ getLinkedEditingRangeAtPosition(fileName: `string`, position: `number`): [LinkedEditingInfo](../private.interface.LinkedEditingInfo/README.md)



#### ⚙ getSpanOfEnclosingComment(fileName: `string`, position: `number`, onlyMultiLine: `boolean`): [TextSpan](../private.interface.TextSpan/README.md)



#### ⚙ toLineColumnOffset?(fileName: `string`, position: `number`): [LineAndCharacter](../private.interface.LineAndCharacter/README.md)



#### ⚙ getCodeFixesAtPosition(fileName: `string`, start: `number`, end: `number`, errorCodes: readonly `number`\[], formatOptions: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md), preferences: [UserPreferences](../private.interface.UserPreferences/README.md)): readonly CodeFixAction\[]



#### ⚙ getCombinedCodeFix(scope: [CombinedCodeFixScope](../private.interface.CombinedCodeFixScope/README.md), fixId: \{}, formatOptions: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md), preferences: [UserPreferences](../private.interface.UserPreferences/README.md)): [CombinedCodeActions](../private.interface.CombinedCodeActions/README.md)



#### ⚙ applyCodeActionCommand(action: [CodeActionCommand](../private.type.CodeActionCommand/README.md), formatSettings?: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): Promise\<ApplyCodeActionCommandResult>



#### ⚙ applyCodeActionCommand(action: [CodeActionCommand](../private.type.CodeActionCommand/README.md)\[], formatSettings?: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): Promise\<ApplyCodeActionCommandResult\[]>



#### ⚙ applyCodeActionCommand(action: [CodeActionCommand](../private.type.CodeActionCommand/README.md) | [CodeActionCommand](../private.type.CodeActionCommand/README.md)\[], formatSettings?: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): Promise\<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult\[]>



#### ⚙ getApplicableRefactors(fileName: `string`, positionOrRange: `number` | [TextRange](../private.interface.TextRange/README.md), preferences: [UserPreferences](../private.interface.UserPreferences/README.md) | `undefined`, triggerReason?: [RefactorTriggerReason](../private.type.RefactorTriggerReason/README.md), kind?: `string`, includeInteractiveActions?: `boolean`): ApplicableRefactorInfo\[]



#### ⚙ getEditsForRefactor(fileName: `string`, formatOptions: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md), positionOrRange: `number` | [TextRange](../private.interface.TextRange/README.md), refactorName: `string`, actionName: `string`, preferences: [UserPreferences](../private.interface.UserPreferences/README.md) | `undefined`, interactiveRefactorArguments?: [InteractiveRefactorArguments](../private.interface.InteractiveRefactorArguments/README.md)): [RefactorEditInfo](../private.interface.RefactorEditInfo/README.md)



#### ⚙ getMoveToRefactoringFileSuggestions(fileName: `string`, positionOrRange: `number` | [TextRange](../private.interface.TextRange/README.md), preferences: [UserPreferences](../private.interface.UserPreferences/README.md) | `undefined`, triggerReason?: [RefactorTriggerReason](../private.type.RefactorTriggerReason/README.md), kind?: `string`): \{newFileName: `string`, files: `string`\[]}



#### ⚙ organizeImports(args: [OrganizeImportsArgs](../private.interface.OrganizeImportsArgs/README.md), formatOptions: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md), preferences: [UserPreferences](../private.interface.UserPreferences/README.md) | `undefined`): readonly FileTextChanges\[]



#### ⚙ getEditsForFileRename(oldFilePath: `string`, newFilePath: `string`, formatOptions: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md), preferences: [UserPreferences](../private.interface.UserPreferences/README.md) | `undefined`): readonly FileTextChanges\[]



#### ⚙ getEmitOutput(fileName: `string`, emitOnlyDtsFiles?: `boolean`, forceDtsEmit?: `boolean`): [EmitOutput](../private.interface.EmitOutput/README.md)



#### ⚙ getProgram(): [Program](../private.interface.Program/README.md)



#### ⚙ toggleLineComment(fileName: `string`, textRange: [TextRange](../private.interface.TextRange/README.md)): TextChange\[]



#### ⚙ toggleMultilineComment(fileName: `string`, textRange: [TextRange](../private.interface.TextRange/README.md)): TextChange\[]



#### ⚙ commentSelection(fileName: `string`, textRange: [TextRange](../private.interface.TextRange/README.md)): TextChange\[]



#### ⚙ uncommentSelection(fileName: `string`, textRange: [TextRange](../private.interface.TextRange/README.md)): TextChange\[]



#### ⚙ getSupportedCodeFixes(fileName?: `string`): readonly `string`\[]



#### ⚙ dispose(): `void`



#### ⚙ getPasteEdits(args: [PasteEditsArgs](../private.interface.PasteEditsArgs/README.md), formatOptions: [FormatCodeSettings](../private.interface.FormatCodeSettings/README.md)): [PasteEdits](../private.interface.PasteEdits/README.md)



<div style="opacity:0.6">

#### ⚙ `deprecated` getSyntacticClassifications(fileName: `string`, span: [TextSpan](../private.interface.TextSpan/README.md)): ClassifiedSpan\[]

> `deprecated`
> 
> Use getEncodedSyntacticClassifications instead.



#### ⚙ `deprecated` getSemanticClassifications(fileName: `string`, span: [TextSpan](../private.interface.TextSpan/README.md)): ClassifiedSpan\[]

> `deprecated`
> 
> Use getEncodedSemanticClassifications instead.



#### ⚙ `deprecated` getRenameInfo(fileName: `string`, position: `number`, options?: [RenameInfoOptions](../private.interface.RenameInfoOptions/README.md)): RenameInfo

> `deprecated`
> 
> Use the signature with `UserPreferences` instead.



#### ⚙ `deprecated` findRenameLocations(fileName: `string`, position: `number`, findInStrings: `boolean`, findInComments: `boolean`, providePrefixAndSuffixTextForRename?: `boolean`): readonly RenameLocation\[]

> `deprecated`
> 
> Pass `providePrefixAndSuffixTextForRename` as part of a `UserPreferences` parameter.



#### ⚙ `deprecated` applyCodeActionCommand(fileName: `string`, action: [CodeActionCommand](../private.type.CodeActionCommand/README.md)): Promise\<ApplyCodeActionCommandResult>

> `deprecated`
> 
> `fileName` will be ignored



#### ⚙ `deprecated` applyCodeActionCommand(fileName: `string`, action: [CodeActionCommand](../private.type.CodeActionCommand/README.md)\[]): Promise\<ApplyCodeActionCommandResult\[]>

> `deprecated`
> 
> `fileName` will be ignored



#### ⚙ `deprecated` applyCodeActionCommand(fileName: `string`, action: [CodeActionCommand](../private.type.CodeActionCommand/README.md) | [CodeActionCommand](../private.type.CodeActionCommand/README.md)\[]): Promise\<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult\[]>

> `deprecated`
> 
> `fileName` will be ignored



</div>

