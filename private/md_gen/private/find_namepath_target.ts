import {DocNode, TsTypeDef, ClassPropertyDef, ClassMethodDef, InterfacePropertyDef, InterfaceMethodDef, EnumMemberDef, LiteralMethodDef, LiteralPropertyDef} from '../../doc_node/mod.ts';

const RE_LINK_PATH = /((?:\p{L}|\p{N}|_)+|"[^"\\]*(?:\\.[^"\\]*)*")\s*(?:\((?:[^)"']|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')*\))?/yu;
const RE_BACKSLASH_ESCAPE = /\\./g;

/**	`@`link tags allow to point to a node, or to a member of a node by so called namepath.

	Examples of namepaths:
	- `FirstClass`
	- `FirstClass.staticProp`
	- `FirstClass.staticMethod`
	- `FirstClass.staticMethod()`
	- `FirstClass#instanceProp`
	- `FirstClass.instanceProp`
	- etc.

	Instance properties and methods can be accessed by both `#` and `.`.
	Static ones only by `.`.
 **/
export function findNamepathTarget(nodes: DocNode[], namepath: string)
{	let pos = 0;
	let isStatic = false;
	let node: DocNode|undefined;
	let member: ClassPropertyDef|ClassMethodDef|InterfacePropertyDef|InterfaceMethodDef|LiteralMethodDef|LiteralPropertyDef|EnumMemberDef|undefined;
L:	while (pos < namepath.length)
	{	if (pos != 0)
		{	const c = namepath.charAt(pos++);
			isStatic = c == '.';
			if (!isStatic && c!='#')
			{	return;
			}
		}
		RE_LINK_PATH.lastIndex = pos;
		const m = RE_LINK_PATH.exec(namepath);
		if (!m)
		{	return;
		}
		const name = namepath.charAt(pos)=='"' ? m[1].slice(1, -1).replace(RE_BACKSLASH_ESCAPE, m => m.charAt(1)) : m[1];
		pos = RE_LINK_PATH.lastIndex;
		if (!node)
		{	// Find public symbol
			node = nodes.find(n => n.name==name && n.declarationKind=='export');
			if (!node)
			{	return;
			}
		}
		else
		{	if (member)
			{	// Convert `member` to `node`
				node = undefined;
				if ('tsType' in member && member.tsType)
				{	node = tsTypeToNode(nodes, member.tsType);
				}
				if (!node)
				{	return;
				}
				member = undefined;
			}
			// Get member of node
			while (true)
			{	switch (node.kind)
				{	case 'class':
						if (!isStatic)
						{	member =
							(	node.classDef.properties.find(p => p.name==name && !p.isStatic) ??
								node.classDef.methods.find(p => p.name==name && !p.isStatic)
							);
						}
						else
						{	member =
							(	node.classDef.properties.find(p => p.name==name) ??
								node.classDef.methods.find(p => p.name==name)
							);
						}
						break;
					case 'interface':
						member =
						(	node.interfaceDef.properties.find(p => p.name==name) ??
							node.interfaceDef.methods.find(p => p.name==name)
						);
						break;
					case 'enum':
						member = node.enumDef.members.find(p => p.name == name);
						break;
					case 'typeAlias':
						if (node.typeAliasDef.tsType.kind == 'typeLiteral')
						{	const {typeLiteral} = node.typeAliasDef.tsType;
							member =
							(	typeLiteral.properties.find(p => p.name==name) ??
								typeLiteral.methods.find(p => p.name==name)
							);
						}
						else
						{	node = tsTypeToNode(nodes, node.typeAliasDef.tsType);
							if (!node)
							{	return;
							}
							continue;
						}
						break;
					case 'namespace':
						node = node.namespaceDef.elements.find(p => p.name == name);
						if (!node)
						{	return;
						}
						member = undefined;
						continue L;
				}
				break;
			}
			if (!member)
			{	return;
			}
		}
	}
	if (node)
	{	return {node, member, isStatic};
	}
}

function tsTypeToNode(nodes: DocNode[], tsType: TsTypeDef)
{	while (true)
	{	switch (tsType.kind)
		{	case 'typeRef':
				return nodes[tsType.typeRef.nodeIndex ?? -1];
			case 'parenthesized':
				tsType = tsType.parenthesized;
				continue;
			/*case 'optional':
			case 'intersection':
			case 'typeLiteral':

			case 'conditional':
			case 'mapped':
			case 'keyword':
			case 'literal':
			case 'union':
			case 'array':
			case 'tuple':
			case 'typeOperator':
			case 'rest':
			case 'typeQuery':
			case 'this':
			case 'fnOrConstructor':
			case 'importType':
			case 'infer':
			case 'indexedAccess':
			case 'typePredicate':*/
		}
		break;
	}
}
