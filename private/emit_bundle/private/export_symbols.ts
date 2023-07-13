import {tsa} from '../../tsa_ns.ts';
import {NodeExportType, NodeWithInfo} from './emit_bundle.ts';
import {KnownSymbols} from './known_symbols.ts';
import {isNamespaceButNotFromLib, resolveSymbol, symbolIsType} from './util.ts';

type ExportSymbolsAlias = tsa.Identifier|string|undefined;

export class ExportSymbols
{	#exports = new Map<tsa.Symbol, ExportSymbolsAlias>; // symbols that the first entry point exports
	refs = new Set<tsa.Symbol>; // all the symbols that are found in `#symbols`

	addExport(ts: typeof tsa, checker: tsa.TypeChecker, excludeLibDirectory: string, symbol: tsa.Symbol, alias: ExportSymbolsAlias)
	{	this.#exports.set(symbol, alias);
		this.#moduleAddRefs(ts, checker, excludeLibDirectory, symbol);
	}

	#moduleAddRefs(ts: typeof tsa, checker: tsa.TypeChecker, excludeLibDirectory: string, symbol: tsa.Symbol, visited=new Set<tsa.Symbol>)
	{	if (isNamespaceButNotFromLib(ts, excludeLibDirectory, symbol))
		{	for (const symbol2 of checker.getExportsOfModule(symbol))
			{	const resolvedSymbol = resolveSymbol(ts, checker, symbol2);
				if (resolvedSymbol && !visited.has(resolvedSymbol))
				{	visited.add(resolvedSymbol);
					this.#moduleAddRefs(ts, checker, excludeLibDirectory, resolvedSymbol, visited);
				}
			}
		}
		else
		{	this.refs.add(symbol);
		}
	}

	getNamespaceAsValue(ts: typeof tsa, checker: tsa.TypeChecker, context: tsa.TransformationContext, sourceFile: tsa.SourceFile, excludeLibDirectory: string, knownSymbols: KnownSymbols, nodesWithInfo: NodeWithInfo[], moduleSymbol: tsa.Symbol, visited=new Map<tsa.Symbol, string>)
	{	let nsName = knownSymbols.symbolsNames.get(moduleSymbol);
		if (nsName == undefined)
		{	nsName = knownSymbols.add(ts, sourceFile, excludeLibDirectory, moduleSymbol);
			visited.set(moduleSymbol, nsName);
			const props = new Array<tsa.ObjectLiteralElementLike>;
			const refs = new Set<tsa.Symbol>;
			for (const symbol of checker.getExportsOfModule(moduleSymbol))
			{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
				if (!symbolIsType(ts, resolvedSymbol))
				{	refs.add(resolvedSymbol);
					const circular = visited.get(resolvedSymbol);
					if (!circular)
					{	const name = this.getNamespaceAsValue(ts, checker, context, sourceFile, excludeLibDirectory, knownSymbols, nodesWithInfo, resolvedSymbol, visited);
						const rename = name!=symbol.name ? name : undefined;
						if (rename == undefined)
						{	props[props.length] = context.factory.createShorthandPropertyAssignment(symbol.name);
						}
						else
						{	props[props.length] = context.factory.createPropertyAssignment
							(	symbol.name,
								typeof(rename)=='object' ? rename : context.factory.createIdentifier(rename ?? symbol.name)
							);
						}
					}
					else
					{	const name = circular;
						const rename = name!=symbol.name ? name : undefined;
						props[props.length] = context.factory.createGetAccessorDeclaration
						(	undefined,
							symbol.name,
							[],
							undefined,
							context.factory.createBlock([context.factory.createReturnStatement(typeof(rename)=='object' ? rename : context.factory.createIdentifier(rename ?? symbol.name))])
						);
					}
				}
			}
			const node = context.factory.createVariableStatement
			(	undefined,
				context.factory.createVariableDeclarationList
				(	[	context.factory.createVariableDeclaration
						(	nsName,
							undefined,
							undefined,
							context.factory.createObjectLiteralExpression(props)
						)
					],
					ts.NodeFlags.Const
				)
			);
			nodesWithInfo.push({sourceFile, node, refs, bodyRefs: new Set, introduces: [moduleSymbol], nodeExportType: NodeExportType.NONE});
		}
		return nsName;
	}

	getExportStmts(ts: typeof tsa, checker: tsa.TypeChecker, context: tsa.TransformationContext, sourceFile: tsa.SourceFile, excludeLibDirectory: string, knownSymbols: KnownSymbols, outExportStmts: NodeWithInfo[])
	{	const exportSpecifiers = new Array<tsa.ExportSpecifier>;
		for (const [symbol, alias] of this.#exports)
		{	const isModule = isNamespaceButNotFromLib(ts, excludeLibDirectory, symbol);
			if (!isModule || alias)
			{	const name = this.getNamespaceAsValue(ts, checker, context, sourceFile, excludeLibDirectory, knownSymbols, outExportStmts, symbol);
				this.#createExportSpecifier(ts, context, sourceFile, symbol, symbol, name, alias, exportSpecifiers, outExportStmts);
			}
			else
			{	for (const symbol2 of checker.getExportsOfModule(symbol))
				{	const resolvedSymbol = resolveSymbol(ts, checker, symbol2);
					const name = this.getNamespaceAsValue(ts, checker, context, sourceFile, excludeLibDirectory, knownSymbols, outExportStmts, resolvedSymbol);
					this.#createExportSpecifier(ts, context, sourceFile, symbol2, resolvedSymbol, name, alias, exportSpecifiers, outExportStmts);
				}
			}
		}
		if (exportSpecifiers.length)
		{	outExportStmts.push
			(	{	sourceFile,
					node: context.factory.createExportDeclaration(undefined, false, context.factory.createNamedExports(exportSpecifiers)),
					refs: new Set,
					bodyRefs: new Set,
					introduces: [],
					nodeExportType: NodeExportType.NONE
				}
			);
		}
	}

	#createExportSpecifier(ts: typeof tsa, context: tsa.TransformationContext, sourceFile: tsa.SourceFile, symbol: tsa.Symbol, resolvedSymbol: tsa.Symbol, name: string, alias: ExportSymbolsAlias, outExportSpecifiers: Array<tsa.ExportSpecifier>, outExportStmts: NodeWithInfo[])
	{	if (resolvedSymbol.name == 'default')
		{	outExportStmts.push
			(	{	sourceFile,
					node: context.factory.createExportDefault(context.factory.createIdentifier(name)),
					refs: new Set,
					bodyRefs: new Set,
					introduces: [],
					nodeExportType: NodeExportType.NONE
				}
			);
		}
		else
		{	outExportSpecifiers.push
			(	context.factory.createExportSpecifier
				(	symbolIsType(ts, resolvedSymbol),
					name!=symbol.name ? name : alias && symbol.name,
					alias ?? symbol.name
				)
			);
		}
	}
}
