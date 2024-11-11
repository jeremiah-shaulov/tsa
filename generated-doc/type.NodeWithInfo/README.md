# `type` NodeWithInfo

[Documentation Index](../README.md)

```ts
import {NodeWithInfo} from "https://deno.land/x/tsa@v0.0.38/mod.ts"
```

## This type has

- 6 properties:
[sourceFile](#-sourcefile-tsasourcefile),
[node](#-node-tsanode),
[refs](#-refs-settsasymbol),
[bodyRefs](#-bodyrefs-settsasymbol),
[introduces](#-introduces-tsasymbol),
[nodeExportType](#-nodeexporttype-nodeexporttype)


#### 📄 sourceFile: [tsa.SourceFile](../interface.SourceFile/README.md)

> From what file this node originates. Even if `node.getSourceFile()` returns undefined.



#### 📄 node: [tsa.Node](../interface.Node/README.md)

> The node.



#### 📄 refs: Set\<[tsa.Symbol](../interface.Symbol/README.md)>

> What global symbols does this node reference (use).



#### 📄 bodyRefs: Set\<[tsa.Symbol](../interface.Symbol/README.md)>

> If this node introduces a function or a method, here is what the function body references (uses).



#### 📄 introduces: [tsa.Symbol](../interface.Symbol/README.md)\[]

> What global symbols does this node introduce (declare).
> For example:
> ```ts
> let a = b + c;
> ```
> References `b` and `c`, and introduces `a`.



#### 📄 nodeExportType: [NodeExportType](../enum.NodeExportType/README.md)

> This statement introduces it's symbols with `export` keyword. Or it's `export default () => 'unnamed symbol'`



