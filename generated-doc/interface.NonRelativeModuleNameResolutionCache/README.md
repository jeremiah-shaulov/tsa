# `interface` NonRelativeModuleNameResolutionCache `extends` [NonRelativeNameResolutionCache](../interface.NonRelativeNameResolutionCache/README.md)\<[ResolvedModuleWithFailedLookupLocations](../interface.ResolvedModuleWithFailedLookupLocations/README.md)>, [PackageJsonInfoCache](../interface.PackageJsonInfoCache/README.md)

[Documentation Index](../README.md)

Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.

## This interface has

- [deprecated symbol](#-deprecated-getorcreatecacheformodulenamenonrelativemodulename-string-mode-resolutionmode-redirectedreference-resolvedprojectreference-permodulenamecacheresolvedmodulewithfailedlookuplocations)
- 4 inherited members from [NonRelativeNameResolutionCache](../interface.NonRelativeNameResolutionCache/README.md)


<div style="opacity:0.6">

#### ⚙ `deprecated` getOrCreateCacheForModuleName(nonRelativeModuleName: `string`, mode: [ResolutionMode](../type.ResolutionMode/README.md), redirectedReference?: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md)): [PerModuleNameCache](../interface.PerNonRelativeNameCache/README.md)\<[ResolvedModuleWithFailedLookupLocations](../interface.ResolvedModuleWithFailedLookupLocations/README.md)>

> `deprecated`
> 
> Use getOrCreateCacheForNonRelativeName



</div>

