import {testDoc} from '../test-doc.ts';
import {tsa} from '../../tsa_ns.ts';

const SAVE_TO_FILES = Deno.args.includes('--save-to-files');

Deno.test
(	'doc-import_export',
	async () =>
	{	const subj = new URL(`subj/doc-import_export/mod.ts`, import.meta.url);
		await testDoc(subj, {resolveJsonModule: true, moduleResolution: tsa.ModuleResolutionKind.Bundler}, SAVE_TO_FILES);
	}
);
