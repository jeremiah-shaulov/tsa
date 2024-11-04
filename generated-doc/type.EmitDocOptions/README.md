# `type` EmitDocOptions

[Documentation Index](../README.md)

```ts
import {EmitDocOptions} from "https://deno.land/x/tsa@v0.0.26/mod.ts"
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



#### 📄 includeReferenced?: `boolean`



#### 📄 includeBuiltIn?: `boolean`



#### 📄 ignoreIgnoreTag?: `boolean`



#### 📄 noImportNodes?: `boolean`



#### ⚙ includeSymbol?(symbol: [tsa.Symbol](../interface.Symbol/README.md), isExported: `boolean`, checker: [tsa.TypeChecker](../interface.TypeChecker/README.md)): `boolean`



