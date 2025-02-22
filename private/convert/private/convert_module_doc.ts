import {tsa} from '../../tsa_ns.ts';
import {DocNodeModuleDoc, JsDoc} from '../../doc_node/mod.ts';
import {convertJsDoc, convertJsDocComment} from './convert_js_doc.ts';
import {convertLocation} from './convert_location.ts';
import {Converter} from './converter.ts';

export function convertModuleDoc(ts: typeof tsa, converter: Converter, sourceFile: tsa.SourceFile): DocNodeModuleDoc|undefined
{	const firstStmt = sourceFile.statements[0];
	if (firstStmt && 'jsDoc' in firstStmt && Array.isArray(firstStmt.jsDoc) && firstStmt.jsDoc.length>0 && ts.isJSDoc(firstStmt.jsDoc[0]))
	{	const firstComment = firstStmt.jsDoc[0];
		if (firstComment.tags?.some(tag => tag.tagName.getText()=='module'))
		{	let jsDoc: JsDoc|undefined = convertJsDocComment(ts, firstComment.comment, sourceFile.text.slice(firstComment.pos, firstComment.end));
			const tags = convertJsDoc(ts, converter, undefined, undefined, firstComment.tags)?.jsDoc.tags;
			if (tags)
			{	if (!jsDoc)
				{	jsDoc = {};
				}
				jsDoc.tags = tags;
			}
			if (jsDoc)
			{	return {
					kind: 'moduleDoc',
					name: '',
					location: convertLocation(ts, converter, firstStmt),
					declarationKind: 'export',
					jsDoc,
				};
			}
		}
	}
}
