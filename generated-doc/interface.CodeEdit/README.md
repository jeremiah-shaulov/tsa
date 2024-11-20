# `interface` CodeEdit

[Documentation Index](../README.md)

Object found in response messages defining an editing
instruction for a span of text in source code.  The effect of
this instruction is to replace the text starting at start and
ending one character before end with newText. For an insertion,
the text span is empty.  For a deletion, newText is empty.

## This interface has

- 3 properties:
[start](#-start-location),
[end](#-end-location),
[newText](#-newtext-string)


#### 📄 start: [Location](../interface.Location.2/README.md)

> First character of the text span to edit.



#### 📄 end: [Location](../interface.Location.2/README.md)

> One character past last character of the text span to edit.



#### 📄 newText: `string`

> Replace the span defined above with this string (may be
> the empty string).



