import {tsa} from '../../tsa_ns.ts';

export function symbolIsType(ts: typeof tsa, resolvedSymbol: tsa.Symbol)
{	return !!(resolvedSymbol.flags & (ts.SymbolFlags.Interface | ts.SymbolFlags.TypeAlias));
}

export function resolveSymbol(ts: typeof tsa, checker: tsa.TypeChecker, symbol?: tsa.Symbol)
{	if (symbol && (symbol.flags & ts.SymbolFlags.Alias))
	{	symbol = checker.getAliasedSymbol(symbol);
	}
	return symbol;
}

export function getNames(ts: typeof tsa, name: tsa.BindingName, outNames=new Array<tsa.Identifier>)
{	if (!ts.isIdentifier(name))
	{	for (const e of name.elements)
		{	if (!ts.isOmittedExpression(e))
			{	getNames(ts, e.name, outNames);
			}
		}
	}
	else
	{	outNames.push(name);
	}
	return outNames;
}

export function unexportOrRenameStmt(ts: typeof tsa, context: tsa.TransformationContext, node: tsa.Node, wantUnexport: boolean, renames?: Map<tsa.Identifier, string>)
{	if (ts.isFunctionDeclaration(node))
	{	node = context.factory.updateFunctionDeclaration
		(	node,
			wantUnexport ? unexportModifiers(ts, node.modifiers) : node.modifiers,
			node.asteriskToken,
			renameIdentifier(context, node.name, renames),
			node.typeParameters,
			node.parameters,
			node.type,
			node.body
		);
	}
	else if (ts.isClassDeclaration(node))
	{	node = context.factory.updateClassDeclaration
		(	node,
			wantUnexport ? unexportModifiers(ts, node.modifiers) : node.modifiers,
			renameIdentifier(context, node.name, renames),
			node.typeParameters,
			node.heritageClauses,
			node.members
		);
	}
	else if (ts.isInterfaceDeclaration(node))
	{	node = context.factory.updateInterfaceDeclaration
		(	node,
			wantUnexport ? unexportModifiers(ts, node.modifiers) : node.modifiers,
			renameIdentifier(context, node.name, renames),
			node.typeParameters,
			node.heritageClauses,
			node.members
		);
	}
	else if (ts.isEnumDeclaration(node))
	{	node = context.factory.updateEnumDeclaration
		(	node,
			wantUnexport ? unexportModifiers(ts, node.modifiers) : node.modifiers,
			renameIdentifier(context, node.name, renames),
			node.members
		);
	}
	else if (ts.isTypeAliasDeclaration(node))
	{	node = context.factory.updateTypeAliasDeclaration
		(	node,
			wantUnexport ? unexportModifiers(ts, node.modifiers) : node.modifiers,
			renameIdentifier(context, node.name, renames),
			node.typeParameters,
			node.type
		);
	}
	else if (ts.isVariableStatement(node))
	{	node = context.factory.updateVariableStatement
		(	node,
			wantUnexport ? unexportModifiers(ts, node.modifiers) : node.modifiers,
			!renames ? node.declarationList : context.factory.updateVariableDeclarationList
			(	node.declarationList,
				node.declarationList.declarations.map
				(	d => context.factory.updateVariableDeclaration
					(	d,
						renameBindingName(ts, context, d.name, renames),
						d.exclamationToken,
						d.type,
						d.initializer
					)
				)
			)
		);
	}
	return node;
}

function unexportModifiers(ts: typeof tsa, modifiers?: tsa.NodeArray<tsa.ModifierLike>)
{	const i = modifiers?.findIndex(m => m.kind == ts.SyntaxKind.ExportKeyword) ?? -1;
	if (i==-1 || !modifiers)
	{	return modifiers;
	}
	else
	{	return modifiers.slice(0, i).concat(modifiers.slice(i+1))
	}
}

function renameIdentifier<T extends tsa.Identifier|undefined>(context: tsa.TransformationContext, name: T, renames?: Map<tsa.Identifier, string>)
{	const rename = name && renames?.get(name);
	return rename==undefined ? name : context.factory.createIdentifier(rename);
}

function renameBindingName(ts: typeof tsa, context: tsa.TransformationContext, name: tsa.BindingName, renames: Map<tsa.Identifier, string>): tsa.BindingName
{	if (ts.isObjectBindingPattern(name))
	{	return context.factory.updateObjectBindingPattern
		(	name,
			name.elements.map
			(	d => context.factory.updateBindingElement
				(	d,
					d.dotDotDotToken,
					d.propertyName,
					renameBindingName(ts, context, d.name, renames),
					d.initializer
				)
			)
		);
	}
	else if (ts.isArrayBindingPattern(name))
	{	return context.factory.updateArrayBindingPattern
		(	name,
			name.elements.map
			(	d =>
				(	!ts.isBindingElement(d) ? d : context.factory.updateBindingElement
					(	d,
						d.dotDotDotToken,
						d.propertyName,
						renameBindingName(ts, context, d.name, renames),
						d.initializer
					)
				)
			)
		);
	}
	else
	{	return renameIdentifier(context, name, renames);
	}
}
