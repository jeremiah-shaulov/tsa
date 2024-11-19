import {indentAndWrap, crc32, path, jstok, JstokTokenType} from '../../deps.ts';
import {DocNode, ClassConstructorParamDef, TsTypeDef, LiteralDef, LiteralMethodDef, TsTypeParamDef, TsTypeLiteralDef, FunctionDef, Accessibility, JsDoc, DocNodeNamespace, DocNodeVariable, DocNodeFunction, DocNodeClass, DocNodeTypeAlias, DocNodeEnum, DocNodeInterface, ClassPropertyDef, InterfacePropertyDef, LiteralPropertyDef} from '../../doc_node/mod.ts';
import {Accessor, NodeToMd} from './node_to_md.ts';
import {NodeToMdCollection} from './node_to_md_collection.ts';
import {isDeprecated} from './util.ts';
import {mdEscape, mdLink} from './util.ts';

const INDEX_N_COLUMNS = 4;
const EXAMPLE = 'example.ts';

const RE_MD_CODEBLOCKS = /^ ? ? ?```(\w*)[ \t]*$/gm;
const RE_MD_CODEBLOCK_EXAMPLE = /\s*\/\/\s*To\s+run\s+this\s+example:[ \t]*((?:\r?\n[ \t]*\/\/[^\r\n]+)+)/y;
const RE_NO_NL = /[\r\n]/;

const C_CR = '\r'.charCodeAt(0);
const C_LF = '\n'.charCodeAt(0);

export function nodesToMd(nodes: DocNode[], outFileBasename: string, docDirBasename: string, mainTitle='', mainPageStart='', entryPoints=new Array<string>, importUrls=new Array<string>, baseDirUrl='')
{	return new NodesToMd(nodes, outFileBasename, docDirBasename, entryPoints, importUrls, baseDirUrl).genFiles(mainTitle, mainPageStart);
}

class NodesToMd
{	#nodes;
	#outFileBasename;
	#docDirBasename;
	#entryPointsDirs;
	#importUrls;
	#baseDirUrlWithTrailingSlash;
	#collection: NodeToMdCollection;
	#examplesUsed = new Set<number>;
	#nodesLinked = new Set<DocNode>;

	constructor(nodes: DocNode[], outFileBasename: string, docDirBasename: string, entryPoints: string[], importUrls: string[], baseDirUrl: string)
	{	this.#nodes = nodes;
		this.#outFileBasename = outFileBasename;
		this.#docDirBasename = docDirBasename;
		this.#entryPointsDirs = entryPoints.map(f => path.toFileUrl(path.dirname(path.resolve(f))).href);
		this.#importUrls = importUrls;
		this.#baseDirUrlWithTrailingSlash = baseDirUrl.endsWith('/') ? baseDirUrl : baseDirUrl ? baseDirUrl+'/' : '';
		this.#collection = new NodeToMdCollection
		(	nodes,
			node =>
			{	if (node.kind=='class' || node.kind=='interface' || node.kind=='typeAlias' || node.kind=='enum' || node.kind=='function' || node.kind=='variable' || node.kind=='namespace')
				{	return new NodeToMd
					(	node,
						{	onDecorators: decorators =>
							{	let code = '';
								for (const d of decorators)
								{	const link = this.#getLink(this.#nodes[d.nameNodeIndex ?? -1]);
									const name = link ? mdLink(d.name, link) : d.name;
									code += `@${name}(${d.args?.map(a => mdEscape(a)).join(', ') ?? ''})\n\n`;
								}
								return code;
							},
							onTopHeader: () =>
							{	let code = '';
								if (isDeprecated(node))
								{	code = '`deprecated` ';
								}
								if (node.kind == 'class')
								{	const {classDef} = node;
									// Class (h1 header)
									code += classDef.isAbstract ? '`abstract` `class` ' : '`class` ';
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
									code += '`interface` ';
									code += mdEscape(node.name);
									// Type params
									code += this.#convertTypeParams(interfaceDef.typeParams);
									// Extends
									code += !interfaceDef.extends.length ? '' : ' `extends` ' + interfaceDef.extends.map(e => this.#convertTsType(e)).join(', ');
								}
								else if (node.kind == 'typeAlias')
								{	const {typeAliasDef} = node;
									code += '`type` ';
									code += mdEscape(node.name) + this.#convertTypeParams(typeAliasDef.typeParams);
								}
								else if (node.kind == 'enum')
								{	const {enumDef} = node;
									code += enumDef.isConst ? '`const` `enum` ' : '`enum` ';
									code += mdEscape(node.name);
								}
								else if (node.kind == 'function')
								{	code += '`function` ';
									code += mdEscape(node.name);
								}
								else if (node.kind == 'variable')
								{	const {variableDef} = node;
									code += variableDef.kind=='const' ? '`const` ' : '`var` ';
									code += mdEscape(node.name);
								}
								else if (node.kind == 'namespace')
								{	code += '`namespace` ';
									code += mdEscape(node.name);
								}
								return code;
							},
							onConstructor: m =>
							{	let text = '🔧 ';
								if (isDeprecated(m))
								{	text += '`deprecated` ';
								}
								if (m.accessibility === 'protected')
								{	text += '`protected` ';
								}
								const beforeNamePos = text.length;
								text += '`constructor`';
								const afterNamePos = text.length;
								text += `(${m.params.map(a => this.#convertArg(a)).join(', ')})`;
								return {text, beforeNamePos, afterNamePos};
							},
							onIndexSignature: m =>
							{	let text = '🔍 ';
								if (m.readonly)
								{	text += '`readonly` ';
								}
								text += '[' + m.params.map(a => this.#convertArg(a)).join(', ') + ']';
								text += this.#convertTsTypeColon(m.tsType);
								return {text, beforeNamePos: 0, afterNamePos: 0};
							},
							onProperty: m =>
							{	return this.#convertPropertyOrAccessor('📄 ', m);
							},
							onMethod: (m, isDestructor) =>
							{	const accessibility = 'accessibility' in m ? m.accessibility : undefined;
								const isAbstract = 'isAbstract' in m && m.isAbstract;
								const isStatic = 'isStatic' in m && m.isStatic;
								const icon = isDestructor ? '🔨 ' : m.kind!='function' ? '⚙ ' : '';
								return this.#convertFunction(icon, m.kind, m.name, isDeprecated(m), accessibility, isAbstract, isStatic, 'optional' in m && m.optional, 'functionDef' in m ? m.functionDef : m);
							},
							onEnumMember: m =>
							{	let text = '';
								if (isDeprecated(m))
								{	text = '`deprecated` ';
								}
								text += mdEscape(m.name);
								const afterNamePos = text.length;
								if (m.init)
								{	text += ' = '+this.#convertTsType(m.init);
								}
								return {text, beforeNamePos: 0, afterNamePos};
							},
							onTypeAlias: m =>
							{	let text = '`type` ';
								const beforeNamePos = text.length;
								text += mdEscape(node.name);
								const afterNamePos = text.length;
								text += this.#convertTypeParams(m.typeParams) + ' = ' + this.#convertTsType(m.tsType);
								return {text, beforeNamePos, afterNamePos};
							},
							onVariable: m =>
							{	let text = m.kind == 'const' ? '`const` ' : '`var` ';
								const beforeNamePos = text.length;
								text += mdEscape(node.name);
								const afterNamePos = text.length;
								text += this.#convertTsTypeColon(m.tsType);
								return {text, beforeNamePos, afterNamePos};
							},
							onNamespace: m =>
							{	return this.#convertNamespace(m.elements);
							},
							onJsDoc: (jsDoc, node, headerId, submemberNo) =>
							{	return this.#convertJsDoc(jsDoc, node, headerId, submemberNo);
							},
							onLink: (node, memberName, isStatic) =>
							{	return !memberName ? this.#getLink(node) : this.#collection.getLinkByMemberName(node, memberName, isStatic);
							},
							isPublicOrProtectedMember: node =>
							{	return this.#isPublicOrProtectedMember(node);
							}
						}
					);
				}
			}
		);
	}

	#getLink(node: DocNode|undefined, nodeSubIndex?: number, toDocDir='../')
	{	if (node)
		{	this.#nodesLinked.add(node);
		}
		return this.#collection.getLink(node, nodeSubIndex, toDocDir);
	}

	*genFiles(mainTitle: string, mainPageStart: string)
	{	// Module doc
		let code = mainPageStart;
		if (mainTitle)
		{	code += `# ${mdEscape(mainTitle)}\n\n`;
		}
		code += mdLink('Documentation Index', this.#docDirBasename+'/README.md')+'\n\n';
		const moduleDoc = this.#nodes.find(n => n.kind == 'moduleDoc');
		if (moduleDoc)
		{	code += this.#convertJsDoc(moduleDoc?.jsDoc, moduleDoc, '', 0, this.#docDirBasename+'/');
		}
		yield {dir: '', code};
		// Index
		code = '# Documentation index\n\n';
		code += mdLink('Top', '../'+this.#outFileBasename)+'\n\n';
		code += this.#convertNamespace(this.#nodes, '');
		yield {dir: this.#docDirBasename, code};
		// Symbols
		yield *this.#genFilesForNodes(this.#nodes, new Set);
	}

	*#genFilesForNodes(nodes: DocNode[], nodesDone: Set<DocNode>): Generator<{dir: string, code: string}>
	{	for (const node of nodes)
		{	if (node.kind != 'moduleDoc')
			{	if (!nodesDone.has(node) && this.#nodesLinked.has(node))
				{	nodesDone.add(node);
					const nodeToMd = this.#collection.getNodeToMd(node);
					const code = nodeToMd?.getCode(this.#importUrls) ?? '';
					const dir = path.join(this.#docDirBasename, this.#collection.getDir(node));
					yield {dir, code};
					if (node.kind == 'namespace')
					{	yield *this.#genFilesForNodes(node.namespaceDef.elements, nodesDone);
					}
				}
			}
		}
	}

	#convertNamespace(nodes: DocNode[], toDocDir='../')
	{	const isMain = nodes == this.#nodes;
		const namespaces = new Array<DocNodeNamespace>;
		const variables = new Array<DocNodeVariable>;
		const functions = new Array<DocNodeFunction>;
		const classes = new Array<DocNodeClass>;
		const types = new Array<DocNodeTypeAlias | DocNodeEnum | DocNodeInterface>;
		for (const node of nodes)
		{	switch (node.kind)
			{	case 'namespace':
					if (node.declarationKind!='private' && this.#isPublicOrProtectedMember(node) && (!isMain || isExportFromEntryPoint(node)))
					{	namespaces.push(node);
					}
					break;
				case 'variable':
					if (node.declarationKind!='private' && this.#isPublicOrProtectedMember(node) && (!isMain || isExportFromEntryPoint(node)))
					{	variables.push(node);
					}
					break;
				case 'function':
					if (node.declarationKind!='private' && this.#isPublicOrProtectedMember(node) && (!isMain || isExportFromEntryPoint(node)))
					{	functions.push(node);
					}
					break;
				case 'class':
					if (node.declarationKind!='private' && this.#isPublicOrProtectedMember(node) && (!isMain || isExportFromEntryPoint(node)))
					{	classes.push(node);
					}
					break;
				case 'enum':
				case 'typeAlias':
				case 'interface':
					if (node.declarationKind!='private' && this.#isPublicOrProtectedMember(node) && (!isMain || isExportFromEntryPoint(node)))
					{	types.push(node);
					}
			}
		}
		let code = '';
		code += mdGrid('Namespaces', namespaces.map(n => mdLink(n.name, this.#getLink(n, undefined, toDocDir))), INDEX_N_COLUMNS);
		code += mdGrid('Variables', variables.map(n => mdLink(n.name, this.#getLink(n, undefined, toDocDir))), INDEX_N_COLUMNS);
		code += mdGrid('Functions', functions.map(n => mdLink(n.name, this.#getLink(n, undefined, toDocDir))), INDEX_N_COLUMNS);
		code += mdGrid('Classes', classes.map(n => mdLink(n.name, this.#getLink(n, undefined, toDocDir))), INDEX_N_COLUMNS);
		code += mdGrid('Types', types.map(n => mdLink(n.name, this.#getLink(n, undefined, toDocDir))), INDEX_N_COLUMNS);
		return code;
	}

	#convertPropertyOrAccessor(icon: string, p: ClassPropertyDef|InterfacePropertyDef|LiteralPropertyDef|Accessor)
	{	if (!('getter' in p))
		{	const accessibility = 'accessibility' in p ? p.accessibility : undefined;
			const isAbstract = 'isAbstract' in p && p.isAbstract;
			const isStatic = 'isStatic' in p && p.isStatic;
			const isAccessor = 'isAccessor' in p && p.isAccessor;
			return this.#convertProperty(icon, p.name, isDeprecated(p), accessibility, isAbstract, isStatic, p.readonly, isAccessor ?? false, p.optional, p.tsType);
		}
		else if (p.getter && p.setter)
		{	const m = p.getter;
			const accessibility = 'accessibility' in m ? m.accessibility : undefined;
			const isAbstract = 'isAbstract' in m && m.isAbstract;
			const isStatic = 'isStatic' in m && m.isStatic;
			return this.#convertProperty(icon, m.name, isDeprecated(p), accessibility, isAbstract, isStatic, false, true, m.optional, 'functionDef' in m ? m.functionDef.returnType : m.returnType);
		}
		else
		{	const m = p.getter ?? p.setter;
			if (m)
			{	const accessibility = 'accessibility' in m ? m.accessibility : undefined;
				const isAbstract = 'isAbstract' in m && m.isAbstract;
				const isStatic = 'isStatic' in m && m.isStatic;
				return this.#convertFunction(icon, m.kind, m.name, isDeprecated(p), accessibility, isAbstract, isStatic, m.optional, 'functionDef' in m ? m.functionDef : m);
			}
		}
		return {text: '', beforeNamePos: 0, afterNamePos: 0};
	}

	#convertProperty(icon: string, name: string, isDeprecated: boolean, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, readonly: boolean|undefined, isAccessor: boolean, optional: boolean, tsType: TsTypeDef|undefined)
	{	let text = icon;
		if (isDeprecated)
		{	text += '`deprecated` ';
		}
		if (accessibility === 'protected')
		{	text += '`protected` ';
		}
		if (isAbstract)
		{	text += '`abstract` ';
		}
		if (isStatic)
		{	text += '`static` ';
		}
		if (readonly)
		{	text += '`readonly` ';
		}
		else if (isAccessor)
		{	text += '`accessor` ';
		}
		const beforeNamePos = text.length;
		text += mdEscape(name);
		const afterNamePos = text.length;
		if (optional)
		{	text += '?';
		}
		text += this.#convertTsTypeColon(tsType);
		return {text, beforeNamePos, afterNamePos};
	}

	#convertFunction(icon: string, isMethod: 'function'|'method'|'getter'|'setter', name: string, isDeprecated: boolean, accessibility: Accessibility|undefined, isAbstract: boolean, isStatic: boolean, optional: boolean, functionDef: FunctionDef|LiteralMethodDef)
	{	let text = icon;
		if (isDeprecated)
		{	text += '`deprecated` ';
		}
		if (accessibility === 'protected')
		{	text += '`protected` ';
		}
		if (isAbstract)
		{	text += '`abstract` ';
		}
		if (isStatic)
		{	text += '`static` ';
		}
		if (isMethod != 'method')
		{	text += isMethod=='getter' ? '`get` ' : isMethod=='setter' ? '`set` ' : '`function` ';
		}
		const beforeNamePos = text.length;
		text += mdEscape(name);
		const afterNamePos = text.length;
		if (optional)
		{	text += '?';
		}
		text += this.#convertTypeParams(functionDef.typeParams);
		text += '(' + functionDef.params.map(a => this.#convertArg(a)).join(', ') + ')';
		if (functionDef.returnType)
		{	text += this.#convertTsTypeColon(functionDef.returnType);
		}
		else
		{	const isAsync = 'isAsync' in functionDef && functionDef.isAsync;
			const isGenerator = 'isGenerator' in functionDef && functionDef.isGenerator;
			if (isAsync && isGenerator)
			{	text += ': AsyncGenerator<`unknown`>';
			}
			else if (isAsync)
			{	text += ': Promise<`unknown`>';
			}
			else if (isGenerator)
			{	text += ': Generator<`unknown`>';
			}
		}
		return {text, beforeNamePos, afterNamePos};
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
				return '`typeof` ' + this.#getTypeName(typeDef.typeQuery);
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
	{	const link = this.#getLink(this.#nodes[nodeIndex ?? -1], nodeSubIndex);
		if (link)
		{	return mdLink(typeName, link);
		}
		else
		{	return mdEscape(typeName);
		}
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
			code += this.#convertProperty('', p.name, false, undefined, false, false, p.readonly, false, p.optional, p.tsType).text;
			separ = ', ';
		}
		for (const p of methods)
		{	code += separ;
			code += this.#convertFunction('', p.kind, p.name, false, undefined, false, false, p.optional, p).text;
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

	#convertJsDoc(jsDoc: JsDoc|undefined, node: DocNode, headerId: string, submemberNo: number, toDocDir='../')
	{	let doc = jsDoc?.doc ?? '';
		const docTokens = jsDoc?.docTokens;
		if (docTokens)
		{	doc = '';
			let curLinkIsCode = false;
			let curNamepath = '';
			let isAfterLinkcode = false;
			let midEndline = '';
			for (let i=0, iEnd=docTokens.length; i<iEnd; i++)
			{	const {kind, text} = docTokens[i];
				switch (kind)
				{	case 'text':
						// Text
						if (text=='\n' || text=='\r\n') // '\n' between 2 links
						{	midEndline = text;
						}
						else
						{	isAfterLinkcode = false;
						}
						doc += text;
						break;
					case 'lineBreak':
						// New paragraph
						doc += '\n\n------\n\n';
						isAfterLinkcode = false;
						break;
					case 'linkText':
					case 'linkName':
						// Link text
						curNamepath += text;
						break;
					case 'link':
						if (text != '}')
						{	// Link open
							curNamepath = '';
							curLinkIsCode = text.startsWith('{@linkcode');
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
								{	let c;
									if (curLinkIsCode && doc.endsWith('\n') && (i+1==iEnd || (c = docTokens[i+1].text.charCodeAt(0))==C_CR || c==C_LF))
									{	const tsDecl = this.#collection.getTsDeclByNamepath(curNamepath, toDocDir, node);
										if (tsDecl)
										{	if (isAfterLinkcode)
											{	if (midEndline)
												{	doc = doc.slice(0, -midEndline.length);
													doc += '<br>';
													doc += midEndline;
												}
												else
												{	doc += '<br>';
												}
											}
											doc += tsDecl.trim();
											isAfterLinkcode = true;
											midEndline = '';
											break;
										}
									}
									linkText = curNamepath;
								}
								const link = this.#collection.getLinkByNamepath(curNamepath, toDocDir, node);
								doc += link ? mdLink(linkText, link, curLinkIsCode) : '`'+linkText+'`';
							}
						}
				}
			}
		}
		doc = doc.trim();
		if (doc)
		{	doc = indentAndWrap(doc, {indent: '', ignoreFirstIndent: true});
		}
		// Add tags
		if (jsDoc?.tags)
		{	let deprecated = '';
			let params = '';
			let returns = '';
			let submemberNo = 0;
			for (const tag of jsDoc.tags)
			{	switch (tag.kind)
				{	case 'default':
					{	doc = `Default value: \`${tag.value}\`` + (!doc ? '' : '\n\n'+doc);
						break;
					}
					case 'param':
					{	const paramDoc = this.#convertJsDoc(tag, node, headerId, ++submemberNo);
						if (paramDoc)
						{	params += `\n\n🎚️ Parameter **${mdEscape(tag.name)}**:\n\n${paramDoc}`;
						}
						break;
					}
					case 'return':
					{	returns = this.#convertJsDoc(tag, node, headerId, ++submemberNo);
						if (returns)
						{	returns = `\n\n✔️ Return value:\n\n${returns}`;
						}
						break;
					}
					case 'deprecated':
					{	const deprecatedDoc = this.#convertJsDoc(tag, node, headerId, ++submemberNo);
						if (deprecatedDoc)
						{	if (!deprecated)
							{	deprecated = '\n\n`deprecated`';
							}
							deprecated += '\n\n' + deprecatedDoc;
						}
						break;
					}
				}
			}
			const addDoc = params + returns + deprecated;
			if (addDoc)
			{	doc = !doc ? addDoc.trimStart() : doc+addDoc;
			}
		}
		// Convert examples and substitute importUrls
		if (!this.#baseDirUrlWithTrailingSlash || !doc)
		{	return doc;
		}
		const importUrl = getUrlForFilename(node.location.filename, this.#entryPointsDirs, this.#importUrls);
		let newDoc = '';
		let from = 0;
		let codeFrom = -1;
		let codeTag = '';
		let dir: string|undefined;
		RE_MD_CODEBLOCKS.lastIndex = 0;
		while (true)
		{	const m = RE_MD_CODEBLOCKS.exec(doc);
			if (!m)
			{	newDoc += doc.slice(from);
				return newDoc;
			}
			let [blockOpen, tag] = m;
			if (codeFrom < 0)
			{	// Opening codeblock
				codeFrom = RE_MD_CODEBLOCKS.lastIndex;
				if (!tag || blockOpen.trim()!=blockOpen)
				{	if (!tag)
					{	tag = 'ts';
					}
					newDoc += doc.slice(from, codeFrom-blockOpen.length);
					newDoc += '```';
					newDoc += tag;
					from = codeFrom;
				}
				codeTag = tag;
			}
			else
			{	// Closing codeblock
				if (tag)
				{	return doc; // error: "```tag" is used to close codeblock
				}
				if (codeTag.slice(0, 2).toLowerCase() == 'ts')
				{	// Substitute "To run this example:"
					RE_MD_CODEBLOCK_EXAMPLE.lastIndex = codeFrom;
					const m2 = RE_MD_CODEBLOCK_EXAMPLE.exec(doc);
					if (m2)
					{	const nextComments = m2[1];
						const pos = nextComments.indexOf(EXAMPLE);
						if (pos!=-1 && nextComments.indexOf('\n', pos+EXAMPLE.length)==-1)
						{	let lastCommentPos = nextComments.lastIndexOf('\n');
							if (lastCommentPos != -1)
							{	if (lastCommentPos>0 && nextComments.charAt(lastCommentPos-1)=='\r')
								{	lastCommentPos--;
								}
								if (dir == undefined)
								{	dir = this.#collection.getDir(node);
								}
								const start = doc.slice(codeFrom, doc.indexOf('//', codeFrom)+2);
								const exampleId = this.#getExampleId(dir, headerId, submemberNo);
								newDoc += doc.slice(from, codeFrom);
								newDoc += start;
								newDoc += ' To download and run this example:';
								newDoc += nextComments.slice(0, lastCommentPos);
								newDoc += start;
								newDoc += " curl '";
								newDoc += this.#baseDirUrlWithTrailingSlash;
								if (!dir)
								{	newDoc += this.#outFileBasename;
								}
								else
								{	newDoc += this.#docDirBasename;
									newDoc += '/';
									newDoc += dir;
									newDoc += '/README.md';
								}
								newDoc += "' | perl -ne '$y=$1 if /^```(.)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~<";
								newDoc += exampleId;
								newDoc += ">~)' > /tmp/";
								newDoc += exampleId;
								newDoc += ".ts";
								newDoc += nextComments.slice(lastCommentPos).replaceAll(EXAMPLE, `/tmp/${exampleId}.ts`);
								if (!importUrl)
								{	// No need to substitute imports in the codeblock
									from = RE_MD_CODEBLOCK_EXAMPLE.lastIndex;
								}
								else
								{	// Need to substitute imports in the codeblock, so go to comment end
									const lfPos = doc.indexOf('\n', RE_MD_CODEBLOCK_EXAMPLE.lastIndex);
									const newLinePos = lfPos==-1 ? doc.length : lfPos+1;
									newDoc += doc.slice(RE_MD_CODEBLOCK_EXAMPLE.lastIndex, newLinePos);
									from = codeFrom = newLinePos;
								}
							}
						}
					}
					// Substitute imports in the codeblock
					if (importUrl)
					{	const codeTo = RE_MD_CODEBLOCKS.lastIndex - blockOpen.length;
						const code = doc.slice(codeFrom, codeTo);
						let offset = codeFrom;
						const enum State
						{	StmtStart,
							StmtMid,
							AfterImport,
							AfterImportFrom,
						}
						let state = State.StmtStart;
						for (const token of jstok(code))
						{	const {text} = token;
							if (token.level == 0)
							{	switch (token.type)
								{	case JstokTokenType.COMMENT:
										break;
									case JstokTokenType.WHITESPACE:
										if (text.includes('\n'))
										{	state = State.StmtStart;
										}
										break;
									case JstokTokenType.OTHER:
										if (text == ';')
										{	state = State.StmtStart;
										}
										else if (state != State.AfterImport)
										{	state = State.StmtMid;
										}
										break;
									case JstokTokenType.IDENT:
										if (state==State.StmtStart && (text=='import' || text=='export'))
										{	state = State.AfterImport;
										}
										else if (state != State.AfterImport)
										{	state = State.StmtMid;
										}
										else if (text == 'from')
										{	state = State.AfterImportFrom;
										}
										break;
									case JstokTokenType.STRING:
										if (state == State.AfterImportFrom)
										{	const str = token.getValue();
											if (str.startsWith('./') || str.startsWith('../'))
											{	const subst = JSON.stringify(new URL(str, importUrl).href);
												newDoc += doc.slice(from, offset);
												newDoc += text.charAt(0)=="'" && !subst.includes('\\') ? "'"+subst.slice(1, -1)+"'" : subst;
												from = offset + text.length;
											}
										}
										state = State.StmtMid;
										break;
									case JstokTokenType.MORE_REQUEST:
										continue;
									default:
										if (state != State.AfterImport)
										{	state = State.StmtMid;
										}
								}
							}
							offset += text.length;
						}
					}
				}
				codeFrom = -1;
			}
		}
	}

	#getExampleId(dir: string, headerId: string, submemberNo: number)
	{	for (let i=1; true; i++)
		{	const hash = (crc32((i==1 ? dir : `${dir}-${i}`)+'#'+headerId) + submemberNo) % (36**4);
			if (!this.#examplesUsed.has(hash))
			{	this.#examplesUsed.add(hash);
				return 'example-' + hash.toString(36);
			}
		}
	}

	/**	Returns false if the given node has `private` modifier.
		Also returns false if this node has attached doc-comment that contains `@`private or `@`internal tag.
		Otherwise returns true.
	 **/
	#isPublicOrProtectedMember(node: object | {accessibility?: Accessibility, jsDoc?: JsDoc}): boolean
	{	if ('accessibility' in node && node.accessibility==='private')
		{	return false;
		}
		if ('jsDoc' in node)
		{	if ((node.jsDoc?.tags?.findIndex(v => v.kind=='private' || v.kind=='unsupported' && v.value=='@internal') ?? -1) != -1)
			{	return false;
			}
		}
		if ('nameNodeIndex' in node && node.nameNodeIndex!=undefined && typeof(node.nameNodeIndex)=='number')
		{	const refNode = this.#nodes[node.nameNodeIndex];
			return refNode.declarationKind!='private' && this.#isPublicOrProtectedMember(refNode) && isExportFromEntryPoint(refNode);
		}
		return true;
	}
}

function getUrlForFilename(filename: string, entryPointsDirs: string[], importUrls: string[])
{	const len = entryPointsDirs.length;
	if (importUrls.length == len)
	{	for (let i=0; i<len; i++)
		{	const e = entryPointsDirs[i];
			if (filename.startsWith(e))
			{	const relPath = filename.slice(filename.charAt(e.length)=='/' ? e.length+1 : e.length);
				return new URL(relPath, importUrls[i]);
			}
		}
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
