import {tsa} from '../../tsa.ts';
import {EnumDef, EnumMemberDef} from '../../types/mod.ts';
import {convertJsDoc} from './convert_js_doc.ts';
import {convertLocation} from './convert_location.ts';
import {Converter} from './converter.ts';

export function convertEnum(ts: typeof tsa, converter: Converter, declaration: tsa.EnumDeclaration, symbol: tsa.Symbol): EnumDef
{	const isConst = !!(symbol.flags & ts.SymbolFlags.ConstEnum);
	const members = new Array<EnumMemberDef>();
	for (const member of declaration.members)
	{	if (!converter.ignoreDeclaration(member))
		{	const value = converter.checker.getConstantValue(member);
			const memberSymbol = converter.checker.getSymbolAtLocation(member.name);
			members.push
			(	{	name: member.name.getText(),
					...convertJsDoc(ts, converter, memberSymbol?.getDocumentationComment(converter.checker), ts.getJSDocTags(member)),
					...
					(	typeof(value)=='number' ? {init: {repr: value+'', kind: 'literal', literal: {kind: 'number', number: value}}} :
						typeof(value)=='string' ? {init: {repr: JSON.stringify(value), kind: 'literal', literal: {kind: 'string', string: value}}} :
						undefined
					),
					location: convertLocation(ts, converter, member),
				}
			);
		}
	}
	return {
		...(isConst && {isConst}),
		members,
	};
}
