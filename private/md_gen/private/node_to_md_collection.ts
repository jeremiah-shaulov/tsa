import {DocNode} from '../../doc_node/mod.ts';
import {findNamepathTarget} from './find_namepath_target.ts';
import {NodeToMd} from './node_to_md.ts';

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
			if (kind == 'moduleDoc')
			{	return '';
			}
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
		return '';
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

	getLinkByNamepath(namepath: string, backToTopDir: ''|'../'='../')
	{	if (namepath.startsWith('https://') || namepath.startsWith('http://'))
		{	return namepath;
		}
		const found = findNamepathTarget(this.#nodes, namepath);
		if (found)
		{	const dir = this.getDir(found.node);
			if (dir)
			{	const hashHeaderId = this.#getHashHeaderId(found.node, found.member?.name, found.isStatic);
				return `${backToTopDir}${dir}/README.md${hashHeaderId}`;
			}
		}
		return '';
	}
}
