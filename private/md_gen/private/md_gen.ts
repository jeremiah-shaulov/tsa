import {indentAndWrap} from '../../deps.ts';
import {DocNode, ClassConstructorParamDef, TsTypeDef, LiteralDef, LiteralMethodDef, TsTypeParamDef, TsTypeLiteralDef, FunctionDef, Accessibility, JsDoc, DocNodeNamespace, DocNodeVariable, DocNodeFunction, DocNodeClass, DocNodeTypeAlias, DocNodeEnum, DocNodeInterface, ClassPropertyDef, ClassMethodDef, InterfacePropertyDef, InterfaceMethodDef, EnumMemberDef, LiteralPropertyDef} from '../../doc_node/mod.ts';
import {Accessor, MdClassGen, isDeprecated, isPublicOrProtected} from './md_class_gen.ts';

const INDEX_N_COLUMNS = 4;

const RE_NL = /[\r\n]/;
const RE_MD_ESCAPE = /[`~=#!^()[\]{}<>+\-*_\\.&|]/g;
const RE_LINK_PATH = /(?:\p{L}|\p{N}|_)+|"[^"\\]*(?:\\.[^"\\]*)*"/yu;
const RE_BACKSLASH_ESCAPE = /\\./g;

type Gen =
{	getHeaderId(name?: string, isStatic?: boolean): string;
	getCode(): string;
};

class Gens
{	#nodes;
	#nodeToGen;
	#pathNames = new Set<string>;
	#paths = new Map<DocNode, string>;
	#gens = new Map<DocNode, Gen>;

	constructor(nodes: DocNode[], nodeToGen: (node: DocNode) => Gen|undefined)
	{	this.#nodes = nodes;
		this.#nodeToGen = nodeToGen;
	}

	getGen(node?: DocNode)
	{	if (node)
		{	let gen = this.#gens.get(node);
			if (!gen)
			{	gen = this.#nodeToGen(node);
				if (gen)
				{	this.#gens.set(node, gen);
				}
			}
			return gen;
		}
	}

	getDir(node?: DocNode)
	{	if (node)
		{	const dir = this.#paths.get(node);
			if (dir != undefined)
			{	return dir;
			}
			const {name, kind} = node;
			const kindName = kind=='typeAlias' ? 'type.' : kind+'.';
			const fullName = node.declarationKind=='export' ? kindName+name : 'private.'+kindName+name;
			for (let i=1; true; i++)
			{	const curName = i==1 ? fullName : fullName+'.'+i;
				if (!this.#pathNames.has(curName))
				{	this.#pathNames.add(curName);
					this.#paths.set(node, curName);
					return curName;
				}
			}
		}
	}

	getLink(node?: DocNode, nodeSubIndex?: number)
	{	const dir = this.getDir(node);
		if (!dir)
		{	return '';
		}
		let hashHeaderId = '';
		if (nodeSubIndex!=undefined && node?.kind==='enum')
		{	hashHeaderId = this.#getHashHeaderId(node, node.enumDef.members[nodeSubIndex]?.name);
		}
		return `${dir}/README.md${hashHeaderId}`;
	}

	#getHashHeaderId(node?: DocNode, name?: string, isStatic=false)
	{	const headerId = this.getGen(node)?.getHeaderId(name, isStatic);
		return headerId ? '#'+headerId : '';
	}

	getLinkByNamepath(namepath: string)
	{	let pos = 0;
		let isStatic = false;
		let node: DocNode|undefined;
		let member: ClassPropertyDef|ClassMethodDef|InterfacePropertyDef|InterfaceMethodDef|EnumMemberDef|undefined;
L:		while (pos < namepath.length)
		{	if (pos != 0)
			{	const c = namepath.charAt(pos++);
				isStatic = c == '.';
				if (!isStatic && c!='#')
				{	return '';
				}
			}
			RE_LINK_PATH.lastIndex = pos;
			if (!RE_LINK_PATH.test(namepath))
			{	return '';
			}
			pos = RE_LINK_PATH.lastIndex;
			const name = namepath.charAt(0)=='"' ? namepath.slice(1, pos-1).replace(RE_BACKSLASH_ESCAPE, m => m.charAt(1)) : namepath.slice(0, pos);
			if (!node)
			{	// Find public symbol
				node = this.#nodes.find(n => n.name==name && n.declarationKind=='export');
				if (!node)
				{	return '';
				}
			}
			else
			{	if (member)
				{	// Convert `member` to `node`
					node = undefined;
					if ('tsType' in member && member.tsType)
					{	node = this.#tsTypeToNode(member.tsType);
					}
					if (!node)
					{	return '';
					}
					member = undefined;
				}
				// Get member of node
				while (true)
				{	switch (node.kind)
					{	case 'class':
							member =
							(	node.classDef.properties.find(p => p.name==name && p.isStatic==isStatic) ??
								node.classDef.methods.find(p => p.name==name && p.isStatic==isStatic)
							);
							break;
						case 'interface':
							member =
							(	node.interfaceDef.properties.find(p => p.name==name) ??
								node.interfaceDef.methods.find(p => p.name==name)
							);
							break;
						case 'enum':
							member = node.enumDef.members.find(p => p.name == name);
							break;
						case 'typeAlias':
							node = this.#tsTypeToNode(node.typeAliasDef.tsType);
							if (!node)
							{	return '';
							}
							continue;
						case 'namespace':
							node = node.namespaceDef.elements.find(p => p.name == name);
							if (!node)
							{	return '';
							}
							member = undefined;
							continue L;
					}
					break;
				}
				if (!member)
				{	return '';
				}
			}
		}
		const dir = this.getDir(node);
		if (!dir)
		{	return '';
		}
		const hashHeaderId = this.#getHashHeaderId(node, member?.name, isStatic);
		return `../${dir}/README.md${hashHeaderId}`;
	}

	#tsTypeToNode(tsType: TsTypeDef)
	{	while (true)
		{	switch (tsType.kind)
			{	case 'typeRef':
					return this.#nodes[tsType.typeRef.nodeIndex ?? -1];
				case 'parenthesized':
					tsType = tsType.parenthesized;
					continue;
				/*case 'optional':
				case 'intersection':
				case 'typeLiteral':

				case 'conditional':
				case 'mapped':
				case 'keyword':
				case 'literal':
				case 'union':
				case 'array':
				case 'tuple':
				case 'typeOperator':
				case 'rest':
				case 'typeQuery':
				case 'this':
				case 'fnOrConstructor':
				case 'importType':
				case 'infer':
				case 'indexedAccess':
				case 'typePredicate':*/
			}
			break;
		}
	}
}

export class MdGen
{	#nodes: DocNode[];
	#gens: Gens;

	constructor(nodes: DocNode[])
	{	this.#nodes = nodes;
		this.#gens = new Gens
		(	nodes,
			node =>
			{	if (node.kind=='class' || node.kind=='interface' || node.kind=='typeAlias' || node.kind=='enum' || node.kind=='function' || node.kind=='variable' || node.kind=='namespace')
				{	return new MdClassGen
					(	node,
						{	onTopHeader: node =>
							{	let code = '';
								if (node.kind == 'class')
								{	const {classDef} = node;
									// Decorators
									if (classDef.decorators)
									{	for (const d of classDef.decorators)
										{	const link = this.#gens.getLink(this.#nodes[d.nodeIndex ?? -1]);
											const name = link ? mdLink(d.name, `../${link}`) : d.name;
											code += `@${name}(${d.args?.join(', ') ?? ''})\n\n`;
										}
									}
									// Class (h1 header)
									code += '# `';
									if (classDef.isAbstract)
									{	code += 'abstract ';
									}
									code += 'class` ';
									code += node.name;
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
									code += node.name;
									// Type params
									code += this.#convertTypeParams(interfaceDef.typeParams);
									// Extends
									code += !interfaceDef.extends.length ? '' : ' `extends` ' + interfaceDef.extends.map(e => this.#convertTsType(e)).join(', ');
								}
								else if (node.kind == 'typeAlias')
								{	const {typeAliasDef} = node;
									code += '# `type` ';
									code += node.name + this.#convertTypeParams(typeAliasDef.typeParams);
								}
								else if (node.kind == 'enum')
								{	const {enumDef} = node;
									code += enumDef.isConst ? '# `const enum` ' : '# `enum` ';
									code += node.name;
								}
								else if (node.kind == 'function')
								{	code += '# `function` ';
									code += node.name;
								}
								else if (node.kind == 'variable')
								{	const {variableDef} = node;
									code += variableDef.kind=='const' ? '# `const` ' : '# `var` ';
									code += node.name;
								}
								else if (node.kind == 'namespace')
								{	code += '# `namespace` ';
									code += node.name;
								}
								return code;
							},
							onConstructorDecl: m =>
							{	let codeCur = '`';
								if (isDeprecated(m))
								{	codeCur += 'deprecated ';
								}
								if (m.accessibility === 'protected')
								{	codeCur += 'protected ';
								}
								codeCur += 'constructor`';
								codeCur += `(${m.params.map(a => this.#convertArg(a)).join(', ')})`;
								return codeCur;
							},
							onIndexSignatureDecl: m =>
							{	let codeCur = '';
								if (m.readonly)
								{	codeCur += '`readonly` ';
								}
								codeCur += '[' + m.params.map(a => this.#convertArg(a)).join(', ') + ']';
								codeCur += this.#convertTsTypeColon(m.tsType);
								return codeCur;
							},
							onPropertyDecl: m =>
							{	let codeCur = '';
								if (isDeprecated(m))
								{	codeCur += '`deprecated` ';
								}
								codeCur += this.#convertPropertyOrAccessor(m);
								return codeCur;
							},
							onMethodDecl: m =>
							{	const accessibility = 'accessibility' in m ? m.accessibility : undefined;
								const isAbstract = 'isAbstract' in m && m.isAbstract;
								const isStatic = 'isStatic' in m && m.isStatic;
								let codeCur = '';
								if (isDeprecated(m))
								{	codeCur += '`deprecated` ';
								}
								codeCur += this.#convertFunction(m.kind, m.name, accessibility, isAbstract, isStatic, 'optional' in m && m.optional, 'functionDef' in m ? m.functionDef : m);
								return codeCur;
							},
							onTypeAlias: m =>
							{	let codeCur = '`type` ';
								codeCur += node.name + this.#convertTypeParams(m.typeParams) + ' = ' + this.#convertTsType(m.tsType);
								return codeCur;
							},
							onVariable: m =>
							{	const introducer = m.kind == 'const' ? '`const` ' : '`var` ';
								return introducer + node.name + this.#convertTsTypeColon(m.tsType);
							},
							onEnumMember: m =>
							{	let codeCur = m.name;
								if (m.init)
								{	codeCur += ' = '+this.#convertTsType(m.init);
								}
								return codeCur;
							},
							onNamespace: m =>
							{	return this.#convertNamespace(m.elements);
							},
							onJsDoc: jsDoc =>
							{	return this.#convertJsDoc(jsDoc, true);
							},
						}
					);
				}
			}
		);
	}

	*genFiles(moduleName='')
	{	let code = `# ${moduleName || 'Module'}\n\n`;
		code += this.#convertJsDoc(this.#nodes.find(n => n.kind == 'moduleDoc')?.jsDoc);
		code += this.#convertNamespace(this.#nodes);
		yield {dir: '', code};
		yield *this.#genFilesForNodes(this.#nodes, new Set);
	}

	*#genFilesForNodes(nodes: DocNode[], nodesDone: Set<DocNode>): Generator<{dir: string, code: string}>
	{	for (const node of nodes)
		{	if (node.kind != 'moduleDoc')
			{	if (!nodesDone.has(node))
				{	nodesDone.add(node);
					const gen = this.#gens.getGen(node);
					const code = gen?.getCode() ?? '';
					const dir = this.#gens.getDir(node) ?? '';
					yield {dir, code};
					if (node.kind == 'namespace')
					{	yield *this.#genFilesForNodes(node.namespaceDef.elements, nodesDone);
					}
				}
			}
		}
	}

	#convertNamespace(nodes: DocNode[])
	{	const namespaces = new Array<DocNodeNamespace>;
		const variables = new Array<DocNodeVariable>;
		const functions = new Array<DocNodeFunction>;
		const classes = new Array<DocNodeClass>;
		const types = new Array<DocNodeTypeAlias | DocNodeEnum | DocNodeInterface>;
		for (const node of nodes)
		{	switch (node.kind)
			{	case 'namespace':
					if (node.declarationKind=='export' && isPublicOrProtected(node))
					{	namespaces.push(node);
					}
					break;
				case 'variable':
					if (node.declarationKind=='export' && isPublicOrProtected(node))
					{	variables.push(node);
					}
					break;
				case 'function':
					if (node.declarationKind=='export' && isPublicOrProtected(node))
					{	functions.push(node);
					}
					break;
				case 'class':
					if (node.declarationKind=='export' && isPublicOrProtected(node))
					{	classes.push(node);
					}
					break;
				case 'enum':
				case 'typeAlias':
				case 'interface':
					if (node.declarationKind=='export' && isPublicOrProtected(node))
					{	types.push(node);
					}
			}
		}
		const dirPrefix = nodes==this.#nodes ? '' : '../';
		let code = '';
		code += mdGrid('Namespaces', namespaces.map(n => mdLink(n.name, dirPrefix+this.#gens.getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Variables', variables.map(n => mdLink(n.name, dirPrefix+this.#gens.getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Functions', functions.map(n => mdLink(n.name, dirPrefix+this.#gens.getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Classes', classes.map(n => mdLink(n.name, dirPrefix+this.#gens.getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Types', types.map(n => mdLink(n.name, dirPrefix+this.#gens.getLink(n))), INDEX_N_COLUMNS);
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
	{	const qual = new Array<string>;
		if (accessibility === 'protected')
		{	qual.push('protected');
		}
		if (isAbstract)
		{	qual.push('abstract');
		}
		if (isStatic)
		{	qual.push('static');
		}
		if (readonly)
		{	qual.push('readonly');
		}
		else if (isAccessor)
		{	qual.push('accessor');
		}
		let code = !qual.length ? name : '`'+qual.join(' ')+'` '+name;
		if (optional)
		{	code += '?';
		}
		code += this.#convertTsTypeColon(tsType);
		return code;
	}

	#convertFunction(isMethod: 'function'|'method'|'getter'|'setter', name: string, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, optional: boolean, functionDef: FunctionDef|LiteralMethodDef)
	{	const qual = new Array<string>;
		if (accessibility === 'protected')
		{	qual.push('protected');
		}
		if (isAbstract)
		{	qual.push('abstract');
		}
		if (isStatic)
		{	qual.push('static');
		}
		if (isStatic)
		{	qual.push('static');
		}
		if (isMethod != 'method')
		{	qual.push(isMethod=='getter' ? 'get' : isMethod=='setter' ? 'set' : 'function');
		}
		let code = !qual.length ? name : '`'+qual.join(' ')+'` '+name;
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
			{	code += ': AsyncGenerator<unknown>';
			}
			else if (isAsync)
			{	code += ': Promise<unknown>';
			}
			else if (isGenerator)
			{	code += ': Generator<unknown>';
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
				code += '\\{' + arg.props.map(p => (p.kind=='rest' ? '...'+this.#convertArg(p.arg) : p.key+(p.kind=='keyValue' ? '='+this.#convertArg(p.value) : p.value!=undefined ? '='+p.value : ''))).join(', ') + '}' + this.#convertTsTypeColon(arg.tsType);
				break;
			case 'assign':
				code += this.#convertArg(arg.left) + this.#convertTsTypeColon(arg.tsType) + '=' + arg.right;
				break;
			case 'identifier':
				code += arg.name;
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
				return '`infer` '+typeDef.infer.typeParam.name;
			case 'mapped':
				return '\\{' + (typeDef.mappedType.readonly ? '`readonly` ' : '') + '\\[' + this.#convertTypeParam(typeDef.mappedType.typeParam, 'in') + this.#convertTsTypeColon(typeDef.mappedType.nameType) + ']' + (typeDef.mappedType.optional ? '?' : '') + this.#convertTsTypeColon(typeDef.mappedType.tsType) + '}';
			case 'importType':
				return '`import`('+JSON.stringify(typeDef.importType.specifier)+')'+(!typeDef.importType.qualifier ? '' : '.'+typeDef.importType.qualifier) + this.#convertActualTypeParams(typeDef.importType.typeParams);
			case 'indexedAccess':
				return (typeDef.indexedAccess.readonly ? '`readonly` ' : '') + this.#convertTsType(typeDef.indexedAccess.objType) + '\\[' + this.#convertTsType(typeDef.indexedAccess.indexType) + ']';
			case 'typeLiteral':
				return '\\{' + this.#convertTsTypeLiteralDef(typeDef.typeLiteral) + '}';
			case 'typePredicate':
				return (typeDef.typePredicate.asserts ? '`asserts` ' : '') + (typeDef.typePredicate.param.name ?? '`this`') + (!typeDef.typePredicate.type ? '' : ' `is` ' + this.#convertTsType(typeDef.typePredicate.type));
		}
	}

	#convertTsTypeColon(typeDef: TsTypeDef|undefined)
	{	if (!typeDef)
		{	return '';
		}
		return ': '+this.#convertTsType(typeDef);
	}

	#getTypeName(typeName: string, nodeIndex?: number, nodeSubIndex?: number)
	{	const link = this.#gens.getLink(this.#nodes[nodeIndex ?? -1], nodeSubIndex);
		if (link)
		{	typeName = mdLink(typeName, `../${link}`);
		}
		return typeName;
	}

	#convertTsLiteralType(litDef: LiteralDef, repr: string)
	{	switch (litDef.kind)
		{	case 'string':
				return `<mark>${mdEscape(JSON.stringify(litDef.string))}</mark>`;
			case 'number':
				return `<mark>${repr}</mark>`;
			case 'bigInt':
				return `<mark>${repr}</mark>`;
			case 'boolean':
				return '`' + repr + '`';
			case 'template':
				return `<mark>${mdEscape('`'+repr+'`')}</mark>`;
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
			code += '[' + p.params.map(pp => this.#convertArg(pp)).join('; ') + ']' + this.#convertTsTypeColon(p.tsType);
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
	{	return `${typeParam.name}${!typeParam.constraint ? '' : ' `'+constraint+'` '+this.#convertTsType(typeParam.constraint)}${!typeParam.default ? '' : '='+this.#convertTsType(typeParam.default)}`;
	}

	#convertActualTypeParams(typeParams: TsTypeDef[]|undefined)
	{	const code = typeParams?.map(t => this.#convertTsType(t)).join(', ');
		return !code ? '' : `\\<${code}>`;
	}

	#convertJsDoc(jsDoc?: JsDoc, isBlockquote=false)
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
							let linkText = '';
							if (doc.endsWith(']'))
							{	const pos = doc.lastIndexOf('[');
								if (pos != -1)
								{	linkText = doc.slice(pos+1, -1);
									if (RE_NL.test(linkText))
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
							// TODO: parse `curLinkHref`
							if (curLinkIsMonospace)
							{	linkText = '`' + linkText.replaceAll('`', '\\`') + '`';
							}
							const link = this.#gens.getLinkByNamepath(curNamepath);
							doc += link ? mdLink(linkText, link) : linkText;
						}
				}
			}
		}
		doc = doc.trim();
		if (!doc)
		{	return '';
		}
		doc = indentAndWrap(doc, {indent: '', ignoreFirstIndent: true});
		if (isBlockquote)
		{	doc = '> ' + doc.replaceAll('\n', '\n> ') + '\n\n';
		}
		return doc;
	}
}

function mdEscape(code: string)
{	return code.replace(RE_MD_ESCAPE, c => `\\${c}`);
}

function mdLink(text: string, href: string)
{	text = text.replaceAll(']', '\\]');
	href = encodeURI(href).replaceAll(')', '&#41;');
	return `[${text}](${href})`;
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
