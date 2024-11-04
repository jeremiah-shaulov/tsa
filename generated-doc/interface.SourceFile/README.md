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

> lib.d.ts should have a reference comment like
> 
>  /// <reference no-default-lib="true"/>
> 
> If any other file has this comment, it signals not to include lib.d.ts
> because this containing file is intended to act as a default library.



#### 📄 languageVersion: [ScriptTarget](../enum.ScriptTarget/README.md)



#### 📄 impliedNodeFormat?: [ResolutionMode](../type.ResolutionMode/README.md)

> When `module` is `Node16` or `NodeNext`, this field controls whether the
> source file in question is an ESNext-output-format file, or a CommonJS-output-format
> module. This is derived by the module resolver as it looks up the file, since
> it is derived from either the file extension of the module, or the containing
> `package.json` context, and affects both checking and emit.
> 
> It is _public_ so that (pre)transformers can set this field,
> since it switches the builtin `node` module transform. Generally speaking, if unset,
> the field is treated as though it is `ModuleKind.CommonJS`.
> 
> Note that this field is only set by the module resolution process when
> `moduleResolution` is `Node16` or `NodeNext`, which is implied by the `module` setting
> of `Node16` or `NodeNext`, respectively, but may be overriden (eg, by a `moduleResolution`
> of `node`). If so, this field will be unset and source files will be considered to be
> CommonJS-output-format by the node module transformer and type checker, regardless of extension or context.



#### ⚙ getLineAndCharacterOfPosition(pos: `number`): [LineAndCharacter](../interface.LineAndCharacter/README.md)



#### ⚙ getLineEndOfPosition(pos: `number`): `number`



#### ⚙ getLineStarts(): readonly `number`\[]



#### ⚙ getPositionOfLineAndCharacter(line: `number`, character: `number`): `number`



#### ⚙ update(newText: `string`, textChangeRange: [TextChangeRange](../interface.TextChangeRange/README.md)): [SourceFile](../interface.SourceFile/README.md)



