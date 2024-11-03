# `function` getModeForFileReference

[Documentation Index](../README.md)

Calculates the resulting resolution mode for some reference in some file - this is generally the explicitly
provided resolution mode in the reference, unless one is not present, in which case it is the mode of the containing file.

`function` getModeForFileReference(ref: [FileReference](../private.interface.FileReference/README.md) | `string`, containingFileMode: [ResolutionMode](../private.type.ResolutionMode/README.md)): ResolutionMode