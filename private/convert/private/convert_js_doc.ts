import {tsa} from '../../tsa_ns.ts';
import {JsDoc, JsDocTag, JsDocToken} from '../../doc_node/mod.ts';
import {convertType, TYPE_NOT_DETECTED} from './convert_type.ts';
import {convertTypeParamNode} from './convert_type_parameter.ts';
import {Converter} from './converter.ts';
import {indentAndWrap} from '../../deps.ts';
import {undoCommentPreprocessing} from '../../create_deno_program.ts';

const C_BRACE_OPEN = '{'.charCodeAt(0);
const C_BRACE_CLOSE = '}'.charCodeAt(0);
const C_PAREN_OPEN = '('.charCodeAt(0);
const C_PAREN_CLOSE = ')'.charCodeAt(0);
const C_SQUARE_OPEN = '['.charCodeAt(0);
const C_SQUARE_CLOSE = ']'.charCodeAt(0);
const C_EQ = '='.charCodeAt(0);
const C_SPACE = ' '.charCodeAt(0);
const C_TAB = '\t'.charCodeAt(0);

const RE_TRIM_TAG = /\s*\*{0,2}$/;
const RE_EXTRACT_DOC_COMMENT = /\s*\/\*\*+[ \t]*/y;
const RE_PARSE_DOC_COMMENT = /^\/\*+[ \t]*|\*+\/$/g;
const RE_PARSE_DOC_COMMENT_2 = /^\s*\*/gm;

function tagToString(tag: tsa.JSDocTag)
{	return tag.getText().replace(RE_TRIM_TAG, '');
}

/**	Converts 2 things at once:
	- `symbolDisplayParts` - is an object obtained by calling `symbol.getDocumentationComment()`.
	- `docTags` - is an object obtained by calling `ts.getJSDocTags(declaration)`.
	Those will be converted to `{jsDoc: JsDoc}` if any of them is not empty.
 **/
export function convertJsDoc(ts: typeof tsa, converter: Converter, symbolDisplayParts?: readonly tsa.SymbolDisplayPart[], node?: tsa.Node, docTags?: readonly tsa.JSDocTag[]): {jsDoc: JsDoc} | undefined
{	if (!docTags && node)
	{	docTags = ts.getJSDocTags(node);
	}
	if (symbolDisplayParts?.length || docTags?.length)
	{	const extracted = extractJsDocComment(node);
		let doc = undoCommentPreprocessing(extracted);
		const docTokens = new Array<JsDocToken>();
		if (symbolDisplayParts)
		{	for (let {text, kind} of symbolDisplayParts)
			{	text = undoCommentPreprocessing(text);
				if (!extracted)
				{	doc += text;
				}
				docTokens.push({text, kind: kind=='link' || kind=='linkText' || kind=='lineBreak' || kind=='linkName' ? kind : 'text'});
			}
		}
		if (extracted)
		{	correctIndentInTokensAccordingToText(docTokens, extracted);
		}
		const tags: JsDocTag[]|undefined = docTags?.map(tag => convertJsDocTag(ts, converter, tag));
		return {
			jsDoc:
			{	...(doc && {doc}),
				...(doc && {docTokens}),
				...(tags?.length && {tags}),
			}
		};
	}
}

function extractJsDocComment(node?: tsa.Node)
{	if (node)
	{	const {text} = node.getSourceFile();
		RE_EXTRACT_DOC_COMMENT.lastIndex = node.pos;
		if (RE_EXTRACT_DOC_COMMENT.test(text))
		{	const from = RE_EXTRACT_DOC_COMMENT.lastIndex;
			const to = text.indexOf('**/', from);
			if (to!=-1 && to<node.end)
			{	let doc = text.slice(from, to);
				doc = doc.replace(RE_PARSE_DOC_COMMENT_2, '');
				doc = indentAndWrap(doc, {indent: '', ignoreFirstIndent: true});
				return doc;
			}
		}
	}
	return '';
}

/**	Returns object with 2 properties:
	- `doc` is what `ts.getTextOfJSDocComment(comment)` returns.
	- `docTokens` - is the `doc` text, split to tokens in the same format how `symbol.getDocumentationComment()` returns.
 **/
export function convertJsDocComment(ts: typeof tsa, comment?: string|tsa.NodeArray<tsa.JSDocComment>, commentText=''): {doc?: string, docTokens?: JsDocToken[]} | undefined
{	if (comment)
	{	if (typeof(comment) == 'string')
		{	if (comment!='*' && comment!='**')
			{	return {doc: comment, docTokens: [{kind: 'text', text: comment || ''}]};
			}
		}
		else
		{	const docTokens = comment.flatMap<JsDocToken>
			(	comment =>
				{	let text;
					switch (comment.kind)
					{	case ts.SyntaxKind.JSDocLink:
							text = '{@link ';
							break;
						case ts.SyntaxKind.JSDocLinkCode:
							text = '{@linkcode ';
							break;
						case ts.SyntaxKind.JSDocLinkPlain:
							text = '{@linkplain ';
							break;
						default:
							return [{text: undoCommentPreprocessing(comment.text), kind: 'text'}];
					}
					return [{text, kind: 'link'}, {text: comment.getText().slice(text.length, -1), kind: 'linkText'}, {text: '}', kind: 'link'}];
				}
			);
			if (commentText)
			{	commentText = commentText.replace(RE_PARSE_DOC_COMMENT, '').replace(RE_PARSE_DOC_COMMENT_2, '');
				commentText = undoCommentPreprocessing(commentText);
				commentText = indentAndWrap(commentText, {indent: '', ignoreFirstIndent: true});
				correctIndentInTokensAccordingToText(docTokens, commentText);
			}
			else
			{	commentText = docTokens.map(c => c.text).join('');
			}
			return {doc: commentText, docTokens};
		}
	}
}

function correctIndentInTokensAccordingToText(docTokens: JsDocToken[], commentText: string)
{	if (docTokens.length)
	{	let pos = 0;
		let i = 0;
		let iText = docTokens[0].text;
		let j = 0;
		// deno-lint-ignore no-inner-declarations
		function skip(from: number, to: number)
		{	let jFrom = j;
			j += to - from;
			while (j >= iText.length)
			{	const nextFrom = from + (iText.length - jFrom);
				if (commentText.slice(from, nextFrom) != iText.slice(jFrom))
				{	return false;
				}
				from = nextFrom;
				j -= iText.length;
				if (++i >= docTokens.length)
				{	return false;
				}
				iText = docTokens[i].text;
				jFrom = 0;
			}
			return commentText.slice(from, to) == iText.slice(jFrom, jFrom + (to - from));
		}
		while (true)
		{	let pos2 = commentText.indexOf('\n', pos);
			if (pos2 == -1)
			{	break;
			}
			pos2++;
			if (!skip(pos, pos2))
			{	break;
			}
			let rmFrom = -1;
			let rmTo = -1;
			let insFrom = -1;
			while (true)
			{	const c = commentText.charCodeAt(pos2);
				if (c!=C_SPACE && c!=C_TAB)
				{	break;
				}
				if (rmFrom == -1)
				{	let c2 = iText.charCodeAt(j);
					if (c2 != c)
					{	insFrom = pos2;
						rmFrom = j;
						while (c2==C_SPACE || c2==C_TAB)
						{	c2 = iText.charCodeAt(++j);
						}
						rmTo = j;
					}
				}
				pos2++;
			}
			if (insFrom != -1)
			{	docTokens[i].text = iText = iText.slice(0, rmFrom) + commentText.slice(insFrom, pos2) + iText.slice(rmTo);
				j += pos2 - insFrom;
			}
			pos = pos2;
		}
	}
}

function convertJsDocTag(ts: typeof tsa, converter: Converter, tag: tsa.JSDocTag): JsDocTag
{	if (ts.isJSDocPublicTag(tag))
	{	return {kind: 'public'};
	}
	else if (ts.isJSDocPrivateTag(tag))
	{	return {kind: 'private'};
	}
	else if (ts.isJSDocProtectedTag(tag))
	{	return {kind: 'protected'};
	}
	else if (ts.isJSDocReadonlyTag(tag))
	{	return {kind: 'readonly'};
	}
	else if (ts.isJSDocClassTag(tag))
	{	return {kind: 'constructor'};
	}
	else if (ts.isJSDocCallbackTag(tag))
	{	const tsType = tag.typeExpression && convertType(ts, converter, tag.typeExpression);
		return {
			kind: 'callback',
			name: (tag.fullName ?? tag.name)?.getText() ?? '',
			...(tsType && tsType!=TYPE_NOT_DETECTED && {tsType}),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocTemplateTag(tag))
	{	const tsType = tag.constraint && convertType(ts, converter, tag.constraint.type);
		return {
			kind: 'template',
			name: tag.typeParameters.map(p => p.name.getText()).join(','),
			...(tsType && tsType!=TYPE_NOT_DETECTED && {tsType}),
			typeParams: tag.typeParameters.map(param => convertTypeParamNode(ts, converter, param)),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocEnumTag(tag))
	{	const tsType = convertType(ts, converter, tag.typeExpression.type);
		return {
			kind: 'enum',
			type: typeExpressionToString(ts, tag.typeExpression),
			...(tsType && tsType!=TYPE_NOT_DETECTED && {tsType}),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocThisTag(tag))
	{	const tsType = convertType(ts, converter, tag.typeExpression.type);
		return {
			kind: 'this',
			type: typeExpressionToString(ts, tag.typeExpression),
			...(tsType && tsType!=TYPE_NOT_DETECTED && {tsType}),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocTypeTag(tag))
	{	const tsType = convertType(ts, converter, tag.typeExpression.type);
		return {
			kind: 'type',
			type: typeExpressionToString(ts, tag.typeExpression),
			...(tsType && tsType!=TYPE_NOT_DETECTED && {tsType}),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocAugmentsTag(tag))
	{	return {
			kind: 'extends',
			type: tag.class.getText(),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocPropertyTag(tag))
	{	return {
			kind: 'property',
			name: tag.name.getText(),
			type: typeExpressionToString(ts, tag.typeExpression),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocTypedefTag(tag))
	{	const tsType = convertType(ts, converter, tag.typeExpression);
		return {
			kind: 'typedef',
			name: (tag.fullName ?? tag.name)?.getText() ?? '',
			type: typeExpressionToString(ts, tag.typeExpression),
			...(tsType && tsType!=TYPE_NOT_DETECTED && {tsType}),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocParameterTag(tag))
	{	const optional = tag.isBracketed;
		const init = parseParamDefaultValue(tag);
		const type = typeExpressionToString(ts, tag.typeExpression);
		const tsType = convertType(ts, converter, tag.typeExpression?.type);
		return {
			kind: 'param',
			name: tag.name.getText(),
			...(type && {type}),
			...(tsType && tsType!=TYPE_NOT_DETECTED && {tsType}),
			...(init!=undefined ? {default: init} : optional && {optional}),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocReturnTag(tag))
	{	const type = typeExpressionToString(ts, tag.typeExpression);
		return {
			kind: 'return',
			...(type && {type}),
			...convertJsDocComment(ts, tag.comment),
		};
	}
	else if (ts.isJSDocImplementsTag(tag))
	{	return {kind: 'unsupported', value: tagToString(tag)};
	}
	else if (ts.isJSDocAuthorTag(tag))
	{	return {kind: 'unsupported', value: tagToString(tag)};
	}
	else if (ts.isJSDocDeprecatedTag?.(tag)) // isJSDocDeprecatedTag is since typescript 4.0
	{	return {kind: 'deprecated', ...convertJsDocComment(ts, tag.comment)};
	}
	else if (ts.isJSDocSeeTag?.(tag)) // isJSDocOverloadTag is since typescript 4.2
	{	const name = tag.name?.getText();
		const text = tag.comment && ts.getTextOfJSDocComment(tag.comment);
		return {
			kind: 'unsupported',
			value: '@see' + (!name ? '' : ' '+name + (!text || text=='**' ? '' : ' '+text)),
		};
	}
	else if (ts.isJSDocOverrideTag?.(tag)) // isJSDocOverloadTag is since typescript 4.3
	{	return {kind: 'unsupported', value: tagToString(tag)};
	}
	else if (ts.isJSDocOverloadTag?.(tag)) // isJSDocOverloadTag is since typescript 5.0
	{	return {kind: 'unsupported', value: tagToString(tag)};
	}
	else if (ts.isJSDocThrowsTag?.(tag) || ts.isJSDocSatisfiesTag?.(tag)) // isJSDocThrowsTag and isJSDocSatisfiesTag are since typescript 5.0
	{	const comment = tag.comment && ts.getTextOfJSDocComment(tag.comment);
		let type = typeExpressionToString(ts, tag.typeExpression);
		type = !comment ? `{${type}}` : !type ? comment : `{${type}} ${comment}`;
		return {
			kind: 'unsupported',
			value: '@' + tag.tagName.getText() + (!type ? '' : ' '+type),
		};
	}
	const kind = tag.tagName.text;
	switch (kind)
	{	case 'ignore':
		case 'module':
			return {kind};
		case 'category':
		case 'example':
			return {kind, ...convertJsDocComment(ts, tag.comment)};
		case 'default':
			return {kind, value: convertJsDocComment(ts, tag.comment)?.doc ?? ''};
	}
	return {kind: 'unsupported', value: tagToString(tag)};
}

function typeExpressionToString(ts: typeof tsa, typeExpression?: tsa.JSDocTypeExpression|tsa.JSDocTypeLiteral)
{	if (typeExpression && ts.isJSDocTypeLiteral(typeExpression))
	{	return !typeExpression.isArrayType ? 'Object' : 'Object[]';
	}
	else
	{	const tagExprType = typeExpression?.type;
		return !tagExprType || !ts.isJSDocTypeLiteral(tagExprType) ? tagExprType?.getText() || '' : !tagExprType.isArrayType ? 'Object' : 'Object[]';
	}
}

function parseParamDefaultValue(tag: tsa.JSDocParameterTag)
{	if (tag.isBracketed)
	{	const tagText = tag.getText();
		for (let i=6, iEnd=tagText.length, level=0, eq=-1; i<iEnd; i++) // start from 6 (`'@param'.length`)
		{	switch (tagText.charCodeAt(i))
			{	case C_BRACE_OPEN:
				case C_PAREN_OPEN:
					level++;
					break;

				case C_SQUARE_OPEN:
					if (level++ == 0)
					{	eq = 0; // `eq == 0` means inside toplevel square brackets
					}
					break;

				case C_EQ:
					if (eq == 0)
					{	eq = i; // `eq > 0` means after `=` inside toplevel square brackets, and `eq` is set to the position of the `=` char
					}
					break;

				case C_BRACE_CLOSE:
				case C_PAREN_CLOSE:
					--level;
					break;

				case C_SQUARE_CLOSE:
					if (--level == 0)
					{	return eq<=0 ? undefined : tagText.slice(eq+1, i).trim();
					}
					break;
			}
		}
	}
}
