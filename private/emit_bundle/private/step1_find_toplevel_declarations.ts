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
							if (resolvedSymbol)
							{	exportSymbols.addExport(ts, checker, excludeLibDirectory, resolvedSymbol, propertyName ? name : undefined);
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
				{	let nodeExportType = node.modifiers?.some(m => m.kind == ts.SyntaxKind.ExportKeyword) ? NodeExportType.EXPORT : NodeExportType.NONE;
					const names: Array<tsa.Identifier | tsa.ModifierLike> = ts.isVariableStatement(node) ? node.declarationList.declarations.flatMap(v => getNames(ts, v.name)) : node.name ? [node.name] : [];
					if (names.length==0 && nodeExportType!=NodeExportType.NONE)
					{	const defaultKeyword = node.modifiers?.find(m => m.kind == ts.SyntaxKind.DefaultKeyword);
						if (defaultKeyword)
						{	names.push(defaultKeyword);
							nodeExportType = NodeExportType.EXPORT_UNNAMED_DEFAULT;
						}
					}
					nodeWithInfo.nodeExportType = nodeExportType;
					for (const name of names)
					{	const symbol = checker.getSymbolAtLocation(name);
						if (symbol)
						{	knownSymbols.add(ts, sourceFile, excludeLibDirectory, symbol);
							introduces.push(symbol);
							nodesThatIntroduce.set(symbol, nodeWithInfo);
							if (nodeExportType!=NodeExportType.NONE && isFirstEntryPoint)
							{	exportSymbols.addExport(ts, checker, excludeLibDirectory, symbol, undefined);
							}
						}
					}
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
