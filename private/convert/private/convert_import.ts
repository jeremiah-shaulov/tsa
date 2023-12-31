import {tsa} from '../../tsa_ns.ts';
import {DocNode} from '../../doc_node/mod.ts';
import {convertLocation} from './convert_location.ts';
import {Converter} from './converter.ts';

export function convertImport(ts: typeof tsa, converter: Converter, declaration: tsa.ImportDeclaration, outNodes: DocNode[])
{	if (declaration.importClause)
	{	const {moduleSpecifier, importClause: {name, namedBindings}} = declaration;
		if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier))
		{	const importHref = converter.loader.resolved(moduleSpecifier.text, declaration.getSourceFile().fileName);
			if (importHref)
			{	const elements = namedBindings && ts.isNamedImports(namedBindings) ? namedBindings.elements ?? [] : [{propertyName: 'default', name}];
				for (const {propertyName, name} of elements)
				{	if (name)
					{	outNodes.push
						(	{	kind: 'import',
								name: name.text,
								location: convertLocation(ts, converter, declaration),
								declarationKind: 'private',
								importDef:
								{	src: importHref,
									imported: typeof(propertyName)=='string' ? propertyName : propertyName ? propertyName.text : name.text,
								}
							}
						);
					}
				}
			}
		}
	}
}
