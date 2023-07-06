import {tsa} from '../../tsa_ns.ts';
import {Loader} from '../../load_options.ts';

type ImportedSymbol = {symbol: tsa.Symbol, resolvedSymbol: tsa.Symbol, importHref: string};

const RE_MODULE_NAME_FROM_PATH = /([^\/\\]+)(?:[\/\\](?:index|mod|main))?(?:\.\d)\.\w{1,5}$/i;
const RE_NONLETTERS = /\P{Letter}+/gu;
const LINE = `// _____________________________________________________________________________`;
const BEGIN = `/* BEGIN */`;
const END = `/* END */`;
const MODULE = `/* MODULE */`;

export function emitTs(ts: typeof tsa, program: tsa.DenoProgram, loader: Loader, newLine='\n')
{	let bundlerResult = '';
	const checker = program.getTypeChecker();
	const printer = ts.createPrinter();
	const globalSymbols = new GlobalSymbols(ts, newLine);
	const entryPointsHrefs = program.getRootFileNames();
	const modulesHrefs = entryPointsHrefs.slice();
	for (let i=0; i<modulesHrefs.length; i++)
	{	const moduleHref = modulesHrefs[i];
		const sourceFile = program.getSourceFile(moduleHref);
		if (sourceFile)
		{	const {node} = bundleSourceFile(sourceFile);
			bundlerResult += newLine;
			bundlerResult += newLine;
			bundlerResult += newLine;
			bundlerResult += LINE + newLine;
			const moduleFunc = `async function ${globalSymbols.getModule(moduleHref).name}() {`;
			const spacesLen = Math.max(0, LINE.length - BEGIN.length - moduleFunc.length - MODULE.length);
			const firstSpaceLen = spacesLen >> 1;
			bundlerResult += BEGIN + ' '.repeat(firstSpaceLen) + moduleFunc + ' '.repeat(spacesLen - firstSpaceLen) + MODULE + newLine;
			bundlerResult += LINE + newLine;
			bundlerResult += newLine;
			bundlerResult += `await Promise.resolve();` + newLine;
			bundlerResult += printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
			bundlerResult += globalSymbols.getModuleReturn(sourceFile.fileName);
			bundlerResult += newLine;
			bundlerResult += LINE + newLine;
			const spacesLen2 = Math.max(0, LINE.length - END.length - 1 - MODULE.length);
			const firstSpaceLen2 = spacesLen2 >> 1;
			bundlerResult += END + ' '.repeat(firstSpaceLen2) + '}' + ' '.repeat(spacesLen2 - firstSpaceLen2) + MODULE + newLine;
			bundlerResult += LINE + newLine;
		}
	}
	return globalSymbols.getPrelude(entryPointsHrefs).trimEnd() + newLine + bundlerResult;

	function bundleSourceFile(sourceFile: tsa.SourceFile)
	{	const pendingImports = new Map<string, ImportedSymbol>;
		const result = ts.transform(sourceFile, [transformerFactory]);
		return {node: result.transformed[0]};

		function transformerFactory(context: tsa.TransformationContext)
		{	let level = 0;
			let pendingNodes = new Array<tsa.Node>;
			const pendingPostNodes = new Array<tsa.Node>;

			return function(rootNode: tsa.Node)
			{	return ts.visitNode(rootNode, visit);
			};

			function visit(node: tsa.Node): tsa.VisitResult<tsa.Node>
			{	level++;
				node = ts.visitEachChild(node, visit, context);
				level--;

				if (ts.isIdentifier(node))
				{	const pendingImport = pendingImports.get(node.text);
					if (pendingImport && pendingImport.symbol == checker.getSymbolAtLocation(node))
					{	const {name: globalName, isType} = globalSymbols.getSymbolName(pendingImport.resolvedSymbol, false);
						if (!isType)
						{	pendingNodes.push
							(	context.factory.createVariableStatement
								(	undefined,
									context.factory.createVariableDeclarationList
									(	[	context.factory.createVariableDeclaration
											(	pendingImport.symbol.name,
												undefined,
												undefined,
												context.factory.createAwaitExpression
												(	context.factory.createIdentifier(globalName)
												)
											)
										],
										ts.NodeFlags.Const
									)
								)
							);
						}
						else
						{	pendingNodes.push
							(	context.factory.createTypeAliasDeclaration
								(	undefined,
									pendingImport.symbol.name,
									undefined,
									context.factory.createTypeReferenceNode(globalName)
								)
							);
						}
						pendingImports.delete(node.text);
					}
				}

				if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
				{	let importHref = '';
					let entryPointNumber = -1;

					// Add `import from` or `export from` to `modulesHrefs`
					if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier))
					{	importHref = loader.resolved(node.moduleSpecifier.text, sourceFile.fileName);
						entryPointNumber = modulesHrefs.indexOf(importHref);
						if (entryPointNumber == -1)
						{	entryPointNumber = modulesHrefs.length;
							modulesHrefs.push(importHref);
						}
					}

					if (ts.isExportDeclaration(node))
					{
					}
					else if (entryPointNumber != -1)
					{	// Remove `import`
						if (node.importClause)
						{	const {importClause: {name, namedBindings}} = node;
							const elements = namedBindings && ts.isNamedImports(namedBindings) ? namedBindings.elements ?? [] : [{name}];
							for (const {name} of elements)
							{	if (name)
								{	const symbol = checker.getSymbolAtLocation(name);
									const resolvedSymbol = resolveSymbol(ts, checker, symbol);
									if (symbol && resolvedSymbol)
									{	pendingImports.set(name.text, {symbol, resolvedSymbol, importHref});
									}
								}
							}
						}
						return [];
					}
				}
				else if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableStatement(node))
				{	// If exporting a symbol, replace `export` keyword with corresponding export function
					if (node.modifiers?.some(m => m.kind & ts.SyntaxKind.ExportKeyword))
					{	const names = !ts.isVariableStatement(node) ? [node.name] : node.declarationList.declarations.map(v => v.name);
						for (const name of names)
						{	if (name && ts.isIdentifier(name)) // TODO: others
							{	const symbol = checker.getSymbolAtLocation(name);
								if (symbol)
								{	const {exportFuncName, isType} = globalSymbols.getSymbolName(symbol, true);
									if (!isType)
									{	pendingPostNodes.push
										(	context.factory.createCallExpression
											(	context.factory.createIdentifier(exportFuncName),
												undefined,
												[name]
											)
										);
									}
								}
							}
						}
						if (ts.isFunctionDeclaration(node))
						{	node = context.factory.updateFunctionDeclaration
							(	node,
								unexport(ts, node.modifiers),
								node.asteriskToken,
								node.name,
								node.typeParameters,
								node.parameters,
								node.type,
								node.body
							);
						}
						else if (ts.isClassDeclaration(node))
						{	node = context.factory.updateClassDeclaration
							(	node,
								unexport(ts, node.modifiers),
								node.name,
								node.typeParameters,
								node.heritageClauses,
								node.members
							);
						}
						else if (ts.isInterfaceDeclaration(node))
						{	node = context.factory.updateInterfaceDeclaration
							(	node,
								unexport(ts, node.modifiers),
								node.name,
								node.typeParameters,
								node.heritageClauses,
								node.members
							);
						}
						else if (ts.isEnumDeclaration(node))
						{	node = context.factory.updateEnumDeclaration
							(	node,
								unexport(ts, node.modifiers),
								node.name,
								node.members
							);
						}
						else if (ts.isTypeAliasDeclaration(node))
						{	node = context.factory.updateTypeAliasDeclaration
							(	node,
								unexport(ts, node.modifiers),
								node.name,
								node.typeParameters,
								node.type
							);
						}
						else if (ts.isVariableStatement(node))
						{	node = context.factory.updateVariableStatement
							(	node,
								unexport(ts, node.modifiers),
								node.declarationList
							);
						}
					}
				}

				if (level == 1)
				{	// Inject pending nodes
					const result = pendingNodes;
					result.push(node);
					for (const n of pendingPostNodes)
					{	result.push(n);
					}
					pendingPostNodes.length = 0;
					pendingNodes = [];
					return result;
				}

				return node;
			}
		}
	}
}

class GlobalSymbols
{	#modNamesByHref = new Map<string, {name: string, exports: tsa.Symbol[]}>;
	#namesBySymbol = new Map<tsa.Symbol, {isType: boolean, name: string, exportFuncName: string, moduleHref: string}>;
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
			item = {name, exports: []};
			this.#modNamesByHref.set(moduleHref, item);
		}
		return item;
	}

	getSymbolName(resolvedSymbol: tsa.Symbol, isExport: boolean)
	{	let item = this.#namesBySymbol.get(resolvedSymbol);
		let moduleHref = '';
		if (!item)
		{	const isType = symbolIsType(this.ts, resolvedSymbol);
			const name = isType ? `modType${capFirstLetter(resolvedSymbol.name)}` : `modPromise${capFirstLetter(resolvedSymbol.name)}`;
			const exportFuncName = `modExport${capFirstLetter(resolvedSymbol.name)}`;
			// TODO: check names for conflicts
			moduleHref = getFilenameOfSymbol(resolvedSymbol) ?? '';
			item = {isType, name, exportFuncName, moduleHref};
			this.#namesBySymbol.set(resolvedSymbol, item);
		}
		if (isExport)
		{	this.getModule(moduleHref || getFilenameOfSymbol(resolvedSymbol) || '').exports.push(resolvedSymbol);
		}
		return item;
	}

	getPrelude(entryPointsHrefs: readonly string[])
	{	let bundlerResult = '';
		// Types
		let has = false;
		for (const [resolvedSymbol, {isType, name, moduleHref}] of this.#namesBySymbol)
		{	if (isType)
			{	if (!has)
				{	has = true;
					bundlerResult += `// Types` + this.newLine;
				}
				bundlerResult += `type ${name} = Awaited<ReturnType<typeof ${this.getModule(moduleHref).name}>>[${JSON.stringify(resolvedSymbol.name)}][0];` + this.newLine;
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
		for (const [resolvedSymbol, {isType, name, exportFuncName, moduleHref}] of this.#namesBySymbol)
		{	if (!isType)
			{	if (!has)
				{	has = true;
					bundlerResult += `// Symbols to be exported (futures)` + this.newLine;
				}
				bundlerResult += `const ${name} = new Promise<Awaited<ReturnType<typeof ${this.getModule(moduleHref).name}>>[${JSON.stringify(resolvedSymbol.name)}]>(y => ${exportFuncName} = y);` + this.newLine;
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
						{	bundlerResult += `type ${resolvedSymbol.name} = ${item.name};` + this.newLine;
							mainExports.push(`type ${resolvedSymbol.name}`);
						}
						else
						{	bundlerResult += `const ${resolvedSymbol.name} = await ${item.name};` + this.newLine;
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

function resolveSymbol(ts: typeof tsa, checker: tsa.TypeChecker, symbol?: tsa.Symbol)
{	if (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	symbol = checker.getAliasedSymbol(symbol);
	}
	return symbol;
}

function symbolIsType(ts: typeof tsa, resolvedSymbol: tsa.Symbol)
{	return !!(resolvedSymbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias));
}

function unexport(ts: typeof tsa, modifiers?: tsa.NodeArray<tsa.ModifierLike>)
{	const i = modifiers?.findIndex(m => m.kind == ts.SyntaxKind.ExportKeyword) ?? -1;
	if (i==-1 || !modifiers)
	{	return modifiers;
	}
	else
	{	return modifiers.slice(0, i).concat(modifiers.slice(i+1))
	}
}
