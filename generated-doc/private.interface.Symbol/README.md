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


#### 📄 flags: [SymbolFlags](../private.enum.SymbolFlags/README.md)



#### 📄 escapedName: [\_\_String](../private.type.__String/README.md)



#### 📄 declarations?: [Declaration](../private.interface.Declaration/README.md)\[]



#### 📄 valueDeclaration?: [Declaration](../private.interface.Declaration/README.md)



#### 📄 members?: [SymbolTable](../private.type.SymbolTable/README.md)



#### 📄 exports?: [SymbolTable](../private.type.SymbolTable/README.md)



#### 📄 globalExports?: [SymbolTable](../private.type.SymbolTable/README.md)



#### 📄 `readonly` name: `string`



#### ⚙ getFlags(): [SymbolFlags](../private.enum.SymbolFlags/README.md)



#### ⚙ getEscapedName(): __String



#### ⚙ getName(): `string`



#### ⚙ getDeclarations(): Declaration\[]



#### ⚙ getDocumentationComment(typeChecker: [TypeChecker](../private.interface.TypeChecker/README.md) | `undefined`): SymbolDisplayPart\[]



#### ⚙ getJsDocTags(checker?: [TypeChecker](../private.interface.TypeChecker/README.md)): JSDocTagInfo\[]



