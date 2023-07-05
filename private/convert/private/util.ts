import {tsa} from '../../tsa_ns.ts';
import {TsTypeDef, Export} from '../../doc_node/mod.ts';
import {convertLocation} from './convert_location.ts';
import {Converter} from './converter.ts';

export function resolveSymbol(ts: typeof tsa, checker: tsa.TypeChecker, symbol?: tsa.Symbol)
{	if (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	symbol = checker.getAliasedSymbol(symbol);
	}
	return symbol;
}

export function resolveSymbolWithTrace(ts: typeof tsa, converter: Converter, symbol?: tsa.Symbol)
{	let exports: Array<Export> | undefined;
	let onlyResolvedIsExported = false;
	let isExportAssignment = false;
	// 1. Dereference and record reexports
	while (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	const declarations = symbol.getDeclarations();
		isExportAssignment = !!declarations?.some(ts.isExportAssignment);
		const declaration = isExportAssignment ? undefined : declarations?.find(ts.isExportSpecifier);
		if (declaration)
		{	if (!exports)
			{	exports = [];
			}
			exports.push
			(	{	name: symbol.name,
					location: convertLocation(ts, converter, declaration),
				}
			);
		}
		symbol = converter.checker.getImmediateAliasedSymbol(symbol);
	}
	if (symbol)
	{	// 2. If the resolved symbol is exported, record it as well
		const declaration = symbol.getDeclarations()?.find(d => isExportAssignment || ts.getCombinedModifierFlags(d) & ts.ModifierFlags.Export);
		if (declaration)
		{	if (!exports)
			{	exports = [];
				onlyResolvedIsExported = true;
			}
			exports.push
			(	{	name: symbol.name,
					location: convertLocation(ts, converter, declaration),
				}
			);
		}
		// 3. Add the recorded exports to `exportsPerResolvedSymbol`
		const curExports = converter.exportsPerResolvedSymbol.get(symbol);
		if (!curExports)
		{	exports ??= [];
			converter.exportsPerResolvedSymbol.set(symbol, exports);
		}
		else
		{	if (exports)
			{	for (const e of exports)
				{	if (!curExports.some(ce => ce.name == e.name && ce.location.filename == e.location.filename))
					{	curExports.push(e);
					}
				}
			}
			exports = curExports;
		}
	}
	return {resolvedSymbol: symbol, exports, isExportAssignment, onlyResolvedIsExported};
}

/**	`name.getText()` fails with `Cannot read properties of undefined (reading 'text')` when the node is constructed (not came from a source file)
 **/
export function getText(ts: typeof tsa, name?: tsa.QualifiedName | tsa.PropertyName | tsa.ExpressionWithTypeArguments | tsa.Expression | tsa.BindingName): string
{	if (!name)
	{	return '';
	}
	else if (ts.isIdentifier(name))
	{	return name.text;
	}
	else if (ts.isQualifiedName(name))
	{	return getText(ts, name.left) + '.' + name.right.text;
	}
	else if ('text' in name)
	{	return name.text+'';
	}
	else if (name.pos != -1)
	{	return name.getText();
	}
	else
	{	return '';
	}
}

export function getHeritageTypes(ts: typeof tsa, declarations: readonly tsa.Declaration[]|undefined, keyword: tsa.SyntaxKind.ImplementsKeyword|tsa.SyntaxKind.ExtendsKeyword): tsa.ExpressionWithTypeArguments[]
{	const seenTexts = new Set<string>();
	return declarations?.flatMap
	(	d => ts.isClassDeclaration(d) || ts.isInterfaceDeclaration(d) ? d.heritageClauses?.flatMap
		(	hc => hc.token===keyword ? hc.types : []
		) ?? [] : []
	).filter
	(	expr =>
		{	const text = expr.expression.getText();
			const seen = seenTexts.has(text);
			if (!seen)
			{	seenTexts.add(text);
			}
			return !seen;
		}
	) ?? [];
}

export function removeUndefined(type: TsTypeDef, isOptional: boolean): TsTypeDef
{	if (isOptional && type?.kind==='union')
	{	const union = type.union.filter(t => t.kind!='keyword' || t.keyword!=='undefined');
		if (union.length === 1)
		{	return union[0];
		}
		type.union = union;
	}
	return type;
}

export function getPropertySpecialName(ts: typeof tsa, name?: tsa.PropertyName, noBrackets=false)
{	if (name && ts.isComputedPropertyName(name))
	{	const text = getText(ts, name.expression);
		return noBrackets || ts.isStringLiteral(name.expression) ? text : '['+text+']';
	}
}
