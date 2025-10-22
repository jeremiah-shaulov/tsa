# `interface` QuickInfoResponseBody

[Documentation Index](../README.md)

Body of QuickInfoResponse.

## This interface has

- 8 properties:
[kind](#-kind-scriptelementkind),
[kindModifiers](#-kindmodifiers-string),
[start](#-start-location),
[end](#-end-location),
[displayString](#-displaystring-string),
[documentation](#-documentation-string--symboldisplaypart),
[tags](#-tags-jsdoctaginfo),
[canIncreaseVerbosityLevel](#-canincreaseverbositylevel-boolean)


#### 📄 kind: [ScriptElementKind](../enum.ScriptElementKind/README.md)

> The symbol's kind (such as 'className' or 'parameterName' or plain 'text').



#### 📄 kindModifiers: `string`

> Optional modifiers for the kind (such as 'public').



#### 📄 start: [Location](../interface.Location.2/README.md)

> Starting file location of symbol.



#### 📄 end: [Location](../interface.Location.2/README.md)

> One past last character of symbol.



#### 📄 displayString: `string`

> Type and kind of symbol.



#### 📄 documentation: `string` | [SymbolDisplayPart](../interface.SymbolDisplayPart/README.md)\[]

> Documentation associated with symbol.
> Display parts when UserPreferences.displayPartsForJSDoc is true, flattened to string otherwise.



#### 📄 tags: [JSDocTagInfo](../interface.JSDocTagInfo.2/README.md)\[]

> JSDoc tags associated with symbol.



#### 📄 canIncreaseVerbosityLevel?: `boolean`

> Whether the verbosity level can be increased for this quick info response.



