import {tsa} from '../../tsa_ns.ts';
import {TsTypeDef, ParamDef, ClassConstructorParamDef} from '../../doc_node/mod.ts';
import {convertDecorators} from './convert_decorators.ts';
import {convertType, TYPE_NOT_DETECTED} from './convert_type.ts';
import {convertDefaultValue} from './convert_expression.ts';
import {convertAccessibility} from './convert_accessibility.ts';
import {getTypeNodeOfDeclaration, removeUndefined} from './util.ts';
import {Converter} from './converter.ts';

export function convertParameter(ts: typeof tsa, converter: Converter, symbol?: tsa.Symbol, init?: tsa.Declaration, isConstructorParam=false): ClassConstructorParamDef
{	const declaration = symbol?.valueDeclaration;
	if (declaration && ts.isParameter(declaration))
	{	let result = convertParameterNode(ts, converter, declaration, init, symbol);
		if (isConstructorParam)
		{	const accessibility = convertAccessibility(ts, declaration.modifiers);
			const isOverride = declaration.modifiers?.some(m => m.kind == ts.SyntaxKind.OverrideKeyword);
			const readonly = declaration.modifiers?.some(m => m.kind == ts.SyntaxKind.ReadonlyKeyword);
			result =
			{	...accessibility,
				...(isOverride && {isOverride}),
				...result,
				...(readonly && {readonly}),
			};
		}
		return result;
	}
	return {kind: 'identifier', name: '_', optional: false, tsType: TYPE_NOT_DETECTED};
}

export function convertParameterNode(ts: typeof tsa, converter: Converter, declaration: tsa.ParameterDeclaration|tsa.JSDocParameterTag, init?: tsa.Declaration, symbol?: tsa.Symbol)
{	const rest = !!(ts.isParameter(declaration) ? declaration.dotDotDotToken : declaration.typeExpression && ts.isJSDocVariadicType(declaration.typeExpression.type));
	const optional = ts.isParameter(declaration) ? !!(declaration.questionToken || symbol && ts.getJSDocParameterTags(declaration).some(tag => tag.isBracketed)) : declaration.isBracketed;
	const tsType = removeUndefined(convertType(ts, converter, getTypeNodeOfDeclaration(ts, declaration) ?? (symbol && converter.checker.getTypeOfSymbolAtLocation(symbol, declaration))), optional);
	const defaultValue = convertDefaultValue(ts, init);
	let result = convertParamName(ts, declaration.name, optional, rest ? undefined : tsType);
	if (defaultValue)
	{	result =
		{	kind: 'assign',
			left: result,
			right: defaultValue,
		};
	}
	if (rest)
	{	result =
		{	kind: 'rest',
			arg: result,
			tsType,
		};
	}
	const decorators = ts.isParameter(declaration) && convertDecorators(ts, converter, declaration.modifiers);
	if (decorators)
	{	result = {...result, ...decorators};
	}
	return result;
}

function convertParamName(ts: typeof tsa, name: tsa.BindingName|tsa.QualifiedName, optional=false, tsType?: TsTypeDef): ParamDef
{	if (ts.isArrayBindingPattern(name))
	{	return {
			kind: 'array',
			elements: name.elements.map
			(	e =>
				{	if (!ts.isOmittedExpression(e))
					{	let result = convertParamName(ts, e.name);
						const right = convertDefaultValue(ts, e);
						if (right)
						{	result = {kind: 'assign', left: result, right};
						}
						if (e.dotDotDotToken)
						{	result = {kind: 'rest', arg: result};
						}
						return result;
					}
				}
			),
			optional,
			...(tsType && {tsType}),
		};
	}
	else if (ts.isObjectBindingPattern(name))
	{	return {
			kind: 'object',
			props: name.elements.map
			(	e =>
				{	if (e.dotDotDotToken)
					{	return {
							kind: 'rest',
							arg: convertParamName(ts, e.name),
						};
					}
					else if (e.propertyName)
					{	return {
							kind: 'keyValue',
							key: e.propertyName?.getText(),
							value: !e.initializer ? convertParamName(ts, e.name) :
							{	kind: 'assign',
								left:
								{	kind: 'identifier',
									name: e.name.getText(),
									optional: false,
								},
								right: convertDefaultValue(ts, e) ?? '',
							},
						};
					}
					else
					{	const value = convertDefaultValue(ts, e);
						return {
							kind: 'assign',
							key: ts.isIdentifier(e.name) ? e.name.text : '',
							...(value && {value}),
						};
					}
				}
			),
			optional,
			...(tsType && {tsType}),
		};
	}
	else
	{	return {
			kind: 'identifier',
			name: ts.isIdentifier(name) ? name.text : '_',
			optional,
			...(tsType && {tsType}),
		};
	}
}
