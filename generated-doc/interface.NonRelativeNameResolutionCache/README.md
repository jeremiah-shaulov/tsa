# `interface` NonRelativeNameResolutionCache\<T>

[Documentation Index](../README.md)

## This interface has

- 4 methods:
[getFromNonRelativeNameCache](#-getfromnonrelativenamecachenonrelativename-string-mode-resolutionmode-directoryname-string-redirectedreference-resolvedprojectreference--undefined-t),
[getOrCreateCacheForNonRelativeName](#-getorcreatecachefornonrelativenamenonrelativename-string-mode-resolutionmode-redirectedreference-resolvedprojectreference-pernonrelativenamecachet),
[clear](#-clear-void),
[update](#-updateoptions-compileroptions-void)


#### ⚙ getFromNonRelativeNameCache(nonRelativeName: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md), directoryName: `string`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`): T



#### ⚙ getOrCreateCacheForNonRelativeName(nonRelativeName: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md), redirectedReference?: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md)): [PerNonRelativeNameCache](../interface.PerNonRelativeNameCache/README.md)\<T>



#### ⚙ clear(): `void`



#### ⚙ update(options: [CompilerOptions](../interface.CompilerOptions/README.md)): `void`

> Updates with the current compilerOptions the cache will operate with.
> This updates the redirects map as well if needed so module resolutions are cached if they can across the projects



