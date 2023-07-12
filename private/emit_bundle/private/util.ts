import {tsa} from '../../tsa_ns.ts';

/**	For each `I`, remove `array[removeIndices[I]]`.
	After the operation `removeIndices` will end up sorted.
 **/
export function massSpliceRemove<T>(array: Array<T>, removeIndices: number[])
{	removeIndices.sort((a, b) => a - b); // ascendant order
	for (let i=removeIndices.length-1; i>=0; i--)
	{	const pos = i + 1;
		while (i>0 && removeIndices[i-1] == removeIndices[i]-1)
		{	i--;
		}
		array.splice(removeIndices[i], pos-i);
	}
}

export function symbolIsType(ts: typeof tsa, resolvedSymbol: tsa.Symbol)
{	return !!(resolvedSymbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias));
}

export function resolveSymbol<T extends tsa.Symbol|undefined>(ts: typeof tsa, checker: tsa.TypeChecker, symbol: T)
{	if (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	return checker.getAliasedSymbol(symbol);
	}
	return symbol;
}

export function getSymbolName(ts: typeof tsa, symbol: tsa.Symbol)
{	let {name} = symbol;
	if (name == 'default')
	{	name = '';
		const declarations = symbol.getDeclarations();
		if (declarations)
		{	for (const d of declarations)
			{	if (ts.isFunctionDeclaration(d))
				{	if (d.name && d.body)
					{	name = d.name.text;
						break;
					}
				}
				else if (ts.isClassDeclaration(d) || ts.isInterfaceDeclaration(d) || ts.isEnumDeclaration(d) || ts.isTypeAliasDeclaration(d))
				{	if (d.name)
					{	name = d.name.text;
						break;
					}
				}
				else if (ts.isVariableDeclaration(d))
				{	if (ts.isIdentifier(d.name))
					{	name = d.name.text;
						break;
					}
				}
			}
		}
	}
	return name;
}

export function isNamespaceButNotFromLib(ts: typeof tsa, excludeLibDirectory: string, symbol: tsa.Symbol)
{	return symbol.flags & ts.SymbolFlags.Module && symbol.valueDeclaration?.getSourceFile()?.fileName.startsWith(excludeLibDirectory) === false;
}
