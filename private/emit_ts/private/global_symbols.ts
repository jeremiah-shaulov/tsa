import {tsa} from '../../tsa_ns.ts';

type Module =
{	/**	Name of module function in the bundle.
	 **/
	name: string;

	/**	Symbols that the module function must return.
	 **/
	exports: tsa.Symbol[];

	/**	If some nodes depend on imported symbols, i'll not add them to the module function in the first phase, but will collect them here for further dependency resolution.
	 **/
	nodesThatDepend: NodeThatDepends[];

	/**	Nodes that export something, but don't depend on other symbols are added to the module function in phase one, and i remember here what they exported.
	 **/
	exportsAddedSoFar: tsa.Symbol[];
};

type NodeThatDepends =
{	/**	Top-level node in module.
	 **/
	node: tsa.Node;

	/**	If this node is `export class ...` or `export var a, b, c, ...`, etc.
	 **/
	nodeExports: NodeExport[];

	/**	What prerequisites symbols this statement uses. E.g. `export class ClassFromModuleA {prop = varFromModuleB}`.
	 **/
	dependsOn: DependsOn[];
};

export type NodeExport =
{	/**	Symbol.
	 **/
	symbol: tsa.Symbol;

	/**	Export statement, like `modExportName(name);`, that exports this symbol.
	 **/
	exportStmt: tsa.Node;
};

export type DependsOn =
{	/**	Symbol.
	 **/
	symbol: tsa.Symbol;

	/**	Import statement, like `const name = await modPromiseName`, that imports this symbol.
	 **/
	importStmt?: tsa.VariableStatement;
};

const RE_MODULE_NAME_FROM_PATH = /([^\/\\]+)(?:[\/\\](?:index|mod|main))?(?:\.\d)\.\w{1,5}$/i;
const RE_NONLETTERS = /\P{Letter}+/gu;

export class GlobalSymbols
{	#modNamesByHref = new Map<string, Module>;
	#namesBySymbol = new Map<tsa.Symbol, {isType: boolean, globalName: string, exportFuncName: string, moduleHref: string}>;
	#enum = 1;

	constructor(private ts: typeof tsa, private newLine='\n')
	{
	}

	getModule(moduleHref: string)
	{	let item = this.#modNamesByHref.get(moduleHref);
		if (item == undefined)
		{	let name = moduleHref.match(RE_MODULE_NAME_FROM_PATH)?.[1].replace(RE_NONLETTERS, '_') || String(this.#enum++);
			name = 'mod' + capFirstLetter(name);
			// TODO: check name for conflicts
			item = {name, exports: [], nodesThatDepend: [], exportsAddedSoFar: []};
			this.#modNamesByHref.set(moduleHref, item);
		}
		return item;
	}

	getSymbolName(resolvedSymbol: tsa.Symbol, isExport: boolean)
	{	let item = this.#namesBySymbol.get(resolvedSymbol);
		let moduleHref = '';
		if (!item)
		{	const isType = symbolIsType(this.ts, resolvedSymbol);
			const globalName = isType ? `modType${capFirstLetter(resolvedSymbol.name)}` : `modPromise${capFirstLetter(resolvedSymbol.name)}`;
			const exportFuncName = `modExport${capFirstLetter(resolvedSymbol.name)}`;
			// TODO: check names for conflicts
			moduleHref = getFilenameOfSymbol(resolvedSymbol) ?? '';
			item = {isType, globalName, exportFuncName, moduleHref};
			this.#namesBySymbol.set(resolvedSymbol, item);
		}
		if (isExport)
		{	this.getModule(moduleHref || getFilenameOfSymbol(resolvedSymbol) || '').exports.push(resolvedSymbol);
		}
		return item;
	}

	addPhaseOneExport(moduleHref: string, exportsSymbol: tsa.Symbol)
	{	this.getModule(moduleHref).exportsAddedSoFar.push(exportsSymbol);
	}

	addNodeThatDepends(moduleHref: string, node: tsa.Node, nodeExports: NodeExport[], dependsOn: DependsOn[])
	{	this.getModule(moduleHref).nodesThatDepend.push({node, nodeExports, dependsOn});
	}

	getModuleDependantNodes(moduleHref: string)
	{	const nodes = new Array<tsa.Node>;
		const nodesPending = new Array<NodeThatDepends>;
		const toImport = new Array<DependsOn>;
		let nodesThatDepend = this.#modNamesByHref.get(moduleHref)?.nodesThatDepend ?? [];
		let isCircularDependency = false;
		const symbolsImported = new Set<tsa.Symbol>;
		const symbolsExported = new Set<tsa.Symbol>;
L:		for (let i=0; i<nodesThatDepend.length; i++)
		{	const nodeThatDepends = nodesThatDepend[i];
			// Can import all the dependencies?
			toImport.length = 0;
			for (const s of nodeThatDepends.dependsOn)
			{	if (!symbolsImported.has(s.symbol))
				{	if (!isCircularDependency && !this.#canImport(s.symbol, moduleHref, symbolsExported))
					{	nodesPending.push(nodeThatDepends);
						if (i+1 == nodesThatDepend.length)
						{	console.error(`Modules circular dependency in ${moduleHref}`);
							isCircularDependency = true;
							nodesThatDepend = nodesPending;
							nodesPending.length = 0;
							i = -1;
						}
						continue L;
					}
					toImport.push(s);
				}
			}
			// Add imports and remember what's imported so far
			for (const {importStmt, symbol} of toImport)
			{	if (importStmt)
				{	nodes.push(importStmt);
				}
				symbolsImported.add(symbol);
			}
			// Add the node itself
			nodes.push(nodeThatDepends.node);
			// Add export statements, and remember what this node exported
			for (const {exportStmt, symbol} of nodeThatDepends.nodeExports)
			{	nodes.push(exportStmt);
				symbolsExported.add(symbol);
			}
			// Redo pending
			for (let j=nodesPending.length-1; j>=0; j--)
			{	nodesThatDepend[i--] = nodesPending[j];
			}
			nodesPending.length = 0;
		}
		return nodes;
	}

	#canImport(symbol: tsa.Symbol, fromModuleHref: string, symbolsExported: Set<tsa.Symbol>)
	{	const allDependentSymbols = [symbol];
		for (let i=0; i<allDependentSymbols.length; i++)
		{	for (const [moduleHref, {exports, nodesThatDepend}] of this.#modNamesByHref)
			{	if (exports.includes(symbol)) // Found module that exports this symbol
				{	for (const {nodeExports, dependsOn} of nodesThatDepend)
					{	if (nodeExports.some(e => e.symbol)) // Found stmt that exports this symbol in module "moduleHref"
						{	for (const d of dependsOn)
							{	if (!allDependentSymbols.includes(d.symbol))
								{	allDependentSymbols.push(d.symbol);
									if (moduleHref == fromModuleHref) // Loopback to the same module
									{	if (!symbolsExported.has(d.symbol)) // Want symbol that this module didn't export yet?
										{	return false;
										}
									}
								}
							}
							break;
						}
					}
					break;
				}
			}
		}
		return true;
	}

	getModuleReturn(moduleHref: string)
	{	const returns = new Array<string>;
		for (const resolvedSymbol of this.getModule(moduleHref).exports)
		{	const item = this.#namesBySymbol.get(resolvedSymbol);
			if (item)
			{	returns.push(resolvedSymbol.name + (!item.isType ? '' : `: new Array<${resolvedSymbol.name}>`));
			}
		}
		return returns.length==0 ? '' : 'return {'+returns.join(', ')+'};'+this.newLine;
	}

	getPrelude(entryPointsHrefs: readonly string[])
	{	let bundlerResult = '';
		// Types
		let has = false;
		for (const [resolvedSymbol, {isType, globalName, moduleHref}] of this.#namesBySymbol)
		{	if (isType)
			{	if (!has)
				{	has = true;
					bundlerResult += `// Types` + this.newLine;
				}
				bundlerResult += `type ${globalName} = Awaited<ReturnType<typeof ${this.getModule(moduleHref).name}>>[${JSON.stringify(resolvedSymbol.name)}][0];` + this.newLine;
			}
		}
		if (has)
		{	bundlerResult += this.newLine;
			has = false;
		}
		// Symbol exporters
		for (const [resolvedSymbol, {isType, exportFuncName, moduleHref}] of this.#namesBySymbol)
		{	if (!isType)
			{	if (!has)
				{	has = true;
					bundlerResult += `// Symbol exporters` + this.newLine;
				}
				bundlerResult += `let ${exportFuncName}: (v: Awaited<ReturnType<typeof ${this.getModule(moduleHref).name}>>[${JSON.stringify(resolvedSymbol.name)}]) => void;` + this.newLine;
			}
		}
		if (has)
		{	bundlerResult += this.newLine;
			has = false;
		}
		// Symbols to be exported (futures)
		for (const [resolvedSymbol, {isType, globalName, exportFuncName, moduleHref}] of this.#namesBySymbol)
		{	if (!isType)
			{	if (!has)
				{	has = true;
					bundlerResult += `// Symbols to be exported (futures)` + this.newLine;
				}
				bundlerResult += `const ${globalName} = new Promise<Awaited<ReturnType<typeof ${this.getModule(moduleHref).name}>>[${JSON.stringify(resolvedSymbol.name)}]>(y => ${exportFuncName} = y);` + this.newLine;
			}
		}
		if (has)
		{	bundlerResult += this.newLine;
			has = false;
		}
		// Load modules
		for (const {name} of this.#modNamesByHref.values())
		{	if (!has)
			{	has = true;
				bundlerResult += `// Load modules` + this.newLine;
			}
			bundlerResult += `${name}();` + this.newLine;
		}
		if (has)
		{	bundlerResult += this.newLine;
			has = false;
		}
		// What this module exports
		const mainExports = new Array<string>;
		for (const moduleHref of entryPointsHrefs)
		{	const item = this.#modNamesByHref.get(moduleHref);
			if (item)
			{	for (const resolvedSymbol of item.exports)
				{	const item = this.#namesBySymbol.get(resolvedSymbol);
					if (item)
					{	if (!has)
						{	has = true;
							bundlerResult += `// What this module exports` + this.newLine;
						}
						if (item.isType)
						{	bundlerResult += `type ${resolvedSymbol.name} = ${item.globalName};` + this.newLine;
							mainExports.push(`type ${resolvedSymbol.name}`);
						}
						else
						{	bundlerResult += `const ${resolvedSymbol.name} = await ${item.globalName};` + this.newLine;
							mainExports.push(resolvedSymbol.name);
						}
					}
				}
			}
		}
		if (has)
		{	bundlerResult += `export {` + mainExports.join(', ') + '};' + this.newLine;
			has = false;
		}
		// Done
		return bundlerResult;
	}
}

function capFirstLetter(str: string)
{	return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

function getRandomId()
{	return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
}

function getFilenameOfSymbol(resolvedSymbol: tsa.Symbol)
{	return resolvedSymbol.getDeclarations()?.[0]?.getSourceFile().fileName;
}

function symbolIsType(ts: typeof tsa, resolvedSymbol: tsa.Symbol)
{	return !!(resolvedSymbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias));
}
