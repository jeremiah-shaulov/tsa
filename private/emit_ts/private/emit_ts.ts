import {tsa} from '../../tsa_ns.ts';
import {Loader} from '../../load_options.ts';
import {Bundler} from './bundler.ts';

export function emitTs(ts: typeof tsa, program: tsa.DenoProgram, loader: Loader, newLine='\n')
{	const checker = program.getTypeChecker();
	const printer = ts.createPrinter();
	const entryPointsHrefs = program.getRootFileNames();
	const modulesHrefs = entryPointsHrefs.slice();
	// Create bundler and add modules to it
	const bundler = new Bundler;
	for (let i=0; i<modulesHrefs.length; i++) // imported modules will be added to `modulesHrefs` while iterating
	{	const moduleHref = modulesHrefs[i];
		const sourceFile = program.getSourceFile(moduleHref);
		if (sourceFile)
		{	bundler.addModule(ts, checker, loader, sourceFile, modulesHrefs, i<entryPointsHrefs.length);
		}
	}
	// Reordered nodes according to dependency
	bundler.reorderNodesAccordingToDependency();
	// Print nodes
	let bundlerResult = '';
	for (const {sourceFile, node} of bundler.nodesWithInfo)
	{	bundlerResult += printer.printNode(ts.EmitHint.Unspecified, node, sourceFile) + newLine;
	}
	// Done
	return bundlerResult;
}
