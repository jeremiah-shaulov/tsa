import {tsa} from '../../tsa_ns.ts';
import {NodeExportType, NodeWithInfo} from './emit_bundle.ts';
import {KnownSymbols} from './known_symbols.ts';
import {ExportSymbols} from './export_symbols.ts';
import {isNamespaceButNotFromLib, resolveSymbol} from './util.ts';

export function step5TransformNodes
(	ts: typeof tsa,
	checker: tsa.TypeChecker,
	nodesWithInfo: NodeWithInfo[],
	knownSymbols: KnownSymbols,
	exportSymbols: ExportSymbols,
	firstSourceFile: tsa.SourceFile,
	excludeLibDirectory: string
)
{	const exportStmts = new Array<NodeWithInfo>; // at the end i'll create `export {name1, name2, ...}`,  `export const ns = {...}`, and `export default name3`
	for (let i=0; i<nodesWithInfo.length; i++)
	{	const nodeWithInfo = nodesWithInfo[i];
		const {sourceFile, node: stmt, introduces, nodeExportType} = nodeWithInfo;
		const exportDefaultDefForSubst = sourceFile!=firstSourceFile && ts.isExportAssignment(stmt) ? stmt.expression : undefined;
		nodeWithInfo.node = transformNode
		(	ts,
			stmt,
			(node, context) =>
			{	if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node) || ts.isQualifiedName(node))
				{	if (node != exportDefaultDefForSubst)
					{	const symbol = checker.getSymbolAtLocation(node);
						const resolvedSymbol = resolveSymbol(ts, checker, symbol);
						if (symbol && resolvedSymbol)
						{	const name = knownSymbols.symbolsNames.get(resolvedSymbol);
							if (name != undefined)
							{	if (name!=symbol.name || !ts.isIdentifier(node))
								{	node = context.factory.createIdentifier(name);
								}
							}
							else if (isNamespaceButNotFromLib(ts, excludeLibDirectory, resolvedSymbol))
							{	// namespace name is used as value, like `import * as ns from '...'; const ns2 = ns`
								const addNodesWithInfo = new Array<NodeWithInfo>;
								const nsName = exportSymbols.getNamespaceAsValue(ts, checker, context, sourceFile, excludeLibDirectory, knownSymbols, addNodesWithInfo, resolvedSymbol);
								for (const n of addNodesWithInfo)
								{	nodesWithInfo.splice(i++, 0, n);
								}
								node = context.factory.createIdentifier(nsName);
							}
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
				else if (ts.isBindingElement(node))
				{	if (!node.propertyName && ts.isIdentifier(node.name))
					{	const symbol = checker.getSymbolAtLocation(node.name);
						const resolvedSymbol = resolveSymbol(ts, checker, symbol);
						if (symbol && resolvedSymbol)
						{	const name = knownSymbols.symbolsNames.get(resolvedSymbol);
							if (name != undefined)
							{	if (name != symbol.name)
								{	node = context.factory.updateBindingElement
									(	node,
										node.dotDotDotToken,
										node.name,
										context.factory.createIdentifier(name),
										node.initializer
									);
								}
							}
						}
					}
				}
				return node;
			},
			(node, context) =>
			{	if (nodeExportType != NodeExportType.NONE)
				{	// Remove `export` and `default` keywords
					node = unexportStmt(ts, context, node);
					if (nodeExportType == NodeExportType.EXPORT_DEFAULT_UNNAMED)
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
				else if (exportDefaultDefForSubst)
				{	// Remove `export default` or `export =`
					const symbol = checker.getSymbolAtLocation(exportDefaultDefForSubst);
					const name = symbol && knownSymbols.symbolsNames.get(symbol);
					if (name)
					{	node = context.factory.createVariableStatement
						(	undefined,
							context.factory.createVariableDeclarationList
							(	[	context.factory.createVariableDeclaration
									(	name,
										undefined,
										undefined,
										exportDefaultDefForSubst
									)
								],
								ts.NodeFlags.Const
							)
						);
					}
					else
					{	node = context.factory.createExpressionStatement(exportDefaultDefForSubst);
					}
				}
				// Create exports if this is the last statement
				if (i == nodesWithInfo.length-1)
				{	exportSymbols.getExportStmts(ts, checker, context, firstSourceFile, excludeLibDirectory, knownSymbols, exportStmts);
				}
				return node;
			}
		);
	}
	for (const exportStmt of exportStmts)
	{	nodesWithInfo.push(exportStmt);
	}
	return exportStmts.length > 0;
}

function transformNode
(	ts: typeof tsa,
	node: tsa.Node,
	onEnter: (node: tsa.Node, context: tsa.TransformationContext) => tsa.Node,
	onEnd: (node: tsa.Node, context: tsa.TransformationContext) => tsa.Node
)
{	const result = ts.transform(node, [transformerFactory]);
	return result.transformed[0];

	function transformerFactory(context: tsa.TransformationContext)
	{	return function(rootNode: tsa.Node)
		{	rootNode = ts.visitNode(rootNode, visit);
			rootNode = onEnd(rootNode, context);
			return rootNode;
		};

		function visit(node: tsa.Node): tsa.Node
		{	let newNode = onEnter(node, context);
			if (newNode == node)
			{	newNode = ts.visitEachChild(node, visit, context);
			}
			return newNode;
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
