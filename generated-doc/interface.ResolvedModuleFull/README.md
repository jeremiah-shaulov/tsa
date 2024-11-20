# `interface` ResolvedModuleFull `extends` [ResolvedModule](../interface.ResolvedModule/README.md)

[Documentation Index](../README.md)

ResolvedModule with an explicitly provided `extension` property.
Prefer this over `ResolvedModule`.
If changing this, remember to change `moduleResolutionIsEqualTo`.

## This interface has

- 2 properties:
[extension](#-extension-string),
[packageId](#-packageid-packageid)
- 3 inherited members from [ResolvedModule](../interface.ResolvedModule/README.md)


#### 📄 extension: `string`

> Extension of resolvedFileName. This must match what's at the end of resolvedFileName.
> This is optional for backwards-compatibility, but will be added if not provided.



#### 📄 packageId?: [PackageId](../interface.PackageId/README.md)



