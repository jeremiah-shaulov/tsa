import {indentAndWrap} from '../../deps.ts';
import {DocNode, ClassConstructorParamDef, TsTypeDef, LiteralDef, LiteralMethodDef, TsTypeParamDef, TsTypeLiteralDef, FunctionDef, Accessibility, JsDoc, InterfaceDef, DocNodeNamespace, DocNodeVariable, DocNodeFunction, DocNodeClass, DocNodeTypeAlias, DocNodeEnum, DocNodeInterface, ClassDef, ClassPropertyDef, ClassMethodDef, Location, ClassConstructorDef, InterfacePropertyDef, InterfaceMethodDef, EnumMemberDef, ClassIndexSignatureDef} from '../../doc_node/mod.ts';
import {Accessor, MdClassGen, isPublicOrProtected} from './md_class_gen.ts';

const INDEX_N_COLUMNS = 4;

const STYLE =
`<style>
	h4 {margin-top: 2em}
	.sect-deprecated {opacity: 0.6}
	.lit-keyword, .lit-boolean {color: blue}
	.lit-string, .lit-template {color: firebrick}
	.lit-number, .lit-bigint {color: darkgreen}
</style>

`;

const RE_NL = /[\r\n]/;
const RE_MD_ESCAPE = /[`~=#!^()[\]{}<>+\-*_\\.&|]/g;
const RE_LINK_PATH = /(?:\p{L}|\p{N}|_)+|"[^"\\]*(?:\\.[^"\\]*)*"/yu;
const RE_BACKSLASH_ESCAPE = /\\./g;
const RE_LINK_SAN = /[^\p{Letter}\p{Number}_]+/gu;
const RE_LINK_SAN_2 = /^-+|-+$/g;

export class MdGen
{	#nodes: DocNode[];
	#pathNames = new Set<string>;
	#paths = new Map<DocNode, string>;

	constructor(nodes: DocNode[])
	{	this.#nodes = nodes;
		// Reserve paths for all toplevel nodes
		for (const node of nodes)
		{	if (node.declarationKind=='export' && isPublicOrProtected(node))
			{	this.#getLinkDir(node);
			}
		}
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
					yield this.#convertDocNode(node);
					if (node.kind == 'namespace')
					{	yield *this.#genFilesForNodes(node.namespaceDef.elements, nodesDone);
					}
				}
			}
		}
	}

	#getLinkDir(node?: DocNode)
	{	if (node)
		{	const dir = this.#paths.get(node);
			if (dir != undefined)
			{	return dir;
			}
			const {name, kind} = node;
			for (let i=1; true; i++)
			{	const curName = i==1 ? `${name}.${kind}` : `${name}.${i}.${kind}`;
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
		let sectionId = '';
		if (nodeSubIndex!=undefined && node?.kind==='enum')
		{	sectionId = memberToSectionId(true, node.enumDef.members[nodeSubIndex]?.name);
		}
		return `${dir}/README.md${sectionId}`;
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
		const sectionId = memberToSectionId(true, member?.name, isStatic);
		return {dir, sectionId};
	}

	#convertDocNode(node: DocNode)
	{	const {filename} = node.location;
		let code = STYLE;
		// class def
		if (node.kind == 'class')
		{	const {classDef} = node;
			code += this.#convertClassDef(node.name, classDef, filename);
		}
		else if (node.kind == 'typeAlias')
		{	const {typeAliasDef} = node;
			code += `<span class="lit-keyword">type</span> ${node.name}${this.#convertTypeParams(typeAliasDef.typeParams, filename)} = ${this.#convertTsType(typeAliasDef.tsType, filename)}`;
		}
		else if (node.kind == 'interface')
		{	const {interfaceDef} = node;
			// interface
			code += `# <span class="lit-keyword">interface</span> ${node.name}`;
			// type params
			code += this.#convertTypeParams(interfaceDef.typeParams, filename);
			// extends
			code += !interfaceDef.extends.length ? '' : ' <span class="lit-keyword">extends</span> ' + interfaceDef.extends.map(e => this.#convertTsType(e, filename)).join(', ');
			code += '\n\n';
			// interface
			code += this.#convertTsTypeLiteralDef(interfaceDef, false, filename);
		}
		else if (node.kind == 'function')
		{	const {functionDef} = node;
			code += this.#convertFunction('', node.name, undefined, false, false, false, functionDef, node.location.filename);
		}
		else if (node.kind == 'enum')
		{	code += `# <span class="lit-keyword">enum</span> ${node.name}\n\n`;
			const {enumDef} = node;
			for (const m of enumDef.members)
			{	code += `${m.name}${m.init ? ' = '+this.#convertTsType(m.init, filename) : ''},`;
				code += '\n\n';
				code += this.#convertJsDoc(m.jsDoc, true);
			}
		}
		else if (node.kind == 'variable')
		{	const introducer = node.variableDef.kind == 'const' ? '<span class="lit-keyword">const</span> ' : '<span class="lit-keyword">var</span> ';
			code += `# ${introducer} ${node.name}\n\n`;
			if (node.variableDef.tsType)
			{	code += introducer + node.name + this.#convertTsTypeColon(node.variableDef.tsType, filename);
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

	#convertPropertyOrAccessor(p: ClassPropertyDef|Accessor, filename: string, isAnchor=false)
	{	let code = '';
		if (!('getter' in p))
		{	code = this.#convertProperty(p.name, p.accessibility, p.isAbstract, p.isStatic, p.readonly, false, p.optional, p.tsType, filename, isAnchor);
			code += '\n\n';
			code += this.#convertJsDoc(p.jsDoc, true);
		}
		else if (p.getter && p.setter)
		{	code = this.#convertProperty(p.getter.name, p.getter.accessibility, p.getter.isAbstract, p.getter.isStatic, false, true, p.getter.optional, p.getter.functionDef.returnType, filename, isAnchor);
			code += '\n\n';
			if (p.getter.jsDoc && p.setter.jsDoc)
			{	code += 'get\n\n';
				code += this.#convertJsDoc(p.getter.jsDoc, true);
				code += 'set\n\n';
				code += this.#convertJsDoc(p.setter.jsDoc, true);
			}
			else
			{	code += this.#convertJsDoc(p.getter.jsDoc ?? p.setter.jsDoc, true);
			}
		}
		else
		{	const a = p.getter ?? p.setter;
			if (a)
			{	code = this.#convertFunction(a.kind, a.name, a.accessibility, a.isAbstract, a.isStatic, a.optional, a.functionDef, filename, isAnchor);
				code += '\n\n';
				code += this.#convertJsDoc(a.jsDoc, true);
			}
		}
		return code;
	}

	#convertProperty(name: string, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, readonly: boolean|undefined, isAccessor: boolean, optional: boolean, tsType: TsTypeDef|undefined, filename: string, isAnchor=false)
	{	let code = '';
		if (isAnchor)
		{	code += `<a name="${memberToSectionId(false, name, isStatic)}">`;
		}
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
		if (isAnchor)
		{	code += '</a>';
		}
		if (optional)
		{	code += '?';
		}
		code += this.#convertTsTypeColon(tsType, filename);
		return code;
	}

	#convertFunction(isMethod: ''|'method'|'getter'|'setter', name: string, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, optional: boolean, functionDef: FunctionDef|LiteralMethodDef, filename: string, isAnchor=false)
	{	let code = '';
		if (isAnchor)
		{	code += `<a name="${memberToSectionId(false, name, isStatic)}">`;
		}
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
		if (isAnchor)
		{	code += `</a>`;
		}
		code += this.#convertTypeParams(functionDef.typeParams, filename);
		code += '(' + functionDef.params.map(a => this.#convertArg(a, filename)).join(', ') + ')';
		if (functionDef.returnType)
		{	code += this.#convertTsTypeColon(functionDef.returnType, filename);
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

	#convertArg(arg: ClassConstructorParamDef, filename: string)
	{	let code = '';
		switch (arg.kind)
		{	case 'array':
				code += '\\[' + arg.elements.map(a => (!a ? '' : this.#convertArg(a, filename))).join(', ') + ']' + this.#convertTsTypeColon(arg.tsType, filename);
				break;
			case 'object':
				code += '\\{' + arg.props.map(p => (p.kind=='rest' ? '...'+this.#convertArg(p.arg, filename) : p.key+(p.kind=='keyValue' ? '='+this.#convertArg(p.value, filename) : p.value!=undefined ? '='+p.value : ''))).join(', ') + '}' + this.#convertTsTypeColon(arg.tsType, filename);
				break;
			case 'assign':
				code += this.#convertArg(arg.left, filename) + this.#convertTsTypeColon(arg.tsType, filename) + '=' + arg.right;
				break;
			case 'identifier':
				code += arg.name;
				if (arg.optional)
				{	code += '?';
				}
				code += this.#convertTsTypeColon(arg.tsType, filename);
				break;
			case 'rest':
				code += '...' + this.#convertArg(arg.arg, filename) + this.#convertTsTypeColon(arg.tsType, filename);
				break;
		}
		return code;
	}

	#convertTsType(typeDef: TsTypeDef, filename: string): string
	{	switch (typeDef.kind)
		{	case 'keyword':
				return `<span class="lit-keyword">${typeDef.keyword}</span>`;
			case 'literal':
				return this.#convertTsLiteralType(typeDef.literal, typeDef.repr);
			case 'typeRef':
				return this.#getTypeName(typeDef.typeRef.typeName, typeDef.typeRef.nodeIndex, typeDef.typeRef.nodeSubIndex) + this.#convertActualTypeParams(typeDef.typeRef.typeParams, filename);
			case 'union':
				return typeDef.union.map(t => this.#convertTsType(t, filename)).join(' | ');
			case 'intersection':
				return typeDef.intersection.map(t => this.#convertTsType(t, filename)).join(' \\& ');
			case 'array':
				return this.#convertTsType(typeDef.array, filename)+'\\[]';
			case 'tuple':
				return '\\[' + typeDef.tuple.map(t => this.#convertTsType(t, filename)).join(', ') + ']';
			case 'typeOperator':
				return typeDef.typeOperator.operator + ' ' + this.#convertTsType(typeDef.typeOperator.tsType, filename);
			case 'parenthesized':
				return '(' + this.#convertTsType(typeDef.parenthesized, filename) + ')';
			case 'rest':
				return '...' + this.#convertTsType(typeDef.rest, filename);
			case 'optional':
				return this.#convertTsType(typeDef.optional, filename) + '?';
			case 'typeQuery':
				return `<span class="lit-keyword">typeof</span>(${this.#getTypeName(typeDef.typeQuery)})`;
			case 'this':
				return `<span class="lit-keyword">this</span>`;
			case 'fnOrConstructor':
				return (typeDef.fnOrConstructor.constructor ? '<span class="lit-keyword">new</span>' : '') + '(' + typeDef.fnOrConstructor.params.map(a => this.#convertArg(a, filename)).join(', ') + ') => ' + this.#convertTsType(typeDef.fnOrConstructor.tsType, filename);
			case 'conditional':
				return this.#convertTsType(typeDef.conditionalType.checkType, filename) + ' <span class="lit-keyword">extends</span> ' + this.#convertTsType(typeDef.conditionalType.extendsType, filename) + ' ? ' + this.#convertTsType(typeDef.conditionalType.trueType, filename) + ' : ' + this.#convertTsType(typeDef.conditionalType.falseType, filename);
			case 'infer':
				return '<span class="lit-keyword">infer</span> '+typeDef.infer.typeParam.name;
			case 'mapped':
				return '\\{' + (typeDef.mappedType.readonly ? '<span class="lit-keyword">readonly</span> ' : '') + '\\[' + this.#convertTypeParam(typeDef.mappedType.typeParam, 'in', filename) + this.#convertTsTypeColon(typeDef.mappedType.nameType, filename) + ']' + (typeDef.mappedType.optional ? '?' : '') + this.#convertTsTypeColon(typeDef.mappedType.tsType, filename) + '}';
			case 'importType':
				return `<span class="lit-keyword">import</span>(${JSON.stringify(typeDef.importType.specifier)})${!typeDef.importType.qualifier ? '' : '.'+typeDef.importType.qualifier}` + this.#convertActualTypeParams(typeDef.importType.typeParams, filename);
			case 'indexedAccess':
				return (typeDef.indexedAccess.readonly ? '<span class="lit-keyword">readonly</span> ' : '') + this.#convertTsType(typeDef.indexedAccess.objType, filename) + '\\[' + this.#convertTsType(typeDef.indexedAccess.indexType, filename) + ']';
			case 'typeLiteral':
				return '\\{' + this.#convertTsTypeLiteralDef(typeDef.typeLiteral, true, filename) + '}';
			case 'typePredicate':
				return (typeDef.typePredicate.asserts ? '<span class="lit-keyword">asserts</span> ' : '') + (typeDef.typePredicate.param.name ?? '<span class="lit-keyword">this</span>') + (!typeDef.typePredicate.type ? '' : ' <span class="lit-keyword">is</span> ' + this.#convertTsType(typeDef.typePredicate.type, filename));
		}
	}

	#convertTsTypeColon(typeDef: TsTypeDef|undefined, filename: string)
	{	if (!typeDef)
		{	return '';
		}
		return ': '+this.#convertTsType(typeDef, filename);
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

	#convertClassDef(name: string, classDef: ClassDef, filename: string)
	{	let code = '';
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
		code += this.#convertTypeParams(classDef.typeParams, filename);
		// Extends
		code += !classDef.extends ? '' : ' <span class="lit-keyword">extends</span> ' + this.#getTypeName(classDef.extends, classDef.superNodeIndex) + this.#convertActualTypeParams(classDef.superTypeParams, filename);
		// Implements
		code += classDef.implements.length==0 ? '' : ' <span class="lit-keyword">implements</span> ' + this.#convertActualTypeParams(classDef.implements, filename);
		// End h1 header
		code += '\n\n';
		// Outline
		// deno-lint-ignore no-this-alias
		const that = this;
		let isFirstConstructor = true;
		let isFirstIndexSignature = true;
		const {outline, sectionsCode} = MdClassGen
		(	classDef,
			{	onConstructor(c)
				{	let codeCur = '#### ';
					const isAnchor = isFirstConstructor;
					isFirstConstructor = false;
					if (isAnchor)
					{	codeCur += `<a name="${memberToSectionId(false, c.name)}">`;
					}
					if (c.accessibility === 'protected')
					{	codeCur += '<span class="lit-keyword">protected</span> ';
					}
					codeCur += '<span class="lit-keyword">constructor</span>';
					if (isAnchor)
					{	codeCur += '</a>';
					}
					codeCur += `(${c.params.map(a => that.#convertArg(a, filename)).join(', ')})`;
					codeCur += '\n\n';
					codeCur += that.#convertJsDoc(c.jsDoc, true);
					return codeCur;
				},
				onIndexSignature(c)
				{	let codeCur = '#### ';
					const isAnchor = isFirstIndexSignature;
					isFirstIndexSignature = false;
					if (isAnchor)
					{	codeCur += `<a name="${memberToSectionId(false)}">`;
					}
					if (c.readonly)
					{	codeCur += '<span class="lit-keyword">readonly</span> ';
					}
					codeCur += '[' + c.params.map(a => that.#convertArg(a, filename)).join(', ') + ']';
					if (isAnchor)
					{	codeCur += '</a>';
					}
					codeCur += that.#convertTsTypeColon(c.tsType, filename);
					codeCur += '\n\n';
					return codeCur;
				},
				onProperty(p)
				{	let codeCur = '#### ';
					codeCur += that.#convertPropertyOrAccessor(p, filename, true);
					return codeCur;
				},
				onMethod(m)
				{	let codeCur = '#### ';
					codeCur += that.#convertFunction(m.kind, m.name, m.accessibility, m.isAbstract, m.isStatic, m.optional, m.functionDef, filename, true);
					codeCur += '\n\n';
					codeCur += that.#convertJsDoc(m.jsDoc, true);
					return codeCur;
				},
			}
		);
		code += outline;
		// Properties and methods
		code += sectionsCode;
		// Done
		return code;
	}

	#convertTsTypeLiteralDef(typeLiteral: TsTypeLiteralDef|InterfaceDef, isLiteral: boolean, filename: string)
	{	const {callSignatures, properties, indexSignatures, methods} = typeLiteral;
		let separ = '';
		let code = '';
		for (const p of callSignatures)
		{	code += isLiteral ? separ : '#### ';
			code += this.#convertTypeParams(p.typeParams, filename) + '(' + p.params.map(pp => this.#convertArg(pp, filename)).join(', ') + ')' + this.#convertTsTypeColon(p.tsType, filename);
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
			code += '[' + p.params.map(pp => this.#convertArg(pp, filename)).join('; ') + ']' + this.#convertTsTypeColon(p.tsType, filename);
			if (!isLiteral)
			{	code += ';\n\n';
			}
			else
			{	separ = ', ';
			}
		}
		for (const p of properties)
		{	code += isLiteral ? separ : '#### ';
			code += this.#convertProperty(p.name, undefined, false, false, p.readonly, false, p.optional, p.tsType, filename, !isLiteral);
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
			code += this.#convertFunction(p.kind, p.name, undefined, false, false, p.optional, p, filename, !isLiteral);
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

	#convertTypeParams(typeParams: TsTypeParamDef[], filename: string)
	{	const code = typeParams.map(p => this.#convertTypeParam(p, 'extends', filename)).join(', ');
		return !code ? '' : `\\<${code}>`;
	}

	#convertTypeParam(typeParam: TsTypeParamDef, constraint: string, filename: string)
	{	return `${typeParam.name}${!typeParam.constraint ? '' : ` <span class="lit-keyword">${constraint}</span> `+this.#convertTsType(typeParam.constraint, filename)}${!typeParam.default ? '' : '='+this.#convertTsType(typeParam.default, filename)}`;
	}

	#convertActualTypeParams(typeParams: TsTypeDef[]|undefined, filename: string)
	{	const code = typeParams?.map(t => this.#convertTsType(t, filename)).join(', ');
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
							doc += link ? mdLink(linkText, `../${link.dir}/README.md${link.sectionId}`) : linkText;
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

function memberToSectionId(withHashSign: boolean, name?: string, isStatic=false)
{	if (!name)
	{	return !withHashSign ? 'index-signature' : '#index-signature';
	}
	name = name.replace(RE_LINK_SAN, '-').replace(RE_LINK_SAN_2, '');
	if (isStatic)
	{	return !withHashSign ? 'static.'+name : '#static.'+name;
	}
	else
	{	return !withHashSign ? name : '#'+name;
	}
}
