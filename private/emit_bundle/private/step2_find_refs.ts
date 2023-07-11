import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';
import {nodeIsNs, resolveSymbol} from './util.ts';

export function step2FindRefs(ts: typeof tsa, checker: tsa.TypeChecker, nodesWithInfo: NodeWithInfo[], symbolsNames: Map<tsa.Symbol, string>)
{	for (const {node, refs, bodyRefs, introduces} of nodesWithInfo)
	{	if (ts.isFunctionDeclaration(node))
		{	setUsedTopLevelSymbols(ts, checker, symbolsNames, node, introduces, bodyRefs);
		}
		else if (ts.isClassDeclaration(node))
		{	if (node.heritageClauses)
			{	for (const h of node.heritageClauses)
				{	setUsedTopLevelSymbols(ts, checker, symbolsNames, h, introduces, refs);
				}
			}
			if (node.typeParameters)
			{	for (const param of node.typeParameters)
				{	setUsedTopLevelSymbols(ts, checker, symbolsNames, param, introduces, bodyRefs);
				}
			}
			for (const member of node.members)
			{	if (ts.isPropertyDeclaration(member))
				{	const isStatic = member.modifiers?.some(m => m.kind == ts.SyntaxKind.StaticKeyword);
					setUsedTopLevelSymbols(ts, checker, symbolsNames, member, introduces, isStatic ? refs : bodyRefs);
				}
				else
				{	setUsedTopLevelSymbols(ts, checker, symbolsNames, member, introduces, bodyRefs);
				}
			}
		}
		else
		{	setUsedTopLevelSymbols(ts, checker, symbolsNames, node, introduces, refs);
		}
	}
}

function setUsedTopLevelSymbols(ts: typeof tsa, checker: tsa.TypeChecker, symbolsNames: Map<tsa.Symbol, string>, node: tsa.Node|undefined, introduces: tsa.Symbol[], refs: Set<tsa.Symbol>)
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
		{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
			if (resolvedSymbol && symbolsNames.has(resolvedSymbol) && !introduces.includes(resolvedSymbol)) // If resolves to a top-level symbol
			{	refs.add(resolvedSymbol);
			}
		}
	}
}
