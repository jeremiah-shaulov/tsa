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

export function resolveSymbolWithTrace(ts: typeof tsa, converter: Converter, symbol?: tsa.Symbol, isExportedFromEntryPointNumber?: number, entryPointSourceFile?: tsa.SourceFile)
{	let exports: Array<Export> | undefined;
	let onlyResolvedIsExported = false;
	let isExportAssignment = false;
	let origDeclarations: tsa.Declaration[]|undefined;
	// 1. Dereference and record reexports
	while (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	const declarations = symbol.getDeclarations();
		if (!origDeclarations)
		{	origDeclarations = declarations;
		}
		isExportAssignment = !!declarations?.some(ts.isExportAssignment);
		const declaration = isExportAssignment ? origDeclarations?.[0] : declarations?.find(ts.isExportSpecifier);
		if (declaration)
		{	if (!exports)
			{	exports = [];
			}
			const location = convertLocation(ts, converter, declaration);
			if (location.entryPointNumber === isExportedFromEntryPointNumber)
			{	isExportedFromEntryPointNumber = undefined;
			}
			exports.push({name: symbol.name, location});
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
			const location = convertLocation(ts, converter, declaration);
			if (isExportedFromEntryPointNumber!=undefined && location.entryPointNumber!==isExportedFromEntryPointNumber)
			{	const location = convertLocation(ts, converter, entryPointSourceFile);
				exports.push({name: symbol.name, location});
				onlyResolvedIsExported = false;
			}
			exports.push({name: symbol.name, location});
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

export function getTypeNodeOfDeclaration(ts: typeof tsa, declaration: tsa.Declaration)
{	if (ts.isParameter(declaration))
	{	return declaration.type;
	}
	else if (ts.isJSDocParameterTag(declaration))
	{	return declaration.typeExpression?.type;
	}
	else if (ts.isPropertyDeclaration(declaration))
	{	return declaration.type;
	}
	else if (ts.isPropertySignature(declaration))
	{	return declaration.type;
	}
}
