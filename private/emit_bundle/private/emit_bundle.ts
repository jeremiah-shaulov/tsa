import {tsa} from '../../tsa_ns.ts';
import {ExportSymbols} from './export_symbols.ts';
import {getNames, massSpliceRemove, nodeIsNs, resolveSymbol, transformNode, unexportStmt} from './util.ts';

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

export function emitBundle(ts: typeof tsa, program: tsa.DenoProgram, excludeLibDirectory: string)
{	let nodesWithInfo = new Array<NodeWithInfo>; // all the top-level statements (except `import` and `export`) from all modules
	let exportStmts: NodeWithInfo[] | undefined; // at the end i'll create `export {name1, name2, ...}`, and `export const ns = {...}`
	const symbolsNames = new Map<tsa.Symbol, string>; // maps all symbols that top-level statements declare, to their names in the result (they can be renamed)
	const namesSymbols = new Map<string, tsa.Symbol>; // the reverse of `symbolsNames`
	const nodesThatIntroduce = new Map<tsa.Symbol, NodeWithInfo>; // maps all top-level symbols, to elements in `nodesWithInfo`
	const allRefs = new Set<tsa.Symbol>; // all top-level symbols, that are referenced from somewhere (that appear in some `nodesWithInfo[I].refs` or `nodesWithInfo[I].bodyRefs`), so they're not a dead code
	const exportSymbols = new ExportSymbols; // symbols that the first entry point exports
	const sourceFiles = getSourceFiles(program, excludeLibDirectory);
	const checker = program.getTypeChecker();

	// 1. Index top-level symbols
	for (const sourceFile of sourceFiles)
	{	const isFirstEntryPoint = sourceFile == sourceFiles[0];
		for (const node of sourceFile.statements)
		{	if (ts.isExportDeclaration(node))
			{	if (isFirstEntryPoint)
				{	if (node.exportClause && ts.isNamedExports(node.exportClause))
					{	// `export {name1, name2}`
						for (const {name, propertyName} of node.exportClause.elements)
						{	const symbol = checker.getSymbolAtLocation(propertyName ?? name);
							const resolvedSymbol = resolveSymbol(ts, checker, symbol);
							if (resolvedSymbol)
							{	exportSymbols.addSymbol(resolvedSymbol, propertyName ? name : undefined);
							}
						}
					}
					else
					{	// `export * from 'name'`
						const moduleSymbol = node.moduleSpecifier && checker.getSymbolAtLocation(node.moduleSpecifier);
						if (moduleSymbol)
						{	const exportAsNs = node.exportClause && ts.isNamespaceExport(node.exportClause) ? node.exportClause.name : undefined;
							exportSymbols.addModuleSymbol(ts, checker, moduleSymbol, exportAsNs);
						}
					}
				}
			}
			else if (!ts.isImportDeclaration(node))
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
							{	exportSymbols.addSymbol(symbol, undefined);
							}
						}
					}
				}
				nodesWithInfo.push(nodeWithInfo);
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
		for (const symbol of exportSymbols.symbolsFlat)
		{	allRefs.add(symbol);
		}
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
					if (symbol && resolvedSymbol)
					{	const newName = symbolsNames.get(resolvedSymbol);
						if (newName != undefined)
						{	if (!ts.isIdentifier(node) || newName!=symbol.name)
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
					else if (ts.isExportAssignment(node) && nodeWithInfo.sourceFile!=sourceFiles[0]) // If this is not the first entry point
					{	// Remove `export default` or `export =`
						node = context.factory.createExpressionStatement(node.expression);
					}
					// Create exports if not yet created
					if (!exportStmts)
					{	exportStmts = [];
						const sourceFile = sourceFiles[0];
						for (const exportStmt of exportSymbols.getExportStmts(ts, context, symbolsNames))
						{	exportStmts.push({sourceFile, node: exportStmt, refs: new Set, bodyRefs: new Set, introduces: [], isExport: false});
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

function getSourceFiles(program: tsa.Program, excludeLibDirectory: string)
{	const sourceFiles = new Array<tsa.SourceFile>;
	for (const moduleHref of program.getRootFileNames())
	{	const sourceFile = program.getSourceFile(moduleHref);
		if (sourceFile)
		{	sourceFiles.push(sourceFile);
		}
	}
	for (const sourceFile of program.getSourceFiles().toSorted((a, b) => a.fileName < b.fileName ? -1 : a.fileName > b.fileName ? +1 : 0))
	{	if (!sourceFile.fileName.startsWith(excludeLibDirectory) && !sourceFiles.includes(sourceFile))
		{	sourceFiles.push(sourceFile);
		}
	}
	return sourceFiles;
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
								for (const p of nodesWithInfo.splice(i, j-i))
								{	nodesWithInfo[nodesWithInfo.length] = p;
								}
								//
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
								massSpliceRemove(nodesWithInfo, nodeIndices); // for each I, remove nodesWithInfo[nodeIndices[I]]
								nodesWithInfo.splice(i, 0, ...nodes); // insert `nodes` at `i`
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
	{	const i = nodesWithInfo.indexOf(found, fromNode);
		if (i==-1 || visited.includes(i))
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
