import {tsa} from '../../tsa_ns.ts';
import {StmtFlags, NodeWithInfo} from './emit_bundle.ts';
import {ExportSymbols} from './export_symbols.ts';
import {getSymbolName, resolveSymbol} from './util.ts';

const RE_MODULE_NAME = /(\w+?)(?:[\/\\](?:mod|index|main))?(?:\.\w{1,4})?(?:\.map)?$/i;

export function step1FindToplevelDeclarations
(	ts: typeof tsa,
	checker: tsa.TypeChecker,
	nodesWithInfo: NodeWithInfo[],
	symbolsNames: Map<tsa.Symbol, string>,
	namesSymbols: Map<string, tsa.Symbol>,
	nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>,
	exportSymbols: ExportSymbols,
	sourceFiles: tsa.SourceFile[]
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
				const nodeWithInfo: NodeWithInfo = {sourceFile, node, refs: new Set, bodyRefs: new Set, introduces, stmtFlags: StmtFlags.NONE};
				if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableStatement(node))
				{	let stmtFlags = node.modifiers?.some(m => m.kind == ts.SyntaxKind.ExportKeyword) ? StmtFlags.EXPORT : StmtFlags.NONE;
					const names: Array<tsa.Identifier | tsa.ModifierLike> = ts.isVariableStatement(node) ? node.declarationList.declarations.flatMap(v => getNames(ts, v.name)) : node.name ? [node.name] : [];
					if (names.length==0 && stmtFlags!=StmtFlags.NONE)
					{	const defaultKeyword = node.modifiers?.find(m => m.kind == ts.SyntaxKind.DefaultKeyword);
						if (defaultKeyword)
						{	names.push(defaultKeyword);
							stmtFlags = StmtFlags.EXPORT_UNNAMED_DEFAULT;
						}
					}
					nodeWithInfo.stmtFlags = stmtFlags;
					for (const name of names)
					{	const symbol = checker.getSymbolAtLocation(name);
						if (symbol)
						{	addSymbol(ts, symbolsNames, namesSymbols, sourceFile, symbol);
							introduces.push(symbol);
							nodesThatIntroduce.set(symbol, nodeWithInfo);
							if (stmtFlags!=StmtFlags.NONE && isFirstEntryPoint)
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

function addSymbol(ts: typeof tsa, symbolsNames: Map<tsa.Symbol, string>, namesSymbols: Map<string, tsa.Symbol>, sourceFile: tsa.SourceFile, symbol: tsa.Symbol)
{	if (symbolsNames.get(symbol) == undefined)
	{	let baseName = getSymbolName(ts, symbol);
		if (!baseName)
		{	baseName = sourceFile.fileName.match(RE_MODULE_NAME)?.[1] ?? 'defaultExport';
		}
		const name = !namesSymbols.get(baseName) ? baseName : getUniqueName(namesSymbols, baseName);
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
