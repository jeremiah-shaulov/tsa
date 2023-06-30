import {tsa} from '../../tsa_ns.ts';
import {VariableDef} from '../../types/mod.ts';
import {convertType} from './convert_type.ts';
import {Converter} from './converter.ts';

export function convertVar(ts: typeof tsa, converter: Converter, declaration: tsa.VariableDeclaration, symbol: tsa.Symbol): VariableDef|undefined
{	const type: tsa.Type|tsa.TypeNode = converter.checker.getTypeAtLocation(declaration);
	return {
		tsType: convertType(ts, converter, type),
		kind: symbol.flags & ts.SymbolFlags.FunctionScopedVariable ? 'var' : declaration.getSourceFile().statements.some
		(	s => ts.isVariableStatement(s) && s.declarationList.declarations[0].pos == declaration.pos && (s.declarationList.flags & ts.NodeFlags.Const)
		) ? 'const' : 'let',
	};
}
