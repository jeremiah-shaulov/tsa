import {testEmitBundle} from '../test-emit_bundle.ts';
import {tsa} from '../../tsa_ns.ts';

const SAVE_TO_FILES = Deno.args.includes('--save-to-files');

Deno.test
(	'emit_bundle-remote',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-remote/mod.ts`, import.meta.url);
		const js = await testEmitBundle
		(	[subj],
			{	outFile: 'dist.js',
				module: tsa.ModuleKind.System,
				resolveJsonModule: false,
			},
			SAVE_TO_FILES ? 'emit_bundle-remote' : ''
		);
		const result = eval(`${js}; tmp_dir()`);
		console.log(result);
	}
);
