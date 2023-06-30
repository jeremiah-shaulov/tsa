import {tsa} from '../../tsa_ns.ts';
import {DocNode, InterfaceDef} from '../../types/mod.ts';
import {convertJsDoc} from './convert_js_doc.ts';
import {convertLocation} from './convert_location.ts';
import {convertClass} from './convert_class.ts';
import {convertInterface} from './convert_interface.ts';
import {convertEnum} from './convert_enum.ts';
import {convertTypeAlias} from './convert_type_alias.ts';
import {convertFunction} from './convert_function.ts';
import {convertVar} from './convert_var.ts';
import {Converter} from './converter.ts';
import {convertType, TYPE_NOT_DETECTED} from './convert_type.ts';

export function convertSymbol(ts: typeof tsa, converter: Converter, name: string, symbol: tsa.Symbol, isExportAssignment: boolean): {declaration: tsa.Declaration, node: DocNode} | undefined
{	const declarations = symbol.getDeclarations();
	if (declarations)
	{	for (const declaration of declarations)
		{	if (!converter.ignoreDeclaration(declaration))
			{	if (ts.isClassDeclaration(declaration))
				{	const classDef = convertClass(ts, converter, declaration, symbol);
					if (classDef)
					{	return {
							declaration,
							node:
							{	kind: 'class',
								name,
								location: convertLocation(ts, converter, declaration),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment),
								...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
								classDef,
							}
						};
					}
				}
				else if (ts.isInterfaceDeclaration(declaration))
				{	let interfaceDef: InterfaceDef|undefined;
					for (const declaration of declarations)
					{	if (ts.isInterfaceDeclaration(declaration))
						{	const curInterfaceDef = convertInterface(ts, converter, declaration, symbol);
							if (curInterfaceDef)
							{	if (!interfaceDef)
								{	interfaceDef = curInterfaceDef;
								}
								else
								{	// merge 2 declarations
									interfaceDef.methods = interfaceDef.methods.concat(curInterfaceDef.methods);
									interfaceDef.callSignatures = interfaceDef.callSignatures.concat(curInterfaceDef.callSignatures);
									interfaceDef.indexSignatures = interfaceDef.indexSignatures.concat(curInterfaceDef.indexSignatures);
									interfaceDef.typeParams = interfaceDef.typeParams.concat(curInterfaceDef.typeParams);
									for (const ce of curInterfaceDef.extends)
									{	if (!interfaceDef.extends.some(e => e.repr == ce.repr))
										{	interfaceDef.extends.push(ce);
										}
									}
									for (const ce of curInterfaceDef.properties)
									{	if (!interfaceDef.properties.some(e => e.name == ce.name))
										{	interfaceDef.properties.push(ce);
										}
									}
								}
							}
						}
					}
					if (interfaceDef)
					{	return {
							declaration,
							node:
							{	kind: 'interface',
								name,
								location: convertLocation(ts, converter, declaration),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment),
								...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
								interfaceDef,
							}
						};
					}
				}
				else if (ts.isEnumDeclaration(declaration))
				{	const enumDef = convertEnum(ts, converter, declaration, symbol);
					if (enumDef)
					{	return {
							declaration,
							node:
							{	kind: 'enum',
								name,
								location: convertLocation(ts, converter, declaration),
								...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment),
								enumDef,
							}
						};
					}
				}
				else if (ts.isTypeAliasDeclaration(declaration))
				{	const typeAliasDef = convertTypeAlias(ts, converter, declaration);
					if (typeAliasDef)
					{	return {
							declaration,
							node:
							{	kind: 'typeAlias',
								name,
								location: convertLocation(ts, converter, declaration),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment),
								...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
								typeAliasDef,
							}
						};
					}
				}
				else if (ts.isFunctionDeclaration(declaration))
				{	const functionDef = convertFunction(ts, converter, declaration);
					if (functionDef)
					{	return {
							declaration,
							node:
							{	kind: 'function',
								name,
								location: convertLocation(ts, converter, declaration),
								...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment),
								functionDef,
							}
						};
					}
				}
				else if (ts.isVariableDeclaration(declaration))
				{	const variableDef = convertVar(ts, converter, declaration, symbol);
					if (variableDef)
					{	return {
							declaration,
							node:
							{	kind: 'variable',
								name,
								location: convertLocation(ts, converter, declaration),
								...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment),
								variableDef,
							}
						};
					}
				}
				else if (ts.isJSDocTypeLiteral(declaration))
				{	const tsType = convertType(ts, converter, declaration)
					if (tsType != TYPE_NOT_DETECTED)
					{	return {
							declaration,
							node:
							{	kind: 'typeAlias',
								name,
								location: convertLocation(ts, converter, declaration),
								...convertJsDoc(ts, converter, symbol.getDocumentationComment(converter.checker), ts.getJSDocTags(declaration)),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment),
								typeAliasDef:
								{	tsType,
									typeParams: [],
								},
							}
						};
					}
				}
				else if (ts.isSourceFile(declaration))
				{	const node = converter.convertNamespace(declaration.fileName, name, convertLocation(ts, converter, declaration));
					return {declaration, node};
				}
			}
		}
	}
}

function getDeclarationKind(ts: typeof tsa, declaration: tsa.Declaration, isExportAssignment: boolean)
{	if (isExportAssignment)
	{	return 'export';
	}
	const flags = ts.getCombinedModifierFlags(declaration);
	return flags & ts.ModifierFlags.Export ? 'export' : flags & ts.ModifierFlags.Ambient ? 'declare' : 'private';
}
