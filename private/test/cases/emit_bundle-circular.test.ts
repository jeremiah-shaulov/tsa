import {testEmitBundle} from '../test-emit_bundle.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-circular',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-circular/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle([subj],'emit_bundle-circular');
		const mod = await import(outFile);
		assertEquals(Object.keys(mod).sort(), ['Class1', 'mark1', 'Class2'].sort());
		assertEquals(mod.Class2, 0);
	}
);
