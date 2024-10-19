import {indentAndWrap} from '../../deps.ts';
import {DocNode, ClassConstructorParamDef, TsTypeDef, LiteralDef, LiteralMethodDef, TsTypeParamDef, TsTypeLiteralDef, FunctionDef, Accessibility, JsDoc, InterfaceDef, DocNodeNamespace, DocNodeVariable, DocNodeFunction, DocNodeClass, DocNodeTypeAlias, DocNodeEnum, DocNodeInterface, ClassDef, ClassPropertyDef, ClassMethodDef, Location, ClassConstructorDef, InterfacePropertyDef, InterfaceMethodDef, EnumMemberDef} from '../../doc_node/mod.ts';

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

type Accessor =
{	getter: ClassMethodDef|undefined;
	setter: ClassMethodDef|undefined;
	isStatic: boolean;
	accessibility?: Accessibility;
	location: Location;
	jsDoc?: JsDoc;
};

export class MdGen
{	#nodes: DocNode[];
	#pathNames = new Set<string>;
	#paths = new Map<DocNode, string>;

	constructor(nodes: DocNode[])
	{	this.#nodes = nodes;
		// Reserve paths for all toplevel nodes
		for (const node of nodes)
		{	if (node.declarationKind=='export' && this.#isPublicOrProtected(node))
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
		{	sectionId = memberToSectionId(node.enumDef.members[nodeSubIndex]);
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
		const sectionId = memberToSectionId(member, isStatic);
		return {dir, sectionId};
	}

	#isPublicOrProtected(node: {accessibility?: Accessibility, jsDoc?: JsDoc})
	{	return node.accessibility !== 'private' && (node.jsDoc?.tags?.findIndex(v => v.kind == 'private') ?? -1) == -1;
	}

	#convertDocNode(node: DocNode)
	{	const {filename} = node.location;
		let code = STYLE;
		// class def
		if (node.kind == 'class')
		{	const {classDef} = node;
			// decorators
			if (classDef.decorators)
			{	for (const d of classDef.decorators)
				{	const link = this.#getLink(this.#nodes[d.nodeIndex ?? -1]);
					const name = link ? mdLink(d.name, `../${link}`) : d.name;
					code += `@${name}(${d.args?.join(', ') ?? ''})\n\n`;
				}
			}
			// class (h1 header)
			code += `# ${classDef.isAbstract ? '<span class="lit-keyword">abstract</span> ' : ''}<span class="lit-keyword">class</span> ${node.name}`;
			// type params
			code += this.#convertTypeParams(classDef.typeParams, filename);
			// extends
			code += !classDef.extends ? '' : ' <span class="lit-keyword">extends</span> ' + this.#getTypeName(classDef.extends, classDef.superNodeIndex) + this.#convertActualTypeParams(classDef.superTypeParams, filename);
			// implements
			code += classDef.implements.length==0 ? '' : ' <span class="lit-keyword">implements</span> ' + this.#convertActualTypeParams(classDef.implements, filename);
			// end h1 header
			code += '\n\n';
			// constructors
			const {constructors, destructors, indexSignatures, propertiesAndAccessors, methods} = this.#getClassMembers(classDef);
			const sections = ['', '', '', '', '', '', '', ''];
			for (const c of constructors)
			{	let codeCur = '#### ';
				if (c.accessibility === 'protected')
				{	codeCur += '<span class="lit-keyword">protected</span> ';
				}
				codeCur += `<span class="lit-keyword">constructor</span>(${c.params.map(a => this.#convertArg(a, filename)).join(', ')})`;
				codeCur += '\n\n';
				codeCur += this.#convertJsDoc(c.jsDoc, true);
				sections[sectionIndex(c)] += codeCur;
			}
			// destructors
			for (const m of destructors)
			{	let codeCur = '#### ';
				codeCur += this.#convertFunction(m.kind, m.name, m.accessibility, m.isAbstract, m.isStatic, m.optional, m.functionDef, filename, true);
				codeCur += '\n\n';
				codeCur += this.#convertJsDoc(m.jsDoc, true);
				sections[sectionIndex(m)] += codeCur;
			}
			// index signatures
			for (const c of indexSignatures)
			{	let codeCur = '#### ';
				if (c.readonly)
				{	codeCur += '<span class="lit-keyword">readonly</span> ';
				}
				codeCur += '[' + c.params.map(a => this.#convertArg(a, filename)).join(', ') + ']' + this.#convertTsTypeColon(c.tsType, filename);
				codeCur += '\n\n';
				sections[4] += codeCur;
			}
			// properties
			for (const p of propertiesAndAccessors)
			{	const codeCur = '#### ' + this.#convertPropertyOrAccessor(p, filename, true);
				sections[sectionIndex(p)] += codeCur;
			}
			// methods
			for (const m of methods)
			{	let codeCur = '#### ';
				codeCur += this.#convertFunction(m.kind, m.name, m.accessibility, m.isAbstract, m.isStatic, m.optional, m.functionDef, filename, true);
				codeCur += '\n\n';
				codeCur += this.#convertJsDoc(m.jsDoc, true);
				sections[sectionIndex(m)] += codeCur;
			}
			// join
			const codeStat = sections[0] + sections[1];
			const codeStatDepr = sections[2] + sections[3];
			const codeInst = sections[4] + sections[5];
			const codeInstDepr = sections[6] + sections[7];
			if (codeStat.length+codeStatDepr.length != 0)
			{	code += '## Static members\n\n';
				code += codeStat;
				if (codeStatDepr)
				{	code += '<div style="opacity:0.6">\n\n';
					code += codeStatDepr;
					code += '</div>';
				}
				code += '## Instance members\n\n';
			}
			code += codeInst;
			if (codeInstDepr)
			{	code += '<div style="opacity:0.6">\n\n';
				code += codeInstDepr;
				code += '</div>';
			}
		}
		else if (node.kind == 'typeAlias')
		{	const {typeAliasDef} = node;
			code = `<span class="lit-keyword">type</span> ${node.name}${this.#convertTypeParams(typeAliasDef.typeParams, filename)} = ${this.#convertTsType(typeAliasDef.tsType, filename)}`;
		}
		else if (node.kind == 'interface')
		{	const {interfaceDef} = node;
			// interface
			code = `# <span class="lit-keyword">interface</span> ${node.name}`;
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
			code = this.#convertFunction('', node.name, undefined, false, false, false, functionDef, node.location.filename);
		}
		else if (node.kind == 'enum')
		{	code = `# <span class="lit-keyword">enum</span> ${node.name}\n\n`;
			const {enumDef} = node;
			for (const m of enumDef.members)
			{	code += `${m.name}${m.init ? ' = '+this.#convertTsType(m.init, filename) : ''},`;
				code += '\n\n';
				code += this.#convertJsDoc(m.jsDoc, true);
			}
		}
		else if (node.kind == 'variable')
		{	code = '```ts\n' + (node.variableDef.kind == 'const' ? 'const ' : 'let ') + node.name + this.#convertTsTypeColon(node.variableDef.tsType, filename) + '\n```';
		}
		else if (node.kind == 'namespace')
		{	code = `# <span class="lit-keyword">namespace</span> ${node.name}\n\n`;
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
					if (node.declarationKind=='export' && this.#isPublicOrProtected(node))
					{	namespaces.push(node);
					}
					break;
				case 'variable':
					if (node.declarationKind=='export' && this.#isPublicOrProtected(node))
					{	variables.push(node);
					}
					break;
				case 'function':
					if (node.declarationKind=='export' && this.#isPublicOrProtected(node))
					{	functions.push(node);
					}
					break;
				case 'class':
					if (node.declarationKind=='export' && this.#isPublicOrProtected(node))
					{	classes.push(node);
					}
					break;
				case 'enum':
				case 'typeAlias':
				case 'interface':
					if (node.declarationKind=='export' && this.#isPublicOrProtected(node))
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

	#getClassMembers(classDef: ClassDef)
	{	const methods = new Array<ClassMethodDef>;
		const destructors = new Array<ClassMethodDef>;
		const accessors = new Array<Accessor>;
		const settersOnly = new Array<ClassMethodDef>;
		// Resort `classDef.methods` to `methods` (regular methods), `accessors` (properties that have a getter, and maybe setter), and `settersOnly`
		for (let methodsAndAccessors=classDef.methods, i=0; i<methodsAndAccessors.length; i++)
		{	const m = methodsAndAccessors[i];
			if (this.#isPublicOrProtected(m))
			{	switch (m.kind)
				{	case 'method':
					{	if (!m.isStatic && m.accessibility!=='protected' && (m.name=='[Symbol.dispose]' || m.name=='[Symbol.asyncDispose]'))
						{	destructors.push(m);
						}
						else
						{	methods.push(m);
						}
						break;
					}
					case 'getter':
					{	const accessor: Accessor = {getter: m, setter: undefined, isStatic: m.isStatic, accessibility: m.accessibility, location: m.location, jsDoc: m.jsDoc};
						const j = methodsAndAccessors.findIndex(s => s.kind=='setter' && s.name==m.name);
						if (j != -1)
						{	const setter = methodsAndAccessors[j];
							accessor.setter = setter;
							accessors.push(accessor);
							if (j < i)
							{	const k = settersOnly.indexOf(setter);
								settersOnly.splice(k, 1);
							}
							else
							{	methodsAndAccessors.splice(j, 1);
							}
						}
						break;
					}
					case 'setter':
					{	settersOnly.push(m);
					}
				}
			}
		}
		// Create `propertiesAndAccessors` var that has all of `accessors`, `settersOnly` and `classDef.properties`
		const propertiesAndAccessors: Array<ClassPropertyDef | Accessor> = accessors;
		for (const s of settersOnly)
		{	propertiesAndAccessors.push({getter: undefined, setter: s, isStatic: s.isStatic, accessibility: s.accessibility, location: s.location, jsDoc: s.jsDoc});
		}
		for (const p of classDef.properties)
		{	if (this.#isPublicOrProtected(p))
			{	propertiesAndAccessors.push(p);
			}
		}
		// Sort `propertiesAndAccessors`
		propertiesAndAccessors.sort((a, b) => a.location.filename < b.location.filename ? -1 : a.location.filename > b.location.filename ? +1 : a.location.line - b.location.line);
		// Create `constructors` var with `classDef.constructors`.
		// Also add class members declared in constructor arguments (like `constructor(public memb=1) {}`) to `propertiesAndAccessors`
		const constructors = new Array<ClassConstructorDef>;
		for (const c of classDef.constructors)
		{	if (this.#isPublicOrProtected(c))
			{	constructors.push(c);
			}
			for (const p of c.params)
			{	if (p.readonly || p.accessibility==='public' || p.accessibility==='protected')
				{	let param = p;
					let init: string|undefined;
					if (p.kind == 'assign')
					{	param = p.left;
						init = p.right;
					}
					if (param.kind == 'identifier')
					{	propertiesAndAccessors.push
						(	{	tsType: param.tsType,
								readonly: param.readonly ?? false,
								accessibility: param.accessibility,
								optional: param.optional,
								isAbstract: false,
								isStatic: false,
								isOverride: param.isOverride,
								name: param.name,
								decorators: param.decorators,
								location: c.location,
								init,
							}
						);
					}
				}
			}
		}
		// Create `indexSignatures` var
		const {indexSignatures} = classDef;
		// Done
		return {constructors, destructors, indexSignatures, propertiesAndAccessors, methods};
	}

	#convertPropertyOrAccessor(p: ClassPropertyDef|Accessor, filename: string, isAnchor=false)
	{	let code = '';
		if ('name' in p)
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
		{	code += `<a name="${name}">`;
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
		{	code += `<a name="${name}">`;
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

	#convertTsTypeLiteralDef(typeLiteral: TsTypeLiteralDef|InterfaceDef, isLiteral: boolean, filename: string)
	{	const {callSignatures, properties, indexSignatures, methods} = typeLiteral;
		const term = isLiteral ? ',' : ';';
		let code = '';
		for (const p of callSignatures)
		{	code += this.#convertTypeParams(p.typeParams, filename) + '(' + p.params.map(pp => this.#convertArg(pp, filename)).join(', ') + ')' + this.#convertTsTypeColon(p.tsType, filename);
			code += `${term}\n\n`;
			code += this.#convertJsDoc('jsDoc' in p ? p.jsDoc : undefined, true);
		}
		for (const p of properties)
		{	if (!('jsDoc' in p) || this.#isPublicOrProtected(p))
			{	code += this.#convertProperty(p.name, undefined, false, false, p.readonly, false, p.optional, p.tsType, filename);
				code += `${term}\n\n`;
				code += this.#convertJsDoc('jsDoc' in p ? p.jsDoc : undefined, true);
			}
		}
		for (const p of indexSignatures)
		{	code += (p.readonly ? '<span class="lit-keyword">readonly</span> ' : '') + '[' + p.params.map(pp => this.#convertArg(pp, filename)).join('; ') + ']' + this.#convertTsTypeColon(p.tsType, filename);
			code += `${term}\n\n`;
		}
		for (const p of methods)
		{	if (!('jsDoc' in p) || this.#isPublicOrProtected(p))
			{	code += this.#convertFunction(p.kind, p.name, undefined, false, false, p.optional, p, filename);
				code += `${term}\n\n`;
				code += this.#convertJsDoc('jsDoc' in p ? p.jsDoc : undefined, true);
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

function isDeprecated(node: {jsDoc?: JsDoc})
{	return node.jsDoc?.tags?.find(t => t.kind == 'deprecated') != undefined;
}

function sectionIndex(node: {jsDoc?: JsDoc, isStatic?: boolean, accessibility?: Accessibility})
{	let i = 0;
	if (!node.isStatic)
	{	i |= 4;
	}
	if (isDeprecated(node))
	{	i |= 2;
	}
	if (node.accessibility === 'protected')
	{	i |= 1;
	}
	return i;
}

function memberToSectionId(member?: ClassPropertyDef|ClassMethodDef|InterfacePropertyDef|InterfaceMethodDef|EnumMemberDef, isStatic=false)
{	return !member ? '' : !isStatic ? '#'+member.name : '#static-'+member.name;
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
