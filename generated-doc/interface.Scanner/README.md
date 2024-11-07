# `interface` Scanner

[Documentation Index](../README.md)

## This interface has

- 38 methods:
[getToken](#-gettoken-syntaxkind),
[getTokenFullStart](#-gettokenfullstart-number),
[getTokenStart](#-gettokenstart-number),
[getTokenEnd](#-gettokenend-number),
[getTokenText](#-gettokentext-string),
[getTokenValue](#-gettokenvalue-string),
[hasUnicodeEscape](#-hasunicodeescape-boolean),
[hasExtendedUnicodeEscape](#-hasextendedunicodeescape-boolean),
[hasPrecedingLineBreak](#-hasprecedinglinebreak-boolean),
[isIdentifier](#-isidentifier-boolean),
[isReservedWord](#-isreservedword-boolean),
[isUnterminated](#-isunterminated-boolean),
[reScanGreaterToken](#-rescangreatertoken-syntaxkind),
[reScanSlashToken](#-rescanslashtoken-syntaxkind),
[reScanAsteriskEqualsToken](#-rescanasteriskequalstoken-syntaxkind),
[reScanTemplateToken](#-rescantemplatetokenistaggedtemplate-boolean-syntaxkind),
[scanJsxIdentifier](#-scanjsxidentifier-syntaxkind),
[scanJsxAttributeValue](#-scanjsxattributevalue-syntaxkind),
[reScanJsxAttributeValue](#-rescanjsxattributevalue-syntaxkind),
[reScanJsxToken](#-rescanjsxtokenallowmultilinejsxtext-boolean-jsxtokensyntaxkind),
[reScanLessThanToken](#-rescanlessthantoken-syntaxkind),
[reScanHashToken](#-rescanhashtoken-syntaxkind),
[reScanQuestionToken](#-rescanquestiontoken-syntaxkind),
[reScanInvalidIdentifier](#-rescaninvalididentifier-syntaxkind),
[scanJsxToken](#-scanjsxtoken-jsxtokensyntaxkind),
[scanJsDocToken](#-scanjsdoctoken-jsdocsyntaxkind),
[scan](#-scan-syntaxkind),
[getText](#-gettext-string),
[setText](#-settexttext-string--undefined-start-number-length-number-void),
[setOnError](#-setonerroronerror-errorcallback--undefined-void),
[setScriptTarget](#-setscripttargetscripttarget-scripttarget-void),
[setLanguageVariant](#-setlanguagevariantvariant-languagevariant-void),
[setScriptKind](#-setscriptkindscriptkind-scriptkind-void),
[setJSDocParsingMode](#-setjsdocparsingmodekind-jsdocparsingmode-void),
[resetTokenState](#-resettokenstatepos-number-void),
[lookAhead](#-lookaheadtcallback---t-t),
[scanRange](#-scanrangetstart-number-length-number-callback---t-t),
[tryScan](#-tryscantcallback---t-t)
- [5 deprecated symbols](#-deprecated-getstartpos-number)


#### ⚙ getToken(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ getTokenFullStart(): `number`



#### ⚙ getTokenStart(): `number`



#### ⚙ getTokenEnd(): `number`



#### ⚙ getTokenText(): `string`



#### ⚙ getTokenValue(): `string`



#### ⚙ hasUnicodeEscape(): `boolean`



#### ⚙ hasExtendedUnicodeEscape(): `boolean`



#### ⚙ hasPrecedingLineBreak(): `boolean`



#### ⚙ isIdentifier(): `boolean`



#### ⚙ isReservedWord(): `boolean`



#### ⚙ isUnterminated(): `boolean`



#### ⚙ reScanGreaterToken(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ reScanSlashToken(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ reScanAsteriskEqualsToken(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ reScanTemplateToken(isTaggedTemplate: `boolean`): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ scanJsxIdentifier(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ scanJsxAttributeValue(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ reScanJsxAttributeValue(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ reScanJsxToken(allowMultilineJsxText?: `boolean`): JsxTokenSyntaxKind



#### ⚙ reScanLessThanToken(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ reScanHashToken(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ reScanQuestionToken(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ reScanInvalidIdentifier(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ scanJsxToken(): JsxTokenSyntaxKind



#### ⚙ scanJsDocToken(): JSDocSyntaxKind



#### ⚙ scan(): [SyntaxKind](../enum.SyntaxKind/README.md)



#### ⚙ getText(): `string`



#### ⚙ setText(text: `string` | `undefined`, start?: `number`, length?: `number`): `void`



#### ⚙ setOnError(onError: [ErrorCallback](../type.ErrorCallback/README.md) | `undefined`): `void`



#### ⚙ setScriptTarget(scriptTarget: [ScriptTarget](../enum.ScriptTarget/README.md)): `void`



#### ⚙ setLanguageVariant(variant: [LanguageVariant](../enum.LanguageVariant/README.md)): `void`



#### ⚙ setScriptKind(scriptKind: [ScriptKind](../enum.ScriptKind/README.md)): `void`



#### ⚙ setJSDocParsingMode(kind: [JSDocParsingMode](../enum.JSDocParsingMode/README.md)): `void`



#### ⚙ resetTokenState(pos: `number`): `void`



#### ⚙ lookAhead\<T>(callback: () => T): T



#### ⚙ scanRange\<T>(start: `number`, length: `number`, callback: () => T): T



#### ⚙ tryScan\<T>(callback: () => T): T



<div style="opacity:0.6">

#### ⚙ `deprecated` getStartPos(): `number`

> `deprecated`
> 
> use [getTokenFullStart](../interface.Scanner/README.md#-gettokenfullstart-number)



#### ⚙ `deprecated` getTextPos(): `number`

> `deprecated`
> 
> use [getTokenEnd](../interface.Scanner/README.md#-gettokenend-number)



#### ⚙ `deprecated` getTokenPos(): `number`

> `deprecated`
> 
> use [getTokenStart](../interface.Scanner/README.md#-gettokenstart-number)



#### ⚙ `deprecated` reScanTemplateHeadOrNoSubstitutionTemplate(): [SyntaxKind](../enum.SyntaxKind/README.md)

> `deprecated`
> 
> use [reScanTemplateToken](../interface.Scanner/README.md#-rescantemplatetokenistaggedtemplate-boolean-syntaxkind)(false)



#### ⚙ `deprecated` setTextPos(textPos: `number`): `void`

> `deprecated`
> 
> use [resetTokenState](../interface.Scanner/README.md#-resettokenstatepos-number-void)



</div>

