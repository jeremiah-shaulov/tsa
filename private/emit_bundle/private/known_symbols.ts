import {tsa} from '../../tsa_ns.ts';
import {getSymbolName, isNamespaceButNotFromLib} from './util.ts';

const RE_MODULE_NAME = /(\w+?)(?:[\/\\](?:mod|index|main))?(?:\.\w{1,4})?(?:\.map)?"?$/i; // `symbol.name` for module can be quoted

export class KnownSymbols
{	symbolsNames = new Map<tsa.Symbol, string>; // maps all symbols that top-level statements declare, to their names in the result (they can be renamed)
	namesSymbols = new Map<string, tsa.Symbol>; // the reverse of `symbolsNames`

	add(ts: typeof tsa, sourceFile: tsa.SourceFile, excludeLibDirectory: string, symbol: tsa.Symbol)
	{	const {symbolsNames, namesSymbols} = this;
		let name = symbolsNames.get(symbol);
		if (name == undefined)
		{	let baseName = '';
			if (isNamespaceButNotFromLib(ts, excludeLibDirectory, symbol))
			{	baseName = symbol.name.match(RE_MODULE_NAME)?.[1] ?? 'ns';
			}
			else
			{	baseName = getSymbolName(ts, symbol);
				if (!baseName)
				{	baseName = sourceFile.fileName.match(RE_MODULE_NAME)?.[1] ?? 'defaultExport';
				}
			}
			name = !namesSymbols.get(baseName) ? baseName : getUniqueName(namesSymbols, baseName);
			symbolsNames.set(symbol, name);
			namesSymbols.set(name, symbol);
		}
		return name;
	}
}

function getUniqueName(namesSymbols: Map<string, tsa.Symbol>, base: string)
{	for (let i=2; true; i++)
	{	const name = base + i.toString(16);
		if (!namesSymbols.has(name))
		{	return name;
		}
	}
}
