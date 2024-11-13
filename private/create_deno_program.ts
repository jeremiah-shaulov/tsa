// deno-lint-ignore-file no-this-alias

import {tsa} from './tsa_ns.ts';
import {jstok, JstokTokenType, path} from './deps.ts';
import {Converter, EmitDocOptions} from './convert/mod.ts';
import {getExtendedLibs} from './dts/mod.ts';
import {isUrl, readTextFile} from './util.ts';
import {LoadOptions, Loader} from './load_options.ts';
import {resolveRegistry} from './resolve_registry/mod.ts';
import {emitTsaBundle} from './emit_bundle/mod.ts';
import {DocNodes} from './md_gen/mod.ts';

const UNICODE_LEFT_TO_RIGHT_MARK = '\u200E';
const RE_DOCCOMMENT_LINE = /^[ \t]*\*?[ \t]*([^\r\n]+)/mg;
const ATSIGN_AFTER_SPACE_FOLLOWED_BY_WORD = /\s@\w/g;
const RE_UNDO_COMMENT_PREPROCESSING = /\u200E@\w/g;

const C_CR = '\r'.charCodeAt(0);
const C_LF = '\n'.charCodeAt(0);
const C_TAB = '\t'.charCodeAt(0);
const C_SPACE = ' '.charCodeAt(0);
const C_PAREN_OPEN = '('.charCodeAt(0);
const C_SQUARE_OPEN = '['.charCodeAt(0);
const C_BRACE_OPEN = '{'.charCodeAt(0);
const C_TIMES = '*'.charCodeAt(0);

type SourceFileAndKind = {sourceFile?: tsa.SourceFile, scriptKind: tsa.ScriptKind};

export async function createTsaProgram(this: typeof tsa, entryPoints: ReadonlyArray<string|URL>, compilerOptions?: tsa.CompilerOptions, loadOptions?: LoadOptions, host?: tsa.CompilerHost)
{	const ts = this;

	const DEFAULT_COMPILER_OPTIONS =
	{	lib: ['lib.deno.ns.d.ts'],
		allowJs: true,
		resolveJsonModule: true,
		allowSyntheticDefaultImports: true,
		target: ts.ScriptTarget.ESNext,
		module: ts.ModuleKind.NodeNext,
		moduleResolution: ts.ModuleResolutionKind.NodeNext,
	};
	compilerOptions = {...DEFAULT_COMPILER_OPTIONS, ...compilerOptions};
	delete compilerOptions.allowImportingTsExtensions;

	if (!host)
	{	host = ts.createCompilerHost(compilerOptions);
	}

	const loader = await Loader.inst(loadOptions, host);
	const {sourceFilesAndKinds, entryPointsHrefs} = await readAllFiles(ts, host, entryPoints, loader);
	const libLocation = host.getDefaultLibLocation?.() ?? '';
	const extendedLibs = await getExtendedLibs(this, libLocation);
	const cwdHref = path.toFileUrl(host.getCurrentDirectory()).href;

	if (parseFloat(this.versionMajorMinor) >= 5.0)
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
				const sourceFileAndKind = sourceFilesAndKinds.get(resolvedFileName);
				resolvedModules.push
				(	{	resolvedModule: sourceFileAndKind &&
						{	resolvedFileName,
							isExternalLibraryImport: false,
							extension:
							(	sourceFileAndKind.scriptKind == ts.ScriptKind.TS ? ts.Extension.Ts :
								sourceFileAndKind.scriptKind == ts.ScriptKind.TSX ? ts.Extension.Tsx :
								sourceFileAndKind.scriptKind == ts.ScriptKind.JSON ? ts.Extension.Json :
								sourceFileAndKind.scriptKind == ts.ScriptKind.JSX ? ts.Extension.Jsx :
								ts.Extension.Js
							),
						}
					}
				);
			}
			return resolvedModules;
		};
	}
	else // in case of substituted `this`
	{	host.resolveModuleNames = function(moduleLiterals, containingFile)
		{	const resolvedModules = new Array<tsa.ResolvedModule | undefined>();
			for (const text of moduleLiterals)
			{	const resolvedFileName = loader.resolved(text, containingFile);
				const sourceFileAndKind = sourceFilesAndKinds.get(resolvedFileName);
				resolvedModules.push
				(	sourceFileAndKind &&
					{	resolvedFileName,
						isExternalLibraryImport: false,
					}
				);
			}
			return resolvedModules;
		};
	}

	host.getSourceFile = function(filename, _languageVersionOrOptions, onError?: ((message: string) => void))
	{	const sourceFileAndKind = sourceFilesAndKinds.get(filename);
		if (sourceFileAndKind)
		{	return sourceFileAndKind.sourceFile;
		}
		// if is fake filename without extension (crafted with `Loader`), typescript adds the extension
		if (filename.endsWith('.ts'))
		{	const sourceFileAndKind = sourceFilesAndKinds.get(filename.slice(0, -3));
			if (sourceFileAndKind)
			{	return sourceFileAndKind.sourceFile;
			}
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
			if (extendedLibs[fileUrl.href] && !host.fileExists(path.fromFileUrl(fileUrl)))
			{	filename = extendedLibs[fileUrl.href];
			}
			const content = readTextFile(host, filename);
			return createSourceFile(ts, loader, content, origSpecifier, filename).sourceFile;
		}
		catch (e)
		{	onError?.(e instanceof Error ? e.message : e+'');
		}
	};

	const program = this.createProgram(entryPointsHrefs, compilerOptions, host);

	(program as tsa.TsaProgram).emitDoc = function(options?: EmitDocOptions)
	{	const converter = new Converter(ts, this, loader, libLocation, options);
		const nodes = converter.convertEntryPoints();
		return new DocNodes(nodes);
	};

	(program as tsa.TsaProgram).emitTsaBundle = function()
	{	return emitTsaBundle(ts, this, compilerOptions?.lib, libLocation);
	};

	return program as tsa.TsaProgram;
}

async function readAllFiles(ts: typeof tsa, host: tsa.CompilerHost, entryPoints: ReadonlyArray<string|URL>, loader: Loader)
{	const sourceFilesAndKinds = new Map<string, SourceFileAndKind>;
	const entryPointsHrefs = new Array<string>;
	const cwd = path.toFileUrl(host.realpath!(host.getCurrentDirectory())).href + '/';
	await Promise.all
	(	entryPoints.map
		(	async (entryPoint, i) =>
			{	// To absolute URL: `entryPoint` -> `entryPointHref`
				let entryPointHref = typeof(entryPoint)!='string' ? entryPoint.href : isUrl(entryPoint) ? entryPoint : await loader.resolve(entryPoint, cwd);
				// If this is `npm:` URL, resolve it to internal path to the main module, like `npm:typescript@5.1.5` -> `npm:typescript@5.1.5/lib/typescript.d.ts`
				// This is needed, because tsc wants to see file extension
				entryPointHref = (await resolveRegistry(entryPointHref, host))?.specifier || entryPointHref;
				// Add to `entryPointsHrefs` array
				entryPointsHrefs[i] = entryPointHref;
				// Read the file contents, and scan it for `import from` and `export from`
				await forFile(ts, entryPointHref, sourceFilesAndKinds, loader);
			}
		)
	);
	return {sourceFilesAndKinds, entryPointsHrefs};
}

async function forFile(ts: typeof tsa, modHref: string, sourceFilesAndKinds: Map<string, SourceFileAndKind>, loader: Loader)
{	const promises = new Array<Promise<unknown>>;
	if (!sourceFilesAndKinds.has(modHref))
	{	const record: SourceFileAndKind = {scriptKind: ts.ScriptKind.JS};
		sourceFilesAndKinds.set(modHref, record);
		const loadResponse = await loader.load(modHref, false);
		if (loadResponse?.kind == 'module')
		{	const {sourceFile, scriptKind} = createSourceFile(ts, loader, preprocessJavascript(loadResponse.content), modHref, loadResponse.specifier, loadResponse.headers?.['content-type']);
			record.scriptKind = scriptKind;
			record.sourceFile = sourceFile;
			// Find `import from` and `export from`
			for (const statement of sourceFile.statements)
			{	if (ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement))
				{	const {moduleSpecifier} = statement;
					if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier))
					{	const importHref = await loader.resolve(moduleSpecifier.text, modHref);
						if (!sourceFilesAndKinds.has(importHref))
						{	promises.push(forFile(ts, importHref, sourceFilesAndKinds, loader));
						}
					}
				}
			}
			// Find `/// <reference path="..." />`
			for (const {fileName} of sourceFile.referencedFiles)
			{	const importHref = await loader.resolve(fileName, modHref);
				if (!sourceFilesAndKinds.has(importHref))
				{	promises.push(forFile(ts, importHref, sourceFilesAndKinds, loader));
				}
			}
		}
	}
	await Promise.all(promises);
}

function createSourceFile(ts: typeof tsa, loader: Loader, content: string, origSpecifier: string, specifier: string, contentType?: string)
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
	const sourceFile = loader.createSourceFile(ts, origSpecifier, content, scriptKind);
	return {sourceFile, scriptKind};
}

/**	Minimal manipulation needed to workaround `tsc` bugs or features.

	1. `tsc` considers end of comment before first occurance of `@`-char preceded by a space char,
	even if the `@` is in the middle of text line, and even if it's quoted in backticks or in markdown tripple-backtick codeblock.
	This function finds all doc-comments, and places `UNICODE_LEFT_TO_RIGHT_MARK` before `@` in such situations.
	Then use `undoCommentPreprocessing()` to revert.
	2. `tsc` doesn't consider a comment that starts with `/**` to be a doc-comment if it follows nonblank characters after the beginning of it's line.
	For example `\n{/**`.
	I want to allow `(`, `[` amd `{` chars to precede doc comments.
	This function replaces the ENDLINE chars, so the code looks like `{\n/**`.
 **/
function preprocessJavascript(content: string)
{	let newContent = '';
	let from = 0;
	let offset = 0;
	for (const token of jstok(content))
	{	if (token.type==JstokTokenType.COMMENT && token.text.charCodeAt(2)==C_TIMES) // if is doc-comment
		{	// 1. Take care of doc-comment that begins not on line start
			let nonblank = false;
L:			for (let i=offset-1; i>=0; i--)
			{	switch (content.charCodeAt(i))
				{	case C_PAREN_OPEN:
					case C_SQUARE_OPEN:
					case C_BRACE_OPEN:
						nonblank = true;
						// fallthrough
					case C_TAB:
					case C_SPACE:
						break;
					case C_LF:
						if (nonblank)
						{	const pos = i + 1;
							if (content.charCodeAt(i-1) == C_CR)
							{	i--;
							}
							newContent += content.slice(from, i) + content.slice(pos, offset) + content.slice(i, pos);
							from = offset;
						}
						// fallthrough
					default:
						break L;
				}
			}
			// 2. Take care of `@` in doc-comment
			let inCodeblock = false;
			RE_DOCCOMMENT_LINE.lastIndex = 3; // after '/**'
			while (true)
			{	const m = RE_DOCCOMMENT_LINE.exec(token.text);
				if (!m)
				{	break;
				}
				const line = m[1];
				if (line.startsWith('```'))
				{	inCodeblock = !inCodeblock;
				}
				const atPos = line.indexOf('@');
				if (atPos >= (inCodeblock ? 0 : 1)) // if there's text preceding `@`, or is in codeblock
				{	const lineEnd = RE_DOCCOMMENT_LINE.lastIndex;
					const substFrom = lineEnd - m[1].length + atPos - 1; // 1 char before first `@` (which is not at line start or is in codeblock)
					const before = token.text.slice(substFrom, lineEnd);
					const after = before.replace(ATSIGN_AFTER_SPACE_FOLLOWED_BY_WORD, m => m.charAt(0) + UNICODE_LEFT_TO_RIGHT_MARK + m.slice(1));
					if (after.length > before.length)
					{	newContent += content.slice(from, offset+substFrom) + after;
						from = offset + lineEnd;
					}
				}
			}
		}
		offset += token.text.length;
	}
	if (from > 0)
	{	content = newContent + content.slice(from);
	}
	return content;
}

export function undoCommentPreprocessing(content: string)
{	return content.replace(RE_UNDO_COMMENT_PREPROCESSING, m => m.slice(1));
}
