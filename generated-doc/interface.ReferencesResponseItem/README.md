# `interface` ReferencesResponseItem `extends` [FileSpanWithContext](../interface.FileSpanWithContext/README.md)

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[lineText](#-linetext-string),
[isWriteAccess](#-iswriteaccess-boolean),
[isDefinition](#-isdefinition-boolean)
- 1 inherited member from [FileSpan](../interface.FileSpan/README.md), 2 from [TextSpanWithContext](../interface.TextSpanWithContext/README.md), 2 from [TextSpan](../interface.TextSpan.2/README.md)


#### 📄 lineText?: `string`

> Text of line containing the reference. Including this
> with the response avoids latency of editor loading files
> to show text of reference line (the server already has loaded the referencing files).
> 
> If [UserPreferences.disableLineTextInReferences](../interface.UserPreferences/README.md#-readonly-disablelinetextinreferences-boolean) is enabled, the property won't be filled



#### 📄 isWriteAccess: `boolean`

> True if reference is a write location, false otherwise.



#### 📄 isDefinition?: `boolean`

> Present only if the search was triggered from a declaration.
> True indicates that the references refers to the same symbol
> (i.e. has the same meaning) as the declaration that began the
> search.



