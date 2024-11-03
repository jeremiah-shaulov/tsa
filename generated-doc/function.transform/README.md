# `function` transform

[Documentation Index](../README.md)

Transform one or more nodes using the supplied transformers.

`function` transform\<T `extends` [Node](../private.interface.Node/README.md)>(source: T | T\[], transformers: [TransformerFactory](../private.type.TransformerFactory/README.md)\<T>\[], compilerOptions?: [CompilerOptions](../private.interface.CompilerOptions/README.md)): [TransformationResult](../private.interface.TransformationResult/README.md)\<T>