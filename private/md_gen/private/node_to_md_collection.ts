import {DocNode, TsTypeDef, ClassPropertyDef, ClassMethodDef, InterfacePropertyDef, InterfaceMethodDef, EnumMemberDef} from '../../doc_node/mod.ts';
import {NodeToMd} from './node_to_md.ts';

const RE_LINK_PATH = /(?:\p{L}|\p{N}|_)+|"[^"\\]*(?:\\.[^"\\]*)*"/yu;
const RE_BACKSLASH_ESCAPE = /\\./g;

export class NodeToMdCollection
{	#nodes;
	#nodeToMdFactory;
	#pathNames = new Set<string>;
	#paths = new Map<DocNode, string>;
	#collection = new Map<DocNode, NodeToMd>;

	constructor(nodes: DocNode[], nodeToMdFactory: (node: DocNode) => NodeToMd|undefined)
	{	this.#nodes = nodes;
		this.#nodeToMdFactory = nodeToMdFactory;
	}

	getNodeToMd(node?: DocNode)
	{	if (node)
		{	let nodeToMd = this.#collection.get(node);
			if (!nodeToMd)
			{	nodeToMd = this.#nodeToMdFactory(node);
				if (nodeToMd)
				{	this.#collection.set(node, nodeToMd);
				}
			}
			return nodeToMd;
		}
	}

	getDir(node?: DocNode)
	{	if (node)
		{	const dir = this.#paths.get(node);
			if (dir != undefined)
			{	return dir;
			}
			const {name, kind} = node;
			const kindName = kind=='typeAlias' ? 'type.' : kind+'.';
			const fullName = node.declarationKind=='export' ? kindName+name : 'private.'+kindName+name;
			for (let i=1; true; i++)
			{	const curName = i==1 ? fullName : fullName+'.'+i;
				if (!this.#pathNames.has(curName))
				{	this.#pathNames.add(curName);
					this.#paths.set(node, curName);
					return curName;
				}
			}
		}
	}

	getLink(node?: DocNode, nodeSubIndex?: number)
	{	const dir = this.getDir(node);
		if (!dir)
		{	return '';
		}
		let hashHeaderId = '';
		if (nodeSubIndex!=undefined && node?.kind==='enum')
		{	hashHeaderId = this.#getHashHeaderId(node, node.enumDef.members[nodeSubIndex]?.name);
		}
		return `${dir}/README.md${hashHeaderId}`;
	}

	#getHashHeaderId(node?: DocNode, name?: string, isStatic=false)
	{	const headerId = this.getNodeToMd(node)?.getHeaderId(name, isStatic);
		return headerId ? '#'+headerId : '';
	}

	getLinkByNamepath(namepath: string)
	{	let pos = 0;
		let isStatic = false;
		let node: DocNode|undefined;
		let member: ClassPropertyDef|ClassMethodDef|InterfacePropertyDef|InterfaceMethodDef|EnumMemberDef|undefined;
L:		while (pos < namepath.length)
		{	if (pos != 0)
			{	const c = namepath.charAt(pos++);
				isStatic = c == '.';
				if (!isStatic && c!='#')
				{	return '';
				}
			}
			RE_LINK_PATH.lastIndex = pos;
			if (!RE_LINK_PATH.test(namepath))
			{	return '';
			}
			const nextPos = RE_LINK_PATH.lastIndex;
			const name = namepath.charAt(pos)=='"' ? namepath.slice(pos+1, nextPos-1).replace(RE_BACKSLASH_ESCAPE, m => m.charAt(1)) : namepath.slice(pos, nextPos);
			pos = nextPos;
			if (!node)
			{	// Find public symbol
				node = this.#nodes.find(n => n.name==name && n.declarationKind=='export');
				if (!node)
				{	return '';
				}
			}
			else
			{	if (member)
				{	// Convert `member` to `node`
					node = undefined;
					if ('tsType' in member && member.tsType)
					{	node = this.#tsTypeToNode(member.tsType);
					}
					if (!node)
					{	return '';
					}
					member = undefined;
				}
				// Get member of node
				while (true)
				{	switch (node.kind)
					{	case 'class':
							member =
							(	node.classDef.properties.find(p => p.name==name && p.isStatic==isStatic) ??
								node.classDef.methods.find(p => p.name==name && p.isStatic==isStatic)
							);
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
							node = this.#tsTypeToNode(node.typeAliasDef.tsType);
							if (!node)
							{	return '';
							}
							continue;
						case 'namespace':
							node = node.namespaceDef.elements.find(p => p.name == name);
							if (!node)
							{	return '';
							}
							member = undefined;
							continue L;
					}
					break;
				}
				if (!member)
				{	return '';
				}
			}
		}
		const dir = this.getDir(node);
		if (!dir)
		{	return '';
		}
		const hashHeaderId = this.#getHashHeaderId(node, member?.name, isStatic);
		return `../${dir}/README.md${hashHeaderId}`;
	}

	#tsTypeToNode(tsType: TsTypeDef)
	{	while (true)
		{	switch (tsType.kind)
			{	case 'typeRef':
					return this.#nodes[tsType.typeRef.nodeIndex ?? -1];
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
}
