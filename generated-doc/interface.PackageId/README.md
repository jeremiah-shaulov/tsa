# `interface` PackageId

[Documentation Index](../README.md)

Unique identifier with a package name and version.
If changing this, remember to change `packageIdIsEqual`.

## This interface has

- 3 properties:
[name](#-name-string),
[subModuleName](#-submodulename-string),
[version](#-version-string)


#### 📄 name: `string`

> Name of the package.
> Should not include `@types`.
> If accessing a non-index file, this should include its name e.g. "foo/bar".



#### 📄 subModuleName: `string`

> Name of a submodule within this package.
> May be "".



#### 📄 version: `string`

> Version of the package, e.g. "1.2.3"



