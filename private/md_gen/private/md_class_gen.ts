import {Accessibility, JsDoc, ClassPropertyDef, ClassMethodDef, Location, ClassConstructorDef, ClassIndexSignatureDef, DocNodeClass, DocNodeInterface, InterfaceMethodDef, InterfacePropertyDef, LiteralMethodDef, LiteralPropertyDef, DocNodeTypeAlias, TypeAliasDef, DocNodeFunction, DocNodeVariable, VariableDef, DocNodeEnum, EnumMemberDef, DocNodeNamespace, NamespaceDef} from '../../doc_node/mod.ts';

const RE_HEADER_SAN = /([ ]|[\p{Letter}\p{Number}_]+)|\\.|<\/?\w+(?:[^"'>]+|"[^"]*"|'[^']*')*>|\[([^\]\r\n]+)\]\([^)\r\n]+\)/sug;

export type Accessor =
{	getter: ClassMethodDef|InterfaceMethodDef|LiteralMethodDef|undefined;
	setter: ClassMethodDef|InterfaceMethodDef|LiteralMethodDef|undefined;
	name: string;
	isStatic: boolean;
	accessibility: Accessibility|undefined;
	location: Location|undefined;
	jsDoc: JsDoc|undefined;
};

type ClassConverter =
{	onConstructorDecl(m: ClassConstructorDef): string;
	onIndexSignatureDecl(m: ClassIndexSignatureDef): string;
	onPropertyDecl(m: ClassPropertyDef|InterfacePropertyDef|LiteralPropertyDef|Accessor): string;
	onMethodDecl(m: ClassMethodDef|InterfaceMethodDef|LiteralMethodDef|DocNodeFunction): string;
	onTypeAlias(m: TypeAliasDef): string;
	onEnumMember(m: EnumMemberDef): string;
	onVariable(m: VariableDef): string;
	onNamespace(m: NamespaceDef): string;
	onJsDoc(m: JsDoc|undefined): string;
};

type Member = ClassConstructorDef | ClassMethodDef | InterfaceMethodDef | LiteralMethodDef | ClassIndexSignatureDef | ClassPropertyDef | InterfacePropertyDef | LiteralPropertyDef | Accessor | EnumMemberDef;
type MemberHeader = {name: string, headerLine: string, headerId: string};

export function isPublicOrProtected(node: object | {accessibility?: Accessibility, jsDoc?: JsDoc})
{	if ('accessibility' in node && node.accessibility==='private')
	{	return false;
	}
	if ('jsDoc' in node)
	{	return (node.jsDoc?.tags?.findIndex(v => v.kind == 'private') ?? -1) == -1;
	}
	return true;
}

export function isDeprecated(node: object | {jsDoc?: JsDoc})
{	return ('jsDoc' in node ? node.jsDoc : undefined)?.tags?.find(t => t.kind == 'deprecated') != undefined;
}

const enum What
{	Constructor,
	Destructor,
	IndexSignature,
	PropertyOrAccessor,
	Method,
}

export class MdClassGen
{	#kind;
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

	constructor(node: DocNodeClass|DocNodeInterface|DocNodeTypeAlias|DocNodeEnum|DocNodeFunction|DocNodeVariable|DocNodeNamespace, converter: ClassConverter)
	{	this.#kind = node.kind;
		this.#converter = converter;
		const {onConstructorDecl, onMethodDecl, onIndexSignatureDecl, onPropertyDecl, onEnumMember} = this.#converter;
		if (node.kind=='function' || node.kind=='variable' || node.kind=='namespace')
		{	this.#other[0] = node;
		}
		else if (node.kind == 'enum')
		{	this.#other[0] = node;
			for (const m of node.enumDef.members)
			{	this.#addHeader(m, m.name, false, onEnumMember(m));
			}
		}
		else
		{	getClassMembers
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
			{	this.#addHeader(m, m.name, false, onConstructorDecl(m));
			}
			// destructors
			for (const m of this.#destructors)
			{	this.#addHeader(m, m.name, false, onMethodDecl(m));
			}
			// index signatures
			for (const m of this.#indexSignatures)
			{	this.#addHeader(m, '', false, onIndexSignatureDecl(m));
			}
			// properties
			for (const m of this.#propertiesAndAccessors)
			{	this.#addHeader(m, m.name, 'isStatic' in m && m.isStatic, onPropertyDecl(m));
			}
			// methods
			for (const m of this.#methods)
			{	this.#addHeader(m, m.name, 'isStatic' in m && m.isStatic, onMethodDecl(m));
			}
		}
	}

	#addHeader(m: Member, name: string, isStatic: boolean, headerLine: string)
	{	const memberHeader = {name, headerLine, headerId: parseHeaderId(headerLine)};
		this.#memberHeaders.set(m, memberHeader);
		const key = getMemberKey(name, isStatic);
		this.#memberHeadersByKey.set(key, memberHeader);
	}

	getHeaderId(name?: string, isStatic=false)
	{	if (!name)
		{	return '';
		}
		const key = getMemberKey(name, isStatic);
		return this.#memberHeadersByKey.get(key)?.headerId ?? '';
	}

	getCode()
	{	const {onMethodDecl, onTypeAlias, onVariable, onNamespace, onJsDoc} = this.#converter;
		const memberHeaders = this.#memberHeaders;
		if (this.#other.length)
		{	const other = this.#other[0];
			let sectionsCode = '';
			switch (other.kind)
			{	case 'enum':
					for (const m of other.enumDef.members)
					{	const memberHeader = memberHeaders.get(m);
						const code = onJsDoc(m.jsDoc);
						sectionsCode += `#### ${memberHeader?.headerLine ?? ''}\n\n${code}\n\n`;
					}
					break;
				case 'function':
					sectionsCode = onMethodDecl(other);
					break;
				case 'variable':
					sectionsCode = onVariable(other.variableDef);
					break;
				case 'namespace':
					sectionsCode = onNamespace(other.namespaceDef);
					break;
			}
			return {outline: '', sectionsCode};
		}
		else if (this.#typeAlias.length)
		{	const sectionsCode = onTypeAlias(this.#typeAlias[0]);
			return {outline: '', sectionsCode};
		}
		else
		{	const sections = new ClassSections(this.#kind);
			// constructors
			for (const m of this.#constructors)
			{	sections.add(sectionIndex(m), What.Constructor, memberHeaders.get(m), onJsDoc(m.jsDoc));
			}
			// destructors
			for (const m of this.#destructors)
			{	sections.add(sectionIndex(m), What.Destructor, memberHeaders.get(m), onJsDoc('jsDoc' in m ? m.jsDoc : undefined));
			}
			// index signatures
			for (const m of this.#indexSignatures)
			{	sections.add(sectionIndex(m), What.IndexSignature, memberHeaders.get(m), '');
			}
			// properties
			for (const m of this.#propertiesAndAccessors)
			{	let code = '';
				if ('getter' in m && m.getter && m.setter && 'jsDoc' in m.getter && 'jsDoc' in m.setter && m.getter.jsDoc && m.setter.jsDoc)
				{	code += 'get\n\n';
					code += onJsDoc(m.getter.jsDoc);
					code += 'set\n\n';
					code += onJsDoc(m.setter.jsDoc);
				}
				else
				{	code += onJsDoc('jsDoc' in m ? m.jsDoc : undefined);
				}
				sections.add(sectionIndex(m), What.PropertyOrAccessor, memberHeaders.get(m), code);
			}
			// methods
			for (const m of this.#methods)
			{	sections.add(sectionIndex(m), What.Method, memberHeaders.get(m), onJsDoc('jsDoc' in m ? m.jsDoc : undefined));
			}
			// done
			const sectionsCode = sections+'';
			const outline = sections.getOutline();
			return {outline, sectionsCode};
		}
	}
}

function getMemberKey(name: string, isStatic=false)
{	return isStatic ? '.'+name : name;
}

function getClassMembers
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
		for (let methodsAndAccessors=def.methods, i=0; i<methodsAndAccessors.length; i++)
		{	const m = methodsAndAccessors[i];
			if (isPublicOrProtected(m))
			{	const isStatic = 'isStatic' in m && m.isStatic;
				const accessibility = 'accessibility' in m ? m.accessibility : undefined;
				switch (m.kind)
				{	case 'method':
					{	if (!isStatic && accessibility!=='protected' && (m.name=='[Symbol.dispose]' || m.name=='[Symbol.asyncDispose]'))
						{	destructors.push(m);
						}
						else
						{	methods.push(m);
						}
						break;
					}
					case 'getter':
					{	const accessor: Accessor =
						{	getter: m,
							setter: undefined,
							name: m.name,
							isStatic,
							accessibility,
							location: 'location' in m ? m.location : undefined,
							jsDoc: 'jsDoc' in m ? m.jsDoc : undefined,
						};
						const j = methodsAndAccessors.findIndex(s => s.kind=='setter' && s.name==m.name && ('isStatic' in s && s.isStatic)==isStatic);
						if (j != -1)
						{	const setter = methodsAndAccessors[j];
							accessor.setter = setter;
							if (!accessor.jsDoc)
							{	accessor.jsDoc = 'jsDoc' in setter ? setter.jsDoc : undefined;
							}
							propertiesAndAccessors.push(accessor);
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
			const accessibility = 'accessibility' in m ? m.accessibility : undefined;
			propertiesAndAccessors.push
			(	{	getter: undefined,
					setter: m,
					name: m.name,
					isStatic,
					accessibility,
					location: 'location' in m ? m.location : undefined,
					jsDoc: 'jsDoc' in m ? m.jsDoc : undefined,
				}
			);
		}
		for (const p of def.properties)
		{	if (isPublicOrProtected(p))
			{	propertiesAndAccessors.push(p);
			}
		}
		// Add `def.constructors` to `constructors`
		// Also add class members declared in constructor arguments (like `constructor(public memb=1) {}`) to `propertiesAndAccessors`
		if ('classDef' in node)
		{	for (const c of node.classDef.constructors)
			{	if (isPublicOrProtected(c))
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

	constructor(kind: 'class'|'interface'|'typeAlias'|'enum'|'function'|'variable'|'namespace')
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

	getOutline()
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
		// done
		return code ? `This ${this.#kind=='typeAlias' ? 'type' : this.#kind} has:\n${code}\n\n` : '';
	}

	#genMemberOutline(memberHeader: MemberHeader[], titleSingular: string, titlePlural: string, numberOnly: boolean)
	{	let code = '';
		if (memberHeader.length > 0)
		{	if (!numberOnly)
			{	if (memberHeader.length == 1)
				{	code += `- ${titleSingular} `;
				}
				else
				{	code += `- ${memberHeader.length} ${titlePlural}: `;
				}
				code += memberHeader.map(p => !p.headerId ? p.name : `[${p.name}](#${p.headerId})`).join(', ');
				code += '\n';
			}
			else
			{	const title = memberHeader.length==1 ? titleSingular : memberHeader.length+' '+titlePlural;
				const p = memberHeader[0];
				code += '- ' + (!p.headerId ? title : `[${title}](#${p.headerId})`) + '\n';
			}
		}
		return code;
	}
}

function sectionIndex(node: Member)
{	let i = 0;
	if (!('isStatic' in node && node.isStatic))
	{	i |= 4;
	}
	if ('jsDoc' in node && isDeprecated(node))
	{	i |= 2;
	}
	if ('accessibility' in node && node.accessibility==='protected')
	{	i |= 1;
	}
	return i;
}

function parseHeaderId(headerLine: string)
{	let headerId = '';
	if (headerLine)
	{	RE_HEADER_SAN.lastIndex = 0;
		let m;
		while ((m = RE_HEADER_SAN.exec(headerLine)))
		{	if (m[1])
			{	headerId += m[1]==' ' ? '-' : m[1].toLocaleLowerCase();
			}
			else if (m[2])
			{	const pos = RE_HEADER_SAN.lastIndex;
				headerId += parseHeaderId(m[2]);
				RE_HEADER_SAN.lastIndex = pos;
			}
		}
	}
	return headerId;
}
