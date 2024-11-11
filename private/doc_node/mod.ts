/** This file is downloaded from: `https://github.com/denoland/deno_doc/blob/0.69.2/js/types.d.ts`.
    Then modified. Use file comparator to find what's changed.

    In brief:
    - Added `entryPointNumber` to `Location`.
    - Added interface `Export`, and added `exports: Export[]` to `DocNodeBase`.
    - Added `init` to `ClassPropertyDef`.
    - Added `isConst` to `EnumDef`.
    - Added interface `JsDocToken`, and added `docTokens?: JsDocToken[]` everywhere near `doc`.
    - Added `tsType` to `JsDocTagTyped` and `JsDocTagParam`.
    - Added `tsType` and `typeParams` to `JsDocTagNamed`.
    - Added `nodeIndex` to `DecoratorDef`.
    - Added `nodeIndex` and `nodeSubIndex` to `TsTypeRefDef`.
    - Added `superNodeIndex` to `ClassDef`.
    - Added `jsDoc` to `LiteralMethodDef`, `LiteralPropertyDef`, `LiteralCallSignatureDef` and `LiteralIndexSignatureDef`

    @module
 **/

// Copyright 2020-2022 the Deno authors. All rights reserved. MIT license.

/** This type matches `DocNode` type from [x/deno_doc](https://deno.land/x/deno_doc@0.62.0) with several additions:

    - {@link Location} has additional [entryPointNumber]{@link Location.entryPointNumber} field.
    You can pass relative paths to [createTsaProgram()]{@link tsa.createTsaProgram} as entry points, but {@link Location.filename} always contains corresponding absolute URL.
    If this filename is one of the entry points, the {@link Location.entryPointNumber} field will contain the index in `entryPoints` array provided to [createTsaProgram()]{@link tsa.createTsaProgram}.
    - `DocNode` has additional [exports]{@link DocNode.exports} field. If a symbol is reexported from several places, those places will be recorded here (including current location).
    - {@link ClassPropertyDef} has additional [init]{@link ClassPropertyDef.init} field that contains property initializer (if any).
    - {@link EnumDef} has additional [isConst]{@link EnumDef.isConst} field for `const enum`s.
    - Doc-comments are returned not only as [doc]{@link JsDoc.doc} string, but also [docTokens]{@link JsDoc.docTokens}, that have separate parts for comment text and `@link` tags.
    - {@link JsDocTagTyped} (for `@enum`, `@extends`, `@this` and `@type` tags) and {@link JsDocTagParam} (for `@param`) have additional `tsType` field for the object type.
    - {@link JsDocTagNamed} (for `@callback` and `@template` tags) has additional [tsType]{@link JsDocTagNamed.tsType} and [typeParams]{@link JsDocTagNamed.typeParams} fields.
    - {@link DecoratorDef} has additional [nameNodeIndex]{@link DecoratorDef.nameNodeIndex} field that contains node index in the results where this decorator function is returned, if it's returned.
    To include referenced symbols in the result, use {@link EmitDocOptions.includeReferenced} option.
    - In {@link ClassPropertyDef}, {@link ClassMethodDef}, {@link InterfaceMethodDef}, {@link InterfacePropertyDef}, {@link LiteralPropertyDef} and {@link LiteralMethodDef}, if property or method name is computed identifier (like `[ident]: type`),
    they can have additional [nameNodeIndex]{@link ClassPropertyDef.nameNodeIndex} field with node index in the results for the identifier ({@link EmitDocOptions.includeReferenced} option is also needed).
    - References to another named types are returned as {@link TsTypeRefDef} objects that contain not only [typeName]{@link TsTypeRefDef.typeName},
    but also additional [nodeIndex]{@link TsTypeRefDef.nodeIndex} field, that contains index in the results for this type.
    If the type is an enum member, also [nodeSubIndex]{@link TsTypeRefDef.nodeSubIndex} will be set to member number. See {@link EmitDocOptions.includeReferenced}.
    - {@link ClassDef} has additional `superNodeIndex` field, that contains node index in the results for the super class. See {@link EmitDocOptions.includeReferenced}.
    - {@link TsTypeDef.repr} field for string literals (`kind == 'string'`) contains quotes, for string template literals (`kind == 'template'`) contains backticks, and for bigint literals (`kind == 'bigInt'`) has trailing `n`.
 **/
export type DocNode =
  | DocNodeModuleDoc
  | DocNodeFunction
  | DocNodeVariable
  | DocNodeEnum
  | DocNodeClass
  | DocNodeTypeAlias
  | DocNodeNamespace
  | DocNodeInterface
  | DocNodeImport;

/** Indicates how the documentation node was declared. `"private"` indicates
 * the node is un-exported. `"export"` indicates it is exported from the current
 * module. `"declare"` indicates that it is a type only declaration. */
export type DeclarationKind = "private" | "export" | "declare";

interface DocNodeBase {
  kind: DocNodeKind;
  name: string;
  location: Location;
  declarationKind: DeclarationKind;
  jsDoc?: JsDoc;
  /** All the places from where this symbol is exported.
   * Will not be set if this declaration is `declarationKind == 'export'`, and no other places are found.
   **/
  exports?: Export[];
}

export interface Export {
  name: string;
  location: Location;
}

export type DocNodeKind =
  | "moduleDoc"
  | "function"
  | "variable"
  | "enum"
  | "class"
  | "typeAlias"
  | "namespace"
  | "interface"
  | "import";

export interface DocNodeModuleDoc extends DocNodeBase {
  kind: "moduleDoc";
  jsDoc: JsDoc;
}

export interface DocNodeFunction extends DocNodeBase {
  kind: "function";
  functionDef: FunctionDef;
}

export interface DocNodeVariable extends DocNodeBase {
  kind: "variable";
  variableDef: VariableDef;
}

export interface DocNodeEnum extends DocNodeBase {
  kind: "enum";
  enumDef: EnumDef;
}

export interface DocNodeClass extends DocNodeBase {
  kind: "class";
  classDef: ClassDef;
}

export interface DocNodeTypeAlias extends DocNodeBase {
  kind: "typeAlias";
  typeAliasDef: TypeAliasDef;
}

export interface DocNodeNamespace extends DocNodeBase {
  kind: "namespace";
  namespaceDef: NamespaceDef;
}

export interface DocNodeInterface extends DocNodeBase {
  kind: "interface";
  interfaceDef: InterfaceDef;
}

export interface DocNodeImport extends DocNodeBase {
  kind: "import";
  importDef: ImportDef;
}

export type Accessibility = "public" | "protected" | "private";

export interface ClassDef {
  isAbstract: boolean;
  constructors: ClassConstructorDef[];
  properties: ClassPropertyDef[];
  indexSignatures: ClassIndexSignatureDef[];
  methods: ClassMethodDef[];
  extends?: string;
  implements: TsTypeDef[];
  typeParams: TsTypeParamDef[];
  superTypeParams: TsTypeDef[];
  superNodeIndex?: number;
  decorators?: DecoratorDef[];
}

export type ClassConstructorParamDef = ParamDef & {
  accessibility?: Accessibility;
  isOverride?: boolean;
  readonly?: boolean;
};

export interface ClassConstructorDef {
  jsDoc?: JsDoc;
  accessibility?: Accessibility;
  isOptional?: boolean;
  hasBody?: boolean;
  name: string;
  params: ClassConstructorParamDef[];
  location: Location;
}

export interface ClassIndexSignatureDef {
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
}

export interface ClassMethodDef {
  jsDoc?: JsDoc;
  accessibility?: Accessibility;
  optional: boolean;
  isAbstract: boolean;
  isStatic: boolean;
  isOverride?: boolean;
  name: string;
  kind: MethodKind;
  functionDef: FunctionDef;
  location: Location;
  nameNodeIndex?: number;
}

export interface ClassPropertyDef {
  jsDoc?: JsDoc;
  tsType?: TsTypeDef;
  readonly: boolean;
  accessibility?: Accessibility;
  optional: boolean;
  /** Property initializer expression.
   **/
  init?: string;
  isAbstract: boolean;
  isStatic: boolean;
  isOverride?: boolean;
  name: string;
  decorators?: DecoratorDef[];
  location: Location;
  nameNodeIndex?: number;
}

export interface DecoratorDef {
  name: string;
  args?: string[];
  location: Location;
  nameNodeIndex?: number;
}

export interface EnumDef {
  members: EnumMemberDef[];
  /** Is `const enum`?
   **/
  isConst?: boolean;
}

export interface EnumMemberDef {
  name: string;
  init?: TsTypeDef;
  jsDoc?: JsDoc;
  location: Location;
}

export interface FunctionDef {
  params: ParamDef[];
  returnType?: TsTypeDef;
  hasBody?: boolean;
  isAsync: boolean;
  isGenerator: boolean;
  typeParams: TsTypeParamDef[];
  decorators?: DecoratorDef[];
}

export interface ImportDef {
  src: string;
  imported?: string;
}

export interface InterfaceDef {
  extends: TsTypeDef[];
  methods: InterfaceMethodDef[];
  properties: InterfacePropertyDef[];
  callSignatures: InterfaceCallSignatureDef[];
  indexSignatures: InterfaceIndexSignatureDef[];
  typeParams: TsTypeParamDef[];
}

export interface InterfaceCallSignatureDef {
  location: Location;
  jsDoc?: JsDoc;
  params: ParamDef[];
  tsType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
}

export interface InterfaceIndexSignatureDef {
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
}

export interface InterfaceMethodDef {
  name: string;
  kind: MethodKind;
  location: Location;
  jsDoc?: JsDoc;
  computed?: boolean;
  optional: boolean;
  params: ParamDef[];
  returnType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
  nameNodeIndex?: number;
}

export interface InterfacePropertyDef {
  name: string;
  location: Location;
  jsDoc?: JsDoc;
  params: ParamDef[];
  readonly?: boolean;
  computed: boolean;
  optional: boolean;
  tsType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
  nameNodeIndex?: number;
}

/** Doc-comment string split to tokens.
 *
 * `lineBreak` token separates several concatenated doc-comments.
 **/
export interface JsDocToken {
  text: string;
  kind: 'text' | 'lineBreak' | 'link' | 'linkText' | 'linkName';
}

export interface JsDoc {
  doc?: string;
  /** Doc-comment string split to tokens.
   **/
  docTokens?: JsDocToken[];
  tags?: JsDocTag[];
}

export type JsDocTagKind =
  | "callback"
  | "category"
  | "constructor"
  | "default"
  | "deprecated"
  | "enum"
  | "example"
  | "extends"
  | "ignore"
  | "module"
  | "param"
  | "public"
  | "private"
  | "property"
  | "protected"
  | "readonly"
  | "return"
  | "tags"
  | "template"
  | "this"
  | "typedef"
  | "type"
  | "unsupported";

export type JsDocTag =
  | JsDocTagOnly
  | JsDocTagDoc
  | JsDocTagNamed
  | JsDocTagValued
  | JsDocTagTyped
  | JsDocTagNamedTyped
  | JsDocTagParam
  | JsDocTagReturn
  | JsDocTagTags
  | JsDocTagUnsupported;

export interface JsDocTagBase {
  kind: JsDocTagKind;
}

export interface JsDocTagOnly extends JsDocTagBase {
  kind:
    | "constructor"
    | "ignore"
    | "module"
    | "public"
    | "private"
    | "protected"
    | "readonly";
}

export interface JsDocTagDoc extends JsDocTagBase {
  kind: "category" | "deprecated" | "example";
  doc?: string;
  docTokens?: JsDocToken[];
}

export interface JsDocTagNamed extends JsDocTagBase {
  kind: "callback" | "template";
  name: string;
  doc?: string;
  docTokens?: JsDocToken[];
  tsType?: TsTypeDef;
  typeParams?: TsTypeParamDef[];
}

export interface JsDocTagValued extends JsDocTagBase {
  kind: "default";
  value: string;
  doc?: string;
  docTokens?: JsDocToken[];
}

export interface JsDocTagTyped extends JsDocTagBase {
  kind: "enum" | "extends" | "this" | "type";
  type: string;
  tsType?: TsTypeDef;
  doc?: string;
  docTokens?: JsDocToken[];
}

export interface JsDocTagNamedTyped extends JsDocTagBase {
  kind: "property" | "typedef";
  name: string;
  type: string;
  doc?: string;
  docTokens?: JsDocToken[];
}

export interface JsDocTagParam extends JsDocTagBase {
  kind: "param";
  name: string;
  type?: string;
  tsType?: TsTypeDef;
  optional?: true;
  default?: string;
  doc?: string;
  docTokens?: JsDocToken[];
}

export interface JsDocTagReturn extends JsDocTagBase {
  kind: "return";
  type?: string;
  doc?: string;
  docTokens?: JsDocToken[];
}

export interface JsDocTagTags extends JsDocTagBase {
  kind: "tags";
  tags: string[];
}

export interface JsDocTagUnsupported extends JsDocTagBase {
  kind: "unsupported";
  value: string;
}

export interface LiteralCallSignatureDef {
  params: ParamDef[];
  tsType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
  jsDoc?: JsDoc;
}

export type LiteralDefKind =
  | "number"
  | "string"
  | "template"
  | "boolean"
  | "bigInt";

export type LiteralDef =
  | LiteralDefNumber
  | LiteralDefBigInt
  | LiteralDefString
  | LiteralDefTemplate
  | LiteralDefBoolean;

interface LiteralDefBase {
  kind: LiteralDefKind;
}

export interface LiteralDefNumber extends LiteralDefBase {
  kind: "number";
  number: number;
}

export interface LiteralDefBigInt extends LiteralDefBase {
  kind: "bigInt";
  string: string;
}

export interface LiteralDefString extends LiteralDefBase {
  kind: "string";
  string: string;
}

export interface LiteralDefTemplate extends LiteralDefBase {
  kind: "template";
  tsTypes: TsTypeDef[];
}

export interface LiteralDefBoolean extends LiteralDefBase {
  kind: "boolean";
  boolean: boolean;
}

export interface LiteralIndexSignatureDef {
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
  jsDoc?: JsDoc;
}

export interface LiteralMethodDef {
  name: string;
  kind: MethodKind;
  params: ParamDef[];
  computed?: boolean;
  optional: boolean;
  returnType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
  jsDoc?: JsDoc;
  nameNodeIndex?: number;
}

export interface LiteralPropertyDef {
  name: string;
  params: ParamDef[];
  readonly?: boolean;
  computed: boolean;
  optional: boolean;
  tsType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
  jsDoc?: JsDoc;
  nameNodeIndex?: number;
}

export interface Location {
  filename: string;
  line: number;
  col: number;
  /** If the filename corresponds to one of the entry points passed to `createTsaProgram()`.
   * `filename` here is always absolute URL, even if a relative path was passed.
   **/
  entryPointNumber?: number;
}

export type MethodKind = "method" | "getter" | "setter";

export interface NamespaceDef {
  elements: DocNode[];
}

export type ObjectPatPropDef =
  | ObjectPatPropAssignDef
  | ObjectPatPropKeyValueDef
  | ObjectPatPropRestDef;

export interface ObjectPatPropAssignDef {
  kind: "assign";
  key: string;
  value?: string;
}

export interface ObjectPatPropKeyValueDef {
  kind: "keyValue";
  key: string;
  value: ParamDef;
}

export interface ObjectPatPropRestDef {
  kind: "rest";
  arg: ParamDef;
}

export type ParamDef =
  | ParamArrayDef
  | ParamAssignDef
  | ParamIdentifierDef
  | ParamObjectDef
  | ParamRestDef;

export interface ParamArrayDef {
  kind: "array";
  elements: (ParamDef | undefined)[];
  optional: boolean;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

export interface ParamAssignDef {
  kind: "assign";
  left: ParamDef;
  right: string;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

export interface ParamIdentifierDef {
  kind: "identifier";
  name: string;
  optional: boolean;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

export interface ParamObjectDef {
  kind: "object";
  props: ObjectPatPropDef[];
  optional: boolean;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

export interface ParamRestDef {
  kind: "rest";
  arg: ParamDef;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

export type TruePlusMinus = true | "+" | "-";

export interface TsConditionalDef {
  checkType: TsTypeDef;
  extendsType: TsTypeDef;
  trueType: TsTypeDef;
  falseType: TsTypeDef;
}

export interface TsFnOrConstructorDef {
  constructor: boolean;
  tsType: TsTypeDef;
  params: ParamDef[];
  typeParams: TsTypeParamDef[];
}

export interface TsImportTypeDef {
  specifier: string;
  qualifier?: string;
  typeParams?: TsTypeDef[];
}

export interface TsIndexedAccessDef {
  readonly: boolean;
  objType: TsTypeDef;
  indexType: TsTypeDef;
}

export interface TsInferDef {
  typeParam: TsTypeParamDef;
}

export interface TsMappedTypeDef {
  readonly?: TruePlusMinus;
  typeParam: TsTypeParamDef;
  nameType?: TsTypeDef;
  optional?: TruePlusMinus;
  tsType?: TsTypeDef;
}

export interface TsTypeLiteralDef {
  methods: LiteralMethodDef[];
  properties: LiteralPropertyDef[];
  callSignatures: LiteralCallSignatureDef[];
  indexSignatures: LiteralIndexSignatureDef[];
}

export interface TsTypeOperatorDef {
  operator: string;
  tsType: TsTypeDef;
}

export interface TsTypeParamDef {
  name: string;
  constraint?: TsTypeDef;
  default?: TsTypeDef;
}

export interface TsTypePredicateDef {
  asserts: boolean;
  param: { type: "this" | "identifier"; name?: string };
  type?: TsTypeDef;
}

export type TsTypeDef =
  | TsTypeKeywordDef
  | TsTypeDefLiteral
  | TsTypeTypeRefDef
  | TsTypeUnionDef
  | TsTypeIntersectionDef
  | TsTypeArrayDef
  | TsTypeTupleDef
  | TsTypeTypeOperatorDef
  | TsTypeParenthesizedDef
  | TsTypeRestDef
  | TsTypeOptionalDef
  | TsTypeQueryDef
  | TsTypeThisDef
  | TsTypeFnOrConstructorDef
  | TsTypeConditionalDef
  | TsTypeImportTypeDef
  | TsTypeInferDef
  | TsTypeIndexedAccessDef
  | TsTypeMappedDef
  | TsTypeTypeLiteralDef
  | TsTypeTypePredicateDef;

interface TsTypeDefBase {
  repr: string;
  kind: TsTypeDefKind;
}

export interface TsTypeKeywordDef extends TsTypeDefBase {
  kind: "keyword";
  keyword: string;
}

export interface TsTypeDefLiteral extends TsTypeDefBase {
  kind: "literal";
  literal: LiteralDef;
}

export interface TsTypeTypeRefDef extends TsTypeDefBase {
  kind: "typeRef";
  typeRef: TsTypeRefDef;
}

export interface TsTypeUnionDef extends TsTypeDefBase {
  kind: "union";
  union: TsTypeDef[];
}

export interface TsTypeIntersectionDef extends TsTypeDefBase {
  kind: "intersection";
  intersection: TsTypeDef[];
}

export interface TsTypeArrayDef extends TsTypeDefBase {
  kind: "array";
  array: TsTypeDef;
}

export interface TsTypeTupleDef extends TsTypeDefBase {
  kind: "tuple";
  tuple: TsTypeDef[];
}

export interface TsTypeTypeOperatorDef extends TsTypeDefBase {
  kind: "typeOperator";
  typeOperator: TsTypeOperatorDef;
}

export interface TsTypeParenthesizedDef extends TsTypeDefBase {
  kind: "parenthesized";
  parenthesized: TsTypeDef;
}

export interface TsTypeRestDef extends TsTypeDefBase {
  kind: "rest";
  rest: TsTypeDef;
}

export interface TsTypeOptionalDef extends TsTypeDefBase {
  kind: "optional";
  optional: TsTypeDef;
}

export interface TsTypeQueryDef extends TsTypeDefBase {
  kind: "typeQuery";
  typeQuery: string;
}

export interface TsTypeThisDef extends TsTypeDefBase {
  kind: "this";
  this: boolean;
}

export interface TsTypeFnOrConstructorDef extends TsTypeDefBase {
  kind: "fnOrConstructor";
  fnOrConstructor: TsFnOrConstructorDef;
}

export interface TsTypeConditionalDef extends TsTypeDefBase {
  kind: "conditional";
  conditionalType: TsConditionalDef;
}

export interface TsTypeInferDef extends TsTypeDefBase {
  kind: "infer";
  infer: TsInferDef;
}

export interface TsTypeMappedDef extends TsTypeDefBase {
  kind: "mapped";
  mappedType: TsMappedTypeDef;
}

export interface TsTypeImportTypeDef extends TsTypeDefBase {
  kind: "importType";
  importType: TsImportTypeDef;
}

export interface TsTypeIndexedAccessDef extends TsTypeDefBase {
  kind: "indexedAccess";
  indexedAccess: TsIndexedAccessDef;
}

export interface TsTypeTypeLiteralDef extends TsTypeDefBase {
  kind: "typeLiteral";
  typeLiteral: TsTypeLiteralDef;
}

export interface TsTypeTypePredicateDef extends TsTypeDefBase {
  kind: "typePredicate";
  typePredicate: TsTypePredicateDef;
}

export type TsTypeDefKind =
  | "keyword"
  | "literal"
  | "typeRef"
  | "union"
  | "intersection"
  | "array"
  | "tuple"
  | "typeOperator"
  | "parenthesized"
  | "rest"
  | "optional"
  | "typeQuery"
  | "this"
  | "fnOrConstructor"
  | "conditional"
  | "importType"
  | "infer"
  | "indexedAccess"
  | "mapped"
  | "typeLiteral"
  | "typePredicate";

export interface TsTypeRefDef {
  typeParams?: TsTypeDef[];
  typeName: string;
  nodeIndex?: number;
  nodeSubIndex?: number;
}

export interface TypeAliasDef {
  tsType: TsTypeDef;
  typeParams: TsTypeParamDef[];
}

export type VariableDeclKind = "var" | "let" | "const";

export interface VariableDef {
  tsType?: TsTypeDef;
  kind: VariableDeclKind;
}
