import {tsa} from '../../tsa_ns.ts';
import {getNames, nodeIsNs, resolveSymbol, symbolIsType, transformNode, unexportStmt} from './util.ts';

export type ResolveSync = (specifier: string, referrer: string) => string;

export type NodeWithInfo =
{	/**	From what file this node originates. Even if `node.getSourceFile()` returns undefined.
	 **/
	sourceFile: tsa.SourceFile,

	/**	The node.
	 **/
	node: tsa.Node;

	/**	What global symbols does this node reference (use).
	 **/
	refs: Set<tsa.Symbol>;

	/**	If this node introduces a function or a method, here is what the function body references.
	 **/
	bodyRefs: Set<tsa.Symbol>;

	/**	What global symbols does this node introduce (declare).
		For example:
		```ts
		let a = b + c;
		```
		References `b` and `c`, and introduces `a`.
	 **/
	introduces: tsa.Symbol[];

	/**	This statement introduces it's symbols with `export` keyword.
	 **/
	isExport: boolean;
};

export function emitBundle(ts: typeof tsa, program: tsa.DenoProgram, resolve: ResolveSync)
{	let nodesWithInfo = new Array<NodeWithInfo>; // all the top-level statements (except `import` and `export`) from all modules
	let exportStmts: NodeWithInfo[] | undefined; // at the end i'll create `export {name1, name2, ...}`, and `export const ns = {...}`
	const symbolsNames = new Map<tsa.Symbol, string>; // maps all symbols that top-level statements declare, to their names in the result (they can be renamed)
	const namesSymbols = new Map<string, tsa.Symbol>; // the reverse of `symbolsNames`
	const nodesThatIntroduce = new Map<tsa.Symbol, NodeWithInfo>; // maps all top-level symbols, to elements in `nodesWithInfo`
	const allRefs = new Set<tsa.Symbol>; // all top-level symbols, that are referenced from somewhere (that appear in some `nodesWithInfo[I].refs` or `nodesWithInfo[I].bodyRefs`), so they're not a dead code
	const wantExport = new Map<tsa.Symbol, tsa.Identifier|string|undefined>; // top-level symbols from the first entry point, that are marked as `export`
	const wantExportNs = new Map<tsa.Identifier, tsa.Symbol[]>; // top-level symbols from the first entry point, that are marked as `export * as ns`
	const entryPointsHrefs = program.getRootFileNames(); // entry points given to `createProgram()`
	const modulesHrefs = entryPointsHrefs.slice(); // i'll add to the entry points all referenced modules (that appear in `import from` and `export from`)
	const checker = program.getTypeChecker();

	// 1. Index top-level symbols
	for (let i=0; i<modulesHrefs.length; i++) // imported modules will be added to `modulesHrefs` while iterating
	{	const moduleHref = modulesHrefs[i];
		const sourceFile = program.getSourceFile(moduleHref);
		if (sourceFile)
		{	const isFirstEntryPoint = moduleHref == entryPointsHrefs[0];
			for (const node of sourceFile.statements)
			{	let moduleSpecifier;
				if (ts.isExportDeclaration(node))
				{	moduleSpecifier = node.moduleSpecifier;
					if (isFirstEntryPoint)
					{	if (node.exportClause && ts.isNamedExports(node.exportClause))
						{	// `export {name1, name2}`
							for (const {name, propertyName} of node.exportClause.elements)
							{	const symbol = checker.getSymbolAtLocation(propertyName ?? name);
								const resolvedSymbol = resolveSymbol(ts, checker, symbol);
								if (resolvedSymbol)
								{	wantExport.set(resolvedSymbol, propertyName ? name : undefined);
								}
							}
						}
						else
						{	// `export * from 'name'`
							const moduleSymbol = moduleSpecifier && checker.getSymbolAtLocation(moduleSpecifier);
							if (moduleSymbol)
							{	const symbols = checker.getExportsOfModule(moduleSymbol);
								const exportAs = node.exportClause && ts.isNamespaceExport(node.exportClause) ? node.exportClause.name : undefined; // TODO: ...
								if (!exportAs)
								{	for (const symbol of symbols)
									{	wantExport.set(symbol, undefined);
									}
								}
								else
								{	wantExportNs.set(exportAs, symbols);
								}
							}
						}
					}
				}
				else if (ts.isImportDeclaration(node))
				{	moduleSpecifier = node.moduleSpecifier;
				}
				else
				{	const introduces = new Array<tsa.Symbol>;
					const nodeWithInfo: NodeWithInfo = {sourceFile, node, refs: new Set, bodyRefs: new Set, introduces, isExport: false};
					if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableStatement(node))
					{	const isExport = !!node.modifiers?.some(m => m.kind == ts.SyntaxKind.ExportKeyword);
						nodeWithInfo.isExport = isExport;
						const names = ts.isVariableStatement(node) ? node.declarationList.declarations.flatMap(v => getNames(ts, v.name)) : node.name ? [node.name] : [];
						for (const name of names)
						{	const symbol = checker.getSymbolAtLocation(name);
							if (symbol)
							{	addSymbol(symbolsNames, namesSymbols, symbol);
								introduces.push(symbol);
								nodesThatIntroduce.set(symbol, nodeWithInfo);
								if (isExport && isFirstEntryPoint)
								{	wantExport.set(symbol, undefined);
								}
							}
						}
					}
					nodesWithInfo.push(nodeWithInfo);
				}
				if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier))
				{	const importHref = resolve(moduleSpecifier.text, moduleHref);
					if (!modulesHrefs.includes(importHref))
					{	modulesHrefs.push(importHref);
					}
				}
			}
		}
	}

	// 2. Find what symbol does each statement reference (use)
	for (const {node, refs, bodyRefs, introduces} of nodesWithInfo)
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

	// 3. Remove dead code. However classes and function used in type aliases will remain.
	while (true)
	{	allRefs.clear();
		for (const {refs, bodyRefs} of nodesWithInfo)
		{	for (const ref of refs)
			{	allRefs.add(ref);
			}
			for (const ref of bodyRefs)
			{	allRefs.add(ref);
			}
		}
		const {length} = nodesWithInfo;
		nodesWithInfo = nodesWithInfo.filter(n => n.introduces.length==0 || n.introduces.some(s => allRefs.has(s)));
		if (length == nodesWithInfo.length)
		{	break;
		}
	}

	// 4. Reorder statements according to dependency
	reorderStmtsAccordingToDependency(ts, nodesWithInfo, nodesThatIntroduce);

	// 5. Rename symbols, and create exports
	for (const nodeWithInfo of nodesWithInfo)
	{	const stmt = nodeWithInfo.node;
		nodeWithInfo.node = transformNode
		(	ts,
			stmt,
			(node, context) =>
			{	if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node) || ts.isQualifiedName(node))
				{	const symbol = checker.getSymbolAtLocation(node);
					const resolvedSymbol = resolveSymbol(ts, checker, symbol);
					if (resolvedSymbol)
					{	const newName = symbolsNames.get(resolvedSymbol);
						if (newName != undefined)
						{	if (!ts.isIdentifier(node) || newName!=resolvedSymbol.name)
							{	node = context.factory.createIdentifier(newName);
							}
						}
					}
				}
				else if (node == stmt)
				{	const {isExport} = nodeWithInfo;
					if (isExport)
					{	// Remove `export` keyword
						node = unexportStmt(ts, context, node);
					}
					else if (ts.isExportAssignment(node) && nodeWithInfo.sourceFile.fileName!=entryPointsHrefs[0]) // If this is not the first entry point
					{	// Remove `export default` or `export =`
						node = context.factory.createExpressionStatement(node.expression);
					}
					// Create exports if not yet created
					if (!exportStmts)
					{	exportStmts = [];
						const sourceFile = program.getSourceFile(entryPointsHrefs[0]) ?? nodeWithInfo.sourceFile;
						if (wantExport.size)
						{	const exportStmt = context.factory.createExportDeclaration
							(	undefined,
								false,
								context.factory.createNamedExports
								(	[...wantExport.entries()].map
									(	([e, alias]) =>
										{	const name = symbolsNames.get(e);
											return context.factory.createExportSpecifier(symbolIsType(ts, e), name!=e.name ? name : alias && e.name, alias ?? e.name);
										}
									)
								)
							);
							exportStmts.push({sourceFile, node: exportStmt, refs: new Set, bodyRefs: new Set, introduces: [], isExport: false});
						}
						for (const [alias, symbols] of wantExportNs)
						{	const values = symbols.filter(s => !symbolIsType(ts, s));
							if (values.length)
							{	const exportStmt = context.factory.createVariableStatement
								(	[context.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
									context.factory.createVariableDeclarationList
									(	[	context.factory.createVariableDeclaration
											(	alias,
												undefined,
												undefined,
												createNamespace(ts, checker, context, symbolsNames, values)
											)
										],
										ts.NodeFlags.Const
									)
								);
								exportStmts.push({sourceFile, node: exportStmt, refs: new Set, bodyRefs: new Set, introduces: [], isExport: false});
							}
						}
					}
				}
				return node;
			}
		);
	}

	// 6. Done
	return !exportStmts ? nodesWithInfo : nodesWithInfo.concat(exportStmts);
}

function setUsedTopLevelSymbols(ts: typeof tsa, checker: tsa.TypeChecker, symbolsNames: Map<tsa.Symbol, string>, node: tsa.Node|undefined, introduces: tsa.Symbol[], refs: Set<tsa.Symbol>)
{	node?.forEachChild(visit);

	function visit(node: tsa.Node)
	{	node.forEachChild(visit);
		if (ts.isIdentifier(node))
		{	const symbol = checker.getSymbolAtLocation(node);
			if (symbol && !nodeIsNs(ts, checker, node, symbol))
			{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
				if (resolvedSymbol && symbolsNames.has(resolvedSymbol) && !introduces.includes(resolvedSymbol)) // If resolves to a top-level symbol
				{	refs.add(resolvedSymbol);
				}
			}
		}
	}
}

function addSymbol(symbolsNames: Map<tsa.Symbol, string>, namesSymbols: Map<string, tsa.Symbol>, symbol: tsa.Symbol)
{	if (symbolsNames.get(symbol) == undefined)
	{	const name = !namesSymbols.get(symbol.name) ? symbol.name : getUniqueName(namesSymbols, symbol.name);
		symbolsNames.set(symbol, name);
		namesSymbols.set(name, symbol);
	}
}

function getUniqueName(namesSymbols: Map<string, tsa.Symbol>, base: string)
{	for (let i=2; true; i++)
	{	const name = base + i.toString(16);
		if (!namesSymbols.has(name))
		{	return name;
		}
	}
}

function reorderStmtsAccordingToDependency(ts: typeof tsa, nodesWithInfo: NodeWithInfo[], nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>)
{	let knownSymbols = new Set<tsa.Symbol>;
	const stack = new Array<{fromSourceFile: tsa.SourceFile, symbol: tsa.Symbol}>;
L:	for (let i=0, iEnd=nodesWithInfo.length; i<iEnd; i++)
	{	const nodeWithInfo = nodesWithInfo[i];
		const {sourceFile, refs, introduces} = nodeWithInfo;
		for (const symbol of refsIter(ts, nodesThatIntroduce, refs))
		{	if (!knownSymbols.has(symbol)) // If this stmt depends on symbol not introduced yet
			{	// Find what module introduces this symbol
				const toSourceFile = nodesThatIntroduce.get(symbol)?.sourceFile;
				if (toSourceFile)
				{	if (!stack.some(s => s.fromSourceFile == toSourceFile))
					{	// Find where this module begins
						for (let j=i+1; j<iEnd; j++)
						{	if (nodesWithInfo[j].sourceFile == toSourceFile)
							{	// Want to bring `nodesWithInfo[i .. j]` to the end of array
								const part = nodesWithInfo.splice(i, j-i);
								nodesWithInfo.splice(nodesWithInfo.length, 0, ...part);
								stack.push({fromSourceFile: sourceFile, symbol});
								i--;
								continue L;
							}
						}
					}
					else
					{	// Circular dependency
						let newKnownSymbols = new Set(knownSymbols.values());
						const nodeIndices = new Array<number>;
						for (let j=stack.length-1; j>=0; j--)
						{	if (getNodesThatIntroduce(ts, nodesWithInfo, nodesThatIntroduce, stack[j].symbol, newKnownSymbols, i, nodeIndices))
							{	const nodes = nodeIndices.map(k => nodesWithInfo[k]);
								nodeIndices.sort((a, b) => b - a); // descendant order
								for (const k of nodeIndices)
								{	nodesWithInfo.splice(k, 1);
								}
								nodesWithInfo.splice(i, 0, ...nodes);
								knownSymbols = newKnownSymbols;
								i += nodes.length - 1;
								stack.length = 0;
								continue L;
							}
							newKnownSymbols = new Set(knownSymbols.values());
							nodeIndices.length = 0;
						}
						console.error(`Modules circular dependency: ${stack.map(s => s.fromSourceFile.fileName).join(' -> ')} -> ${toSourceFile.fileName}`);
					}
				}
			}
		}
		for (const symbol of introduces)
		{	knownSymbols.add(symbol);
		}
		stack.length = 0;
	}
}

function *refsIter(ts: typeof tsa, nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>, refs: Set<tsa.Symbol>, visited=new Set<tsa.Symbol>): Generator<tsa.Symbol>
{	for (const symbol of refs)
	{	if (!visited.has(symbol))
		{	visited.add(symbol);
			if (!(symbol.flags & (ts.SymbolFlags.TypeAlias | ts.SymbolFlags.Interface))) // types can be declared later
			{	if (symbol.flags & ts.SymbolFlags.Function) // functions can be declared later, but i depend on what their body references
				{	const bodyRefs = nodesThatIntroduce.get(symbol)?.bodyRefs;
					if (bodyRefs)
					{	for (const symbol2 of refsIter(ts, nodesThatIntroduce, bodyRefs, visited))
						{	yield symbol2;
						}
					}
				}
				else // TODO: class
				{	yield symbol;
				}
			}
		}
	}
}

function getNodesThatIntroduce(ts: typeof tsa, nodesWithInfo: NodeWithInfo[], nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>, symbol: tsa.Symbol, knownSymbols: Set<tsa.Symbol>, fromNode: number, outNodeIndices: number[], visited=new Array<number>)
{	const found = nodesThatIntroduce.get(symbol);
	knownSymbols.add(symbol);
	if (found)
	{	const i = nodesWithInfo.indexOf(found);
		if (i<fromNode || visited.includes(i))
		{	return false;
		}
		visited.push(i);
		const {refs, introduces} = found;
		for (const ref of refsIter(ts, nodesThatIntroduce, refs))
		{	if (!knownSymbols.has(ref))
			{	if (!getNodesThatIntroduce(ts, nodesWithInfo, nodesThatIntroduce, ref, knownSymbols, fromNode, outNodeIndices, visited))
				{	return false;
				}
			}
		}
		for (const symbol of introduces)
		{	knownSymbols.add(symbol);
		}
		outNodeIndices.push(i);
	}
	return true;
}

function createNamespace(ts: typeof tsa, checker: tsa.TypeChecker, context: tsa.TransformationContext, symbolsNames: Map<tsa.Symbol, string>, symbols: tsa.Symbol[]): tsa.ObjectLiteralExpression
{	return context.factory.createObjectLiteralExpression
	(	symbols.map
		(	symbol =>
			{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
				if (resolvedSymbol.flags & ts.SymbolFlags.Module)
				{	return context.factory.createPropertyAssignment
					(	symbol.name,
						createNamespace(ts, checker, context, symbolsNames, checker.getExportsOfModule(resolvedSymbol).filter(s => !symbolIsType(ts, s)))
					);
				}
				else if (!symbolsNames.has(symbol))
				{	return context.factory.createShorthandPropertyAssignment(symbol.name);
				}
				else
				{	return context.factory.createPropertyAssignment
					(	symbol.name,
						context.factory.createIdentifier(symbolsNames.get(symbol) ?? symbol.name)
					);
				}
			}
		)
	);
}
