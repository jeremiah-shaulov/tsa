import {tsa} from '../../tsa_ns.ts';
import {ExportSymbols} from './export_symbols.ts';
import {step1FindToplevelDeclarations} from './step1_find_toplevel_declarations.ts';
import {step2RemoveDeadCode} from './step2_remove_dead_code.ts';
import {step3ReorderStmtsAccordingToDependency} from './step3_reorder_stmts_according_to_dependency.ts';
import {step4TransformNodes} from './step4_transform_nodes.ts';

export const enum NodeExportType
{	NONE,
	EXPORT,
	EXPORT_UNNAMED_DEFAULT,
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

export function emitBundle(ts: typeof tsa, program: tsa.DenoProgram, excludeLibDirectory?: string)
{	let nodesWithInfo = new Array<NodeWithInfo>; // all the top-level statements (except `import` and `export`) from all modules
	const symbolsNames = new Map<tsa.Symbol, string>; // maps all symbols that top-level statements declare, to their names in the result (they can be renamed)
	const namesSymbols = new Map<string, tsa.Symbol>; // the reverse of `symbolsNames`
	const nodesThatIntroduce = new Map<tsa.Symbol, NodeWithInfo>; // maps all top-level symbols, to elements in `nodesWithInfo`
	const allRefs = new Set<tsa.Symbol>; // all top-level symbols, that are referenced from somewhere (that appear in some `nodesWithInfo[I].refs` or `nodesWithInfo[I].bodyRefs`), so they're not a dead code
	const exportSymbols = new ExportSymbols; // symbols that the first entry point exports
	const sourceFiles = getSourceFiles(ts, program, excludeLibDirectory);
	const checker = program.getTypeChecker();

	/*	1. Find top-level declarations.
		This step runs through `sourceFiles`, and:
		- Adds occured top-level symbols of each module to `symbolsNames` and `namesSymbols`.
		- Adds export declarations to `exportSymbols`.
		- Adds all the top-level statements except import and export to `nodesWithInfo`.
	 */
	step1FindToplevelDeclarations(ts, checker, nodesWithInfo, symbolsNames, namesSymbols, nodesThatIntroduce, exportSymbols, sourceFiles);

	/*	2. Now when i know all the top-level symbols: where they introduced and referenced, i can remove the dead code.
		However classes and function used in type aliases will remain.
	 */
	nodesWithInfo = step2RemoveDeadCode(nodesWithInfo, allRefs, exportSymbols);

	/*	3. Reorder statements according to dependency.
		In order to avoid reading values of constants before their declaration.
	 */
	step3ReorderStmtsAccordingToDependency(ts, nodesWithInfo, nodesThatIntroduce);

	/*	4. Rename symbols, and create exports.
		After step 1 the `symbolsNames` variable contains symbol names as they must be in the resulting bundle.
	 */
	step4TransformNodes(ts, checker, nodesWithInfo, symbolsNames, exportSymbols, sourceFiles[0]);

	/*	5. Done.
	 */
	return nodesWithInfo;
}

function getSourceFiles(ts: typeof tsa, program: tsa.Program, excludeLibDirectory?: string)
{	excludeLibDirectory ??= ts.createCompilerHost({}).getDefaultLibLocation?.();
	const sourceFiles = new Array<tsa.SourceFile>;
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
