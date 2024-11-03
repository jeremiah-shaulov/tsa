# `interface` TypeChecker

[Documentation Index](../README.md)

## This interface has

- property [getIndexInfosOfIndexSymbol](#-getindexinfosofindexsymbol-indexsymbol-symbol--indexinfo)
- 86 methods:
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
[runWithCancellationToken](#-runwithcancellationtokenttoken-cancellationtoken-cb-checker-typechecker--t-t)


#### 📄 getIndexInfosOfIndexSymbol: (indexSymbol: [Symbol](../private.interface.Symbol/README.md)) => [IndexInfo](../private.interface.IndexInfo/README.md)\[]



#### ⚙ getTypeOfSymbolAtLocation(symbol: [Symbol](../private.interface.Symbol/README.md), node: [Node](../private.interface.Node/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getTypeOfSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getDeclaredTypeOfSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getPropertiesOfType(type: [Type](../private.interface.Type/README.md)): Symbol\[]



#### ⚙ getPropertyOfType(type: [Type](../private.interface.Type/README.md), propertyName: `string`): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getPrivateIdentifierPropertyOfType(leftType: [Type](../private.interface.Type/README.md), name: `string`, location: [Node](../private.interface.Node/README.md)): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getIndexInfoOfType(type: [Type](../private.interface.Type/README.md), kind: [IndexKind](../private.enum.IndexKind/README.md)): [IndexInfo](../private.interface.IndexInfo/README.md)



#### ⚙ getIndexInfosOfType(type: [Type](../private.interface.Type/README.md)): readonly IndexInfo\[]



#### ⚙ getSignaturesOfType(type: [Type](../private.interface.Type/README.md), kind: [SignatureKind](../private.enum.SignatureKind/README.md)): readonly Signature\[]



#### ⚙ getIndexTypeOfType(type: [Type](../private.interface.Type/README.md), kind: [IndexKind](../private.enum.IndexKind/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getBaseTypes(type: [InterfaceType](../private.interface.InterfaceType/README.md)): BaseType\[]



#### ⚙ getBaseTypeOfLiteralType(type: [Type](../private.interface.Type/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getWidenedType(type: [Type](../private.interface.Type/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getAwaitedType(type: [Type](../private.interface.Type/README.md)): [Type](../private.interface.Type/README.md)

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



#### ⚙ getReturnTypeOfSignature(signature: [Signature](../private.interface.Signature/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getNullableType(type: [Type](../private.interface.Type/README.md), flags: [TypeFlags](../private.enum.TypeFlags/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getNonNullableType(type: [Type](../private.interface.Type/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getTypeArguments(type: [TypeReference](../private.interface.TypeReference/README.md)): readonly Type\[]



#### ⚙ typeToTypeNode(type: [Type](../private.interface.Type/README.md), enclosingDeclaration: [Node](../private.interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../private.enum.NodeBuilderFlags/README.md) | `undefined`): [TypeNode](../private.interface.TypeNode/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ signatureToSignatureDeclaration(signature: [Signature](../private.interface.Signature/README.md), kind: [SyntaxKind](../private.enum.SyntaxKind/README.md), enclosingDeclaration: [Node](../private.interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../private.enum.NodeBuilderFlags/README.md) | `undefined`): SignatureDeclaration \& \{typeArguments?: NodeArray\<TypeNode>}

> Note that the resulting nodes cannot be checked.



#### ⚙ indexInfoToIndexSignatureDeclaration(indexInfo: [IndexInfo](../private.interface.IndexInfo/README.md), enclosingDeclaration: [Node](../private.interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../private.enum.NodeBuilderFlags/README.md) | `undefined`): [IndexSignatureDeclaration](../private.interface.IndexSignatureDeclaration/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ symbolToEntityName(symbol: [Symbol](../private.interface.Symbol/README.md), meaning: [SymbolFlags](../private.enum.SymbolFlags/README.md), enclosingDeclaration: [Node](../private.interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../private.enum.NodeBuilderFlags/README.md) | `undefined`): EntityName

> Note that the resulting nodes cannot be checked.



#### ⚙ symbolToExpression(symbol: [Symbol](../private.interface.Symbol/README.md), meaning: [SymbolFlags](../private.enum.SymbolFlags/README.md), enclosingDeclaration: [Node](../private.interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../private.enum.NodeBuilderFlags/README.md) | `undefined`): [Expression](../private.interface.Expression/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ symbolToTypeParameterDeclarations(symbol: [Symbol](../private.interface.Symbol/README.md), enclosingDeclaration: [Node](../private.interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../private.enum.NodeBuilderFlags/README.md) | `undefined`): [NodeArray](../private.interface.NodeArray/README.md)\<TypeParameterDeclaration>

> Note that the resulting nodes cannot be checked.



#### ⚙ symbolToParameterDeclaration(symbol: [Symbol](../private.interface.Symbol/README.md), enclosingDeclaration: [Node](../private.interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../private.enum.NodeBuilderFlags/README.md) | `undefined`): [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ typeParameterToDeclaration(parameter: [TypeParameter](../private.interface.TypeParameter/README.md), enclosingDeclaration: [Node](../private.interface.Node/README.md) | `undefined`, flags: [NodeBuilderFlags](../private.enum.NodeBuilderFlags/README.md) | `undefined`): [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)

> Note that the resulting nodes cannot be checked.



#### ⚙ getSymbolsInScope(location: [Node](../private.interface.Node/README.md), meaning: [SymbolFlags](../private.enum.SymbolFlags/README.md)): Symbol\[]



#### ⚙ getSymbolAtLocation(node: [Node](../private.interface.Node/README.md)): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getSymbolsOfParameterPropertyDeclaration(parameter: [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md), parameterName: `string`): Symbol\[]



#### ⚙ getShorthandAssignmentValueSymbol(location: [Node](../private.interface.Node/README.md) | `undefined`): [Symbol](../private.interface.Symbol/README.md)

> The function returns the value (local variable) symbol of an identifier in the short-hand property assignment.
> This is necessary as an identifier in short-hand property assignment can contains two meaning: property name and property value.



#### ⚙ getExportSpecifierLocalTargetSymbol(location: [ExportSpecifier](../private.interface.ExportSpecifier/README.md) | [Identifier](../private.interface.Identifier/README.md)): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getExportSymbolOfSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): [Symbol](../private.interface.Symbol/README.md)

> If a symbol is a local symbol with an associated exported symbol, returns the exported symbol.
> Otherwise returns its input.
> For example, at `export type T = number;`:
>     - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
>     - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
>     - Calling `getExportSymbolOfSymbol` on that local symbol will return the exported symbol.



#### ⚙ getPropertySymbolOfDestructuringAssignment(location: [Identifier](../private.interface.Identifier/README.md)): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getTypeOfAssignmentPattern(pattern: [AssignmentPattern](../private.type.AssignmentPattern/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getTypeAtLocation(node: [Node](../private.interface.Node/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getTypeFromTypeNode(node: [TypeNode](../private.interface.TypeNode/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ signatureToString(signature: [Signature](../private.interface.Signature/README.md), enclosingDeclaration?: [Node](../private.interface.Node/README.md), flags?: [TypeFormatFlags](../private.enum.TypeFormatFlags/README.md), kind?: [SignatureKind](../private.enum.SignatureKind/README.md)): `string`



#### ⚙ typeToString(type: [Type](../private.interface.Type/README.md), enclosingDeclaration?: [Node](../private.interface.Node/README.md), flags?: [TypeFormatFlags](../private.enum.TypeFormatFlags/README.md)): `string`



#### ⚙ symbolToString(symbol: [Symbol](../private.interface.Symbol/README.md), enclosingDeclaration?: [Node](../private.interface.Node/README.md), meaning?: [SymbolFlags](../private.enum.SymbolFlags/README.md), flags?: [SymbolFormatFlags](../private.enum.SymbolFormatFlags/README.md)): `string`



#### ⚙ typePredicateToString(predicate: [TypePredicate](../private.type.TypePredicate/README.md), enclosingDeclaration?: [Node](../private.interface.Node/README.md), flags?: [TypeFormatFlags](../private.enum.TypeFormatFlags/README.md)): `string`



#### ⚙ getFullyQualifiedName(symbol: [Symbol](../private.interface.Symbol/README.md)): `string`



#### ⚙ getAugmentedPropertiesOfType(type: [Type](../private.interface.Type/README.md)): Symbol\[]



#### ⚙ getRootSymbols(symbol: [Symbol](../private.interface.Symbol/README.md)): readonly Symbol\[]



#### ⚙ getSymbolOfExpando(node: [Node](../private.interface.Node/README.md), allowDeclaration: `boolean`): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getContextualType(node: [Expression](../private.interface.Expression/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getResolvedSignature(node: [CallLikeExpression](../private.type.CallLikeExpression/README.md), candidatesOutArray?: [Signature](../private.interface.Signature/README.md)\[], argumentCount?: `number`): [Signature](../private.interface.Signature/README.md)

> returns unknownSignature in the case of an error.
> returns undefined if the node is not valid.



#### ⚙ getSignatureFromDeclaration(declaration: [SignatureDeclaration](../private.type.SignatureDeclaration/README.md)): [Signature](../private.interface.Signature/README.md)



#### ⚙ isImplementationOfOverload(node: [SignatureDeclaration](../private.type.SignatureDeclaration/README.md)): `boolean`



#### ⚙ isUndefinedSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): `boolean`



#### ⚙ isArgumentsSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): `boolean`



#### ⚙ isUnknownSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): `boolean`



#### ⚙ getMergedSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getConstantValue(node: [EnumMember](../private.interface.EnumMember/README.md) | [PropertyAccessExpression](../private.interface.PropertyAccessExpression/README.md) | [ElementAccessExpression](../private.interface.ElementAccessExpression/README.md)): `string` | `number`



#### ⚙ isValidPropertyAccess(node: [PropertyAccessExpression](../private.interface.PropertyAccessExpression/README.md) | [QualifiedName](../private.interface.QualifiedName/README.md) | [ImportTypeNode](../private.interface.ImportTypeNode/README.md), propertyName: `string`): `boolean`



#### ⚙ getAliasedSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): [Symbol](../private.interface.Symbol/README.md)

> Follow all aliases to get the original symbol.



#### ⚙ getImmediateAliasedSymbol(symbol: [Symbol](../private.interface.Symbol/README.md)): [Symbol](../private.interface.Symbol/README.md)

> Follow a *single* alias to get the immediately aliased symbol.



#### ⚙ getExportsOfModule(moduleSymbol: [Symbol](../private.interface.Symbol/README.md)): Symbol\[]



#### ⚙ getJsxIntrinsicTagNamesAt(location: [Node](../private.interface.Node/README.md)): Symbol\[]



#### ⚙ isOptionalParameter(node: [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)): `boolean`



#### ⚙ getAmbientModules(): Symbol\[]



#### ⚙ tryGetMemberInModuleExports(memberName: `string`, moduleSymbol: [Symbol](../private.interface.Symbol/README.md)): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getApparentType(type: [Type](../private.interface.Type/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getBaseConstraintOfType(type: [Type](../private.interface.Type/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getDefaultFromTypeParameter(type: [Type](../private.interface.Type/README.md)): [Type](../private.interface.Type/README.md)



#### ⚙ getAnyType(): [Type](../private.interface.Type/README.md)

> Gets the intrinsic `any` type. There are multiple types that act as `any` used internally in the compiler,
> so the type returned by this function should not be used in equality checks to determine if another type
> is `any`. Instead, use `type.flags & TypeFlags.Any`.



#### ⚙ getStringType(): [Type](../private.interface.Type/README.md)



#### ⚙ getStringLiteralType(value: `string`): [StringLiteralType](../private.interface.StringLiteralType/README.md)



#### ⚙ getNumberType(): [Type](../private.interface.Type/README.md)



#### ⚙ getNumberLiteralType(value: `number`): [NumberLiteralType](../private.interface.NumberLiteralType/README.md)



#### ⚙ getBigIntType(): [Type](../private.interface.Type/README.md)



#### ⚙ getBigIntLiteralType(value: [PseudoBigInt](../private.interface.PseudoBigInt/README.md)): [BigIntLiteralType](../private.interface.BigIntLiteralType/README.md)



#### ⚙ getBooleanType(): [Type](../private.interface.Type/README.md)



#### ⚙ getFalseType(): [Type](../private.interface.Type/README.md)



#### ⚙ getTrueType(): [Type](../private.interface.Type/README.md)



#### ⚙ getVoidType(): [Type](../private.interface.Type/README.md)



#### ⚙ getUndefinedType(): [Type](../private.interface.Type/README.md)

> Gets the intrinsic `undefined` type. There are multiple types that act as `undefined` used internally in the compiler
> depending on compiler options, so the type returned by this function should not be used in equality checks to determine
> if another type is `undefined`. Instead, use `type.flags & TypeFlags.Undefined`.



#### ⚙ getNullType(): [Type](../private.interface.Type/README.md)

> Gets the intrinsic `null` type. There are multiple types that act as `null` used internally in the compiler,
> so the type returned by this function should not be used in equality checks to determine if another type
> is `null`. Instead, use `type.flags & TypeFlags.Null`.



#### ⚙ getESSymbolType(): [Type](../private.interface.Type/README.md)



#### ⚙ getNeverType(): [Type](../private.interface.Type/README.md)

> Gets the intrinsic `never` type. There are multiple types that act as `never` used internally in the compiler,
> so the type returned by this function should not be used in equality checks to determine if another type
> is `never`. Instead, use `type.flags & TypeFlags.Never`.



#### ⚙ isTypeAssignableTo(source: [Type](../private.interface.Type/README.md), target: [Type](../private.interface.Type/README.md)): `boolean`

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



#### ⚙ isArrayType(type: [Type](../private.interface.Type/README.md)): `boolean`

> True if this type is the `Array` or `ReadonlyArray` type from lib.d.ts.
> This function will _not_ return true if passed a type which
> extends `Array` (for example, the TypeScript AST's `NodeArray` type).



#### ⚙ isTupleType(type: [Type](../private.interface.Type/README.md)): `boolean`

> True if this type is a tuple type. This function will _not_ return true if
> passed a type which extends from a tuple.



#### ⚙ isArrayLikeType(type: [Type](../private.interface.Type/README.md)): `boolean`

> True if this type is assignable to `ReadonlyArray<any>`.



#### ⚙ resolveName(name: `string`, location: [Node](../private.interface.Node/README.md) | `undefined`, meaning: [SymbolFlags](../private.enum.SymbolFlags/README.md), excludeGlobals: `boolean`): [Symbol](../private.interface.Symbol/README.md)



#### ⚙ getTypePredicateOfSignature(signature: [Signature](../private.interface.Signature/README.md)): TypePredicate



#### ⚙ runWithCancellationToken\<T>(token: [CancellationToken](../private.interface.CancellationToken/README.md), cb: (checker: [TypeChecker](../private.interface.TypeChecker/README.md)) => T): T

> Depending on the operation performed, it may be appropriate to throw away the checker
> if the cancellation token is triggered. Typically, if it is used for error checking
> and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.



