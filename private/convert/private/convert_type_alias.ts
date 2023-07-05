import {tsa} from '../../tsa_ns.ts';
import {TypeAliasDef} from '../../doc_node/mod.ts';
import {convertType} from './convert_type.ts';
import {Converter} from './converter.ts';

export function convertTypeAlias(ts: typeof tsa, converter: Converter, declaration: tsa.TypeAliasDeclaration): TypeAliasDef|undefined
{	return {
		tsType: convertType(ts, converter, declaration.type),
		typeParams: declaration.typeParameters?.map
		(	p =>
			(	{	name: p.name.getText(),
					...(p.constraint && {constraint: convertType(ts, converter, p.constraint)}),
					...(p.default && {default: convertType(ts, converter, p.default)}),
				}
			)
		) ?? [],
	};
}
