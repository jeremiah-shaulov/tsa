# `interface` PerDirectoryResolutionCache\<T>

[Documentation Index](../README.md)

Cached resolutions per containing directory.
This assumes that any module id will have the same resolution for sibling files located in the same folder.

## This interface has

- 4 methods:
[getFromDirectoryCache](#-getfromdirectorycachename-string-mode-resolutionmode-directoryname-string-redirectedreference-resolvedprojectreference--undefined-t),
[getOrCreateCacheForDirectory](#-getorcreatecachefordirectorydirectoryname-string-redirectedreference-resolvedprojectreference-modeawarecachet),
[clear](#-clear-void),
[update](#-updateoptions-compileroptions-void)


#### ⚙ getFromDirectoryCache(name: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md), directoryName: `string`, redirectedReference: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md) | `undefined`): T



#### ⚙ getOrCreateCacheForDirectory(directoryName: `string`, redirectedReference?: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md)): [ModeAwareCache](../interface.ModeAwareCache/README.md)\<T>



#### ⚙ clear(): `void`



#### ⚙ update(options: [CompilerOptions](../interface.CompilerOptions/README.md)): `void`

> Updates with the current compilerOptions the cache will operate with.
> This updates the redirects map as well if needed so module resolutions are cached if they can across the projects



