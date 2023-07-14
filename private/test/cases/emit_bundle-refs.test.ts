import {testEmitBundle} from '../test-emit_bundle.ts';
import {tsa} from '../../tsa_ns.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-refs',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-refs/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle([subj],'emit_bundle-refs');
		const mod = await import(outFile);
		assertEquals(Object.keys(mod).sort(), ['value2', 'ForValue2'].sort());
	}
);
