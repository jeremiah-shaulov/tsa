import {DocNode} from '../../doc_node/mod.ts';
import {nodesToMd} from './nodes_to_md.ts';

export class DocNodes
{	constructor(public nodes: DocNode[])
	{
	}

	toMd(outFileBasename='README.md', docDirBasename='generated-doc', mainTitle='', entryPoints=new Array<string>, importUrls=new Array<string>, baseDirUrl='')
	{	return nodesToMd(this.nodes, outFileBasename, docDirBasename, mainTitle, entryPoints, importUrls, baseDirUrl);
	}
}
