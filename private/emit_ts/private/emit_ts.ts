import {tsa} from '../../tsa_ns.ts';
import {Loader} from '../../load_options.ts';
import {Bundler} from './bundler.ts';

export function emitTs(ts: typeof tsa, program: tsa.DenoProgram, loader: Loader)
{	const checker = program.getTypeChecker();
	const entryPointsHrefs = program.getRootFileNames();
	const modulesHrefs = entryPointsHrefs.slice();
	// Create bundler and add modules to it
	const bundler = new Bundler;
	for (let i=0; i<modulesHrefs.length; i++) // imported modules will be added to `modulesHrefs` while iterating
	{	const moduleHref = modulesHrefs[i];
		const sourceFile = program.getSourceFile(moduleHref);
		if (sourceFile)
		{	bundler.addModule(ts, checker, loader, sourceFile, modulesHrefs, i<entryPointsHrefs.length ? i : -1);
		}
	}
	// Get the result
	return bundler.getResult(ts);
}
