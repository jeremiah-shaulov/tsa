# `type` DocNode

[Documentation Index](../README.md)

```ts
import {DocNode} from "https://deno.land/x/tsa@v0.0.44/mod.ts"
```

This type matches `DocNode` type from [x/deno_doc](https://deno.land/x/deno_doc@0.125.0) with several additions:

- [Location](../interface.Location/README.md) has additional [entryPointNumber](../interface.Location/README.md#-entrypointnumber-number) field.
You can pass relative paths to [createTsaProgram()](../function.createTsaProgram/README.md) as entry points, but [Location.filename](../interface.Location/README.md#-filename-string) always contains corresponding absolute URL.
If this filename is one of the entry points, the [Location.entryPointNumber](../interface.Location/README.md#-entrypointnumber-number) field will contain the index in `entryPoints` array provided to [createTsaProgram()](../function.createTsaProgram/README.md).
- `DocNode` has additional [exports](../private.interface.DocNodeBase/README.md#-exports-export) field. If a symbol is reexported from several places, those places will be recorded here (including current location).
- [ClassPropertyDef](../interface.ClassPropertyDef/README.md) has additional [init](../interface.ClassPropertyDef/README.md#-init-string) field that contains property initializer (if any), and [isAccessor](../interface.ClassPropertyDef/README.md#-isaccessor-boolean) field.
- [EnumDef](../interface.EnumDef/README.md) has additional [isConst](../interface.EnumDef/README.md#-isconst-boolean) field for `const enum`s.
- Doc-comments are returned not only as [doc](../interface.JsDoc/README.md#-doc-string) string, but also [docTokens](../interface.JsDoc/README.md#-doctokens-jsdoctoken), that have separate parts for comment text and `@link` tags.
- [JsDocTagTyped](../interface.JsDocTagTyped/README.md) (for `@enum`, `@extends`, `@this` and `@type` tags) and [JsDocTagParam](../interface.JsDocTagParam/README.md) (for `@param`) have additional `tsType` field for the object type.
- [JsDocTagNamed](../interface.JsDocTagNamed/README.md) (for `@callback` and `@template` tags) has additional [tsType](../interface.JsDocTagNamed/README.md#-tstype-tstypedef) and [typeParams](../interface.JsDocTagNamed/README.md#-typeparams-tstypeparamdef) fields.
- [DecoratorDef](../interface.DecoratorDef/README.md) has additional [nameNodeIndex](../interface.DecoratorDef/README.md#-namenodeindex-number) field that contains node index in the results where this decorator function is returned, if it's returned.
To include referenced symbols in the result, use [EmitDocOptions.includeReferenced](../type.EmitDocOptions/README.md#-includereferenced-boolean) option.
- In [ClassPropertyDef](../interface.ClassPropertyDef/README.md), [ClassMethodDef](../interface.ClassMethodDef/README.md), [InterfaceMethodDef](../interface.InterfaceMethodDef/README.md), [InterfacePropertyDef](../interface.InterfacePropertyDef/README.md), [LiteralPropertyDef](../interface.LiteralPropertyDef/README.md) and [LiteralMethodDef](../interface.LiteralMethodDef/README.md), if property or method name is computed identifier (like `[ident]: type`),
they can have additional [nameNodeIndex](../interface.ClassPropertyDef/README.md#-namenodeindex-number) field with node index in the results for the identifier ([EmitDocOptions.includeReferenced](../type.EmitDocOptions/README.md#-includereferenced-boolean) option is also needed).
- References to another named types are returned as [TsTypeRefDef](../interface.TsTypeRefDef/README.md) objects that contain not only [typeName](../interface.TsTypeRefDef/README.md#-typename-string),
but also additional [nodeIndex](../interface.TsTypeRefDef/README.md#-nodeindex-number) field, that contains index in the results for this type.
If the type is an enum member, also [nodeSubIndex](../interface.TsTypeRefDef/README.md#-nodesubindex-number) will be set to member number. See [EmitDocOptions.includeReferenced](../type.EmitDocOptions/README.md#-includereferenced-boolean).
- [ClassDef](../interface.ClassDef/README.md) has additional `superNodeIndex` field, that contains node index in the results for the super class. See [EmitDocOptions.includeReferenced](../type.EmitDocOptions/README.md#-includereferenced-boolean).
- [TsTypeDef.repr](../private.interface.TsTypeDefBase/README.md#-repr-string) field for string literals (`kind == 'string'`) contains quotes, for string template literals (`kind == 'template'`) contains backticks, and for bigint literals (`kind == 'bigInt'`) has trailing `n`.
- In [LiteralMethodDef](../interface.LiteralMethodDef/README.md), [LiteralPropertyDef](../interface.LiteralPropertyDef/README.md), [LiteralCallSignatureDef](../interface.LiteralCallSignatureDef/README.md), [LiteralIndexSignatureDef](../interface.LiteralIndexSignatureDef/README.md), [ClassIndexSignatureDef](../interface.ClassIndexSignatureDef/README.md) and [InterfaceIndexSignatureDef](../interface.InterfaceIndexSignatureDef/README.md) there're [LiteralMethodDef.jsDoc](../interface.LiteralMethodDef/README.md#-jsdoc-jsdoc) and [LiteralMethodDef.location](../interface.LiteralMethodDef/README.md#-location-location) fields.

`type` DocNode = [DocNodeModuleDoc](../interface.DocNodeModuleDoc/README.md) | [DocNodeFunction](../interface.DocNodeFunction/README.md) | [DocNodeVariable](../interface.DocNodeVariable/README.md) | [DocNodeEnum](../interface.DocNodeEnum/README.md) | [DocNodeClass](../interface.DocNodeClass/README.md) | [DocNodeTypeAlias](../interface.DocNodeTypeAlias/README.md) | [DocNodeNamespace](../interface.DocNodeNamespace/README.md) | [DocNodeInterface](../interface.DocNodeInterface/README.md) | [DocNodeImport](../interface.DocNodeImport/README.md)