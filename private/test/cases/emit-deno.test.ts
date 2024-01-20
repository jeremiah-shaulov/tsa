import {testEmit} from '../test-emit.ts';
import {tsa} from '../../tsa_ns.ts';

Deno.test
(	'emit-deno',
	async () =>
	{	const subj = new URL(`subj/emit-deno/mod.ts`, import.meta.url);
		await testEmit
		(	[subj],
			{	outFile: 'dist.js',
				module: tsa.ModuleKind.AMD,
				moduleResolution: tsa.ModuleResolutionKind.Classic,
				resolveJsonModule: false,
				lib: ['lib.deno.ns.d.ts'],
			}
		);
	}
);
