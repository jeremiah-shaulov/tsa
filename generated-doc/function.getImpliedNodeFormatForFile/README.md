# `function` getImpliedNodeFormatForFile

[Documentation Index](../README.md)

A function for determining if a given file is esm or cjs format, assuming modern node module resolution rules, as configured by the
`options` parameter.

`function` getImpliedNodeFormatForFile(fileName: `string`, packageJsonInfoCache?: [PackageJsonInfoCache](../interface.PackageJsonInfoCache/README.md), host: [ModuleResolutionHost](../interface.ModuleResolutionHost/README.md), options: [CompilerOptions](../interface.CompilerOptions/README.md)): ResolutionMode