import {tsa} from '../../tsa_ns.ts';
import {Loader} from '../../load_options.ts';

type NodeWithInfo =
{	sourceFile: tsa.SourceFile,
	node: tsa.Node;
	refs: Set<tsa.Symbol>;
	introduces: tsa.Symbol[];
};

export function emitTs(ts: typeof tsa, program: tsa.DenoProgram, loader: Loader, newLine='\n')
{	const checker = program.getTypeChecker();
	const printer = ts.createPrinter();
	const entryPointsHrefs = program.getRootFileNames();
	const modulesHrefs = entryPointsHrefs.slice();
	// Create bundler and add modules to it
	const bundler = new Bundler;
	for (let i=0; i<modulesHrefs.length; i++)
	{	const moduleHref = modulesHrefs[i];
		const sourceFile = program.getSourceFile(moduleHref);
		if (sourceFile)
		{	bundler.addModule(ts, checker, loader, sourceFile, modulesHrefs);
		}
	}
	// Reordered nodes according to dependency
	bundler.reorderNodesAccordingToDependency();
	// Print nodes
	let bundlerResult = '';
	for (const {sourceFile, node} of bundler.nodesWithInfo)
	{	bundlerResult += printer.printNode(ts.EmitHint.Unspecified, node, sourceFile) + newLine;
	}
	// Done
	return bundlerResult;
}

class Bundler
{	nodesWithInfo = new Array<NodeWithInfo>;

	addModule(ts: typeof tsa, checker: tsa.TypeChecker, loader: Loader, sourceFile: tsa.SourceFile, modulesHrefs: string[])
	{	const moduleDecls = new Map<tsa.Symbol, tsa.Symbol>;
		let curStmtRefs = new Set<tsa.Symbol>;
		transformSourceFile
		(	ts,
			sourceFile,
			(node, level, context) =>
			{	if (level > 0)
				{	if (ts.isIdentifier(node))
					{	const symbol = checker.getSymbolAtLocation(node);
						const ref = symbol && !(symbol.flags & ts.SymbolFlags.Function) && moduleDecls.get(symbol); // functions can be declared later
						if (ref)
						{	curStmtRefs.add(ref);
						}
					}
				}
				else
				{	const {importFromHref, isExport, introduces} = addDeclaredSymbols(ts, checker, loader, sourceFile, node, moduleDecls);
					if (importFromHref)
					{	if (!modulesHrefs.includes(importFromHref))
						{	modulesHrefs.push(importFromHref);
						}
						curStmtRefs.clear();
						return [];
					}
					else
					{	if (isExport)
						{	node = unexportStmt(ts, node, context);
						}
						this.nodesWithInfo.push({sourceFile, node, refs: curStmtRefs, introduces});
						curStmtRefs = new Set;
					}
				}
				return node;
			}
		);
	}

	reorderNodesAccordingToDependency()
	{	const {nodesWithInfo} = this;
		const knownSymbols = new Set<tsa.Symbol>;
		const stack = new Array<{fromSourceFile: tsa.SourceFile, symbol: tsa.Symbol}>;
L:		for (let i=0, iEnd=nodesWithInfo.length; i<iEnd; i++)
		{	const nodeWithInfo = nodesWithInfo[i];
			const {sourceFile, refs, introduces} = nodeWithInfo;
			for (const symbol of refs)
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
							{	if (this.getStmtsThatIntroduce(stack[j].symbol, newKnownSymbols, i, nodeIndices))
								{	const nodes = nodeIndices.map(k => nodesWithInfo[k]);
									nodeIndices.sort((a, b) => b - a); // descendant order
									for (const k of nodeIndices)
									{	nodesWithInfo.splice(k, 1);
									}
									nodesWithInfo.splice(i, 0, ...nodes.reverse());
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

	getStmtsThatIntroduce(symbol: tsa.Symbol, knownSymbols: Set<tsa.Symbol>, fromNode: number, outNodeIndices: number[])
	{	const {nodesWithInfo} = this;
		const found = nodesWithInfo.findIndex(n => n.introduces.includes(symbol));
		knownSymbols.add(symbol);
		if (found != -1)
		{	if (found<=fromNode || outNodeIndices.includes(found))
			{	return false;
			}
			outNodeIndices.push(found);
			const {refs, introduces} = nodesWithInfo[found];
			for (const symbol of introduces)
			{	knownSymbols.add(symbol);
			}
			for (const ref of refs)
			{	if (!knownSymbols.has(ref) && !introduces.includes(ref))
				{	if (!this.getStmtsThatIntroduce(ref, knownSymbols, fromNode, outNodeIndices))
					{	return false;
					}
				}
			}
		}
		return true;
	}

	debug()
	{	const printer = tsa.createPrinter();
		let str = '';
		for (const {sourceFile, node} of this.nodesWithInfo)
		{	str += printer.printNode(tsa.EmitHint.Unspecified, node, sourceFile) + '\n';
		}
		return str;
	}
}

function transformSourceFile(ts: typeof tsa, sourceFile: tsa.SourceFile, visitor: (node: tsa.Node, level: number, context: tsa.TransformationContext) => tsa.VisitResult<tsa.Node>)
{	const result = ts.transform(sourceFile, [transformerFactory]);
	return result.transformed[0];

	function transformerFactory(context: tsa.TransformationContext)
	{	let level = -1;

		return function(rootNode: tsa.Node)
		{	return ts.visitNode(rootNode, visit);
		};

		function visit(node: tsa.Node)
		{	level++;
			node = ts.visitEachChild(node, visit, context);
			level--;
			return level==-1 ? node : visitor(node, level, context);
		}
	}
}

function addDeclaredSymbols(ts: typeof tsa, checker: tsa.TypeChecker, loader: Loader, sourceFile: tsa.SourceFile, node: tsa.Node, moduleDecls: Map<tsa.Symbol, tsa.Symbol>)
{	let importFromHref = '';
	let isExport = false;
	const introduces = new Array<tsa.Symbol>;
	if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableStatement(node))
	{	isExport = !!node.modifiers?.some(m => m.kind & ts.SyntaxKind.ExportKeyword);
		const names = !ts.isVariableStatement(node) ? [node.name] : node.declarationList.declarations.map(v => v.name);
		for (const name of names)
		{	if (name && ts.isIdentifier(name)) // TODO: others
			{	const symbol = checker.getSymbolAtLocation(name);
				if (symbol)
				{	moduleDecls.set(symbol, symbol);
					introduces.push(symbol);
				}
			}
		}
	}
	else if (ts.isImportDeclaration(node))
	{	if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier) && node.importClause)
		{	importFromHref = loader.resolved(node.moduleSpecifier.text, sourceFile.fileName);
			const {importClause: {name, namedBindings}} = node;
			const elements = namedBindings && ts.isNamedImports(namedBindings) ? namedBindings.elements ?? [] : [{name}];
			for (const {name} of elements)
			{	if (name)
				{	const symbol = checker.getSymbolAtLocation(name);
					const resolvedSymbol = resolveSymbol(ts, checker, symbol);
					if (symbol && resolvedSymbol)
					{	moduleDecls.set(symbol, resolvedSymbol);
					}
				}
			}
		}
	}
	return {importFromHref, isExport, introduces};
}

function resolveSymbol(ts: typeof tsa, checker: tsa.TypeChecker, symbol?: tsa.Symbol)
{	if (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	symbol = checker.getAliasedSymbol(symbol);
	}
	return symbol;
}

function unexportStmt(ts: typeof tsa, node: tsa.Node, context: tsa.TransformationContext)
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
	if (i==-1 || !modifiers)
	{	return modifiers;
	}
	else
	{	return modifiers.slice(0, i).concat(modifiers.slice(i+1))
	}
}
