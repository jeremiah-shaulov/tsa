import {DocNode} from '../../doc_node/mod.ts';
import {nodesToMd} from './nodes_to_md.ts';

export class DocNodes
{	constructor(public nodes: DocNode[])
	{
	}

	toMd(outFileBasename='README.md', outDir='generated-doc', moduleName='', importUrls=new Array<string>, outUrl='')
	{	return nodesToMd(this.nodes, outFileBasename, outDir, moduleName, importUrls, outUrl);
	}
}
