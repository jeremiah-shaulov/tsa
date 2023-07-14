import {tsa} from '../../tsa_ns.ts';
import {ExportSymbols} from './export_symbols.ts';
import {KnownSymbols} from './known_symbols.ts';
import {step1FindToplevelDeclarations} from './step1_find_toplevel_declarations.ts';
import {step2FindRefs} from './step2_find_refs.ts';
import {step3RemoveDeadCode} from './step3_remove_dead_code.ts';
import {step4ReorderStmtsAccordingToDependency} from './step4_reorder_stmts_according_to_dependency.ts';
import {step5TransformNodes} from './step5_transform_nodes.ts';
import {TsaBundle} from './tsa_bundle.ts';

export const enum NodeExportType
{	/**	Like `function f() {}`.
	 **/
	NONE,

	/**	Like `export function f() {}`.
	 **/
	EXPORT,

	/**	Like `export default function f() {}`.
	 **/
	EXPORT_DEFAULT,

	/**	Like `export default function() {}`.
	 **/
	EXPORT_DEFAULT_UNNAMED,
}

export type NodeWithInfo =
{	/**	From what file this node originates. Even if `node.getSourceFile()` returns undefined.
	 **/
	sourceFile: tsa.SourceFile,

	/**	The node.
	 **/
	node: tsa.Node;

	/**	What global symbols does this node reference (use).
	 **/
	refs: Set<tsa.Symbol>;

	/**	If this node introduces a function or a method, here is what the function body references (uses).
	 **/
	bodyRefs: Set<tsa.Symbol>;

	/**	What global symbols does this node introduce (declare).
		For example:
		```ts
		let a = b + c;
		```
		References `b` and `c`, and introduces `a`.
	 **/
	introduces: tsa.Symbol[];

	/**	This statement introduces it's symbols with `export` keyword. Or it's `export default () => 'unnamed symbol'`
	 **/
	nodeExportType: NodeExportType;
};

export function emitTsaBundle(ts: typeof tsa, program: tsa.TsaProgram, lib?: string[], excludeLibDirectory?: string, newLine?: string)
{	if (!excludeLibDirectory || !newLine)
	{	const host = ts.createCompilerHost({});
		if (!excludeLibDirectory)
		{	excludeLibDirectory = host.getDefaultLibLocation?.() ?? '';
		}
		if (!newLine)
		{	newLine = host.getNewLine();
		}
	}

	let nodesWithInfo = new Array<NodeWithInfo>; // all the top-level statements (except `import` and `export`) from all modules
	const knownSymbols = new KnownSymbols;
	const nodesThatIntroduce = new Map<tsa.Symbol, NodeWithInfo>; // maps all top-level symbols, to elements in `nodesWithInfo`
	const exportSymbols = new ExportSymbols; // symbols that the first entry point exports
	const sourceFiles = getSourceFiles(program, excludeLibDirectory);
	const checker = program.getTypeChecker();

	/*	1. Find top-level declarations.
		This step runs through `sourceFiles`, and:
		- Adds occured top-level symbols of each module to `symbolsNames` and `namesSymbols`.
		- Adds export declarations to `exportSymbols`.
		- Adds all the top-level statements except import and export to `nodesWithInfo`. At this point `nodeWithInfo.refs` and `nodeWithInfo.bodyRefs` are not set.
	 */
	step1FindToplevelDeclarations(ts, checker, nodesWithInfo, knownSymbols, nodesThatIntroduce, exportSymbols, sourceFiles, excludeLibDirectory);

	/*	2. Find what symbol does each statement reference (use), and store this information in `nodeWithInfo.refs` and `nodeWithInfo.bodyRefs`.
		Only references to top-level symbols present in `symbolsNames` (that is populated in step 1) are counted.
	 */
	step2FindRefs(ts, checker, nodesWithInfo, knownSymbols, excludeLibDirectory);

	/*	3. Now when i know all the top-level symbols: where they introduced and referenced, i can remove the dead code.
		However classes and function used in type aliases will remain.
	 */
	nodesWithInfo = step3RemoveDeadCode(nodesWithInfo, exportSymbols);

	/*	4. Reorder statements according to dependency.
		In order to avoid reading values of constants before their declaration.
	 */
	step4ReorderStmtsAccordingToDependency(ts, nodesWithInfo, nodesThatIntroduce);

	/*	5. Rename symbols, and create exports.
		After step 1 the `symbolsNames` variable contains symbol names as they must be in the resulting bundle.
	 */
	step5TransformNodes(ts, checker, nodesWithInfo, knownSymbols, exportSymbols, sourceFiles[0], excludeLibDirectory);

	/*	6. Done.
	 */
	return new TsaBundle(ts, nodesWithInfo, lib, newLine);
}

function getSourceFiles(program: tsa.Program, excludeLibDirectory: string)
{	const sourceFiles = new Array<tsa.SourceFile>;
	for (const moduleHref of program.getRootFileNames())
	{	const sourceFile = program.getSourceFile(moduleHref);
		if (sourceFile)
		{	sourceFiles.push(sourceFile);
		}
	}
	for (const sourceFile of program.getSourceFiles().toSorted((a, b) => a.fileName < b.fileName ? -1 : a.fileName > b.fileName ? +1 : 0))
	{	if ((!excludeLibDirectory || !sourceFile.fileName.startsWith(excludeLibDirectory)) && !sourceFiles.includes(sourceFile))
		{	sourceFiles.push(sourceFile);
		}
	}
	return sourceFiles;
}
