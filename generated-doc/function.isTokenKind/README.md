# `function` isTokenKind

[Documentation Index](../README.md)

`function` isTokenKind(kind: [SyntaxKind](../enum.SyntaxKind/README.md)): `boolean`

True if kind is of some token syntax kind.
For example, this is true for an IfKeyword but not for an IfStatement.
Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.

