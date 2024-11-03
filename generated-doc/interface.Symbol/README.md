# `interface` Symbol

[Documentation Index](../README.md)

## This interface has

- 8 properties:
[flags](#-flags-symbolflags),
[escapedName](#-escapedname-string),
[declarations](#-declarations-declaration),
[valueDeclaration](#-valuedeclaration-declaration),
[members](#-members-symboltable),
[exports](#-exports-symboltable),
[globalExports](#-globalexports-symboltable),
[name](#-readonly-name-string)
- 6 methods:
[getFlags](#-getflags-symbolflags),
[getEscapedName](#-getescapedname-__string),
[getName](#-getname-string),
[getDeclarations](#-getdeclarations-declaration),
[getDocumentationComment](#-getdocumentationcommenttypechecker-typechecker--undefined-symboldisplaypart),
[getJsDocTags](#-getjsdoctagschecker-typechecker-jsdoctaginfo)


#### 📄 flags: [SymbolFlags](../enum.SymbolFlags/README.md)



#### 📄 escapedName: [\_\_String](../type.__String/README.md)



#### 📄 declarations?: [Declaration](../interface.Declaration/README.md)\[]



#### 📄 valueDeclaration?: [Declaration](../interface.Declaration/README.md)



#### 📄 members?: [SymbolTable](../type.SymbolTable/README.md)



#### 📄 exports?: [SymbolTable](../type.SymbolTable/README.md)



#### 📄 globalExports?: [SymbolTable](../type.SymbolTable/README.md)



#### 📄 `readonly` name: `string`



#### ⚙ getFlags(): [SymbolFlags](../enum.SymbolFlags/README.md)



#### ⚙ getEscapedName(): __String



#### ⚙ getName(): `string`



#### ⚙ getDeclarations(): [Declaration](../interface.Declaration/README.md)\[]



#### ⚙ getDocumentationComment(typeChecker: [TypeChecker](../interface.TypeChecker/README.md) | `undefined`): [SymbolDisplayPart](../interface.SymbolDisplayPart/README.md)\[]



#### ⚙ getJsDocTags(checker?: [TypeChecker](../interface.TypeChecker/README.md)): [JSDocTagInfo](../interface.JSDocTagInfo/README.md)\[]



