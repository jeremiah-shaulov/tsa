import {DocNode} from '../../doc_node/mod.ts';
import {nodesToMd} from './nodes_to_md.ts';

export class DocNodes
{	constructor(public nodes: DocNode[])
	{
	}

	toMd(moduleName='', importUrls=new Array<string>, outUrl='')
	{	return nodesToMd(this.nodes, moduleName, importUrls, outUrl);
	}
}
