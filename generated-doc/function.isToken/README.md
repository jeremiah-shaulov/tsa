# `function` isToken

[Documentation Index](../README.md)

`function` isToken(n: [Node](../interface.Node/README.md)): `boolean`

True if node is of some token syntax kind.
For example, this is true for an IfKeyword but not for an IfStatement.
Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.

