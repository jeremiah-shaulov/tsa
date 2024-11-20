# `type` ChangePropertyTypes\<T, Substitutions `extends` \{\[K `in` keyof T]?: `any`}>

[Documentation Index](../README.md)

`type` ChangePropertyTypes\<T, Substitutions `extends` \{\[K `in` keyof T]?: `any`}> = \{\[K `in` keyof T]: K `extends` keyof Substitutions ? Substitutions\[K] : T\[K]}