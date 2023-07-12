import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';
import {ExportSymbols} from './export_symbols.ts';

export function step2RemoveDeadCode(nodesWithInfo: NodeWithInfo[], allRefs: Set<tsa.Symbol>, exportSymbols: ExportSymbols)
{	while (true)
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
