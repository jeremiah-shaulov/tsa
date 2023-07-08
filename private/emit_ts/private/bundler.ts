import {tsa} from '../../tsa_ns.ts';
import {Loader} from '../../load_options.ts';

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

export class Bundler
{	#nodesWithInfo = new Array<NodeWithInfo>;
	#exportStmts = new Array<NodeWithInfo>;
	#occupiedNames = new Map<string, tsa.Symbol>;
	#symbolRenames = new Map<tsa.Symbol, string>;

	addModule(ts: typeof tsa, checker: tsa.TypeChecker, loader: Loader, sourceFile: tsa.SourceFile, modulesHrefs: string[], entryPointNumber: number)
	{	const moduleScope = new Map<tsa.Symbol, tsa.Symbol>;
		const wantExport = new Map<tsa.Symbol, tsa.Identifier|undefined>;
		let curStmtRefs = new Set<tsa.Symbol>;
		let isNameFromNs = false;
		let substNameFromNs: tsa.Identifier|undefined;
		transformSourceFile
		(	ts,
			sourceFile,
			(node, level, context) =>
			{	if (level > 0)
				{	if (ts.isPropertyAccessExpression(node))
					{	if (substNameFromNs)
						{	node = substNameFromNs;
							substNameFromNs = undefined;
						}
						isNameFromNs = false;
					}
					else if (ts.isIdentifier(node))
					{	const symbol = checker.getSymbolAtLocation(node);
						if (symbol)
						{	// Is `node.parent` a property access like `ns.name`, where `ns` is a namespace alias (from `import * as ns`)?
							const isNameFromNsRightSide = isNameFromNs; // `isNameFromNs` was set in left side
							isNameFromNs ||= symbol.flags==ts.SymbolFlags.Alias && ts.isPropertyAccessExpression(node.parent) && symbol.getDeclarations()?.[0]?.kind==ts.SyntaxKind.NamespaceImport;
							if (!isNameFromNs || isNameFromNsRightSide)
							{	// Does current statement use a module-level symbol?
								const ref = moduleScope.get(symbol);
								if (ref)
								{	curStmtRefs.add(ref);
								}
								// Rename?
								const newName = this.#symbolRenames.get(ref ?? symbol) ?? (ref && ref.name!=symbol.name ? ref.name : undefined);
								const newNameNode = newName==undefined ? undefined : context.factory.createIdentifier(newName);
								if (isNameFromNsRightSide)
								{	substNameFromNs = newNameNode ?? node;
								}
								else if (newNameNode)
								{	node = newNameNode;
								}
							}
						}
					}
				}
				else
				{	if (entryPointNumber!=0 && ts.isExportAssignment(node)) // is `export default` or `export =`?
					{	node = context.factory.createExpressionStatement(node.expression); // remove `export default` if isn't first entry point
					}
					const {importFromHref, isExport, introduces, renames} = this.#addDeclaredSymbols(ts, checker, loader, sourceFile, context, node, moduleScope, entryPointNumber!=-1 ? wantExport : undefined);
					if (importFromHref)
					{	if (!modulesHrefs.includes(importFromHref))
						{	modulesHrefs.push(importFromHref);
						}
						curStmtRefs.clear();
						return [];
					}
					else
					{	let wantUnexport = isExport;
						if (isExport && entryPointNumber!=-1)
						{	if (!renames)
							{	wantUnexport = false;
							}
							else
							{	for (const symbol of introduces)
								{	wantExport.set(symbol, undefined);
								}
							}
						}
						if (wantUnexport || renames)
						{	node = unexportOrRenameStmt(ts, context, node, renames);
						}
						this.#nodesWithInfo.push({sourceFile, node, refs: curStmtRefs, introduces});
						curStmtRefs = new Set;
					}
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
					this.#exportStmts.push({sourceFile, node: exportStmt, refs: curStmtRefs, introduces: []});
				}
			}
		);
	}

	getResult(ts: typeof tsa)
	{	this.#reorderNodesAccordingToDependency(ts);
		for (const node of this.#exportStmts)
		{	this.#nodesWithInfo.push(node);
		}
		return this.#nodesWithInfo;
	}

	#addDeclaredSymbols
	(	ts: typeof tsa,
		checker: tsa.TypeChecker,
		loader: Loader,
		sourceFile: tsa.SourceFile,
		context: tsa.TransformationContext,
		node: tsa.Node,
		moduleScope: Map<tsa.Symbol, tsa.Symbol>,
		wantExport?: Map<tsa.Symbol, tsa.Identifier|undefined>
	)
	{	let importFromHref = '';
		let isExport = false;
		const introduces = new Array<tsa.Symbol>;
		let renames: Map<tsa.Identifier, tsa.Identifier> | undefined;
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
						renames.set(name, context.factory.createIdentifier(newName));
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
				isExport = true;
				if (wantExport)
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
							for (const symbol of symbols)
							{	wantExport.set(symbol, undefined);
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
		{	const name = this.#getUniqueName(symbol.name);
			this.#occupiedNames.set(name, symbol);
			this.#symbolRenames.set(symbol, name);
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

	#reorderNodesAccordingToDependency(ts: typeof tsa)
	{	const nodesWithInfo = this.#nodesWithInfo;
		let knownSymbols = new Set<tsa.Symbol>;
		const stack = new Array<{fromSourceFile: tsa.SourceFile, symbol: tsa.Symbol}>;
L:		for (let i=0, iEnd=nodesWithInfo.length; i<iEnd; i++)
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
								{	if (this.#getStmtsThatIntroduce(stack[j].symbol, newKnownSymbols, i, nodeIndices))
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

	#getStmtsThatIntroduce(symbol: tsa.Symbol, knownSymbols: Set<tsa.Symbol>, fromNode: number, outNodeIndices: number[])
	{	const nodesWithInfo = this.#nodesWithInfo;
		const found = nodesWithInfo.findIndex(n => n.introduces.includes(symbol));
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
				{	if (!this.#getStmtsThatIntroduce(ref, knownSymbols, fromNode, outNodeIndices))
					{	return false;
					}
				}
			}
		}
		return true;
	}

	debug()
	{	let str = '';
		const printer = tsa.createPrinter();
		for (const {sourceFile, node} of this.#nodesWithInfo)
		{	str += printer.printNode(tsa.EmitHint.Unspecified, node, sourceFile) + '\n';
		}
		return str;
	}
}

function transformSourceFile
(	ts: typeof tsa,
	sourceFile: tsa.SourceFile,
	visitor: (node: tsa.Node, level: number, context: tsa.TransformationContext) => tsa.VisitResult<tsa.Node>,
	onEnd: (context: tsa.TransformationContext) => void
)
{	const result = ts.transform(sourceFile, [transformerFactory]);
	return result.transformed[0];

	function transformerFactory(context: tsa.TransformationContext)
	{	let level = -1;

		return function(rootNode: tsa.Node)
		{	const result = ts.visitNode(rootNode, visit);
			onEnd(context);
			return result;
		};

		function visit(node: tsa.Node)
		{	level++;
			node = ts.visitEachChild(node, visit, context);
			level--;
			return level==-1 ? node : visitor(node, level, context);
		}
	}
}

function resolveSymbol(ts: typeof tsa, checker: tsa.TypeChecker, symbol?: tsa.Symbol)
{	if (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	symbol = checker.getAliasedSymbol(symbol);
	}
	return symbol;
}

function getNames(ts: typeof tsa, name: tsa.BindingName, outNames=new Array<tsa.Identifier>)
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

function unexportOrRenameStmt(ts: typeof tsa, context: tsa.TransformationContext, node: tsa.Node, renames?: Map<tsa.Identifier, tsa.Identifier>)
{	if (ts.isFunctionDeclaration(node))
	{	node = context.factory.updateFunctionDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			node.asteriskToken,
			(node.name && renames?.get(node.name)) ?? node.name,
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
			(node.name && renames?.get(node.name)) ?? node.name,
			node.typeParameters,
			node.heritageClauses,
			node.members
		);
	}
	else if (ts.isInterfaceDeclaration(node))
	{	node = context.factory.updateInterfaceDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			(node.name && renames?.get(node.name)) ?? node.name,
			node.typeParameters,
			node.heritageClauses,
			node.members
		);
	}
	else if (ts.isEnumDeclaration(node))
	{	node = context.factory.updateEnumDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			(node.name && renames?.get(node.name)) ?? node.name,
			node.members
		);
	}
	else if (ts.isTypeAliasDeclaration(node))
	{	node = context.factory.updateTypeAliasDeclaration
		(	node,
			unexportModifiers(ts, node.modifiers),
			(node.name && renames?.get(node.name)) ?? node.name,
			node.typeParameters,
			node.type
		);
	}
	else if (ts.isVariableStatement(node))
	{	node = context.factory.updateVariableStatement
		(	node,
			unexportModifiers(ts, node.modifiers),
			!renames ? node.declarationList : context.factory.updateVariableDeclarationList
			(	node.declarationList,
				node.declarationList.declarations.map
				(	d => context.factory.updateVariableDeclaration
					(	d,
						renameBindingName(ts, context, d.name, renames),
						d.exclamationToken,
						d.type,
						d.initializer
					)
				)
			)
		);
	}
	return node;
}

function unexportModifiers(ts: typeof tsa, modifiers?: tsa.NodeArray<tsa.ModifierLike>)
{	const i = modifiers?.findIndex(m => m.kind == ts.SyntaxKind.ExportKeyword) ?? -1;
	if (i==-1 || !modifiers)
	{	return modifiers;
	}
	else
	{	return modifiers.slice(0, i).concat(modifiers.slice(i+1))
	}
}

function renameBindingName(ts: typeof tsa, context: tsa.TransformationContext, name: tsa.BindingName, renames: Map<tsa.Identifier, tsa.Identifier>): tsa.BindingName
{	if (ts.isObjectBindingPattern(name))
	{	return context.factory.updateObjectBindingPattern
		(	name,
			name.elements.map
			(	d => context.factory.updateBindingElement
				(	d,
					d.dotDotDotToken,
					d.propertyName,
					renameBindingName(ts, context, d.name, renames),
					d.initializer
				)
			)
		);
	}
	else if (ts.isArrayBindingPattern(name))
	{	return context.factory.updateArrayBindingPattern
		(	name,
			name.elements.map
			(	d =>
				(	!ts.isBindingElement(d) ? d : context.factory.updateBindingElement
					(	d,
						d.dotDotDotToken,
						d.propertyName,
						renameBindingName(ts, context, d.name, renames),
						d.initializer
					)
				)
			)
		);
	}
	else
	{	return (name && renames.get(name)) ?? name;
	}
}

function symbolIsType(ts: typeof tsa, resolvedSymbol: tsa.Symbol)
{	return !!(resolvedSymbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias));
}
