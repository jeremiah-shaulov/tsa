# `interface` Diagnostic

[Documentation Index](../README.md)

Item of diagnostic information found in a DiagnosticEvent message.

## This interface has

- 9 properties:
[start](#-start-location),
[end](#-end-location),
[text](#-text-string),
[category](#-category-string),
[reportsUnnecessary](#-reportsunnecessary-),
[reportsDeprecated](#-reportsdeprecated-),
[relatedInformation](#-relatedinformation-diagnosticrelatedinformation),
[code](#-code-number),
[source](#-source-string)


#### 📄 start: [Location](../interface.Location.2/README.md)

> Starting file location at which text applies.



#### 📄 end: [Location](../interface.Location.2/README.md)

> The last file location at which the text applies.



#### 📄 text: `string`

> Text of diagnostic message.



#### 📄 category: `string`

> The category of the diagnostic message, e.g. "error", "warning", or "suggestion".



#### 📄 reportsUnnecessary?: \{}



#### 📄 reportsDeprecated?: \{}



#### 📄 relatedInformation?: [DiagnosticRelatedInformation](../interface.DiagnosticRelatedInformation.2/README.md)\[]

> Any related spans the diagnostic may have, such as other locations relevant to an error, such as declarartion sites



#### 📄 code?: `number`

> The error code of the diagnostic message.



#### 📄 source?: `string`

> The name of the plugin reporting the message.



