# `function` getModeForResolutionAtIndex

[Documentation Index](../README.md)

`function` getModeForResolutionAtIndex(file: [SourceFile](../interface.SourceFile/README.md), index: `number`, compilerOptions: [CompilerOptions](../interface.CompilerOptions/README.md)): ResolutionMode

Use `program.getModeForResolutionAtIndex`, which retrieves the correct `compilerOptions`, instead of this function whenever possible.
Calculates the final resolution mode for an import at some index within a file's `imports` list. This is the resolution mode
explicitly provided via import attributes, if present, or the syntax the usage would have if emitted to JavaScript. In
`--module node16` or `nodenext`, this may depend on the file's `impliedNodeFormat`. In `--module preserve`, it depends only on the
input syntax of the reference. In other `module` modes, when overriding import attributes are not provided, this function returns
`undefined`, as the result would have no impact on module resolution, emit, or type checking.

