// deno-lint-ignore-file no-this-alias

import {tsa} from './tsa_ns.ts';
import {path} from './deps.ts';
import {Converter, EmitDocOptions} from './convert/mod.ts';
import {getExtendedLibs} from './dts/mod.ts';
import {existsSync, isUrl} from './util.ts';
import {LoadOptions, Loader} from './load_options.ts';
import {getNpmFilename} from './npm.ts';
import {emitTs} from './emit_ts/mod.ts';

type SourceFile = {sourceFile?: tsa.SourceFile, scriptKind: tsa.ScriptKind};

export async function createDenoProgram(this: typeof tsa, entryPoints: ReadonlyArray<string|URL>, compilerOptions?: tsa.CompilerOptions, loadOptions?: LoadOptions)
{	const ts = this;
	compilerOptions = setDefaultOptions(this, compilerOptions);
	const loader = await Loader.inst(loadOptions);
	const {files, entryPointsHrefs} = await readAllFiles(ts, entryPoints, loader);
	const host = ts.createCompilerHost(compilerOptions);
	const libLocation = host.getDefaultLibLocation?.() ?? '';
	const extendedLibs = await getExtendedLibs(this, libLocation);
	const cwdHref = path.toFileUrl(Deno.cwd()).href;

	if (parseFloat(this.versionMajorMinor) >= 5.0) // in case of substituted `this`
	{	host.resolveModuleNameLiterals = function(moduleLiterals, containingFile)
		{	if (!isUrl(containingFile))
			{	containingFile = path.toFileUrl(containingFile).href;
			}
			if (containingFile.startsWith(cwdHref) && containingFile.slice(cwdHref.length, cwdHref.length+5)=='/npm:')
			{	containingFile = containingFile.slice(cwdHref.length + 1);
			}
			const resolvedModules = new Array<tsa.ResolvedModuleWithFailedLookupLocations>;
			for (const {text} of moduleLiterals)
			{	const resolvedFileName = loader.resolved(text, containingFile);
				const file = files.get(resolvedFileName);
				resolvedModules.push
				(	{	resolvedModule: file &&
						{	resolvedFileName,
							isExternalLibraryImport: false,
							extension:
							(	file.scriptKind == ts.ScriptKind.TS ? ts.Extension.Ts :
								file.scriptKind == ts.ScriptKind.TSX ? ts.Extension.Tsx :
								file.scriptKind == ts.ScriptKind.JSON ? ts.Extension.Json :
								file.scriptKind == ts.ScriptKind.JSX ? ts.Extension.Jsx :
								ts.Extension.Js
							),
						}
					}
				);
			}
			return resolvedModules;
		};
	}
	else
	{	host.resolveModuleNames = function(moduleLiterals, containingFile)
		{	const resolvedModules = new Array<tsa.ResolvedModule | undefined>();
			for (const text of moduleLiterals)
			{	const resolvedFileName = loader.resolved(text, containingFile);
				const file = files.get(resolvedFileName);
				resolvedModules.push
				(	file &&
					{	resolvedFileName,
						isExternalLibraryImport: false,
					}
				);
			}
			return resolvedModules;
		};
	}

	host.getSourceFile = function(filename, _languageVersionOrOptions, onError?: ((message: string) => void))
	{	const sourceFile = files.get(filename)?.sourceFile;
		if (sourceFile)
		{	return sourceFile;
		}
		// maybe a lib file (like `lib.esnext.d.ts`)
		try
		{	const origSpecifier = filename;
			let fileUrl;
			if (filename.startsWith('file://'))
			{	filename = path.fromFileUrl(filename);
				fileUrl = new URL(filename);
			}
			else if (isUrl(filename))
			{	return;
			}
			else
			{	fileUrl = path.toFileUrl(filename);
			}
			if (extendedLibs[fileUrl.href] && !existsSync(fileUrl))
			{	filename = extendedLibs[fileUrl.href];
			}
			const content = Deno.readTextFileSync(filename);
			return createSourceFile(ts, content, origSpecifier, filename).sourceFile;
		}
		catch (e)
		{	onError?.(e.message);
		}
	};

	const program = this.createProgram(entryPointsHrefs, compilerOptions, host);

	(program as tsa.DenoProgram).emitDoc = function(options?: EmitDocOptions)
	{	const converter = new Converter(ts, this, loader, libLocation, options);
		return converter.convertEntryPoints();
	};

	(program as tsa.DenoProgram).emitTs = function()
	{	return emitTs(ts, this, loader, host.getNewLine());
	};

	return program as tsa.DenoProgram;
}

function setDefaultOptions(ts: typeof tsa, compilerOptions?: tsa.CompilerOptions): tsa.CompilerOptions
{	if (!compilerOptions)
	{	compilerOptions = {};
	}
	if (compilerOptions.lib == undefined)
	{	compilerOptions.lib = ['lib.deno.ns.d.ts'];
	}
	if (compilerOptions.allowJs == undefined)
	{	compilerOptions.allowJs = true;
	}
	if (compilerOptions.resolveJsonModule == undefined)
	{	compilerOptions.resolveJsonModule = true;
	}
	if (compilerOptions.allowSyntheticDefaultImports == undefined)
	{	compilerOptions.allowSyntheticDefaultImports = true;
	}
	if (compilerOptions.target == undefined)
	{	compilerOptions.target = ts.ScriptTarget.ESNext;
	}
	if (compilerOptions.module == undefined)
	{	compilerOptions.module = ts.ModuleKind.ESNext;
	}
	if (compilerOptions.moduleResolution == undefined)
	{	compilerOptions.moduleResolution = ts.ModuleResolutionKind.NodeNext;
	}
	delete compilerOptions.allowImportingTsExtensions; // TODO: implement filenames without extension
	return compilerOptions;
}

async function readAllFiles(ts: typeof tsa, entryPoints: ReadonlyArray<string|URL>, loader: Loader)
{	const files = new Map<string, SourceFile>;
	const entryPointsHrefs = new Array<string>;
	await Promise.all
	(	entryPoints.map
		(	async (entryPoint, i) =>
			{	// To absolute URL: `entryPoint` -> `entryPointHref`
				let entryPointHref = typeof(entryPoint)!='string' ? entryPoint.href : isUrl(entryPoint) ? entryPoint : path.toFileUrl(await Deno.realPath(entryPoint)).href;
				// If this is `npm:` URL, resolve it to internal path to the main module, like `npm:typescript@5.1.5` -> `npm:typescript@5.1.5/lib/typescript.d.ts`
				// This is needed, because tsc wants to see file extension
				entryPointHref = (await getNpmFilename(entryPointHref))?.specifier || entryPointHref;
				// Add to `entryPointsHrefs` array
				entryPointsHrefs[i] = entryPointHref;
				// Read the file contents, and scan it for `import from` and `export from`
				await forFile(ts, entryPointHref, files, loader);
			}
		)
	);
	return {files, entryPointsHrefs};
}

async function forFile(ts: typeof tsa, modHref: string, files: Map<string, SourceFile>, loader: Loader)
{	const promises = new Array<Promise<unknown>>;
	if (!files.has(modHref))
	{	const record: SourceFile = {scriptKind: ts.ScriptKind.JS};
		files.set(modHref, record);
		const loadResponse = await loader.load(modHref, false);
		if (loadResponse?.kind == 'module')
		{	const {sourceFile, scriptKind} = createSourceFile(ts, loadResponse.content, modHref, loadResponse.specifier, loadResponse.headers?.['content-type']);
			record.scriptKind = scriptKind;
			record.sourceFile = sourceFile;
			// Find `import from` and `export from`
			for (const statement of sourceFile.statements)
			{	if (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement))
				{	const {moduleSpecifier} = statement;
					if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier))
					{	const importHref = await loader.resolve(moduleSpecifier.text, modHref);
						if (!files.has(importHref))
						{	promises.push(forFile(ts, importHref, files, loader));
						}
					}
				}
			}
			// Find `/// <reference path="..." />`
			for (const {fileName} of sourceFile.referencedFiles)
			{	const importHref = await loader.resolve(fileName, modHref);
				if (!files.has(importHref))
				{	promises.push(forFile(ts, importHref, files, loader));
				}
			}
		}
	}
	await Promise.all(promises);
}

function createSourceFile(ts: typeof tsa, content: string, origSpecifier: string, specifier: string, contentType?: string)
{	const scriptKind =
	(	contentType?.endsWith('typescript') ? ts.ScriptKind.TS :
		contentType?.endsWith('/tsx') ? ts.ScriptKind.TSX :
		contentType?.endsWith('json') ? ts.ScriptKind.JSON :
		contentType?.endsWith('/jsx') ? ts.ScriptKind.JSX :
		specifier.slice(-3).toLowerCase() == '.ts' ? ts.ScriptKind.TS :
		specifier.slice(-4).toLowerCase() == '.tsx' ? ts.ScriptKind.TSX :
		specifier.slice(-5).toLowerCase() == '.json' ? ts.ScriptKind.JSON :
		specifier.slice(-4).toLowerCase() == '.jsx' ? ts.ScriptKind.JSX :
		ts.ScriptKind.JS
	);
	const sourceFile = ts.createSourceFile(origSpecifier, content, scriptKind==ts.ScriptKind.JSON ? ts.ScriptTarget.JSON : ts.ScriptTarget.Latest, undefined, scriptKind);
	return {sourceFile, scriptKind};
}
