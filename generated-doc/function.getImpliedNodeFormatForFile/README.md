# `function` getImpliedNodeFormatForFile

[Documentation Index](../README.md)

`function` getImpliedNodeFormatForFile(fileName: `string`, packageJsonInfoCache?: [PackageJsonInfoCache](../interface.PackageJsonInfoCache/README.md), host: [ModuleResolutionHost](../interface.ModuleResolutionHost/README.md), options: [CompilerOptions](../interface.CompilerOptions/README.md)): ResolutionMode

A function for determining if a given file is esm or cjs format, assuming modern node module resolution rules, as configured by the
`options` parameter.

🎚️ Parameter **fileName**:

The file name to check the format of (it need not exist on disk)

🎚️ Parameter **packageJsonInfoCache**:

A cache for package file lookups - it's best to have a cache when this function is called often

🎚️ Parameter **host**:

The ModuleResolutionHost which can perform the filesystem lookups for package json data

🎚️ Parameter **options**:

The compiler options to perform the analysis under - relevant options are `moduleResolution` and `traceResolution`

✔️ Return value:

`undefined` if the path has no relevant implied format, `ModuleKind.ESNext` for esm format, and `ModuleKind.CommonJS` for cjs format

