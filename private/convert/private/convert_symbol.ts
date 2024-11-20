import {tsa} from '../../tsa_ns.ts';
import {DocNode, InterfaceDef} from '../../doc_node/mod.ts';
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

export function convertSymbol(ts: typeof tsa, converter: Converter, name: string, symbol: tsa.Symbol, origSymbol: tsa.Symbol, isExportAssignment: boolean, isDeclarationFile: boolean): {declaration: tsa.Declaration, node: DocNode} | undefined
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
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment, isDeclarationFile),
								...convertJsDoc(ts, converter, getDocumentationComment(converter, symbol, origSymbol), declaration),
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
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment, isDeclarationFile),
								...convertJsDoc(ts, converter, getDocumentationComment(converter, symbol, origSymbol), declaration),
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
								...convertJsDoc(ts, converter, getDocumentationComment(converter, symbol, origSymbol), declaration),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment, isDeclarationFile),
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
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment, isDeclarationFile),
								...convertJsDoc(ts, converter, getDocumentationComment(converter, symbol, origSymbol), declaration),
								typeAliasDef,
							}
						};
					}
				}
				else if (ts.isFunctionDeclaration(declaration))
				{	const useDeclaration = declarations.find(d => ts.isFunctionDeclaration(d) && d.body!=undefined) ?? declaration;
					if (ts.isFunctionDeclaration(useDeclaration))
					{	const functionDef = convertFunction(ts, converter, useDeclaration);
						if (functionDef)
						{	return {
								declaration: useDeclaration,
								node:
								{	kind: 'function',
									name,
									location: convertLocation(ts, converter, useDeclaration),
									...convertJsDoc(ts, converter, getDocumentationComment(converter, symbol, origSymbol), useDeclaration),
									declarationKind: getDeclarationKind(ts, useDeclaration, isExportAssignment, isDeclarationFile),
									functionDef,
								}
							};
						}
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
								...convertJsDoc(ts, converter, getDocumentationComment(converter, symbol, origSymbol), declaration),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment, isDeclarationFile),
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
								...convertJsDoc(ts, converter, getDocumentationComment(converter, symbol, origSymbol), declaration),
								declarationKind: getDeclarationKind(ts, declaration, isExportAssignment, isDeclarationFile),
								typeAliasDef:
								{	tsType,
									typeParams: [],
								},
							}
						};
					}
				}
				else if (ts.isSourceFile(declaration))
				{	const node = converter.convertNamespace(declaration, declaration.fileName, name, convertLocation(ts, converter, declaration));
					return {declaration, node};
				}
				else if (ts.isModuleDeclaration(declaration))
				{	const node = converter.convertNamespace(declaration, '', name, convertLocation(ts, converter, declaration));
					node.jsDoc = convertJsDoc(ts, converter, getDocumentationComment(converter, symbol, origSymbol), declaration)?.jsDoc;
					return {declaration, node};
				}
			}
		}
	}
}

function getDocumentationComment(converter: Converter, symbol: tsa.Symbol, origSymbol: tsa.Symbol)
{	const parts = origSymbol.getDocumentationComment(converter.checker);
	const parts2 = symbol.getDocumentationComment(converter.checker);
	if (parts?.length)
	{	if (parts2?.length && !parts.includes(parts2[0]))
		{	return parts.concat([{kind: 'lineBreak', text: ''}]).concat(parts2);
		}
		return parts;
	}
	else
	{	return parts2;
	}
}

function getDeclarationKind(ts: typeof tsa, declaration: tsa.Declaration, isExportAssignment: boolean, isDeclarationFile: boolean)
{	if (isExportAssignment)
	{	return 'export';
	}
	if (isDeclarationFile)
	{	return 'declare';
	}
	const flags = ts.getCombinedModifierFlags(declaration);
	return flags & ts.ModifierFlags.Export ? 'export' : flags & ts.ModifierFlags.Ambient ? 'declare' : 'private';
}
