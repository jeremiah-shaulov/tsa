import {tsa} from '../../tsa_ns.ts';
import {TsTypeTypePredicateDef, ClassIndexSignatureDef} from '../../doc_node/mod.ts';
import {convertType} from './convert_type.ts';
import {getText} from './util.ts';
import {Converter} from './converter.ts';
import {convertJsDoc} from './convert_js_doc.ts';
import {convertLocation} from './convert_location.ts';

export function convertSignatureReturnType(ts: typeof tsa, converter: Converter, sig?: tsa.Signature)
{	const predicate = sig && converter.checker.getTypePredicateOfSignature(sig);
	return !predicate ? convertType(ts, converter, sig?.getReturnType()) : createPredicate
	(	ts,
		converter,
		predicate.kind==ts.TypePredicateKind.AssertsThis || predicate.kind==ts.TypePredicateKind.AssertsIdentifier,
		predicate.kind==ts.TypePredicateKind.Identifier || predicate.kind==ts.TypePredicateKind.AssertsIdentifier ? predicate.parameterName : undefined,
		predicate.type
	);
}

export function createPredicate(ts: typeof tsa, converter: Converter, asserts: boolean, paramName?: string, typeOrNode?: tsa.Type|tsa.TypeNode): TsTypeTypePredicateDef
{	const type = typeOrNode && convertType(ts, converter, typeOrNode);
	return {
		repr: (asserts ? 'asserts ' : '') + (paramName ?? 'this') + (!type ? '' : ' is ' + type.repr),
		kind: 'typePredicate',
		typePredicate:
		{	asserts,
			param: paramName==undefined ?
			{	type: 'this',
			} :
			{	type: 'identifier',
				name: paramName,
			},
			...(type && {type}),
		}
	};
}

export function convertIndexSignature(ts: typeof tsa, converter: Converter, index: tsa.IndexInfo): ClassIndexSignatureDef
{	const {declaration} = index;
	// i don't know how to get to the symbol using public API, so i'll use hack:
	// TODO: stop using hack
	const symbol = declaration && 'symbol' in declaration ? declaration.symbol as tsa.Symbol : undefined;
	return {
		...(symbol && declaration && convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration))),
		...(declaration && {location: convertLocation(ts, converter, declaration)}),
		readonly: index.isReadonly,
		params:
		[	{	kind: 'identifier',
				name: getText(ts, declaration?.parameters[0]?.name) || 'key',
				optional: false,
				tsType: convertType(ts, converter, index.keyType),
			}
		],
		tsType: convertType(ts, converter, index.type),
	};
}
