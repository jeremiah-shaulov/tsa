# `type` DeclarationKind

[Documentation Index](../README.md)

```ts
import {DeclarationKind} from "https://deno.land/x/tsa@v0.0.41/mod.ts"
```

Indicates how the documentation node was declared. `"private"` indicates
the node is un-exported. `"export"` indicates it is exported from the current
module. `"declare"` indicates that it is a type only declaration.

`type` DeclarationKind = <mark>"private"</mark> | <mark>"export"</mark> | <mark>"declare"</mark>