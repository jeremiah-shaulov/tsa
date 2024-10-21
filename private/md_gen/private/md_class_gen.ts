import {Accessibility, JsDoc, ClassDef, ClassPropertyDef, ClassMethodDef, Location, ClassConstructorDef, ClassIndexSignatureDef} from '../../doc_node/mod.ts';

const RE_LINK_SAN = /[^\p{Letter}\p{Number}_]+/gu;
const RE_LINK_SAN_2 = /^-+|-+$/g;

export type Accessor =
{	getter: ClassMethodDef|undefined;
	setter: ClassMethodDef|undefined;
	name: string;
	isStatic: boolean;
	accessibility?: Accessibility;
	location: Location;
	jsDoc?: JsDoc;
};

type Member = ClassConstructorDef | ClassMethodDef | ClassIndexSignatureDef | ClassPropertyDef | Accessor;

type Named = {name?: string};

export function isPublicOrProtected(node: {accessibility?: Accessibility, jsDoc?: JsDoc})
{	return node.accessibility !== 'private' && (node.jsDoc?.tags?.findIndex(v => v.kind == 'private') ?? -1) == -1;
}

export function memberToSectionId(withHashSign: boolean, name?: string, isStatic=false)
{	if (!name)
	{	return '';
	}
	name = name.replace(RE_LINK_SAN, '-').replace(RE_LINK_SAN_2, '');
	if (isStatic)
	{	return !withHashSign ? 'static.'+name : '#static.'+name;
	}
	else
	{	return !withHashSign ? name : '#'+name;
	}
}

const enum What
{	Constructor,
	Destructor,
	IndexSignature,
	PropertyOrAccessor,
	Method,
}

export function mdClassGen
(	classDef: ClassDef,
	converter:
	{	onConstructor(m: ClassConstructorDef): string,
		onMethod(m: ClassMethodDef): string,
		onIndexSignature(m: ClassIndexSignatureDef): string,
		onProperty(p: ClassPropertyDef|Accessor): string,
	}
)
{	const {constructors, destructors, indexSignatures, propertiesAndAccessors, methods} = getClassMembers(classDef);
	const sections = new ClassSections;
	for (const c of constructors)
	{	sections.add(What.Constructor, c, converter.onConstructor(c));
	}
	// destructors
	for (const m of destructors)
	{	sections.add(What.Destructor, m, converter.onMethod(m));
	}
	// index signatures
	for (const c of indexSignatures)
	{	sections.add(What.IndexSignature, c, converter.onIndexSignature(c));
	}
	// properties
	for (const p of propertiesAndAccessors)
	{	sections.add(What.PropertyOrAccessor, p, converter.onProperty(p));
	}
	// methods
	for (const m of methods)
	{	sections.add(What.Method, m, converter.onMethod(m));
	}
	const outline = sections.getOutline();
	const sectionsCode = sections+'';
	return {outline, sectionsCode};
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

	#nStaticDeprecated = 0;
	#nConstructors = 0;
	#destructors = new Array<Named>;
	#nIndexSignatures = 0;
	#nProtectedConstructors = 0;
	#nDeprecated = 0;
	#propertiesPublicStatic = new Array<Named>;
	#propertiesProtectedStatic = new Array<Named>;
	#propertiesPublic = new Array<Named>;
	#propertiesProtected = new Array<Named>;
	#methodsPublicStatic = new Array<Named>;
	#methodsProtectedStatic = new Array<Named>;
	#methodsPublic = new Array<Named>;
	#methodsProtected = new Array<Named>;

	add(what: What, node: Member, code: string)
	{	const i = sectionIndex(node);
		// Section
		this.#sections[i] += code;
		// Outline
		if (i==2 || i==3)
		{	this.#nStaticDeprecated++;
		}
		else if (i >= 6)
		{	this.#nDeprecated++;
		}
		else if (what==What.Constructor && i==5)
		{	this.#nProtectedConstructors++;
		}
		else if (what == What.Constructor)
		{	this.#nConstructors++;
		}
		else if (what == What.Destructor)
		{	this.#destructors.push(node as Named);
		}
		else if (what == What.IndexSignature)
		{	this.#nIndexSignatures++;
		}
		else if (what == What.PropertyOrAccessor)
		{	(i==0 ? this.#propertiesPublicStatic : i==1 ? this.#propertiesProtectedStatic : i==5 ? this.#propertiesProtected : this.#propertiesPublic).push(node as Named);
		}
		else if (what == What.Method)
		{	(i==0 ? this.#methodsPublicStatic : i==1 ? this.#methodsProtectedStatic : i==5 ? this.#methodsProtected : this.#methodsPublic).push(node as Named);
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
			{	code += '<div class="sect-deprecated">\n\n';
				code += codeStatDepr;
				code += '</div>\n\n';
			}
			code += '## Instance members\n\n';
		}
		code += codeInst;
		if (codeInstDepr)
		{	code += '<div class="sect-deprecated">\n\n';
			code += codeInstDepr;
			code += '</div>\n\n';
		}
		return code;
	}

	getOutline()
	{	let code = '';
		// static properties
		code += this.#genMemberOutline(this.#propertiesPublicStatic, true, 'static property', 'static properties');
		// static methods
		code += this.#genMemberOutline(this.#methodsPublicStatic, true, 'static method', 'static methods');
		// protected static properties
		code += this.#genMemberOutline(this.#propertiesProtectedStatic, true, 'protected static property', 'protected static properties');
		// protected static methods
		code += this.#genMemberOutline(this.#methodsProtectedStatic, true, 'protected static method', 'protected static methods');
		// static deprecated
		if (this.#nStaticDeprecated > 0)
		{	code += `- ${this.#nStaticDeprecated} static deprecated ${this.#nStaticDeprecated==1 ? 'symbol' : 'symbols'}\n`;
		}
		// constructors
		if (this.#nConstructors == 1)
		{	code += `- constructor\n`;
		}
		else if (this.#nConstructors > 1)
		{	code += `- ${this.#nConstructors} constructors\n`;
		}
		// destructors
		if (this.#destructors.length > 0)
		{	code += `- [${this.#destructors.length==1 ? 'destructor' : `${this.#destructors.length} destructors`}](${memberToSectionId(true, this.#destructors[0].name, false)})\n`;
		}
		// index signatures
		if (this.#nIndexSignatures == 1)
		{	code += `- index signatures\n`;
		}
		else if (this.#nIndexSignatures > 1)
		{	code += `- ${this.#nIndexSignatures} index signatures\n`;
		}
		// protected constructors
		if (this.#nProtectedConstructors == 1)
		{	code += `- protected constructor\n`;
		}
		else if (this.#nProtectedConstructors > 1)
		{	code += `- ${this.#nProtectedConstructors} protected constructors\n`;
		}
		// properties
		code += this.#genMemberOutline(this.#propertiesPublic, false, 'property', 'properties');
		// methods
		code += this.#genMemberOutline(this.#methodsPublic, false, 'method', 'methods');
		// protected properties
		code += this.#genMemberOutline(this.#propertiesProtected, false, 'protected property', 'protected properties');
		// protected methods
		code += this.#genMemberOutline(this.#methodsProtected, false, 'protected method', 'protected methods');
		// deprecated
		if (this.#nDeprecated > 0)
		{	code += `- ${this.#nDeprecated} deprecated ${this.#nDeprecated==1 ? 'symbol' : 'symbols'}\n`;
		}
		return code ? `This class has:\n${code}\n\n` : '';
	}

	#genMemberOutline(members: Named[], isStatic: boolean, titleSingular: string, titlePlural: string)
	{	let code = '';
		if (members.length > 0)
		{	if (members.length == 1)
			{	code += `- ${titleSingular} `;
			}
			else
			{	code += `- ${members.length} ${titlePlural}: `;
			}
			code += members.map(p => `[${p.name}](${memberToSectionId(true, p.name, isStatic)})`).join(', ');
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
