import {testEmitBundle} from '../test-emit_bundle.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-basic',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-basic/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle([subj],'emit_bundle-basic');
		const mod = await import(outFile);
		assertEquals(Object.keys(mod).sort(), ['DEFAULT_CHARSET', 'class2'].sort());
		assertEquals(mod.DEFAULT_CHARSET, 2);
		assertEquals(typeof(mod.class2), 'object');
	}
);
