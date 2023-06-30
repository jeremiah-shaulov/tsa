import {testDoc} from '../test-doc.ts';

const SAVE_TO_FILES = Deno.args.includes('--save-to-files');

Deno.test
(	'doc-js',
	async () =>
	{	const subj = new URL(`subj/doc-js/mod.js`, import.meta.url);
		await testDoc(subj, SAVE_TO_FILES);
	}
);
