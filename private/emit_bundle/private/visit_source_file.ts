import {tsa} from '../../tsa_ns.ts';

export function visitSourceFile
(	sourceFile: tsa.SourceFile,
	visitor: (node: tsa.Node, level: number) => tsa.VisitResult<tsa.Node>
)
{	let level = 0;
	sourceFile.forEachChild(visit);

	function visit(node: tsa.Node)
	{	level++;
		node.forEachChild(visit);
		level--;
		visitor(node, level);
	}
}

export function transformSourceFile
(	ts: typeof tsa,
	sourceFile: tsa.SourceFile,
	visitor: (node: tsa.Node, level: number, context: tsa.TransformationContext) => tsa.VisitResult<tsa.Node>,
	onEnd?: (context: tsa.TransformationContext) => void
)
{	const result = ts.transform(sourceFile, [transformerFactory]);
	return result.transformed[0];

	function transformerFactory(context: tsa.TransformationContext)
	{	let level = -1;

		return function(rootNode: tsa.Node)
		{	const result = ts.visitNode(rootNode, visit);
			onEnd?.(context);
			return result;
		};

		function visit(node: tsa.Node)
		{	level++;
			node = ts.visitEachChild(node, visit, context);
			level--;
			return level==-1 ? node : visitor(node, level, context);
		}
	}
}
