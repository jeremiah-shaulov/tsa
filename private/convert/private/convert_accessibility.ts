import {tsa} from '../../tsa.ts';
import {Accessibility} from '../../types/mod.ts';

export function convertAccessibility(ts: typeof tsa, modifiers?: readonly tsa.ModifierLike[]): {accessibility: Accessibility} | undefined
{	switch (modifiers?.find(m => m.kind==ts.SyntaxKind.PrivateKeyword || m.kind==ts.SyntaxKind.ProtectedKeyword || m.kind==ts.SyntaxKind.PublicKeyword)?.kind)
	{	case ts.SyntaxKind.PrivateKeyword:
			return {accessibility: 'private'};
		case ts.SyntaxKind.ProtectedKeyword:
			return {accessibility: 'protected'};
		case ts.SyntaxKind.PublicKeyword:
			return {accessibility: 'public'};
	}
}
