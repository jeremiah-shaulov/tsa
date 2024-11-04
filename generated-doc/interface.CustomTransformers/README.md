# `interface` CustomTransformers

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[before](#-before-transformerfactorysourcefile--customtransformerfactory),
[after](#-after-transformerfactorysourcefile--customtransformerfactory),
[afterDeclarations](#-afterdeclarations-transformerfactorybundle--sourcefile--customtransformerfactory)


#### 📄 before?: ([TransformerFactory](../type.TransformerFactory/README.md)\<[SourceFile](../interface.SourceFile/README.md)> | [CustomTransformerFactory](../type.CustomTransformerFactory/README.md))\[]

> Custom transformers to evaluate before built-in .js transformations.



#### 📄 after?: ([TransformerFactory](../type.TransformerFactory/README.md)\<[SourceFile](../interface.SourceFile/README.md)> | [CustomTransformerFactory](../type.CustomTransformerFactory/README.md))\[]

> Custom transformers to evaluate after built-in .js transformations.



#### 📄 afterDeclarations?: ([TransformerFactory](../type.TransformerFactory/README.md)\<[Bundle](../interface.Bundle/README.md) | [SourceFile](../interface.SourceFile/README.md)> | [CustomTransformerFactory](../type.CustomTransformerFactory/README.md))\[]

> Custom transformers to evaluate after built-in .d.ts transformations.



