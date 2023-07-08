import {tsa} from '../../tsa_ns.ts';
import {Loader} from '../../load_options.ts';
import {transformSourceFile, visitSourceFile} from './visit_source_file.ts';
import {getNames, resolveSymbol, symbolIsNameFromNs, symbolIsType, unexportOrRenameStmt} from './util.ts';

// TODO: ExportDeclaration

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

	/**	What global symbols does this node introduce (declare).
		For example:
		```ts
		let a = b + c;
		```
		References `b` and `c`, and introduces `a`.
	 **/
	introduces: tsa.Symbol[];
};

type Module =
{	substNodes: Map<tsa.Node, tsa.Node|string>;
	entryPointNumber: number;
	wantExport: Map<tsa.Symbol, tsa.Identifier|undefined>;
	wantExportNs: Map<tsa.Identifier, tsa.Symbol[]>;
	nodesInfo: Array<NodeInfo | undefined>;
};

type NodeInfo =
{	refs: Set<tsa.Symbol>;
	introduces: tsa.Symbol[];
	wantUnexport: boolean;
	renames?: Map<tsa.Identifier, string>;
};

export class Bundler
{	#occupiedNames = new Map<string, tsa.Symbol>;
	#symbolRenames = new Map<tsa.Symbol, string>;
	#modules = new Map<tsa.SourceFile, Module>;

	addModule(ts: typeof tsa, checker: tsa.TypeChecker, loader: Loader, sourceFile: tsa.SourceFile, modulesHrefs: string[], entryPointNumber: number)
	{	const moduleScope = new Map<tsa.Symbol, tsa.Symbol>;
		const wantExport = new Map<tsa.Symbol, tsa.Identifier|undefined>;
		const wantExportNs = new Map<tsa.Identifier, tsa.Symbol[]>;
		let curStmtRefs = new Set<tsa.Symbol>;
		let isNameFromNs = false;
		const substNodes = new Map<tsa.Node, tsa.Node|string>;
		const nodesInfo = new Array<NodeInfo | undefined>;
		this.#modules.set(sourceFile, {substNodes, entryPointNumber, wantExport, wantExportNs, nodesInfo});
		visitSourceFile
		(	sourceFile,
			(node, level) =>
			{	if (level > 0)
				{	if (ts.isIdentifier(node))
					{	const symbol = checker.getSymbolAtLocation(node);
						if (symbol)
						{	// Is `node.parent` a property access like `ns.name`, where `ns` is a namespace alias (from `import * as ns`)?
							const isNameFromNsRightSide = isNameFromNs; // `isNameFromNs` was set in left side
							isNameFromNs ||= symbolIsNameFromNs(ts, symbol, node);
							if (!isNameFromNs || isNameFromNsRightSide)
							{	// Does current statement use a module-level symbol?
								const ref = moduleScope.get(symbol);
								if (ref)
								{	curStmtRefs.add(ref);
								}
								// Rename?
								const newName = this.#symbolRenames.get(ref ?? symbol) ?? (ref && ref.name!=symbol.name ? ref.name : undefined);
								if (isNameFromNsRightSide)
								{	substNodes.set(node.parent, newName ?? node);
								}
								else if (newName != undefined)
								{	substNodes.set(node, newName);
								}
							}
						}
					}
				}
				else
				{	const {importFromHref, isExport, introduces, renames} = this.#addDeclaredSymbols
					(	ts,
						checker,
						loader,
						sourceFile,
						node,
						moduleScope,
						entryPointNumber!=-1 ? wantExport : undefined,
						entryPointNumber!=-1 ? wantExportNs : undefined
					);
					let wantUnexport = isExport;
					if (importFromHref)
					{	if (!modulesHrefs.includes(importFromHref))
						{	modulesHrefs.push(importFromHref);
						}
						nodesInfo.push(undefined);
					}
					else
					{	if (isExport && entryPointNumber!=-1)
						{	if (!renames)
							{	wantUnexport = false;
							}
							else
							{	for (const symbol of introduces)
								{	wantExport.set(symbol, undefined);
								}
							}
						}
						nodesInfo.push({refs: curStmtRefs, introduces, wantUnexport, renames});
					}
					curStmtRefs = new Set;
				}
				return node;
			}
		);
	}

	getResult(ts: typeof tsa, checker: tsa.TypeChecker)
	{	const {nodesWithInfo, exportStmts} = this.#applyNodesSubstitution(ts, checker);
		reorderNodesAccordingToDependency(ts, nodesWithInfo);
		return nodesWithInfo.concat(exportStmts);
	}

	#addDeclaredSymbols
	(	ts: typeof tsa,
		checker: tsa.TypeChecker,
		loader: Loader,
		sourceFile: tsa.SourceFile,
		node: tsa.Node,
		moduleScope: Map<tsa.Symbol, tsa.Symbol>,
		wantExport?: Map<tsa.Symbol, tsa.Identifier|undefined>,
		wantExportNs?: Map<tsa.Identifier, tsa.Symbol[]>
	)
	{	let importFromHref = '';
		let isExport = false;
		const introduces = new Array<tsa.Symbol>;
		let renames: Map<tsa.Identifier, string> | undefined;
		if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableStatement(node))
		{	isExport = !!node.modifiers?.some(m => m.kind & ts.SyntaxKind.ExportKeyword);
			const names = ts.isVariableStatement(node) ? node.declarationList.declarations.flatMap(v => getNames(ts, v.name)) : node.name ? [node.name] : [];
			for (const name of names)
			{	const symbol = checker.getSymbolAtLocation(name);
				if (symbol)
				{	moduleScope.set(symbol, symbol);
					introduces.push(symbol);
					const newName = this.#occupyName(symbol);
					if (newName != undefined)
					{	if (!renames)
						{	renames = new Map;
						}
						renames.set(name, newName);
					}
				}
			}
		}
		else if (ts.isImportDeclaration(node))
		{	if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier))
			{	importFromHref = loader.resolved(node.moduleSpecifier.text, sourceFile.fileName);
				const namedBindings = node.importClause?.namedBindings;
				if (namedBindings)
				{	if (ts.isNamedImports(namedBindings))
					{	for (const {name} of namedBindings.elements ?? [])
						{	const symbol = checker.getSymbolAtLocation(name);
							const resolvedSymbol = resolveSymbol(ts, checker, symbol);
							if (symbol && resolvedSymbol)
							{	moduleScope.set(symbol, resolvedSymbol);
								this.#occupyName(resolvedSymbol);
							}
						}
					}
					else
					{	const moduleSymbol = checker.getSymbolAtLocation(node.moduleSpecifier);
						if (moduleSymbol)
						{	const symbols = checker.getExportsOfModule(moduleSymbol);
							for (const symbol of symbols)
							{	moduleScope.set(symbol, symbol);
								this.#occupyName(symbol);
							}
						}
					}
				}
			}
		}
		else if (ts.isExportDeclaration(node))
		{	if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) // TODO: without `moduleSpecifier`
			{	importFromHref = loader.resolved(node.moduleSpecifier.text, sourceFile.fileName);
				if (wantExport && wantExportNs)
				{	if (node.exportClause && ts.isNamedExports(node.exportClause))
					{	// `export {name1, name2} ...`
						for (const {name, propertyName} of node.exportClause.elements)
						{	const symbol = checker.getSymbolAtLocation(propertyName ?? name);
							const resolvedSymbol = resolveSymbol(ts, checker, symbol);
							if (resolvedSymbol)
							{	wantExport.set(resolvedSymbol, propertyName ? name : undefined);
							}
						}
					}
					else
					{	// `export * ...`
						const moduleSymbol = checker.getSymbolAtLocation(node.moduleSpecifier);
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
		}
		return {importFromHref, isExport, introduces, renames};
	}

	#occupyName(symbol: tsa.Symbol)
	{	const curSymbol = this.#occupiedNames.get(symbol.name);
		if (!curSymbol)
		{	this.#occupiedNames.set(symbol.name, symbol);
		}
		else if (curSymbol != symbol)
		{	let name = this.#symbolRenames.get(symbol);
			if (name == undefined)
			{	name = this.#getUniqueName(symbol.name);
				this.#occupiedNames.set(name, symbol);
				this.#symbolRenames.set(symbol, name);
			}
			return name;
		}
	}

	#getUniqueName(base: string)
	{	for (let i=2; true; i++)
		{	const name = base + i.toString(16);
			if (!this.#occupiedNames.has(name))
			{	return name;
			}
		}
	}

	#applyNodesSubstitution(ts: typeof tsa, checker: tsa.TypeChecker)
	{	const nodesWithInfo = new Array<NodeWithInfo>;
		const exportStmts = new Array<NodeWithInfo>;
		for (const [sourceFile, {substNodes, entryPointNumber, wantExport, wantExportNs, nodesInfo}] of this.#modules)
		{	let nStmt = 0;
			transformSourceFile
			(	ts,
				sourceFile,
				(node, level, context) =>
				{	if (level > 0)
					{	let subst = substNodes.get(node);
						if (typeof(subst) == 'string')
						{	subst = context.factory.createIdentifier(subst);
						}
						return subst ?? node;
					}
					const topLevelNode = nodesInfo[nStmt++];
					if (topLevelNode)
					{	const {refs, introduces, wantUnexport, renames} = topLevelNode;
						if (wantUnexport || renames)
						{	node = unexportOrRenameStmt(ts, context, node, wantUnexport, renames);
						}
						if (entryPointNumber!=0 && ts.isExportAssignment(node)) // is `export default` or `export =`?
						{	node = context.factory.createExpressionStatement(node.expression); // remove `export default` if isn't first entry point
						}
						nodesWithInfo.push({sourceFile, node, refs, introduces});
					}
					return node;
				},
				context =>
				{	if (wantExport.size)
					{	const exportStmt = context.factory.createExportDeclaration
						(	undefined,
							false,
							context.factory.createNamedExports
							(	[...wantExport.entries()].map
								(	([e, rename]) => context.factory.createExportSpecifier(symbolIsType(ts, e), this.#symbolRenames.get(e) ?? (rename && e.name), rename ?? e.name)
								)
							)
						);
						exportStmts.push({sourceFile, node: exportStmt, refs: new Set, introduces: []});
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
											this.#createNamespace(ts, checker, context, values)
										)
									],
									ts.NodeFlags.Const
								)
							);
							exportStmts.push({sourceFile, node: exportStmt, refs: new Set, introduces: []});
						}
					}
				}
			);
		}
		return {nodesWithInfo, exportStmts};
	}

	#createNamespace(ts: typeof tsa, checker: tsa.TypeChecker, context: tsa.TransformationContext, symbols: tsa.Symbol[]): tsa.ObjectLiteralExpression
	{	return context.factory.createObjectLiteralExpression
		(	symbols.map
			(	s => s.flags & ts.SymbolFlags.Alias ?
					context.factory.createPropertyAssignment
					(	s.name,
						this.#createNamespace(ts, checker, context, checker.getExportsOfModule(resolveSymbol(ts, checker, s) ?? s).filter(s => !symbolIsType(ts, s)))
					)
				: !this.#symbolRenames.has(s) ?
					context.factory.createShorthandPropertyAssignment(s.name)
				:
					context.factory.createPropertyAssignment
					(	s.name,
						context.factory.createIdentifier(this.#symbolRenames.get(s) ?? s.name)
					)
			)
		);

		/*if (types.length)
		{	const nsStmt = context.factory.createModuleDeclaration
			(	[context.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
				alias,
				context.factory.createModuleBlock
				(	symbols.map
					(	s => symbolIsType(ts, s) ?
							context.factory.createTypeAliasDeclaration
							(	[context.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
								context.factory.createIdentifier(s.name),
								undefined,
								context.factory.createTypeReferenceNode(s.name)
							)
						:
							context.factory.createVariableStatement
							(	[context.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
								context.factory.createVariableDeclarationList
								(	[	context.factory.createVariableDeclaration
										(	s.name,
											undefined,
											undefined,
											d.initializer
										)
									],
									ts.NodeFlags.Const
								)
							)
					)
				)
			);
			exportStmts.push({sourceFile, node: nsStmt, refs: new Set, introduces: []});
		}*/
	}

	debug(nodesWithInfo: NodeWithInfo[])
	{	let str = '';
		const printer = tsa.createPrinter();
		for (const {sourceFile, node} of nodesWithInfo)
		{	str += printer.printNode(tsa.EmitHint.Unspecified, node, sourceFile) + '\n';
		}
		return str;
	}
}

function getStmtsThatIntroduce(nodesWithInfo: NodeWithInfo[], symbol: tsa.Symbol, knownSymbols: Set<tsa.Symbol>, fromNode: number, outNodeIndices: number[])
{	const found = nodesWithInfo.findIndex(n => n.introduces.includes(symbol));
	knownSymbols.add(symbol);
	if (found != -1)
	{	if (found<fromNode || outNodeIndices.includes(found))
		{	return false;
		}
		outNodeIndices.push(found);
		const {refs, introduces} = nodesWithInfo[found];
		for (const symbol of introduces)
		{	knownSymbols.add(symbol);
		}
		for (const ref of refs)
		{	if (!knownSymbols.has(ref) && !introduces.includes(ref))
			{	if (!getStmtsThatIntroduce(nodesWithInfo, ref, knownSymbols, fromNode, outNodeIndices))
				{	return false;
				}
			}
		}
	}
	return true;
}

function reorderNodesAccordingToDependency(ts: typeof tsa, nodesWithInfo: NodeWithInfo[])
{	let knownSymbols = new Set<tsa.Symbol>;
	const stack = new Array<{fromSourceFile: tsa.SourceFile, symbol: tsa.Symbol}>;
L:	for (let i=0, iEnd=nodesWithInfo.length; i<iEnd; i++)
	{	const nodeWithInfo = nodesWithInfo[i];
		const {sourceFile, refs, introduces} = nodeWithInfo;
		for (const symbol of refs)
		{	if (!(symbol.flags & ts.SymbolFlags.Function)) // functions can be declared later
			{	if (!knownSymbols.has(symbol) && !introduces.includes(symbol)) // If this stmt depends on symbol not introduced yet
				{	// Find what module introduces this symbol
					const toSourceFile = nodesWithInfo.find(n => n.introduces.includes(symbol))?.sourceFile;
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
							{	if (getStmtsThatIntroduce(nodesWithInfo, stack[j].symbol, newKnownSymbols, i, nodeIndices))
								{	const nodes = nodeIndices.map(k => nodesWithInfo[k]);
									nodeIndices.sort((a, b) => b - a); // descendant order
									for (const k of nodeIndices)
									{	nodesWithInfo.splice(k, 1);
									}
									nodesWithInfo.splice(i, 0, ...nodes.reverse());
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
		}
		for (const symbol of introduces)
		{	knownSymbols.add(symbol);
		}
		stack.length = 0;
	}
}
