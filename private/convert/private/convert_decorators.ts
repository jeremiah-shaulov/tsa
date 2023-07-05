import {tsa} from '../../tsa_ns.ts';
import {DecoratorDef} from '../../doc_node/mod.ts';
import {resolveSymbol} from './util.ts';
import {convertLocation} from './convert_location.ts';
import {convertExpression} from './convert_expression.ts';
import {Converter} from './converter.ts';

export function convertDecorators(ts: typeof tsa, converter: Converter, modifiers?: readonly tsa.ModifierLike[])
{	if (modifiers)
	{	const decorators = new Array<DecoratorDef>();
		for (const m of modifiers)
		{	if (ts.isDecorator(m) && ts.isCallExpression(m.expression))
			{	const symbol = resolveSymbol(ts, converter.checker, converter.checker.getSymbolAtLocation(m.expression.expression));
				if (symbol?.valueDeclaration)
				{	const decorator =
					{	name: symbol.name,
						...
						(	m.expression.arguments.length==0 ? undefined :
							{	args: m.expression.arguments.map(a => convertExpression(ts, a))
							}
						),
						location: convertLocation(ts, converter, symbol.valueDeclaration),
					};
					decorators.push(decorator);
					converter.addRef(decorator, symbol);
				}
			}
		}
		if (decorators.length)
		{	return {decorators};
		}
	}
}
