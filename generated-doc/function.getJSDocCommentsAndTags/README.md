# `function` getJSDocCommentsAndTags

[Documentation Index](../README.md)

This function checks multiple locations for JSDoc comments that apply to a host node.
At each location, the whole comment may apply to the node, or only a specific tag in
the comment. In the first case, location adds the entire JSDoc object. In the
second case, it adds the applicable JSDocTag.

For example, a JSDoc comment before a parameter adds the entire JSDoc. But a
`@param` tag on the parent function only adds the JSDocTag for the `@param`.

```ts
/** JSDoc will be returned for `a` *\/
const a = 0
/**
 * Entire JSDoc will be returned for `b`
 *

`function` getJSDocCommentsAndTags(hostNode: [Node](../private.interface.Node/README.md)): readonly (JSDocTag | JSDoc)\[]