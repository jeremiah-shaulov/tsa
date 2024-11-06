# `function` validateLocaleAndSetLanguage

[Documentation Index](../README.md)

`function` validateLocaleAndSetLanguage(locale: `string`, sys: \{getExecutingFilePath(): `string`, resolvePath(path: `string`): `string`, fileExists(fileName: `string`): `boolean`, readFile(fileName: `string`): `string`}, errors?: [Diagnostic](../interface.Diagnostic/README.md)\[]): `void`

Checks to see if the locale is in the appropriate format,
and if it is, attempts to set the appropriate language.

