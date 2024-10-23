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
{	onConstructorDecl(m: ClassConstructorDef): string,
	onConstructorDoc(m: ClassConstructorDef): string,
	onIndexSignatureDecl(m: ClassIndexSignatureDef): string,
	onIndexSignatureDoc(m: ClassIndexSignatureDef): string,
	onPropertyDecl(m: ClassPropertyDef|Accessor): string,
	onPropertyDoc(m: ClassPropertyDef|Accessor): string,
	onMethodDecl(m: ClassMethodDef): string,
	onMethodDoc(m: ClassMethodDef): string,
};

type Member = ClassConstructorDef | ClassMethodDef | ClassIndexSignatureDef | ClassPropertyDef | Accessor;
type MemberWithHeaderId = {member: Member, headerId: string};

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
{	#classDef;
	#classConverter;
	#classMembers: ReturnType<typeof getClassMembers>|undefined;
	#headers = new Map<Member, {headerId: string, headerLine: string}>;
	#headerIds = new Map<string, string>;

	constructor(classDef: ClassDef, classConverter: ClassConverter)
	{	this.#classDef = classDef;
		this.#classConverter = classConverter;
	}

	#getClassMembers()
	{	if (this.#classMembers == undefined)
		{	this.#classMembers = getClassMembers(this.#classDef);
			const {constructors, destructors, indexSignatures, propertiesAndAccessors, methods} = this.#classMembers;
			const {onConstructorDecl, onMethodDecl, onIndexSignatureDecl, onPropertyDecl} = this.#classConverter;
			const headers = this.#headers;
			// constructors
			for (const m of constructors)
			{	const headerLine = onConstructorDecl(m);
				headers.set(m, this.#addHeaderId(headerLine, m));
			}
			// destructors
			for (const m of destructors)
			{	const headerLine = onMethodDecl(m);
				headers.set(m, this.#addHeaderId(headerLine, m));
			}
			// index signatures
			for (const m of indexSignatures)
			{	const headerLine = onIndexSignatureDecl(m);
				headers.set(m, this.#addHeaderId(headerLine, m));
			}
			// properties
			for (const m of propertiesAndAccessors)
			{	const headerLine = onPropertyDecl(m);
				headers.set(m, this.#addHeaderId(headerLine, m));
			}
			// methods
			for (const m of methods)
			{	const headerLine = onMethodDecl(m);
				headers.set(m, this.#addHeaderId(headerLine, m));
			}
		}
		return this.#classMembers;
	}

	#addHeaderId(headerLine: string, member: Member)
	{	const headerId = parseHeaderId(headerLine);
		if (headerId && 'name' in member)
		{	const isStatic = 'isStatic' in member && member.isStatic;
			const key = isStatic ? '.'+member.name : member.name;
			this.#headerIds.set(key, headerId);
		}
		return {headerId, headerLine};
	}

	getHeaderId(name?: string, isStatic=false)
	{	if (!name)
		{	return '';
		}
		this.#getClassMembers();
		const key = isStatic ? '.'+name : name;
		return this.#headerIds.get(key) ?? '';
	}

	getCode()
	{	const {onConstructorDoc, onMethodDoc, onIndexSignatureDoc, onPropertyDoc} = this.#classConverter;
		const {constructors, destructors, indexSignatures, propertiesAndAccessors, methods} = this.#getClassMembers();
		const headers = this.#headers;
		const sections = new ClassSections;
		// constructors
		for (const m of constructors)
		{	const {headerId, headerLine} = headers.get(m)!;
			sections.add(What.Constructor, m, headerId, `#### ${headerLine}\n\n${onConstructorDoc(m)}\n\n`);
		}
		// destructors
		for (const m of destructors)
		{	const {headerId, headerLine} = headers.get(m)!;
			sections.add(What.Destructor, m, headerId, `#### ${headerLine}\n\n${onMethodDoc(m)}\n\n`);
		}
		// index signatures
		for (const m of indexSignatures)
		{	const {headerId, headerLine} = headers.get(m)!;
			sections.add(What.IndexSignature, m, headerId, `#### ${headerLine}\n\n${onIndexSignatureDoc(m)}\n\n`);
		}
		// properties
		for (const m of propertiesAndAccessors)
		{	const {headerId, headerLine} = headers.get(m)!;
			sections.add(What.PropertyOrAccessor, m, headerId, `#### ${headerLine}\n\n${onPropertyDoc(m)}\n\n`);
		}
		// methods
		for (const m of methods)
		{	const {headerId, headerLine} = headers.get(m)!;
			sections.add(What.Method, m, headerId, `#### ${headerLine}\n\n${onMethodDoc(m)}\n\n`);
		}
		// done
		const sectionsCode = sections+'';
		const outline = sections.getOutline();
		return {outline, sectionsCode};
	}
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

	#propertiesPublicStatic = new Array<MemberWithHeaderId>;
	#methodsPublicStatic = new Array<MemberWithHeaderId>;
	#propertiesProtectedStatic = new Array<MemberWithHeaderId>;
	#methodsProtectedStatic = new Array<MemberWithHeaderId>;
	#staticDeprecated = new Array<MemberWithHeaderId>;
	#constructors = new Array<MemberWithHeaderId>;
	#destructors = new Array<MemberWithHeaderId>;
	#indexSignatures = new Array<MemberWithHeaderId>;
	#protectedConstructors = new Array<MemberWithHeaderId>;
	#propertiesPublic = new Array<MemberWithHeaderId>;
	#methodsPublic = new Array<MemberWithHeaderId>;
	#propertiesProtected = new Array<MemberWithHeaderId>;
	#methodsProtected = new Array<MemberWithHeaderId>;
	#deprecated = new Array<MemberWithHeaderId>;

	add(what: What, member: Member, headerId: string, code: string)
	{	const i = sectionIndex(member);
		// Section
		this.#sections[i] += code;
		// Outline
		const memberWithHeaderId = {member, headerId};
		if (i==2 || i==3)
		{	this.#staticDeprecated.push(memberWithHeaderId);
		}
		else if (i >= 6)
		{	this.#deprecated.push(memberWithHeaderId);
		}
		else if (what==What.Constructor && i==5)
		{	this.#protectedConstructors.push(memberWithHeaderId);
		}
		else if (what == What.Constructor)
		{	this.#constructors.push(memberWithHeaderId);
		}
		else if (what == What.Destructor)
		{	this.#destructors.push(memberWithHeaderId);
		}
		else if (what == What.IndexSignature)
		{	this.#indexSignatures.push(memberWithHeaderId);
		}
		else if (what == What.PropertyOrAccessor)
		{	(i==0 ? this.#propertiesPublicStatic : i==1 ? this.#propertiesProtectedStatic : i==5 ? this.#propertiesProtected : this.#propertiesPublic).push(memberWithHeaderId);
		}
		else if (what == What.Method)
		{	(i==0 ? this.#methodsPublicStatic : i==1 ? this.#methodsProtectedStatic : i==5 ? this.#methodsProtected : this.#methodsPublic).push(memberWithHeaderId);
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

	#genMemberOutline(membersWithHeaderId: MemberWithHeaderId[], titleSingular: string, titlePlural: string, numberOnly: boolean)
	{	let code = '';
		if (membersWithHeaderId.length > 0)
		{	if (!numberOnly)
			{	if (membersWithHeaderId.length == 1)
				{	code += `- ${titleSingular} `;
				}
				else
				{	code += `- ${membersWithHeaderId.length} ${titlePlural}: `;
				}
				code += membersWithHeaderId.map(p => memberToLink(p)).join(', ');
				code += '\n';
			}
			else
			{	const title = membersWithHeaderId.length==1 ? titleSingular : membersWithHeaderId.length+' '+titlePlural;
				const p = membersWithHeaderId[0];
				code += '- ' + memberToLink(p, title) + '\n';
			}
			// deno-lint-ignore no-inner-declarations
			function memberToLink(p: MemberWithHeaderId, name?: string)
			{	if (!name)
				{	name = 'name' in p.member ? p.member.name : '?';
				}
				return !p.headerId ? name : `[${name}](#${p.headerId})`;
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
