# `function` transform

[Documentation Index](../README.md)

Transform one or more nodes using the supplied transformers.

`function` transform\<T `extends` [Node](../interface.Node/README.md)>(source: T | T\[], transformers: [TransformerFactory](../type.TransformerFactory/README.md)\<T>\[], compilerOptions?: [CompilerOptions](../interface.CompilerOptions/README.md)): [TransformationResult](../interface.TransformationResult/README.md)\<T>