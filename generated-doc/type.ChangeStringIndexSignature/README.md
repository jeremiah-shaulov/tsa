# `type` ChangeStringIndexSignature\<T, NewStringIndexSignatureType>

[Documentation Index](../README.md)

`type` ChangeStringIndexSignature\<T, NewStringIndexSignatureType> = \{\[K `in` keyof T]: `string` `extends` K ? NewStringIndexSignatureType : T\[K]}