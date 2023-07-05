import {tsa} from '../../tsa_ns.ts';
import {InterfaceDef, InterfaceCallSignatureDef, InterfacePropertyDef, InterfaceMethodDef} from '../../doc_node/mod.ts';
import {convertJsDoc} from './convert_js_doc.ts';
import {convertLocation} from './convert_location.ts';
import {convertTypeParameter} from './convert_type_parameter.ts';
import {convertDefaultValue} from './convert_expression.ts';
import {getHeritageTypes, getPropertySpecialName, removeUndefined} from './util.ts';
import {convertIndexSignature, convertSignatureReturnType} from './convert_index_signature.ts';
import {convertType} from './convert_type.ts';
import {convertParameter} from './convert_parameter.ts';
import {Converter} from './converter.ts';

export function convertInterface(ts: typeof tsa, converter: Converter, ifaceDeclaration: tsa.InterfaceDeclaration, symbol: tsa.Symbol): InterfaceDef|undefined
{	const instanceType = converter.checker.getDeclaredTypeOfSymbol(symbol);
	if (instanceType.isClassOrInterface())
	{	const extendsTypes = getHeritageTypes(ts, symbol.getDeclarations(), ts.SyntaxKind.ExtendsKeyword).map(t => convertType(ts, converter, t));
		const indexSignatures = converter.checker.getIndexInfosOfType?.(instanceType).map(index => convertIndexSignature(ts, converter, index)) ?? []; // getIndexInfosOfType is since typescript 4.4

		const callSignatures = new Array<InterfaceCallSignatureDef>;
		for (const sig of instanceType.getCallSignatures())
		{	const declaration = sig.getDeclaration();
			if (declaration && !converter.ignoreDeclaration(declaration))
			{	callSignatures.push
				(	{	location: convertLocation(ts, converter, declaration),
						params: sig.parameters.map((p, i) => convertParameter(ts, converter, p, declaration.parameters[i])),
						tsType: convertSignatureReturnType(ts, converter, sig),
						typeParams: sig.typeParameters?.map(param => convertTypeParameter(ts, converter, param)!).filter(p => p) ?? [],
						...convertJsDoc(ts, converter, sig.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
					}
				);
			}
		}

		const properties = new Array<InterfacePropertyDef>;
		const methods = new Array<InterfaceMethodDef>;
		for (const symbol of converter.checker.getPropertiesOfType(instanceType))
		{	if (symbol.valueDeclaration?.parent == ifaceDeclaration) // filter out inherited properties
			{	if (!converter.ignoreDeclaration(symbol.valueDeclaration))
				{	convertInterfaceProperty(ts, converter, symbol, properties, methods);
				}
			}
		}

		// Construct signatures
		for (const sig of instanceType.getConstructSignatures())
		{	const declaration = sig.getDeclaration();
			if (declaration && !converter.ignoreDeclaration(declaration))
			{	methods.push
				(	{	name: 'new',
						kind: 'method',
						location: convertLocation(ts, converter, declaration),
						...convertJsDoc(ts, converter, sig.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
						optional: false,
						params: sig.parameters.map((p, i) => convertParameter(ts, converter, p, declaration.parameters[i])),
						returnType: convertType(ts, converter, sig.getReturnType()),
						typeParams: sig.typeParameters?.map(param => convertTypeParameter(ts, converter, param)!).filter(p => p) ?? [],
					}
				);
			}
		}

		return {
			extends: extendsTypes,
			methods,
			properties,
			callSignatures,
			indexSignatures,
			typeParams: instanceType.typeParameters?.map(param => convertTypeParameter(ts, converter, param)!).filter(p => p) ?? [],
		};
	}
}

function convertInterfaceProperty(ts: typeof tsa, converter: Converter, symbol: tsa.Symbol, outProperties: InterfacePropertyDef[], outMethods: InterfaceMethodDef[])
{	for (const declaration of symbol.getDeclarations() ?? [])
	{	if (ts.isGetAccessorDeclaration(declaration) || ts.isSetAccessorDeclaration(declaration))
		{	const sig = converter.checker.getSignatureFromDeclaration(declaration);
			outMethods.push
			(	{	name: getPropertySpecialName(ts, declaration.name, true) ?? symbol.name,
					kind: ts.isGetAccessorDeclaration(declaration) ? 'getter' : 'setter',
					location: convertLocation(ts, converter, declaration),
					...convertJsDoc(ts, converter, (sig ?? symbol)?.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
					...(ts.isComputedPropertyName(declaration.name) ? {computed: true} : undefined),
					optional: declaration.questionToken != undefined,
					params: sig?.parameters.map(param => convertParameter(ts, converter, param)) ?? [],
					...(ts.isGetAccessorDeclaration(declaration) ? {returnType: removeUndefined(convertType(ts, converter, sig?.getReturnType()), declaration.questionToken!=undefined)} : undefined),
					typeParams: [],
				}
			);
		}
		else if (ts.isMethodDeclaration(declaration) || ts.isMethodSignature(declaration))
		{	const sig = converter.checker.getSignatureFromDeclaration(declaration);
			outMethods.push
			(	{	name: getPropertySpecialName(ts, declaration.name, true) ?? symbol.name,
					kind: 'method',
					location: convertLocation(ts, converter, declaration),
					...convertJsDoc(ts, converter, (sig ?? symbol)?.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
					...(ts.isComputedPropertyName(declaration.name) ? {computed: true} : undefined),
					optional: declaration.questionToken != undefined,
					params: sig?.parameters.map((param, i) => convertParameter(ts, converter, param, declaration.parameters[i])) ?? [],
					returnType: convertSignatureReturnType(ts, converter, sig),
					typeParams: sig?.typeParameters?.map(param => convertTypeParameter(ts, converter, param)!).filter(param => param) ?? [],
				}
			);
		}
		else
		{	const propertyName = ts.isPropertyDeclaration(declaration) || ts.isPropertySignature(declaration) ? declaration.name : undefined;
			const modifiers = ts.getCombinedModifierFlags(declaration);
			const readonly = !!(modifiers & ts.ModifierFlags.Readonly);
			const optional = !!(symbol.flags & ts.SymbolFlags.Optional);
			const tsType = removeUndefined(convertType(ts, converter, symbol.valueDeclaration && converter.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)), optional);
			if (readonly && tsType?.kind==='fnOrConstructor') // if is readonly property assigned to a function or lambda instance: treat as method
			{	outMethods.push
				(	{	name: getPropertySpecialName(ts, propertyName, true) ?? symbol.name,
						kind: 'method',
						location: convertLocation(ts, converter, declaration),
						...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), symbol.valueDeclaration && ts.getJSDocTags(symbol.valueDeclaration)),
						...(propertyName && ts.isComputedPropertyName(propertyName) ? {computed: true} : undefined),
						optional,
						params: tsType.fnOrConstructor.params,
						returnType: tsType.fnOrConstructor.tsType,
						typeParams: tsType.fnOrConstructor.typeParams,
					}
				);
			}
			else if (!outProperties.some(p => p.name == symbol.name))
			{	const init = convertDefaultValue(ts, declaration);
				outProperties.push
				(	{	name: getPropertySpecialName(ts, propertyName, true) ?? symbol.name,
						location: convertLocation(ts, converter, declaration),
						...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), symbol.valueDeclaration && ts.getJSDocTags(symbol.valueDeclaration)),
						...(init && {init}),
						params: [],
						...(readonly && {readonly}),
						computed: !!(propertyName && ts.isComputedPropertyName(propertyName)),
						optional,
						tsType,
						typeParams: [],
					}
				);
			}
		}
	}
}
