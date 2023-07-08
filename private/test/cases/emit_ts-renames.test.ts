import {testEmitTs} from '../test-emit_ts.ts';
import {tsa} from '../../tsa_ns.ts';

Deno.test
(	'emit_ts-renames',
	async () =>
	{	const subj = new URL(`subj/emit_ts-renames/mod.ts`, import.meta.url);
		await testEmitTs
		(	[subj],
			{	outFile: 'dist.js',
				module: tsa.ModuleKind.System,
				resolveJsonModule: false,
				lib: ['lib.esnext.d.ts', 'lib.dom.d.ts'],
			}
		);
	}
);
