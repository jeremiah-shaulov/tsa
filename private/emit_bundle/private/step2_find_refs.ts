import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';
import {KnownSymbols} from './known_symbols.ts';
import {resolveSymbol} from './util.ts';

export function step2FindRefs(ts: typeof tsa, checker: tsa.TypeChecker, nodesWithInfo: NodeWithInfo[], knownSymbols: KnownSymbols)
{	for (const {node, refs, bodyRefs, introduces} of nodesWithInfo)
	{	if (ts.isFunctionDeclaration(node))
		{	setUsedTopLevelSymbols(ts, checker, knownSymbols, node, introduces, bodyRefs);
		}
		else if (ts.isClassDeclaration(node))
		{	if (node.heritageClauses)
			{	for (const h of node.heritageClauses)
				{	setUsedTopLevelSymbols(ts, checker, knownSymbols, h, introduces, refs);
				}
			}
			if (node.typeParameters)
			{	for (const param of node.typeParameters)
				{	setUsedTopLevelSymbols(ts, checker, knownSymbols, param, introduces, bodyRefs);
				}
			}
			for (const member of node.members)
			{	if (ts.isPropertyDeclaration(member))
				{	const isStatic = member.modifiers?.some(m => m.kind == ts.SyntaxKind.StaticKeyword);
					setUsedTopLevelSymbols(ts, checker, knownSymbols, member, introduces, isStatic ? refs : bodyRefs);
				}
				else
				{	setUsedTopLevelSymbols(ts, checker, knownSymbols, member, introduces, bodyRefs);
				}
			}
		}
		else
		{	setUsedTopLevelSymbols(ts, checker, knownSymbols, node, introduces, refs);
		}
	}
}

function setUsedTopLevelSymbols(ts: typeof tsa, checker: tsa.TypeChecker, knownSymbols: KnownSymbols, node: tsa.Node|undefined, introduces: tsa.Symbol[], refs: Set<tsa.Symbol>)
{	node?.forEachChild(visit);

	function visit(node: tsa.Node)
	{	node.forEachChild(visit);
		let symbol;
		if (ts.isIdentifier(node))
		{	symbol = checker.getSymbolAtLocation(node);
		}
		else if (ts.isShorthandPropertyAssignment(node))
		{	symbol = checker.getShorthandAssignmentValueSymbol(node);
		}
		if (symbol && !nodeIsNs(ts, checker, node, symbol))
		{	addRef(ts, checker, knownSymbols, symbol, introduces, refs);
		}
	}
}

function addRef(ts: typeof tsa, checker: tsa.TypeChecker, knownSymbols: KnownSymbols, symbol: tsa.Symbol, introduces: tsa.Symbol[], refs: Set<tsa.Symbol>, visited=new Set<tsa.Symbol>)
{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
	if (resolvedSymbol && !visited.has(resolvedSymbol))
	{	visited.add(resolvedSymbol);
		if (knownSymbols.symbolsNames.has(resolvedSymbol) && !introduces.includes(resolvedSymbol)) // If resolves to a top-level symbol
		{	refs.add(resolvedSymbol);
		}
		else if (resolvedSymbol.flags & ts.SymbolFlags.Module)
		{	for (const symbol2 of checker.getExportsOfModule(resolvedSymbol))
			{	addRef(ts, checker, knownSymbols, symbol2, introduces, refs, visited);
			}
		}
	}
}

/**	Is `node.parent` a property access like `ns.name`, where `ns` is a namespace alias (from `import * as ns`), and is this node the **left** side of the property access?
 **/
function nodeIsNs(ts: typeof tsa, checker: tsa.TypeChecker, node: tsa.Node, symbol: tsa.Symbol)
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
