/**	This module is for converting compilation units from `tsc` to `DocNode`s.

	Example:

	```ts
	import ts from 'npm:typescript@5.6.2';
	import * as path from 'https://deno.land/std@0.178.0/path/mod.ts';
	import {Converter} from 'https://deno.land/x/tsa@v0.0.12/private/convert/mod.ts';
	import {Loader} from 'https://deno.land/x/tsa@v0.0.12/private/load_options.ts';

	const entryPoints = [path.fromFileUrl(import.meta.url)];
	const compilerOptions = {};
	const loadOptions = {};
	const emitOptions = {};
	const host = ts.createCompilerHost(compilerOptions);
	const program = ts.createProgram(entryPoints, compilerOptions, host);
	const loader = await Loader.inst(loadOptions, true, host);
	const libLocation = host.getDefaultLibLocation?.() ?? '';
	const converter = new Converter(ts, program, loader, libLocation, emitOptions);
	const docs = converter.convertEntryPoints();
	console.log(docs);
	```

	@module
 **/

export {Converter, type EmitDocOptions} from './private/converter.ts';
