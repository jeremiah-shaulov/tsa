# `function` visitParameterList

[Documentation Index](../README.md)

Starts a new lexical environment and visits a parameter list, suspending the lexical
environment upon completion.

`function` visitParameterList(nodes: [NodeArray](../interface.NodeArray/README.md)\<[ParameterDeclaration](../interface.ParameterDeclaration/README.md)>, visitor: [Visitor](../type.Visitor/README.md), context: [TransformationContext](../interface.TransformationContext/README.md), nodesVisitor?: [NodesVisitor](../interface.NodesVisitor/README.md)): [NodeArray](../interface.NodeArray/README.md)\<[ParameterDeclaration](../interface.ParameterDeclaration/README.md)>