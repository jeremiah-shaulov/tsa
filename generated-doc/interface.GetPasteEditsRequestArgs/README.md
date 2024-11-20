# `interface` GetPasteEditsRequestArgs `extends` [FileRequestArgs](../interface.FileRequestArgs/README.md)

[Documentation Index](../README.md)

## This interface has

- 3 properties:
[pastedText](#-pastedtext-string),
[pasteLocations](#-pastelocations-textspan),
[copiedFrom](#-copiedfrom-file-string-spans-textspan)
- 2 inherited members from [FileRequestArgs](../interface.FileRequestArgs/README.md)


#### 📄 pastedText: `string`\[]

> The text that gets pasted in a file.



#### 📄 pasteLocations: [TextSpan](../interface.TextSpan.2/README.md)\[]

> Locations of where the `pastedText` gets added in a file. If the length of the `pastedText` and `pastedLocations` are not the same,
> then the `pastedText` is combined into one and added at all the `pastedLocations`.



#### 📄 copiedFrom?: \{file: `string`, spans: [TextSpan](../interface.TextSpan.2/README.md)\[]}

> The source location of each `pastedText`. If present, the length of `spans` must be equal to the length of `pastedText`.



