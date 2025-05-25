# `interface` TypeChecker

[Documentation Index](../README.md)

## This interface has

- property [getIndexInfosOfIndexSymbol](#-getindexinfosofindexsymbol-indexsymbol-symbol-siblingsymbols-symbol--indexinfo)
- 88 methods:
[getTypeOfSymbolAtLocation](#-gettypeofsymbolatlocationsymbol-symbol-node-node-type),
[getTypeOfSymbol](#-gettypeofsymbolsymbol-symbol-type),
[getDeclaredTypeOfSymbol](#-getdeclaredtypeofsymbolsymbol-symbol-type),
[getPropertiesOfType](#-getpropertiesoftypetype-type-symbol),
[getPropertyOfType](#-getpropertyoftypetype-type-propertyname-string-symbol),
[getPrivateIdentifierPropertyOfType](#-getprivateidentifierpropertyoftypelefttype-type-name-string-location-node-symbol),
[getIndexInfoOfType](#-getindexinfooftypetype-type-kind-indexkind-indexinfo),
[getIndexInfosOfType](#-getindexinfosoftypetype-type-readonly-indexinfo),
[getSignaturesOfType](#-getsignaturesoftypetype-type-kind-signaturekind-readonly-signature),
[getIndexTypeOfType](#-getindextypeoftypetype-type-kind-indexkind-type),
[getBaseTypes](#-getbasetypestype-interfacetype-basetype),
[getBaseTypeOfLiteralType](#-getbasetypeofliteraltypetype-type-type),
[getWidenedType](#-getwidenedtypetype-type-type),
[getAwaitedType](#-getawaitedtypetype-type-type),
[getReturnTypeOfSignature](#-getreturntypeofsignaturesignature-signature-type),
[getNullableType](#-getnullabletypetype-type-flags-typeflags-type),
[getNonNullableType](#-getnonnullabletypetype-type-type),
[getTypeArguments](#-gettypeargumentstype-typereference-readonly-type),
[typeToTypeNode](#-typetotypenodetype-type-enclosingdeclaration-node--undefined-flags-nodebuilderflags--undefined-typenode),
[signatureToSignatureDeclaration](#-signaturetosignaturedeclarationsignature-signature-kind-syntaxkind-enclosingdeclaration-node--undefined-flags-nodebuilderflags--undefined-signaturedeclaration--typearguments-nodearraytypenode),
[indexInfoToIndexSignatureDeclaration](#-indexinfotoindexsignaturedeclarationindexinfo-indexinfo-enclosingdeclaration-node--undefined-flags-nodebuilderflags--undefined-indexsignaturedeclaration),
[symbolToEntityName](#-symboltoentitynamesymbol-symbol-meaning-symbolflags-enclosingdeclaration-node--undefined-flags-nodebuilderflags--undefined-entityname),
[symbolToExpression](#-symboltoexpressionsymbol-symbol-meaning-symbolflags-enclosingdeclaration-node--undefined-flags-nodebuilderflags--undefined-expression),
[symbolToTypeParameterDeclarations](#-symboltotypeparameterdeclarationssymbol-symbol-enclosingdeclaration-node--undefined-flags-nodebuilderflags--undefined-nodearraytypeparameterdeclaration),
[symbolToParameterDeclaration](#-symboltoparameterdeclarationsymbol-symbol-enclosingdeclaration-node--undefined-flags-nodebuilderflags--undefined-parameterdeclaration),
[typeParameterToDeclaration](#-typeparametertodeclarationparameter-typeparameter-enclosingdeclaration-node--undefined-flags-nodebuilderflags--undefined-typeparameterdeclaration),
[getSymbolsInScope](#-getsymbolsinscopelocation-node-meaning-symbolflags-symbol),
[getSymbolAtLocation](#-getsymbolatlocationnode-node-symbol),
[getSymbolsOfParameterPropertyDeclaration](#-getsymbolsofparameterpropertydeclarationparameter-parameterdeclaration-parametername-string-symbol),
[getShorthandAssignmentValueSymbol](#-getshorthandassignmentvaluesymbollocation-node--undefined-symbol),
[getExportSpecifierLocalTargetSymbol](#-getexportspecifierlocaltargetsymbollocation-exportspecifier--identifier-symbol),
[getExportSymbolOfSymbol](#-getexportsymbolofsymbolsymbol-symbol-symbol),
[getPropertySymbolOfDestructuringAssignment](#-getpropertysymbolofdestructuringassignmentlocation-identifier-symbol),
[getTypeOfAssignmentPattern](#-gettypeofassignmentpatternpattern-assignmentpattern-type),
[getTypeAtLocation](#-gettypeatlocationnode-node-type),
[getTypeFromTypeNode](#-gettypefromtypenodenode-typenode-type),
[signatureToString](#-signaturetostringsignature-signature-enclosingdeclaration-node-flags-typeformatflags-kind-signaturekind-string),
[typeToString](#-typetostringtype-type-enclosingdeclaration-node-flags-typeformatflags-string),
[symbolToString](#-symboltostringsymbol-symbol-enclosingdeclaration-node-meaning-symbolflags-flags-symbolformatflags-string),
[typePredicateToString](#-typepredicatetostringpredicate-typepredicate-enclosingdeclaration-node-flags-typeformatflags-string),
[getFullyQualifiedName](#-getfullyqualifiednamesymbol-symbol-string),
[getAugmentedPropertiesOfType](#-getaugmentedpropertiesoftypetype-type-symbol),
[getRootSymbols](#-getrootsymbolssymbol-symbol-readonly-symbol),
[getSymbolOfExpando](#-getsymbolofexpandonode-node-allowdeclaration-boolean-symbol),
[getContextualType](#-getcontextualtypenode-expression-type),
[getResolvedSignature](#-getresolvedsignaturenode-calllikeexpression-candidatesoutarray-signature-argumentcount-number-signature),
[getSignatureFromDeclaration](#-getsignaturefromdeclarationdeclaration-signaturedeclaration-signature),
[isImplementationOfOverload](#-isimplementationofoverloadnode-signaturedeclaration-boolean),
[isUndefinedSymbol](#-isundefinedsymbolsymbol-symbol-boolean),
[isArgumentsSymbol](#-isargumentssymbolsymbol-symbol-boolean),
[isUnknownSymbol](#-isunknownsymbolsymbol-symbol-boolean),
[getMergedSymbol](#-getmergedsymbolsymbol-symbol-symbol),
[getConstantValue](#-getconstantvaluenode-enummember--propertyaccessexpression--elementaccessexpression-string--number),
[isValidPropertyAccess](#-isvalidpropertyaccessnode-propertyaccessexpression--qualifiedname--importtypenode-propertyname-string-boolean),
[getAliasedSymbol](#-getaliasedsymbolsymbol-symbol-symbol),
[getImmediateAliasedSymbol](#-getimmediatealiasedsymbolsymbol-symbol-symbol),
[getExportsOfModule](#-getexportsofmodulemodulesymbol-symbol-symbol),
[getJsxIntrinsicTagNamesAt](#-getjsxintrinsictagnamesatlocation-node-symbol),
[isOptionalParameter](#-isoptionalparameternode-parameterdeclaration-boolean),
[getAmbientModules](#-getambientmodules-symbol),
[tryGetMemberInModuleExports](#-trygetmemberinmoduleexportsmembername-string-modulesymbol-symbol-symbol),
[getApparentType](#-getapparenttypetype-type-type),
[getBaseConstraintOfType](#-getbaseconstraintoftypetype-type-type),
[getDefaultFromTypeParameter](#-getdefaultfromtypeparametertype-type-type),
[getAnyType](#-getanytype-type),
[getStringType](#-getstringtype-type),
[getStringLiteralType](#-getstringliteraltypevalue-string-stringliteraltype),
[getNumberType](#-getnumbertype-type),
[getNumberLiteralType](#-getnumberliteraltypevalue-number-numberliteraltype),
[getBigIntType](#-getbiginttype-type),
[getBigIntLiteralType](#-getbigintliteraltypevalue-pseudobigint-bigintliteraltype),
[getBooleanType](#-getbooleantype-type),
[getUnknownType](#-getunknowntype-type),
[getFalseType](#-getfalsetype-type),
[getTrueType](#-gettruetype-type),
[getVoidType](#-getvoidtype-type),
[getUndefinedType](#-getundefinedtype-type),
[getNullType](#-getnulltype-type),
[getESSymbolType](#-getessymboltype-type),
[getNeverType](#-getnevertype-type),
[isTypeAssignableTo](#-istypeassignabletosource-type-target-type-boolean),
[isArrayType](#-isarraytypetype-type-boolean),
[isTupleType](#-istupletypetype-type-boolean),
[isArrayLikeType](#-isarrayliketypetype-type-boolean),
[resolveName](#-resolvenamename-string-location-node--undefined-meaning-symbolflags-excludeglobals-boolean-symbol),
[getTypePredicateOfSignature](#-gettypepredicateofsignaturesignature-signature-typepredicate),
[runWithCancellationToken](#-runwithcancellationtokenttoken-cancellationtoken-cb-checker-typechecker--t-t),
[getTypeArgumentsForResolvedSignature](#-gettypeargumentsforresolvedsignaturesignature-signature-readonly-type)


#### 📄 getIndexInfosOfIndexSymbol: (indexSymbol: [Symbol](../interface.Symbol/README.md), siblingSymbols?: [Symbol](../interface.Symbol/README.md)\[]) => [IndexInfo](../interface.IndexInfo/README.md)\[]



#### ⚙ getTypeOfSymbolAtLocation(symbol: [Symbol](../interface.Symbol/README.md), node: [Node](../interface.Node/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getTypeOfSymbol(symbol: [Symbol](../interface.Symbol/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getDeclaredTypeOfSymbol(symbol: [Symbol](../interface.Symbol/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getPropertiesOfType(type: [Type](../interface.Type/README.md)): [Symbol](../interface.Symbol/README.md)\[]



#### ⚙ getPropertyOfType(type: [Type](../interface.Type/README.md), propertyName: `string`): [Symbol](../interface.Symbol/README.md)



#### ⚙ getPrivateIdentifierPropertyOfType(leftType: [Type](../interface.Type/README.md), name: `string`, location: [Node](../interface.Node/README.md)): [Symbol](../interface.Symbol/README.md)



#### ⚙ getIndexInfoOfType(type: [Type](../interface.Type/README.md), kind: [IndexKind](../enum.IndexKind/README.md)): [IndexInfo](../interface.IndexInfo/README.md)



#### ⚙ getIndexInfosOfType(type: [Type](../interface.Type/README.md)): readonly IndexInfo\[]



#### ⚙ getSignaturesOfType(type: [Type](../interface.Type/README.md), kind: [SignatureKind](../enum.SignatureKind/README.md)): readonly Signature\[]



#### ⚙ getIndexTypeOfType(type: [Type](../interface.Type/README.md), kind: [IndexKind](../enum.IndexKind/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getBaseTypes(type: [InterfaceType](../interface.InterfaceType/README.md)): BaseType\[]



#### ⚙ getBaseTypeOfLiteralType(type: [Type](../interface.Type/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getWidenedType(type: [Type](../interface.Type/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getAwaitedType(type: [Type](../interface.Type/README.md)): [Type](../interface.Type/README.md)

> Gets the "awaited type" of a type.
> 
> If an expression has a Promise-like type, the "awaited type" of the expression is
> derived from the type of the first argument of the fulfillment callback for that
> Promise's `then` method. If the "awaited type" is itself a Promise-like, it is
> recursively unwrapped in the same manner until a non-promise type is found.
> 
> If an expression does not have a Promise-like type, its "awaited type" is the type
> of the expression.
> 
> If the resulting "awaited type" is a generic object type, then it is wrapped in
> an `Awaited<T>`.
> 
> In the event the "awaited type" circularly references itself, or is a non-Promise
> object-type with a callable `then()` method, an "awaited type" cannot be determined
> and the value `undefined` will be returned.
> 
> This is used to reflect the runtime behavior of the `await` keyword.



#### ⚙ getReturnTypeOfSignature(signature: [Signature](../interface.Signature/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getNullableType(type: [Type](../interface.Type/README.md), flags: [TypeFlags](../enum.TypeFlags/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getNonNullableType(type: [Type](../interface.Type/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getTypeArguments(type: [TypeReference](../interface.TypeReference/README.md)): readonly Type\[]



#### ⚙ typeToTypeNode(type: [Type](../interface.Type/README.md), enclosingDeclaration: [Node](../interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../enum.NodeBuilderFlags/README.md) | `undefined`): [TypeNode](../interface.TypeNode/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ signatureToSignatureDeclaration(signature: [Signature](../interface.Signature/README.md), kind: [SyntaxKind](../enum.SyntaxKind/README.md), enclosingDeclaration: [Node](../interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../enum.NodeBuilderFlags/README.md) | `undefined`): SignatureDeclaration \& \{typeArguments?: NodeArray\<TypeNode>}

> Note that the resulting nodes cannot be checked.



#### ⚙ indexInfoToIndexSignatureDeclaration(indexInfo: [IndexInfo](../interface.IndexInfo/README.md), enclosingDeclaration: [Node](../interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../enum.NodeBuilderFlags/README.md) | `undefined`): [IndexSignatureDeclaration](../interface.IndexSignatureDeclaration/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ symbolToEntityName(symbol: [Symbol](../interface.Symbol/README.md), meaning: [SymbolFlags](../enum.SymbolFlags/README.md), enclosingDeclaration: [Node](../interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../enum.NodeBuilderFlags/README.md) | `undefined`): EntityName

> Note that the resulting nodes cannot be checked.



#### ⚙ symbolToExpression(symbol: [Symbol](../interface.Symbol/README.md), meaning: [SymbolFlags](../enum.SymbolFlags/README.md), enclosingDeclaration: [Node](../interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../enum.NodeBuilderFlags/README.md) | `undefined`): [Expression](../interface.Expression/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ symbolToTypeParameterDeclarations(symbol: [Symbol](../interface.Symbol/README.md), enclosingDeclaration: [Node](../interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../enum.NodeBuilderFlags/README.md) | `undefined`): [NodeArray](../interface.NodeArray/README.md)\<[TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)>

> Note that the resulting nodes cannot be checked.



#### ⚙ symbolToParameterDeclaration(symbol: [Symbol](../interface.Symbol/README.md), enclosingDeclaration: [Node](../interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../enum.NodeBuilderFlags/README.md) | `undefined`): [ParameterDeclaration](../interface.ParameterDeclaration/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ typeParameterToDeclaration(parameter: [TypeParameter](../interface.TypeParameter/README.md), enclosingDeclaration: [Node](../interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../enum.NodeBuilderFlags/README.md) | `undefined`): [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ getSymbolsInScope(location: [Node](../interface.Node/README.md), meaning: [SymbolFlags](../enum.SymbolFlags/README.md)): [Symbol](../interface.Symbol/README.md)\[]



#### ⚙ getSymbolAtLocation(node: [Node](../interface.Node/README.md)): [Symbol](../interface.Symbol/README.md)



#### ⚙ getSymbolsOfParameterPropertyDeclaration(parameter: [ParameterDeclaration](../interface.ParameterDeclaration/README.md), parameterName: `string`): [Symbol](../interface.Symbol/README.md)\[]



#### ⚙ getShorthandAssignmentValueSymbol(location: [Node](../interface.Node/README.md) | `undefined`): [Symbol](../interface.Symbol/README.md)

> The function returns the value (local variable) symbol of an identifier in the short-hand property assignment.
> This is necessary as an identifier in short-hand property assignment can contains two meaning: property name and property value.



#### ⚙ getExportSpecifierLocalTargetSymbol(location: [ExportSpecifier](../interface.ExportSpecifier/README.md) | [Identifier](../interface.Identifier/README.md)): [Symbol](../interface.Symbol/README.md)



#### ⚙ getExportSymbolOfSymbol(symbol: [Symbol](../interface.Symbol/README.md)): [Symbol](../interface.Symbol/README.md)

> If a symbol is a local symbol with an associated exported symbol, returns the exported symbol.
> Otherwise returns its input.
> For example, at `export type T = number;`:
>     - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
>     - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
>     - Calling `getExportSymbolOfSymbol` on that local symbol will return the exported symbol.



#### ⚙ getPropertySymbolOfDestructuringAssignment(location: [Identifier](../interface.Identifier/README.md)): [Symbol](../interface.Symbol/README.md)



#### ⚙ getTypeOfAssignmentPattern(pattern: [AssignmentPattern](../type.AssignmentPattern/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getTypeAtLocation(node: [Node](../interface.Node/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getTypeFromTypeNode(node: [TypeNode](../interface.TypeNode/README.md)): [Type](../interface.Type/README.md)



#### ⚙ signatureToString(signature: [Signature](../interface.Signature/README.md), enclosingDeclaration?: [Node](../interface.Node/README.md), flags?: [TypeFormatFlags](../enum.TypeFormatFlags/README.md), kind?: [SignatureKind](../enum.SignatureKind/README.md)): `string`



#### ⚙ typeToString(type: [Type](../interface.Type/README.md), enclosingDeclaration?: [Node](../interface.Node/README.md), flags?: [TypeFormatFlags](../enum.TypeFormatFlags/README.md)): `string`



#### ⚙ symbolToString(symbol: [Symbol](../interface.Symbol/README.md), enclosingDeclaration?: [Node](../interface.Node/README.md), meaning?: [SymbolFlags](../enum.SymbolFlags/README.md), flags?: [SymbolFormatFlags](../enum.SymbolFormatFlags/README.md)): `string`



#### ⚙ typePredicateToString(predicate: [TypePredicate](../type.TypePredicate/README.md), enclosingDeclaration?: [Node](../interface.Node/README.md), flags?: [TypeFormatFlags](../enum.TypeFormatFlags/README.md)): `string`



#### ⚙ getFullyQualifiedName(symbol: [Symbol](../interface.Symbol/README.md)): `string`



#### ⚙ getAugmentedPropertiesOfType(type: [Type](../interface.Type/README.md)): [Symbol](../interface.Symbol/README.md)\[]



#### ⚙ getRootSymbols(symbol: [Symbol](../interface.Symbol/README.md)): readonly Symbol\[]



#### ⚙ getSymbolOfExpando(node: [Node](../interface.Node/README.md), allowDeclaration: `boolean`): [Symbol](../interface.Symbol/README.md)



#### ⚙ getContextualType(node: [Expression](../interface.Expression/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getResolvedSignature(node: [CallLikeExpression](../type.CallLikeExpression/README.md), candidatesOutArray?: [Signature](../interface.Signature/README.md)\[], argumentCount?: `number`): [Signature](../interface.Signature/README.md)

> returns unknownSignature in the case of an error.
> returns undefined if the node is not valid.
> 
> 🎚️ Parameter **argumentCount**:
> 
> Apparent number of arguments, passed in case of a possibly incomplete call. This should come from an ArgumentListInfo. See `signatureHelp.ts`.



#### ⚙ getSignatureFromDeclaration(declaration: [SignatureDeclaration](../type.SignatureDeclaration/README.md)): [Signature](../interface.Signature/README.md)



#### ⚙ isImplementationOfOverload(node: [SignatureDeclaration](../type.SignatureDeclaration/README.md)): `boolean`



#### ⚙ isUndefinedSymbol(symbol: [Symbol](../interface.Symbol/README.md)): `boolean`



#### ⚙ isArgumentsSymbol(symbol: [Symbol](../interface.Symbol/README.md)): `boolean`



#### ⚙ isUnknownSymbol(symbol: [Symbol](../interface.Symbol/README.md)): `boolean`



#### ⚙ getMergedSymbol(symbol: [Symbol](../interface.Symbol/README.md)): [Symbol](../interface.Symbol/README.md)



#### ⚙ getConstantValue(node: [EnumMember](../interface.EnumMember/README.md) | [PropertyAccessExpression](../interface.PropertyAccessExpression/README.md) | [ElementAccessExpression](../interface.ElementAccessExpression/README.md)): `string` | `number`



#### ⚙ isValidPropertyAccess(node: [PropertyAccessExpression](../interface.PropertyAccessExpression/README.md) | [QualifiedName](../interface.QualifiedName/README.md) | [ImportTypeNode](../interface.ImportTypeNode/README.md), propertyName: `string`): `boolean`



#### ⚙ getAliasedSymbol(symbol: [Symbol](../interface.Symbol/README.md)): [Symbol](../interface.Symbol/README.md)

> Follow all aliases to get the original symbol.



#### ⚙ getImmediateAliasedSymbol(symbol: [Symbol](../interface.Symbol/README.md)): [Symbol](../interface.Symbol/README.md)

> Follow a *single* alias to get the immediately aliased symbol.



#### ⚙ getExportsOfModule(moduleSymbol: [Symbol](../interface.Symbol/README.md)): [Symbol](../interface.Symbol/README.md)\[]



#### ⚙ getJsxIntrinsicTagNamesAt(location: [Node](../interface.Node/README.md)): [Symbol](../interface.Symbol/README.md)\[]



#### ⚙ isOptionalParameter(node: [ParameterDeclaration](../interface.ParameterDeclaration/README.md)): `boolean`



#### ⚙ getAmbientModules(): [Symbol](../interface.Symbol/README.md)\[]



#### ⚙ tryGetMemberInModuleExports(memberName: `string`, moduleSymbol: [Symbol](../interface.Symbol/README.md)): [Symbol](../interface.Symbol/README.md)



#### ⚙ getApparentType(type: [Type](../interface.Type/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getBaseConstraintOfType(type: [Type](../interface.Type/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getDefaultFromTypeParameter(type: [Type](../interface.Type/README.md)): [Type](../interface.Type/README.md)



#### ⚙ getAnyType(): [Type](../interface.Type/README.md)

> Gets the intrinsic `any` type. There are multiple types that act as `any` used internally in the compiler,
> so the type returned by this function should not be used in equality checks to determine if another type
> is `any`. Instead, use `type.flags & TypeFlags.Any`.



#### ⚙ getStringType(): [Type](../interface.Type/README.md)



#### ⚙ getStringLiteralType(value: `string`): [StringLiteralType](../interface.StringLiteralType/README.md)



#### ⚙ getNumberType(): [Type](../interface.Type/README.md)



#### ⚙ getNumberLiteralType(value: `number`): [NumberLiteralType](../interface.NumberLiteralType/README.md)



#### ⚙ getBigIntType(): [Type](../interface.Type/README.md)



#### ⚙ getBigIntLiteralType(value: [PseudoBigInt](../interface.PseudoBigInt/README.md)): [BigIntLiteralType](../interface.BigIntLiteralType/README.md)



#### ⚙ getBooleanType(): [Type](../interface.Type/README.md)



#### ⚙ getUnknownType(): [Type](../interface.Type/README.md)



#### ⚙ getFalseType(): [Type](../interface.Type/README.md)



#### ⚙ getTrueType(): [Type](../interface.Type/README.md)



#### ⚙ getVoidType(): [Type](../interface.Type/README.md)



#### ⚙ getUndefinedType(): [Type](../interface.Type/README.md)

> Gets the intrinsic `undefined` type. There are multiple types that act as `undefined` used internally in the compiler
> depending on compiler options, so the type returned by this function should not be used in equality checks to determine
> if another type is `undefined`. Instead, use `type.flags & TypeFlags.Undefined`.



#### ⚙ getNullType(): [Type](../interface.Type/README.md)

> Gets the intrinsic `null` type. There are multiple types that act as `null` used internally in the compiler,
> so the type returned by this function should not be used in equality checks to determine if another type
> is `null`. Instead, use `type.flags & TypeFlags.Null`.



#### ⚙ getESSymbolType(): [Type](../interface.Type/README.md)



#### ⚙ getNeverType(): [Type](../interface.Type/README.md)

> Gets the intrinsic `never` type. There are multiple types that act as `never` used internally in the compiler,
> so the type returned by this function should not be used in equality checks to determine if another type
> is `never`. Instead, use `type.flags & TypeFlags.Never`.



#### ⚙ isTypeAssignableTo(source: [Type](../interface.Type/README.md), target: [Type](../interface.Type/README.md)): `boolean`

> Returns true if the "source" type is assignable to the "target" type.
> 
> ```ts
> declare const abcLiteral: ts.Type; // Type of "abc"
> declare const stringType: ts.Type; // Type of string
> 
> isTypeAssignableTo(abcLiteral, abcLiteral); // true; "abc" is assignable to "abc"
> isTypeAssignableTo(abcLiteral, stringType); // true; "abc" is assignable to string
> isTypeAssignableTo(stringType, abcLiteral); // false; string is not assignable to "abc"
> isTypeAssignableTo(stringType, stringType); // true; string is assignable to string
> ```



#### ⚙ isArrayType(type: [Type](../interface.Type/README.md)): `boolean`

> True if this type is the `Array` or `ReadonlyArray` type from lib.d.ts.
> This function will _not_ return true if passed a type which
> extends `Array` (for example, the TypeScript AST's `NodeArray` type).



#### ⚙ isTupleType(type: [Type](../interface.Type/README.md)): `boolean`

> True if this type is a tuple type. This function will _not_ return true if
> passed a type which extends from a tuple.



#### ⚙ isArrayLikeType(type: [Type](../interface.Type/README.md)): `boolean`

> True if this type is assignable to `ReadonlyArray<any>`.



#### ⚙ resolveName(name: `string`, location: [Node](../interface.Node/README.md) | `undefined`, meaning: [SymbolFlags](../enum.SymbolFlags/README.md), excludeGlobals: `boolean`): [Symbol](../interface.Symbol/README.md)



#### ⚙ getTypePredicateOfSignature(signature: [Signature](../interface.Signature/README.md)): TypePredicate



#### ⚙ runWithCancellationToken\<T>(token: [CancellationToken](../interface.CancellationToken/README.md), cb: (checker: [TypeChecker](../interface.TypeChecker/README.md)) => T): T

> Depending on the operation performed, it may be appropriate to throw away the checker
> if the cancellation token is triggered. Typically, if it is used for error checking
> and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.



#### ⚙ getTypeArgumentsForResolvedSignature(signature: [Signature](../interface.Signature/README.md)): readonly Type\[]



