# `interface` ModeAwareCache\<T>

[Documentation Index](../README.md)

## This interface has

- 6 methods:
[get](#-getkey-string-mode-resolutionmode-t),
[set](#-setkey-string-mode-resolutionmode-value-t-this),
[delete](#-deletekey-string-mode-resolutionmode-this),
[has](#-haskey-string-mode-resolutionmode-boolean),
[forEach](#-foreachcb-elem-t-key-string-mode-resolutionmode--void-void),
[size](#-size-number)


#### ⚙ get(key: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md)): T



#### ⚙ set(key: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md), value: T): `this`



#### ⚙ delete(key: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md)): `this`



#### ⚙ has(key: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md)): `boolean`



#### ⚙ forEach(cb: (elem: T, key: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md)) => `void`): `void`



#### ⚙ size(): `number`



