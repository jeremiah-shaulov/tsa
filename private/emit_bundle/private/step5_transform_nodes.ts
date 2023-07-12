import {tsa} from '../../tsa_ns.ts';
import {NodeExportType, NodeWithInfo} from './emit_bundle.ts';
import {KnownSymbols} from './known_symbols.ts';
import {ExportSymbols} from './export_symbols.ts';
import {resolveSymbol} from './util.ts';

export function step5TransformNodes
(	ts: typeof tsa,
	checker: tsa.TypeChecker,
	nodesWithInfo: NodeWithInfo[],
	knownSymbols: KnownSymbols,
	exportSymbols: ExportSymbols,
	firstSourceFile: tsa.SourceFile
)
{	let exportStmts: NodeWithInfo[] | undefined; // at the end i'll create `export {name1, name2, ...}`, and `export const ns = {...}`
	for (let i=0; i<nodesWithInfo.length; i++)
	{	const nodeWithInfo = nodesWithInfo[i];
		const {sourceFile, node: stmt, introduces, nodeExportType} = nodeWithInfo;
		nodeWithInfo.node = transformNode
		(	ts,
			stmt,
			(node, context) =>
			{	if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node) || ts.isQualifiedName(node))
				{	const symbol = checker.getSymbolAtLocation(node);
					const resolvedSymbol = resolveSymbol(ts, checker, symbol);
					if (symbol && resolvedSymbol)
					{	const name = knownSymbols.symbolsNames.get(resolvedSymbol);
						if (name != undefined)
						{	if (name!=symbol.name || !ts.isIdentifier(node))
							{	node = context.factory.createIdentifier(name);
							}
						}
						else if (resolvedSymbol.flags & ts.SymbolFlags.Module)
						{	// namespace name is used as value, like `import * as ns from '...'; const ns2 = ns`
							const addNodesWithInfo = new Array<NodeWithInfo>;
							const nsName = exportSymbols.getNamespaceAsValue(ts, checker, context, sourceFile, knownSymbols, addNodesWithInfo, resolvedSymbol);
							for (const n of addNodesWithInfo)
							{	nodesWithInfo.splice(i++, 0, n);
							}
							node = context.factory.createIdentifier(nsName);
						}
					}
				}
				else if (ts.isShorthandPropertyAssignment(node))
				{	if (!node.objectAssignmentInitializer)
					{	const symbol = checker.getShorthandAssignmentValueSymbol(node);
						const resolvedSymbol = resolveSymbol(ts, checker, symbol);
						if (symbol && resolvedSymbol)
						{	const name = knownSymbols.symbolsNames.get(resolvedSymbol);
							if (name != undefined)
							{	if (name != symbol.name)
								{	node = context.factory.createPropertyAssignment(node.name, context.factory.createIdentifier(name));
								}
							}
						}
					}
				}
				else if (node == stmt)
				{	if (nodeExportType != NodeExportType.NONE)
					{	// Remove `export` and `default` keywords
						node = unexportStmt(ts, context, node);
						if (nodeExportType == NodeExportType.EXPORT_UNNAMED_DEFAULT)
						{	const name = introduces[0] && knownSymbols.symbolsNames.get(introduces[0]);
							if (name)
							{	// Add name to unnamed expression
								if (ts.isExpression(node))
								{	node = context.factory.createVariableStatement
									(	undefined,
										context.factory.createVariableDeclarationList
										(	[	context.factory.createVariableDeclaration
												(	name,
													undefined,
													undefined,
													node
												)
											],
											ts.NodeFlags.Const
										)
									);
								}
								else if (ts.isFunctionDeclaration(node))
								{	node = context.factory.updateFunctionDeclaration
									(	node,
										node.modifiers,
										node.asteriskToken,
										context.factory.createIdentifier(name),
										node.typeParameters,
										node.parameters,
										node.type,
										node.body
									);
								}
								else if (ts.isClassDeclaration(node))
								{	node = context.factory.updateClassDeclaration
									(	node,
										node.modifiers,
										context.factory.createIdentifier(name),
										node.typeParameters,
										node.heritageClauses,
										node.members
									);
								}
							}
						}
					}
					else if (ts.isExportAssignment(node) && sourceFile!=firstSourceFile) // If this is not the first entry point
					{	// Remove `export default` or `export =`
						node = context.factory.createExpressionStatement(node.expression);
					}
					// Create exports if not yet created
					if (!exportStmts)
					{	exportStmts = [];
						for (const exportStmt of exportSymbols.getExportStmts(ts, context, knownSymbols))
						{	exportStmts.push({sourceFile: firstSourceFile, node: exportStmt, refs: new Set, bodyRefs: new Set, introduces: [], nodeExportType: NodeExportType.NONE});
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

function unexportStmt(ts: typeof tsa, context: tsa.TransformationContext, node: tsa.Node)
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
	{	let m2 = modifiers.slice(0, i).concat(modifiers.slice(i+1));
		const j = m2?.findIndex(m => m.kind == ts.SyntaxKind.DefaultKeyword) ?? -1;
		if (j != -1)
		{	m2 = m2.slice(0, j).concat(m2.slice(j+1));
		}
		return m2;
	}
	return modifiers;
}

function transformNode
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