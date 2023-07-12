import {tsa} from '../../tsa_ns.ts';
import {NodeExportType, NodeWithInfo} from './emit_bundle.ts';
import {KnownSymbols} from './known_symbols.ts';
import {resolveSymbol, symbolIsType} from './util.ts';

type ExportSymbolsAlias = tsa.Identifier|string|undefined;

/**	Maps exported symbol to alias. The exported symbol can be namespace (nested `ExportSymbolsMap`).
 **/
type ExportSymbolsMap = Map<tsa.Symbol|ExportSymbolsMap, ExportSymbolsAlias>;

export class ExportSymbols
{	#symbols: ExportSymbolsMap = new Map; // symbols that the first entry point exports
	symbolsFlat = new Set<tsa.Symbol>; // all the symbols that are found in `#symbols`

	addSymbol(resolvedSymbol: tsa.Symbol, alias: ExportSymbolsAlias)
	{	this.#symbols.set(resolvedSymbol, alias);
		this.symbolsFlat.add(resolvedSymbol);
	}

	addModuleSymbol(ts: typeof tsa, checker: tsa.TypeChecker, moduleSymbol: tsa.Symbol, exportAsNs: ExportSymbolsAlias, symbols=this.#symbols)
	{	let addTo = symbols;
		if (exportAsNs)
		{	addTo = new Map;
			symbols.set(addTo, exportAsNs);
		}
		for (const symbol of checker.getExportsOfModule(moduleSymbol))
		{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
			if (resolvedSymbol.flags & ts.SymbolFlags.Module)
			{	this.addModuleSymbol(ts, checker, resolvedSymbol, symbol.name, addTo);
			}
			else
			{	addTo.set(resolvedSymbol, resolvedSymbol.name==symbol.name ? undefined : symbol.name);
				this.symbolsFlat.add(resolvedSymbol);
			}
		}
	}

	getNamespaceAsValue(ts: typeof tsa, checker: tsa.TypeChecker, context: tsa.TransformationContext, sourceFile: tsa.SourceFile, knownSymbols: KnownSymbols, nodesWithInfo: NodeWithInfo[], moduleSymbol: tsa.Symbol, visited=new Map<tsa.Symbol, string>)
	{	let nsName = knownSymbols.symbolsNames.get(moduleSymbol);
		if (nsName == undefined)
		{	nsName = knownSymbols.add(ts, sourceFile, moduleSymbol);
			visited.set(moduleSymbol, nsName);
			const props = new Array<tsa.ObjectLiteralElementLike>;
			const refs = new Set<tsa.Symbol>;
			for (const symbol of checker.getExportsOfModule(moduleSymbol))
			{	const resolvedSymbol = resolveSymbol(ts, checker, symbol);
				if (!symbolIsType(ts, resolvedSymbol))
				{	refs.add(resolvedSymbol);
					const circular = visited.get(resolvedSymbol);
					if (!circular)
					{	const name = resolvedSymbol.flags & ts.SymbolFlags.Module ? this.getNamespaceAsValue(ts, checker, context, sourceFile, knownSymbols, nodesWithInfo, resolvedSymbol, visited) : knownSymbols.symbolsNames.get(symbol);
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

	getExportStmts(ts: typeof tsa, context: tsa.TransformationContext, knownSymbols: KnownSymbols)
	{	const exportStmts = new Array<tsa.Node>;
		const exportSpecifiers = new Array<tsa.ExportSpecifier>;
		for (const [symbol, alias] of this.#symbols)
		{	if (symbol instanceof Map)
			{	if (alias != undefined) // i always add namespaces with names
				{	const props = this.#createNamespace(ts, context, knownSymbols, symbol); // TODO: create typescript namespace
					exportStmts.push
					(	context.factory.createVariableStatement
						(	[context.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
							context.factory.createVariableDeclarationList
							(	[	context.factory.createVariableDeclaration
									(	alias,
										undefined,
										undefined,
										props
									)
								],
								ts.NodeFlags.Const
							)
						)
					);
				}
			}
			else
			{	const name = knownSymbols.symbolsNames.get(symbol);
				exportSpecifiers.push
				(	context.factory.createExportSpecifier
					(	symbolIsType(ts, symbol),
						name!=symbol.name ? name : alias && symbol.name,
						alias ?? symbol.name
					)
				);
			}
		}
		if (exportSpecifiers.length)
		{	exportStmts.push
			(	context.factory.createExportDeclaration(undefined, false, context.factory.createNamedExports(exportSpecifiers))
			);
		}
		return exportStmts;
	}

	#createNamespace(ts: typeof tsa, context: tsa.TransformationContext, knownSymbols: KnownSymbols, symbols: ExportSymbolsMap)
	{	const props = new Array<tsa.ObjectLiteralElementLike>;
		for (const [symbol, alias] of symbols)
		{	if (symbol instanceof Map)
			{	if (alias != undefined) // i always add namespaces with names
				{	const subProps = this.#createNamespace(ts, context, knownSymbols, symbol);
					props[props.length] = context.factory.createPropertyAssignment(alias, subProps);
				}
			}
			else if (!symbolIsType(ts, symbol))
			{	const name = knownSymbols.symbolsNames.get(symbol);
				const rename = name!=symbol.name ? name : undefined;
				if (rename==undefined && alias==undefined)
				{	props[props.length] = context.factory.createShorthandPropertyAssignment(symbol.name);
				}
				else
				{	props[props.length] = context.factory.createPropertyAssignment
					(	alias ?? symbol.name,
						typeof(rename)=='object' ? rename : context.factory.createIdentifier(rename ?? symbol.name)
					);
				}
			}
		}
		return context.factory.createObjectLiteralExpression(props);
	}
}
