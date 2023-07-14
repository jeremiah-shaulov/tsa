import {testEmitBundle} from '../test-emit_bundle.ts';
import {tsa} from '../../tsa_ns.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-namespace',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-namespace/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle([subj],'emit_bundle-namespace');
		const mod = await import(outFile);
		assertEquals(Object.keys(mod).sort(), ['letters'].sort());
		assertEquals(Object.keys(mod.letters).sort(), ['A', 'B', 'C', 'num', 'joinPath', 'default'].sort());
		assertEquals(typeof(mod.letters.num), 'object');
	}
);
