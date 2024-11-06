# `function` getEffectiveTypeParameterDeclarations

[Documentation Index](../README.md)

`function` getEffectiveTypeParameterDeclarations(node: [DeclarationWithTypeParameters](../type.DeclarationWithTypeParameters/README.md)): readonly TypeParameterDeclaration\[]

Gets the effective type parameters. If the node was parsed in a
JavaScript file, gets the type parameters from the `@template` tag from JSDoc.

This does *not* return type parameters from a jsdoc reference to a generic type, eg

type Id = <T>(x: T) => T
/** @type {Id} /
function id(x) { return x }

