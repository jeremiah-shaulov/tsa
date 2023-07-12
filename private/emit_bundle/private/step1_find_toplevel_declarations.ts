import {tsa} from '../../tsa_ns.ts';
import {NodeExportType, NodeWithInfo} from './emit_bundle.ts';
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
							{	if (!(resolvedSymbol.flags & ts.SymbolFlags.Module))
								{	exportSymbols.addSymbol(resolvedSymbol, propertyName ? name : undefined);
								}
								else
								{	exportSymbols.addModuleSymbol(ts, checker, resolvedSymbol, name);
								}
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
						{	addSymbol(ts, symbolsNames, namesSymbols, sourceFile, symbol);
							introduces.push(symbol);
							nodesThatIntroduce.set(symbol, nodeWithInfo);
							if (nodeExportType!=NodeExportType.NONE && isFirstEntryPoint)
							{	exportSymbols.addSymbol(symbol, undefined);
							}
						}
					}
				}
				findRefs(ts, checker, nodeWithInfo, symbolsNames);
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

function findRefs(ts: typeof tsa, checker: tsa.TypeChecker, nodeWithInfo: NodeWithInfo, symbolsNames: Map<tsa.Symbol, string>)
{	const {node, refs, bodyRefs, introduces} = nodeWithInfo;
	if (ts.isFunctionDeclaration(node))
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

function setUsedTopLevelSymbols(ts: typeof tsa, checker: tsa.TypeChecker, symbolsNames: Map<tsa.Symbol, string>, node: tsa.Node|undefined, introduces: tsa.Symbol[], refs: Set<tsa.Symbol>)
{	node?.forEachChild(visit);

	function visit(node: tsa.Node)
	{	node.forEachChild(visit);
		let symbol;
		if (ts.isIdentifier(node))
		{	symbol = checker.getSymbolAtLocation(node);
		}
		else if (ts.isShorthandPropertyAssignment(node))
		{	symbol = checker.getShorthandAssignmentValueSymbol(node);
		}
		if (symbol && !nodeIsNs(ts, checker, node, symbol))
		{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
			if (resolvedSymbol && symbolsNames.has(resolvedSymbol) && !introduces.includes(resolvedSymbol)) // If resolves to a top-level symbol
			{	refs.add(resolvedSymbol);
			}
		}
	}
}

/**	Is `node.parent` a property access like `ns.name`, where `ns` is a namespace alias (from `import * as ns`), and is this node the **left** side of the property access?
 **/
function nodeIsNs(ts: typeof tsa, checker: tsa.TypeChecker, node: tsa.Node, symbol: tsa.Symbol)
{	if (ts.isPropertyAccessExpression(node.parent) && node==node.parent.expression || ts.isQualifiedName(node.parent) && node==node.parent.left)
	{	return symbolIsNs(ts, checker, symbol);
	}
	return false;
}

function symbolIsNs(ts: typeof tsa, checker: tsa.TypeChecker, symbol: tsa.Symbol)
{	if (symbol.flags & ts.SymbolFlags.Alias)
	{	const declaration = symbol.getDeclarations()?.[0];
		if (declaration)
		{	if (declaration.kind == ts.SyntaxKind.NamespaceImport)
			{	return true;
			}
			if (declaration.kind == ts.SyntaxKind.ImportSpecifier)
			{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
				if (resolvedSymbol && resolvedSymbol.flags & ts.SymbolFlags.Module)
				{	return true;
				}
			}
		}
	}
	return false;
}
