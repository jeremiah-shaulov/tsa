import {Accessibility, JsDoc, ClassDef, ClassPropertyDef, ClassMethodDef, Location, ClassConstructorDef, ClassIndexSignatureDef} from '../../doc_node/mod.ts';

const RE_HEADER_SAN = /([ ]|[\p{Letter}\p{Number}_]+)|\\.|<\/?\w+(?:[^"'>]+|"[^"]*"|'[^']*')*>|\[([^\]\r\n]+)\]\([^)\r\n]+\)/sug;

export type Accessor =
{	getter: ClassMethodDef|undefined;
	setter: ClassMethodDef|undefined;
	name: string;
	isStatic: boolean;
	accessibility?: Accessibility;
	location: Location;
	jsDoc?: JsDoc;
};

type ClassConverter =
{	onConstructorDecl(m: ClassConstructorDef): string;
	onIndexSignatureDecl(m: ClassIndexSignatureDef): string;
	onPropertyDecl(m: ClassPropertyDef|Accessor): string;
	onMethodDecl(m: ClassMethodDef): string;
	onJsDoc(m: JsDoc|undefined): string;
};

type Member = ClassConstructorDef | ClassMethodDef | ClassIndexSignatureDef | ClassPropertyDef | Accessor;
type MemberHeader = {name: string, headerLine: string, headerId: string};

export function isPublicOrProtected(node: {accessibility?: Accessibility, jsDoc?: JsDoc})
{	return node.accessibility !== 'private' && (node.jsDoc?.tags?.findIndex(v => v.kind == 'private') ?? -1) == -1;
}

const enum What
{	Constructor,
	Destructor,
	IndexSignature,
	PropertyOrAccessor,
	Method,
}

export class MdClassGen
{	#classConverter;
	#classMembers;
	#memberHeaders = new Map<Member, MemberHeader>;
	#memberHeadersByKey = new Map<string, MemberHeader>;

	constructor(classDef: ClassDef, classConverter: ClassConverter)
	{	this.#classConverter = classConverter;
		this.#classMembers = getClassMembers(classDef);
		const {constructors, destructors, indexSignatures, propertiesAndAccessors, methods} = this.#classMembers;
		const {onConstructorDecl, onMethodDecl, onIndexSignatureDecl, onPropertyDecl} = this.#classConverter;
		// constructors
		for (const m of constructors)
		{	this.#addHeader(m, m.name, false, onConstructorDecl(m));
		}
		// destructors
		for (const m of destructors)
		{	this.#addHeader(m, m.name, false, onMethodDecl(m));
		}
		// index signatures
		for (const m of indexSignatures)
		{	this.#addHeader(m, '', false, onIndexSignatureDecl(m));
		}
		// properties
		for (const m of propertiesAndAccessors)
		{	this.#addHeader(m, m.name, m.isStatic, onPropertyDecl(m));
		}
		// methods
		for (const m of methods)
		{	this.#addHeader(m, m.name, m.isStatic, onMethodDecl(m));
		}
	}

	#addHeader(m: Member, name: string, isStatic: boolean, headerLine: string)
	{	const memberHeader = {name: name, headerLine, headerId: parseHeaderId(headerLine)};
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
	{	const {onJsDoc} = this.#classConverter;
		const {constructors, destructors, indexSignatures, propertiesAndAccessors, methods} = this.#classMembers;
		const memberHeaders = this.#memberHeaders;
		const sections = new ClassSections;
		// constructors
		for (const m of constructors)
		{	sections.add(sectionIndex(m), What.Constructor, memberHeaders.get(m), onJsDoc(m.jsDoc));
		}
		// destructors
		for (const m of destructors)
		{	sections.add(sectionIndex(m), What.Destructor, memberHeaders.get(m), onJsDoc(m.jsDoc));
		}
		// index signatures
		for (const m of indexSignatures)
		{	sections.add(sectionIndex(m), What.IndexSignature, memberHeaders.get(m), '');
		}
		// properties
		for (const m of propertiesAndAccessors)
		{	let code = '';
			if ('getter' in m && m.getter?.jsDoc && m.setter?.jsDoc)
			{	code += 'get\n\n';
				code += onJsDoc(m.getter.jsDoc);
				code += 'set\n\n';
				code += onJsDoc(m.setter.jsDoc);
			}
			else
			{	code += onJsDoc(m.jsDoc);
			}
			sections.add(sectionIndex(m), What.PropertyOrAccessor, memberHeaders.get(m), code);
		}
		// methods
		for (const m of methods)
		{	sections.add(sectionIndex(m), What.Method, memberHeaders.get(m), onJsDoc(m.jsDoc));
		}
		// done
		const sectionsCode = sections+'';
		const outline = sections.getOutline();
		return {outline, sectionsCode};
	}
}

function getMemberKey(name: string, isStatic=false)
{	return isStatic ? '.'+name : name;
}

function getClassMembers(classDef: ClassDef)
{	const methods = new Array<ClassMethodDef>;
	const destructors = new Array<ClassMethodDef>;
	const accessors = new Array<Accessor>;
	const settersOnly = new Array<ClassMethodDef>;
	// Resort `classDef.methods` to `methods` (regular methods), `accessors` (properties that have a getter, and maybe setter), and `settersOnly`
	for (let methodsAndAccessors=classDef.methods, i=0; i<methodsAndAccessors.length; i++)
	{	const m = methodsAndAccessors[i];
		if (isPublicOrProtected(m))
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
				{	const accessor: Accessor = {getter: m, setter: undefined, name: m.name, isStatic: m.isStatic, accessibility: m.accessibility, location: m.location, jsDoc: m.jsDoc};
					const j = methodsAndAccessors.findIndex(s => s.kind=='setter' && s.name==m.name);
					if (j != -1)
					{	const setter = methodsAndAccessors[j];
						accessor.setter = setter;
						if (!accessor.jsDoc)
						{	accessor.jsDoc = setter.jsDoc;
						}
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
	const propertiesAndAccessors: Array<ClassPropertyDef|Accessor> = accessors;
	for (const s of settersOnly)
	{	propertiesAndAccessors.push({getter: undefined, setter: s, name: s.name, isStatic: s.isStatic, accessibility: s.accessibility, location: s.location, jsDoc: s.jsDoc});
	}
	for (const p of classDef.properties)
	{	if (isPublicOrProtected(p))
		{	propertiesAndAccessors.push(p);
		}
	}
	// Sort `propertiesAndAccessors`
	propertiesAndAccessors.sort((a, b) => a.location.filename < b.location.filename ? -1 : a.location.filename > b.location.filename ? +1 : a.location.line - b.location.line);
	// Create `constructors` var with `classDef.constructors`.
	// Also add class members declared in constructor arguments (like `constructor(public memb=1) {}`) to `propertiesAndAccessors`
	const constructors = new Array<ClassConstructorDef>;
	for (const c of classDef.constructors)
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
	// Create `indexSignatures` var
	const {indexSignatures} = classDef;
	// Done
	return {constructors, destructors, indexSignatures, propertiesAndAccessors, methods};
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
		return code ? `This class has:\n${code}\n\n` : '';
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

function isDeprecated(node: {jsDoc?: JsDoc})
{	return node.jsDoc?.tags?.find(t => t.kind == 'deprecated') != undefined;
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
