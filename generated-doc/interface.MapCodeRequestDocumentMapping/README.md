# `interface` MapCodeRequestDocumentMapping

[Documentation Index](../README.md)

## This interface has

- 2 properties:
[contents](#-contents-string),
[focusLocations](#-focuslocations-textspan)


#### 📄 contents: `string`\[]

> The specific code to map/insert/replace in the file.



#### 📄 focusLocations?: [TextSpan](../interface.TextSpan.2/README.md)\[]\[]

> Areas of "focus" to inform the code mapper with. For example, cursor
> location, current selection, viewport, etc. Nested arrays denote
> priority: toplevel arrays are more important than inner arrays, and
> inner array priorities are based on items within that array. Items
> earlier in the arrays have higher priority.



