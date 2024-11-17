import {assertEquals, denoDoc, DenoDocNode, DocOptions} from './deps.ts';
import {tsa} from '../tsa_ns.ts';
import {getTmpDirname, printDiagnostics, writeTextFile} from '../util.ts';
import {LoadOptions} from '../load_options.ts';
import {path} from '../deps.ts';

// deno-lint-ignore no-explicit-any
type Any = any;

const RE_IS_URL = /^(?:https?|file):\/\//;

/**	The goal is to compare the result of `await doc(subj)` with `await denoDoc(subj)`.
	However the results are known to be different, and in certain situations it's ok.
	This function converts both the results (`dataDoc` and `dataDenoDoc`) to be ready for the `assertEquals(dataDoc, dataDenoDoc)` comparison.
 **/
function makeCompatible(dataDoc: Any, dataDenoDoc: Any, subjHref: string, parentKey='')
{	if (Array.isArray(dataDoc) && Array.isArray(dataDenoDoc))
	{	// 1. Fix repeated interface and function declarations (when an interface or an overloaded function with the same name is declared several times)
		const ifaces = new Array<Any>();
L:		for (let i=0; i<dataDenoDoc.length; i++)
		{	const v = dataDenoDoc[i];
			if (v.interfaceDef || v.functionDef)
			{	for (let j=0; j<ifaces.length; j++)
				{	const v2 = ifaces[j];
					if (v2.name==v.name && v2.kind==v.kind && v2.location?.filename==v.location?.filename)
					{	if (v.interfaceDef)
						{	v2.interfaceDef.methods = v2.interfaceDef.methods.concat(v.interfaceDef.methods);
							v2.interfaceDef.callSignatures = v2.interfaceDef.callSignatures.concat(v.interfaceDef.callSignatures);
							v2.interfaceDef.indexSignatures = v2.interfaceDef.indexSignatures.concat(v.interfaceDef.indexSignatures);
							v2.interfaceDef.typeParams = v2.interfaceDef.typeParams.concat(v.interfaceDef.typeParams);
							for (const ce of v.interfaceDef.extends)
							{	if (!v2.interfaceDef.extends.some((e: Any) => e.repr == ce.repr))
								{	v2.interfaceDef.extends.push(ce);
								}
							}
							for (const ce of v.interfaceDef.properties)
							{	if (!v2.interfaceDef.properties.some((e: Any) => e.name == ce.name))
								{	v2.interfaceDef.properties.push(ce);
								}
							}
						}
						else // if `v.functionDef`
						{	if (v.functionDef.hasBody)
							{	const k = dataDenoDoc.indexOf(v2);
								if (k != -1)
								{	dataDenoDoc[k] = v;
									ifaces[j] = v;
								}
							}
						}
						dataDenoDoc.splice(i--, 1);
						continue L;
					}
				}
				ifaces.push(v);
			}
		}
		// 2. Remove nodes in dataDenoDoc that are not reported as separate nodes in dataDoc, but as reexports of another nodes
		for (let i=0; i<dataDoc.length; i++)
		{	const v = dataDoc[i];
			if (v.exports)
			{	for (const e of v.exports)
				{	const j = dataDenoDoc.findIndex(n => n.name==e.name && n.location.filename==e.location.filename && n.kind==v.kind && n.declarationKind!='private');
					if (j != -1)
					{	if (!dataDoc.some(n => n.name==e.name && n.location.filename==e.location.filename && n.kind==v.kind && n.declarationKind!='private'))
						{	dataDenoDoc.splice(j, 1);
						}
					}
				}
			}
		}
		// 3. Sort by line number, so the order will be the same in dataDoc and dataDenoDoc
		if (dataDenoDoc[0]?.location)
		{	for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
			{	if (!RE_IS_URL.test(dataDenoDoc[i].location.filename))
				{	dataDenoDoc[i].location.filename = new URL(dataDenoDoc[i].location.filename, subjHref).href;
				}
			}
			dataDoc.sort((a, b) => a.location.filename < b.location.filename ? -1 : a.location.filename > b.location.filename ? +1 : a.location.line - b.location.line);
			dataDenoDoc.sort((a, b) => a.location.filename < b.location.filename ? -1 : a.location.filename > b.location.filename ? +1 : a.location.line - b.location.line);
		}
		// 4. Fix @callback: if dataDenoDoc has sequence of @callback, @param, @returns, and dataDoc has @callback with tsType that contains the parameters and the return type, remove the @param and @returns from dataDenoDoc
		if (parentKey == 'tags')
		{	// jsDoc.doc.tags
M:			for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
			{	if (dataDoc[i].kind=='callback' && dataDenoDoc[i].kind=='callback')
				{	const params = dataDoc[i].tsType?.fnOrConstructor?.params;
					if (params?.length)
					{	let nRemove = Number(params.length);
						for (let j=i+1, k=0; k<nRemove; j++, k++)
						{	if (dataDenoDoc[j]?.kind!='param' || dataDenoDoc[j].name!=params[k].name)
							{	continue M;
							}
						}
						if (dataDenoDoc[i+nRemove+1]?.kind == 'return')
						{	nRemove++;
						}
						dataDenoDoc.splice(i+1, nRemove);
					}
				}
			}
		}
		// 5. As above, but for @typedef, @property
		if (parentKey == 'tags')
		{	// jsDoc.doc.tags
N:			for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
			{	if (dataDoc[i].kind=='typedef' && dataDenoDoc[i].kind=='typedef')
				{	const params = dataDoc[i].tsType?.typeLiteral?.properties;
					if (params?.length)
					{	const nRemove = Number(params.length);
						for (let j=i+1, k=0; k<nRemove; j++, k++)
						{	if (!(dataDenoDoc[j]?.kind=='property' && dataDenoDoc[j].name==params[k].name || dataDenoDoc[j]?.kind=='unsupported' && dataDenoDoc[j].value.startsWith('@prop')))
							{	continue N;
							}
						}
						dataDenoDoc.splice(i+1, nRemove);
					}
				}
			}
		}
		// 6. Fix @param: if dataDenoDoc has sequence of @param name.sub1, @param name.sub2, etc., and dataDoc has single @param with tsType, remove from dataDenoDoc
		if (parentKey == 'tags')
		{	for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
			{	if (dataDoc[i].kind=='param' && dataDenoDoc[i].kind=='param' && dataDoc[i].name==dataDenoDoc[i].name)
				{	const properties = dataDoc[i].tsType?.typeLiteral?.properties || dataDoc[i].tsType?.array?.typeLiteral?.properties;
					if (properties)
					{	const name1 = dataDenoDoc[i].name + '.';
						const name2 = dataDenoDoc[i].name + '[].';
						const name3 = dataDenoDoc[i].name + '[';
						while (dataDenoDoc[i+1]?.kind=='param' && (dataDenoDoc[i+1]?.name.startsWith(name1) || dataDenoDoc[i+1]?.name.startsWith(name2) || dataDenoDoc[i+1]?.name==name3))
						{	dataDenoDoc.splice(i+1, 1);
						}
					}
				}
			}
		}
		// 7. Fix @param and @enum: if dataDenoDoc has unsupported tag that starts with '@param' (this happens when the param type contains braces), or '@enum' (this happens when the enum tag doesn't specify type), then copy the tag from dataDoc
		if (parentKey == 'tags')
		{	for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
			{	if (dataDenoDoc[i].kind=='unsupported')
				{	if (dataDoc[i].kind=='param' && dataDenoDoc[i].value.startsWith('@param'))
					{	dataDenoDoc[i] = dataDoc[i];
					}
					else if (dataDoc[i].kind=='enum' && dataDenoDoc[i].value=='@enum')
					{	dataDenoDoc[i] = dataDoc[i];
					}
				}
			}
		}
		// 8. Fix @template: when dataDoc has typeParams, add it also to dataDenoDoc, and fix unsupported templates
		if (parentKey == 'tags')
		{	for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
			{	// when dataDenoDoc has typeParams, add it also to dataDenoDoc
				if (dataDoc[i].kind=='template' && dataDenoDoc[i].kind=='template')
				{	if (dataDoc[i].typeParams)
					{	dataDenoDoc[i].typeParams = dataDoc[i].typeParams;
					}
				}
				// fix unsupported templates
				if (dataDoc[i].kind=='template' && dataDenoDoc[i].kind=='unsupported' && dataDenoDoc[i].value.startsWith('@template'))
				{	dataDenoDoc[i] = dataDoc[i];
				}
			}
		}
		// 9. If dataDenoDoc has entry for "this", and dataDoc doesn't, delete it
		if (parentKey == 'tags')
		{	for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
			{	// when dataDenoDoc has typeParams, add it also to dataDenoDoc
				if (dataDenoDoc[i].kind=='this' && dataDoc[i].kind!='this' && dataDenoDoc.length>dataDoc.length && dataDoc[i].kind==dataDenoDoc[i+1].kind)
				{	dataDenoDoc.splice(i, 1);
				}
			}
		}
		// 10. Do recursive
		for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
		{	makeCompatible(dataDoc[i], dataDenoDoc[i], subjHref, '');
		}
		// 11. If dataDenoDoc has list of types, and dataDoc has ['...'] (nesting level is too deep), cut dataDenoDoc
		if (dataDoc.length==1 && dataDoc[0].IS_DOC_UNSUPPORTED===true && dataDenoDoc.length>1)
		{	dataDenoDoc.length = 1;
		}
	}
	else if (typeof(dataDoc)=='object' && typeof(dataDenoDoc)=='object')
	{	// 1. Fix parenthesized: if dataDenoDoc has it, but dataDoc doesn't, remove it from dataDenoDoc, and if dataDoc has it, add to dataDenoDoc
		while (dataDenoDoc.kind=='parenthesized' && dataDoc.kind!='parenthesized' && dataDenoDoc.parenthesized.kind==dataDoc.kind)
		{	const {parenthesized} = dataDenoDoc;
			delete dataDenoDoc.parenthesized;
			delete dataDenoDoc.kind;
			for (const [k, v] of Object.entries(parenthesized))
			{	dataDenoDoc[k] = v;
			}
		}
		while (dataDoc.kind=='parenthesized' && dataDenoDoc.kind!='parenthesized' && dataDoc.parenthesized.kind==dataDenoDoc.kind)
		{	const parenthesized = {...dataDenoDoc};
			for (const k of Object.keys(dataDenoDoc))
			{	delete dataDenoDoc[k];
			}
			dataDenoDoc.repr = dataDoc.repr;
			dataDenoDoc.kind = 'parenthesized';
			dataDenoDoc.parenthesized = parenthesized;
		}
		// 2. Fix Array<E>: if dataDenoDoc has Array<E>, and dataDoc has E[], convert in dataDenoDoc
		if (dataDenoDoc.kind=='typeRef' && dataDoc.kind=='array' && dataDenoDoc.typeRef.typeName=='Array' && dataDenoDoc.typeRef.typeParams.length==1)
		{	const array = dataDenoDoc.typeRef.typeParams[0];
			delete dataDenoDoc.typeRef;
			dataDenoDoc.kind = 'array';
			dataDenoDoc.array = array;
			dataDenoDoc.repr = dataDoc.repr;
		}
		// 3. if dataDenoDoc has `tpl`, but dataDoc has "tpl", convert on dataDenoDoc
		if (dataDenoDoc.kind=='literal' && dataDenoDoc.literal.kind=='template' && dataDoc.kind=='literal' && dataDoc.literal.kind=='string' && dataDenoDoc.literal.tsTypes?.length==1 && dataDenoDoc.literal.tsTypes[0].literal?.kind=='string')
		{	dataDenoDoc.literal = dataDenoDoc.literal.tsTypes[0].literal;
		}
		// 4. Fix `this`: if dataDoc has type expansion, copy from `dataDenoDoc`
		if (dataDenoDoc.kind=='this' && dataDoc.kind=='typeRef')
		{	for (const k of Object.keys(dataDoc))
			{	delete dataDoc[k];
			}
			for (const [k, v] of Object.entries(dataDenoDoc))
			{	dataDoc[k] = v;
			}
		}
		// 5. Fix class properties declared in constructor parameters
		if (dataDenoDoc.classDef?.constructors?.length>0 && dataDenoDoc.classDef.constructors.length===dataDoc.classDef?.constructors?.length)
		{	const denoCtors = dataDenoDoc.classDef.constructors;
			const ctors = dataDoc.classDef.constructors;
			for (let i=0; i<ctors.length; i++)
			{	if (denoCtors[i].params && denoCtors[i].params.length===ctors[i].params?.length)
				{	const denoParams = denoCtors[i].params;
					const params = ctors[i].params;
					for (let j=0; j<denoParams.length; j++)
					{	if (denoParams[j].readonly && !params[j].readonly || denoParams[j].accessibility && !params[j].accessibility)
						{	if (!dataDenoDoc.classDef.properties)
							{	dataDenoDoc.classDef.properties = [];
							}
							const prop = dataDoc.classDef.properties?.find((p: Any) => p.name == denoParams[j].name);
							dataDenoDoc.classDef.properties.push
							(	{	readonly: denoParams[j].readonly,
									accessibility: denoParams[j].accessibility,
									decorators: undefined,
									init: undefined,
									isOverride: undefined,
									tsType: denoParams[j].tsType,
									optional: denoParams[j].optional,
									isAbstract: false,
									isStatic: false,
									name: denoParams[j].name,
									...(prop?.location && {location: prop.location}),
									...(prop?.jsDoc && {jsDoc: prop.jsDoc}),
								}
							);
							denoParams[j].readonly = false;
							denoParams[j].accessibility = undefined;
						}
					}
				}
			}
		}
		// 6. Do recursive
		for (const [k, v] of Object.entries(dataDoc))
		{	makeCompatible(v, dataDenoDoc[k], dataDoc.namespaceDef && dataDoc.location?.filename || subjHref, k);
		}
		// 7. Fix `location.line` and `location.col` (copy dataDenoDoc -> dataDoc)
		if (dataDoc.location && dataDenoDoc.location)
		{	dataDoc.location.line = dataDenoDoc.location.line;
			dataDoc.location.col = dataDenoDoc.location.col;
		}
		// 8. Fix `tsType` and `returnType`: dataDenoDoc doesn't have `tsType` in many cases, so copy from dataDoc
		if (dataDoc.tsType && dataDenoDoc.tsType==undefined)
		{	dataDenoDoc.tsType = dataDoc.tsType;
		}
		if (dataDoc.returnType && dataDenoDoc.returnType==undefined)
		{	dataDenoDoc.returnType = dataDoc.returnType;
		}
		// 9. Fix `nodeIndex`, `nameNodeIndex` and `nodeSubIndex` (copy from dataDoc to dataDenoDoc)
		if (dataDoc.nodeIndex != undefined)
		{	dataDenoDoc.nodeIndex = dataDoc.nodeIndex;
			if (dataDoc.nodeSubIndex != undefined)
			{	dataDenoDoc.nodeSubIndex = dataDoc.nodeSubIndex;
			}
		}
		else if (dataDoc.nameNodeIndex != undefined)
		{	dataDenoDoc.nameNodeIndex = dataDoc.nameNodeIndex;
		}
		// 10. Fix `converter.entryPointNumber` (copy from dataDoc to dataDenoDoc)
		if (dataDoc.entryPointNumber != undefined)
		{	dataDenoDoc.entryPointNumber = dataDoc.entryPointNumber;
		}
		// 11. Fix unsupported initializers: if dataDenoDoc has an unsupported initializer, copy from dataDoc
		if (typeof(dataDoc.value)=='string' && dataDenoDoc.value==='[UNSUPPORTED]')
		{	dataDenoDoc.value = dataDoc.value;
		}
		if (typeof(dataDoc.right)=='string' && dataDenoDoc.right==='[UNSUPPORTED]')
		{	dataDenoDoc.right = dataDoc.right;
			if (dataDenoDoc.left.optional===false && dataDoc.left.optional===true)
			{	dataDenoDoc.left.optional = true;
			}
		}
		// 12. Fix intersections: sort
		if (Array.isArray(dataDoc.intersection) && Array.isArray(dataDenoDoc.intersection) && dataDoc.intersection.length==dataDenoDoc.intersection.length)
		{	dataDoc.intersection.sort((a: Any, b: Any) => a.repr > b.repr ? +1 : a.repr < b.repr ? -1 : 0);
			dataDenoDoc.intersection.sort((a: Any, b: Any) => a.repr > b.repr ? +1 : a.repr < b.repr ? -1 : 0);
		}
		// 13. Fix unions: sort and convert `true|false` to `boolean`
		if (Array.isArray(dataDoc.union) && Array.isArray(dataDenoDoc.union))
		{	// Sort
			dataDoc.union.sort((a: Any, b: Any) => a.repr > b.repr ? +1 : a.repr < b.repr ? -1 : 0);
			dataDenoDoc.union.sort((a: Any, b: Any) => a.repr > b.repr ? +1 : a.repr < b.repr ? -1 : 0);
			// Convert `true|false` to `boolean`
			if (!dataDoc.union.find((v: Any) => v.kind=='literal' && v.repr=='true'))
			{	const trueIndex = dataDenoDoc.union.findIndex((v: Any) => v.kind=='literal' && v.repr=='true');
				const falseIndex = dataDenoDoc.union.findIndex((v: Any) => v.kind=='literal' && v.repr=='false');
				if (trueIndex!=-1 && falseIndex!=-1)
				{	dataDenoDoc.union[trueIndex] = {repr: 'boolean', kind: 'keyword', keyword: 'boolean'};
					dataDenoDoc.union.splice(falseIndex, 1);
				}
			}
		}
		// 14. When dataDenoDoc has type, but dataDoc is '...' (nesting level is too deep), mark as unsupported
		if (dataDoc.kind=='typeRef' && dataDoc.typeRef.typeName=='...' && dataDenoDoc.kind!='typeRef')
		{	for (const k of Object.keys(dataDoc))
			{	delete dataDoc[k];
			}
			for (const [k, v] of Object.entries(dataDenoDoc))
			{	dataDoc[k] = v;
			}
			dataDoc.IS_DOC_UNSUPPORTED = true;
			dataDenoDoc.IS_DOC_UNSUPPORTED = true;
		}
		// 15. When dataDoc has typeParams on a function or class, and dataDoc doesn't, and there's @template tag, copy the typeParams from dataDoc to dataDenoDoc
		for (const name of ['functionDef', 'classDef'])
		{	if (dataDoc[name]?.typeParams?.length && dataDenoDoc[name] && !dataDenoDoc[name].typeParams?.length && dataDoc.jsDoc?.tags?.find((t: Any) => t.kind=='template' && t.typeParams?.length))
			{	dataDenoDoc[name].typeParams = dataDoc[name].typeParams;
			}
		}
		// 16. Fix enum isConst: if dataDoc has it, copy also to dataDenoDoc
		if (dataDoc.enumDef?.isConst && dataDenoDoc.enumDef)
		{	dataDenoDoc.enumDef.isConst = dataDoc.enumDef.isConst;
		}
		// 17. Fix `jsDoc`
		if (dataDoc.jsDoc && !dataDenoDoc.jsDoc)
		{	// if dataDenoDoc doesn't have `jsDoc`, copy from dataDoc
			dataDenoDoc.jsDoc = dataDoc.jsDoc;
		}
		else if (dataDenoDoc.jsDoc?.doc)
		{	// dataDenoDoc: replace \n\t -> \n
			dataDenoDoc.jsDoc.doc = dataDenoDoc.jsDoc.doc.replace(/\n\t*/g, '\n').replace(/\n$/, '');
			if (dataDoc.jsDoc?.doc)
			{	// dataDoc: replace \r\n -> \n
				dataDoc.jsDoc.doc = dataDoc.jsDoc.doc.replace(/\r\n*/g, '\n');
				// dataDoc: replace {@link text } -> {@link text}
				dataDoc.jsDoc.doc = dataDoc.jsDoc.doc.replace(/(\{@\w+[^\}]+?) \}/g, '$1}');
			}
		}
		if (dataDenoDoc.doc?.endsWith('\n') && dataDoc.doc?.endsWith('\n')===false)
		{	dataDenoDoc.doc = dataDenoDoc.doc.trimEnd();
		}
		// 18. Fix `repr`
		if (dataDenoDoc.literal?.kind == 'string')
		{	// dataDoc has string literals JSON-stringified, but dataDenoDoc doesn't
			dataDenoDoc.repr = JSON.stringify(dataDenoDoc.repr);
		}
		else if (dataDenoDoc.literal?.kind == 'template')
		{	// dataDoc has template literals backtick-enclosed, but dataDenoDoc doesn't
			dataDenoDoc.repr = '`'+dataDenoDoc.repr+'`';
		}
		else if (dataDenoDoc.literal?.kind == 'bigInt')
		{	// dataDoc has bigint literals with 'n'-suffix
			dataDenoDoc.repr = dataDenoDoc.repr+'n';
		}
		else if (dataDenoDoc.repr==='' && typeof(dataDoc.repr)=='string')
		{	// dataDenoDoc doesn't have `repr` in many cases, so copy from dataDoc
			dataDenoDoc.repr = dataDoc.repr;
		}
		// 19. Fix properties[i].init: dataDenoDoc doesn't have `init` on properties, so copy from dataDoc
		if (Array.isArray(dataDoc.properties) && Array.isArray(dataDenoDoc.properties) && dataDoc.properties.length==dataDenoDoc.properties.length)
		{	for (let i=0; i<dataDoc.properties.length; i++)
			{	if (dataDoc.properties[i].init != undefined)
				{	dataDenoDoc.properties[i].init = dataDoc.properties[i].init;
				}
			}
		}
		// 20. Fix `init` on enum members: if dataDenoDoc doesn't have it, copy from dataDoc
		if (dataDoc.enumDef?.members && dataDoc.enumDef.members.length === dataDenoDoc.enumDef?.members?.length)
		{	for (let i=0; i<dataDoc.enumDef.members.length; i++)
			{	if (dataDoc.enumDef.members[i].init != undefined && dataDenoDoc.enumDef.members[i].init == undefined)
				{	dataDenoDoc.enumDef.members[i].init = dataDoc.enumDef.members[i].init;
				}
			}
		}
		// 21. Fix `docTokens`: dataDenoDoc doesn't have `docTokens`, so copy from dataDoc
		if (dataDoc.docTokens != undefined) // leave the property if it's undefined (so will discover this bad situation)
		{	dataDenoDoc.docTokens = dataDoc.docTokens;
		}
		// 22. Fix object keys order
		if ([...Object.keys(dataDoc)].join('#') != [...Object.keys(dataDenoDoc)].join('#'))
		{	const orig = {...dataDoc};
			for (const k of Object.keys(dataDoc))
			{	delete dataDoc[k];
			}
			for (const k of Object.keys(dataDenoDoc))
			{	if (orig[k]!= undefined)
				{	dataDoc[k] = orig[k];
				}
			}
			for (const k of Object.keys(orig))
			{	dataDoc[k] = orig[k];
			}
		}
		// 23. Fix `classDef.constructors` and `classDef.indexSignatures`: if dataDoc has inherited constructors, add them to dataDenoDoc. And the same for `indexSignatures`
		for (const name of ['constructors', 'indexSignatures'])
		{	if (dataDenoDoc.classDef?.[name] && dataDoc.classDef?.[name] && dataDenoDoc.classDef[name].length < dataDoc.classDef[name].length)
			{	const ctors = dataDoc.classDef[name];
				const denoCtors = dataDenoDoc.classDef[name];
				for (let i=0; i<ctors.length; i++)
				{	if (ctors[i].params.map((p: Any) => p.tsType.repr).join(',') != denoCtors[i]?.params.map((p: Any) => p.tsType.repr).join(','))
					{	denoCtors.splice(i, 0, ctors[i]);
					}
				}
			}
		}
		// 24. Convert decorators args: if dataDoc has double-quoted string, and dataDenoDoc has an apostroph-quoted one, change apostrophs to quotes
		if (dataDoc.decorators?.length && dataDenoDoc.decorators?.length)
		{	for (let i=0; i<dataDoc.decorators.length; i++)
			{	if (dataDoc.decorators[i].name == dataDenoDoc.decorators[i].name && dataDoc.decorators[i].args?.length == dataDenoDoc.decorators[i].args?.length)
				{	const args = dataDoc.decorators[i].args;
					const denoArgs = dataDenoDoc.decorators[i].args;
					for (let j=0; j<args.length; j++)
					{	if (args[i][0]=='"' && denoArgs[i][0]=="'" && denoArgs[i].slice(-1)=="'")
						{	denoArgs[i] = '"' + denoArgs[i].slice(1, -1) + '"';
						}
					}
				}
			}
		}
		// 25. Fix doc-comments on imports: if dataDenoDoc has such comment, remove it (because dataDoc doesn't set doc-comments on imports)
		if (dataDenoDoc.importDef && dataDoc.importDef && dataDenoDoc.jsDoc && !dataDoc.jsDoc)
		{	delete dataDenoDoc.jsDoc;
		}
		// 26. Fix optional function params: if a param on dataDenoDoc is not marked as optional, but the jsDoc on it (dataDenoDoc) has @param tag with 'optional', the set the param as optional
		if (dataDenoDoc.functionDef?.params && dataDenoDoc.jsDoc?.tags)
		{	for (const param of dataDenoDoc.functionDef.params)
			{	if (!param.optional && dataDenoDoc.jsDoc.tags.some((tag : Any) => tag.kind=='param' && tag.optional && tag.name==param.name))
				{	param.optional = true;
				}
			}
		}
		// 27. Fix doc-comments: when dataDoc has comment combined from several declarations, and dataDenoDoc has only the comment from the first declaration, copy from dataDoc
		if (parentKey=='jsDoc' && typeof(dataDenoDoc.doc)=='string' && typeof(dataDoc.doc)=='string' && dataDenoDoc.doc!=dataDoc.doc && dataDoc.doc.startsWith(dataDenoDoc.doc) && dataDoc.docTokens?.[0]?.text==dataDenoDoc.doc && dataDoc.docTokens[1]?.kind=='lineBreak')
		{	dataDenoDoc.doc = dataDoc.doc;
		}
		// 28. Fix tsType: when dataDenoDoc has `string`, and dataDoc has specific string literal, copy from dataDoc
		if (parentKey=='tsType' && dataDenoDoc.keyword==='string' && dataDoc.literal?.kind==='string')
		{	dataDenoDoc.repr = dataDoc.repr;
			dataDenoDoc.kind = dataDoc.kind;
			dataDenoDoc.literal = dataDoc.literal;
			delete dataDenoDoc.keyword;
		}
		// 29. Fix accessibility and readonly: if they come from doc-comments tags, set them on dataDenoDoc
		if (dataDenoDoc.properties && dataDoc.properties)
		{	for (let i=0; i<dataDenoDoc.properties.length && dataDoc.properties.length; i++)
			{	if (dataDenoDoc.properties[i].accessibility==undefined && dataDoc.properties[i].accessibility!=undefined && dataDoc.properties[i].jsDoc?.tags)
				{	for (const tag of dataDoc.properties[i].jsDoc.tags)
					{	if (tag.kind=='public' || tag.kind=='protected' || tag.kind=='private')
						{	dataDenoDoc.properties[i].accessibility = tag.kind;
							break;
						}
					}
				}
				if (!dataDenoDoc.properties[i].readonly && dataDoc.properties[i].readonly && dataDoc.properties[i].jsDoc?.tags?.some((tag: Any) => tag.kind == 'readonly'))
				{	dataDenoDoc.properties[i].readonly = true;
				}
			}
		}
		// 30. Fix `exports`: if dataDoc has them, copy to dataDenoDoc
		if (parentKey=='' && Array.isArray(dataDoc.exports) && !dataDenoDoc.exports)
		{	dataDenoDoc.exports = dataDoc.exports;
		}
		// 31. Fix computed properties: if dataDenoDoc has `['name']: type` (with constant name), and dataDoc has `name: type`, then copy the property name from dataDoc
		if (dataDenoDoc.properties && dataDoc.properties)
		{	for (let i=0; i<dataDenoDoc.properties.length && dataDoc.properties.length; i++)
			{	if (dataDenoDoc.properties[i].name != dataDoc.properties[i].name && dataDenoDoc.properties[i].name[0]=='[' && (dataDenoDoc.properties[i].name==`['${dataDoc.properties[i].name}']` || dataDenoDoc.properties[i].name==`["${dataDoc.properties[i].name}"]`))
				{	dataDenoDoc.properties[i].name = dataDoc.properties[i].name;
				}
			}
		}
		// 32. If dataDenoDoc reported `[Sym]: Type` property as `Sym: Type`, correct it
		if (parentKey=='' && dataDoc.name==='['+dataDenoDoc.name+']')
		{	dataDenoDoc.name = dataDoc.name;
		}
	}
}

/**	Like `makeCompatible()`, but step 2.
 **/
function makeCompatible2(dataDoc: Any, dataDenoDoc: Any)
{	if (Array.isArray(dataDoc) && Array.isArray(dataDenoDoc))
	{	// 1. Do recursive
		for (let i=0; i<dataDoc.length && i<dataDenoDoc.length; i++)
		{	makeCompatible2(dataDoc[i], dataDenoDoc[i]);
		}
	}
	else if (typeof(dataDoc)=='object' && typeof(dataDenoDoc)=='object')
	{	// 1. Do recursive
		for (const [k, v] of Object.entries(dataDoc))
		{	makeCompatible2(v, dataDenoDoc[k]);
		}
		// 2. Fix `repr`
		if (typeof(dataDenoDoc.repr)=='string' && typeof(dataDoc.repr)=='string' && dataDoc.repr.startsWith(dataDenoDoc.repr+'<'))
		{	// when dataDoc has `Map<string, number>`, dataDenoDoc has `Map`. in such cases copy dataDoc -> dataDenoDoc
			dataDenoDoc.repr = dataDoc.repr;
		}
		if (typeof(dataDoc.repr)=='string' && dataDoc.repr.startsWith('typeof ') && typeof(dataDenoDoc.repr)=='string' && !dataDenoDoc.repr.startsWith('typeof '))
		{	dataDenoDoc.repr = 'typeof ' + dataDenoDoc.repr;
		}
		// 3. Fix undefined props
		for (const [k, v] of Object.entries(dataDenoDoc))
		{	if (v==undefined && !(k in dataDoc))
			{	delete dataDenoDoc[k];
			}
		}
	}
}

export async function testDoc(subjUrl: URL, compilerOptions?: tsa.CompilerOptions, saveToFiles=false)
{	const subjName = new URL('.', subjUrl).pathname.replace(/\/?$/, '').match(/[^\/]*$/)![0];

	const loadOptions: LoadOptions = {};
	const docOptions: DocOptions = {};
	const importMapUrl = new URL('./import_map.json', subjUrl);

	compilerOptions =
	{	declaration: true,
		emitDeclarationOnly: true,
		...compilerOptions,
	};
	const host = tsa.createCompilerHost(compilerOptions);
	if (host.fileExists(path.fromFileUrl(importMapUrl)))
	{	loadOptions.importMap = importMapUrl.href;
		docOptions.importMap = importMapUrl.href;
	}
	const program = await tsa.createTsaProgram([subjUrl.href], compilerOptions, loadOptions, host);
	printDiagnostics(tsa.getPreEmitDiagnostics(program));

	console.time('tsa');
	const dataFullDoc: DenoDocNode[] = program.emitDoc({includeReferenced: true}).nodes;
	console.timeEnd('tsa');

	const dataDoc: DenoDocNode[] = program.emitDoc().nodes;

	const tmpDir = await getTmpDirname();

	console.time('deno');
	const dataDenoDoc: DenoDocNode[] = await denoDoc(subjUrl.href, docOptions);
	//const dataDenoDoc = JSON.parse(readTextFile(host, path.join(tmpDir, `deno-${subjName}-classic.json`)));
	console.timeEnd('deno');

	if (saveToFiles)
	{	writeTextFile(host, path.join(tmpDir, `deno-${subjName}-classic.json`), JSON.stringify(dataDenoDoc, undefined, '\t'));
		writeTextFile(host, path.join(tmpDir, `deno-${subjName}-td.json`), JSON.stringify(dataFullDoc, undefined, '\t'));
	}

	makeCompatible(dataDoc, dataDenoDoc, subjUrl.href);
	makeCompatible2(dataDoc, dataDenoDoc);

	if (saveToFiles)
	{	writeTextFile(host, path.join(tmpDir, `deno-${subjName}-classic-compat.json`), JSON.stringify(dataDenoDoc, undefined, '\t'));
		writeTextFile(host, path.join(tmpDir, `deno-${subjName}-td-compat.json`), JSON.stringify(dataDoc, undefined, '\t'));
	}

	assertEquals(dataDoc, dataDenoDoc);
}
