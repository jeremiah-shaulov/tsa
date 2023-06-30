import {testEmit} from '../test-emit.ts';

Deno.test
(	'emit-dom',
	async () =>
	{	const subj = new URL(`subj/emit-dom/mod.ts`, import.meta.url).pathname;
		await testEmit
		(	[subj],
			{	outDir: 'dist',
				lib: ['lib.esnext.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
			}
		);
	}
);
