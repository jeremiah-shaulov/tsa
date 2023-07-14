import {testEmitBundle} from '../test-emit_bundle.ts';
import {tsa} from '../../tsa_ns.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-circular_ns',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-circular_ns/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle([subj],'emit_bundle-circular_ns');
		const mod = await import(outFile);
		assertEquals(Object.keys(mod).sort(), ['default'].sort());
		assertEquals(mod.default, 4);
	}
);
