# `interface` SourceFile `extends` [Declaration](../interface.Declaration/README.md), [LocalsContainer](../interface.LocalsContainer/README.md)

[Documentation Index](../README.md)

## This interface has

- 15 properties:
[kind](#-readonly-kind-syntaxkindsourcefile),
[statements](#-readonly-statements-nodearraystatement),
[endOfFileToken](#-readonly-endoffiletoken-tokensyntaxkindendoffiletoken),
[fileName](#-filename-string),
[text](#-text-string),
[amdDependencies](#-amddependencies-readonly-amddependency),
[moduleName](#-modulename-string),
[referencedFiles](#-referencedfiles-readonly-filereference),
[typeReferenceDirectives](#-typereferencedirectives-readonly-filereference),
[libReferenceDirectives](#-libreferencedirectives-readonly-filereference),
[languageVariant](#-languagevariant-languagevariant),
[isDeclarationFile](#-isdeclarationfile-boolean),
[hasNoDefaultLib](#-hasnodefaultlib-boolean),
[languageVersion](#-languageversion-scripttarget),
[impliedNodeFormat](#-impliednodeformat-resolutionmode)
- 5 methods:
[getLineAndCharacterOfPosition](#-getlineandcharacterofpositionpos-number-lineandcharacter),
[getLineEndOfPosition](#-getlineendofpositionpos-number-number),
[getLineStarts](#-getlinestarts-readonly-number),
[getPositionOfLineAndCharacter](#-getpositionoflineandcharacterline-number-character-number-number),
[update](#-updatenewtext-string-textchangerange-textchangerange-sourcefile)


#### 📄 `readonly` kind: [SyntaxKind.SourceFile](../enum.SyntaxKind/README.md#sourcefile--307)



#### 📄 `readonly` statements: [NodeArray](../interface.NodeArray/README.md)\<[Statement](../interface.Statement/README.md)>



#### 📄 `readonly` endOfFileToken: [Token](../interface.Token/README.md)\<[SyntaxKind.EndOfFileToken](../enum.SyntaxKind/README.md#endoffiletoken--1)>



#### 📄 fileName: `string`



#### 📄 text: `string`



#### 📄 amdDependencies: readonly [AmdDependency](../interface.AmdDependency/README.md)\[]



#### 📄 moduleName?: `string`



#### 📄 referencedFiles: readonly [FileReference](../interface.FileReference/README.md)\[]



#### 📄 typeReferenceDirectives: readonly [FileReference](../interface.FileReference/README.md)\[]



#### 📄 libReferenceDirectives: readonly [FileReference](../interface.FileReference/README.md)\[]



#### 📄 languageVariant: [LanguageVariant](../enum.LanguageVariant/README.md)



#### 📄 isDeclarationFile: `boolean`



#### 📄 hasNoDefaultLib: `boolean`



#### 📄 languageVersion: [ScriptTarget](../enum.ScriptTarget/README.md)



#### 📄 impliedNodeFormat?: [ResolutionMode](../type.ResolutionMode/README.md)



#### ⚙ getLineAndCharacterOfPosition(pos: `number`): [LineAndCharacter](../interface.LineAndCharacter/README.md)



#### ⚙ getLineEndOfPosition(pos: `number`): `number`



#### ⚙ getLineStarts(): readonly `number`\[]



#### ⚙ getPositionOfLineAndCharacter(line: `number`, character: `number`): `number`



#### ⚙ update(newText: `string`, textChangeRange: [TextChangeRange](../interface.TextChangeRange/README.md)): [SourceFile](../interface.SourceFile/README.md)



