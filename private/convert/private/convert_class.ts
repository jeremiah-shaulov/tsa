import {tsa} from '../../tsa_ns.ts';
import {ClassDef, ClassConstructorDef, ClassPropertyDef, ClassMethodDef, ClassConstructorParamDef} from '../../doc_node/mod.ts';
import {convertJsDoc} from './convert_js_doc.ts';
import {convertLocation} from './convert_location.ts';
import {convertDecorators} from './convert_decorators.ts';
import {convertParameter} from './convert_parameter.ts';
import {convertTypeParameter} from './convert_type_parameter.ts';
import {convertDefaultValue} from './convert_expression.ts';
import {convertAccessibility} from './convert_accessibility.ts';
import {convertType} from './convert_type.ts';
import {getHeritageTypes, setMemberName, getTypeNodeOfDeclaration, removeUndefined, resolveSymbol} from './util.ts';
import {convertIndexSignature, convertSignatureReturnType} from './convert_index_signature.ts';
import {Converter} from './converter.ts';

export function convertClass(ts: typeof tsa, converter: Converter, classDeclaration: tsa.ClassDeclaration, symbol: tsa.Symbol): ClassDef|undefined
{	const instanceType = converter.checker.getDeclaredTypeOfSymbol(symbol);
	const staticType = converter.checker.getTypeOfSymbolAtLocation(symbol, classDeclaration);
	if (instanceType.isClass())
	{	const implementsTypes = getHeritageTypes(ts, symbol.getDeclarations(), ts.SyntaxKind.ImplementsKeyword).map(t => convertType(ts, converter, t));
		const indexSignatures = converter.checker.getIndexInfosOfType?.(instanceType).map(index => convertIndexSignature(ts, converter, index)) ?? []; // getIndexInfosOfType is since typescript 4.4
		const constructors = new Array<ClassConstructorDef>;
		const properties = new Array<ClassPropertyDef>;
		const methods = new Array<ClassMethodDef>;

		for (const sig of staticType.getConstructSignatures())
		{	const declaration = sig.getDeclaration();
			if (declaration && !converter.ignoreDeclaration(declaration))
			{	const jsDoc = convertJsDoc(ts, converter, sig.getDocumentationComment(converter.checker), declaration);
				const modifiers = ts.getCombinedModifierFlags(declaration);
				const accessibility = modifiers & ts.ModifierFlags.Private ? 'private' : modifiers & ts.ModifierFlags.Protected ? 'protected' : modifiers & ts.ModifierFlags.Public ? 'public' : undefined;
				const params = new Array<ClassConstructorParamDef>;
				const {parameters} = sig;
				for (let i=0, iEnd=parameters.length; i<iEnd; i++)
				{	const paramDecl = declaration.parameters[i];
					const param = convertParameter(ts, converter, parameters[i], paramDecl, true);
					if ((param.accessibility || param.readonly) && declaration.parent==classDeclaration)
					{	let init: string|undefined;
						let param2 = param;
						if (param.kind == 'assign')
						{	param2 = param.left;
							init = param.right;
						}
						if (param2.kind == 'identifier')
						{	let doc = convertJsDoc(ts, converter, parameters[i].getDocumentationComment(converter.checker), declaration);
							if (!doc)
							{	const tags = jsDoc?.jsDoc.tags;
								if (tags)
								{	for (const t of tags)
									{	if (t.kind=='param' && t.name==param2.name)
										{	doc = {jsDoc: {doc: t.doc, docTokens: t.docTokens}};
											break;
										}
									}
								}
							}
							properties.push
							(	{	tsType: param2.tsType,
									readonly: param2.readonly ?? false,
									accessibility: param2.accessibility,
									optional: param2.optional,
									isAbstract: false,
									isStatic: false,
									isOverride: param2.isOverride,
									name: param2.name,
									decorators: param2.decorators,
									location: convertLocation(ts, converter, paramDecl),
									init,
									...doc,
								}
							);
						}
						param.accessibility = undefined;
						param.readonly = false;
					}
					params.push(param);
				}
				constructors.push
				(	{	...jsDoc,
						hasBody: true,
						name: 'constructor',
						params,
						...(accessibility && {accessibility}),
						location: convertLocation(ts, converter, declaration),
					}
				);
			}
		}

		for (const type of [staticType, instanceType])
		{	for (const symbol of converter.checker.getPropertiesOfType(type))
			{	if (symbol.valueDeclaration?.parent == classDeclaration) // filter out inherited properties
				{	if (!converter.ignoreDeclaration(symbol.valueDeclaration))
					{	convertClassProperty(ts, converter, symbol, type==staticType, properties, methods);
					}
				}
			}
		}

		const classDef: ClassDef =
		{	isAbstract: !!(ts.getCombinedModifierFlags(classDeclaration) & ts.ModifierFlags.Abstract),
			constructors,
			properties,
			indexSignatures,
			methods,
			implements: implementsTypes,
			typeParams: instanceType.typeParameters?.map(param => convertTypeParameter(ts, converter, param)!).filter(p => p) ?? [],
			superTypeParams: [],
			...convertDecorators(ts, converter, classDeclaration.modifiers),
		};
		addExtends(ts, converter, symbol, classDef);
		return classDef;
	}
}

function addExtends(ts: typeof tsa, converter: Converter, symbol: tsa.Symbol, outClassDef: ClassDef)
{	const extendsType = getHeritageTypes(ts, symbol.getDeclarations(), ts.SyntaxKind.ExtendsKeyword)[0];
	const extendsSymbol = extendsType && resolveSymbol(ts, converter.checker, converter.checker.getSymbolAtLocation(extendsType.expression));
	if (extendsSymbol)
	{	outClassDef.extends = extendsSymbol.name;
		if (extendsType.typeArguments?.length)
		{	outClassDef.superTypeParams = extendsType.typeArguments?.map(type => convertType(ts, converter, type));
		}
		converter.addTypeRef(outClassDef, extendsSymbol, undefined, extendsType);
	}
}

function convertClassProperty(ts: typeof tsa, converter: Converter, symbol: tsa.Symbol, isStatic: boolean, outProperties: ClassPropertyDef[], outMethods: ClassMethodDef[])
{	for (const declaration of symbol.getDeclarations() ?? [])
	{	if (ts.isGetAccessorDeclaration(declaration) || ts.isSetAccessorDeclaration(declaration))
		{	if (!ts.isPrivateIdentifier(declaration.name))
			{	const sig = converter.checker.getSignatureFromDeclaration(declaration);
				const isOverride = declaration.modifiers?.some(m => m.kind == ts.SyntaxKind.OverrideKeyword) ?? false;
				outMethods.push
				(	setMemberName
					(	ts,
						converter,
						{	...convertJsDoc(ts, converter, (sig ?? symbol)?.getDocumentationComment(converter.checker), declaration),
							...convertAccessibility(ts, declaration.modifiers),
							optional: declaration.questionToken != undefined,
							isAbstract: declaration.modifiers?.some(m => m.kind == ts.SyntaxKind.AbstractKeyword) ?? false,
							isStatic,
							...(isOverride && {isOverride}),
							name: symbol.name,
							kind: ts.isGetAccessorDeclaration(declaration) ? 'getter' : 'setter',
							functionDef:
							{	params: sig?.parameters.map(param => convertParameter(ts, converter, param)) ?? [],
								...(ts.isGetAccessorDeclaration(declaration) ? {returnType: removeUndefined(convertType(ts, converter, sig?.getReturnType()), declaration.questionToken!=undefined)} : undefined),
								hasBody: declaration.body != undefined,
								isAsync: false,
								isGenerator: false,
								typeParams: [],
								...convertDecorators(ts, converter, declaration.modifiers),
							},
							location: convertLocation(ts, converter, declaration),
						},
						declaration.name
					)
				);
			}
		}
		else if (ts.isMethodDeclaration(declaration) || ts.isMethodSignature(declaration))
		{	if (!ts.isPrivateIdentifier(declaration.name))
			{	const sig = converter.checker.getSignatureFromDeclaration(declaration);
				const isOverride = declaration.modifiers?.some(m => m.kind == ts.SyntaxKind.OverrideKeyword) ?? false;
				outMethods.push
				(	setMemberName
					(	ts,
						converter,
						{	...convertJsDoc(ts, converter, (sig ?? symbol)?.getDocumentationComment(converter.checker), declaration),
							...convertAccessibility(ts, declaration.modifiers),
							optional: declaration.questionToken != undefined,
							isAbstract: declaration.modifiers?.some(m => m.kind == ts.SyntaxKind.AbstractKeyword) ?? false,
							isStatic,
							...(isOverride && {isOverride}),
							name: symbol.name,
							kind: 'method',
							functionDef:
							{	params: sig?.parameters.map((param, i) => convertParameter(ts, converter, param, declaration.parameters[i])) ?? [],
								returnType: convertSignatureReturnType(ts, converter, sig),
								hasBody: 'body' in declaration && declaration.body!=undefined,
								isAsync: declaration.modifiers?.some(m => m.kind == ts.SyntaxKind.AsyncKeyword) ?? false,
								isGenerator: ts.isMethodDeclaration(declaration) && !!declaration.asteriskToken,
								typeParams: sig?.typeParameters?.map(param => convertTypeParameter(ts, converter, param)!).filter(param => param) ?? [],
								...convertDecorators(ts, converter, declaration.modifiers),
							},
							location: convertLocation(ts, converter, declaration),
						},
						declaration.name
					)
				);
			}
		}
		else
		{	const propertyName = ts.isPropertyDeclaration(declaration) ? declaration.name : undefined;
			if (!propertyName || !ts.isPrivateIdentifier(propertyName))
			{	const modifiers = ts.getCombinedModifierFlags(declaration);
				const accessibility = modifiers & ts.ModifierFlags.Private ? 'private' : modifiers & ts.ModifierFlags.Protected ? 'protected' : modifiers & ts.ModifierFlags.Public ? 'public' : undefined;
				const readonly = !!(modifiers & ts.ModifierFlags.Readonly);
				const optional = !!(symbol.flags & ts.SymbolFlags.Optional);
				const tsType = removeUndefined(convertType(ts, converter, symbol.valueDeclaration && (getTypeNodeOfDeclaration(ts, symbol.valueDeclaration) ?? converter.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration))), optional);
				const isOverride = !!(modifiers & ts.ModifierFlags.Override);
				const isAbstract = !!(modifiers & ts.ModifierFlags.Abstract);
				const isAccessor = !!(modifiers & ts.ModifierFlags.Accessor);
				if (readonly && tsType?.kind==='fnOrConstructor') // if is readonly property assigned to a function or lambda instance: treat as method
				{	outMethods.push
					(	setMemberName
						(	ts,
							converter,
							{	...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), symbol.valueDeclaration),
								...(accessibility && {accessibility}),
								optional,
								isAbstract,
								isStatic,
								...(isOverride && {isOverride}),
								name: symbol.name,
								kind: 'method',
								functionDef:
								{	params: tsType.fnOrConstructor.params,
									returnType: tsType.fnOrConstructor.tsType,
									hasBody: true,
									isAsync: false,
									isGenerator: false,
									typeParams: tsType.fnOrConstructor.typeParams,
									...((ts.isPropertyDeclaration(declaration) || ts.isPropertySignature(declaration)) && convertDecorators(ts, converter, declaration.modifiers)),
								},
								location: convertLocation(ts, converter, declaration),
							},
							propertyName
						)
					);
				}
				else
				{	const init = convertDefaultValue(ts, declaration);
					outProperties.push
					(	setMemberName
						(	ts,
							converter,
							{	...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), symbol.valueDeclaration),
								tsType,
								readonly,
								...((ts.isPropertyDeclaration(declaration) || ts.isPropertySignature(declaration)) && convertDecorators(ts, converter, declaration.modifiers)),
								...(accessibility && {accessibility}),
								optional,
								isAbstract,
								isStatic,
								...(isOverride && {isOverride}),
								name: symbol.name,
								location: convertLocation(ts, converter, declaration),
								...(isAccessor && {isAccessor}),
								...(init && {init}),
							},
							propertyName
						)
					);
				}
			}
		}
	}
}
