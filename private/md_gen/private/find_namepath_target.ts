import {DocNode, TsTypeDef, ClassPropertyDef, ClassMethodDef, InterfacePropertyDef, InterfaceMethodDef, EnumMemberDef, LiteralMethodDef, LiteralPropertyDef, TsTypeLiteralDef} from '../../doc_node/mod.ts';

const RE_LINK_PATH = /((?:\p{L}|\p{N}|_)+|"[^"\\]*(?:\\.[^"\\]*)*")\s*(?:\((?:[^)"']|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')*\))?/yu;
const RE_BACKSLASH_ESCAPE = /\\./g;

type NodeOrTypeLiteral = DocNode | TsTypeLiteralDef;
type FoundMember = ClassPropertyDef|ClassMethodDef|InterfacePropertyDef|InterfaceMethodDef|LiteralMethodDef|LiteralPropertyDef|EnumMemberDef;
type Found = {node: NodeOrTypeLiteral, member: FoundMember|undefined};
type Branch = {pos: number, found: Found|undefined};

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
export function findNamepathTarget(nodes: DocNode[], namepath: string, contextNode: DocNode)
{	const branches: Branch[] = [{pos: 0, found: undefined}];
L:	for (let i=0; i<branches.length; i++) // `branches` array will be expanded during the iteration
	{	let {pos, found} = branches[i];
		while (pos < namepath.length)
		{	let wantStatic = false; // the member was requested with '.', not '#'
			if (pos != 0)
			{	const c = namepath.charAt(pos++);
				wantStatic = c == '.';
				if (!wantStatic && c!='#')
				{	continue L;
				}
			}
			RE_LINK_PATH.lastIndex = pos;
			const m = RE_LINK_PATH.exec(namepath);
			if (!m)
			{	continue L;
			}
			const name = namepath.charAt(pos)=='"' ? m[1].slice(1, -1).replace(RE_BACKSLASH_ESCAPE, m => m.charAt(1)) : m[1];
			pos = RE_LINK_PATH.lastIndex;
			if (!found)
			{	// Find public symbol
				const node = nodes.find(n => n.name==name && n.declarationKind!='private');
				if (node)
				{	found = {node, member: undefined};
				}
				else
				{	if (contextNode)
					{	found = nodeGetMember(nodes, contextNode, name, wantStatic);
					}
					if (!found)
					{	continue L;
					}
				}
			}
			else if (!found.member)
			{	// Get member of `found.node`
				found = nodeGetMember(nodes, found.node, name, wantStatic);
			}
			else
			{	// Get member of `found.member`
				if ('tsType' in found.member && found.member.tsType)
				{	const foundNodes = new Array<NodeOrTypeLiteral>;
					tsTypeToNodeOrTypeLiteralDef(nodes, found.member.tsType, foundNodes);
					for (let j=0; j<foundNodes.length; j++)
					{	branches.push({pos, found: {node: foundNodes[j], member: undefined}});
					}
				}
				continue L;
			}
		}
		if (found)
		{	const {node, member} = found;
			if ('kind' in node)
			{	return {node, member};
			}
		}
	}
}

function nodeGetMember(nodes: DocNode[], node: NodeOrTypeLiteral, name: string, wantStatic: boolean, nodesTried=new Set<DocNode>): Found|undefined
{	let member: FoundMember|undefined;
	const retryNodes = new Array<DocNode>;
	if ('kind' in node)
	{	switch (node.kind)
		{	case 'class':
			{	const {classDef} = node;
				if (name == 'constructor')
				{	member = classDef.constructors[0];
				}
				else if (!wantStatic)
				{	member =
					(	classDef.properties.find(p => p.name==name && !p.isStatic) ??
						classDef.methods.find(p => p.name==name && !p.isStatic)
					);
				}
				else
				{	member =
					(	classDef.properties.find(p => p.name==name) ??
						classDef.methods.find(p => p.name==name)
					);
				}
				if (!member && classDef.superNodeIndex!=undefined)
				{	const n = nodes[classDef.superNodeIndex];
					if (n && !nodesTried.has(n))
					{	retryNodes.push(n);
					}
				}
				break;
			}
			case 'interface':
			{	const {interfaceDef} = node;
				member =
				(	interfaceDef.properties.find(p => p.name==name) ??
					interfaceDef.methods.find(p => p.name==name)
				);
				if (!member)
				{	for (const e of interfaceDef.extends)
					{	tsTypeToNodeOrTypeLiteralDef(nodes, e, retryNodes);
					}
				}
				break;
			}
			case 'enum':
			{	const {enumDef} = node;
				member = enumDef.members.find(p => p.name == name);
				break;
			}
			case 'typeAlias':
			{	if (node.typeAliasDef.tsType.kind == 'typeLiteral') // TODO: typeAliasDef.typeParams
				{	const {typeLiteral} = node.typeAliasDef.tsType;
					member =
					(	typeLiteral.properties.find(p => p.name==name) ??
						typeLiteral.methods.find(p => p.name==name)
					);
				}
				else
				{	const {typeAliasDef} = node;
					tsTypeToNodeOrTypeLiteralDef(nodes, typeAliasDef.tsType, retryNodes);
				}
				break;
			}
			case 'namespace':
			{	const {namespaceDef} = node;
				const n = namespaceDef.elements.find(p => p.name == name);
				if (n)
				{	return {node: n, member};
				}
			}
		}
	}
	else
	{	member =
		(	node.properties.find(p => p.name==name) ??
			node.methods.find(p => p.name==name)
		);
	}
	if (member)
	{	return {node, member};
	}
	for (const n of retryNodes)
	{	nodesTried.add(n);
		const found = nodeGetMember(nodes, n, name, wantStatic, nodesTried);
		if (found)
		{	return found;
		}
	}
}

function tsTypeToNodeOrTypeLiteralDef(nodes: DocNode[], tsType: TsTypeDef, out: NodeOrTypeLiteral[], done=new Set<TsTypeDef>)
{	while (true)
	{	switch (tsType.kind)
		{	case 'parenthesized':
			{	tsType = tsType.parenthesized;
				continue;
			}
			case 'optional':
			{	tsType = tsType.optional;
				continue;
			}
			case 'typeLiteral':
			{	out.push(tsType.typeLiteral);
				break;
			}
			case 'typeRef':
			{	const n = nodes[tsType.typeRef.nodeIndex ?? -1]; // TODO: tsType.typeRef.typeParams
				if (n && !out.includes(n))
				{	out.push(n);
				}
				break;
			}
			case 'union':
			{	for (const t of tsType.union)
				{	if (!done.has(t))
					{	done.add(t);
						tsTypeToNodeOrTypeLiteralDef(nodes, t, out, done);
					}
				}
				break;
			}
			case 'intersection':
			{	for (const t of tsType.intersection)
				{	if (!done.has(t))
					{	done.add(t);
						tsTypeToNodeOrTypeLiteralDef(nodes, t, out, done);
					}
				}
				break;
			}
		}
		break;
	}
}
