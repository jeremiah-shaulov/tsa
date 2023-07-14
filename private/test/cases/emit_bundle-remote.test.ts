import {testEmitBundle} from '../test-emit_bundle.ts';
import {tsa} from '../../tsa_ns.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-remote',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-remote/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle([subj],'emit_bundle-remote');

		const mod = await import(outFile);
		assertEquals(Object.keys(mod).sort(), ['default'].sort());
		assertEquals(typeof(mod.default), 'function');
		const a = mod.default('tmp');

		const mod2 = await import('https://deno.land/x/dir@1.5.1/mod.ts');
		const b = mod2.default('tmp');

		assertEquals(a, b);
	}
);
