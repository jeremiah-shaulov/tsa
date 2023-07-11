import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';
import {ExportSymbols} from './export_symbols.ts';
import {resolveSymbol, transformNode, unexportStmt} from './util.ts';

export function step5TransformNodes(ts: typeof tsa, checker: tsa.TypeChecker, nodesWithInfo: NodeWithInfo[], symbolsNames: Map<tsa.Symbol, string>, exportSymbols: ExportSymbols, firstSourceFile: tsa.SourceFile)
{	let exportStmts: NodeWithInfo[] | undefined; // at the end i'll create `export {name1, name2, ...}`, and `export const ns = {...}`
	for (const nodeWithInfo of nodesWithInfo)
	{	const {sourceFile, node: stmt, isExport} = nodeWithInfo;
		nodeWithInfo.node = transformNode
		(	ts,
			stmt,
			(node, context) =>
			{	if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node) || ts.isQualifiedName(node))
				{	const symbol = checker.getSymbolAtLocation(node);
					const resolvedSymbol = resolveSymbol(ts, checker, symbol);
					if (symbol && resolvedSymbol)
					{	const newName = symbolsNames.get(resolvedSymbol);
						if (newName != undefined)
						{	if (newName!=symbol.name || !ts.isIdentifier(node))
							{	node = context.factory.createIdentifier(newName);
							}
						}
					}
				}
				else if (ts.isShorthandPropertyAssignment(node))
				{	if (!node.objectAssignmentInitializer)
					{	const symbol = checker.getShorthandAssignmentValueSymbol(node);
						const resolvedSymbol = resolveSymbol(ts, checker, symbol);
						if (symbol && resolvedSymbol)
						{	const newName = symbolsNames.get(resolvedSymbol);
							if (newName != undefined)
							{	if (newName != symbol.name)
								{	node = context.factory.createPropertyAssignment(node.name, context.factory.createIdentifier(newName));
								}
							}
						}
					}
				}
				else if (node == stmt)
				{	if (isExport)
					{	// Remove `export` keyword
						node = unexportStmt(ts, context, node);
					}
					else if (ts.isExportAssignment(node) && sourceFile!=firstSourceFile) // If this is not the first entry point
					{	// Remove `export default` or `export =`
						node = context.factory.createExpressionStatement(node.expression);
					}
					// Create exports if not yet created
					if (!exportStmts)
					{	exportStmts = [];
						for (const exportStmt of exportSymbols.getExportStmts(ts, context, symbolsNames))
						{	exportStmts.push({sourceFile: firstSourceFile, node: exportStmt, refs: new Set, bodyRefs: new Set, introduces: [], isExport: false});
						}
					}
				}
				return node;
			}
		);
	}
	if (exportStmts)
	{	for (const exportStmt of exportStmts)
		{	nodesWithInfo.push(exportStmt);
		}
	}
}
