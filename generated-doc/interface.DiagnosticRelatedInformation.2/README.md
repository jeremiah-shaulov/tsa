# `interface` DiagnosticRelatedInformation

[Documentation Index](../README.md)

Represents additional spans returned with a diagnostic which are relevant to it

## This interface has

- 4 properties:
[category](#-category-string),
[code](#-code-number),
[message](#-message-string),
[span](#-span-filespan)


#### 📄 category: `string`

> The category of the related information message, e.g. "error", "warning", or "suggestion".



#### 📄 code: `number`

> The code used ot identify the related information



#### 📄 message: `string`

> Text of related or additional information.



#### 📄 span?: [FileSpan](../interface.FileSpan/README.md)

> Associated location



