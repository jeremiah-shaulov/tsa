import {tsa} from '../../tsa_ns.ts';
import {NodeWithInfo} from './emit_bundle.ts';
import {massSpliceRemove} from './util.ts';

export function step4ReorderStmtsAccordingToDependency(ts: typeof tsa, nodesWithInfo: NodeWithInfo[], nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>)
{	let knownSymbols = new Set<tsa.Symbol>;
	const stack = new Array<{fromSourceFile: tsa.SourceFile, symbol: tsa.Symbol}>;
L:	for (let i=0, iEnd=nodesWithInfo.length; i<iEnd; i++)
	{	const nodeWithInfo = nodesWithInfo[i];
		const {sourceFile, refs, introduces} = nodeWithInfo;
		for (const symbol of refsIter(ts, nodesThatIntroduce, refs))
		{	if (!knownSymbols.has(symbol)) // If this stmt depends on symbol not introduced yet
			{	// Find what module introduces this symbol
				const toSourceFile = nodesThatIntroduce.get(symbol)?.sourceFile;
				if (toSourceFile)
				{	if (!stack.some(s => s.fromSourceFile == toSourceFile))
					{	// Find where this module begins
						for (let j=i+1; j<iEnd; j++)
						{	if (nodesWithInfo[j].sourceFile == toSourceFile)
							{	// Want to bring `nodesWithInfo[i .. j]` to the end of array
								for (const p of nodesWithInfo.splice(i, j-i))
								{	nodesWithInfo[nodesWithInfo.length] = p;
								}
								//
								stack.push({fromSourceFile: sourceFile, symbol});
								i--;
								continue L;
							}
						}
					}
					else
					{	// Circular dependency
						let newKnownSymbols = new Set(knownSymbols.values());
						const nodeIndices = new Array<number>;
						for (let j=stack.length-1; j>=0; j--)
						{	if (getNodesThatIntroduce(ts, nodesWithInfo, nodesThatIntroduce, stack[j].symbol, newKnownSymbols, i, nodeIndices))
							{	const nodes = nodeIndices.map(k => nodesWithInfo[k]);
								massSpliceRemove(nodesWithInfo, nodeIndices); // for each I, remove nodesWithInfo[nodeIndices[I]]
								nodesWithInfo.splice(i, 0, ...nodes); // insert `nodes` at `i`
								knownSymbols = newKnownSymbols;
								i += nodes.length - 1;
								stack.length = 0;
								continue L;
							}
							newKnownSymbols = new Set(knownSymbols.values());
							nodeIndices.length = 0;
						}
						console.error(`Modules circular dependency: ${stack.map(s => s.fromSourceFile.fileName).join(' -> ')} -> ${toSourceFile.fileName}`);
					}
				}
			}
		}
		for (const symbol of introduces)
		{	knownSymbols.add(symbol);
		}
		stack.length = 0;
	}
}

function *refsIter(ts: typeof tsa, nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>, refs: Set<tsa.Symbol>, visited=new Set<tsa.Symbol>): Generator<tsa.Symbol>
{	for (const symbol of refs)
	{	if (!visited.has(symbol))
		{	visited.add(symbol);
			if (!(symbol.flags & (ts.SymbolFlags.TypeAlias | ts.SymbolFlags.Interface))) // types can be declared later
			{	if (symbol.flags & ts.SymbolFlags.Function) // functions can be declared later, but i depend on what their body references
				{	const bodyRefs = nodesThatIntroduce.get(symbol)?.bodyRefs;
					if (bodyRefs)
					{	for (const symbol2 of refsIter(ts, nodesThatIntroduce, bodyRefs, visited))
						{	yield symbol2;
						}
					}
				}
				else if (!(symbol.flags & ts.SymbolFlags.FunctionScopedVariable)) // vars can be declared later
				{	// TODO: class
					yield symbol;
				}
			}
		}
	}
}

function getNodesThatIntroduce(ts: typeof tsa, nodesWithInfo: NodeWithInfo[], nodesThatIntroduce: Map<tsa.Symbol, NodeWithInfo>, symbol: tsa.Symbol, knownSymbols: Set<tsa.Symbol>, fromNode: number, outNodeIndices: number[], visited=new Array<number>)
{	const found = nodesThatIntroduce.get(symbol);
	knownSymbols.add(symbol);
	if (found)
	{	const i = nodesWithInfo.indexOf(found, fromNode);
		if (i==-1 || visited.includes(i))
		{	return false;
		}
		visited.push(i);
		const {refs, introduces} = found;
		for (const ref of refsIter(ts, nodesThatIntroduce, refs))
		{	if (!knownSymbols.has(ref))
			{	if (!getNodesThatIntroduce(ts, nodesWithInfo, nodesThatIntroduce, ref, knownSymbols, fromNode, outNodeIndices, visited))
				{	return false;
				}
			}
		}
		for (const symbol of introduces)
		{	knownSymbols.add(symbol);
		}
		outNodeIndices.push(i);
	}
	return true;
}
