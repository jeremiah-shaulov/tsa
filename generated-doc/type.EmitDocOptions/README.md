# `type` EmitDocOptions

[Documentation Index](../README.md)

```ts
import {EmitDocOptions} from "https://deno.land/x/tsa@v0.0.52/mod.ts"
```

Options that you can provide
to [tsa.TsaProgram.emitDoc](../interface.TsaProgram/README.md#-emitdocoptions-emitdocoptions-docnodes) that affect what files to traverse, and what symbols to include in the result.

## This type has

- 5 properties:
[followModuleImports](#-followmoduleimports-boolean),
[includeReferenced](#-includereferenced-boolean),
[includeBuiltIn](#-includebuiltin-boolean),
[ignoreIgnoreTag](#-ignoreignoretag-boolean),
[noImportNodes](#-noimportnodes-boolean)
- method [includeSymbol](#-includesymbolsymbol-tsasymbol-isexported-boolean-checker-tsatypechecker-boolean)


#### 📄 followModuleImports?: `boolean`

> Work not only on entry points, but on every module that appears in `import from` or `export from` statements.



#### 📄 includeReferenced?: `boolean`

> [DocNode](../type.DocNode/README.md)s in the result can reference another symbols.
>  	Symbol names can appear in type aliases, type parameters, etc.
> 	Also decorators refer to functions defined somewhere, not necessarily in entry point modules.
> 	If this flag is set to `true`, referenced symbols will be included in the result, and their indices in the resulting array will be recorded in the nodes that refer to them.
> 	The referrers include: [TsTypeRefDef\#nodeIndex](../interface.TsTypeRefDef/README.md#-nodeindex-number), [TsTypeRefDef\#nodeSubIndex](../interface.TsTypeRefDef/README.md#-nodesubindex-number) (for enum members),
> [ClassDef\#superNodeIndex](../interface.ClassDef/README.md#-supernodeindex-number), [DecoratorDef\#nameNodeIndex](../interface.DecoratorDef/README.md#-namenodeindex-number),
> [ClassPropertyDef.nameNodeIndex](../interface.ClassPropertyDef/README.md#-namenodeindex-number), [ClassMethodDef.nameNodeIndex](../interface.ClassMethodDef/README.md#-namenodeindex-number),
> [InterfaceMethodDef.nameNodeIndex](../interface.InterfaceMethodDef/README.md#-namenodeindex-number), [InterfacePropertyDef.nameNodeIndex](../interface.InterfacePropertyDef/README.md#-namenodeindex-number),
> [LiteralPropertyDef.nameNodeIndex](../interface.LiteralPropertyDef/README.md#-namenodeindex-number) and [LiteralMethodDef.nameNodeIndex](../interface.LiteralMethodDef/README.md#-namenodeindex-number).



#### 📄 includeBuiltIn?: `boolean`

> Also generate docs for referenced built-in objects, like `Map`, `HTMLElement`, etc.



#### 📄 ignoreIgnoreTag?: `boolean`

> By default symbols marked with



#### 📄 noImportNodes?: `boolean`

> By default, for every symbol that appears in `import from` statement there will be corresponding [DocNode](../type.DocNode/README.md) with `kind == 'import'`.
> Set this to `true` to exclude such nodes from the result.



#### ⚙ includeSymbol?(symbol: [tsa.Symbol](../interface.Symbol/README.md), isExported: `boolean`, checker: [tsa.TypeChecker](../interface.TypeChecker/README.md)): `boolean`

> Callback function that will be called to ask you whether you want to include every occured symbol in the source files to the result.
> By default only exported symbols are processed, and if you set [EmitDocOptions\#includeReferenced](../type.EmitDocOptions/README.md#-includereferenced-boolean), also not exported but referenced ones.
> Specify this callback to potentially include other symbols.



