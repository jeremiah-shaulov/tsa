# `function` getAllJSDocTags

[Documentation Index](../README.md)

Gets all JSDoc tags that match a specified predicate

`function` getAllJSDocTags\<T `extends` [JSDocTag](../interface.JSDocTag/README.md)>(node: [Node](../interface.Node/README.md), predicate: (tag: [JSDocTag](../interface.JSDocTag/README.md)) => tag `is` T): readonly T\[]