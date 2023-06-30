import {tsa} from '../../tsa.ts';
import {DocNode} from '../../types/mod.ts';
import {convertLocation} from './convert_location.ts';
import {Converter} from './converter.ts';

export function convertImport(ts: typeof tsa, converter: Converter, declaration: tsa.ImportDeclaration, outNodes: DocNode[])
{	if (declaration.importClause)
	{	const {moduleSpecifier, importClause: {name, namedBindings}} = declaration;
		if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier))
		{	const importHref = converter.loader.resolve(moduleSpecifier.text, declaration.getSourceFile().fileName);
			const elements = namedBindings && ts.isNamedImports(namedBindings) ? namedBindings.elements ?? [] : [{propertyName: 'default', name}];
			for (const {propertyName, name} of elements)
			{	if (name)
				{	outNodes.push
					(	{	kind: 'import',
							name: name.getText(),
							location: convertLocation(ts, converter, declaration),
							declarationKind: 'private',
							importDef:
							{	src: importHref,
								imported: typeof(propertyName)=='string' ? propertyName : propertyName ? propertyName.getText() : name.getText(),
							}
						}
					);
				}
			}
		}
	}
}
