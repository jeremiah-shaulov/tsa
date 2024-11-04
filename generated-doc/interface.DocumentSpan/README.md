# `interface` DocumentSpan

[Documentation Index](../README.md)

## This interface has

- 6 properties:
[textSpan](#-textspan-textspan),
[fileName](#-filename-string),
[originalTextSpan](#-originaltextspan-textspan),
[originalFileName](#-originalfilename-string),
[contextSpan](#-contextspan-textspan),
[originalContextSpan](#-originalcontextspan-textspan)


#### 📄 textSpan: [TextSpan](../interface.TextSpan/README.md)



#### 📄 fileName: `string`



#### 📄 originalTextSpan?: [TextSpan](../interface.TextSpan/README.md)

> If the span represents a location that was remapped (e.g. via a .d.ts.map file),
> then the original filename and span will be specified here



#### 📄 originalFileName?: `string`



#### 📄 contextSpan?: [TextSpan](../interface.TextSpan/README.md)

> If DocumentSpan.textSpan is the span for name of the declaration,
> then this is the span for relevant declaration



#### 📄 originalContextSpan?: [TextSpan](../interface.TextSpan/README.md)



