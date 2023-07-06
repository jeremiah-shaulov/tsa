import {tsa} from '../../tsa_ns.ts';
import {Loader} from '../../load_options.ts';
import {DependsOn, GlobalSymbols, NodeExport} from './global_symbols.ts';

type ImportedSymbol = {symbol: tsa.Symbol, resolvedSymbol: tsa.Symbol, importHref: string};

const LINE = `// _____________________________________________________________________________`;
const BEGIN = `/* BEGIN */`;
const END = `/* END */`;
const MODULE = `/* MODULE */`;

export function emitTs(ts: typeof tsa, program: tsa.DenoProgram, loader: Loader, newLine='\n')
{	const checker = program.getTypeChecker();
	const printer = ts.createPrinter();
	const globalSymbols = new GlobalSymbols(ts, newLine);
	const entryPointsHrefs = program.getRootFileNames();
	const modulesHrefs = entryPointsHrefs.slice();
	// Phase one
	const modules = new Array<{moduleHref: string, sourceFile: tsa.SourceFile, node: tsa.Node}>;
	for (let i=0; i<modulesHrefs.length; i++)
	{	const moduleHref = modulesHrefs[i];
		const sourceFile = program.getSourceFile(moduleHref);
		if (sourceFile)
		{	const {node} = bundleSourceFile(moduleHref, sourceFile);
			modules.push({moduleHref, sourceFile, node});
		}
	}
	// Phase two
	let bundlerResult = globalSymbols.getPrelude(entryPointsHrefs);
	for (const {moduleHref, sourceFile, node} of modules)
	{	bundlerResult += newLine;
		bundlerResult += newLine;
		bundlerResult += newLine;
		bundlerResult += LINE + newLine;
		const moduleFunc = `async function ${globalSymbols.getModule(moduleHref).name}() {`;
		const spacesLen = Math.max(0, LINE.length - BEGIN.length - moduleFunc.length - MODULE.length);
		const firstSpaceLen = spacesLen >> 1;
		bundlerResult += BEGIN + ' '.repeat(firstSpaceLen) + moduleFunc + ' '.repeat(spacesLen - firstSpaceLen) + MODULE + newLine;
		bundlerResult += LINE + newLine;
		bundlerResult += newLine;
		bundlerResult += `await Promise.resolve();` + newLine;
		bundlerResult += printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
		for (const n of globalSymbols.getModuleDependantNodes(moduleHref))
		{	bundlerResult += printer.printNode(ts.EmitHint.Unspecified, n, sourceFile) + newLine;
		}
		bundlerResult += globalSymbols.getModuleReturn(moduleHref);
		bundlerResult += newLine;
		bundlerResult += LINE + newLine;
		const spacesLen2 = Math.max(0, LINE.length - END.length - 1 - MODULE.length);
		const firstSpaceLen2 = spacesLen2 >> 1;
		bundlerResult += END + ' '.repeat(firstSpaceLen2) + '}' + ' '.repeat(spacesLen2 - firstSpaceLen2) + MODULE + newLine;
		bundlerResult += LINE + newLine;
	}
	// Done
	return bundlerResult;

	function bundleSourceFile(moduleHref: string, sourceFile: tsa.SourceFile)
	{	const moduleImports = new Map<string, ImportedSymbol>;
		const moduleDelayedExports = new Set<tsa.Symbol>; // TODO: count all names, not only exported
		const result = ts.transform(sourceFile, [transformerFactory]);
		return {node: result.transformed[0]};

		function transformerFactory(context: tsa.TransformationContext)
		{	let level = 0;
			let pendingImports = new Array<DependsOn>;
			let pendingTypeImports = new Array<tsa.Node>;

			return function(rootNode: tsa.Node)
			{	return ts.visitNode(rootNode, visit);
			};

			function visit(node: tsa.Node): tsa.VisitResult<tsa.Node>
			{	level++;
				node = ts.visitEachChild(node, visit, context);
				level--;

				if (ts.isIdentifier(node))
				{	const moduleImport = moduleImports.get(node.text);
					const symbol = moduleImport || moduleDelayedExports.size ? checker.getSymbolAtLocation(node) : undefined;
					if (moduleImport && moduleImport.symbol==symbol)
					{	const {globalName: globalName, isType} = globalSymbols.getSymbolName(moduleImport.resolvedSymbol, false);
						if (isType)
						{	pendingTypeImports.push
							(	context.factory.createTypeAliasDeclaration
								(	undefined,
									symbol.name,
									undefined,
									context.factory.createTypeReferenceNode(globalName)
								)
							);
						}
						else
						{	pendingImports.push
							(	{	symbol,
									importStmt: context.factory.createVariableStatement
									(	undefined,
										context.factory.createVariableDeclarationList
										(	[	context.factory.createVariableDeclaration
												(	symbol.name,
													undefined,
													undefined,
													context.factory.createAwaitExpression
													(	context.factory.createIdentifier(globalName)
													)
												)
											],
											ts.NodeFlags.Const
										)
									)
								}
							);
						}
						moduleImports.delete(node.text);
					}
					else if (symbol && moduleDelayedExports.has(symbol))
					{	//pendingImports.push({symbol});
					}
				}

				const pendingExports = new Array<NodeExport>;

				if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
				{	let importHref = '';
					let entryPointNumber = -1;

					// Add `import from` or `export from` to `modulesHrefs`
					if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier))
					{	importHref = loader.resolved(node.moduleSpecifier.text, sourceFile.fileName);
						entryPointNumber = modulesHrefs.indexOf(importHref);
						if (entryPointNumber == -1)
						{	entryPointNumber = modulesHrefs.length;
							modulesHrefs.push(importHref);
						}
					}

					if (ts.isExportDeclaration(node))
					{
					}
					else if (entryPointNumber != -1)
					{	// Remove `import`
						if (node.importClause)
						{	const {importClause: {name, namedBindings}} = node;
							const elements = namedBindings && ts.isNamedImports(namedBindings) ? namedBindings.elements ?? [] : [{name}];
							for (const {name} of elements)
							{	if (name)
								{	const symbol = checker.getSymbolAtLocation(name);
									const resolvedSymbol = resolveSymbol(ts, checker, symbol);
									if (symbol && resolvedSymbol)
									{	moduleImports.set(name.text, {symbol, resolvedSymbol, importHref});
									}
								}
							}
						}
						return [];
					}
				}
				else if (level==1 && (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableStatement(node)))
				{	// If exporting a symbol, replace `export` keyword with corresponding export function
					if (node.modifiers?.some(m => m.kind & ts.SyntaxKind.ExportKeyword))
					{	const names = !ts.isVariableStatement(node) ? [node.name] : node.declarationList.declarations.map(v => v.name);
						for (const name of names)
						{	if (name && ts.isIdentifier(name)) // TODO: others
							{	const symbol = checker.getSymbolAtLocation(name);
								if (symbol)
								{	const {exportFuncName, isType} = globalSymbols.getSymbolName(symbol, true);
									if (!isType)
									{	pendingExports.push
										(	{	symbol,
												exportStmt: context.factory.createCallExpression
												(	context.factory.createIdentifier(exportFuncName),
													undefined,
													[name]
												),
											}
										);
									}
								}
							}
						}
						if (ts.isFunctionDeclaration(node))
						{	node = context.factory.updateFunctionDeclaration
							(	node,
								unexport(ts, node.modifiers),
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
								unexport(ts, node.modifiers),
								node.name,
								node.typeParameters,
								node.heritageClauses,
								node.members
							);
						}
						else if (ts.isInterfaceDeclaration(node))
						{	node = context.factory.updateInterfaceDeclaration
							(	node,
								unexport(ts, node.modifiers),
								node.name,
								node.typeParameters,
								node.heritageClauses,
								node.members
							);
						}
						else if (ts.isEnumDeclaration(node))
						{	node = context.factory.updateEnumDeclaration
							(	node,
								unexport(ts, node.modifiers),
								node.name,
								node.members
							);
						}
						else if (ts.isTypeAliasDeclaration(node))
						{	node = context.factory.updateTypeAliasDeclaration
							(	node,
								unexport(ts, node.modifiers),
								node.name,
								node.typeParameters,
								node.type
							);
						}
						else if (ts.isVariableStatement(node))
						{	node = context.factory.updateVariableStatement
							(	node,
								unexport(ts, node.modifiers),
								node.declarationList
							);
						}
					}
				}

				if (level == 1)
				{	// Inject pending nodes
					if (pendingImports.length == 0)
					{	// Inject
						const result = pendingTypeImports;
						pendingTypeImports = [];
						result.push(node);
						for (const {symbol, exportStmt} of pendingExports)
						{	globalSymbols.addPhaseOneExport(moduleHref, symbol);
							result.push(exportStmt);
						}
						return result;
					}
					else
					{	// Delay injection
						globalSymbols.addNodeThatDepends(moduleHref, node, pendingExports, pendingImports);
						pendingImports = [];
						for (const {symbol} of pendingExports)
						{	moduleDelayedExports.add(symbol);
						}
						return [];
					}
				}

				return node;
			}
		}
	}
}

function resolveSymbol(ts: typeof tsa, checker: tsa.TypeChecker, symbol?: tsa.Symbol)
{	if (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	symbol = checker.getAliasedSymbol(symbol);
	}
	return symbol;
}

function unexport(ts: typeof tsa, modifiers?: tsa.NodeArray<tsa.ModifierLike>)
{	const i = modifiers?.findIndex(m => m.kind == ts.SyntaxKind.ExportKeyword) ?? -1;
	if (i==-1 || !modifiers)
	{	return modifiers;
	}
	else
	{	return modifiers.slice(0, i).concat(modifiers.slice(i+1))
	}
}
