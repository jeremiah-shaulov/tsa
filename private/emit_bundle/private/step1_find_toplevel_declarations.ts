import {tsa} from '../../tsa_ns.ts';
import {NodeExportType, NodeWithInfo} from './emit_bundle.ts';
import {KnownSymbols} from './known_symbols.ts';
import {ExportSymbols} from './export_symbols.ts';
import {resolveSymbol} from './util.ts';

export function step1FindToplevelDeclarations
(	ts: typeof tsa,
	checker: tsa.TypeChecker,
	nodesWithInfo: NodeWithInfo[],
	knownSymbols: KnownSymbols,
	nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>,
	exportSymbols: ExportSymbols,
	sourceFiles: tsa.SourceFile[],
	excludeLibDirectory: string
)
{	const nodeJsSymbolsImported = new Array<tsa.Symbol>;
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
							if (symbol && resolvedSymbol)
							{	exportSymbols.addExport(ts, checker, excludeLibDirectory, resolvedSymbol, propertyName ? name : resolvedSymbol.name!=symbol.name ? symbol.name: undefined);
							}
						}
					}
					else
					{	// `export * from 'name'`
						const moduleSymbol = node.moduleSpecifier && checker.getSymbolAtLocation(node.moduleSpecifier);
						if (moduleSymbol)
						{	const exportAsNs = node.exportClause && ts.isNamespaceExport(node.exportClause) ? node.exportClause.name : undefined;
							exportSymbols.addExport(ts, checker, excludeLibDirectory, moduleSymbol, exportAsNs);
						}
					}
				}
			}
			else
			{	const introduces = new Array<tsa.Symbol>;
				const nodeWithInfo: NodeWithInfo = {sourceFile, node, refs: new Set, bodyRefs: new Set, introduces, nodeExportType: NodeExportType.NONE};
				const names = new Array<tsa.Identifier | tsa.ModifierLike>;
				let isAmbient = false;
				let skipNodeJsImport = -1;
				if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableStatement(node))
				{	const exportKeyword = node.modifiers?.find(m => m.kind == ts.SyntaxKind.ExportKeyword);
					const defaultKeyword = exportKeyword && node.modifiers?.find(m => m.kind == ts.SyntaxKind.DefaultKeyword);
					let nodeExportType = !exportKeyword ? NodeExportType.NONE : !defaultKeyword ? NodeExportType.EXPORT : NodeExportType.EXPORT_DEFAULT;
					if (ts.isVariableStatement(node))
					{	for (const d of node.declarationList.declarations)
						{	for (const name of getNames(ts, d.name))
							{	names.push(name);
							}
						}
					}
					else if (node.name)
					{	names.push(node.name);
					}
					if (names.length==0 && defaultKeyword)
					{	names.push(defaultKeyword);
						nodeExportType = NodeExportType.EXPORT_DEFAULT_UNNAMED;
					}
					nodeWithInfo.nodeExportType = nodeExportType;
					isAmbient = !!node.modifiers?.find(m => m.kind == ts.SyntaxKind.DeclareKeyword);
				}
				else if (ts.isExportAssignment(node) && !isFirstEntryPoint) // for the first entry point i'll leave the `export default ...` alone
				{	if (ts.isIdentifier(node.expression))
					{	continue;
					}
					const symbol = checker.getSymbolAtLocation(node.expression);
					if (symbol)
					{	knownSymbols.add(ts, sourceFile, excludeLibDirectory, symbol, symbol.name);
					}
				}
				else if (ts.isImportDeclaration(node))
				{	if (!ts.isStringLiteral(node.moduleSpecifier) || !node.moduleSpecifier.text.startsWith('node:'))
					{	continue; // include in the output only 'node:...' imports
					}
					if (node.importClause?.name)
					{	names.push(node.importClause.name);
					}
					if (node.importClause?.namedBindings)
					{	if (ts.isNamespaceImport(node.importClause.namedBindings))
						{	names.push(node.importClause.namedBindings.name);
						}
						else
						{	for (const e of node.importClause.namedBindings.elements)
							{	names.push(e.name);
							}
						}
					}
					skipNodeJsImport = 0;
				}
				for (const name of names)
				{	const symbol = checker.getSymbolAtLocation(name);
					if (symbol)
					{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
						if (skipNodeJsImport != -1)
						{	if (nodeJsSymbolsImported.includes(resolvedSymbol))
							{	skipNodeJsImport++;
								continue;
							}
							nodeJsSymbolsImported.push(resolvedSymbol);
						}
						knownSymbols.add(ts, sourceFile, excludeLibDirectory, resolvedSymbol, symbol.name, isAmbient);
						introduces.push(resolvedSymbol);
						nodesThatIntroduce.set(resolvedSymbol, nodeWithInfo);
						if (nodeWithInfo.nodeExportType!=NodeExportType.NONE && isFirstEntryPoint)
						{	exportSymbols.addExport(ts, checker, excludeLibDirectory, resolvedSymbol, undefined);
						}
					}
				}
				if (skipNodeJsImport == names.length) // TODO: rename already mentioned symbols
				{	continue;
				}
				nodesWithInfo.push(nodeWithInfo);
			}
		}
	}
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
