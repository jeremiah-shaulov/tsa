import {testEmitBundle} from '../test-emit_bundle.ts';
import {tsa} from '../../tsa_ns.ts';

Deno.test
(	'emit_bundle-remote',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-remote/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle
		(	[subj],
			'emit_bundle-remote',
			{	outFile: 'dist.js',
				module: tsa.ModuleKind.System,
				resolveJsonModule: false,
			}
		);
		const mod = await import(outFile);
	}
);
