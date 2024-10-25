import {Accessibility, JsDoc} from "../../doc_node/mod.ts";

const RE_NLS = /\r?\n/g;
const RE_MD_ESCAPE = /[`[{<*_~\\#]/g;
const RE_MD_ESCAPE_LINK_TEXT = /[`[{<*_~\\#\]]/g;
const RE_MD_ENCODE_URI = /[^\w\-$.';\/?:@&=+,#]+/g;
const RE_MD_BLOCKQUOTE = /^>*/gm;
const RE_BAD_SHELL_CHAR = /[^\w%+\-.\/:=@]/;

const encoder = new TextEncoder;

export function mdEscape(text: string)
{	return text.replace(RE_MD_ESCAPE, c => `\\${c}`).replace(RE_NLS, '<br>');
}

function mdEscapeLinkText(text: string)
{	return text.replace(RE_MD_ESCAPE_LINK_TEXT, c => `\\${c}`).replace(RE_NLS, '<br>');
}

function mdEncodeURI(text: string)
{	return text.replace
	(	RE_MD_ENCODE_URI,
		c =>
		{	const buf = encoder.encode(c);
			let t = '';
			for (const b of buf)
			{	t += b<=0xF ? '%0'+b.toString(16) : '%'+b.toString(16);
			}
			return t;
		}
	);
}

export function mdLink(text: string, href: string, isMonospace=false)
{	text = mdEscapeLinkText(text);
	href = mdEncodeURI(href);
	return isMonospace ? `[\`${text}\`](${href})` : `[${text}](${href})`;
}

export function mdBlockquote(text: string)
{	return !text ? '' : text.replace(RE_MD_BLOCKQUOTE, m => m ? m+'>' : '> ') + '\n\n';
}

export function isPublicOrProtected(node: object | {accessibility?: Accessibility, jsDoc?: JsDoc})
{	if ('accessibility' in node && node.accessibility==='private')
	{	return false;
	}
	if ('jsDoc' in node)
	{	return (node.jsDoc?.tags?.findIndex(v => v.kind == 'private') ?? -1) == -1;
	}
	return true;
}

export function isDeprecated(node: object | {jsDoc?: JsDoc})
{	return ('jsDoc' in node ? node.jsDoc : undefined)?.tags?.find(t => t.kind == 'deprecated') != undefined;
}

export function escapeShellArg(arg: string)
{	return RE_BAD_SHELL_CHAR.test(arg) ? "'" + arg.replaceAll("'", "'\\''") + "'" : arg;
}
