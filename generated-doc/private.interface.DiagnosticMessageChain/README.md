# `interface` DiagnosticMessageChain

[Documentation Index](../README.md)

A linked list of formatted diagnostic messages to be used as part of a multiline message.
It is built from the bottom up, leaving the head to be the "main" diagnostic.
While it seems that DiagnosticMessageChain is structurally similar to DiagnosticMessage,
the difference is that messages are all preformatted in DMC.

## This interface has

- 4 properties:
[messageText](#-messagetext-string),
[category](#-category-diagnosticcategory),
[code](#-code-number),
[next](#-next-diagnosticmessagechain)


#### 📄 messageText: `string`



#### 📄 category: [DiagnosticCategory](../private.enum.DiagnosticCategory/README.md)



#### 📄 code: `number`



#### 📄 next?: [DiagnosticMessageChain](../private.interface.DiagnosticMessageChain/README.md)\[]



