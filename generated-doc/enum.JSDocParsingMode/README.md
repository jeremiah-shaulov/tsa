# `enum` JSDocParsingMode

[Documentation Index](../README.md)

#### ParseAll = <mark>0</mark>

> Always parse JSDoc comments and include them in the AST.
> 
> This is the default if no mode is provided.



#### ParseNone = <mark>1</mark>

> Never parse JSDoc comments, mo matter the file type.



#### ParseForTypeErrors = <mark>2</mark>

> Parse only JSDoc comments which are needed to provide correct type errors.
> 
> This will always parse JSDoc in non-TS files, but only parse JSDoc comments
> containing `@see` and `@link` in TS files.



#### ParseForTypeInfo = <mark>3</mark>

> Parse only JSDoc comments which are needed to provide correct type info.
> 
> This will always parse JSDoc in non-TS files, but never in TS files.
> 
> Note: Do not use this mode if you require accurate type errors; use [ParseForTypeErrors](../enum.JSDocParsingMode/README.md#parsefortypeerrors--2) instead.



