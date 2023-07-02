import {testDoc} from '../test-doc.ts';

const SAVE_TO_FILES = Deno.args.includes('--save-to-files');

Deno.test
(	'doc-decorators',
	async () =>
	{	const subj = new URL(`subj/doc-decorators/mod.ts`, import.meta.url);
		await testDoc(subj, {experimentalDecorators: true}, SAVE_TO_FILES);
	}
);
