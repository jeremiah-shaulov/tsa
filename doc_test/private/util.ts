const RE_JSR_URL = /^jsr:@[a-z0-9-]+\/[a-z0-9-]+(?:@[A-Za-z0-9.-]+)?\/?/;

export function newURL(relPath: string, base: string)
{	try
	{	return new URL(relPath, base);
	}
	catch (e)
	{	const m = RE_JSR_URL.exec(base);
		if (m)
		{	const scopePackage = m[0];
			const url = new URL(relPath, 'http://localhost/'+base.slice(scopePackage.length));
			return new URL(scopePackage + url.href.slice('http://localhost'.length + (scopePackage.endsWith('/') ? 1 : 0)));
		}
		throw e;
	}
}
