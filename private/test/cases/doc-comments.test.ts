import {testDoc} from '../test-doc.ts';

const SAVE_TO_FILES = Deno.args.includes('--save-to-files');

Deno.test
(	'doc-comments',
	async () =>
	{	const subj = new URL(`subj/doc-comments/mod.ts`, import.meta.url);
		await testDoc(subj, SAVE_TO_FILES);
	}
);
