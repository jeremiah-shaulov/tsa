import {testEmitTs} from '../test-emit_ts.ts';
import {tsa} from '../../tsa_ns.ts';

const SAVE_TO_FILES = Deno.args.includes('--save-to-files');

Deno.test
(	'emit_ts-namespace',
	async () =>
	{	const subj = new URL(`subj/emit_ts-namespace/mod.ts`, import.meta.url);
		await testEmitTs
		(	[subj],
			{	outFile: 'dist.js',
				module: tsa.ModuleKind.System,
				resolveJsonModule: false,
				lib: ['lib.esnext.d.ts', 'lib.dom.d.ts'],
			},
			SAVE_TO_FILES ? 'emit_ts-namespace' : ''
		);
	}
);
