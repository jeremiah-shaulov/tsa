# `function` visitCommaListElements

[Documentation Index](../README.md)

`function` visitCommaListElements(elements: [NodeArray](../interface.NodeArray/README.md)\<[Expression](../interface.Expression/README.md)>, visitor: [Visitor](../type.Visitor/README.md), discardVisitor?: [Visitor](../type.Visitor/README.md)): [NodeArray](../interface.NodeArray/README.md)\<[Expression](../interface.Expression/README.md)>

Visits the elements of a [CommaListExpression](../interface.CommaListExpression/README.md).

🎚️ Parameter **visitor**:

The visitor to use when visiting expressions whose result will not be discarded at runtime.

🎚️ Parameter **discardVisitor**:

The visitor to use when visiting expressions whose result will be discarded at runtime. Defaults to `visitor`.

