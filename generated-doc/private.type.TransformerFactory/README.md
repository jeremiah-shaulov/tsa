# `type` TransformerFactory\<T `extends` [Node](../private.interface.Node/README.md)>

[Documentation Index](../README.md)

A function that is used to initialize and return a `Transformer` callback, which in turn
will be used to transform one or more nodes.

`type` TransformerFactory\<T `extends` [Node](../private.interface.Node/README.md)> = (context: [TransformationContext](../private.interface.TransformationContext/README.md)) => [Transformer](../private.type.Transformer/README.md)\<T>