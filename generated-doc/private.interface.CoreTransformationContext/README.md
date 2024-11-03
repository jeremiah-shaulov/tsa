# `interface` CoreTransformationContext

[Documentation Index](../README.md)

## This interface has

- property [factory](#-readonly-factory-nodefactory)
- 7 methods:
[getCompilerOptions](#-getcompileroptions-compileroptions),
[startLexicalEnvironment](#-startlexicalenvironment-void),
[suspendLexicalEnvironment](#-suspendlexicalenvironment-void),
[resumeLexicalEnvironment](#-resumelexicalenvironment-void),
[endLexicalEnvironment](#-endlexicalenvironment-statement),
[hoistFunctionDeclaration](#-hoistfunctiondeclarationnode-functiondeclaration-void),
[hoistVariableDeclaration](#-hoistvariabledeclarationnode-identifier-void)


#### 📄 `readonly` factory: [NodeFactory](../private.interface.NodeFactory/README.md)



#### ⚙ getCompilerOptions(): [CompilerOptions](../private.interface.CompilerOptions/README.md)

> Gets the compiler options supplied to the transformer.



#### ⚙ startLexicalEnvironment(): `void`

> Starts a new lexical environment.



#### ⚙ suspendLexicalEnvironment(): `void`

> Suspends the current lexical environment, usually after visiting a parameter list.



#### ⚙ resumeLexicalEnvironment(): `void`

> Resumes a suspended lexical environment, usually before visiting a function body.



#### ⚙ endLexicalEnvironment(): Statement\[]

> Ends a lexical environment, returning any declarations.



#### ⚙ hoistFunctionDeclaration(node: [FunctionDeclaration](../private.interface.FunctionDeclaration/README.md)): `void`

> Hoists a function declaration to the containing scope.



#### ⚙ hoistVariableDeclaration(node: [Identifier](../private.interface.Identifier/README.md)): `void`

> Hoists a variable declaration to the containing scope.



