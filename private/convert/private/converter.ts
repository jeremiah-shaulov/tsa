import {tsa} from '../../tsa_ns.ts';
import {Loader} from '../../load_options.ts';
import {ClassDef, DecoratorDef, DocNode, Export, TsTypeRefDef, DocNodeNamespace, Location, JsDoc} from '../../doc_node/mod.ts';
import {convertImport} from './convert_import.ts';
import {convertModuleDoc} from './convert_module_doc.ts';
import {convertSymbol} from './convert_symbol.ts';
import {resolveSymbolWithTrace} from './util.ts';

/**	Options that you can provide
	to {@link tsa.TsaProgram.emitDoc} that affect what files to traverse, and what symbols to include in the result.
 **/
export type EmitDocOptions =
{	/**	Work not only on entry points, but on every module that appears in `import from` or `export from` statements.
	 **/
	followModuleImports?: boolean;

	/**	{@link DocNode}s in the result can reference another symbols.
	 	Symbol names can appear in type aliases, type parameters, etc.
		Also decorators refer to functions defined somewhere, not necessarily in entry point modules.
		If this flag is set to `true`, referenced symbols will be included in the result, and their indices in the resulting array will be recorded in the nodes that refer to them.
		The referrers include: {@link DecoratorDef#nodeIndex}, {@link TsTypeRefDef#nodeIndex} and {@link TsTypeRefDef#nodeSubIndex} (for enum members), and {@link ClassDef#superNodeIndex}.
	 **/
	includeReferenced?: boolean;

	/**	Also generate docs for referenced built-in objects, like `Map`, `HTMLElement`, etc.
	 **/
	includeBuiltIn?: boolean;

	/**	By default symbols marked with @`ignore` tag in their doc-comments, will not be included in the result.
		Set this to `true` to ignore the ignore.
	 **/
	ignoreIgnoreTag?: boolean;

	/**	By default, for every symbol that appears in `import from` statement there will be corresponding {@link DocNode} with `kind == 'import'`.
		Set this to `true` to exclude such nodes from the result.
	 **/
	noImportNodes?: boolean;

	/**	Callback function that will be called to ask you whether you want to include every occured symbol in the source files to the result.
		By default only exported symbols are processed, and if you set {@link EmitDocOptions#includeReferenced}, also not exported but referenced ones.
		Specify this callback to potentially include other symbols.
	 **/
	includeSymbol?(symbol: tsa.Symbol, isExported: boolean, checker: tsa.TypeChecker): boolean;
};

export class Converter
{	/**	Resulting {@link DocNode}s to which i convert each symbol occured in the source files.
	 **/
	outNodes = new Array<DocNode>();

	/**	For use from `resolveSymbolWithTrace()`.
		Each symbol can be reexported multiple times.
		During resolution each module where this symbol is exported is recorded here.
		{@link DocNode}s that correspond to converted symbols has `exports` field, that is reference to this object.
		At the end of conversion i'll know all the exports of each symbol.
	 **/
	exportsPerResolvedSymbol = new Map<tsa.Symbol, Export[]>;

	/**	Is set in constructor to `program.getTypeChecker()`.
	 **/
	checker: tsa.TypeChecker;

	/**	Is set in constructor to `program.getRootFileNames()`.
	 **/
	#entryPointsHrefs: readonly string[];

	/**	Is set in constructor to `options.followModuleImports`.
	 **/
	#followModuleImports: boolean;

	/**	Is set in constructor to `options.includeReferenced`.
	 **/
	#includeReferenced: boolean;

	/**	Is set in constructor to `options.includeBuiltIn`.
	 **/
	#includeBuiltIn: boolean;

	/**	Is set in constructor to `options.ignoreIgnoreTag`.
	 **/
	#ignoreIgnoreTag: boolean;

	/**	Is set in constructor to `options.noImportNodes`.
	 **/
	#noImportNodes: boolean;

	/**	Is set in constructor to `options.includeSymbol`.
	 **/
	#includeSymbol: ((symbol: tsa.Symbol, isExported: boolean, checker: tsa.TypeChecker) => boolean) | undefined;

	/**	When a symbol is converted to a corresponding `DocNode`, the node is stored to `outNodes`, and the relevant declaration of the symbol is stored to `#declarations`, together with the produced node and the index of the node in `outNodes`.
		If the node is not added to toplevel `outNodes`, but to a namespace, the `nodeIndex` is `-1`.
	 **/
	#declarations = new Map<tsa.Declaration, {node: DocNode, nodeIndex: number}>;

	/**	When a `TsTypeRefDef` or another node that has `nodeIndex` (or `superNodeIndex`) is generated,
		it's temporarily stored here with the symbol that this `TsTypeRefDef` references.
		The symbol can be already converted, or not.
		Then i'll ensure that it's converted, and will update `subj.nodeIndex` to the symbol index in `outNodes`.
	 **/
	#refs = new Array<{subj: TsTypeRefDef|ClassDef|DecoratorDef, symbol: tsa.Symbol}>;

	/**	When `export * as nsName from '...'` is encountered, i add record here, and later i'll copy relevant nodes to it.
	 **/
	#namespaces = new Map<string, {elements: DocNode[], forJsDoc: {jsDoc?: JsDoc}[]}>;

	/**	When all entry points and other related files are converted, and there are still not converted namespaces,
		i'll start converting namespaces without adding nodes to `outNodes`.
		`#doingNamespace` will contain namspace filename being converted, and the nodes will be added to `#namespaces.get(#doingNamespace).elements`.
	 **/
	#doingNamespace = '';

	constructor(private ts: typeof tsa, private program: tsa.Program, public loader: Loader, private libLocation: string, options?: EmitDocOptions)
	{	this.checker = program.getTypeChecker();
		this.#entryPointsHrefs = program.getRootFileNames();
		this.#followModuleImports = !!options?.followModuleImports;
		this.#includeReferenced = !!options?.includeReferenced;
		this.#includeBuiltIn = !!options?.includeBuiltIn;
		this.#ignoreIgnoreTag = !!options?.ignoreIgnoreTag;
		this.#noImportNodes = !!options?.noImportNodes;
		this.#includeSymbol = options?.includeSymbol;
	}

	convertEntryPoints()
	{	const entryPointsHrefs = this.#entryPointsHrefs.slice();
		const exportedSymbols = new Set<tsa.Symbol>;
		// 1. Convert exported symbols
		for (let i=0; i<entryPointsHrefs.length; i++)
		{	const entryPointHref = entryPointsHrefs[i];
			const sourceFile = this.program.getSourceFile(entryPointHref);
			if (sourceFile)
			{	this.#convertSourceFile(sourceFile, exportedSymbols, this.#followModuleImports ? entryPointsHrefs : undefined);
			}
		}
		// 2. Convert private symbols
		for (let i=0; i<entryPointsHrefs.length; i++)
		{	const entryPointHref = entryPointsHrefs[i];
			const sourceFile = this.program.getSourceFile(entryPointHref);
			if (sourceFile)
			{	this.#convertSourceFilePrivateSymbols(sourceFile, exportedSymbols);
			}
		}
		// 3. If a symbol is added as private, but it's actually exported from different places (has `exports`), change it to exported (this is particularly needed for compatibility with `x/deno_doc`)
		for (const node of this.outNodes)
		{	if (node.declarationKind!='export' && node.exports)
			{	const e = node.exports.find(e => e.location.filename == node.location.filename) ?? node.exports[0];
				if (e)
				{	node.declarationKind = 'export';
					node.name = e.name;
					node.location = e.location;
					if (node.exports.length == 1)
					{	delete node.exports;
					}
				}
			}
		}
		// 4. Copy nodes that are exported from namespaces to corresponding elements in `#namespaces`.
		for (const [filename, {elements, forJsDoc}] of this.#namespaces)
		{	if (entryPointsHrefs.includes(filename))
			{	for (const node of this.outNodes)
				{	if (node.kind == 'moduleDoc')
					{	if (node.location.filename == filename)
						{	for (const j of forJsDoc)
							{	j.jsDoc = node.jsDoc;
							}
						}
					}
					else if (node.declarationKind!='private' && node.location.filename==filename)
					{	elements.push(node);
					}
					else
					{	const exp = node.exports?.find(e => e.location.filename == filename);
						if (exp)
						{	elements.push({...node, ...exp});
						}
					}
				}
			}
		}
		// 5. Convert namespaces (something like `export * as nsName from '...'`)
		for (const [filename] of this.#namespaces)
		{	if (!entryPointsHrefs.includes(filename))
			{	entryPointsHrefs.push(filename);
				const sourceFile = this.program.getSourceFile(filename);
				if (sourceFile)
				{	this.#doingNamespace = filename;
					this.#convertSourceFile(sourceFile);
				}
			}
		}
		// 6. Done
		const {outNodes} = this;
		this.outNodes = [];
		this.#declarations.clear();
		this.#namespaces.clear();
		this.#doingNamespace = '';
		return outNodes;
	}

	/**	Remember namespace (something like `export * as nsName from '...'`), and copy relevant nodes to it later, at the end of entry points conversion.
	 **/
	convertNamespace(filename: string, name: string, location: Location)
	{	let record = this.#namespaces.get(filename);
		if (!record)
		{	record = {elements: [], forJsDoc: []};
			this.#namespaces.set(filename, record);
		}
		const node: DocNodeNamespace =
		{	kind: 'namespace',
			name,
			location,
			declarationKind: 'export',
			namespaceDef:
			{	elements: record.elements,
			},
		};
		record.forJsDoc.push(node);
		return node;
	}

	#convertSourceFile(sourceFile: tsa.SourceFile, exportedSymbols?: Set<tsa.Symbol>, addToEntryPoints?: string[])
	{	// 1. Add the first doc-comment in the file, if it contains @module tag
		this.#convertModuleDoc(sourceFile);

		// 2. Add import statements, and collect imported and reexported modules
		for (const statement of sourceFile.statements)
		{	if (!this.#noImportNodes && this.ts.isImportDeclaration(statement))
			{	this.#convertImport(statement);
			}
			if (addToEntryPoints)
			{	if (this.ts.isImportDeclaration(statement) || this.ts.isExportDeclaration(statement))
				{	if (statement.moduleSpecifier && this.ts.isStringLiteral(statement.moduleSpecifier))
					{	const importHref = this.loader.resolved(statement.moduleSpecifier.text, sourceFile.fileName);
						if (!addToEntryPoints.includes(importHref))
						{	addToEntryPoints.push(importHref);
						}
					}
				}
			}
		}

		// 3. Add exported symbols
		const mainSymbol = this.checker.getSymbolAtLocation(sourceFile);
		if (mainSymbol)
		{	const {isDeclarationFile} = sourceFile;
			for (const symbol of this.checker.getExportsOfModule(mainSymbol))
			{	exportedSymbols?.add(symbol);
				this.#convertSymbol(symbol, true, isDeclarationFile);
			}
		}
	}

	#convertSourceFilePrivateSymbols(sourceFile: tsa.SourceFile, exportedSymbols: Set<tsa.Symbol>)
	{	const {isDeclarationFile} = sourceFile;
		if (isDeclarationFile || this.#includeSymbol)
		{	for (const statement of sourceFile.statements)
			{	for (const declaration of this.#getDeclarations(statement))
				{	const symbol = declaration.name && this.checker.getSymbolAtLocation(declaration.name);
					if (symbol && !this.#symbolDone(symbol) && !exportedSymbols.has(symbol))
					{	this.#convertSymbol(symbol, false, isDeclarationFile);
					}
				}
			}
		}
	}

	#symbolDone(symbol: tsa.Symbol, addToCurrent=false, addToMain=false)
	{	const declarations = symbol.getDeclarations();
		if (declarations)
		{	for (const declaration of declarations)
			{	const nodeAndIndex = this.#declarations.get(declaration);
				if (nodeAndIndex)
				{	if (addToCurrent || addToMain)
					{	if (addToMain || !this.#doingNamespace)
						{	if (nodeAndIndex.nodeIndex == -1)
							{	nodeAndIndex.nodeIndex = this.outNodes.length;
								this.outNodes.push(nodeAndIndex.node);
							}
						}
						else
						{	const elements = this.#namespaces.get(this.#doingNamespace)?.elements;
							if (elements && !elements.includes(nodeAndIndex.node))
							{	elements.push(nodeAndIndex.node);
							}
						}
					}
					return nodeAndIndex;
				}
			}
		}
	}

	*#getDeclarations(statement: tsa.Statement)
	{	const {ts} = this;
		if (ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isEnumDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isFunctionDeclaration(statement) || ts.isVariableDeclaration(statement))
		{	yield statement;
		}
		else if (ts.isVariableStatement(statement))
		{	for (const declaration of statement.declarationList.declarations)
			{	yield declaration;
			}
		}
	}

	#convertImport(declaration: tsa.ImportDeclaration)
	{	const outNodes = !this.#doingNamespace ? this.outNodes : this.#namespaces.get(this.#doingNamespace)?.elements;
		if (outNodes)
		{	convertImport(this.ts, this, declaration, outNodes);
		}
	}

	#convertModuleDoc(sourceFile: tsa.SourceFile)
	{	const moduleDoc = convertModuleDoc(this.ts, this, sourceFile);
		if (moduleDoc)
		{	if (!this.#doingNamespace)
			{	this.outNodes.push(moduleDoc);
			}
			else
			{	const forJsDoc = this.#namespaces.get(this.#doingNamespace)?.forJsDoc;
				if (forJsDoc)
				{	for (const j of forJsDoc)
					{	j.jsDoc = moduleDoc.jsDoc;
					}
				}
			}
		}
	}

	#convertSymbol(symbol: tsa.Symbol, isExported: boolean, isDeclarationFile: boolean)
	{	const {ts} = this;
		let {resolvedSymbol, exports, isExportAssignment, onlyResolvedIsExported} = resolveSymbolWithTrace(ts, this, symbol);
		resolvedSymbol ??= symbol;
		const node = this.#symbolDone(resolvedSymbol, true)?.node;
		if (!node)
		{	if (this.#includeSymbol ? this.#includeSymbol(resolvedSymbol, isExported, this.checker) : isExported || isDeclarationFile)
			{	const result = convertSymbol(ts, this, symbol.name, resolvedSymbol, symbol, isExportAssignment || isDeclarationFile);
				if (result)
				{	if (exports?.length && !onlyResolvedIsExported)
					{	result.node.exports = exports;
					}
					const outNodes = !this.#doingNamespace ? this.outNodes : this.#namespaces.get(this.#doingNamespace)?.elements;
					const nodeIndex = !this.#doingNamespace ? this.outNodes.length : -1;
					this.#declarations.set(result.declaration, {node: result.node, nodeIndex});
					outNodes?.push(result.node);
				}
				this.#doRefs();
			}
		}
		else
		{	if (exports?.length)
			{	node.exports = exports;
			}
			if (isDeclarationFile && node.declarationKind=='private')
			{	node.declarationKind = 'export';
			}
		}
	}

	ignoreDeclaration(declaration: tsa.Declaration)
	{	return !this.#ignoreIgnoreTag && this.ts.getJSDocTags(declaration).some(tag => tag.tagName.text == 'ignore');
	}

	getEntryPointNumber(fileHref: string)
	{	return this.#entryPointsHrefs.indexOf(fileHref);
	}

	addRef(subj: TsTypeRefDef|ClassDef|DecoratorDef, symbol: tsa.Symbol|undefined)
	{	if (symbol && this.#includeReferenced)
		{	if (this.#includeBuiltIn || symbol.getDeclarations()?.some(d => !d.getSourceFile().fileName.startsWith(this.libLocation)))
			{	this.#refs.push({subj, symbol});
			}
		}
	}

	addTypeRef(subj: TsTypeRefDef|ClassDef, symbol: tsa.Symbol|undefined, origType: tsa.Type|undefined, node: tsa.TypeNode)
	{	if (this.#includeReferenced)
		{	const type = origType ?? this.checker.getTypeFromTypeNode(node);
			if (!symbol && this.ts.isTypeReferenceNode(node))
			{	symbol = this.checker.getSymbolAtLocation(node.typeName);
			}
			this.addRef(subj, symbol ?? type.getSymbol());
		}
	}

	#doRefs()
	{	const {ts} = this;
		let item;
		while ((item = this.#refs.shift()))
		{	let {subj, symbol} = item;
			let {resolvedSymbol, exports, isExportAssignment, onlyResolvedIsExported} = resolveSymbolWithTrace(ts, this, symbol);
			resolvedSymbol ??= symbol;
			let nodeIndex = this.#symbolDone(resolvedSymbol, false, true)?.nodeIndex ?? -1;
			let nodeSubIndex = -1;
			if (nodeIndex == -1)
			{	// Maybe an enum member
				const enumMember = resolvedSymbol.flags & ts.SymbolFlags.EnumMember ? resolvedSymbol.getDeclarations()?.find(ts.isEnumMember) : undefined;
				if (enumMember)
				{	nodeSubIndex = enumMember.parent.members.indexOf(enumMember);
					if (nodeSubIndex != -1)
					{	// Yes, an enum member
						const enumSymbol = this.checker.getSymbolAtLocation(enumMember.parent.name);
						if (!enumSymbol)
						{	continue;
						}
						resolvedSymbol = symbol = enumSymbol;
						nodeIndex = this.#symbolDone(resolvedSymbol, false, true)?.nodeIndex ?? -1;
						exports = undefined;
						isExportAssignment = false;
						onlyResolvedIsExported = false;
					}
				}
				if (nodeIndex == -1)
				{	const result = convertSymbol(ts, this, symbol.name, resolvedSymbol, symbol, isExportAssignment);
					if (result)
					{	if (exports?.length && !onlyResolvedIsExported)
						{	result.node.exports = exports;
						}
						nodeIndex = this.outNodes.length;
						this.#declarations.set(result.declaration, {node: result.node, nodeIndex: this.outNodes.length});
						this.outNodes.push(result.node);
					}
				}
			}
			if (nodeIndex != -1)
			{	if ('superTypeParams' in subj) // if is ClassDef
				{	subj.superNodeIndex = nodeIndex;
				}
				else
				{	subj.nodeIndex = nodeIndex;
					if (nodeSubIndex!=-1 && 'typeName' in subj) // if is TsTypeRefDef
					{	subj.nodeSubIndex = nodeSubIndex;
					}
				}
			}
		}
	}
}
