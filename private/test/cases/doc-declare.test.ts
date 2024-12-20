import {testDoc} from '../test-doc.ts';

const SAVE_TO_FILES = Deno.args.includes('--save-to-files');

Deno.test
(	'doc-declare',
	async () =>
	{	const subj = new URL(`subj/doc-declare/mod.d.ts`, import.meta.url);
		await testDoc(subj, {}, SAVE_TO_FILES);
	}
);

Deno.test
(	'doc-declare2',
	async () =>
	{	const subj = new URL(`subj/doc-declare2/mod.ts`, import.meta.url);
		await testDoc(subj, {}, SAVE_TO_FILES);
	}
);
