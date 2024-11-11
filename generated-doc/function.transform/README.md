# `function` transform

[Documentation Index](../README.md)

`function` transform\<T `extends` [Node](../interface.Node/README.md)>(source: T | T\[], transformers: [TransformerFactory](../type.TransformerFactory/README.md)\<T>\[], compilerOptions?: [CompilerOptions](../interface.CompilerOptions/README.md)): [TransformationResult](../interface.TransformationResult/README.md)\<T>

Transform one or more nodes using the supplied transformers.

🎚️ Parameter **source**:

A single `Node` or an array of `Node` objects.

🎚️ Parameter **transformers**:

An array of `TransformerFactory` callbacks used to process the transformation.

🎚️ Parameter **compilerOptions**:

Optional compiler options.

