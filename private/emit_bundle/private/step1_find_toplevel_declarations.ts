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
{	for (const sourceFile of sourceFiles)
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
			else if (!ts.isImportDeclaration(node))
			{	const introduces = new Array<tsa.Symbol>;
				const nodeWithInfo: NodeWithInfo = {sourceFile, node, refs: new Set, bodyRefs: new Set, introduces, nodeExportType: NodeExportType.NONE};
				if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableStatement(node))
				{	const exportKeyword = node.modifiers?.find(m => m.kind == ts.SyntaxKind.ExportKeyword);
					const defaultKeyword = exportKeyword && node.modifiers?.find(m => m.kind == ts.SyntaxKind.DefaultKeyword);
					let nodeExportType = !exportKeyword ? NodeExportType.NONE : !defaultKeyword ? NodeExportType.EXPORT : NodeExportType.EXPORT_DEFAULT;
					const names: Array<tsa.Identifier | tsa.ModifierLike> = ts.isVariableStatement(node) ? node.declarationList.declarations.flatMap(v => getNames(ts, v.name)) : node.name ? [node.name] : [];
					if (names.length==0 && defaultKeyword)
					{	names.push(defaultKeyword);
						nodeExportType = NodeExportType.EXPORT_DEFAULT_UNNAMED;
					}
					nodeWithInfo.nodeExportType = nodeExportType;
					for (const name of names)
					{	const symbol = checker.getSymbolAtLocation(name);
						if (symbol)
						{	const isAmbient = !!node.modifiers?.find(m => m.kind == ts.SyntaxKind.DeclareKeyword);
							knownSymbols.add(ts, sourceFile, excludeLibDirectory, symbol, isAmbient);
							introduces.push(symbol);
							nodesThatIntroduce.set(symbol, nodeWithInfo);
							if (nodeExportType!=NodeExportType.NONE && isFirstEntryPoint)
							{	exportSymbols.addExport(ts, checker, excludeLibDirectory, symbol, undefined);
							}
						}
					}
				}
				else if (ts.isExportAssignment(node) && !isFirstEntryPoint) // for the first entry point i'll leave the `export default ...` alone
				{	if (ts.isIdentifier(node.expression))
					{	continue;
					}
					const symbol = checker.getSymbolAtLocation(node.expression);
					if (symbol)
					{	knownSymbols.add(ts, sourceFile, excludeLibDirectory, symbol);
					}
				}
				nodesWithInfo.push(nodeWithInfo);
			}
			else if (ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text.startsWith('node:'))
			{	const nodeWithInfo: NodeWithInfo = {sourceFile, node, refs: new Set, bodyRefs: new Set, introduces: [], nodeExportType: NodeExportType.NONE};
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
