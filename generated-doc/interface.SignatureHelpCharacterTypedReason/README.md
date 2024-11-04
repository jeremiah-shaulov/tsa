# `interface` SignatureHelpCharacterTypedReason

[Documentation Index](../README.md)

Signals that the signature help request came from a user typing a character.
Depending on the character and the syntactic context, the request may or may not be served a result.

## This interface has

- 2 properties:
[kind](#-kind-charactertyped),
[triggerCharacter](#-triggercharacter-signaturehelptriggercharacter)


#### 📄 kind: <mark>"characterTyped"</mark>



#### 📄 triggerCharacter: [SignatureHelpTriggerCharacter](../type.SignatureHelpTriggerCharacter/README.md)

> Character that was responsible for triggering signature help.



