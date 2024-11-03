# `function` visitParameterList

[Documentation Index](../README.md)

Starts a new lexical environment and visits a parameter list, suspending the lexical
environment upon completion.

`function` visitParameterList(nodes: [NodeArray](../private.interface.NodeArray/README.md)\<[ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)>, visitor: [Visitor](../private.type.Visitor/README.md), context: [TransformationContext](../private.interface.TransformationContext/README.md), nodesVisitor?: [NodesVisitor](../private.interface.NodesVisitor/README.md)): [NodeArray](../private.interface.NodeArray/README.md)\<ParameterDeclaration>