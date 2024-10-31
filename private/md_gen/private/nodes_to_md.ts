import {APP_GIT_TAG, indentAndWrap} from '../../deps.ts';
import {DocNode, ClassConstructorParamDef, TsTypeDef, LiteralDef, LiteralMethodDef, TsTypeParamDef, TsTypeLiteralDef, FunctionDef, Accessibility, JsDoc, DocNodeNamespace, DocNodeVariable, DocNodeFunction, DocNodeClass, DocNodeTypeAlias, DocNodeEnum, DocNodeInterface, ClassPropertyDef, ClassMethodDef, InterfacePropertyDef, InterfaceMethodDef, EnumMemberDef, LiteralPropertyDef} from '../../doc_node/mod.ts';
import {Accessor, NodeToMd} from './node_to_md.ts';
import {NodeToMdCollection} from './node_to_md_collection.ts';
import {escapeShellArg, isDeprecated, isPublicOrProtected} from './util.ts';
import {mdEscape, mdLink} from './util.ts';

const INDEX_N_COLUMNS = 4;
const RE_NO_NL = /[\r\n]/;

export function nodesToMd(nodes: DocNode[], moduleName='', importUrls=new Array<string>)
{	return new NodesToMd(nodes, importUrls).genFiles(moduleName);
}

class NodesToMd
{	#nodes: DocNode[];
	#collection: NodeToMdCollection;

	constructor(nodes: DocNode[], importUrls: string[])
	{	this.#nodes = nodes;
		this.#collection = new NodeToMdCollection
		(	nodes,
			node =>
			{	if (node.kind=='class' || node.kind=='interface' || node.kind=='typeAlias' || node.kind=='enum' || node.kind=='function' || node.kind=='variable' || node.kind=='namespace')
				{	return new NodeToMd
					(	node,
						importUrls,
						{	onTopHeader: node =>
							{	let code = '';
								if (node.kind == 'class')
								{	const {classDef} = node;
									// Decorators
									if (classDef.decorators)
									{	for (const d of classDef.decorators)
										{	const link = this.#collection.getLink(this.#nodes[d.nodeIndex ?? -1]);
											const name = link ? mdLink(d.name, `../${link}`) : d.name;
											code += `@${name}(${d.args?.map(a => mdEscape(a)).join(', ') ?? ''})\n\n`;
										}
									}
									// Class (h1 header)
									code += classDef.isAbstract ? '# `abstract` `class` ' : '# `class` ';
									code += mdEscape(node.name);
									// Type params
									code += this.#convertTypeParams(classDef.typeParams);
									// Extends
									code += !classDef.extends ? '' : ' `extends` ' + this.#getTypeName(classDef.extends, classDef.superNodeIndex) + this.#convertActualTypeParams(classDef.superTypeParams);
									// Implements
									code += classDef.implements.length==0 ? '' : ' `implements` ' + this.#convertActualTypeParams(classDef.implements);
								}
								else if (node.kind == 'interface')
								{	const {interfaceDef} = node;
									// Interface (h1 header)
									code += '# `interface` ';
									code += mdEscape(node.name);
									// Type params
									code += this.#convertTypeParams(interfaceDef.typeParams);
									// Extends
									code += !interfaceDef.extends.length ? '' : ' `extends` ' + interfaceDef.extends.map(e => this.#convertTsType(e)).join(', ');
								}
								else if (node.kind == 'typeAlias')
								{	const {typeAliasDef} = node;
									code += '# `type` ';
									code += mdEscape(node.name) + this.#convertTypeParams(typeAliasDef.typeParams);
								}
								else if (node.kind == 'enum')
								{	const {enumDef} = node;
									code += enumDef.isConst ? '# `const` `enum` ' : '# `enum` ';
									code += mdEscape(node.name);
								}
								else if (node.kind == 'function')
								{	code += '# `function` ';
									code += mdEscape(node.name);
								}
								else if (node.kind == 'variable')
								{	const {variableDef} = node;
									code += variableDef.kind=='const' ? '# `const` ' : '# `var` ';
									code += mdEscape(node.name);
								}
								else if (node.kind == 'namespace')
								{	code += '# `namespace` ';
									code += mdEscape(node.name);
								}
								return code;
							},
							onConstructor: m =>
							{	let codeCur = '🔧 ';
								if (isDeprecated(m))
								{	codeCur += '`deprecated` ';
								}
								if (m.accessibility === 'protected')
								{	codeCur += '`protected` ';
								}
								codeCur += '`constructor`';
								codeCur += `(${m.params.map(a => this.#convertArg(a)).join(', ')})`;
								return codeCur;
							},
							onIndexSignature: m =>
							{	let codeCur = '🔍 ';
								if (m.readonly)
								{	codeCur += '`readonly` ';
								}
								codeCur += '[' + m.params.map(a => this.#convertArg(a)).join(', ') + ']';
								codeCur += this.#convertTsTypeColon(m.tsType);
								return codeCur;
							},
							onProperty: m =>
							{	let codeCur = '📄 ';
								if (isDeprecated(m))
								{	codeCur += '`deprecated` ';
								}
								codeCur += this.#convertPropertyOrAccessor(m);
								return codeCur;
							},
							onMethod: (m, isDestructor) =>
							{	const accessibility = 'accessibility' in m ? m.accessibility : undefined;
								const isAbstract = 'isAbstract' in m && m.isAbstract;
								const isStatic = 'isStatic' in m && m.isStatic;
								let codeCur = isDestructor ? '🔨 ' : '⚙ ';
								if (isDeprecated(m))
								{	codeCur += '`deprecated` ';
								}
								codeCur += this.#convertFunction(m.kind, m.name, accessibility, isAbstract, isStatic, 'optional' in m && m.optional, 'functionDef' in m ? m.functionDef : m);
								return codeCur;
							},
							onTypeAlias: m =>
							{	let codeCur = '`type` ';
								codeCur += mdEscape(node.name) + this.#convertTypeParams(m.typeParams) + ' = ' + this.#convertTsType(m.tsType);
								return codeCur;
							},
							onVariable: m =>
							{	const introducer = m.kind == 'const' ? '`const` ' : '`var` ';
								return introducer + mdEscape(node.name) + this.#convertTsTypeColon(m.tsType);
							},
							onEnumMember: m =>
							{	let codeCur = mdEscape(m.name);
								if (m.init)
								{	codeCur += ' = '+this.#convertTsType(m.init);
								}
								return codeCur;
							},
							onNamespace: m =>
							{	return this.#convertNamespace(m.elements);
							},
							onJsDoc: jsDoc =>
							{	return this.#convertJsDoc(jsDoc);
							},
						}
					);
				}
			}
		);
	}

	*genFiles(moduleName: string)
	{	let code = `<!--\n\tThis file is generated with the following command:\n\tdeno run --allow-all https://raw.githubusercontent.com/jeremiah-shaulov/tsa/${APP_GIT_TAG}/tsa.ts ${Deno.args.map(a => escapeShellArg(a)).join(' ')}\n-->\n\n`;
		code += `# ${mdEscape(moduleName) || 'Module'}\n\n`;
		code += this.#convertJsDoc(this.#nodes.find(n => n.kind == 'moduleDoc')?.jsDoc, '');
		code += this.#convertNamespace(this.#nodes);
		yield {dir: '', code};
		yield *this.#genFilesForNodes(this.#nodes, new Set);
	}

	*#genFilesForNodes(nodes: DocNode[], nodesDone: Set<DocNode>): Generator<{dir: string, code: string}>
	{	for (const node of nodes)
		{	if (node.kind != 'moduleDoc')
			{	if (!nodesDone.has(node))
				{	nodesDone.add(node);
					const nodeToMd = this.#collection.getNodeToMd(node);
					const code = nodeToMd?.getCode() ?? '';
					const dir = this.#collection.getDir(node) ?? '';
					yield {dir, code};
					if (node.kind == 'namespace')
					{	yield *this.#genFilesForNodes(node.namespaceDef.elements, nodesDone);
					}
				}
			}
		}
	}

	#convertNamespace(nodes: DocNode[])
	{	const isMain = nodes == this.#nodes;
		const namespaces = new Array<DocNodeNamespace>;
		const variables = new Array<DocNodeVariable>;
		const functions = new Array<DocNodeFunction>;
		const classes = new Array<DocNodeClass>;
		const types = new Array<DocNodeTypeAlias | DocNodeEnum | DocNodeInterface>;
		for (const node of nodes)
		{	switch (node.kind)
			{	case 'namespace':
					if (node.declarationKind=='export' && isPublicOrProtected(node) && (!isMain || isExportFromEntryPoint(node)))
					{	namespaces.push(node);
					}
					break;
				case 'variable':
					if (node.declarationKind=='export' && isPublicOrProtected(node) && (!isMain || isExportFromEntryPoint(node)))
					{	variables.push(node);
					}
					break;
				case 'function':
					if (node.declarationKind=='export' && isPublicOrProtected(node) && (!isMain || isExportFromEntryPoint(node)))
					{	functions.push(node);
					}
					break;
				case 'class':
					if (node.declarationKind=='export' && isPublicOrProtected(node) && (!isMain || isExportFromEntryPoint(node)))
					{	classes.push(node);
					}
					break;
				case 'enum':
				case 'typeAlias':
				case 'interface':
					if (node.declarationKind=='export' && isPublicOrProtected(node) && (!isMain || isExportFromEntryPoint(node)))
					{	types.push(node);
					}
			}
		}
		const dirPrefix = isMain ? '' : '../';
		let code = '';
		code += mdGrid('Namespaces', namespaces.map(n => mdLink(n.name, dirPrefix+this.#collection.getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Variables', variables.map(n => mdLink(n.name, dirPrefix+this.#collection.getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Functions', functions.map(n => mdLink(n.name, dirPrefix+this.#collection.getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Classes', classes.map(n => mdLink(n.name, dirPrefix+this.#collection.getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Types', types.map(n => mdLink(n.name, dirPrefix+this.#collection.getLink(n))), INDEX_N_COLUMNS);
		return code;
	}

	#convertPropertyOrAccessor(p: ClassPropertyDef|InterfacePropertyDef|LiteralPropertyDef|Accessor)
	{	let code = '';
		if (!('getter' in p))
		{	const accessibility = 'accessibility' in p ? p.accessibility : undefined;
			const isAbstract = 'isAbstract' in p && p.isAbstract;
			const isStatic = 'isStatic' in p && p.isStatic;
			code = this.#convertProperty(p.name, accessibility, isAbstract, isStatic, p.readonly, false, p.optional, p.tsType);
		}
		else if (p.getter && p.setter)
		{	const m = p.getter;
			const accessibility = 'accessibility' in m ? m.accessibility : undefined;
			const isAbstract = 'isAbstract' in m && m.isAbstract;
			const isStatic = 'isStatic' in m && m.isStatic;
			code = this.#convertProperty(m.name, accessibility, isAbstract, isStatic, false, true, m.optional, 'functionDef' in m ? m.functionDef.returnType : m.returnType);
		}
		else
		{	const m = p.getter ?? p.setter;
			if (m)
			{	const accessibility = 'accessibility' in m ? m.accessibility : undefined;
				const isAbstract = 'isAbstract' in m && m.isAbstract;
				const isStatic = 'isStatic' in m && m.isStatic;
				code = this.#convertFunction(m.kind, m.name, accessibility, isAbstract, isStatic, m.optional, 'functionDef' in m ? m.functionDef : m);
			}
		}
		return code;
	}

	#convertProperty(name: string, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, readonly: boolean|undefined, isAccessor: boolean, optional: boolean, tsType: TsTypeDef|undefined)
	{	let code = accessibility==='protected' ? '`protected` ' : '';
		if (isAbstract)
		{	code += '`abstract` ';
		}
		if (isStatic)
		{	code += '`static` ';
		}
		if (readonly)
		{	code += '`readonly` ';
		}
		else if (isAccessor)
		{	code += '`accessor` ';
		}
		code += mdEscape(name);
		if (optional)
		{	code += '?';
		}
		code += this.#convertTsTypeColon(tsType);
		return code;
	}

	#convertFunction(isMethod: 'function'|'method'|'getter'|'setter', name: string, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, optional: boolean, functionDef: FunctionDef|LiteralMethodDef)
	{	let code = accessibility==='protected' ? '`protected` ' : '';
		if (isAbstract)
		{	code += '`abstract` ';
		}
		if (isStatic)
		{	code += '`static` ';
		}
		if (isMethod != 'method')
		{	code += isMethod=='getter' ? '`get` ' : isMethod=='setter' ? '`set` ' : '`function` ';
		}
		code += mdEscape(name);
		if (optional)
		{	code += '?';
		}
		code += this.#convertTypeParams(functionDef.typeParams);
		code += '(' + functionDef.params.map(a => this.#convertArg(a)).join(', ') + ')';
		if (functionDef.returnType)
		{	code += this.#convertTsTypeColon(functionDef.returnType);
		}
		else
		{	const isAsync = 'isAsync' in functionDef && functionDef.isAsync;
			const isGenerator = 'isGenerator' in functionDef && functionDef.isGenerator;
			if (isAsync && isGenerator)
			{	code += ': AsyncGenerator<`unknown`>';
			}
			else if (isAsync)
			{	code += ': Promise<`unknown`>';
			}
			else if (isGenerator)
			{	code += ': Generator<`unknown`>';
			}
		}
		return code;
	}

	#convertArg(arg: ClassConstructorParamDef)
	{	let code = '';
		switch (arg.kind)
		{	case 'array':
				code += '\\[' + arg.elements.map(a => (!a ? '' : this.#convertArg(a))).join(', ') + ']' + this.#convertTsTypeColon(arg.tsType);
				break;
			case 'object':
				code += '\\{' + arg.props.map(p => (p.kind=='rest' ? '...'+this.#convertArg(p.arg) : mdEscape(p.key)+(p.kind=='keyValue' ? '='+this.#convertArg(p.value) : p.value!=undefined ? '='+mdEscape(p.value) : ''))).join(', ') + '}' + this.#convertTsTypeColon(arg.tsType);
				break;
			case 'assign':
				code += this.#convertArg(arg.left) + this.#convertTsTypeColon(arg.tsType) + '=' + mdEscape(arg.right);
				break;
			case 'identifier':
				code += mdEscape(arg.name);
				if (arg.optional)
				{	code += '?';
				}
				code += this.#convertTsTypeColon(arg.tsType);
				break;
			case 'rest':
				code += '...' + this.#convertArg(arg.arg) + this.#convertTsTypeColon(arg.tsType);
				break;
		}
		return code;
	}

	#convertTsType(typeDef: TsTypeDef): string
	{	switch (typeDef.kind)
		{	case 'keyword':
				return '`' + typeDef.keyword + '`';
			case 'literal':
				return this.#convertTsLiteralType(typeDef.literal, typeDef.repr);
			case 'typeRef':
				return this.#getTypeName(typeDef.typeRef.typeName, typeDef.typeRef.nodeIndex, typeDef.typeRef.nodeSubIndex) + this.#convertActualTypeParams(typeDef.typeRef.typeParams);
			case 'union':
				return typeDef.union.map(t => this.#convertTsType(t)).join(' | ');
			case 'intersection':
				return typeDef.intersection.map(t => this.#convertTsType(t)).join(' \\& ');
			case 'array':
				return this.#convertTsType(typeDef.array)+'\\[]';
			case 'tuple':
				return '\\[' + typeDef.tuple.map(t => this.#convertTsType(t)).join(', ') + ']';
			case 'typeOperator':
				return typeDef.typeOperator.operator + ' ' + this.#convertTsType(typeDef.typeOperator.tsType);
			case 'parenthesized':
				return '(' + this.#convertTsType(typeDef.parenthesized) + ')';
			case 'rest':
				return '...' + this.#convertTsType(typeDef.rest);
			case 'optional':
				return this.#convertTsType(typeDef.optional) + '?';
			case 'typeQuery':
				return '`typeof`(' + this.#getTypeName(typeDef.typeQuery) + ')';
			case 'this':
				return '`this`';
			case 'fnOrConstructor':
				return (typeDef.fnOrConstructor.constructor ? '`new`' : '') + '(' + typeDef.fnOrConstructor.params.map(a => this.#convertArg(a)).join(', ') + ') => ' + this.#convertTsType(typeDef.fnOrConstructor.tsType);
			case 'conditional':
				return this.#convertTsType(typeDef.conditionalType.checkType) + ' `extends` ' + this.#convertTsType(typeDef.conditionalType.extendsType) + ' ? ' + this.#convertTsType(typeDef.conditionalType.trueType) + ' : ' + this.#convertTsType(typeDef.conditionalType.falseType);
			case 'infer':
				return '`infer` '+mdEscape(typeDef.infer.typeParam.name);
			case 'mapped':
				return '\\{' + (typeDef.mappedType.readonly ? '`readonly` ' : '') + '\\[' + this.#convertTypeParam(typeDef.mappedType.typeParam, 'in') + this.#convertTsTypeColon(typeDef.mappedType.nameType) + ']' + (typeDef.mappedType.optional ? '?' : '') + this.#convertTsTypeColon(typeDef.mappedType.tsType) + '}';
			case 'importType':
				return '`import`(' + mdEscape(JSON.stringify(typeDef.importType.specifier)) + ')' + (!typeDef.importType.qualifier ? '' : '.'+mdEscape(typeDef.importType.qualifier)) + this.#convertActualTypeParams(typeDef.importType.typeParams);
			case 'indexedAccess':
				return (typeDef.indexedAccess.readonly ? '`readonly` ' : '') + this.#convertTsType(typeDef.indexedAccess.objType) + '\\[' + this.#convertTsType(typeDef.indexedAccess.indexType) + ']';
			case 'typeLiteral':
				return '\\{' + this.#convertTsTypeLiteralDef(typeDef.typeLiteral) + '}';
			case 'typePredicate':
				return (typeDef.typePredicate.asserts ? '`asserts` ' : '') + (typeDef.typePredicate.param.name ? mdEscape(typeDef.typePredicate.param.name) : '`this`') + (!typeDef.typePredicate.type ? '' : ' `is` ' + this.#convertTsType(typeDef.typePredicate.type));
		}
	}

	#convertTsTypeColon(typeDef: TsTypeDef|undefined)
	{	if (!typeDef)
		{	return '';
		}
		return ': '+this.#convertTsType(typeDef);
	}

	#getTypeName(typeName: string, nodeIndex?: number, nodeSubIndex?: number)
	{	const link = this.#collection.getLink(this.#nodes[nodeIndex ?? -1], nodeSubIndex);
		if (link)
		{	typeName = mdLink(typeName, `../${link}`);
		}
		return typeName;
	}

	#convertTsLiteralType(litDef: LiteralDef, repr: string)
	{	switch (litDef.kind)
		{	case 'boolean':
				return '`' + repr + '`';
			case 'number':
			case 'bigInt':
				return '<mark>' + repr + '</mark>';
			case 'string':
				return '<mark>' + mdEscape(JSON.stringify(litDef.string)) + '</mark>';
			case 'template':
				return '<mark>' + mdEscape('`'+repr+'`') + '</mark>';
		}
	}

	#convertTsTypeLiteralDef(typeLiteral: TsTypeLiteralDef)
	{	const {callSignatures, properties, indexSignatures, methods} = typeLiteral;
		let separ = '';
		let code = '';
		for (const p of callSignatures)
		{	code += separ;
			code += this.#convertTypeParams(p.typeParams) + '(' + p.params.map(pp => this.#convertArg(pp)).join(', ') + ')' + this.#convertTsTypeColon(p.tsType);
			separ = ', ';
		}
		for (const p of indexSignatures)
		{	code += separ;
			if (p.readonly)
			{	code += '`readonly` ';
			}
			code += '\\[' + p.params.map(pp => this.#convertArg(pp)).join('; ') + ']' + this.#convertTsTypeColon(p.tsType);
			separ = ', ';
		}
		for (const p of properties)
		{	code += separ;
			code += this.#convertProperty(p.name, undefined, false, false, p.readonly, false, p.optional, p.tsType);
			separ = ', ';
		}
		for (const p of methods)
		{	code += separ;
			code += this.#convertFunction(p.kind, p.name, undefined, false, false, p.optional, p);
			separ = ', ';
		}
		return code;
	}

	#convertTypeParams(typeParams: TsTypeParamDef[])
	{	const code = typeParams.map(p => this.#convertTypeParam(p, 'extends')).join(', ');
		return !code ? '' : `\\<${code}>`;
	}

	#convertTypeParam(typeParam: TsTypeParamDef, constraint: string)
	{	return mdEscape(typeParam.name) + (!typeParam.constraint ? '' : ' `'+constraint+'` '+this.#convertTsType(typeParam.constraint)) + (!typeParam.default ? '' : '='+this.#convertTsType(typeParam.default));
	}

	#convertActualTypeParams(typeParams: TsTypeDef[]|undefined)
	{	const code = typeParams?.map(t => this.#convertTsType(t)).join(', ');
		return !code ? '' : `\\<${code}>`;
	}

	#convertJsDoc(jsDoc?: JsDoc, backToTopDir: ''|'../'='../')
	{	let doc = jsDoc?.doc ?? '';
		const docTokens = jsDoc?.docTokens;
		if (docTokens)
		{	doc = '';
			let curLinkIsMonospace = false;
			let curNamepath = '';
			for (const {kind, text} of docTokens)
			{	switch (kind)
				{	case 'text':
						// Text
						doc += text;
						break;
					case 'lineBreak':
						// New paragraph
						doc += '\n\n------\n\n';
						break;
					case 'linkText':
						// Link text
						curNamepath += text;
						break;
					case 'link':
						if (text != '}')
						{	// Link open
							curNamepath = '';
							curLinkIsMonospace = text.startsWith('{@linkcode');
						}
						else
						{	// Link close
							curNamepath = curNamepath.trim();
							if (curNamepath)
							{	let linkText = '';
								if (doc.endsWith(']'))
								{	const pos = doc.lastIndexOf('[');
									if (pos != -1)
									{	linkText = doc.slice(pos+1, -1);
										if (RE_NO_NL.test(linkText))
										{	linkText = '';
										}
										else
										{	doc = doc.slice(0, pos);
										}
									}
								}
								if (!linkText)
								{	const pos = curNamepath.lastIndexOf('|');
									if (pos != -1)
									{	linkText = curNamepath.slice(pos+1);
										curNamepath = curNamepath.slice(0, pos);
									}
								}
								if (!linkText)
								{	linkText = curNamepath;
								}
								const link = this.#collection.getLinkByNamepath(curNamepath, backToTopDir);
								doc += link ? mdLink(linkText, link, curLinkIsMonospace) : linkText;
							}
						}
				}
			}
		}
		doc = doc.trim();
		if (!doc)
		{	return '';
		}
		doc = indentAndWrap(doc, {indent: '', ignoreFirstIndent: true});
		return doc;
	}
}

function isExportFromEntryPoint(node: DocNode)
{	return node.location.entryPointNumber!=undefined || node.exports?.find(e => e.location.entryPointNumber != undefined)!=undefined;
}

function mdGrid(oneLineHeader: string, cells: string[], nColumns: number)
{	let code = '';
	if (cells.length)
	{	if (nColumns > cells.length)
		{	nColumns = cells.length;
		}
		const cellWidths = new Uint32Array(nColumns);
		cellWidths[0] = Math.max(oneLineHeader.length, 3); // at least '---'.length
		let i = 0;
		for (const cell of cells)
		{	cellWidths[i] = Math.max(cellWidths[i], cell.length, 3);
			if (++i == nColumns)
			{	i = 0;
			}
		}
		code += `\n\n| ${oneLineHeader}${' '.repeat(cellWidths[0]-oneLineHeader.length)} |`;
		for (i=1; i<nColumns; i++)
		{	code += ' '.repeat(cellWidths[i]+2);
			code += '|';
		}
		code += '\n|';
		for (i=0; i<nColumns; i++)
		{	code += ' ';
			code += '-'.repeat(cellWidths[i]);
			code += ' |';
		}
		code += '\n';
		i = 0;
		for (const cell of cells)
		{	code += '| ' + cell + ' '.repeat(cellWidths[i] - cell.length + 1);
			if (++i == nColumns)
			{	code += '|\n';
				i = 0;
			}
		}
		if (i > 0)
		{	while (i < nColumns)
			{	code += '|';
				code += ' '.repeat(cellWidths[i++]+2);
			}
			code += '|\n';
		}
	}
	return code;
}
