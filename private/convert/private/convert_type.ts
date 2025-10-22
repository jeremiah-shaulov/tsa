import {tsa} from '../../tsa_ns.ts';
import {TsTypeDef, ClassIndexSignatureDef, LiteralPropertyDef, LiteralCallSignatureDef, LiteralMethodDef, TsTypeParamDef, ParamDef} from '../../doc_node/mod.ts';
import {convertParameter, convertParameterNode} from './convert_parameter.ts';
import {convertTypeParameter, convertTypeParamNode} from './convert_type_parameter.ts';
import {resolveSymbol, getText, removeUndefined, setMemberName} from './util.ts';
import {convertSignatureReturnType, createPredicate} from './convert_index_signature.ts';
import {Converter} from './converter.ts';
import {convertJsDoc} from './convert_js_doc.ts';

export const TYPE_NOT_DETECTED: TsTypeDef = {repr: 'unknown', kind: 'keyword', keyword: 'unknown'};

export function convertType(ts: typeof tsa, converter: Converter, typeNodeOrType?: tsa.TypeNode|tsa.Type): TsTypeDef
{	let tsType: TsTypeDef|undefined;
	if (typeNodeOrType)
	{	const node = 'kind' in typeNodeOrType ? typeNodeOrType : converter.checker.typeToTypeNode(typeNodeOrType, undefined, ts.NodeBuilderFlags.IgnoreErrors);
		if (node)
		{	const origType = 'kind' in typeNodeOrType ?  undefined : typeNodeOrType;
			tsType = doConvertType(ts, converter, origType, node);
		}
	}
	return tsType ?? TYPE_NOT_DETECTED;
}

function doConvertType(ts: typeof tsa, converter: Converter, origType: tsa.Type|undefined, node: tsa.TypeNode): TsTypeDef|undefined
{	if (ts.isArrayTypeNode(node))
	{	const elementType = origType && 'typeArguments' in origType && Array.isArray(origType.typeArguments) && origType.typeArguments.length==1 && origType.symbol.name=='Array' ? origType.typeArguments[0] as tsa.Type : node.elementType;
		const array = convertType(ts, converter, elementType);
		return {
			repr: array.repr+'[]', // no need parentheses, because tsc returns `ParenthesizedTypeNode` where needed
			kind: 'array',
			array,
		};
	}
	else if (ts.isConditionalTypeNode(node))
	{	const checkType = convertType(ts, converter, node.checkType);
		const extendsType = convertType(ts, converter, node.extendsType);
		const trueType = convertType(ts, converter, node.trueType);
		const falseType = convertType(ts, converter, node.falseType);
		return {
			repr: `${checkType.repr} extends ${extendsType.repr} ? ${trueType.repr} : ${falseType.repr}`,
			kind: 'conditional',
			conditionalType:
			{	checkType,
				extendsType,
				trueType,
				falseType,
			}
		};
	}
	else if (ts.isConstructorTypeNode(node) || ts.isFunctionTypeNode(node))
	{	const type = origType ?? converter.checker.getTypeFromTypeNode(node);
		const typeParams = node.typeParameters?.map(param => convertTypeParamNode(ts, converter, param)) ?? [];
		const sigParameters = type.getCallSignatures()[0]?.parameters;
		const params = node.parameters.map((param, i) => convertParameterNode(ts, converter, param, sigParameters?.[i]?.valueDeclaration));
		const tsType = convertType(ts, converter, node.type);
		return {
			repr: (ts.isConstructorTypeNode(node) ? 'new' : '') + typeParamsToRepr(typeParams) + `(` + params.map(p => paramDefToRepr(p)).join(', ') + '): ' + tsType.repr,
			kind: 'fnOrConstructor',
			fnOrConstructor:
			{	constructor: ts.isConstructorTypeNode(node),
				tsType,
				params,
				typeParams,
			},
		};
	}
	else if (ts.isExpressionWithTypeArguments(node))
	{	const targetSymbol = converter.checker.getSymbolAtLocation(node.expression);
		if (!targetSymbol)
		{	return convertType(ts, converter, converter.checker.getTypeAtLocation(node));
		}
		const symbol = resolveSymbol(ts, converter.checker, targetSymbol);
		if (symbol)
		{	const typeParams = node.typeArguments?.map(type => convertType(ts, converter, type));
			const typeRef =
			{	...(typeParams?.length && {typeParams}),
				typeName: symbol.name,
			};
			converter.addTypeRef(typeRef, symbol, origType, node);
			return {
				repr: symbol.name + (!typeParams?.length ? '' : '<'+typeParams.map(p => p.repr).join(', ')+'>'),
				kind: 'typeRef',
				typeRef,
			};
		}
	}
	else if (ts.isImportTypeNode(node))
	{	const symbol = converter.checker.getSymbolAtLocation(node);
		if (symbol)
		{	return {
				repr: '', // TODO: ...
				kind: 'importType',
				importType:
				{	specifier: resolveSymbol(ts, converter.checker, symbol)?.name || '',
					qualifier: getText(ts, node.qualifier),
					// typeParams: TODO: ...
				}
			};
		}
	}
	else if (ts.isIndexedAccessTypeNode(node))
	{	const objType = convertType(ts, converter, node.objectType);
		const indexType = convertType(ts, converter, node.indexType);
		return {
			repr: objType.repr + '[' + indexType.repr + ']',
			kind: 'indexedAccess',
			indexedAccess:
			{	readonly: false, // TODO: ...
				objType,
				indexType,
			}
		};
	}
	else if (ts.isInferTypeNode(node))
	{	const name = node.typeParameter.name.text;
		const constraint = node.typeParameter.constraint && convertType(ts, converter, node.typeParameter.constraint);
		const def = node.typeParameter.default && convertType(ts, converter, node.typeParameter.default);
		return {
			repr: 'infer ' + name + (!constraint ? '' : ' extends '+constraint.repr) + (!def ? '' : ' = '+def.repr),
			kind: 'infer',
			infer:
			{	typeParam:
				{	name,
					...(constraint && {constraint}),
					...(def && {default: def}),
				},
			},
		};
	}
	else if (ts.isOptionalTypeNode?.(node))
	{	const optional = removeUndefined(convertType(ts, converter, node.type), true);
		return {
			repr: optional.repr + '?',
			kind: 'optional',
			optional,
		};
	}
	else if (ts.isParenthesizedTypeNode(node))
	{	const parenthesized = convertType(ts, converter, node.type);
		return {
			repr: '(' + parenthesized.repr + ')',
			kind: 'parenthesized',
			parenthesized,
		};
	}
	else if (ts.isTypePredicateNode(node))
	{	const asserts = node.assertsModifier != undefined;
		const paramName = ts.isThisTypeNode(node.parameterName) ? undefined : getText(ts, node.parameterName);
		return createPredicate(ts, converter, asserts, paramName, node.type);
	}
	else if (ts.isTypeQueryNode(node))
	{	const typeQuery = getText(ts, node.exprName);
		return {
			repr: 'typeof ' + typeQuery,
			kind: 'typeQuery',
			typeQuery,
		};
	}
	else if (ts.isTypeLiteralNode(node))
	{	const properties = new Array<LiteralPropertyDef>();
		const indexSignatures = new Array<ClassIndexSignatureDef>();
		const callSignatures = new Array<LiteralCallSignatureDef>();
		const methods = new Array<LiteralMethodDef>();
		for (const member of node.members)
		{	if (ts.isPropertySignature(member))
			{	const symbol = converter.checker.getSymbolAtLocation(member.name);
				const readonly = member.modifiers?.some(m => m.kind == ts.SyntaxKind.ReadonlyKeyword) ?? false;
				properties.push
				(	setMemberName
					(	ts,
						converter,
						{	name: getText(ts, member.name),
							params: [],
							...(readonly && {readonly}),
							computed: ts.isComputedPropertyName(member.name),
							optional: member.questionToken != undefined,
							tsType: member.type && convertType(ts, converter, member.type),
							typeParams: [],
							...(symbol && convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), member)),
						},
						member.name
					)
				);
			}
			else if (ts.isIndexSignatureDeclaration(member))
			{	const symbol = 'symbol' in member ? member.symbol as tsa.Symbol : undefined;
				indexSignatures.push
				(	{	readonly: member.modifiers?.some(m => m.kind == ts.SyntaxKind.ReadonlyKeyword) ?? false,
						params: member.parameters.map(param => convertParameterNode(ts, converter, param)),
						tsType: member.type && convertType(ts, converter, member.type),
						...(symbol && convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), member)),
					}
				);
			}
			else if (ts.isCallSignatureDeclaration(member))
			{	const symbol = 'symbol' in member ? member.symbol as tsa.Symbol : undefined;
				callSignatures.push
				(	{	params: member.parameters.map(param => convertParameterNode(ts, converter, param)),
						tsType: member.type && convertType(ts, converter, member.type),
						typeParams: member.typeParameters?.map(type => convertTypeParamNode(ts, converter, type)) ?? [],
						...(symbol && convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), member)),
					}
				);
			}
			else if (ts.isConstructSignatureDeclaration(member) || ts.isConstructorDeclaration(member))
			{	const symbol = 'symbol' in member ? member.symbol as tsa.Symbol : undefined;
				methods.push
				(	{	name: 'new',
						kind: 'method',
						params: member.parameters.map(param => convertParameterNode(ts, converter, param)),
						optional: member.questionToken != undefined,
						returnType: member.type && convertType(ts, converter, member.type),
						typeParams: member.typeParameters?.map(type => convertTypeParamNode(ts, converter, type)) ?? [],
						...(symbol && convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), member)),
					}
				);
			}
			else if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member))
			{	const symbol = converter.checker.getSymbolAtLocation(member.name);
				const sig = converter.checker.getSignatureFromDeclaration(member);
				methods.push
				(	setMemberName
					(	ts,
						converter,
						{	name: getText(ts, member.name),
							kind: 'method',
							params: sig?.parameters.map(param => convertParameter(ts, converter, param)) ?? member.parameters.map(param => convertParameterNode(ts, converter, param)),
							optional: member.questionToken != undefined,
							returnType: sig ? convertSignatureReturnType(ts, converter, sig) : member.type && convertType(ts, converter, member.type),
							typeParams: sig?.typeParameters?.map(param => convertTypeParameter(ts, converter, param)!).filter(param => param) ?? member.typeParameters?.map(type => convertTypeParamNode(ts, converter, type)) ?? [],
							...(ts.isComputedPropertyName(member.name) ? {computed: true} : undefined),
							...(symbol && convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), member)),
						},
						member.name
					)
				);
			}
			else if (ts.isGetAccessor(member) || ts.isGetAccessorDeclaration(member) || ts.isSetAccessor(member) || ts.isSetAccessorDeclaration(member))
			{	const symbol = converter.checker.getSymbolAtLocation(member.name);
				const sig = converter.checker.getSignatureFromDeclaration(member);
				methods.push
				(	setMemberName
					(	ts,
						converter,
						{	name: getText(ts, member.name),
							kind: ts.isGetAccessor(member) || ts.isGetAccessorDeclaration(member) ? 'getter' : 'setter',
							params: sig?.parameters.map(param => convertParameter(ts, converter, param)) ?? member.parameters.map(param => convertParameterNode(ts, converter, param)),
							optional: member.questionToken != undefined,
							...
							(	!ts.isGetAccessor(member) && !ts.isGetAccessorDeclaration(member) ? undefined :
								{	returnType: removeUndefined(convertType(ts, converter, sig?.getReturnType() ?? member.type), member.questionToken!=undefined)
								}
							),
							typeParams: [],
							...(ts.isComputedPropertyName(member.name) ? {computed: true} : undefined),
							...(symbol && convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), member)),
						},
						member.name
					)
				);
			}
		}
		return {
			repr:
			(	'{' +
				properties.map
				(	sig => (sig.readonly ? 'readonly ' : '') + sig.name + (sig.optional ? '?' : '') + (!sig.tsType ? '' : ': ' + sig.tsType.repr) + '; '
				).join('') + indexSignatures.map
				(	sig => (sig.readonly ? 'readonly ' : '') + '[' + sig.params.map(param => paramDefToRepr(param)).join(', ') + ']: ' + (!sig.tsType ? 'unknown' : sig.tsType.repr) + '; '
				).join('') + callSignatures.map
				(	sig => (!sig.typeParams.length ? '' : '<'+sig.typeParams.map(param => param.name + (!param.constraint ? '' : ' extends '+param.constraint.repr) + (!param.default ? '' : ' = '+param.default.repr)).join(', ')+'>') + '(' + sig.params.map(param => paramDefToRepr(param)).join(', ') + '): ' + (!sig.tsType ? 'unknown' : sig.tsType.repr) + '; '
				).join('') + methods.map
				(	sig => sig.name + (!sig.typeParams.length ? '' : '<'+sig.typeParams.map(param => param.name + (!param.constraint ? '' : ' extends '+param.constraint.repr) + (!param.default ? '' : ' = '+param.default.repr)).join(', ')+'>') + (sig.optional ? '?(' : '(') + sig.params.map(param => paramDefToRepr(param)).join(', ') + '): ' + (!sig.returnType ? 'unknown' : sig.returnType.repr) + '; '
				).join('') +
				'}'
			),
			kind: 'typeLiteral',
			typeLiteral:
			{	methods,
				properties,
				callSignatures,
				indexSignatures,
			}
		};
	}
	else if (ts.isTypeReferenceNode(node))
	{	const typeName = getText(ts, node.typeName);
		if (typeName)
		{	const typeParams = (origType && 'typeArguments' in origType && origType.typeArguments ? origType.typeArguments as tsa.Type[] : node.typeArguments)?.map(type => convertType(ts, converter, type));
			const typeRef =
			{	...(typeParams?.length && {typeParams}),
				typeName,
			};
			converter.addTypeRef(typeRef, undefined, origType, node);
			return {
				repr: typeName + (!typeParams?.length ? '' : '<' + typeParams.map(p => p.repr).join(', ') + '>'),
				kind: 'typeRef',
				typeRef,
			};
		}
	}
	else if (ts.isRestTypeNode?.(node))
	{	const rest = convertType(ts, converter, node.type);
		return {
			kind: 'rest',
			repr: '...' + rest.repr,
			rest,
		};
	}
	else if (ts.isMappedTypeNode(node))
	{	const optionalModifier = node.questionToken?.kind;
		const readonlyModifier = node.readonlyToken?.kind;

		const optional = optionalModifier==ts.SyntaxKind.QuestionToken ? true : optionalModifier==ts.SyntaxKind.PlusToken ? '+' : optionalModifier==ts.SyntaxKind.MinusToken ? '-' : undefined;
		const readonly = readonlyModifier==ts.SyntaxKind.ReadonlyKeyword ? true : readonlyModifier==ts.SyntaxKind.PlusToken ? '+' : readonlyModifier==ts.SyntaxKind.MinusToken ? '-' : undefined;

		const templateType = removeUndefined(convertType(ts, converter, node.type), optional===true || optional==='+');

		const name = node.typeParameter.name.text;
		const constraint = convertType(ts, converter, node.typeParameter.constraint);
		const nameType = node.nameType && convertType(ts, converter, node.nameType);

		return {
			repr: '{' + (readonly===true ? 'readonly ' : readonly==='+' ? '+readonly ' : readonly==='-' ? '-readonly ' : '') + '[' + name + ' in ' + constraint.repr + (!nameType ? '' : ' as '+nameType.repr) + ']' + (optional===true ? '?' : optional==='+' ? '+?' : optional==='-' ? '-?' : '') + ': ' + templateType.repr + '}',
			kind: 'mapped',
			mappedType:
			{	typeParam:
				{	name,
					...(constraint && {constraint}),
				},
				tsType: templateType,
				...(optional && {optional}),
				...(readonly && {readonly}),
				...(nameType && {nameType}),
			},
		};
	}
	else if (ts.isLiteralTypeNode(node))
	{	switch (node.literal.kind)
		{	case ts.SyntaxKind.TrueKeyword:
				return {repr: 'true', kind: 'literal', literal: {kind: 'boolean', boolean: true}};
			case ts.SyntaxKind.FalseKeyword:
				return {repr: 'false', kind: 'literal', literal: {kind: 'boolean', boolean: false}};
			case ts.SyntaxKind.NullKeyword:
				return {repr: 'null', kind: 'keyword', keyword: 'null'};
			case ts.SyntaxKind.StringLiteral:
				return {repr: JSON.stringify(node.literal.text), kind: 'literal', literal: {kind: 'string', string: node.literal.text}};
			case ts.SyntaxKind.NumericLiteral:
				return {repr: node.literal.text, kind: 'literal', literal: {kind: 'number', number: Number(node.literal.text)}};
			default:
				if (ts.isBigIntLiteral(node.literal))
				{	return {repr: node.literal.text, kind: 'literal', literal: {kind: 'bigInt', string: node.literal.text.slice(0, -1)}}; // cut 'n' at the end of 123n
				}
				else if (ts.isNoSubstitutionTemplateLiteral(node.literal))
				{	return {repr: JSON.stringify(node.literal.text), kind: 'literal', literal: {kind: 'string', string: node.literal.text}};
				}
				else if (ts.isPrefixUnaryExpression(node.literal) && node.literal.operator==ts.SyntaxKind.MinusToken)
				{	const {operand} = node.literal;
					switch (operand.kind)
					{	case ts.SyntaxKind.NumericLiteral:
							return {repr: '-'+getText(ts, operand), kind: 'literal', literal: {kind: 'number', number: -Number(getText(ts, operand))}};
						case ts.SyntaxKind.BigIntLiteral:
							return {repr: '-'+getText(ts, operand), kind: 'literal', literal: {kind: 'bigInt', string: '-'+getText(ts, operand).slice(0, -1)}}; // cut 'n' at the end of 123n
						default:
							return {repr: '-'+JSON.stringify(getText(ts, operand)), kind: 'literal', literal: {kind: 'string', string: '-'+getText(ts, operand)}};
					}
				}
		}
		return {repr: JSON.stringify(getText(ts, node.literal)), kind: 'literal', literal: {kind: 'string', string: getText(ts, node.literal)}};
	}
	else if (ts.isTemplateLiteralTypeNode?.(node))
	{	const tsTypes: TsTypeDef[] =
		[	{	repr: JSON.stringify(node.head.text),
				kind: 'literal',
				literal:
				{	kind: 'string',
					string: node.head.text,
				}
			},
			...node.templateSpans.flatMap<TsTypeDef>
			(	span =>
				[	convertType(ts, converter, span.type),
					{	repr: JSON.stringify(span.literal.text),
						kind: 'literal',
						literal:
						{	kind: 'string',
							string: span.literal.text,
						}
					}
				]
			)
		];
		return {
			repr: '`' + tsTypes.map((tsType, i) => i%2 ? '${'+tsType.repr+'}' : tsType.repr.slice(1, -1).replaceAll('${', '$\\{')).join('') + '`',
			kind: 'literal',
			literal:
			{	kind: 'template',
				tsTypes,
			},
		};
	}
	else if (ts.isThisTypeNode(node))
	{	return {repr: 'this', kind: 'this', this: true};
	}
	else if (ts.isTypeOperatorNode(node))
	{	let operator = '';
		switch (node.operator)
		{	case ts.SyntaxKind.KeyOfKeyword:
				operator = 'keyof';
				break;
			case ts.SyntaxKind.UniqueKeyword:
				operator = 'unique';
				break;
			case ts.SyntaxKind.ReadonlyKeyword:
				operator = 'readonly';
				break;
		}
		if (operator)
		{	const tsType = convertType(ts, converter, node.type);
			return {
				repr: operator+' '+tsType.repr,
				kind: 'typeOperator',
				typeOperator:
				{	operator,
					tsType,
				},
			};
		}
	}
	else if (ts.isTupleTypeNode(node))
	{	const tuple = origType && 'typeArguments' in origType && Array.isArray(origType.typeArguments) ?
			origType.typeArguments.map(node => convertType(ts, converter, ts.isNamedTupleMember(node) ? node.type : node)) :
			node.elements.map(node => convertType(ts, converter, ts.isNamedTupleMember(node) ? node.type : node));
		if (tuple.length)
		{	return {
				repr: '[' + tuple.map(p => p.repr).join(', ') + ']',
				kind: 'tuple',
				tuple,
			};
		}
	}
	else if (ts.isUnionTypeNode(node))
	{	const union = node.types.map(type => convertType(ts, converter, type));
		if (union.length)
		{	return {
				repr: union.map(p => p.repr).join(' | '),
				kind: 'union',
				union,
			};
		}
	}
	else if (ts.isIntersectionTypeNode(node))
	{	const intersection = node.types.map(type => convertType(ts, converter, type));
		if (intersection.length)
		{	return {
				repr: intersection.map(p => p.repr).join(' & '),
				kind: 'intersection',
				intersection,
			};
		}
	}
	else if (ts.isJSDocVariadicType(node))
	{	const array = convertType(ts, converter, node.type);
		return {
			kind: 'array',
			repr: array.repr + '[]',
			array,
		};
	}
	else if (ts.isJSDocNullableType(node))
	{	const type = convertType(ts, converter, node.type);
		return {
			repr: type.repr+' | null',
			kind: 'union',
			union: [type, {repr: 'null', kind: 'keyword', keyword: 'null'}],
		};
	}
	else if (ts.isJSDocNonNullableType(node))
	{	return convertType(ts, converter, node.type);
	}
	else if (ts.isJSDocSignature(node))
	{	const tsType = convertType(ts, converter, node.type?.typeExpression?.type);
		const params = node.parameters.map(param => convertParameterNode(ts, converter, param));
		const typeParams = node.typeParameters?.flatMap(tag => tag.typeParameters).map(param => convertTypeParamNode(ts, converter, param)) ?? [];
		return {
			repr: typeParamsToRepr(typeParams) + `(` + params.map(p => paramDefToRepr(p)).join(', ') + '): ' + tsType.repr,
			kind: 'fnOrConstructor',
			fnOrConstructor:
			{	constructor: ts.isConstructorTypeNode(node),
				tsType,
				params,
				typeParams,
			},
		};
	}
	else if (ts.isJSDocTypeLiteral(node))
	{	const properties = new Array<LiteralPropertyDef>();
		if (node.jsDocPropertyTags)
		{	for (const tag of node.jsDocPropertyTags)
			{	if (ts.isJSDocPropertyTag(tag))
				{	properties.push
					(	{	name: tag.name.getText(),
							params: [],
							computed: false,
							optional: tag.isBracketed,
							tsType: convertType(ts, converter, tag.typeExpression),
							typeParams: [],
						}
					);
				}
				else if (ts.isJSDocParameterTag(tag))
				{	properties.push(convertJSDocParameterTag(ts, converter, tag));
				}
			}
		}
		let doc: TsTypeDef =
		{	repr: '{' + properties.map(sig => sig.name + (sig.optional ? '?' : '') + (!sig.tsType ? '' : ': ' + sig.tsType.repr)).join('; ') + '}',
			kind: 'typeLiteral',
			typeLiteral:
			{	methods: [],
				properties,
				callSignatures: [],
				indexSignatures: [],
			}
		};
		if (node.isArrayType)
		{	doc =
			{	kind: 'array',
				repr: doc.repr + '[]',
				array: doc,
			};
		}
		return doc;
	}
	else if (ts.isJSDocTypeExpression(node))
	{	return convertType(ts, converter, node.type);
	}
	else
	{	switch (node.kind)
		{	case ts.SyntaxKind.AnyKeyword:
				return {repr: 'any', kind: 'keyword', keyword: 'any'};
			case ts.SyntaxKind.BigIntKeyword:
				return {repr: 'bigint', kind: 'keyword', keyword: 'bigint'};
			case ts.SyntaxKind.BooleanKeyword:
				return {repr: 'boolean', kind: 'keyword', keyword: 'boolean'};
			case ts.SyntaxKind.NeverKeyword:
				return {repr: 'never', kind: 'keyword', keyword: 'never'};
			case ts.SyntaxKind.NumberKeyword:
				return {repr: 'number', kind: 'keyword', keyword: 'number'};
			case ts.SyntaxKind.ObjectKeyword:
				return {repr: 'object', kind: 'keyword', keyword: 'object'};
			case ts.SyntaxKind.StringKeyword:
				return {repr: 'string', kind: 'keyword', keyword: 'string'};
			case ts.SyntaxKind.SymbolKeyword:
				return {repr: 'symbol', kind: 'keyword', keyword: 'symbol'};
			case ts.SyntaxKind.UndefinedKeyword:
				return {repr: 'undefined', kind: 'keyword', keyword: 'undefined'};
			case ts.SyntaxKind.UnknownKeyword:
				return {repr: 'unknown', kind: 'keyword', keyword: 'unknown'};
			case ts.SyntaxKind.VoidKeyword:
				return {repr: 'void', kind: 'keyword', keyword: 'void'};
		}
	}
}

function typeParamsToRepr(typeParams: TsTypeParamDef[])
{	return typeParams.length==0 ? '' : '<' + typeParams.map(p => p.name + (p.constraint ? ' extends '+p.constraint.repr : '') + (p.default ? ' = '+p.default.repr : '')).join(', ') + '>';
}

function paramDefToRepr(param: ParamDef): string
{	switch (param.kind)
	{	case 'identifier':
			return param.name + (param.optional ? '?' : '') + (!param.tsType ? '' : ': '+param.tsType.repr);
		case 'assign':
			return paramDefToRepr(param.left) + (!param.tsType ? '' : ': '+param.tsType.repr) + '=' + param.right;
		case 'rest':
			return '...' + paramDefToRepr(param.arg);
		case 'array':
			return '[' + param.elements.map(p => !p ? '_' : paramDefToRepr(p)).join(', ') + ']' + (param.optional ? '?' : '') + (!param.tsType ? '' : ': '+param.tsType.repr);
		case 'object':
			return '{' + param.props.map
			(	p =>
				{	switch (p.kind)
					{	case 'assign':
							return p.key + (p.value ? ' = '+p.value : '');
						case 'keyValue':
							return p.key + paramDefToRepr(p.value);
						case 'rest':
							return '...'+paramDefToRepr(p.arg);
					}
				}
			).join(', ') + '}' + (param.optional ? '?' : '') + (!param.tsType ? '' : ': '+param.tsType.repr);
	}
}

function convertJSDocParameterTag(ts: typeof tsa, converter: Converter, tag: tsa.JSDocParameterTag): LiteralPropertyDef
{	const name = (ts.isQualifiedName(tag.name) ? tag.name.right : tag.name).getText();
	const properties = new Array<LiteralPropertyDef>();
	let isArray = false;
	if (tag.typeExpression)
	{	const tagExprType = tag.typeExpression.type;
		if (!ts.isJSDocTypeLiteral(tagExprType))
		{	return {
				name,
				params: [],
				computed: false,
				optional: tag.isBracketed,
				tsType: convertType(ts, converter, tagExprType),
				typeParams: [],
			};
		}
		isArray = tagExprType.isArrayType;
		if (tagExprType.jsDocPropertyTags)
		{	for (const tag of tagExprType.jsDocPropertyTags)
			{	if (ts.isJSDocParameterTag(tag))
				{	properties.push(convertJSDocParameterTag(ts, converter, tag));
				}
			}
		}
	}
	const tsType: TsTypeDef =
	{	repr: '{' + properties.map(sig => sig.name + (sig.optional ? '?' : '') + (!sig.tsType ? '' : ': ' + sig.tsType.repr)).join('; ') + '}',
		kind: 'typeLiteral',
		typeLiteral:
		{	methods: [],
			properties,
			callSignatures: [],
			indexSignatures: [],
		}
	};
	return {
		name,
		params: [],
		computed: false,
		optional: tag.isBracketed,
		tsType: !isArray ? tsType :
		{	kind: 'array',
			repr: tsType.repr + '[]',
			array: tsType,
		},
		typeParams: [],
	};
}
