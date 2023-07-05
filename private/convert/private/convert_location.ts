import {tsa} from '../../tsa_ns.ts';
import {DocNode} from '../../doc_node/mod.ts';
import {Converter} from './converter.ts';

export function convertLocation(_ts: typeof tsa, converter: Converter, node?: tsa.Node): DocNode['location']
{	const sourceFile = node?.getSourceFile();
	const pos = node && sourceFile?.getLineAndCharacterOfPosition(node.pos);
	const filename = sourceFile?.fileName || '';
	const entryPointNumber = converter.getEntryPointNumber(filename);
	return {
		filename,
		line: pos==undefined ? 0 : pos.line+1,
		col: pos==undefined ? 0 : pos.character+1,
		...(entryPointNumber<0 ? undefined : {entryPointNumber}),
	};
}
