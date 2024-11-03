# `interface` NonRelativeModuleNameResolutionCache `extends` [NonRelativeNameResolutionCache](../private.interface.NonRelativeNameResolutionCache/README.md)\<[ResolvedModuleWithFailedLookupLocations](../private.interface.ResolvedModuleWithFailedLookupLocations/README.md)>, [PackageJsonInfoCache](../private.interface.PackageJsonInfoCache/README.md)

[Documentation Index](../README.md)

Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.

## This interface has

- [deprecated symbol](#-deprecated-getorcreatecacheformodulenamenonrelativemodulename-string-mode-resolutionmode-redirectedreference-resolvedprojectreference-permodulenamecache)


<div style="opacity:0.6">

#### ⚙ `deprecated` getOrCreateCacheForModuleName(nonRelativeModuleName: `string`, mode: [ResolutionMode](../private.type.ResolutionMode/README.md), redirectedReference?: [ResolvedProjectReference](../private.interface.ResolvedProjectReference/README.md)): [PerModuleNameCache](../private.interface.PerNonRelativeNameCache/README.md)

> `deprecated`
> 
> Use getOrCreateCacheForNonRelativeName



</div>

