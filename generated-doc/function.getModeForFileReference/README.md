# `function` getModeForFileReference

[Documentation Index](../README.md)

`function` getModeForFileReference(ref: [FileReference](../interface.FileReference/README.md) | `string`, containingFileMode: [ResolutionMode](../type.ResolutionMode/README.md)): ResolutionMode

Calculates the resulting resolution mode for some reference in some file - this is generally the explicitly
provided resolution mode in the reference, unless one is not present, in which case it is the mode of the containing file.

