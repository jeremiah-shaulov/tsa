# `interface` SignatureHelpItem

[Documentation Index](../README.md)

Represents a single signature to show in signature help.
The id is used for subsequent calls into the language service to ask questions about the
signature help item in the context of any documents that have been updated.  i.e. after
an edit has happened, while signature help is still active, the host can ask important
questions like 'what parameter is the user currently contained within?'.

## This interface has

- 7 properties:
[isVariadic](#-isvariadic-boolean),
[prefixDisplayParts](#-prefixdisplayparts-symboldisplaypart),
[suffixDisplayParts](#-suffixdisplayparts-symboldisplaypart),
[separatorDisplayParts](#-separatordisplayparts-symboldisplaypart),
[parameters](#-parameters-signaturehelpparameter),
[documentation](#-documentation-symboldisplaypart),
[tags](#-tags-jsdoctaginfo)


#### 📄 isVariadic: `boolean`



#### 📄 prefixDisplayParts: [SymbolDisplayPart](../private.interface.SymbolDisplayPart/README.md)\[]



#### 📄 suffixDisplayParts: [SymbolDisplayPart](../private.interface.SymbolDisplayPart/README.md)\[]



#### 📄 separatorDisplayParts: [SymbolDisplayPart](../private.interface.SymbolDisplayPart/README.md)\[]



#### 📄 parameters: [SignatureHelpParameter](../private.interface.SignatureHelpParameter/README.md)\[]



#### 📄 documentation: [SymbolDisplayPart](../private.interface.SymbolDisplayPart/README.md)\[]



#### 📄 tags: [JSDocTagInfo](../private.interface.JSDocTagInfo/README.md)\[]



