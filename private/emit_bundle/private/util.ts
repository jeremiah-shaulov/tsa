import {tsa} from '../../tsa_ns.ts';

/**	For each `I`, remove `array[removeIndices[I]]`.
	After the operation `removeIndices` will end up sorted.
 **/
export function massSpliceRemove<T>(array: Array<T>, removeIndices: number[])
{	removeIndices.sort((a, b) => a - b); // ascendant order
	for (let i=removeIndices.length-1; i>=0; i--)
	{	const pos = i + 1;
		while (i>0 && removeIndices[i-1] == removeIndices[i]-1)
		{	i--;
		}
		array.splice(removeIndices[i], pos-i);
	}
}

export function symbolIsType(ts: typeof tsa, resolvedSymbol: tsa.Symbol)
{	return !!(resolvedSymbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias));
}

/**	Is `node.parent` a property access like `ns.name`, where `ns` is a namespace alias (from `import * as ns`), and is this node the **left** side of the property access?
 **/
export function nodeIsNs(ts: typeof tsa, checker: tsa.TypeChecker, node: tsa.Node, symbol: tsa.Symbol)
{	if (ts.isPropertyAccessExpression(node.parent) && node==node.parent.expression || ts.isQualifiedName(node.parent) && node==node.parent.left)
	{	return symbolIsNs(ts, checker, symbol);
	}
	return false;
}

function symbolIsNs(ts: typeof tsa, checker: tsa.TypeChecker, symbol: tsa.Symbol)
{	if (symbol.flags & ts.SymbolFlags.Alias)
	{	const declaration = symbol.getDeclarations()?.[0];
		if (declaration)
		{	if (declaration.kind == ts.SyntaxKind.NamespaceImport)
			{	return true;
			}
			if (declaration.kind == ts.SyntaxKind.ImportSpecifier)
			{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
				if (resolvedSymbol && resolvedSymbol.flags & ts.SymbolFlags.Module)
				{	return true;
				}
			}
		}
	}
	return false;
}

export function resolveSymbol<T extends tsa.Symbol|undefined>(ts: typeof tsa, checker: tsa.TypeChecker, symbol: T)
{	if (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	return checker.getAliasedSymbol(symbol);
	}
	return symbol;
}

export function getNames(ts: typeof tsa, name: tsa.BindingName, outNames=new Array<tsa.Identifier>)
{	if (!ts.isIdentifier(name))
	{	for (const e of name.elements)
		{	if (!ts.isOmittedExpression(e))
			{	getNames(ts, e.name, outNames);
			}
		}
	}
	else
	{	outNames.push(name);
	}
	return outNames;
}

export function unexportStmt(ts: typeof tsa, context: tsa.TransformationContext, node: tsa.Node)
{	if (ts.isFunctionDeclaration(node))
	{	node = context.factory.updateFunctionDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			node.asteriskToken,
			node.name,
			node.typeParameters,
			node.parameters,
			node.type,
			node.body
		);
	}
	else if (ts.isClassDeclaration(node))
	{	node = context.factory.updateClassDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			node.name,
			node.typeParameters,
			node.heritageClauses,
			node.members
		);
	}
	else if (ts.isInterfaceDeclaration(node))
	{	node = context.factory.updateInterfaceDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			node.name,
			node.typeParameters,
			node.heritageClauses,
			node.members
		);
	}
	else if (ts.isEnumDeclaration(node))
	{	node = context.factory.updateEnumDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			node.name,
			node.members
		);
	}
	else if (ts.isTypeAliasDeclaration(node))
	{	node = context.factory.updateTypeAliasDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			node.name,
			node.typeParameters,
			node.type
		);
	}
	else if (ts.isVariableStatement(node))
	{	node = context.factory.updateVariableStatement
		(	node,
			unexportModifiers(ts, node.modifiers),
			node.declarationList
		);
	}
	return node;
}

function unexportModifiers(ts: typeof tsa, modifiers?: tsa.NodeArray<tsa.ModifierLike>)
{	const i = modifiers?.findIndex(m => m.kind == ts.SyntaxKind.ExportKeyword) ?? -1;
	if (i!=-1 && modifiers)
	{	return modifiers.slice(0, i).concat(modifiers.slice(i+1));
	}
	return modifiers;
}

export function transformNode
(	ts: typeof tsa,
	node: tsa.Node,
	visitor: (node: tsa.Node, context: tsa.TransformationContext) => tsa.Node
)
{	const result = ts.transform(node, [transformerFactory]);
	return result.transformed[0];

	function transformerFactory(context: tsa.TransformationContext)
	{	return function(rootNode: tsa.Node)
		{	const result = ts.visitNode(rootNode, visit);
			return result;
		};

		function visit(node: tsa.Node): tsa.Node
		{	node = visitor(node, context);
			return ts.visitEachChild(node, visit, context);
		}
	}
}
