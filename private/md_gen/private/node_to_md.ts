import {Accessibility, JsDoc, ClassPropertyDef, ClassMethodDef, Location, ClassConstructorDef, ClassIndexSignatureDef, DocNodeClass, DocNodeInterface, InterfaceMethodDef, InterfacePropertyDef, LiteralMethodDef, LiteralPropertyDef, DocNodeTypeAlias, TypeAliasDef, DocNodeFunction, DocNodeVariable, VariableDef, DocNodeEnum, EnumMemberDef, DocNodeNamespace, NamespaceDef, DocNode, DocNodeKind, DecoratorDef} from '../../doc_node/mod.ts';
import {isDeprecated, mdBlockquote, mdEscape, mdLink, parseHeaderId} from './util.ts';

const RE_REMAP_LINKS = /\\.|`[^`]*`|``.*``|```.*```|(\[[^\]\\]*(?:\\.[^\]\\]*)*\]\()\.\.\/([^)]*\))/sg;

/**	Getter and/or setter for a given property - both in single object.
 **/
export type Accessor =
{	getter: ClassMethodDef|InterfaceMethodDef|LiteralMethodDef|undefined;
	setter: ClassMethodDef|InterfaceMethodDef|LiteralMethodDef|undefined;
	name: string;
	isStatic: boolean;
	isOverride: boolean;
	accessibility: Accessibility|undefined;
	location: Location|undefined;
	jsDoc: JsDoc|undefined;
};

type HeaderLine =
{	text: string;
	beforeNamePos: number;
	afterNamePos: number;
};

type ClassConverter =
{	onDecorators(m: DecoratorDef[]): string;
	onTopHeader(): string;
	onConstructor(m: ClassConstructorDef): HeaderLine;
	onIndexSignature(m: ClassIndexSignatureDef): HeaderLine;
	onProperty(m: ClassPropertyDef|InterfacePropertyDef|LiteralPropertyDef|Accessor): HeaderLine;
	onMethod(m: ClassMethodDef|InterfaceMethodDef|LiteralMethodDef|DocNodeFunction, isDestructor: boolean): HeaderLine;
	onEnumMember(m: EnumMemberDef): HeaderLine;
	onTypeAlias(m: TypeAliasDef): HeaderLine;
	onVariable(m: VariableDef): HeaderLine;
	onNamespace(m: NamespaceDef): string;
	onJsDoc(m: JsDoc|undefined, node: DocNode, headerId: string, submemberNo: number): string;
	onLink(node: DocNode, memberName: string, isStatic: boolean): string;
	isPublicOrProtectedMember(member: ClassConstructorDef|ClassMethodDef|InterfaceMethodDef|LiteralMethodDef|ClassPropertyDef|InterfacePropertyDef|LiteralPropertyDef): boolean;
};

type Member = ClassConstructorDef | ClassMethodDef | InterfaceMethodDef | LiteralMethodDef | ClassIndexSignatureDef | ClassPropertyDef | InterfacePropertyDef | LiteralPropertyDef | Accessor | EnumMemberDef;
type MemberHeader = {name: string, headerLine: string, beforeNamePos: number, afterNamePos: number, headerId: string};

const enum What
{	Constructor,
	Destructor,
	IndexSignature,
	PropertyOrAccessor,
	Method,
}

/**	Object that wraps {@link DocNode}. If the node is a class, interface, type alias or enum,
	this object indexes it's members, and allows to get header ids to create links to particular members.

	This object doesn't generate markdown by itself, but uses {@link ClassConverter} provided to it.

	When you create this object, it calls `onConstructor`, `onIndexSignature`, `onProperty`, `onMethod` and `onEnumMember`
	to generate typescript presentation for those members.

	Later, when you call {@link NodeToMd.getCode()}, it calls the rest of the callbacks.

	The usage pattern is to create `NodeToMd` wrappers on each {@link DocNode} first, so all the members are indexed.
	Then to start calling {@link NodeToMd.getCode()} on each object.
	It will call `onJsDoc` callback to convert node's documentation.
	The documentation may contain `@`link tags that will want to produce links to object members,
	so the `onJsDoc` callback can access the corresponding `NodeToMd` to call {@link NodeToMd.getHeaderId()}.
 **/
export class NodeToMd
{	#node;
	#heritageInfo;
	#converter;
	#constructors = new Array<ClassConstructorDef>;
	#destructors = new Array<ClassMethodDef|InterfaceMethodDef|LiteralMethodDef>;
	#indexSignatures = new Array<ClassIndexSignatureDef>;
	#propertiesAndAccessors = new Array<ClassPropertyDef|InterfacePropertyDef|LiteralPropertyDef|Accessor>;
	#methods = new Array<ClassMethodDef|InterfaceMethodDef|LiteralMethodDef>;
	#typeAlias: [] | [TypeAliasDef] = [];
	#other: [] | [DocNodeEnum|DocNodeFunction|DocNodeVariable|DocNodeNamespace] = [];
	#memberHeaders = new Map<Member, MemberHeader>;
	#memberHeadersByKey = new Map<string, MemberHeader>;

	constructor(node: DocNode, heritageInfo: string, converter: ClassConverter)
	{	this.#node = node;
		this.#heritageInfo = heritageInfo;
		this.#converter = converter;
		const {onConstructor, onMethod, onIndexSignature, onProperty, onEnumMember} = this.#converter;
		if (node.kind=='function' || node.kind=='variable' || node.kind=='namespace')
		{	this.#other[0] = node;
		}
		else if (node.kind == 'enum')
		{	this.#other[0] = node;
			for (const m of node.enumDef.members)
			{	this.#addHeader(m, m.name, false, onEnumMember(m));
			}
		}
		else if (node.kind=='class' || node.kind=='interface' || node.kind=='typeAlias')
		{	this.#getClassMembers
			(	node,
				this.#constructors,
				this.#destructors,
				this.#indexSignatures,
				this.#propertiesAndAccessors,
				this.#methods,
				this.#typeAlias,
			);
			// constructors
			for (const m of this.#constructors)
			{	this.#addHeader(m, m.name, false, onConstructor(m));
			}
			// destructors
			for (const m of this.#destructors)
			{	this.#addHeader(m, m.name, false, onMethod(m, true));
			}
			// index signatures
			for (const m of this.#indexSignatures)
			{	this.#addHeader(m, '', false, onIndexSignature(m));
			}
			// properties
			for (const m of this.#propertiesAndAccessors)
			{	this.#addHeader(m, m.name, 'isStatic' in m && m.isStatic, onProperty(m));
			}
			// methods
			for (const m of this.#methods)
			{	this.#addHeader(m, m.name, 'isStatic' in m && m.isStatic, onMethod(m, false));
			}
		}
	}

	#addHeader(m: Member, name: string, isStatic: boolean, headerLine: HeaderLine)
	{	const {text, beforeNamePos, afterNamePos} = headerLine;
		const memberHeader = {name, headerLine: text, beforeNamePos, afterNamePos, headerId: parseHeaderId(text)};
		this.#memberHeaders.set(m, memberHeader);
		const key = getMemberKey(name, isStatic);
		this.#memberHeadersByKey.set(key, memberHeader);
	}

	getHeaderId(memberName?: string, isStatic=false)
	{	return this.#getMemberHeader(memberName, isStatic)?.headerId ?? '';
	}

	getTsDecl(memberName?: string, isStatic=false, toDocDir='../')
	{	let code = '';
		if (memberName)
		{	// Asked declaration of object member
			const header = this.#getMemberHeader(memberName, isStatic);
			code = this.#getMemberHeaderAsLink(header, memberName, isStatic, true);
		}
		else
		{	// Asked declaration of the whole object
			const memberHeaders = this.#memberHeaders;
			const other = this.#other[0];
			if (other)
			{	switch (other.kind)
				{	case 'enum':
					{	const {enumDef} = other;
						code = enumDef.isConst ? '`const` `enum` ' : '`enum` ';
						code += mdEscape(other.name);
						code += '<br>\n{<br>\n';
						for (const m of other.enumDef.members)
						{	const memberCode = this.#getMemberHeaderAsLink(memberHeaders.get(m), m.name, false);
							if (memberCode)
							{	code += `&nbsp; &nbsp; ${memberCode}<br>\n`;
							}
						}
						code += '}';
						break;
					}
					case 'namespace':
					{	code = this.#converter.onNamespace(other.namespaceDef);
						break;
					}
					case 'function':
					{	code = this.#headerLineOfSelfToLink(this.#converter.onMethod(other, false));
						break;
					}
					case 'variable':
					{	code = this.#headerLineOfSelfToLink(this.#converter.onVariable(other.variableDef));
						break;
					}
				}
			}
			else if (this.#typeAlias.length)
			{	code = this.#headerLineOfSelfToLink(this.#converter.onTypeAlias(this.#typeAlias[0]));
			}
			else
			{	code = this.#converter.onTopHeader();
				if (this.#node.kind == 'typeAlias')
				{	code += ' =';
				}
				code += '<br>\n{<br>\n';
				// constructors
				for (const m of this.#constructors)
				{	if (!isDeprecated(m))
					{	const memberCode = this.#getMemberHeaderAsLink(memberHeaders.get(m), m.name, false);
						if (memberCode)
						{	code += `&nbsp; &nbsp; ${memberCode}<br>\n`;
						}
					}
				}
				// destructors
				for (const m of this.#destructors)
				{	if (!isDeprecated(m))
					{	const memberCode = this.#getMemberHeaderAsLink(memberHeaders.get(m), m.name, false);
						if (memberCode)
						{	code += `&nbsp; &nbsp; ${memberCode}<br>\n`;
						}
					}
				}
				// index signatures
				for (const m of this.#indexSignatures)
				{	const headerLine = memberHeaders.get(m)?.headerLine;
					if (headerLine)
					{	code += `&nbsp; &nbsp; ${headerLine}<br>\n`;
					}
				}
				// properties
				for (const m of this.#propertiesAndAccessors)
				{	if (!isDeprecated(m))
					{	const memberCode = this.#getMemberHeaderAsLink(memberHeaders.get(m), m.name, 'isStatic' in m && m.isStatic);
						if (memberCode)
						{	code += `&nbsp; &nbsp; ${memberCode}<br>\n`;
						}
					}
				}
				// methods
				for (const m of this.#methods)
				{	if (!isDeprecated(m))
					{	const memberCode = this.#getMemberHeaderAsLink(memberHeaders.get(m), m.name, 'isStatic' in m && m.isStatic);
						if (memberCode)
						{	code += `&nbsp; &nbsp; ${memberCode}<br>\n`;
						}
					}
				}
				code += '}';
			}
		}
		code = mdBlockquote(code);
		code = remapLinks(code, toDocDir);
		return code;
	}

	#headerLineOfSelfToLink(headerLine: HeaderLine)
	{	const {text, beforeNamePos, afterNamePos} = headerLine;
		return this.#getMemberHeaderAsLink({name: this.#node.name, headerLine: text, beforeNamePos, afterNamePos, headerId: ''}, '', false);
	}

	#getMemberHeaderAsLink(header: MemberHeader|undefined, memberName: string, isStatic: boolean, withNodeNamePrefix=false)
	{	if (header)
		{	const {name, headerLine, beforeNamePos, afterNamePos} = header;
			if (headerLine)
			{	if (afterNamePos == beforeNamePos)
				{	return headerLine;
				}
				const memberLink = this.#converter.onLink(this.#node, memberName, isStatic);
				let code = headerLine.slice(0, beforeNamePos);
				if (withNodeNamePrefix)
				{	code += this.#node.name;
					code += '.';
				}
				if (memberLink)
				{	code += mdLink(name, memberLink);
					code += headerLine.slice(afterNamePos);
				}
				else
				{	code += headerLine.slice(beforeNamePos);
				}
				return code;
			}
		}
		return '';
	}

	#getMemberHeader(memberName?: string, isStatic=false)
	{	if (memberName)
		{	const key = getMemberKey(memberName, isStatic);
			return this.#memberHeadersByKey.get(key);
		}
	}

	getCode(importUrls: string[])
	{	const {onDecorators, onTopHeader, onMethod, onTypeAlias, onVariable, onNamespace, onJsDoc} = this.#converter;
		const memberHeaders = this.#memberHeaders;
		let outline = '';
		let sectionsCode = '';
		let declBeforeDoc = false;
		if (this.#other.length)
		{	const other = this.#other[0];
			switch (other.kind)
			{	case 'enum':
					for (const m of other.enumDef.members)
					{	const memberHeader = memberHeaders.get(m);
						const code = mdBlockquote(onJsDoc(m.jsDoc, this.#node, memberHeader?.headerId ?? '', 0));
						sectionsCode += `#### ${memberHeader?.headerLine ?? ''}\n\n${code}\n\n`;
					}
					break;
				case 'function':
					sectionsCode = onMethod(other, false).text + '\n\n';
					declBeforeDoc = true;
					break;
				case 'variable':
					sectionsCode = onVariable(other.variableDef).text + '\n\n';
					declBeforeDoc = true;
					break;
				case 'namespace':
					sectionsCode = onNamespace(other.namespaceDef);
					break;
			}
		}
		else if (this.#typeAlias.length)
		{	sectionsCode = onTypeAlias(this.#typeAlias[0]).text;
		}
		else
		{	const sections = new ClassSections(this.#node.kind);
			// constructors
			for (const m of this.#constructors)
			{	const memberHeader = memberHeaders.get(m);
				sections.add(sectionIndex(m), What.Constructor, memberHeader, mdBlockquote(onJsDoc(m.jsDoc, this.#node, memberHeader?.headerId ?? '', 0)));
			}
			// destructors
			for (const m of this.#destructors)
			{	const memberHeader = memberHeaders.get(m);
				sections.add(sectionIndex(m), What.Destructor, memberHeader, mdBlockquote(onJsDoc(m.jsDoc, this.#node, memberHeader?.headerId ?? '', 0)));
			}
			// index signatures
			for (const m of this.#indexSignatures)
			{	const memberHeader = memberHeaders.get(m);
				sections.add(sectionIndex(m), What.IndexSignature, memberHeader, '');
			}
			// properties
			for (const m of this.#propertiesAndAccessors)
			{	const memberHeader = memberHeaders.get(m);
				let code = '';
				const getCode = 'getter' in m && m.getter && m.getter.jsDoc && onJsDoc(m.getter.jsDoc, this.#node, memberHeader?.headerId ?? '', 0);
				const setCode = 'setter' in m && m.setter && m.setter.jsDoc && onJsDoc(m.setter.jsDoc, this.#node, memberHeader?.headerId ?? '', 1);
				if (getCode && setCode)
				{	code += mdBlockquote('`get`\n\n'+getCode)+mdBlockquote('`set`\n\n'+setCode);
				}
				else
				{	let getOrSetCode = getCode || setCode;
					if (!getOrSetCode)
					{	getOrSetCode = onJsDoc(m.jsDoc, this.#node, memberHeader?.headerId ?? '', 0);
					}
					if (getOrSetCode)
					{	code +=  mdBlockquote(getOrSetCode);
					}
				}
				sections.add(sectionIndex(m), What.PropertyOrAccessor, memberHeader, code);
			}
			// methods
			for (const m of this.#methods)
			{	const memberHeader = memberHeaders.get(m);
				sections.add(sectionIndex(m), What.Method, memberHeader,  mdBlockquote(onJsDoc(m.jsDoc, this.#node, memberHeader?.headerId ?? '', 0)));
			}
			// done
			sectionsCode = sections+'';
			outline = sections.getOutline(this.#heritageInfo);
		}
		const decorators = this.#node.kind=='class' && this.#node.classDef.decorators ? onDecorators(this.#node.classDef.decorators) : '';
		const topHeader = onTopHeader();
		const index = mdLink('Documentation Index', '../README.md')+'\n\n';
		const jsDoc = onJsDoc(this.#node.jsDoc, this.#node, '', 0);
		const jsDocFull = !jsDoc ? '' : jsDoc+'\n\n';
		const importCode = getImportCode(this.#node, importUrls);
		if (!declBeforeDoc)
		{	return decorators + '# ' + topHeader + '\n\n' + index + importCode + jsDocFull + outline + sectionsCode;
		}
		else
		{	return decorators + '# ' + topHeader + '\n\n' + index + importCode + sectionsCode + jsDocFull + outline;
		}
	}

	#getClassMembers
	(	node: DocNodeClass|DocNodeInterface|DocNodeTypeAlias,
		constructors: ClassConstructorDef[],
		destructors: Array<ClassMethodDef|InterfaceMethodDef|LiteralMethodDef>,
		indexSignatures: ClassIndexSignatureDef[],
		propertiesAndAccessors: Array<ClassPropertyDef|InterfacePropertyDef|LiteralPropertyDef|Accessor>,
		methods: Array<ClassMethodDef|InterfaceMethodDef|LiteralMethodDef>,
		typeAlias: [] | [TypeAliasDef],
	)
	{	const settersOnly = new Array<ClassMethodDef|InterfaceMethodDef|LiteralMethodDef>;
		const typeAliasDef = 'typeAliasDef' in node ? node.typeAliasDef : undefined;
		let tsType = typeAliasDef?.tsType;
		while (tsType?.kind === 'parenthesized')
		{	tsType = tsType.parenthesized;
		}
		const def = 'classDef' in node ? node.classDef : 'interfaceDef' in node ? node.interfaceDef : tsType && 'typeLiteral' in tsType ? tsType.typeLiteral : undefined;
		if (def)
		{	// Resort `def.methods` to `methods` (regular methods), `accessors` (properties that have a getter, and maybe setter), and `settersOnly`
			const isPublicOrProtectedMember = this.#converter.isPublicOrProtectedMember;
			const methodsByName = new Map<string, LiteralMethodDef|InterfaceMethodDef|ClassMethodDef>;
			for (let methodsAndAccessors=def.methods, i=0; i<methodsAndAccessors.length; i++)
			{	const m = methodsAndAccessors[i];
				if (isPublicOrProtectedMember(m))
				{	const isStatic = 'isStatic' in m && m.isStatic;
					const isOverride = 'isOverride' in m && m.isOverride || false;
					const accessibility = 'accessibility' in m ? m.accessibility : undefined;
					switch (m.kind)
					{	case 'method':
						{	if (!isStatic && accessibility!=='protected' && (m.name=='[Symbol.dispose]' || m.name=='[Symbol.asyncDispose]'))
							{	destructors.push(m);
							}
							else
							{	const cur = methodsByName.get(m.name);
								if (!cur)
								{	methodsByName.set(m.name, m);
									methods.push(m);
								}
								else if (!('functionDef' in m) || !('hasBody' in m.functionDef) || !m.functionDef.hasBody)
								{	methods.push(m);
								}
								else if (m.jsDoc && !cur.jsDoc)
								{	cur.jsDoc = m.jsDoc;
								}
							}
							break;
						}
						case 'getter':
						{	const accessor: Accessor =
							{	getter: m,
								setter: undefined,
								name: m.name,
								isStatic,
								isOverride,
								accessibility,
								location: 'location' in m ? m.location : undefined,
								jsDoc: m.jsDoc,
							};
							const j = methodsAndAccessors.findIndex(s => s.kind=='setter' && s.name==m.name && ('isStatic' in s && s.isStatic)==isStatic);
							propertiesAndAccessors.push(accessor);
							if (j != -1)
							{	const setter = methodsAndAccessors[j];
								accessor.setter = setter;
								if (!accessor.jsDoc)
								{	accessor.jsDoc = setter.jsDoc;
								}
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
			// Add `settersOnly` and `def.properties` to propertiesAndAccessors
			for (const m of settersOnly)
			{	const isStatic = 'isStatic' in m && m.isStatic;
				const isOverride = 'isOverride' in m && m.isOverride || false;
				const accessibility = 'accessibility' in m ? m.accessibility : undefined;
				propertiesAndAccessors.push
				(	{	getter: undefined,
						setter: m,
						name: m.name,
						isStatic,
						isOverride,
						accessibility,
						location: 'location' in m ? m.location : undefined,
						jsDoc: m.jsDoc,
					}
				);
			}
			for (const p of def.properties)
			{	if (isPublicOrProtectedMember(p))
				{	propertiesAndAccessors.push(p);
				}
			}
			// Add `def.constructors` to `constructors`
			// Also add class members declared in constructor arguments (like `constructor(public memb=1) {}`) to `propertiesAndAccessors`
			if ('classDef' in node)
			{	for (const c of node.classDef.constructors)
				{	if (isPublicOrProtectedMember(c))
					{	constructors.push(c);
					}
				}
			}
			// Sort `propertiesAndAccessors`
			propertiesAndAccessors.sort
			(	(a, b) =>
				{	const aLocation = 'location' in a ? a.location : undefined;
					const aFilename = aLocation?.filename ?? '';
					const aLine = aLocation?.line ?? 0;
					const bLocation = 'location' in b ? b.location : undefined;
					const bFilename = bLocation?.filename ?? '';
					const bLine = bLocation?.line ?? 0;
					return aFilename < bFilename ? -1 : aFilename > bFilename ? +1 : aLine - bLine;
				}
			);
			// Add `classDef.indexSignatures` to `indexSignatures`
			for (const m of def.indexSignatures)
			{	indexSignatures.push(m);
			}
		}
		else if (typeAliasDef)
		{	typeAlias[0] = typeAliasDef;
		}
	}
}

function getImportCode(node: DocNode, importUrls: string[])
{	let code = '';
	if (node.declarationKind != 'private')
	{	// Find shortest export URL, assuming this is the module root
		let {name, location: {filename, entryPointNumber}} = node.exports?.filter(e => e.location.entryPointNumber != undefined).sort((a, b) => a.location.filename.length - b.location.filename.length)[0] ?? node;
		if (entryPointNumber != undefined)
		{	if (importUrls.length)
			{	filename = importUrls[entryPointNumber];
			}
			if (importUrls.length || !filename.startsWith('file://'))
			{	code += '```ts\n';
				code += `import {${name}} from ` + JSON.stringify(filename);
				code += '\n```\n\n';
			}
		}
	}
	return code;
}

function getMemberKey(name: string, isStatic=false)
{	return isStatic ? '.'+name : name;
}

function remapLinks(code: string, toDocDir: string)
{	if (toDocDir != '../')
	{	code = code.replace
		(	RE_REMAP_LINKS,
			(all, before, after) => !before ? all : before+toDocDir+after
		);
	}
	return code;
}

class ClassSections
{	#sections =
	[	'', // public static
		'', // protected static
		'', // deprecated public static
		'', // deprecated protected static
		'', // public
		'', // protected
		'', // deprecated public
		'', // deprecated protected
	];

	#propertiesPublicStatic = new Array<MemberHeader>;
	#methodsPublicStatic = new Array<MemberHeader>;
	#propertiesProtectedStatic = new Array<MemberHeader>;
	#methodsProtectedStatic = new Array<MemberHeader>;
	#staticDeprecated = new Array<MemberHeader>;
	#constructors = new Array<MemberHeader>;
	#destructors = new Array<MemberHeader>;
	#indexSignatures = new Array<MemberHeader>;
	#protectedConstructors = new Array<MemberHeader>;
	#propertiesPublic = new Array<MemberHeader>;
	#methodsPublic = new Array<MemberHeader>;
	#propertiesProtected = new Array<MemberHeader>;
	#methodsProtected = new Array<MemberHeader>;
	#deprecated = new Array<MemberHeader>;

	#kind;

	constructor(kind: DocNodeKind)
	{	this.#kind = kind;
	}

	add(sectionIndex: number, what: What, memberHeader: MemberHeader|undefined, code: string)
	{	// Section
		this.#sections[sectionIndex] += `#### ${memberHeader?.headerLine ?? ''}\n\n${code}\n\n`;
		// Outline
		if (memberHeader)
		{	if (sectionIndex==2 || sectionIndex==3)
			{	this.#staticDeprecated.push(memberHeader);
			}
			else if (sectionIndex >= 6)
			{	this.#deprecated.push(memberHeader);
			}
			else if (what==What.Constructor && sectionIndex==5)
			{	this.#protectedConstructors.push(memberHeader);
			}
			else if (what == What.Constructor)
			{	this.#constructors.push(memberHeader);
			}
			else if (what == What.Destructor)
			{	this.#destructors.push(memberHeader);
			}
			else if (what == What.IndexSignature)
			{	this.#indexSignatures.push(memberHeader);
			}
			else if (what == What.PropertyOrAccessor)
			{	(sectionIndex==0 ? this.#propertiesPublicStatic : sectionIndex==1 ? this.#propertiesProtectedStatic : sectionIndex==5 ? this.#propertiesProtected : this.#propertiesPublic).push(memberHeader);
			}
			else if (what == What.Method)
			{	(sectionIndex==0 ? this.#methodsPublicStatic : sectionIndex==1 ? this.#methodsProtectedStatic : sectionIndex==5 ? this.#methodsProtected : this.#methodsPublic).push(memberHeader);
			}
		}
	}

	toString()
	{	const sections = this.#sections;
		const codeStat = sections[0] + sections[1]; // public static + protected static
		const codeStatDepr = sections[2] + sections[3]; // deprecated public static + deprecated protected static
		const codeInst = sections[4] + sections[5]; // public + protected
		const codeInstDepr = sections[6] + sections[7]; // deprecated public + deprecated protected
		let code = '';
		if (codeStat.length+codeStatDepr.length != 0)
		{	code += '## Static members\n\n';
			code += codeStat;
			if (codeStatDepr)
			{	code += '<div style="opacity:0.6">\n\n';
				code += codeStatDepr;
				code += '</div>\n\n';
			}
			code += '## Instance members\n\n';
		}
		code += codeInst;
		if (codeInstDepr)
		{	code += '<div style="opacity:0.6">\n\n';
			code += codeInstDepr;
			code += '</div>\n\n';
		}
		return code;
	}

	getOutline(superInfo: string)
	{	let code = '';
		// static properties
		code += this.#genMemberOutline(this.#propertiesPublicStatic, 'static property', 'static properties', false);
		// static methods
		code += this.#genMemberOutline(this.#methodsPublicStatic, 'static method', 'static methods', false);
		// protected static properties
		code += this.#genMemberOutline(this.#propertiesProtectedStatic, 'protected static property', 'protected static properties', false);
		// protected static methods
		code += this.#genMemberOutline(this.#methodsProtectedStatic, 'protected static method', 'protected static methods', false);
		// static deprecated
		code += this.#genMemberOutline(this.#staticDeprecated, 'static deprecated symbol', 'static deprecated symbols', true);
		// constructors
		code += this.#genMemberOutline(this.#constructors, 'constructor', 'constructors', true);
		// destructors
		code += this.#genMemberOutline(this.#destructors, 'destructor', 'destructors', true);
		// index signatures
		code += this.#genMemberOutline(this.#indexSignatures, 'index signature', 'index signatures', true);
		// protected constructors
		code += this.#genMemberOutline(this.#protectedConstructors, 'protected constructor', 'protected constructors', true);
		// properties
		code += this.#genMemberOutline(this.#propertiesPublic, 'property', 'properties', false);
		// methods
		code += this.#genMemberOutline(this.#methodsPublic, 'method', 'methods', false);
		// protected properties
		code += this.#genMemberOutline(this.#propertiesProtected, 'protected property', 'protected properties', false);
		// protected methods
		code += this.#genMemberOutline(this.#methodsProtected, 'protected method', 'protected methods', false);
		// deprecated
		code += this.#genMemberOutline(this.#deprecated, 'deprecated symbol', 'deprecated symbols', true);
		// super
		if (superInfo)
		{	code += '- ' + superInfo + '\n';
		}
		// done
		if (code)
		{	code = `## This ${this.#kind=='typeAlias' ? 'type' : this.#kind} has\n\n${code}\n\n`;
		}
		return code;
	}

	#genMemberOutline(memberHeader: MemberHeader[], titleSingular: string, titlePlural: string, numberOnly: boolean)
	{	let code = '';
		if (memberHeader.length > 0)
		{	if (!numberOnly)
			{	if (memberHeader.length == 1)
				{	const p = memberHeader[0];
					code += `- ${titleSingular} ${!p.headerId ? p.name : mdLink(p.name, '#'+p.headerId)}`;
				}
				else
				{	code += `- ${memberHeader.length} ${titlePlural}:\n`;
					code += memberHeader.map(p => !p.headerId ? p.name : mdLink(p.name, '#'+p.headerId)).join(',\n');
				}
			}
			else
			{	const title = memberHeader.length==1 ? titleSingular : memberHeader.length+' '+titlePlural;
				const p = memberHeader[0];
				code += '- ' + (!p.headerId ? title : mdLink(title, '#'+p.headerId));
			}
			code += '\n';
		}
		return code;
	}
}

function sectionIndex(node: Member)
{	let i = 0;
	if (!('isStatic' in node && node.isStatic))
	{	i |= 4;
	}
	if (isDeprecated(node))
	{	i |= 2;
	}
	if ('accessibility' in node && node.accessibility==='protected')
	{	i |= 1;
	}
	return i;
}
