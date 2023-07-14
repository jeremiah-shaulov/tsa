import {testEmitBundle} from '../test-emit_bundle.ts';
import {tsa} from '../../tsa_ns.ts';
import {assertEquals} from '../deps.ts';

Deno.test
(	'emit_bundle-default',
	async () =>
	{	for (const file of ['mod.ts', 'mod2.ts', 'mod3.ts'])
		{	const subj = new URL(`subj/emit_bundle-default/${file}`, import.meta.url);
			const outFile = await testEmitBundle([subj], 'emit_bundle-default-'+file);
			const mod = await import(outFile);

			if (file == 'mod.ts')
			{	assertEquals(Object.keys(mod).sort(), ['subj1Export', 'subj2Export', 'subj3Export', 'def', 'subj5Export', 'subj7Export', 'default'].sort());
			}
			else if (file == 'mod2.ts')
			{	assertEquals(Object.keys(mod).sort(), ['default'].sort());
			}
			else
			{	assertEquals(Object.keys(mod).sort(), ['default'].sort());
			}
		}
	}
);
