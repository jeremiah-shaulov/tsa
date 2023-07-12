import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';
import {ExportSymbols} from './export_symbols.ts';

export function step3RemoveDeadCode(nodesWithInfo: NodeWithInfo[], exportSymbols: ExportSymbols)
{	const allRefs = new Set<tsa.Symbol>; // all top-level symbols, that are referenced from somewhere (that appear in some `nodesWithInfo[I].refs` or `nodesWithInfo[I].bodyRefs`), so they're not a dead code
	while (true)
	{	allRefs.clear();
		for (const symbol of exportSymbols.symbolsFlat)
		{	allRefs.add(symbol);
		}
		for (const {refs, bodyRefs} of nodesWithInfo)
		{	for (const ref of refs)
			{	allRefs.add(ref);
			}
			for (const ref of bodyRefs)
			{	allRefs.add(ref);
			}
		}
		const {length} = nodesWithInfo;
		nodesWithInfo = nodesWithInfo.filter(n => n.introduces.length==0 || n.introduces.some(s => allRefs.has(s)));
		if (length == nodesWithInfo.length)
		{	break;
		}
	}
	return nodesWithInfo;
}
