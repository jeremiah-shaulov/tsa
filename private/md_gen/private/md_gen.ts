import {indentAndWrap} from '../../deps.ts';
import {DocNode, ClassConstructorParamDef, TsTypeDef, LiteralDef, LiteralMethodDef, TsTypeParamDef, TsTypeLiteralDef, FunctionDef, Accessibility, JsDoc, InterfaceDef, DocNodeNamespace, DocNodeVariable, DocNodeFunction, DocNodeClass, DocNodeTypeAlias, DocNodeEnum, DocNodeInterface, ClassPropertyDef, ClassMethodDef, InterfacePropertyDef, InterfaceMethodDef, EnumMemberDef} from '../../doc_node/mod.ts';
import {Accessor, ClassConverter, MdClassGen, isPublicOrProtected} from './md_class_gen.ts';

const INDEX_N_COLUMNS = 4;

const STYLE =
`<style>
	.lit-keyword, .lit-boolean {color: blue}
	.lit-string, .lit-template {color: firebrick}
	.lit-number, .lit-bigint {color: darkgreen}
</style>

`;

const RE_NL = /[\r\n]/;
const RE_MD_ESCAPE = /[`~=#!^()[\]{}<>+\-*_\\.&|]/g;
const RE_LINK_PATH = /(?:\p{L}|\p{N}|_)+|"[^"\\]*(?:\\.[^"\\]*)*"/yu;
const RE_BACKSLASH_ESCAPE = /\\./g;

type OnFile = (dir: string, code: string) => Promise<void>|void;
type Gen =
{	getHeaderId(name?: string, isStatic?: boolean): string;
	getCode(): {outline: string, sectionsCode: string};
};

export class MdGen
{	#nodes: DocNode[];
	#pathNames = new Set<string>;
	#paths = new Map<DocNode, string>;
	#gens = new Map<DocNode, Gen>;

	#classConverter: ClassConverter =
	{	onConstructorDecl: m =>
		{	let codeCur = '';
			if (m.accessibility === 'protected')
			{	codeCur += '<span class="lit-keyword">protected</span> ';
			}
			codeCur += '<span class="lit-keyword">constructor</span>';
			codeCur += `(${m.params.map(a => this.#convertArg(a)).join(', ')})`;
			return codeCur;
		},
		onConstructorDoc: m =>
		{	return this.#convertJsDoc(m.jsDoc, true);
		},
		onIndexSignatureDecl: m =>
		{	let codeCur = '';
			if (m.readonly)
			{	codeCur += '<span class="lit-keyword">readonly</span> ';
			}
			codeCur += '[' + m.params.map(a => this.#convertArg(a)).join(', ') + ']';
			codeCur += this.#convertTsTypeColon(m.tsType);
			return codeCur;
		},
		onIndexSignatureDoc: () =>
		{	return '';
		},
		onPropertyDecl: m =>
		{	return this.#convertPropertyOrAccessor(m);
		},
		onPropertyDoc: m =>
		{	let codeCur = '';
			if ('getter' in m && m.getter?.jsDoc && m.setter?.jsDoc)
			{	codeCur += 'get\n\n';
				codeCur += this.#convertJsDoc(m.getter.jsDoc, true);
				codeCur += 'set\n\n';
				codeCur += this.#convertJsDoc(m.setter.jsDoc, true);
			}
			else
			{	codeCur += this.#convertJsDoc(m.jsDoc, true);
			}
			return codeCur;
		},
		onMethodDecl: m =>
		{	return this.#convertFunction(m.kind, m.name, m.accessibility, m.isAbstract, m.isStatic, m.optional, m.functionDef);
		},
		onMethodDoc: m =>
		{	return this.#convertJsDoc(m.jsDoc, true);
		},
	};

	constructor(nodes: DocNode[])
	{	this.#nodes = nodes;
	}

	async genFiles(moduleName: string, onFile: OnFile)
	{	let code = `# ${moduleName || 'Module'}\n\n`;
		code += this.#convertJsDoc(this.#nodes.find(n => n.kind == 'moduleDoc')?.jsDoc);
		code += this.#convertNamespace(this.#nodes);
		await onFile('', code);
		await this.#genFilesForNodes(this.#nodes, new Set, onFile);
	}

	async #genFilesForNodes(nodes: DocNode[], nodesDone: Set<DocNode>, onFile: OnFile)
	{	for (const node of nodes)
		{	if (node.kind != 'moduleDoc')
			{	if (!nodesDone.has(node))
				{	nodesDone.add(node);
					const {dir, code} = this.#convertDocNode(node);
					await onFile(dir, code);
					if (node.kind == 'namespace')
					{	await this.#genFilesForNodes(node.namespaceDef.elements, nodesDone, onFile);
					}
				}
			}
		}
	}

	#getGen(node?: DocNode)
	{	if (node)
		{	let gen = this.#gens.get(node);
			if (!gen)
			{	switch (node.kind)
				{	case 'class':
						gen = new MdClassGen(node.classDef, this.#classConverter);
						break;
				}
				if (gen)
				{	this.#gens.set(node, gen);
				}
			}
			return gen;
		}
	}

	#getLinkDir(node?: DocNode)
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

	#getLink(node?: DocNode, nodeSubIndex?: number)
	{	const dir = this.#getLinkDir(node);
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
	{	const headerId = this.#getGen(node)?.getHeaderId(name, isStatic);
		return headerId ? '#'+headerId : '';
	}

	#getDirByNamepath(linkHref: string)
	{	let pos = 0;
		let isStatic = false;
		let node: DocNode|undefined;
		let member: ClassPropertyDef|ClassMethodDef|InterfacePropertyDef|InterfaceMethodDef|EnumMemberDef|undefined;
L:		while (pos < linkHref.length)
		{	if (pos != 0)
			{	const c = linkHref.charAt(pos++);
				isStatic = c == '.';
				if (!isStatic && c!='#')
				{	return;
				}
			}
			RE_LINK_PATH.lastIndex = pos;
			if (!RE_LINK_PATH.test(linkHref))
			{	return;
			}
			pos = RE_LINK_PATH.lastIndex;
			const name = linkHref.charAt(0)=='"' ? linkHref.slice(1, pos-1).replace(RE_BACKSLASH_ESCAPE, m => m.charAt(1)) : linkHref.slice(0, pos);
			if (!node)
			{	// Find public symbol
				node = this.#nodes.find(n => n.name==name && n.declarationKind=='export');
				if (!node)
				{	return;
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
					{	return;
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
							{	return;
							}
							continue;
						case 'namespace':
							node = node.namespaceDef.elements.find(p => p.name == name);
							if (!node)
							{	return;
							}
							member = undefined;
							continue L;
					}
					break;
				}
				if (!member)
				{	return;
				}
			}
		}
		const dir = this.#getLinkDir(node);
		if (!dir)
		{	return;
		}
		const hashHeaderId = this.#getHashHeaderId(node, member?.name, isStatic);
		return {dir, hashHeaderId};
	}

	#convertDocNode(node: DocNode)
	{	let code = STYLE;
		// class def
		if (node.kind == 'class')
		{	code += this.#convertClassDef(node.name, node);
		}
		else if (node.kind == 'typeAlias')
		{	const {typeAliasDef} = node;
			code += `<span class="lit-keyword">type</span> ${node.name}${this.#convertTypeParams(typeAliasDef.typeParams)} = ${this.#convertTsType(typeAliasDef.tsType)}`;
		}
		else if (node.kind == 'interface')
		{	const {interfaceDef} = node;
			// interface
			code += `# <span class="lit-keyword">interface</span> ${node.name}`;
			// type params
			code += this.#convertTypeParams(interfaceDef.typeParams);
			// extends
			code += !interfaceDef.extends.length ? '' : ' <span class="lit-keyword">extends</span> ' + interfaceDef.extends.map(e => this.#convertTsType(e)).join(', ');
			code += '\n\n';
			// interface
			code += this.#convertTsTypeLiteralDef(interfaceDef, false);
		}
		else if (node.kind == 'function')
		{	const {functionDef} = node;
			code += this.#convertFunction('', node.name, undefined, false, false, false, functionDef);
		}
		else if (node.kind == 'enum')
		{	code += `# <span class="lit-keyword">enum</span> ${node.name}\n\n`;
			const {enumDef} = node;
			for (const m of enumDef.members)
			{	code += `${m.name}${m.init ? ' = '+this.#convertTsType(m.init) : ''},`;
				code += '\n\n';
				code += this.#convertJsDoc(m.jsDoc, true);
			}
		}
		else if (node.kind == 'variable')
		{	const introducer = node.variableDef.kind == 'const' ? '<span class="lit-keyword">const</span> ' : '<span class="lit-keyword">var</span> ';
			code += `# ${introducer} ${node.name}\n\n`;
			if (node.variableDef.tsType)
			{	code += introducer + node.name + this.#convertTsTypeColon(node.variableDef.tsType);
			}
		}
		else if (node.kind == 'namespace')
		{	code += `# <span class="lit-keyword">namespace</span> ${node.name}\n\n`;
			code += this.#convertNamespace(node.namespaceDef.elements);
		}
		// page
		const dir = this.#getLinkDir(node) ?? '';
		return {dir, code};
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
		code += mdGrid('Namespaces', namespaces.map(n => mdLink(n.name, dirPrefix+this.#getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Variables', variables.map(n => mdLink(n.name, dirPrefix+this.#getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Functions', functions.map(n => mdLink(n.name, dirPrefix+this.#getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Classes', classes.map(n => mdLink(n.name, dirPrefix+this.#getLink(n))), INDEX_N_COLUMNS);
		code += mdGrid('Types', types.map(n => mdLink(n.name, dirPrefix+this.#getLink(n))), INDEX_N_COLUMNS);
		return code;
	}

	#convertPropertyOrAccessor(p: ClassPropertyDef|Accessor)
	{	let code = '';
		if (!('getter' in p))
		{	code = this.#convertProperty(p.name, p.accessibility, p.isAbstract, p.isStatic, p.readonly, false, p.optional, p.tsType);
		}
		else if (p.getter && p.setter)
		{	code = this.#convertProperty(p.getter.name, p.getter.accessibility, p.getter.isAbstract, p.getter.isStatic, false, true, p.getter.optional, p.getter.functionDef.returnType);
		}
		else
		{	const a = p.getter ?? p.setter;
			if (a)
			{	code = this.#convertFunction(a.kind, a.name, a.accessibility, a.isAbstract, a.isStatic, a.optional, a.functionDef);
			}
		}
		return code;
	}

	#convertProperty(name: string, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, readonly: boolean|undefined, isAccessor: boolean, optional: boolean, tsType: TsTypeDef|undefined)
	{	let code = '';
		if (accessibility === 'protected')
		{	code += '<span class="lit-keyword">protected</span> ';
		}
		if (isAbstract)
		{	code += '<span class="lit-keyword">abstract</span> ';
		}
		if (isStatic)
		{	code += '<span class="lit-keyword">static</span> ';
		}
		if (readonly)
		{	code += '<span class="lit-keyword">readonly</span> ';
		}
		else if (isAccessor)
		{	code += '<span class="lit-keyword">accessor</span> ';
		}
		code += name;
		if (optional)
		{	code += '?';
		}
		code += this.#convertTsTypeColon(tsType);
		return code;
	}

	#convertFunction(isMethod: ''|'method'|'getter'|'setter', name: string, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, optional: boolean, functionDef: FunctionDef|LiteralMethodDef)
	{	let code = '';
		if (accessibility === 'protected')
		{	code += '<span class="lit-keyword">protected</span> ';
		}
		if (isAbstract)
		{	code += '<span class="lit-keyword">abstract</span> ';
		}
		if (isStatic)
		{	code += '<span class="lit-keyword">static</span> ';
		}
		code += !isMethod ? '<span class="lit-keyword">function</span> ' : isMethod=='getter' ? '<span class="lit-keyword">get</span> ' : isMethod=='setter' ? '<span class="lit-keyword">set</span> ' : '';
		code += name;
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
				return `<span class="lit-keyword">${typeDef.keyword}</span>`;
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
				return `<span class="lit-keyword">typeof</span>(${this.#getTypeName(typeDef.typeQuery)})`;
			case 'this':
				return `<span class="lit-keyword">this</span>`;
			case 'fnOrConstructor':
				return (typeDef.fnOrConstructor.constructor ? '<span class="lit-keyword">new</span>' : '') + '(' + typeDef.fnOrConstructor.params.map(a => this.#convertArg(a)).join(', ') + ') => ' + this.#convertTsType(typeDef.fnOrConstructor.tsType);
			case 'conditional':
				return this.#convertTsType(typeDef.conditionalType.checkType) + ' <span class="lit-keyword">extends</span> ' + this.#convertTsType(typeDef.conditionalType.extendsType) + ' ? ' + this.#convertTsType(typeDef.conditionalType.trueType) + ' : ' + this.#convertTsType(typeDef.conditionalType.falseType);
			case 'infer':
				return '<span class="lit-keyword">infer</span> '+typeDef.infer.typeParam.name;
			case 'mapped':
				return '\\{' + (typeDef.mappedType.readonly ? '<span class="lit-keyword">readonly</span> ' : '') + '\\[' + this.#convertTypeParam(typeDef.mappedType.typeParam, 'in') + this.#convertTsTypeColon(typeDef.mappedType.nameType) + ']' + (typeDef.mappedType.optional ? '?' : '') + this.#convertTsTypeColon(typeDef.mappedType.tsType) + '}';
			case 'importType':
				return `<span class="lit-keyword">import</span>(${JSON.stringify(typeDef.importType.specifier)})${!typeDef.importType.qualifier ? '' : '.'+typeDef.importType.qualifier}` + this.#convertActualTypeParams(typeDef.importType.typeParams);
			case 'indexedAccess':
				return (typeDef.indexedAccess.readonly ? '<span class="lit-keyword">readonly</span> ' : '') + this.#convertTsType(typeDef.indexedAccess.objType) + '\\[' + this.#convertTsType(typeDef.indexedAccess.indexType) + ']';
			case 'typeLiteral':
				return '\\{' + this.#convertTsTypeLiteralDef(typeDef.typeLiteral, true) + '}';
			case 'typePredicate':
				return (typeDef.typePredicate.asserts ? '<span class="lit-keyword">asserts</span> ' : '') + (typeDef.typePredicate.param.name ?? '<span class="lit-keyword">this</span>') + (!typeDef.typePredicate.type ? '' : ' <span class="lit-keyword">is</span> ' + this.#convertTsType(typeDef.typePredicate.type));
		}
	}

	#convertTsTypeColon(typeDef: TsTypeDef|undefined)
	{	if (!typeDef)
		{	return '';
		}
		return ': '+this.#convertTsType(typeDef);
	}

	#getTypeName(typeName: string, nodeIndex?: number, nodeSubIndex?: number)
	{	const link = this.#getLink(this.#nodes[nodeIndex ?? -1], nodeSubIndex);
		if (link)
		{	typeName = mdLink(typeName, `../${link}`);
		}
		return typeName;
	}

	#convertTsLiteralType(litDef: LiteralDef, repr: string)
	{	switch (litDef.kind)
		{	case 'string':
				return `<span class="lit-string">${mdEscape(JSON.stringify(litDef.string))}</span>`;
			case 'number':
				return `<span class="lit-number">${repr}</span>`;
			case 'bigInt':
				return `<span class="lit-bigint">${repr}</span>`;
			case 'boolean':
				return `<span class="lit-boolean">${repr}</span>`;
			case 'template':
				return `<span class="lit-template">${mdEscape('`'+repr+'`')}</span>`;
		}
	}

	#convertClassDef(name: string, node: DocNodeClass)
	{	let code = '';
		const {classDef} = node;
		// Decorators
		if (classDef.decorators)
		{	for (const d of classDef.decorators)
			{	const link = this.#getLink(this.#nodes[d.nodeIndex ?? -1]);
				const name = link ? mdLink(d.name, `../${link}`) : d.name;
				code += `@${name}(${d.args?.join(', ') ?? ''})\n\n`;
			}
		}
		// Class (h1 header)
		code += '# ';
		if (classDef.isAbstract)
		{	code += '<span class="lit-keyword">abstract</span> ';
		}
		code += `<span class="lit-keyword">class</span> ${name}`;
		// Type params
		code += this.#convertTypeParams(classDef.typeParams);
		// Extends
		code += !classDef.extends ? '' : ' <span class="lit-keyword">extends</span> ' + this.#getTypeName(classDef.extends, classDef.superNodeIndex) + this.#convertActualTypeParams(classDef.superTypeParams);
		// Implements
		code += classDef.implements.length==0 ? '' : ' <span class="lit-keyword">implements</span> ' + this.#convertActualTypeParams(classDef.implements);
		// End h1 header
		code += '\n\n';
		// Gen
		const gen = this.#getGen(node);
		if (gen)
		{	const {outline, sectionsCode} = gen.getCode();
			// Outline
			code += outline;
			// Properties and methods
			code += sectionsCode;
		}
		// Done
		return code;
	}

	#convertTsTypeLiteralDef(typeLiteral: TsTypeLiteralDef|InterfaceDef, isLiteral: boolean)
	{	const {callSignatures, properties, indexSignatures, methods} = typeLiteral;
		let separ = '';
		let code = '';
		for (const p of callSignatures)
		{	code += isLiteral ? separ : '#### ';
			code += this.#convertTypeParams(p.typeParams) + '(' + p.params.map(pp => this.#convertArg(pp)).join(', ') + ')' + this.#convertTsTypeColon(p.tsType);
			if (!isLiteral)
			{	code += ';\n\n';
				code += this.#convertJsDoc('jsDoc' in p ? p.jsDoc : undefined, true);
			}
			else
			{	separ = ', ';
			}
		}
		for (const p of indexSignatures)
		{	code += isLiteral ? separ : '#### ';
			if (p.readonly)
			{	code += '<span class="lit-keyword">readonly</span> ';
			}
			code += '[' + p.params.map(pp => this.#convertArg(pp)).join('; ') + ']' + this.#convertTsTypeColon(p.tsType);
			if (!isLiteral)
			{	code += ';\n\n';
			}
			else
			{	separ = ', ';
			}
		}
		for (const p of properties)
		{	code += isLiteral ? separ : '#### ';
			code += this.#convertProperty(p.name, undefined, false, false, p.readonly, false, p.optional, p.tsType);
			if (!isLiteral)
			{	code += ';\n\n';
				code += this.#convertJsDoc('jsDoc' in p ? p.jsDoc : undefined, true);
			}
			else
			{	separ = ', ';
			}
		}
		for (const p of methods)
		{	code += isLiteral ? separ : '#### ';
			code += this.#convertFunction(p.kind, p.name, undefined, false, false, p.optional, p);
			if (!isLiteral)
			{	code += ';\n\n';
				code += this.#convertJsDoc('jsDoc' in p ? p.jsDoc : undefined, true);
			}
			else
			{	separ = ', ';
			}
		}
		return code;
	}

	#convertTypeParams(typeParams: TsTypeParamDef[])
	{	const code = typeParams.map(p => this.#convertTypeParam(p, 'extends')).join(', ');
		return !code ? '' : `\\<${code}>`;
	}

	#convertTypeParam(typeParam: TsTypeParamDef, constraint: string)
	{	return `${typeParam.name}${!typeParam.constraint ? '' : ` <span class="lit-keyword">${constraint}</span> `+this.#convertTsType(typeParam.constraint)}${!typeParam.default ? '' : '='+this.#convertTsType(typeParam.default)}`;
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
							const link = this.#getDirByNamepath(curNamepath);
							doc += link ? mdLink(linkText, `../${link.dir}/README.md${link.hashHeaderId}`) : linkText;
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
