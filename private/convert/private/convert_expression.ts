import {tsa} from '../../tsa.ts';
import {getText} from './util.ts';

export function convertExpression(ts: typeof tsa, expression: tsa.Expression)
{	switch (expression.kind)
	{	case ts.SyntaxKind.StringLiteral:
		case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
			return JSON.stringify(getText(ts, expression));
		default:
			return getText(ts, expression);
	}
}

export function convertDefaultValue(ts: typeof tsa, node: tsa.Declaration | undefined)
{	const initializer = node && (ts.isParameter(node) || ts.isPropertyDeclaration(node) || ts.isPropertyAssignment(node) || ts.isBindingElement(node)) ? node.initializer : undefined;
	return initializer && convertExpression(ts, initializer);
}
