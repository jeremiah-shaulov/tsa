import {testEmitBundle} from '../test-emit_bundle.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-renames',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-renames/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle([subj],'emit_bundle-renames');
		const mod = await import(outFile);
		assertEquals(Object.keys(mod).sort(), ['reallyHasNoColor', 'default'].sort());
	}
);
