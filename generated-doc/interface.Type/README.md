# `interface` Type

[Documentation Index](../README.md)

## This interface has

- 5 properties:
[flags](#-flags-typeflags),
[symbol](#-symbol-symbol),
[pattern](#-pattern-destructuringpattern),
[aliasSymbol](#-aliassymbol-symbol),
[aliasTypeArguments](#-aliastypearguments-readonly-type)
- 23 methods:
[getFlags](#-getflags-typeflags),
[getSymbol](#-getsymbol-symbol),
[getProperties](#-getproperties-symbol),
[getProperty](#-getpropertypropertyname-string-symbol),
[getApparentProperties](#-getapparentproperties-symbol),
[getCallSignatures](#-getcallsignatures-readonly-signature),
[getConstructSignatures](#-getconstructsignatures-readonly-signature),
[getStringIndexType](#-getstringindextype-type),
[getNumberIndexType](#-getnumberindextype-type),
[getBaseTypes](#-getbasetypes-basetype),
[getNonNullableType](#-getnonnullabletype-type),
[getConstraint](#-getconstraint-type),
[getDefault](#-getdefault-type),
[isUnion](#-isunion-this-is-uniontype),
[isIntersection](#-isintersection-this-is-intersectiontype),
[isUnionOrIntersection](#-isunionorintersection-this-is-unionorintersectiontype),
[isLiteral](#-isliteral-this-is-literaltype),
[isStringLiteral](#-isstringliteral-this-is-stringliteraltype),
[isNumberLiteral](#-isnumberliteral-this-is-numberliteraltype),
[isTypeParameter](#-istypeparameter-this-is-typeparameter),
[isClassOrInterface](#-isclassorinterface-this-is-interfacetype),
[isClass](#-isclass-this-is-interfacetype),
[isIndexType](#-isindextype-this-is-indextype)


#### 📄 flags: [TypeFlags](../enum.TypeFlags/README.md)



#### 📄 symbol: [Symbol](../interface.Symbol/README.md)



#### 📄 pattern?: [DestructuringPattern](../type.DestructuringPattern/README.md)



#### 📄 aliasSymbol?: [Symbol](../interface.Symbol/README.md)



#### 📄 aliasTypeArguments?: readonly [Type](../interface.Type/README.md)\[]



#### ⚙ getFlags(): [TypeFlags](../enum.TypeFlags/README.md)



#### ⚙ getSymbol(): [Symbol](../interface.Symbol/README.md)



#### ⚙ getProperties(): Symbol\[]



#### ⚙ getProperty(propertyName: `string`): [Symbol](../interface.Symbol/README.md)



#### ⚙ getApparentProperties(): Symbol\[]



#### ⚙ getCallSignatures(): readonly Signature\[]



#### ⚙ getConstructSignatures(): readonly Signature\[]



#### ⚙ getStringIndexType(): [Type](../interface.Type/README.md)



#### ⚙ getNumberIndexType(): [Type](../interface.Type/README.md)



#### ⚙ getBaseTypes(): BaseType\[]



#### ⚙ getNonNullableType(): [Type](../interface.Type/README.md)



#### ⚙ getConstraint(): [Type](../interface.Type/README.md)



#### ⚙ getDefault(): [Type](../interface.Type/README.md)



#### ⚙ isUnion(): `this` `is` [UnionType](../interface.UnionType/README.md)



#### ⚙ isIntersection(): `this` `is` [IntersectionType](../interface.IntersectionType/README.md)



#### ⚙ isUnionOrIntersection(): `this` `is` [UnionOrIntersectionType](../interface.UnionOrIntersectionType/README.md)



#### ⚙ isLiteral(): `this` `is` [LiteralType](../interface.LiteralType/README.md)



#### ⚙ isStringLiteral(): `this` `is` [StringLiteralType](../interface.StringLiteralType/README.md)



#### ⚙ isNumberLiteral(): `this` `is` [NumberLiteralType](../interface.NumberLiteralType/README.md)



#### ⚙ isTypeParameter(): `this` `is` [TypeParameter](../interface.TypeParameter/README.md)



#### ⚙ isClassOrInterface(): `this` `is` [InterfaceType](../interface.InterfaceType/README.md)



#### ⚙ isClass(): `this` `is` [InterfaceType](../interface.InterfaceType/README.md)



#### ⚙ isIndexType(): `this` `is` [IndexType](../interface.IndexType/README.md)



