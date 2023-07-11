import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';
import {ExportSymbols} from './export_symbols.ts';
import {getNames, resolveSymbol} from './util.ts';

export function step1FindToplevelDeclarations(ts: typeof tsa, checker: tsa.TypeChecker, nodesWithInfo: NodeWithInfo[], symbolsNames: Map<tsa.Symbol, string>, namesSymbols: Map<string, tsa.Symbol>, nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>, exportSymbols: ExportSymbols, sourceFiles: tsa.SourceFile[])
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
