# `function` getAllJSDocTags

[Documentation Index](../README.md)

Gets all JSDoc tags that match a specified predicate

`function` getAllJSDocTags\<T `extends` [JSDocTag](../private.interface.JSDocTag/README.md)>(node: [Node](../private.interface.Node/README.md), predicate: (tag: [JSDocTag](../private.interface.JSDocTag/README.md)) => tag `is` T): readonly T\[]