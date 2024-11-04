# `interface` OutliningSpan

[Documentation Index](../README.md)

## This interface has

- 5 properties:
[textSpan](#-textspan-textspan),
[hintSpan](#-hintspan-textspan),
[bannerText](#-bannertext-string),
[autoCollapse](#-autocollapse-boolean),
[kind](#-kind-outliningspankind)


#### 📄 textSpan: [TextSpan](../interface.TextSpan/README.md)

> The span of the document to actually collapse.



#### 📄 hintSpan: [TextSpan](../interface.TextSpan/README.md)

> The span of the document to display when the user hovers over the collapsed span.



#### 📄 bannerText: `string`

> The text to display in the editor for the collapsed region.



#### 📄 autoCollapse: `boolean`

> Whether or not this region should be automatically collapsed when
> the 'Collapse to Definitions' command is invoked.



#### 📄 kind: [OutliningSpanKind](../enum.OutliningSpanKind/README.md)

> Classification of the contents of the span



