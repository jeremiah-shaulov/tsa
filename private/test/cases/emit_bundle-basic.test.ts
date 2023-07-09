import {testEmitBundle} from '../test-emit_bundle.ts';
import {tsa} from '../../tsa_ns.ts';

const SAVE_TO_FILES = Deno.args.includes('--save-to-files');

Deno.test
(	'emit_bundle-basic',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-basic/mod.ts`, import.meta.url);
		await testEmitBundle
		(	[subj],
			{	outFile: 'dist.js',
				module: tsa.ModuleKind.System,
				resolveJsonModule: false,
				lib: ['lib.esnext.d.ts', 'lib.dom.d.ts'],
			},
			SAVE_TO_FILES ? 'emit_bundle-basic' : ''
		);
	}
);
