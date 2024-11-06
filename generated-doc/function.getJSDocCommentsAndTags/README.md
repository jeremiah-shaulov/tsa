# `function` getJSDocCommentsAndTags

[Documentation Index](../README.md)

`function` getJSDocCommentsAndTags(hostNode: [Node](../interface.Node/README.md)): readonly (JSDocTag | JSDoc)\[]

This function checks multiple locations for JSDoc comments that apply to a host node.
At each location, the whole comment may apply to the node, or only a specific tag in
the comment. In the first case, location adds the entire [JSDoc](../interface.JSDoc/README.md) object. In the
second case, it adds the applicable [JSDocTag](../interface.JSDocTag/README.md).

For example, a JSDoc comment before a parameter adds the entire [JSDoc](../interface.JSDoc/README.md). But a
`@param` tag on the parent function only adds the [JSDocTag](../interface.JSDocTag/README.md) for the `@param`.

```ts
/** JSDoc will be returned for `a` *\/
const a = 0
/**
 * Entire JSDoc will be returned for `b`
 * @param c JSDocTag will be returned for `c`
 *\/
function b(/** JSDoc will be returned for `c` *\/ c) {}
```

