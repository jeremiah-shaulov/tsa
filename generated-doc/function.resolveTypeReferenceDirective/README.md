# `function` resolveTypeReferenceDirective

[Documentation Index](../README.md)

`function` resolveTypeReferenceDirective(typeReferenceDirectiveName: `string`, containingFile: `string` | `undefined`, options: [CompilerOptions](../interface.CompilerOptions/README.md), host: [ModuleResolutionHost](../interface.ModuleResolutionHost/README.md), redirectedReference?: [ResolvedProjectReference](../interface.ResolvedProjectReference/README.md), cache?: [TypeReferenceDirectiveResolutionCache](../interface.TypeReferenceDirectiveResolutionCache/README.md), resolutionMode?: [ResolutionMode](../type.ResolutionMode/README.md)): [ResolvedTypeReferenceDirectiveWithFailedLookupLocations](../interface.ResolvedTypeReferenceDirectiveWithFailedLookupLocations/README.md)



🎚️ Parameter **containingFile**:

- file that contains type reference directive, can be undefined if containing file is unknown.
This is possible in case if resolution is performed for directives specified via 'types' parameter. In this case initial path for secondary lookups
is assumed to be the same as root directory of the project.

