# `interface` Location

[Documentation Index](../README.md)

```ts
import {Location} from "https://deno.land/x/tsa@v0.0.34/mod.ts"
```

## This interface has

- 4 properties:
[filename](#-filename-string),
[line](#-line-number),
[col](#-col-number),
[entryPointNumber](#-entrypointnumber-number)


#### 📄 filename: `string`



#### 📄 line: `number`



#### 📄 col: `number`



#### 📄 entryPointNumber?: `number`

> If the filename corresponds to one of the entry points passed to `createTsaProgram()`.
> `filename` here is always absolute URL, even if a relative path was passed.



