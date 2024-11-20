# `interface` DiagnosticEventBody

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[file](#-file-string),
[diagnostics](#-diagnostics-diagnostic),
[spans](#-spans-textspan)


#### 📄 file: `string`

> The file for which diagnostic information is reported.



#### 📄 diagnostics: [Diagnostic](../interface.Diagnostic.2/README.md)\[]

> An array of diagnostic information items.



#### 📄 spans?: [TextSpan](../interface.TextSpan.2/README.md)\[]

> Spans where the region diagnostic was requested, if this is a region semantic diagnostic event.



