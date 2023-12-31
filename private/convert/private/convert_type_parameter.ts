import {tsa} from '../../tsa_ns.ts';
import {TsTypeParamDef} from '../../doc_node/mod.ts';
import {convertType} from './convert_type.ts';
import {Converter} from './converter.ts';

export function convertTypeParameter(ts: typeof tsa, converter: Converter, param: tsa.TypeParameter)
{	const declaration = param.symbol?.declarations?.[0];
	if (declaration && ts.isTypeParameterDeclaration(declaration))
	{	return convertTypeParamNode(ts, converter, declaration);
	}
}

export function convertTypeParamNode(ts: typeof tsa, converter: Converter, param: tsa.TypeParameterDeclaration): TsTypeParamDef
{	return {
		name: param.name.text,
		...(param.constraint && {constraint: convertType(ts, converter, param.constraint)}),
		...(param.default && {default: convertType(ts, converter, param.default)}),
	};
}