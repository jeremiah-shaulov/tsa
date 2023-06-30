import {tsa} from '../../tsa_ns.ts';
import {FunctionDef} from '../../types/mod.ts';
import {convertTypeParameter} from './convert_type_parameter.ts';
import {convertParameter} from './convert_parameter.ts';
import {convertSignatureReturnType} from './convert_index_signature.ts';
import {Converter} from './converter.ts';

export function convertFunction(ts: typeof tsa, converter: Converter, declaration: tsa.FunctionDeclaration): FunctionDef|undefined
{	const sig = converter.checker.getSignatureFromDeclaration(declaration);
	return {
		params: sig?.parameters.map((param, i) => convertParameter(ts, converter, param, declaration.parameters[i])) ?? [],
		returnType: convertSignatureReturnType(ts, converter, sig),
		hasBody: declaration.body != undefined,
		isAsync: declaration.modifiers?.some(m => m.kind == ts.SyntaxKind.AsyncKeyword) ?? false,
		isGenerator: declaration.asteriskToken != undefined,
		typeParams: sig?.typeParameters?.map(param => convertTypeParameter(ts, converter, param)!).filter(param => param) ?? [],
	};
}
