import {tsa} from '../../tsa_ns.ts';
import {getSymbolName, isNamespaceButNotFromLib} from './util.ts';

const RE_MODULE_NAME = /(\w+?)(?:[\/\\](?:mod|index|main))?(?:\.\w{1,4})?(?:\.map)?"?$/i; // `symbol.name` for module can be quoted
const KEYWORDS = new Set
(	[	'any', 'as', 'boolean', 'break', 'case', 'catch', 'class', 'const', 'constructor', 'continue',
		'debugger', 'declare', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false',
		'finally', 'for', 'from', 'function', 'get', 'if', 'implements', 'import', 'in', 'instanceof',
		'interface', 'let', 'module', 'new', 'null', 'number', 'of', 'package', 'private', 'protected',
		'public', 'require', 'return', 'set', 'static', 'string', 'super', 'switch', 'symbol', 'this',
		'throw', 'true', 'try', 'type', 'typeof', 'var', 'void', 'while', 'with', 'yield'
	]
);

export class KnownSymbols
{	symbolsNames = new Map<tsa.Symbol, string>; // maps all symbols that top-level statements declare, to their names in the result (they can be renamed)
	namesSymbols = new Map<string, tsa.Symbol>; // the reverse of `symbolsNames`
	ambientSymbols = new Set<tsa.Symbol>;

	add(ts: typeof tsa, sourceFile: tsa.SourceFile, excludeLibDirectory: string, symbol: tsa.Symbol, recommendedName: string, isAmbient=false)
	{	const {symbolsNames, namesSymbols, ambientSymbols} = this;
		let name = symbolsNames.get(symbol);
		if (name == undefined)
		{	if (isAmbient)
			{	ambientSymbols.add(symbol);
			}
			let baseName = '';
			if (isNamespaceButNotFromLib(ts, excludeLibDirectory, symbol))
			{	baseName = pathMaybeQuotedToModuleName(symbol.name) ?? 'ns';
			}
			else
			{	baseName = getSymbolName(ts, symbol);
				if (!baseName || baseName=='unknown')
				{	baseName = recommendedName;
					if (!baseName || baseName=='unknown')
					{	baseName = pathMaybeQuotedToModuleName(sourceFile.fileName) ?? 'default';
					}
				}
			}
			name = this.#getUniqueName(baseName, isAmbient);
			symbolsNames.set(symbol, name);
			namesSymbols.set(name, symbol);
		}
		return name;
	}

	#getUniqueName(base: string, isAmbient: boolean)
	{	const {symbolsNames, namesSymbols, ambientSymbols} = this;
		const already = namesSymbols.get(base);
		if (!already && !KEYWORDS.has(base))
		{	return base;
		}
		for (let i=2; true; i++)
		{	const name = base + i.toString(16);
			if (!namesSymbols.has(name) && !KEYWORDS.has(name))
			{	if (isAmbient && already && !ambientSymbols.has(already))
				{	// prefer renaming non-ambient symbols
					symbolsNames.set(already, name);
					namesSymbols.set(name, already);
					return base;
				}
				return name;
			}
		}
	}
}

function pathMaybeQuotedToModuleName(pathMaybeQuoted: string)
{	return pathMaybeQuoted.match(RE_MODULE_NAME)?.[1];
}
