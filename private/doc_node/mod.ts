/** This file is downloaded from: `https://github.com/denoland/deno_doc/blob/0.125.0/js/types.d.ts`.
    Then modified. Use file comparator to find what's changed.

    In brief:
    - Added `entryPointNumber` to `Location`.
    - Added interface `Export`, and added `exports: Export[]` to `DocNodeBase`.
    - Added `init` and `isAccessor` to `ClassPropertyDef`.
    - Added `isConst` to `EnumDef`.
    - Added interface `JsDocToken`, and added `docTokens?: JsDocToken[]` everywhere near `doc`.
    - Added `tsType` to `JsDocTagTyped` and `JsDocTagParam`.
    - Added `tsType` and `typeParams` to `JsDocTagNamed`.
    - Added `nameNodeIndex` to `DecoratorDef`, `ClassPropertyDef`, `ClassMethodDef`, `InterfaceMethodDef`, `InterfacePropertyDef`, `LiteralPropertyDef` and `LiteralMethodDef`.
    - Added `nodeIndex` and `nodeSubIndex` to `TsTypeRefDef`.
    - Added `superNodeIndex` to `ClassDef`.
    - Added `jsDoc` and `location` to `LiteralMethodDef`, `LiteralPropertyDef`, `LiteralCallSignatureDef`, `LiteralIndexSignatureDef`, `ClassIndexSignatureDef` and `InterfaceIndexSignatureDef`.

    @module
 **/

// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

/** This type matches `DocNode` type from [x/deno_doc](https://deno.land/x/deno_doc@0.125.0) with several additions:

    - {@link Location} has additional [entryPointNumber]{@link Location.entryPointNumber} field.
    You can pass relative paths to [createTsaProgram()]{@link tsa.createTsaProgram} as entry points, but {@link Location.filename} always contains corresponding absolute URL.
    If this filename is one of the entry points, the {@link Location.entryPointNumber} field will contain the index in `entryPoints` array provided to [createTsaProgram()]{@link tsa.createTsaProgram}.
    - `DocNode` has additional [exports]{@link DocNode.exports} field. If a symbol is reexported from several places, those places will be recorded here (including current location).
    - {@link ClassPropertyDef} has additional [init]{@link ClassPropertyDef.init} field that contains property initializer (if any), and [isAccessor]{@link ClassPropertyDef.isAccessor} field.
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
    - In {@link LiteralMethodDef}, {@link LiteralPropertyDef}, {@link LiteralCallSignatureDef}, {@link LiteralIndexSignatureDef}, {@link ClassIndexSignatureDef} and {@link InterfaceIndexSignatureDef} there're {@link LiteralMethodDef.jsDoc} and {@link LiteralMethodDef.location} fields.

    @category Documentation Nodes
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
 * module. `"declare"` indicates that it is a type only declaration.
 * @category Documentation Nodes
 **/
export type DeclarationKind = "private" | "export" | "declare";

/** @category Documentation Nodes */
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

/** @category Documentation Nodes */
export interface Export {
  name: string;
  location: Location;
}

/** @category Documentation Nodes */
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

/** @category Documentation Nodes */
export interface DocNodeModuleDoc extends DocNodeBase {
  kind: "moduleDoc";
  jsDoc: JsDoc;
}

/** @category Documentation Nodes */
export interface DocNodeFunction extends DocNodeBase {
  kind: "function";
  functionDef: FunctionDef;
}

/** @category Documentation Nodes */
export interface DocNodeVariable extends DocNodeBase {
  kind: "variable";
  variableDef: VariableDef;
}

/** @category Documentation Nodes */
export interface DocNodeEnum extends DocNodeBase {
  kind: "enum";
  enumDef: EnumDef;
}

/** @category Documentation Nodes */
export interface DocNodeClass extends DocNodeBase {
  kind: "class";
  classDef: ClassDef;
}

/** @category Documentation Nodes */
export interface DocNodeTypeAlias extends DocNodeBase {
  kind: "typeAlias";
  typeAliasDef: TypeAliasDef;
}

/** @category Documentation Nodes */
export interface DocNodeNamespace extends DocNodeBase {
  kind: "namespace";
  namespaceDef: NamespaceDef;
}

/** @category Documentation Nodes */
export interface DocNodeInterface extends DocNodeBase {
  kind: "interface";
  interfaceDef: InterfaceDef;
}

/** @category Documentation Nodes */
export interface DocNodeImport extends DocNodeBase {
  kind: "import";
  importDef: ImportDef;
}

/** @category Documentation Nodes */
export type Accessibility = "public" | "protected" | "private";

/** @category Documentation Nodes */
export interface ClassDef {
  defName?: string;
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

/** @category Documentation Nodes */
export type ClassConstructorParamDef = ParamDef & {
  accessibility?: Accessibility;
  isOverride?: boolean;
  readonly?: boolean;
};

/** @category Documentation Nodes */
export interface ClassConstructorDef {
  jsDoc?: JsDoc;
  accessibility?: Accessibility;
  isOptional?: boolean;
  hasBody?: boolean;
  name: string;
  params: ClassConstructorParamDef[];
  location: Location;
}

/** @category Documentation Nodes */
export interface ClassIndexSignatureDef {
  jsDoc?: JsDoc;
  location?: Location;
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
}

/** @category Documentation Nodes */
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

/** @category Documentation Nodes */
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
  isAccessor?: boolean;
  nameNodeIndex?: number;
}

/** @category Documentation Nodes */
export interface DecoratorDef {
  name: string;
  args?: string[];
  location: Location;
  nameNodeIndex?: number;
}

/** @category Documentation Nodes */
export interface EnumDef {
  members: EnumMemberDef[];
  /** Is `const enum`?
   **/
  isConst?: boolean;
}

/** @category Documentation Nodes */
export interface EnumMemberDef {
  name: string;
  init?: TsTypeDef;
  jsDoc?: JsDoc;
  location: Location;
}

/** @category Documentation Nodes */
export interface FunctionDef {
  defName?: string;
  params: ParamDef[];
  returnType?: TsTypeDef;
  hasBody?: boolean;
  isAsync: boolean;
  isGenerator: boolean;
  typeParams: TsTypeParamDef[];
  decorators?: DecoratorDef[];
}

/** @category Documentation Nodes */
export interface ImportDef {
  src: string;
  imported?: string;
}

/** @category Documentation Nodes */
export interface InterfaceDef {
  defName?: string;
  extends: TsTypeDef[];
  methods: InterfaceMethodDef[];
  properties: InterfacePropertyDef[];
  callSignatures: InterfaceCallSignatureDef[];
  indexSignatures: InterfaceIndexSignatureDef[];
  typeParams: TsTypeParamDef[];
}

/** @category Documentation Nodes */
export interface InterfaceCallSignatureDef {
  location: Location;
  jsDoc?: JsDoc;
  params: ParamDef[];
  tsType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
}

/** @category Documentation Nodes */
export interface InterfaceIndexSignatureDef {
  jsDoc?: JsDoc;
  location?: Location;
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
}

/** @category Documentation Nodes */
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

/** @category Documentation Nodes */
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
 * @category Documentation Nodes
 **/
export interface JsDocToken {
  text: string;
  kind: 'text' | 'lineBreak' | 'link' | 'linkText' | 'linkName';
}

/** @category Documentation Nodes */
export interface JsDoc {
  doc?: string;
  /** Doc-comment string split to tokens.
   **/
  docTokens?: JsDocToken[];
  tags?: JsDocTag[];
}

/** @category Documentation Nodes */
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
  | "see"
  | "unsupported";

/** @category Documentation Nodes */
export type JsDocTag =
  | JsDocTagOnly
  | JsDocTagDoc
  | JsDocTagDocRequired
  | JsDocTagNamed
  | JsDocTagValued
  | JsDocTagTyped
  | JsDocTagNamedTyped
  | JsDocTagParam
  | JsDocTagReturn
  | JsDocTagTags
  | JsDocTagUnsupported;

/** @category Documentation Nodes */
export interface JsDocTagBase {
  kind: JsDocTagKind;
}

/** @category Documentation Nodes */
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

/** @category Documentation Nodes */
export interface JsDocTagDoc extends JsDocTagBase {
  kind: "deprecated";
  doc?: string;
  docTokens?: JsDocToken[];
}

/** @category Documentation Nodes */
export interface JsDocTagDocRequired extends JsDocTagBase {
  kind: "category" | "example" | "see";
  doc: string;
  docTokens: JsDocToken[];
}

/** @category Documentation Nodes */
export interface JsDocTagNamed extends JsDocTagBase {
  kind: "callback" | "template";
  name: string;
  doc?: string;
  docTokens?: JsDocToken[];
  tsType?: TsTypeDef;
  typeParams?: TsTypeParamDef[];
}

/** @category Documentation Nodes */
export interface JsDocTagValued extends JsDocTagBase {
  kind: "default";
  value: string;
  doc?: string;
  docTokens?: JsDocToken[];
}

/** @category Documentation Nodes */
export interface JsDocTagTyped extends JsDocTagBase {
  kind: "enum" | "extends" | "this" | "type";
  type: string;
  tsType?: TsTypeDef;
  doc?: string;
  docTokens?: JsDocToken[];
}

/** @category Documentation Nodes */
export interface JsDocTagNamedTyped extends JsDocTagBase {
  kind: "property" | "typedef";
  name: string;
  type: string;
  doc?: string;
  docTokens?: JsDocToken[];
}

/** @category Documentation Nodes */
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

/** @category Documentation Nodes */
export interface JsDocTagReturn extends JsDocTagBase {
  kind: "return";
  type?: string;
  doc?: string;
  docTokens?: JsDocToken[];
}

/** @category Documentation Nodes */
export interface JsDocTagTags extends JsDocTagBase {
  kind: "tags";
  tags: string[];
}

/** @category Documentation Nodes */
export interface JsDocTagUnsupported extends JsDocTagBase {
  kind: "unsupported";
  value: string;
}

/** @category Documentation Nodes */
export interface LiteralCallSignatureDef {
  params: ParamDef[];
  tsType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
  jsDoc?: JsDoc;
  location?: Location;
}

/** @category Documentation Nodes */
export type LiteralDefKind =
  | "number"
  | "string"
  | "template"
  | "boolean"
  | "bigInt";

/** @category Documentation Nodes */
export type LiteralDef =
  | LiteralDefNumber
  | LiteralDefBigInt
  | LiteralDefString
  | LiteralDefTemplate
  | LiteralDefBoolean;

/** @category Documentation Nodes */
interface LiteralDefBase {
  kind: LiteralDefKind;
}

/** @category Documentation Nodes */
export interface LiteralDefNumber extends LiteralDefBase {
  kind: "number";
  number: number;
}

/** @category Documentation Nodes */
export interface LiteralDefBigInt extends LiteralDefBase {
  kind: "bigInt";
  string: string;
}

/** @category Documentation Nodes */
export interface LiteralDefString extends LiteralDefBase {
  kind: "string";
  string: string;
}

/** @category Documentation Nodes */
export interface LiteralDefTemplate extends LiteralDefBase {
  kind: "template";
  tsTypes: TsTypeDef[];
}

/** @category Documentation Nodes */
export interface LiteralDefBoolean extends LiteralDefBase {
  kind: "boolean";
  boolean: boolean;
}

/** @category Documentation Nodes */
export interface LiteralIndexSignatureDef {
  readonly: boolean;
  params: ParamDef[];
  tsType?: TsTypeDef;
  jsDoc?: JsDoc;
  location?: Location;
}

/** @category Documentation Nodes */
export interface LiteralMethodDef {
  name: string;
  kind: MethodKind;
  params: ParamDef[];
  computed?: boolean;
  optional: boolean;
  returnType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
  jsDoc?: JsDoc;
  location?: Location;
  nameNodeIndex?: number;
}

/** @category Documentation Nodes */
export interface LiteralPropertyDef {
  name: string;
  params: ParamDef[];
  readonly?: boolean;
  computed: boolean;
  optional: boolean;
  tsType?: TsTypeDef;
  typeParams: TsTypeParamDef[];
  jsDoc?: JsDoc;
  location?: Location;
  nameNodeIndex?: number;
}

/** @category Documentation Nodes */
export interface Location {
  filename: string;
  line: number;
  col: number;
  /** If the filename corresponds to one of the entry points passed to `createTsaProgram()`.
   * `filename` here is always absolute URL, even if a relative path was passed.
   **/
  entryPointNumber?: number;
}

/** @category Documentation Nodes */
export type MethodKind = "method" | "getter" | "setter";

/** @category Documentation Nodes */
export interface NamespaceDef {
  elements: DocNode[];
}

/** @category Documentation Nodes */
export type ObjectPatPropDef =
  | ObjectPatPropAssignDef
  | ObjectPatPropKeyValueDef
  | ObjectPatPropRestDef;

/** @category Documentation Nodes */
export interface ObjectPatPropAssignDef {
  kind: "assign";
  key: string;
  value?: string;
}

/** @category Documentation Nodes */
export interface ObjectPatPropKeyValueDef {
  kind: "keyValue";
  key: string;
  value: ParamDef;
}

/** @category Documentation Nodes */
export interface ObjectPatPropRestDef {
  kind: "rest";
  arg: ParamDef;
}

/** @category Documentation Nodes */
export type ParamDef =
  | ParamArrayDef
  | ParamAssignDef
  | ParamIdentifierDef
  | ParamObjectDef
  | ParamRestDef;

/** @category Documentation Nodes */
export interface ParamArrayDef {
  kind: "array";
  elements: (ParamDef | undefined)[];
  optional: boolean;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

/** @category Documentation Nodes */
export interface ParamAssignDef {
  kind: "assign";
  left: ParamDef;
  right: string;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

/** @category Documentation Nodes */
export interface ParamIdentifierDef {
  kind: "identifier";
  name: string;
  optional: boolean;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

/** @category Documentation Nodes */
export interface ParamObjectDef {
  kind: "object";
  props: ObjectPatPropDef[];
  optional: boolean;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

/** @category Documentation Nodes */
export interface ParamRestDef {
  kind: "rest";
  arg: ParamDef;
  decorators?: DecoratorDef[];
  tsType?: TsTypeDef;
}

/** @category Documentation Nodes */
export type TruePlusMinus = true | "+" | "-";

/** @category Documentation Nodes */
export interface TsConditionalDef {
  checkType: TsTypeDef;
  extendsType: TsTypeDef;
  trueType: TsTypeDef;
  falseType: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsFnOrConstructorDef {
  constructor: boolean;
  tsType: TsTypeDef;
  params: ParamDef[];
  typeParams: TsTypeParamDef[];
}

/** @category Documentation Nodes */
export interface TsImportTypeDef {
  specifier: string;
  qualifier?: string;
  typeParams?: TsTypeDef[];
}

/** @category Documentation Nodes */
export interface TsIndexedAccessDef {
  readonly: boolean;
  objType: TsTypeDef;
  indexType: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsInferDef {
  typeParam: TsTypeParamDef;
}

/** @category Documentation Nodes */
export interface TsMappedTypeDef {
  readonly?: TruePlusMinus;
  typeParam: TsTypeParamDef;
  nameType?: TsTypeDef;
  optional?: TruePlusMinus;
  tsType?: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypeLiteralDef {
  methods: LiteralMethodDef[];
  properties: LiteralPropertyDef[];
  callSignatures: LiteralCallSignatureDef[];
  indexSignatures: LiteralIndexSignatureDef[];
}

/** @category Documentation Nodes */
export interface TsTypeOperatorDef {
  operator: string;
  tsType: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypeParamDef {
  name: string;
  constraint?: TsTypeDef;
  default?: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypePredicateDef {
  asserts: boolean;
  param: { type: "this" | "identifier"; name?: string };
  type?: TsTypeDef;
}

/** @category Documentation Nodes */
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

/** @category Documentation Nodes */
interface TsTypeDefBase {
  repr: string;
  kind: TsTypeDefKind;
}

/** @category Documentation Nodes */
export interface TsTypeKeywordDef extends TsTypeDefBase {
  kind: "keyword";
  keyword: string;
}

/** @category Documentation Nodes */
export interface TsTypeDefLiteral extends TsTypeDefBase {
  kind: "literal";
  literal: LiteralDef;
}

/** @category Documentation Nodes */
export interface TsTypeTypeRefDef extends TsTypeDefBase {
  kind: "typeRef";
  typeRef: TsTypeRefDef;
}

/** @category Documentation Nodes */
export interface TsTypeUnionDef extends TsTypeDefBase {
  kind: "union";
  union: TsTypeDef[];
}

/** @category Documentation Nodes */
export interface TsTypeIntersectionDef extends TsTypeDefBase {
  kind: "intersection";
  intersection: TsTypeDef[];
}

/** @category Documentation Nodes */
export interface TsTypeArrayDef extends TsTypeDefBase {
  kind: "array";
  array: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypeTupleDef extends TsTypeDefBase {
  kind: "tuple";
  tuple: TsTypeDef[];
}

/** @category Documentation Nodes */
export interface TsTypeTypeOperatorDef extends TsTypeDefBase {
  kind: "typeOperator";
  typeOperator: TsTypeOperatorDef;
}

/** @category Documentation Nodes */
export interface TsTypeParenthesizedDef extends TsTypeDefBase {
  kind: "parenthesized";
  parenthesized: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypeRestDef extends TsTypeDefBase {
  kind: "rest";
  rest: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypeOptionalDef extends TsTypeDefBase {
  kind: "optional";
  optional: TsTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypeQueryDef extends TsTypeDefBase {
  kind: "typeQuery";
  typeQuery: string;
}

/** @category Documentation Nodes */
export interface TsTypeThisDef extends TsTypeDefBase {
  kind: "this";
  this: boolean;
}

/** @category Documentation Nodes */
export interface TsTypeFnOrConstructorDef extends TsTypeDefBase {
  kind: "fnOrConstructor";
  fnOrConstructor: TsFnOrConstructorDef;
}

/** @category Documentation Nodes */
export interface TsTypeConditionalDef extends TsTypeDefBase {
  kind: "conditional";
  conditionalType: TsConditionalDef;
}

/** @category Documentation Nodes */
export interface TsTypeInferDef extends TsTypeDefBase {
  kind: "infer";
  infer: TsInferDef;
}

/** @category Documentation Nodes */
export interface TsTypeMappedDef extends TsTypeDefBase {
  kind: "mapped";
  mappedType: TsMappedTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypeImportTypeDef extends TsTypeDefBase {
  kind: "importType";
  importType: TsImportTypeDef;
}

/** @category Documentation Nodes */
export interface TsTypeIndexedAccessDef extends TsTypeDefBase {
  kind: "indexedAccess";
  indexedAccess: TsIndexedAccessDef;
}

/** @category Documentation Nodes */
export interface TsTypeTypeLiteralDef extends TsTypeDefBase {
  kind: "typeLiteral";
  typeLiteral: TsTypeLiteralDef;
}

/** @category Documentation Nodes */
export interface TsTypeTypePredicateDef extends TsTypeDefBase {
  kind: "typePredicate";
  typePredicate: TsTypePredicateDef;
}

/** @category Documentation Nodes */
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

/** @category Documentation Nodes */
export interface TsTypeRefDef {
  typeParams?: TsTypeDef[];
  typeName: string;
  nodeIndex?: number;
  nodeSubIndex?: number;
}

/** @category Documentation Nodes */
export interface TypeAliasDef {
  tsType: TsTypeDef;
  typeParams: TsTypeParamDef[];
}

/** @category Documentation Nodes */
export type VariableDeclKind = "var" | "let" | "const";

/** @category Documentation Nodes */
export interface VariableDef {
  tsType?: TsTypeDef;
  kind: VariableDeclKind;
}
