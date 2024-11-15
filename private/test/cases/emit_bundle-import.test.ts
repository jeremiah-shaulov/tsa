import {testEmitBundle} from '../test-emit_bundle.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-import',
	async () =>
	{	const subj = new URL(`subj/emit_bundle-import/mod.ts`, import.meta.url);
		const outFile = await testEmitBundle([subj],'emit_bundle-import');
		const mod = await import(outFile);
		assertEquals(Object.keys(mod).sort(), ['pathDotDotSlash', 'pathDotDot', 'pathDot', 'pathDot2'].sort());
		assertEquals(mod.pathDot, await Deno.realPath('.'));
	}
);
