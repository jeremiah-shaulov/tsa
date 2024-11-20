# `interface` DiagnosticWithLinePosition

[Documentation Index](../README.md)

Represents diagnostic info that includes location of diagnostic in two forms
- start position and length of the error span
- startLocation and endLocation - a pair of Location objects that store start/end line and offset of the error span.

## This interface has

- 10 properties:
[message](#-message-string),
[start](#-start-number),
[length](#-length-number),
[startLocation](#-startlocation-location),
[endLocation](#-endlocation-location),
[category](#-category-string),
[code](#-code-number),
[reportsUnnecessary](#-reportsunnecessary-),
[reportsDeprecated](#-reportsdeprecated-),
[relatedInformation](#-relatedinformation-diagnosticrelatedinformation)


#### 📄 message: `string`



#### 📄 start: `number`



#### 📄 length: `number`



#### 📄 startLocation: [Location](../interface.Location.2/README.md)



#### 📄 endLocation: [Location](../interface.Location.2/README.md)



#### 📄 category: `string`



#### 📄 code: `number`



#### 📄 reportsUnnecessary?: \{}

> May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic.



#### 📄 reportsDeprecated?: \{}



#### 📄 relatedInformation?: [DiagnosticRelatedInformation](../interface.DiagnosticRelatedInformation.2/README.md)\[]



