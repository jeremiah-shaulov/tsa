# `interface` NodeFactory

[Documentation Index](../README.md)

## This interface has

- 458 methods:
[createNodeArray](#-createnodearrayt-extends-nodeelements-readonly-t-hastrailingcomma-boolean-nodearrayt),
[createNumericLiteral](#-createnumericliteralvalue-string--number-numericliteralflags-tokenflags-numericliteral),
[createBigIntLiteral](#-createbigintliteralvalue-string--pseudobigint-bigintliteral),
[createStringLiteral](#-createstringliteraltext-string-issinglequote-boolean-stringliteral),
[createStringLiteralFromNode](#-createstringliteralfromnodesourcenode-propertynameliteral--privateidentifier-issinglequote-boolean-stringliteral),
[createRegularExpressionLiteral](#-createregularexpressionliteraltext-string-regularexpressionliteral),
[createIdentifier](#-createidentifiertext-string-identifier),
[createTempVariable](#-createtempvariablerecordtempvariable-node-identifier--void--undefined-reservedinnestedscopes-boolean-identifier),
[createLoopVariable](#-createloopvariablereservedinnestedscopes-boolean-identifier),
[createUniqueName](#-createuniquenametext-string-flags-generatedidentifierflags-identifier),
[getGeneratedNameForNode](#-getgeneratednamefornodenode-node--undefined-flags-generatedidentifierflags-identifier),
[createPrivateIdentifier](#-createprivateidentifiertext-string-privateidentifier),
[createUniquePrivateName](#-createuniqueprivatenametext-string-privateidentifier),
[getGeneratedPrivateNameForNode](#-getgeneratedprivatenamefornodenode-node-privateidentifier),
[createToken](#-createtokentoken-syntaxkindsuperkeyword-superexpression),
[createToken](#-createtokentoken-syntaxkindthiskeyword-thisexpression),
[createToken](#-createtokentoken-syntaxkindnullkeyword-nullliteral),
[createToken](#-createtokentoken-syntaxkindtruekeyword-trueliteral),
[createToken](#-createtokentoken-syntaxkindfalsekeyword-falseliteral),
[createToken](#-createtokentoken-syntaxkindendoffiletoken-endoffiletoken),
[createToken](#-createtokentoken-syntaxkindunknown-tokensyntaxkindunknown),
[createToken](#-createtokentkind-extends-punctuationsyntaxkindtoken-tkind-punctuationtokentkind),
[createToken](#-createtokentkind-extends-keywordtypesyntaxkindtoken-tkind-keywordtypenodetkind),
[createToken](#-createtokentkind-extends-modifiersyntaxkindtoken-tkind-modifiertokentkind),
[createToken](#-createtokentkind-extends-keywordsyntaxkindtoken-tkind-keywordtokentkind),
[createSuper](#-createsuper-superexpression),
[createThis](#-createthis-thisexpression),
[createNull](#-createnull-nullliteral),
[createTrue](#-createtrue-trueliteral),
[createFalse](#-createfalse-falseliteral),
[createModifier](#-createmodifiert-extends-modifiersyntaxkindkind-t-modifiertokent),
[createModifiersFromModifierFlags](#-createmodifiersfrommodifierflagsflags-modifierflags-modifier),
[createQualifiedName](#-createqualifiednameleft-entityname-right-string--identifier-qualifiedname),
[updateQualifiedName](#-updatequalifiednamenode-qualifiedname-left-entityname-right-identifier-qualifiedname),
[createComputedPropertyName](#-createcomputedpropertynameexpression-expression-computedpropertyname),
[updateComputedPropertyName](#-updatecomputedpropertynamenode-computedpropertyname-expression-expression-computedpropertyname),
[createTypeParameterDeclaration](#-createtypeparameterdeclarationmodifiers-readonly-modifier--undefined-name-string--identifier-constraint-typenode-defaulttype-typenode-typeparameterdeclaration),
[updateTypeParameterDeclaration](#-updatetypeparameterdeclarationnode-typeparameterdeclaration-modifiers-readonly-modifier--undefined-name-identifier-constraint-typenode--undefined-defaulttype-typenode--undefined-typeparameterdeclaration),
[createParameterDeclaration](#-createparameterdeclarationmodifiers-readonly-modifierlike--undefined-dotdotdottoken-dotdotdottoken--undefined-name-string--bindingname-questiontoken-questiontoken-type-typenode-initializer-expression-parameterdeclaration),
[updateParameterDeclaration](#-updateparameterdeclarationnode-parameterdeclaration-modifiers-readonly-modifierlike--undefined-dotdotdottoken-dotdotdottoken--undefined-name-string--bindingname-questiontoken-questiontoken--undefined-type-typenode--undefined-initializer-expression--undefined-parameterdeclaration),
[createDecorator](#-createdecoratorexpression-expression-decorator),
[updateDecorator](#-updatedecoratornode-decorator-expression-expression-decorator),
[createPropertySignature](#-createpropertysignaturemodifiers-readonly-modifier--undefined-name-propertyname--string-questiontoken-questiontoken--undefined-type-typenode--undefined-propertysignature),
[updatePropertySignature](#-updatepropertysignaturenode-propertysignature-modifiers-readonly-modifier--undefined-name-propertyname-questiontoken-questiontoken--undefined-type-typenode--undefined-propertysignature),
[createPropertyDeclaration](#-createpropertydeclarationmodifiers-readonly-modifierlike--undefined-name-string--propertyname-questionorexclamationtoken-questiontoken--exclamationtoken--undefined-type-typenode--undefined-initializer-expression--undefined-propertydeclaration),
[updatePropertyDeclaration](#-updatepropertydeclarationnode-propertydeclaration-modifiers-readonly-modifierlike--undefined-name-string--propertyname-questionorexclamationtoken-questiontoken--exclamationtoken--undefined-type-typenode--undefined-initializer-expression--undefined-propertydeclaration),
[createMethodSignature](#-createmethodsignaturemodifiers-readonly-modifier--undefined-name-string--propertyname-questiontoken-questiontoken--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-methodsignature),
[updateMethodSignature](#-updatemethodsignaturenode-methodsignature-modifiers-readonly-modifier--undefined-name-propertyname-questiontoken-questiontoken--undefined-typeparameters-nodearraytypeparameterdeclaration--undefined-parameters-nodearrayparameterdeclaration-type-typenode--undefined-methodsignature),
[createMethodDeclaration](#-createmethoddeclarationmodifiers-readonly-modifierlike--undefined-asterisktoken-asterisktoken--undefined-name-string--propertyname-questiontoken-questiontoken--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-body-block--undefined-methoddeclaration),
[updateMethodDeclaration](#-updatemethoddeclarationnode-methoddeclaration-modifiers-readonly-modifierlike--undefined-asterisktoken-asterisktoken--undefined-name-propertyname-questiontoken-questiontoken--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-body-block--undefined-methoddeclaration),
[createConstructorDeclaration](#-createconstructordeclarationmodifiers-readonly-modifierlike--undefined-parameters-readonly-parameterdeclaration-body-block--undefined-constructordeclaration),
[updateConstructorDeclaration](#-updateconstructordeclarationnode-constructordeclaration-modifiers-readonly-modifierlike--undefined-parameters-readonly-parameterdeclaration-body-block--undefined-constructordeclaration),
[createGetAccessorDeclaration](#-creategetaccessordeclarationmodifiers-readonly-modifierlike--undefined-name-string--propertyname-parameters-readonly-parameterdeclaration-type-typenode--undefined-body-block--undefined-getaccessordeclaration),
[updateGetAccessorDeclaration](#-updategetaccessordeclarationnode-getaccessordeclaration-modifiers-readonly-modifierlike--undefined-name-propertyname-parameters-readonly-parameterdeclaration-type-typenode--undefined-body-block--undefined-getaccessordeclaration),
[createSetAccessorDeclaration](#-createsetaccessordeclarationmodifiers-readonly-modifierlike--undefined-name-string--propertyname-parameters-readonly-parameterdeclaration-body-block--undefined-setaccessordeclaration),
[updateSetAccessorDeclaration](#-updatesetaccessordeclarationnode-setaccessordeclaration-modifiers-readonly-modifierlike--undefined-name-propertyname-parameters-readonly-parameterdeclaration-body-block--undefined-setaccessordeclaration),
[createCallSignature](#-createcallsignaturetypeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-callsignaturedeclaration),
[updateCallSignature](#-updatecallsignaturenode-callsignaturedeclaration-typeparameters-nodearraytypeparameterdeclaration--undefined-parameters-nodearrayparameterdeclaration-type-typenode--undefined-callsignaturedeclaration),
[createConstructSignature](#-createconstructsignaturetypeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-constructsignaturedeclaration),
[updateConstructSignature](#-updateconstructsignaturenode-constructsignaturedeclaration-typeparameters-nodearraytypeparameterdeclaration--undefined-parameters-nodearrayparameterdeclaration-type-typenode--undefined-constructsignaturedeclaration),
[createIndexSignature](#-createindexsignaturemodifiers-readonly-modifierlike--undefined-parameters-readonly-parameterdeclaration-type-typenode-indexsignaturedeclaration),
[updateIndexSignature](#-updateindexsignaturenode-indexsignaturedeclaration-modifiers-readonly-modifierlike--undefined-parameters-readonly-parameterdeclaration-type-typenode-indexsignaturedeclaration),
[createTemplateLiteralTypeSpan](#-createtemplateliteraltypespantype-typenode-literal-templatemiddle--templatetail-templateliteraltypespan),
[updateTemplateLiteralTypeSpan](#-updatetemplateliteraltypespannode-templateliteraltypespan-type-typenode-literal-templatemiddle--templatetail-templateliteraltypespan),
[createClassStaticBlockDeclaration](#-createclassstaticblockdeclarationbody-block-classstaticblockdeclaration),
[updateClassStaticBlockDeclaration](#-updateclassstaticblockdeclarationnode-classstaticblockdeclaration-body-block-classstaticblockdeclaration),
[createKeywordTypeNode](#-createkeywordtypenodetkind-extends-keywordtypesyntaxkindkind-tkind-keywordtypenodetkind),
[createTypePredicateNode](#-createtypepredicatenodeassertsmodifier-assertskeyword--undefined-parametername-identifier--thistypenode--string-type-typenode--undefined-typepredicatenode),
[updateTypePredicateNode](#-updatetypepredicatenodenode-typepredicatenode-assertsmodifier-assertskeyword--undefined-parametername-identifier--thistypenode-type-typenode--undefined-typepredicatenode),
[createTypeReferenceNode](#-createtypereferencenodetypename-string--entityname-typearguments-readonly-typenode-typereferencenode),
[updateTypeReferenceNode](#-updatetypereferencenodenode-typereferencenode-typename-entityname-typearguments-nodearraytypenode--undefined-typereferencenode),
[createFunctionTypeNode](#-createfunctiontypenodetypeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode-functiontypenode),
[updateFunctionTypeNode](#-updatefunctiontypenodenode-functiontypenode-typeparameters-nodearraytypeparameterdeclaration--undefined-parameters-nodearrayparameterdeclaration-type-typenode-functiontypenode),
[createConstructorTypeNode](#-createconstructortypenodemodifiers-readonly-modifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode-constructortypenode),
[updateConstructorTypeNode](#-updateconstructortypenodenode-constructortypenode-modifiers-readonly-modifier--undefined-typeparameters-nodearraytypeparameterdeclaration--undefined-parameters-nodearrayparameterdeclaration-type-typenode-constructortypenode),
[createTypeQueryNode](#-createtypequerynodeexprname-entityname-typearguments-readonly-typenode-typequerynode),
[updateTypeQueryNode](#-updatetypequerynodenode-typequerynode-exprname-entityname-typearguments-readonly-typenode-typequerynode),
[createTypeLiteralNode](#-createtypeliteralnodemembers-readonly-typeelement--undefined-typeliteralnode),
[updateTypeLiteralNode](#-updatetypeliteralnodenode-typeliteralnode-members-nodearraytypeelement-typeliteralnode),
[createArrayTypeNode](#-createarraytypenodeelementtype-typenode-arraytypenode),
[updateArrayTypeNode](#-updatearraytypenodenode-arraytypenode-elementtype-typenode-arraytypenode),
[createTupleTypeNode](#-createtupletypenodeelements-readonly-typenode--namedtuplemember-tupletypenode),
[updateTupleTypeNode](#-updatetupletypenodenode-tupletypenode-elements-readonly-typenode--namedtuplemember-tupletypenode),
[createNamedTupleMember](#-createnamedtuplememberdotdotdottoken-dotdotdottoken--undefined-name-identifier-questiontoken-questiontoken--undefined-type-typenode-namedtuplemember),
[updateNamedTupleMember](#-updatenamedtuplemembernode-namedtuplemember-dotdotdottoken-dotdotdottoken--undefined-name-identifier-questiontoken-questiontoken--undefined-type-typenode-namedtuplemember),
[createOptionalTypeNode](#-createoptionaltypenodetype-typenode-optionaltypenode),
[updateOptionalTypeNode](#-updateoptionaltypenodenode-optionaltypenode-type-typenode-optionaltypenode),
[createRestTypeNode](#-createresttypenodetype-typenode-resttypenode),
[updateRestTypeNode](#-updateresttypenodenode-resttypenode-type-typenode-resttypenode),
[createUnionTypeNode](#-createuniontypenodetypes-readonly-typenode-uniontypenode),
[updateUnionTypeNode](#-updateuniontypenodenode-uniontypenode-types-nodearraytypenode-uniontypenode),
[createIntersectionTypeNode](#-createintersectiontypenodetypes-readonly-typenode-intersectiontypenode),
[updateIntersectionTypeNode](#-updateintersectiontypenodenode-intersectiontypenode-types-nodearraytypenode-intersectiontypenode),
[createConditionalTypeNode](#-createconditionaltypenodechecktype-typenode-extendstype-typenode-truetype-typenode-falsetype-typenode-conditionaltypenode),
[updateConditionalTypeNode](#-updateconditionaltypenodenode-conditionaltypenode-checktype-typenode-extendstype-typenode-truetype-typenode-falsetype-typenode-conditionaltypenode),
[createInferTypeNode](#-createinfertypenodetypeparameter-typeparameterdeclaration-infertypenode),
[updateInferTypeNode](#-updateinfertypenodenode-infertypenode-typeparameter-typeparameterdeclaration-infertypenode),
[createImportTypeNode](#-createimporttypenodeargument-typenode-attributes-importattributes-qualifier-entityname-typearguments-readonly-typenode-istypeof-boolean-importtypenode),
[updateImportTypeNode](#-updateimporttypenodenode-importtypenode-argument-typenode-attributes-importattributes--undefined-qualifier-entityname--undefined-typearguments-readonly-typenode--undefined-istypeof-boolean-importtypenode),
[createParenthesizedType](#-createparenthesizedtypetype-typenode-parenthesizedtypenode),
[updateParenthesizedType](#-updateparenthesizedtypenode-parenthesizedtypenode-type-typenode-parenthesizedtypenode),
[createThisTypeNode](#-createthistypenode-thistypenode),
[createTypeOperatorNode](#-createtypeoperatornodeoperator-syntaxkindkeyofkeyword--syntaxkinduniquekeyword--syntaxkindreadonlykeyword-type-typenode-typeoperatornode),
[updateTypeOperatorNode](#-updatetypeoperatornodenode-typeoperatornode-type-typenode-typeoperatornode),
[createIndexedAccessTypeNode](#-createindexedaccesstypenodeobjecttype-typenode-indextype-typenode-indexedaccesstypenode),
[updateIndexedAccessTypeNode](#-updateindexedaccesstypenodenode-indexedaccesstypenode-objecttype-typenode-indextype-typenode-indexedaccesstypenode),
[createMappedTypeNode](#-createmappedtypenodereadonlytoken-readonlykeyword--plustoken--minustoken--undefined-typeparameter-typeparameterdeclaration-nametype-typenode--undefined-questiontoken-questiontoken--plustoken--minustoken--undefined-type-typenode--undefined-members-nodearraytypeelement--undefined-mappedtypenode),
[updateMappedTypeNode](#-updatemappedtypenodenode-mappedtypenode-readonlytoken-readonlykeyword--plustoken--minustoken--undefined-typeparameter-typeparameterdeclaration-nametype-typenode--undefined-questiontoken-questiontoken--plustoken--minustoken--undefined-type-typenode--undefined-members-nodearraytypeelement--undefined-mappedtypenode),
[createLiteralTypeNode](#-createliteraltypenodeliteral-literaltypenodeliteral-literaltypenode),
[updateLiteralTypeNode](#-updateliteraltypenodenode-literaltypenode-literal-literaltypenodeliteral-literaltypenode),
[createTemplateLiteralType](#-createtemplateliteraltypehead-templatehead-templatespans-readonly-templateliteraltypespan-templateliteraltypenode),
[updateTemplateLiteralType](#-updatetemplateliteraltypenode-templateliteraltypenode-head-templatehead-templatespans-readonly-templateliteraltypespan-templateliteraltypenode),
[createObjectBindingPattern](#-createobjectbindingpatternelements-readonly-bindingelement-objectbindingpattern),
[updateObjectBindingPattern](#-updateobjectbindingpatternnode-objectbindingpattern-elements-readonly-bindingelement-objectbindingpattern),
[createArrayBindingPattern](#-createarraybindingpatternelements-readonly-arraybindingelement-arraybindingpattern),
[updateArrayBindingPattern](#-updatearraybindingpatternnode-arraybindingpattern-elements-readonly-arraybindingelement-arraybindingpattern),
[createBindingElement](#-createbindingelementdotdotdottoken-dotdotdottoken--undefined-propertyname-string--propertyname--undefined-name-string--bindingname-initializer-expression-bindingelement),
[updateBindingElement](#-updatebindingelementnode-bindingelement-dotdotdottoken-dotdotdottoken--undefined-propertyname-propertyname--undefined-name-bindingname-initializer-expression--undefined-bindingelement),
[createArrayLiteralExpression](#-createarrayliteralexpressionelements-readonly-expression-multiline-boolean-arrayliteralexpression),
[updateArrayLiteralExpression](#-updatearrayliteralexpressionnode-arrayliteralexpression-elements-readonly-expression-arrayliteralexpression),
[createObjectLiteralExpression](#-createobjectliteralexpressionproperties-readonly-objectliteralelementlike-multiline-boolean-objectliteralexpression),
[updateObjectLiteralExpression](#-updateobjectliteralexpressionnode-objectliteralexpression-properties-readonly-objectliteralelementlike-objectliteralexpression),
[createPropertyAccessExpression](#-createpropertyaccessexpressionexpression-expression-name-string--membername-propertyaccessexpression),
[updatePropertyAccessExpression](#-updatepropertyaccessexpressionnode-propertyaccessexpression-expression-expression-name-membername-propertyaccessexpression),
[createPropertyAccessChain](#-createpropertyaccesschainexpression-expression-questiondottoken-questiondottoken--undefined-name-string--membername-propertyaccesschain),
[updatePropertyAccessChain](#-updatepropertyaccesschainnode-propertyaccesschain-expression-expression-questiondottoken-questiondottoken--undefined-name-membername-propertyaccesschain),
[createElementAccessExpression](#-createelementaccessexpressionexpression-expression-index-number--expression-elementaccessexpression),
[updateElementAccessExpression](#-updateelementaccessexpressionnode-elementaccessexpression-expression-expression-argumentexpression-expression-elementaccessexpression),
[createElementAccessChain](#-createelementaccesschainexpression-expression-questiondottoken-questiondottoken--undefined-index-number--expression-elementaccesschain),
[updateElementAccessChain](#-updateelementaccesschainnode-elementaccesschain-expression-expression-questiondottoken-questiondottoken--undefined-argumentexpression-expression-elementaccesschain),
[createCallExpression](#-createcallexpressionexpression-expression-typearguments-readonly-typenode--undefined-argumentsarray-readonly-expression--undefined-callexpression),
[updateCallExpression](#-updatecallexpressionnode-callexpression-expression-expression-typearguments-readonly-typenode--undefined-argumentsarray-readonly-expression-callexpression),
[createCallChain](#-createcallchainexpression-expression-questiondottoken-questiondottoken--undefined-typearguments-readonly-typenode--undefined-argumentsarray-readonly-expression--undefined-callchain),
[updateCallChain](#-updatecallchainnode-callchain-expression-expression-questiondottoken-questiondottoken--undefined-typearguments-readonly-typenode--undefined-argumentsarray-readonly-expression-callchain),
[createNewExpression](#-createnewexpressionexpression-expression-typearguments-readonly-typenode--undefined-argumentsarray-readonly-expression--undefined-newexpression),
[updateNewExpression](#-updatenewexpressionnode-newexpression-expression-expression-typearguments-readonly-typenode--undefined-argumentsarray-readonly-expression--undefined-newexpression),
[createTaggedTemplateExpression](#-createtaggedtemplateexpressiontag-expression-typearguments-readonly-typenode--undefined-template-templateliteral-taggedtemplateexpression),
[updateTaggedTemplateExpression](#-updatetaggedtemplateexpressionnode-taggedtemplateexpression-tag-expression-typearguments-readonly-typenode--undefined-template-templateliteral-taggedtemplateexpression),
[createTypeAssertion](#-createtypeassertiontype-typenode-expression-expression-typeassertion),
[updateTypeAssertion](#-updatetypeassertionnode-typeassertion-type-typenode-expression-expression-typeassertion),
[createParenthesizedExpression](#-createparenthesizedexpressionexpression-expression-parenthesizedexpression),
[updateParenthesizedExpression](#-updateparenthesizedexpressionnode-parenthesizedexpression-expression-expression-parenthesizedexpression),
[createFunctionExpression](#-createfunctionexpressionmodifiers-readonly-modifier--undefined-asterisktoken-asterisktoken--undefined-name-string--identifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration--undefined-type-typenode--undefined-body-block-functionexpression),
[updateFunctionExpression](#-updatefunctionexpressionnode-functionexpression-modifiers-readonly-modifier--undefined-asterisktoken-asterisktoken--undefined-name-identifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-body-block-functionexpression),
[createArrowFunction](#-createarrowfunctionmodifiers-readonly-modifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-equalsgreaterthantoken-equalsgreaterthantoken--undefined-body-concisebody-arrowfunction),
[updateArrowFunction](#-updatearrowfunctionnode-arrowfunction-modifiers-readonly-modifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-equalsgreaterthantoken-equalsgreaterthantoken-body-concisebody-arrowfunction),
[createDeleteExpression](#-createdeleteexpressionexpression-expression-deleteexpression),
[updateDeleteExpression](#-updatedeleteexpressionnode-deleteexpression-expression-expression-deleteexpression),
[createTypeOfExpression](#-createtypeofexpressionexpression-expression-typeofexpression),
[updateTypeOfExpression](#-updatetypeofexpressionnode-typeofexpression-expression-expression-typeofexpression),
[createVoidExpression](#-createvoidexpressionexpression-expression-voidexpression),
[updateVoidExpression](#-updatevoidexpressionnode-voidexpression-expression-expression-voidexpression),
[createAwaitExpression](#-createawaitexpressionexpression-expression-awaitexpression),
[updateAwaitExpression](#-updateawaitexpressionnode-awaitexpression-expression-expression-awaitexpression),
[createPrefixUnaryExpression](#-createprefixunaryexpressionoperator-prefixunaryoperator-operand-expression-prefixunaryexpression),
[updatePrefixUnaryExpression](#-updateprefixunaryexpressionnode-prefixunaryexpression-operand-expression-prefixunaryexpression),
[createPostfixUnaryExpression](#-createpostfixunaryexpressionoperand-expression-operator-postfixunaryoperator-postfixunaryexpression),
[updatePostfixUnaryExpression](#-updatepostfixunaryexpressionnode-postfixunaryexpression-operand-expression-postfixunaryexpression),
[createBinaryExpression](#-createbinaryexpressionleft-expression-operator-binaryoperator--binaryoperatortoken-right-expression-binaryexpression),
[updateBinaryExpression](#-updatebinaryexpressionnode-binaryexpression-left-expression-operator-binaryoperator--binaryoperatortoken-right-expression-binaryexpression),
[createConditionalExpression](#-createconditionalexpressioncondition-expression-questiontoken-questiontoken--undefined-whentrue-expression-colontoken-colontoken--undefined-whenfalse-expression-conditionalexpression),
[updateConditionalExpression](#-updateconditionalexpressionnode-conditionalexpression-condition-expression-questiontoken-questiontoken-whentrue-expression-colontoken-colontoken-whenfalse-expression-conditionalexpression),
[createTemplateExpression](#-createtemplateexpressionhead-templatehead-templatespans-readonly-templatespan-templateexpression),
[updateTemplateExpression](#-updatetemplateexpressionnode-templateexpression-head-templatehead-templatespans-readonly-templatespan-templateexpression),
[createTemplateHead](#-createtemplateheadtext-string-rawtext-string-templateflags-tokenflags-templatehead),
[createTemplateHead](#-createtemplateheadtext-string--undefined-rawtext-string-templateflags-tokenflags-templatehead),
[createTemplateMiddle](#-createtemplatemiddletext-string-rawtext-string-templateflags-tokenflags-templatemiddle),
[createTemplateMiddle](#-createtemplatemiddletext-string--undefined-rawtext-string-templateflags-tokenflags-templatemiddle),
[createTemplateTail](#-createtemplatetailtext-string-rawtext-string-templateflags-tokenflags-templatetail),
[createTemplateTail](#-createtemplatetailtext-string--undefined-rawtext-string-templateflags-tokenflags-templatetail),
[createNoSubstitutionTemplateLiteral](#-createnosubstitutiontemplateliteraltext-string-rawtext-string-nosubstitutiontemplateliteral),
[createNoSubstitutionTemplateLiteral](#-createnosubstitutiontemplateliteraltext-string--undefined-rawtext-string-nosubstitutiontemplateliteral),
[createYieldExpression](#-createyieldexpressionasterisktoken-asterisktoken-expression-expression-yieldexpression),
[createYieldExpression](#-createyieldexpressionasterisktoken-undefined-expression-expression--undefined-yieldexpression),
[updateYieldExpression](#-updateyieldexpressionnode-yieldexpression-asterisktoken-asterisktoken--undefined-expression-expression--undefined-yieldexpression),
[createSpreadElement](#-createspreadelementexpression-expression-spreadelement),
[updateSpreadElement](#-updatespreadelementnode-spreadelement-expression-expression-spreadelement),
[createClassExpression](#-createclassexpressionmodifiers-readonly-modifierlike--undefined-name-string--identifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-heritageclauses-readonly-heritageclause--undefined-members-readonly-classelement-classexpression),
[updateClassExpression](#-updateclassexpressionnode-classexpression-modifiers-readonly-modifierlike--undefined-name-identifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-heritageclauses-readonly-heritageclause--undefined-members-readonly-classelement-classexpression),
[createOmittedExpression](#-createomittedexpression-omittedexpression),
[createExpressionWithTypeArguments](#-createexpressionwithtypeargumentsexpression-expression-typearguments-readonly-typenode--undefined-expressionwithtypearguments),
[updateExpressionWithTypeArguments](#-updateexpressionwithtypeargumentsnode-expressionwithtypearguments-expression-expression-typearguments-readonly-typenode--undefined-expressionwithtypearguments),
[createAsExpression](#-createasexpressionexpression-expression-type-typenode-asexpression),
[updateAsExpression](#-updateasexpressionnode-asexpression-expression-expression-type-typenode-asexpression),
[createNonNullExpression](#-createnonnullexpressionexpression-expression-nonnullexpression),
[updateNonNullExpression](#-updatenonnullexpressionnode-nonnullexpression-expression-expression-nonnullexpression),
[createNonNullChain](#-createnonnullchainexpression-expression-nonnullchain),
[updateNonNullChain](#-updatenonnullchainnode-nonnullchain-expression-expression-nonnullchain),
[createMetaProperty](#-createmetapropertykeywordtoken-metapropertykeywordtoken-name-identifier-metaproperty),
[updateMetaProperty](#-updatemetapropertynode-metaproperty-name-identifier-metaproperty),
[createSatisfiesExpression](#-createsatisfiesexpressionexpression-expression-type-typenode-satisfiesexpression),
[updateSatisfiesExpression](#-updatesatisfiesexpressionnode-satisfiesexpression-expression-expression-type-typenode-satisfiesexpression),
[createTemplateSpan](#-createtemplatespanexpression-expression-literal-templatemiddle--templatetail-templatespan),
[updateTemplateSpan](#-updatetemplatespannode-templatespan-expression-expression-literal-templatemiddle--templatetail-templatespan),
[createSemicolonClassElement](#-createsemicolonclasselement-semicolonclasselement),
[createBlock](#-createblockstatements-readonly-statement-multiline-boolean-block),
[updateBlock](#-updateblocknode-block-statements-readonly-statement-block),
[createVariableStatement](#-createvariablestatementmodifiers-readonly-modifierlike--undefined-declarationlist-variabledeclarationlist--readonly-variabledeclaration-variablestatement),
[updateVariableStatement](#-updatevariablestatementnode-variablestatement-modifiers-readonly-modifierlike--undefined-declarationlist-variabledeclarationlist-variablestatement),
[createEmptyStatement](#-createemptystatement-emptystatement),
[createExpressionStatement](#-createexpressionstatementexpression-expression-expressionstatement),
[updateExpressionStatement](#-updateexpressionstatementnode-expressionstatement-expression-expression-expressionstatement),
[createIfStatement](#-createifstatementexpression-expression-thenstatement-statement-elsestatement-statement-ifstatement),
[updateIfStatement](#-updateifstatementnode-ifstatement-expression-expression-thenstatement-statement-elsestatement-statement--undefined-ifstatement),
[createDoStatement](#-createdostatementstatement-statement-expression-expression-dostatement),
[updateDoStatement](#-updatedostatementnode-dostatement-statement-statement-expression-expression-dostatement),
[createWhileStatement](#-createwhilestatementexpression-expression-statement-statement-whilestatement),
[updateWhileStatement](#-updatewhilestatementnode-whilestatement-expression-expression-statement-statement-whilestatement),
[createForStatement](#-createforstatementinitializer-forinitializer--undefined-condition-expression--undefined-incrementor-expression--undefined-statement-statement-forstatement),
[updateForStatement](#-updateforstatementnode-forstatement-initializer-forinitializer--undefined-condition-expression--undefined-incrementor-expression--undefined-statement-statement-forstatement),
[createForInStatement](#-createforinstatementinitializer-forinitializer-expression-expression-statement-statement-forinstatement),
[updateForInStatement](#-updateforinstatementnode-forinstatement-initializer-forinitializer-expression-expression-statement-statement-forinstatement),
[createForOfStatement](#-createforofstatementawaitmodifier-awaitkeyword--undefined-initializer-forinitializer-expression-expression-statement-statement-forofstatement),
[updateForOfStatement](#-updateforofstatementnode-forofstatement-awaitmodifier-awaitkeyword--undefined-initializer-forinitializer-expression-expression-statement-statement-forofstatement),
[createContinueStatement](#-createcontinuestatementlabel-string--identifier-continuestatement),
[updateContinueStatement](#-updatecontinuestatementnode-continuestatement-label-identifier--undefined-continuestatement),
[createBreakStatement](#-createbreakstatementlabel-string--identifier-breakstatement),
[updateBreakStatement](#-updatebreakstatementnode-breakstatement-label-identifier--undefined-breakstatement),
[createReturnStatement](#-createreturnstatementexpression-expression-returnstatement),
[updateReturnStatement](#-updatereturnstatementnode-returnstatement-expression-expression--undefined-returnstatement),
[createWithStatement](#-createwithstatementexpression-expression-statement-statement-withstatement),
[updateWithStatement](#-updatewithstatementnode-withstatement-expression-expression-statement-statement-withstatement),
[createSwitchStatement](#-createswitchstatementexpression-expression-caseblock-caseblock-switchstatement),
[updateSwitchStatement](#-updateswitchstatementnode-switchstatement-expression-expression-caseblock-caseblock-switchstatement),
[createLabeledStatement](#-createlabeledstatementlabel-string--identifier-statement-statement-labeledstatement),
[updateLabeledStatement](#-updatelabeledstatementnode-labeledstatement-label-identifier-statement-statement-labeledstatement),
[createThrowStatement](#-createthrowstatementexpression-expression-throwstatement),
[updateThrowStatement](#-updatethrowstatementnode-throwstatement-expression-expression-throwstatement),
[createTryStatement](#-createtrystatementtryblock-block-catchclause-catchclause--undefined-finallyblock-block--undefined-trystatement),
[updateTryStatement](#-updatetrystatementnode-trystatement-tryblock-block-catchclause-catchclause--undefined-finallyblock-block--undefined-trystatement),
[createDebuggerStatement](#-createdebuggerstatement-debuggerstatement),
[createVariableDeclaration](#-createvariabledeclarationname-string--bindingname-exclamationtoken-exclamationtoken-type-typenode-initializer-expression-variabledeclaration),
[updateVariableDeclaration](#-updatevariabledeclarationnode-variabledeclaration-name-bindingname-exclamationtoken-exclamationtoken--undefined-type-typenode--undefined-initializer-expression--undefined-variabledeclaration),
[createVariableDeclarationList](#-createvariabledeclarationlistdeclarations-readonly-variabledeclaration-flags-nodeflags-variabledeclarationlist),
[updateVariableDeclarationList](#-updatevariabledeclarationlistnode-variabledeclarationlist-declarations-readonly-variabledeclaration-variabledeclarationlist),
[createFunctionDeclaration](#-createfunctiondeclarationmodifiers-readonly-modifierlike--undefined-asterisktoken-asterisktoken--undefined-name-string--identifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-body-block--undefined-functiondeclaration),
[updateFunctionDeclaration](#-updatefunctiondeclarationnode-functiondeclaration-modifiers-readonly-modifierlike--undefined-asterisktoken-asterisktoken--undefined-name-identifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-parameters-readonly-parameterdeclaration-type-typenode--undefined-body-block--undefined-functiondeclaration),
[createClassDeclaration](#-createclassdeclarationmodifiers-readonly-modifierlike--undefined-name-string--identifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-heritageclauses-readonly-heritageclause--undefined-members-readonly-classelement-classdeclaration),
[updateClassDeclaration](#-updateclassdeclarationnode-classdeclaration-modifiers-readonly-modifierlike--undefined-name-identifier--undefined-typeparameters-readonly-typeparameterdeclaration--undefined-heritageclauses-readonly-heritageclause--undefined-members-readonly-classelement-classdeclaration),
[createInterfaceDeclaration](#-createinterfacedeclarationmodifiers-readonly-modifierlike--undefined-name-string--identifier-typeparameters-readonly-typeparameterdeclaration--undefined-heritageclauses-readonly-heritageclause--undefined-members-readonly-typeelement-interfacedeclaration),
[updateInterfaceDeclaration](#-updateinterfacedeclarationnode-interfacedeclaration-modifiers-readonly-modifierlike--undefined-name-identifier-typeparameters-readonly-typeparameterdeclaration--undefined-heritageclauses-readonly-heritageclause--undefined-members-readonly-typeelement-interfacedeclaration),
[createTypeAliasDeclaration](#-createtypealiasdeclarationmodifiers-readonly-modifierlike--undefined-name-string--identifier-typeparameters-readonly-typeparameterdeclaration--undefined-type-typenode-typealiasdeclaration),
[updateTypeAliasDeclaration](#-updatetypealiasdeclarationnode-typealiasdeclaration-modifiers-readonly-modifierlike--undefined-name-identifier-typeparameters-readonly-typeparameterdeclaration--undefined-type-typenode-typealiasdeclaration),
[createEnumDeclaration](#-createenumdeclarationmodifiers-readonly-modifierlike--undefined-name-string--identifier-members-readonly-enummember-enumdeclaration),
[updateEnumDeclaration](#-updateenumdeclarationnode-enumdeclaration-modifiers-readonly-modifierlike--undefined-name-identifier-members-readonly-enummember-enumdeclaration),
[createModuleDeclaration](#-createmoduledeclarationmodifiers-readonly-modifierlike--undefined-name-modulename-body-modulebody--undefined-flags-nodeflags-moduledeclaration),
[updateModuleDeclaration](#-updatemoduledeclarationnode-moduledeclaration-modifiers-readonly-modifierlike--undefined-name-modulename-body-modulebody--undefined-moduledeclaration),
[createModuleBlock](#-createmoduleblockstatements-readonly-statement-moduleblock),
[updateModuleBlock](#-updatemoduleblocknode-moduleblock-statements-readonly-statement-moduleblock),
[createCaseBlock](#-createcaseblockclauses-readonly-caseordefaultclause-caseblock),
[updateCaseBlock](#-updatecaseblocknode-caseblock-clauses-readonly-caseordefaultclause-caseblock),
[createNamespaceExportDeclaration](#-createnamespaceexportdeclarationname-string--identifier-namespaceexportdeclaration),
[updateNamespaceExportDeclaration](#-updatenamespaceexportdeclarationnode-namespaceexportdeclaration-name-identifier-namespaceexportdeclaration),
[createImportEqualsDeclaration](#-createimportequalsdeclarationmodifiers-readonly-modifierlike--undefined-istypeonly-boolean-name-string--identifier-modulereference-modulereference-importequalsdeclaration),
[updateImportEqualsDeclaration](#-updateimportequalsdeclarationnode-importequalsdeclaration-modifiers-readonly-modifierlike--undefined-istypeonly-boolean-name-identifier-modulereference-modulereference-importequalsdeclaration),
[createImportDeclaration](#-createimportdeclarationmodifiers-readonly-modifierlike--undefined-importclause-importclause--undefined-modulespecifier-expression-attributes-importattributes-importdeclaration),
[updateImportDeclaration](#-updateimportdeclarationnode-importdeclaration-modifiers-readonly-modifierlike--undefined-importclause-importclause--undefined-modulespecifier-expression-attributes-importattributes--undefined-importdeclaration),
[createImportClause](#-createimportclauseistypeonly-boolean-name-identifier--undefined-namedbindings-namedimportbindings--undefined-importclause),
[updateImportClause](#-updateimportclausenode-importclause-istypeonly-boolean-name-identifier--undefined-namedbindings-namedimportbindings--undefined-importclause),
[createImportAttributes](#-createimportattributeselements-nodearrayimportattribute-multiline-boolean-importattributes),
[updateImportAttributes](#-updateimportattributesnode-importattributes-elements-nodearrayimportattribute-multiline-boolean-importattributes),
[createImportAttribute](#-createimportattributename-importattributename-value-expression-importattribute),
[updateImportAttribute](#-updateimportattributenode-importattribute-name-importattributename-value-expression-importattribute),
[createNamespaceImport](#-createnamespaceimportname-identifier-namespaceimport),
[updateNamespaceImport](#-updatenamespaceimportnode-namespaceimport-name-identifier-namespaceimport),
[createNamespaceExport](#-createnamespaceexportname-moduleexportname-namespaceexport),
[updateNamespaceExport](#-updatenamespaceexportnode-namespaceexport-name-moduleexportname-namespaceexport),
[createNamedImports](#-createnamedimportselements-readonly-importspecifier-namedimports),
[updateNamedImports](#-updatenamedimportsnode-namedimports-elements-readonly-importspecifier-namedimports),
[createImportSpecifier](#-createimportspecifieristypeonly-boolean-propertyname-moduleexportname--undefined-name-identifier-importspecifier),
[updateImportSpecifier](#-updateimportspecifiernode-importspecifier-istypeonly-boolean-propertyname-moduleexportname--undefined-name-identifier-importspecifier),
[createExportAssignment](#-createexportassignmentmodifiers-readonly-modifierlike--undefined-isexportequals-boolean--undefined-expression-expression-exportassignment),
[updateExportAssignment](#-updateexportassignmentnode-exportassignment-modifiers-readonly-modifierlike--undefined-expression-expression-exportassignment),
[createExportDeclaration](#-createexportdeclarationmodifiers-readonly-modifierlike--undefined-istypeonly-boolean-exportclause-namedexportbindings--undefined-modulespecifier-expression-attributes-importattributes-exportdeclaration),
[updateExportDeclaration](#-updateexportdeclarationnode-exportdeclaration-modifiers-readonly-modifierlike--undefined-istypeonly-boolean-exportclause-namedexportbindings--undefined-modulespecifier-expression--undefined-attributes-importattributes--undefined-exportdeclaration),
[createNamedExports](#-createnamedexportselements-readonly-exportspecifier-namedexports),
[updateNamedExports](#-updatenamedexportsnode-namedexports-elements-readonly-exportspecifier-namedexports),
[createExportSpecifier](#-createexportspecifieristypeonly-boolean-propertyname-string--moduleexportname--undefined-name-string--moduleexportname-exportspecifier),
[updateExportSpecifier](#-updateexportspecifiernode-exportspecifier-istypeonly-boolean-propertyname-moduleexportname--undefined-name-moduleexportname-exportspecifier),
[createExternalModuleReference](#-createexternalmodulereferenceexpression-expression-externalmodulereference),
[updateExternalModuleReference](#-updateexternalmodulereferencenode-externalmodulereference-expression-expression-externalmodulereference),
[createJSDocAllType](#-createjsdocalltype-jsdocalltype),
[createJSDocUnknownType](#-createjsdocunknowntype-jsdocunknowntype),
[createJSDocNonNullableType](#-createjsdocnonnullabletypetype-typenode-postfix-boolean-jsdocnonnullabletype),
[updateJSDocNonNullableType](#-updatejsdocnonnullabletypenode-jsdocnonnullabletype-type-typenode-jsdocnonnullabletype),
[createJSDocNullableType](#-createjsdocnullabletypetype-typenode-postfix-boolean-jsdocnullabletype),
[updateJSDocNullableType](#-updatejsdocnullabletypenode-jsdocnullabletype-type-typenode-jsdocnullabletype),
[createJSDocOptionalType](#-createjsdocoptionaltypetype-typenode-jsdocoptionaltype),
[updateJSDocOptionalType](#-updatejsdocoptionaltypenode-jsdocoptionaltype-type-typenode-jsdocoptionaltype),
[createJSDocFunctionType](#-createjsdocfunctiontypeparameters-readonly-parameterdeclaration-type-typenode--undefined-jsdocfunctiontype),
[updateJSDocFunctionType](#-updatejsdocfunctiontypenode-jsdocfunctiontype-parameters-readonly-parameterdeclaration-type-typenode--undefined-jsdocfunctiontype),
[createJSDocVariadicType](#-createjsdocvariadictypetype-typenode-jsdocvariadictype),
[updateJSDocVariadicType](#-updatejsdocvariadictypenode-jsdocvariadictype-type-typenode-jsdocvariadictype),
[createJSDocNamepathType](#-createjsdocnamepathtypetype-typenode-jsdocnamepathtype),
[updateJSDocNamepathType](#-updatejsdocnamepathtypenode-jsdocnamepathtype-type-typenode-jsdocnamepathtype),
[createJSDocTypeExpression](#-createjsdoctypeexpressiontype-typenode-jsdoctypeexpression),
[updateJSDocTypeExpression](#-updatejsdoctypeexpressionnode-jsdoctypeexpression-type-typenode-jsdoctypeexpression),
[createJSDocNameReference](#-createjsdocnamereferencename-entityname--jsdocmembername-jsdocnamereference),
[updateJSDocNameReference](#-updatejsdocnamereferencenode-jsdocnamereference-name-entityname--jsdocmembername-jsdocnamereference),
[createJSDocMemberName](#-createjsdocmembernameleft-entityname--jsdocmembername-right-identifier-jsdocmembername),
[updateJSDocMemberName](#-updatejsdocmembernamenode-jsdocmembername-left-entityname--jsdocmembername-right-identifier-jsdocmembername),
[createJSDocLink](#-createjsdoclinkname-entityname--jsdocmembername--undefined-text-string-jsdoclink),
[updateJSDocLink](#-updatejsdoclinknode-jsdoclink-name-entityname--jsdocmembername--undefined-text-string-jsdoclink),
[createJSDocLinkCode](#-createjsdoclinkcodename-entityname--jsdocmembername--undefined-text-string-jsdoclinkcode),
[updateJSDocLinkCode](#-updatejsdoclinkcodenode-jsdoclinkcode-name-entityname--jsdocmembername--undefined-text-string-jsdoclinkcode),
[createJSDocLinkPlain](#-createjsdoclinkplainname-entityname--jsdocmembername--undefined-text-string-jsdoclinkplain),
[updateJSDocLinkPlain](#-updatejsdoclinkplainnode-jsdoclinkplain-name-entityname--jsdocmembername--undefined-text-string-jsdoclinkplain),
[createJSDocTypeLiteral](#-createjsdoctypeliteraljsdocpropertytags-readonly-jsdocpropertyliketag-isarraytype-boolean-jsdoctypeliteral),
[updateJSDocTypeLiteral](#-updatejsdoctypeliteralnode-jsdoctypeliteral-jsdocpropertytags-readonly-jsdocpropertyliketag--undefined-isarraytype-boolean--undefined-jsdoctypeliteral),
[createJSDocSignature](#-createjsdocsignaturetypeparameters-readonly-jsdoctemplatetag--undefined-parameters-readonly-jsdocparametertag-type-jsdocreturntag-jsdocsignature),
[updateJSDocSignature](#-updatejsdocsignaturenode-jsdocsignature-typeparameters-readonly-jsdoctemplatetag--undefined-parameters-readonly-jsdocparametertag-type-jsdocreturntag--undefined-jsdocsignature),
[createJSDocTemplateTag](#-createjsdoctemplatetagtagname-identifier--undefined-constraint-jsdoctypeexpression--undefined-typeparameters-readonly-typeparameterdeclaration-comment-string--nodearrayjsdoccomment-jsdoctemplatetag),
[updateJSDocTemplateTag](#-updatejsdoctemplatetagnode-jsdoctemplatetag-tagname-identifier--undefined-constraint-jsdoctypeexpression--undefined-typeparameters-readonly-typeparameterdeclaration-comment-string--nodearrayjsdoccomment--undefined-jsdoctemplatetag),
[createJSDocTypedefTag](#-createjsdoctypedeftagtagname-identifier--undefined-typeexpression-jsdoctypeexpression--jsdoctypeliteral-fullname-identifier--jsdocnamespacedeclaration-comment-string--nodearrayjsdoccomment-jsdoctypedeftag),
[updateJSDocTypedefTag](#-updatejsdoctypedeftagnode-jsdoctypedeftag-tagname-identifier--undefined-typeexpression-jsdoctypeexpression--jsdoctypeliteral--undefined-fullname-identifier--jsdocnamespacedeclaration--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdoctypedeftag),
[createJSDocParameterTag](#-createjsdocparametertagtagname-identifier--undefined-name-entityname-isbracketed-boolean-typeexpression-jsdoctypeexpression-isnamefirst-boolean-comment-string--nodearrayjsdoccomment-jsdocparametertag),
[updateJSDocParameterTag](#-updatejsdocparametertagnode-jsdocparametertag-tagname-identifier--undefined-name-entityname-isbracketed-boolean-typeexpression-jsdoctypeexpression--undefined-isnamefirst-boolean-comment-string--nodearrayjsdoccomment--undefined-jsdocparametertag),
[createJSDocPropertyTag](#-createjsdocpropertytagtagname-identifier--undefined-name-entityname-isbracketed-boolean-typeexpression-jsdoctypeexpression-isnamefirst-boolean-comment-string--nodearrayjsdoccomment-jsdocpropertytag),
[updateJSDocPropertyTag](#-updatejsdocpropertytagnode-jsdocpropertytag-tagname-identifier--undefined-name-entityname-isbracketed-boolean-typeexpression-jsdoctypeexpression--undefined-isnamefirst-boolean-comment-string--nodearrayjsdoccomment--undefined-jsdocpropertytag),
[createJSDocTypeTag](#-createjsdoctypetagtagname-identifier--undefined-typeexpression-jsdoctypeexpression-comment-string--nodearrayjsdoccomment-jsdoctypetag),
[updateJSDocTypeTag](#-updatejsdoctypetagnode-jsdoctypetag-tagname-identifier--undefined-typeexpression-jsdoctypeexpression-comment-string--nodearrayjsdoccomment--undefined-jsdoctypetag),
[createJSDocSeeTag](#-createjsdocseetagtagname-identifier--undefined-nameexpression-jsdocnamereference--undefined-comment-string--nodearrayjsdoccomment-jsdocseetag),
[updateJSDocSeeTag](#-updatejsdocseetagnode-jsdocseetag-tagname-identifier--undefined-nameexpression-jsdocnamereference--undefined-comment-string--nodearrayjsdoccomment-jsdocseetag),
[createJSDocReturnTag](#-createjsdocreturntagtagname-identifier--undefined-typeexpression-jsdoctypeexpression-comment-string--nodearrayjsdoccomment-jsdocreturntag),
[updateJSDocReturnTag](#-updatejsdocreturntagnode-jsdocreturntag-tagname-identifier--undefined-typeexpression-jsdoctypeexpression--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocreturntag),
[createJSDocThisTag](#-createjsdocthistagtagname-identifier--undefined-typeexpression-jsdoctypeexpression-comment-string--nodearrayjsdoccomment-jsdocthistag),
[updateJSDocThisTag](#-updatejsdocthistagnode-jsdocthistag-tagname-identifier--undefined-typeexpression-jsdoctypeexpression--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocthistag),
[createJSDocEnumTag](#-createjsdocenumtagtagname-identifier--undefined-typeexpression-jsdoctypeexpression-comment-string--nodearrayjsdoccomment-jsdocenumtag),
[updateJSDocEnumTag](#-updatejsdocenumtagnode-jsdocenumtag-tagname-identifier--undefined-typeexpression-jsdoctypeexpression-comment-string--nodearrayjsdoccomment--undefined-jsdocenumtag),
[createJSDocCallbackTag](#-createjsdoccallbacktagtagname-identifier--undefined-typeexpression-jsdocsignature-fullname-identifier--jsdocnamespacedeclaration-comment-string--nodearrayjsdoccomment-jsdoccallbacktag),
[updateJSDocCallbackTag](#-updatejsdoccallbacktagnode-jsdoccallbacktag-tagname-identifier--undefined-typeexpression-jsdocsignature-fullname-identifier--jsdocnamespacedeclaration--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdoccallbacktag),
[createJSDocOverloadTag](#-createjsdocoverloadtagtagname-identifier--undefined-typeexpression-jsdocsignature-comment-string--nodearrayjsdoccomment-jsdocoverloadtag),
[updateJSDocOverloadTag](#-updatejsdocoverloadtagnode-jsdocoverloadtag-tagname-identifier--undefined-typeexpression-jsdocsignature-comment-string--nodearrayjsdoccomment--undefined-jsdocoverloadtag),
[createJSDocAugmentsTag](#-createjsdocaugmentstagtagname-identifier--undefined-classname-jsdocaugmentstagclass-comment-string--nodearrayjsdoccomment-jsdocaugmentstag),
[updateJSDocAugmentsTag](#-updatejsdocaugmentstagnode-jsdocaugmentstag-tagname-identifier--undefined-classname-jsdocaugmentstagclass-comment-string--nodearrayjsdoccomment--undefined-jsdocaugmentstag),
[createJSDocImplementsTag](#-createjsdocimplementstagtagname-identifier--undefined-classname-jsdocimplementstagclass-comment-string--nodearrayjsdoccomment-jsdocimplementstag),
[updateJSDocImplementsTag](#-updatejsdocimplementstagnode-jsdocimplementstag-tagname-identifier--undefined-classname-jsdocimplementstagclass-comment-string--nodearrayjsdoccomment--undefined-jsdocimplementstag),
[createJSDocAuthorTag](#-createjsdocauthortagtagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocauthortag),
[updateJSDocAuthorTag](#-updatejsdocauthortagnode-jsdocauthortag-tagname-identifier--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocauthortag),
[createJSDocClassTag](#-createjsdocclasstagtagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocclasstag),
[updateJSDocClassTag](#-updatejsdocclasstagnode-jsdocclasstag-tagname-identifier--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocclasstag),
[createJSDocPublicTag](#-createjsdocpublictagtagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocpublictag),
[updateJSDocPublicTag](#-updatejsdocpublictagnode-jsdocpublictag-tagname-identifier--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocpublictag),
[createJSDocPrivateTag](#-createjsdocprivatetagtagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocprivatetag),
[updateJSDocPrivateTag](#-updatejsdocprivatetagnode-jsdocprivatetag-tagname-identifier--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocprivatetag),
[createJSDocProtectedTag](#-createjsdocprotectedtagtagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocprotectedtag),
[updateJSDocProtectedTag](#-updatejsdocprotectedtagnode-jsdocprotectedtag-tagname-identifier--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocprotectedtag),
[createJSDocReadonlyTag](#-createjsdocreadonlytagtagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocreadonlytag),
[updateJSDocReadonlyTag](#-updatejsdocreadonlytagnode-jsdocreadonlytag-tagname-identifier--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocreadonlytag),
[createJSDocUnknownTag](#-createjsdocunknowntagtagname-identifier-comment-string--nodearrayjsdoccomment-jsdocunknowntag),
[updateJSDocUnknownTag](#-updatejsdocunknowntagnode-jsdocunknowntag-tagname-identifier-comment-string--nodearrayjsdoccomment--undefined-jsdocunknowntag),
[createJSDocDeprecatedTag](#-createjsdocdeprecatedtagtagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocdeprecatedtag),
[updateJSDocDeprecatedTag](#-updatejsdocdeprecatedtagnode-jsdocdeprecatedtag-tagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocdeprecatedtag),
[createJSDocOverrideTag](#-createjsdocoverridetagtagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocoverridetag),
[updateJSDocOverrideTag](#-updatejsdocoverridetagnode-jsdocoverridetag-tagname-identifier--undefined-comment-string--nodearrayjsdoccomment-jsdocoverridetag),
[createJSDocThrowsTag](#-createjsdocthrowstagtagname-identifier-typeexpression-jsdoctypeexpression--undefined-comment-string--nodearrayjsdoccomment-jsdocthrowstag),
[updateJSDocThrowsTag](#-updatejsdocthrowstagnode-jsdocthrowstag-tagname-identifier--undefined-typeexpression-jsdoctypeexpression--undefined-comment-string--nodearrayjsdoccomment-jsdocthrowstag),
[createJSDocSatisfiesTag](#-createjsdocsatisfiestagtagname-identifier--undefined-typeexpression-jsdoctypeexpression-comment-string--nodearrayjsdoccomment-jsdocsatisfiestag),
[updateJSDocSatisfiesTag](#-updatejsdocsatisfiestagnode-jsdocsatisfiestag-tagname-identifier--undefined-typeexpression-jsdoctypeexpression-comment-string--nodearrayjsdoccomment--undefined-jsdocsatisfiestag),
[createJSDocImportTag](#-createjsdocimporttagtagname-identifier--undefined-importclause-importclause--undefined-modulespecifier-expression-attributes-importattributes-comment-string--nodearrayjsdoccomment-jsdocimporttag),
[updateJSDocImportTag](#-updatejsdocimporttagnode-jsdocimporttag-tagname-identifier--undefined-importclause-importclause--undefined-modulespecifier-expression-attributes-importattributes--undefined-comment-string--nodearrayjsdoccomment--undefined-jsdocimporttag),
[createJSDocText](#-createjsdoctexttext-string-jsdoctext),
[updateJSDocText](#-updatejsdoctextnode-jsdoctext-text-string-jsdoctext),
[createJSDocComment](#-createjsdoccommentcomment-string--nodearrayjsdoccomment-tags-readonly-jsdoctag-jsdoc),
[updateJSDocComment](#-updatejsdoccommentnode-jsdoc-comment-string--nodearrayjsdoccomment--undefined-tags-readonly-jsdoctag--undefined-jsdoc),
[createJsxElement](#-createjsxelementopeningelement-jsxopeningelement-children-readonly-jsxchild-closingelement-jsxclosingelement-jsxelement),
[updateJsxElement](#-updatejsxelementnode-jsxelement-openingelement-jsxopeningelement-children-readonly-jsxchild-closingelement-jsxclosingelement-jsxelement),
[createJsxSelfClosingElement](#-createjsxselfclosingelementtagname-jsxtagnameexpression-typearguments-readonly-typenode--undefined-attributes-jsxattributes-jsxselfclosingelement),
[updateJsxSelfClosingElement](#-updatejsxselfclosingelementnode-jsxselfclosingelement-tagname-jsxtagnameexpression-typearguments-readonly-typenode--undefined-attributes-jsxattributes-jsxselfclosingelement),
[createJsxOpeningElement](#-createjsxopeningelementtagname-jsxtagnameexpression-typearguments-readonly-typenode--undefined-attributes-jsxattributes-jsxopeningelement),
[updateJsxOpeningElement](#-updatejsxopeningelementnode-jsxopeningelement-tagname-jsxtagnameexpression-typearguments-readonly-typenode--undefined-attributes-jsxattributes-jsxopeningelement),
[createJsxClosingElement](#-createjsxclosingelementtagname-jsxtagnameexpression-jsxclosingelement),
[updateJsxClosingElement](#-updatejsxclosingelementnode-jsxclosingelement-tagname-jsxtagnameexpression-jsxclosingelement),
[createJsxFragment](#-createjsxfragmentopeningfragment-jsxopeningfragment-children-readonly-jsxchild-closingfragment-jsxclosingfragment-jsxfragment),
[createJsxText](#-createjsxtexttext-string-containsonlytriviawhitespaces-boolean-jsxtext),
[updateJsxText](#-updatejsxtextnode-jsxtext-text-string-containsonlytriviawhitespaces-boolean-jsxtext),
[createJsxOpeningFragment](#-createjsxopeningfragment-jsxopeningfragment),
[createJsxJsxClosingFragment](#-createjsxjsxclosingfragment-jsxclosingfragment),
[updateJsxFragment](#-updatejsxfragmentnode-jsxfragment-openingfragment-jsxopeningfragment-children-readonly-jsxchild-closingfragment-jsxclosingfragment-jsxfragment),
[createJsxAttribute](#-createjsxattributename-jsxattributename-initializer-jsxattributevalue--undefined-jsxattribute),
[updateJsxAttribute](#-updatejsxattributenode-jsxattribute-name-jsxattributename-initializer-jsxattributevalue--undefined-jsxattribute),
[createJsxAttributes](#-createjsxattributesproperties-readonly-jsxattributelike-jsxattributes),
[updateJsxAttributes](#-updatejsxattributesnode-jsxattributes-properties-readonly-jsxattributelike-jsxattributes),
[createJsxSpreadAttribute](#-createjsxspreadattributeexpression-expression-jsxspreadattribute),
[updateJsxSpreadAttribute](#-updatejsxspreadattributenode-jsxspreadattribute-expression-expression-jsxspreadattribute),
[createJsxExpression](#-createjsxexpressiondotdotdottoken-dotdotdottoken--undefined-expression-expression--undefined-jsxexpression),
[updateJsxExpression](#-updatejsxexpressionnode-jsxexpression-expression-expression--undefined-jsxexpression),
[createJsxNamespacedName](#-createjsxnamespacednamenamespace-identifier-name-identifier-jsxnamespacedname),
[updateJsxNamespacedName](#-updatejsxnamespacednamenode-jsxnamespacedname-namespace-identifier-name-identifier-jsxnamespacedname),
[createCaseClause](#-createcaseclauseexpression-expression-statements-readonly-statement-caseclause),
[updateCaseClause](#-updatecaseclausenode-caseclause-expression-expression-statements-readonly-statement-caseclause),
[createDefaultClause](#-createdefaultclausestatements-readonly-statement-defaultclause),
[updateDefaultClause](#-updatedefaultclausenode-defaultclause-statements-readonly-statement-defaultclause),
[createHeritageClause](#-createheritageclausetoken-heritageclausetoken-types-readonly-expressionwithtypearguments-heritageclause),
[updateHeritageClause](#-updateheritageclausenode-heritageclause-types-readonly-expressionwithtypearguments-heritageclause),
[createCatchClause](#-createcatchclausevariabledeclaration-string--bindingname--variabledeclaration--undefined-block-block-catchclause),
[updateCatchClause](#-updatecatchclausenode-catchclause-variabledeclaration-variabledeclaration--undefined-block-block-catchclause),
[createPropertyAssignment](#-createpropertyassignmentname-string--propertyname-initializer-expression-propertyassignment),
[updatePropertyAssignment](#-updatepropertyassignmentnode-propertyassignment-name-propertyname-initializer-expression-propertyassignment),
[createShorthandPropertyAssignment](#-createshorthandpropertyassignmentname-string--identifier-objectassignmentinitializer-expression-shorthandpropertyassignment),
[updateShorthandPropertyAssignment](#-updateshorthandpropertyassignmentnode-shorthandpropertyassignment-name-identifier-objectassignmentinitializer-expression--undefined-shorthandpropertyassignment),
[createSpreadAssignment](#-createspreadassignmentexpression-expression-spreadassignment),
[updateSpreadAssignment](#-updatespreadassignmentnode-spreadassignment-expression-expression-spreadassignment),
[createEnumMember](#-createenummembername-string--propertyname-initializer-expression-enummember),
[updateEnumMember](#-updateenummembernode-enummember-name-propertyname-initializer-expression--undefined-enummember),
[createSourceFile](#-createsourcefilestatements-readonly-statement-endoffiletoken-endoffiletoken-flags-nodeflags-sourcefile),
[updateSourceFile](#-updatesourcefilenode-sourcefile-statements-readonly-statement-isdeclarationfile-boolean-referencedfiles-readonly-filereference-typereferences-readonly-filereference-hasnodefaultlib-boolean-libreferences-readonly-filereference-sourcefile),
[createNotEmittedStatement](#-createnotemittedstatementoriginal-node-notemittedstatement),
[createPartiallyEmittedExpression](#-createpartiallyemittedexpressionexpression-expression-original-node-partiallyemittedexpression),
[updatePartiallyEmittedExpression](#-updatepartiallyemittedexpressionnode-partiallyemittedexpression-expression-expression-partiallyemittedexpression),
[createCommaListExpression](#-createcommalistexpressionelements-readonly-expression-commalistexpression),
[updateCommaListExpression](#-updatecommalistexpressionnode-commalistexpression-elements-readonly-expression-commalistexpression),
[createBundle](#-createbundlesourcefiles-readonly-sourcefile-bundle),
[updateBundle](#-updatebundlenode-bundle-sourcefiles-readonly-sourcefile-bundle),
[createComma](#-createcommaleft-expression-right-expression-binaryexpression),
[createAssignment](#-createassignmentleft-objectliteralexpression--arrayliteralexpression-right-expression-destructuringassignment),
[createAssignment](#-createassignmentleft-expression-right-expression-assignmentexpressionequalstokensyntaxkindequalstoken),
[createLogicalOr](#-createlogicalorleft-expression-right-expression-binaryexpression),
[createLogicalAnd](#-createlogicalandleft-expression-right-expression-binaryexpression),
[createBitwiseOr](#-createbitwiseorleft-expression-right-expression-binaryexpression),
[createBitwiseXor](#-createbitwisexorleft-expression-right-expression-binaryexpression),
[createBitwiseAnd](#-createbitwiseandleft-expression-right-expression-binaryexpression),
[createStrictEquality](#-createstrictequalityleft-expression-right-expression-binaryexpression),
[createStrictInequality](#-createstrictinequalityleft-expression-right-expression-binaryexpression),
[createEquality](#-createequalityleft-expression-right-expression-binaryexpression),
[createInequality](#-createinequalityleft-expression-right-expression-binaryexpression),
[createLessThan](#-createlessthanleft-expression-right-expression-binaryexpression),
[createLessThanEquals](#-createlessthanequalsleft-expression-right-expression-binaryexpression),
[createGreaterThan](#-creategreaterthanleft-expression-right-expression-binaryexpression),
[createGreaterThanEquals](#-creategreaterthanequalsleft-expression-right-expression-binaryexpression),
[createLeftShift](#-createleftshiftleft-expression-right-expression-binaryexpression),
[createRightShift](#-createrightshiftleft-expression-right-expression-binaryexpression),
[createUnsignedRightShift](#-createunsignedrightshiftleft-expression-right-expression-binaryexpression),
[createAdd](#-createaddleft-expression-right-expression-binaryexpression),
[createSubtract](#-createsubtractleft-expression-right-expression-binaryexpression),
[createMultiply](#-createmultiplyleft-expression-right-expression-binaryexpression),
[createDivide](#-createdivideleft-expression-right-expression-binaryexpression),
[createModulo](#-createmoduloleft-expression-right-expression-binaryexpression),
[createExponent](#-createexponentleft-expression-right-expression-binaryexpression),
[createPrefixPlus](#-createprefixplusoperand-expression-prefixunaryexpression),
[createPrefixMinus](#-createprefixminusoperand-expression-prefixunaryexpression),
[createPrefixIncrement](#-createprefixincrementoperand-expression-prefixunaryexpression),
[createPrefixDecrement](#-createprefixdecrementoperand-expression-prefixunaryexpression),
[createBitwiseNot](#-createbitwisenotoperand-expression-prefixunaryexpression),
[createLogicalNot](#-createlogicalnotoperand-expression-prefixunaryexpression),
[createPostfixIncrement](#-createpostfixincrementoperand-expression-postfixunaryexpression),
[createPostfixDecrement](#-createpostfixdecrementoperand-expression-postfixunaryexpression),
[createImmediatelyInvokedFunctionExpression](#-createimmediatelyinvokedfunctionexpressionstatements-readonly-statement-callexpression),
[createImmediatelyInvokedFunctionExpression](#-createimmediatelyinvokedfunctionexpressionstatements-readonly-statement-param-parameterdeclaration-paramvalue-expression-callexpression),
[createImmediatelyInvokedArrowFunction](#-createimmediatelyinvokedarrowfunctionstatements-readonly-statement-immediatelyinvokedarrowfunction),
[createImmediatelyInvokedArrowFunction](#-createimmediatelyinvokedarrowfunctionstatements-readonly-statement-param-parameterdeclaration-paramvalue-expression-immediatelyinvokedarrowfunction),
[createVoidZero](#-createvoidzero-voidexpression),
[createExportDefault](#-createexportdefaultexpression-expression-exportassignment),
[createExternalModuleExport](#-createexternalmoduleexportexportname-identifier-exportdeclaration),
[restoreOuterExpressions](#-restoreouterexpressionsouterexpression-expression--undefined-innerexpression-expression-kinds-outerexpressionkinds-expression),
[replaceModifiers](#-replacemodifierst-extends-hasmodifiersnode-t-modifiers-readonly-modifier--modifierflags--undefined-t),
[replaceDecoratorsAndModifiers](#-replacedecoratorsandmodifierst-extends-hasmodifiers--hasdecoratorsnode-t-modifiers-readonly-modifierlike--undefined-t),
[replacePropertyName](#-replacepropertynamet-extends-accessordeclaration--methoddeclaration--methodsignature--propertydeclaration--propertysignature--propertyassignmentnode-t-name-tname-t)
- [6 deprecated symbols](#-deprecated-createassertclauseelements-nodearrayassertentry-multiline-boolean-assertclause)


#### ⚙ createNodeArray\<T `extends` [Node](../interface.Node/README.md)>(elements?: readonly T\[], hasTrailingComma?: `boolean`): [NodeArray](../interface.NodeArray/README.md)\<T>



#### ⚙ createNumericLiteral(value: `string` | `number`, numericLiteralFlags?: [TokenFlags](../enum.TokenFlags/README.md)): [NumericLiteral](../interface.NumericLiteral/README.md)



#### ⚙ createBigIntLiteral(value: `string` | [PseudoBigInt](../interface.PseudoBigInt/README.md)): [BigIntLiteral](../interface.BigIntLiteral/README.md)



#### ⚙ createStringLiteral(text: `string`, isSingleQuote?: `boolean`): [StringLiteral](../interface.StringLiteral/README.md)



#### ⚙ createStringLiteralFromNode(sourceNode: [PropertyNameLiteral](../type.PropertyNameLiteral/README.md) | [PrivateIdentifier](../interface.PrivateIdentifier/README.md), isSingleQuote?: `boolean`): [StringLiteral](../interface.StringLiteral/README.md)



#### ⚙ createRegularExpressionLiteral(text: `string`): [RegularExpressionLiteral](../interface.RegularExpressionLiteral/README.md)



#### ⚙ createIdentifier(text: `string`): [Identifier](../interface.Identifier/README.md)



#### ⚙ createTempVariable(recordTempVariable: ((node: [Identifier](../interface.Identifier/README.md)) => `void`) | `undefined`, reservedInNestedScopes?: `boolean`): [Identifier](../interface.Identifier/README.md)

> Create a unique temporary variable.



#### ⚙ createLoopVariable(reservedInNestedScopes?: `boolean`): [Identifier](../interface.Identifier/README.md)

> Create a unique temporary variable for use in a loop.



#### ⚙ createUniqueName(text: `string`, flags?: [GeneratedIdentifierFlags](../enum.GeneratedIdentifierFlags/README.md)): [Identifier](../interface.Identifier/README.md)

> Create a unique name based on the supplied text.



#### ⚙ getGeneratedNameForNode(node: [Node](../interface.Node/README.md) | `undefined`, flags?: [GeneratedIdentifierFlags](../enum.GeneratedIdentifierFlags/README.md)): [Identifier](../interface.Identifier/README.md)

> Create a unique name generated for a node.



#### ⚙ createPrivateIdentifier(text: `string`): [PrivateIdentifier](../interface.PrivateIdentifier/README.md)



#### ⚙ createUniquePrivateName(text?: `string`): [PrivateIdentifier](../interface.PrivateIdentifier/README.md)



#### ⚙ getGeneratedPrivateNameForNode(node: [Node](../interface.Node/README.md)): [PrivateIdentifier](../interface.PrivateIdentifier/README.md)



#### ⚙ createToken(token: [SyntaxKind.SuperKeyword](../enum.SyntaxKind/README.md#superkeyword--108)): [SuperExpression](../interface.SuperExpression/README.md)



#### ⚙ createToken(token: [SyntaxKind.ThisKeyword](../enum.SyntaxKind/README.md#thiskeyword--110)): [ThisExpression](../interface.ThisExpression/README.md)



#### ⚙ createToken(token: [SyntaxKind.NullKeyword](../enum.SyntaxKind/README.md#nullkeyword--106)): [NullLiteral](../interface.NullLiteral/README.md)



#### ⚙ createToken(token: [SyntaxKind.TrueKeyword](../enum.SyntaxKind/README.md#truekeyword--112)): [TrueLiteral](../interface.TrueLiteral/README.md)



#### ⚙ createToken(token: [SyntaxKind.FalseKeyword](../enum.SyntaxKind/README.md#falsekeyword--97)): [FalseLiteral](../interface.FalseLiteral/README.md)



#### ⚙ createToken(token: [SyntaxKind.EndOfFileToken](../enum.SyntaxKind/README.md#endoffiletoken--1)): EndOfFileToken



#### ⚙ createToken(token: [SyntaxKind.Unknown](../enum.SyntaxKind/README.md#unknown--0)): [Token](../interface.Token/README.md)\<[SyntaxKind.Unknown](../enum.SyntaxKind/README.md#unknown--0)>



#### ⚙ createToken\<TKind `extends` [PunctuationSyntaxKind](../type.PunctuationSyntaxKind/README.md)>(token: TKind): [PunctuationToken](../interface.PunctuationToken/README.md)\<TKind>



#### ⚙ createToken\<TKind `extends` [KeywordTypeSyntaxKind](../type.KeywordTypeSyntaxKind/README.md)>(token: TKind): [KeywordTypeNode](../interface.KeywordTypeNode/README.md)\<TKind>



#### ⚙ createToken\<TKind `extends` [ModifierSyntaxKind](../type.ModifierSyntaxKind/README.md)>(token: TKind): [ModifierToken](../interface.ModifierToken/README.md)\<TKind>



#### ⚙ createToken\<TKind `extends` [KeywordSyntaxKind](../type.KeywordSyntaxKind/README.md)>(token: TKind): [KeywordToken](../interface.KeywordToken/README.md)\<TKind>



#### ⚙ createSuper(): [SuperExpression](../interface.SuperExpression/README.md)



#### ⚙ createThis(): [ThisExpression](../interface.ThisExpression/README.md)



#### ⚙ createNull(): [NullLiteral](../interface.NullLiteral/README.md)



#### ⚙ createTrue(): [TrueLiteral](../interface.TrueLiteral/README.md)



#### ⚙ createFalse(): [FalseLiteral](../interface.FalseLiteral/README.md)



#### ⚙ createModifier\<T `extends` [ModifierSyntaxKind](../type.ModifierSyntaxKind/README.md)>(kind: T): [ModifierToken](../interface.ModifierToken/README.md)\<T>



#### ⚙ createModifiersFromModifierFlags(flags: [ModifierFlags](../enum.ModifierFlags/README.md)): Modifier\[]



#### ⚙ createQualifiedName(left: [EntityName](../type.EntityName/README.md), right: `string` | [Identifier](../interface.Identifier/README.md)): [QualifiedName](../interface.QualifiedName/README.md)



#### ⚙ updateQualifiedName(node: [QualifiedName](../interface.QualifiedName/README.md), left: [EntityName](../type.EntityName/README.md), right: [Identifier](../interface.Identifier/README.md)): [QualifiedName](../interface.QualifiedName/README.md)



#### ⚙ createComputedPropertyName(expression: [Expression](../interface.Expression/README.md)): [ComputedPropertyName](../interface.ComputedPropertyName/README.md)



#### ⚙ updateComputedPropertyName(node: [ComputedPropertyName](../interface.ComputedPropertyName/README.md), expression: [Expression](../interface.Expression/README.md)): [ComputedPropertyName](../interface.ComputedPropertyName/README.md)



#### ⚙ createTypeParameterDeclaration(modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, name: `string` | [Identifier](../interface.Identifier/README.md), constraint?: [TypeNode](../interface.TypeNode/README.md), defaultType?: [TypeNode](../interface.TypeNode/README.md)): [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)



#### ⚙ updateTypeParameterDeclaration(node: [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md), modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, name: [Identifier](../interface.Identifier/README.md), constraint: [TypeNode](../interface.TypeNode/README.md) | `undefined`, defaultType: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)



#### ⚙ createParameterDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, dotDotDotToken: [DotDotDotToken](../type.DotDotDotToken/README.md) | `undefined`, name: `string` | [BindingName](../type.BindingName/README.md), questionToken?: [QuestionToken](../type.QuestionToken/README.md), type?: [TypeNode](../interface.TypeNode/README.md), initializer?: [Expression](../interface.Expression/README.md)): [ParameterDeclaration](../interface.ParameterDeclaration/README.md)



#### ⚙ updateParameterDeclaration(node: [ParameterDeclaration](../interface.ParameterDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, dotDotDotToken: [DotDotDotToken](../type.DotDotDotToken/README.md) | `undefined`, name: `string` | [BindingName](../type.BindingName/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, initializer: [Expression](../interface.Expression/README.md) | `undefined`): [ParameterDeclaration](../interface.ParameterDeclaration/README.md)



#### ⚙ createDecorator(expression: [Expression](../interface.Expression/README.md)): [Decorator](../interface.Decorator/README.md)



#### ⚙ updateDecorator(node: [Decorator](../interface.Decorator/README.md), expression: [Expression](../interface.Expression/README.md)): [Decorator](../interface.Decorator/README.md)



#### ⚙ createPropertySignature(modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, name: [PropertyName](../type.PropertyName/README.md) | `string`, questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [PropertySignature](../interface.PropertySignature/README.md)



#### ⚙ updatePropertySignature(node: [PropertySignature](../interface.PropertySignature/README.md), modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, name: [PropertyName](../type.PropertyName/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [PropertySignature](../interface.PropertySignature/README.md)



#### ⚙ createPropertyDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [PropertyName](../type.PropertyName/README.md), questionOrExclamationToken: [QuestionToken](../type.QuestionToken/README.md) | [ExclamationToken](../type.ExclamationToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, initializer: [Expression](../interface.Expression/README.md) | `undefined`): [PropertyDeclaration](../interface.PropertyDeclaration/README.md)



#### ⚙ updatePropertyDeclaration(node: [PropertyDeclaration](../interface.PropertyDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [PropertyName](../type.PropertyName/README.md), questionOrExclamationToken: [QuestionToken](../type.QuestionToken/README.md) | [ExclamationToken](../type.ExclamationToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, initializer: [Expression](../interface.Expression/README.md) | `undefined`): [PropertyDeclaration](../interface.PropertyDeclaration/README.md)



#### ⚙ createMethodSignature(modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, name: `string` | [PropertyName](../type.PropertyName/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [MethodSignature](../interface.MethodSignature/README.md)



#### ⚙ updateMethodSignature(node: [MethodSignature](../interface.MethodSignature/README.md), modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, name: [PropertyName](../type.PropertyName/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, typeParameters: [NodeArray](../interface.NodeArray/README.md)\<[TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../interface.NodeArray/README.md)\<[ParameterDeclaration](../interface.ParameterDeclaration/README.md)>, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [MethodSignature](../interface.MethodSignature/README.md)



#### ⚙ createMethodDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../type.AsteriskToken/README.md) | `undefined`, name: `string` | [PropertyName](../type.PropertyName/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, body: [Block](../interface.Block/README.md) | `undefined`): [MethodDeclaration](../interface.MethodDeclaration/README.md)



#### ⚙ updateMethodDeclaration(node: [MethodDeclaration](../interface.MethodDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../type.AsteriskToken/README.md) | `undefined`, name: [PropertyName](../type.PropertyName/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, body: [Block](../interface.Block/README.md) | `undefined`): [MethodDeclaration](../interface.MethodDeclaration/README.md)



#### ⚙ createConstructorDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], body: [Block](../interface.Block/README.md) | `undefined`): [ConstructorDeclaration](../interface.ConstructorDeclaration/README.md)



#### ⚙ updateConstructorDeclaration(node: [ConstructorDeclaration](../interface.ConstructorDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], body: [Block](../interface.Block/README.md) | `undefined`): [ConstructorDeclaration](../interface.ConstructorDeclaration/README.md)



#### ⚙ createGetAccessorDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [PropertyName](../type.PropertyName/README.md), parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, body: [Block](../interface.Block/README.md) | `undefined`): [GetAccessorDeclaration](../interface.GetAccessorDeclaration/README.md)



#### ⚙ updateGetAccessorDeclaration(node: [GetAccessorDeclaration](../interface.GetAccessorDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [PropertyName](../type.PropertyName/README.md), parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, body: [Block](../interface.Block/README.md) | `undefined`): [GetAccessorDeclaration](../interface.GetAccessorDeclaration/README.md)



#### ⚙ createSetAccessorDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [PropertyName](../type.PropertyName/README.md), parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], body: [Block](../interface.Block/README.md) | `undefined`): [SetAccessorDeclaration](../interface.SetAccessorDeclaration/README.md)



#### ⚙ updateSetAccessorDeclaration(node: [SetAccessorDeclaration](../interface.SetAccessorDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [PropertyName](../type.PropertyName/README.md), parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], body: [Block](../interface.Block/README.md) | `undefined`): [SetAccessorDeclaration](../interface.SetAccessorDeclaration/README.md)



#### ⚙ createCallSignature(typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [CallSignatureDeclaration](../interface.CallSignatureDeclaration/README.md)



#### ⚙ updateCallSignature(node: [CallSignatureDeclaration](../interface.CallSignatureDeclaration/README.md), typeParameters: [NodeArray](../interface.NodeArray/README.md)\<[TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../interface.NodeArray/README.md)\<[ParameterDeclaration](../interface.ParameterDeclaration/README.md)>, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [CallSignatureDeclaration](../interface.CallSignatureDeclaration/README.md)



#### ⚙ createConstructSignature(typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [ConstructSignatureDeclaration](../interface.ConstructSignatureDeclaration/README.md)



#### ⚙ updateConstructSignature(node: [ConstructSignatureDeclaration](../interface.ConstructSignatureDeclaration/README.md), typeParameters: [NodeArray](../interface.NodeArray/README.md)\<[TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../interface.NodeArray/README.md)\<[ParameterDeclaration](../interface.ParameterDeclaration/README.md)>, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [ConstructSignatureDeclaration](../interface.ConstructSignatureDeclaration/README.md)



#### ⚙ createIndexSignature(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md)): [IndexSignatureDeclaration](../interface.IndexSignatureDeclaration/README.md)



#### ⚙ updateIndexSignature(node: [IndexSignatureDeclaration](../interface.IndexSignatureDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md)): [IndexSignatureDeclaration](../interface.IndexSignatureDeclaration/README.md)



#### ⚙ createTemplateLiteralTypeSpan(type: [TypeNode](../interface.TypeNode/README.md), literal: [TemplateMiddle](../interface.TemplateMiddle/README.md) | [TemplateTail](../interface.TemplateTail/README.md)): [TemplateLiteralTypeSpan](../interface.TemplateLiteralTypeSpan/README.md)



#### ⚙ updateTemplateLiteralTypeSpan(node: [TemplateLiteralTypeSpan](../interface.TemplateLiteralTypeSpan/README.md), type: [TypeNode](../interface.TypeNode/README.md), literal: [TemplateMiddle](../interface.TemplateMiddle/README.md) | [TemplateTail](../interface.TemplateTail/README.md)): [TemplateLiteralTypeSpan](../interface.TemplateLiteralTypeSpan/README.md)



#### ⚙ createClassStaticBlockDeclaration(body: [Block](../interface.Block/README.md)): [ClassStaticBlockDeclaration](../interface.ClassStaticBlockDeclaration/README.md)



#### ⚙ updateClassStaticBlockDeclaration(node: [ClassStaticBlockDeclaration](../interface.ClassStaticBlockDeclaration/README.md), body: [Block](../interface.Block/README.md)): [ClassStaticBlockDeclaration](../interface.ClassStaticBlockDeclaration/README.md)



#### ⚙ createKeywordTypeNode\<TKind `extends` [KeywordTypeSyntaxKind](../type.KeywordTypeSyntaxKind/README.md)>(kind: TKind): [KeywordTypeNode](../interface.KeywordTypeNode/README.md)\<TKind>



#### ⚙ createTypePredicateNode(assertsModifier: [AssertsKeyword](../type.AssertsKeyword/README.md) | `undefined`, parameterName: [Identifier](../interface.Identifier/README.md) | [ThisTypeNode](../interface.ThisTypeNode/README.md) | `string`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [TypePredicateNode](../interface.TypePredicateNode/README.md)



#### ⚙ updateTypePredicateNode(node: [TypePredicateNode](../interface.TypePredicateNode/README.md), assertsModifier: [AssertsKeyword](../type.AssertsKeyword/README.md) | `undefined`, parameterName: [Identifier](../interface.Identifier/README.md) | [ThisTypeNode](../interface.ThisTypeNode/README.md), type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [TypePredicateNode](../interface.TypePredicateNode/README.md)



#### ⚙ createTypeReferenceNode(typeName: `string` | [EntityName](../type.EntityName/README.md), typeArguments?: readonly [TypeNode](../interface.TypeNode/README.md)\[]): [TypeReferenceNode](../interface.TypeReferenceNode/README.md)



#### ⚙ updateTypeReferenceNode(node: [TypeReferenceNode](../interface.TypeReferenceNode/README.md), typeName: [EntityName](../type.EntityName/README.md), typeArguments: [NodeArray](../interface.NodeArray/README.md)\<[TypeNode](../interface.TypeNode/README.md)> | `undefined`): [TypeReferenceNode](../interface.TypeReferenceNode/README.md)



#### ⚙ createFunctionTypeNode(typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md)): [FunctionTypeNode](../interface.FunctionTypeNode/README.md)



#### ⚙ updateFunctionTypeNode(node: [FunctionTypeNode](../interface.FunctionTypeNode/README.md), typeParameters: [NodeArray](../interface.NodeArray/README.md)\<[TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../interface.NodeArray/README.md)\<[ParameterDeclaration](../interface.ParameterDeclaration/README.md)>, type: [TypeNode](../interface.TypeNode/README.md)): [FunctionTypeNode](../interface.FunctionTypeNode/README.md)



#### ⚙ createConstructorTypeNode(modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md)): [ConstructorTypeNode](../interface.ConstructorTypeNode/README.md)



#### ⚙ updateConstructorTypeNode(node: [ConstructorTypeNode](../interface.ConstructorTypeNode/README.md), modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, typeParameters: [NodeArray](../interface.NodeArray/README.md)\<[TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../interface.NodeArray/README.md)\<[ParameterDeclaration](../interface.ParameterDeclaration/README.md)>, type: [TypeNode](../interface.TypeNode/README.md)): [ConstructorTypeNode](../interface.ConstructorTypeNode/README.md)



#### ⚙ createTypeQueryNode(exprName: [EntityName](../type.EntityName/README.md), typeArguments?: readonly [TypeNode](../interface.TypeNode/README.md)\[]): [TypeQueryNode](../interface.TypeQueryNode/README.md)



#### ⚙ updateTypeQueryNode(node: [TypeQueryNode](../interface.TypeQueryNode/README.md), exprName: [EntityName](../type.EntityName/README.md), typeArguments?: readonly [TypeNode](../interface.TypeNode/README.md)\[]): [TypeQueryNode](../interface.TypeQueryNode/README.md)



#### ⚙ createTypeLiteralNode(members: readonly [TypeElement](../interface.TypeElement/README.md)\[] | `undefined`): [TypeLiteralNode](../interface.TypeLiteralNode/README.md)



#### ⚙ updateTypeLiteralNode(node: [TypeLiteralNode](../interface.TypeLiteralNode/README.md), members: [NodeArray](../interface.NodeArray/README.md)\<[TypeElement](../interface.TypeElement/README.md)>): [TypeLiteralNode](../interface.TypeLiteralNode/README.md)



#### ⚙ createArrayTypeNode(elementType: [TypeNode](../interface.TypeNode/README.md)): [ArrayTypeNode](../interface.ArrayTypeNode/README.md)



#### ⚙ updateArrayTypeNode(node: [ArrayTypeNode](../interface.ArrayTypeNode/README.md), elementType: [TypeNode](../interface.TypeNode/README.md)): [ArrayTypeNode](../interface.ArrayTypeNode/README.md)



#### ⚙ createTupleTypeNode(elements: readonly ([TypeNode](../interface.TypeNode/README.md) | [NamedTupleMember](../interface.NamedTupleMember/README.md))\[]): [TupleTypeNode](../interface.TupleTypeNode/README.md)



#### ⚙ updateTupleTypeNode(node: [TupleTypeNode](../interface.TupleTypeNode/README.md), elements: readonly ([TypeNode](../interface.TypeNode/README.md) | [NamedTupleMember](../interface.NamedTupleMember/README.md))\[]): [TupleTypeNode](../interface.TupleTypeNode/README.md)



#### ⚙ createNamedTupleMember(dotDotDotToken: [DotDotDotToken](../type.DotDotDotToken/README.md) | `undefined`, name: [Identifier](../interface.Identifier/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md)): [NamedTupleMember](../interface.NamedTupleMember/README.md)



#### ⚙ updateNamedTupleMember(node: [NamedTupleMember](../interface.NamedTupleMember/README.md), dotDotDotToken: [DotDotDotToken](../type.DotDotDotToken/README.md) | `undefined`, name: [Identifier](../interface.Identifier/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md)): [NamedTupleMember](../interface.NamedTupleMember/README.md)



#### ⚙ createOptionalTypeNode(type: [TypeNode](../interface.TypeNode/README.md)): [OptionalTypeNode](../interface.OptionalTypeNode/README.md)



#### ⚙ updateOptionalTypeNode(node: [OptionalTypeNode](../interface.OptionalTypeNode/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [OptionalTypeNode](../interface.OptionalTypeNode/README.md)



#### ⚙ createRestTypeNode(type: [TypeNode](../interface.TypeNode/README.md)): [RestTypeNode](../interface.RestTypeNode/README.md)



#### ⚙ updateRestTypeNode(node: [RestTypeNode](../interface.RestTypeNode/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [RestTypeNode](../interface.RestTypeNode/README.md)



#### ⚙ createUnionTypeNode(types: readonly [TypeNode](../interface.TypeNode/README.md)\[]): [UnionTypeNode](../interface.UnionTypeNode/README.md)



#### ⚙ updateUnionTypeNode(node: [UnionTypeNode](../interface.UnionTypeNode/README.md), types: [NodeArray](../interface.NodeArray/README.md)\<[TypeNode](../interface.TypeNode/README.md)>): [UnionTypeNode](../interface.UnionTypeNode/README.md)



#### ⚙ createIntersectionTypeNode(types: readonly [TypeNode](../interface.TypeNode/README.md)\[]): [IntersectionTypeNode](../interface.IntersectionTypeNode/README.md)



#### ⚙ updateIntersectionTypeNode(node: [IntersectionTypeNode](../interface.IntersectionTypeNode/README.md), types: [NodeArray](../interface.NodeArray/README.md)\<[TypeNode](../interface.TypeNode/README.md)>): [IntersectionTypeNode](../interface.IntersectionTypeNode/README.md)



#### ⚙ createConditionalTypeNode(checkType: [TypeNode](../interface.TypeNode/README.md), extendsType: [TypeNode](../interface.TypeNode/README.md), trueType: [TypeNode](../interface.TypeNode/README.md), falseType: [TypeNode](../interface.TypeNode/README.md)): [ConditionalTypeNode](../interface.ConditionalTypeNode/README.md)



#### ⚙ updateConditionalTypeNode(node: [ConditionalTypeNode](../interface.ConditionalTypeNode/README.md), checkType: [TypeNode](../interface.TypeNode/README.md), extendsType: [TypeNode](../interface.TypeNode/README.md), trueType: [TypeNode](../interface.TypeNode/README.md), falseType: [TypeNode](../interface.TypeNode/README.md)): [ConditionalTypeNode](../interface.ConditionalTypeNode/README.md)



#### ⚙ createInferTypeNode(typeParameter: [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)): [InferTypeNode](../interface.InferTypeNode/README.md)



#### ⚙ updateInferTypeNode(node: [InferTypeNode](../interface.InferTypeNode/README.md), typeParameter: [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)): [InferTypeNode](../interface.InferTypeNode/README.md)



#### ⚙ createImportTypeNode(argument: [TypeNode](../interface.TypeNode/README.md), attributes?: [ImportAttributes](../interface.ImportAttributes/README.md), qualifier?: [EntityName](../type.EntityName/README.md), typeArguments?: readonly [TypeNode](../interface.TypeNode/README.md)\[], isTypeOf?: `boolean`): [ImportTypeNode](../interface.ImportTypeNode/README.md)



#### ⚙ updateImportTypeNode(node: [ImportTypeNode](../interface.ImportTypeNode/README.md), argument: [TypeNode](../interface.TypeNode/README.md), attributes: [ImportAttributes](../interface.ImportAttributes/README.md) | `undefined`, qualifier: [EntityName](../type.EntityName/README.md) | `undefined`, typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, isTypeOf?: `boolean`): [ImportTypeNode](../interface.ImportTypeNode/README.md)



#### ⚙ createParenthesizedType(type: [TypeNode](../interface.TypeNode/README.md)): [ParenthesizedTypeNode](../interface.ParenthesizedTypeNode/README.md)



#### ⚙ updateParenthesizedType(node: [ParenthesizedTypeNode](../interface.ParenthesizedTypeNode/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [ParenthesizedTypeNode](../interface.ParenthesizedTypeNode/README.md)



#### ⚙ createThisTypeNode(): [ThisTypeNode](../interface.ThisTypeNode/README.md)



#### ⚙ createTypeOperatorNode(operator: [SyntaxKind.KeyOfKeyword](../enum.SyntaxKind/README.md#keyofkeyword--143) | [SyntaxKind.UniqueKeyword](../enum.SyntaxKind/README.md#uniquekeyword--158) | [SyntaxKind.ReadonlyKeyword](../enum.SyntaxKind/README.md#readonlykeyword--148), type: [TypeNode](../interface.TypeNode/README.md)): [TypeOperatorNode](../interface.TypeOperatorNode/README.md)



#### ⚙ updateTypeOperatorNode(node: [TypeOperatorNode](../interface.TypeOperatorNode/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [TypeOperatorNode](../interface.TypeOperatorNode/README.md)



#### ⚙ createIndexedAccessTypeNode(objectType: [TypeNode](../interface.TypeNode/README.md), indexType: [TypeNode](../interface.TypeNode/README.md)): [IndexedAccessTypeNode](../interface.IndexedAccessTypeNode/README.md)



#### ⚙ updateIndexedAccessTypeNode(node: [IndexedAccessTypeNode](../interface.IndexedAccessTypeNode/README.md), objectType: [TypeNode](../interface.TypeNode/README.md), indexType: [TypeNode](../interface.TypeNode/README.md)): [IndexedAccessTypeNode](../interface.IndexedAccessTypeNode/README.md)



#### ⚙ createMappedTypeNode(readonlyToken: [ReadonlyKeyword](../type.ReadonlyKeyword/README.md) | [PlusToken](../type.PlusToken/README.md) | [MinusToken](../type.MinusToken/README.md) | `undefined`, typeParameter: [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md), nameType: [TypeNode](../interface.TypeNode/README.md) | `undefined`, questionToken: [QuestionToken](../type.QuestionToken/README.md) | [PlusToken](../type.PlusToken/README.md) | [MinusToken](../type.MinusToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, members: [NodeArray](../interface.NodeArray/README.md)\<[TypeElement](../interface.TypeElement/README.md)> | `undefined`): [MappedTypeNode](../interface.MappedTypeNode/README.md)



#### ⚙ updateMappedTypeNode(node: [MappedTypeNode](../interface.MappedTypeNode/README.md), readonlyToken: [ReadonlyKeyword](../type.ReadonlyKeyword/README.md) | [PlusToken](../type.PlusToken/README.md) | [MinusToken](../type.MinusToken/README.md) | `undefined`, typeParameter: [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md), nameType: [TypeNode](../interface.TypeNode/README.md) | `undefined`, questionToken: [QuestionToken](../type.QuestionToken/README.md) | [PlusToken](../type.PlusToken/README.md) | [MinusToken](../type.MinusToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, members: [NodeArray](../interface.NodeArray/README.md)\<[TypeElement](../interface.TypeElement/README.md)> | `undefined`): [MappedTypeNode](../interface.MappedTypeNode/README.md)



#### ⚙ createLiteralTypeNode(literal: [LiteralTypeNode](../interface.LiteralTypeNode/README.md)\[<mark>"literal"</mark>]): [LiteralTypeNode](../interface.LiteralTypeNode/README.md)



#### ⚙ updateLiteralTypeNode(node: [LiteralTypeNode](../interface.LiteralTypeNode/README.md), literal: [LiteralTypeNode](../interface.LiteralTypeNode/README.md)\[<mark>"literal"</mark>]): [LiteralTypeNode](../interface.LiteralTypeNode/README.md)



#### ⚙ createTemplateLiteralType(head: [TemplateHead](../interface.TemplateHead/README.md), templateSpans: readonly [TemplateLiteralTypeSpan](../interface.TemplateLiteralTypeSpan/README.md)\[]): [TemplateLiteralTypeNode](../interface.TemplateLiteralTypeNode/README.md)



#### ⚙ updateTemplateLiteralType(node: [TemplateLiteralTypeNode](../interface.TemplateLiteralTypeNode/README.md), head: [TemplateHead](../interface.TemplateHead/README.md), templateSpans: readonly [TemplateLiteralTypeSpan](../interface.TemplateLiteralTypeSpan/README.md)\[]): [TemplateLiteralTypeNode](../interface.TemplateLiteralTypeNode/README.md)



#### ⚙ createObjectBindingPattern(elements: readonly [BindingElement](../interface.BindingElement/README.md)\[]): [ObjectBindingPattern](../interface.ObjectBindingPattern/README.md)



#### ⚙ updateObjectBindingPattern(node: [ObjectBindingPattern](../interface.ObjectBindingPattern/README.md), elements: readonly [BindingElement](../interface.BindingElement/README.md)\[]): [ObjectBindingPattern](../interface.ObjectBindingPattern/README.md)



#### ⚙ createArrayBindingPattern(elements: readonly [ArrayBindingElement](../type.ArrayBindingElement/README.md)\[]): [ArrayBindingPattern](../interface.ArrayBindingPattern/README.md)



#### ⚙ updateArrayBindingPattern(node: [ArrayBindingPattern](../interface.ArrayBindingPattern/README.md), elements: readonly [ArrayBindingElement](../type.ArrayBindingElement/README.md)\[]): [ArrayBindingPattern](../interface.ArrayBindingPattern/README.md)



#### ⚙ createBindingElement(dotDotDotToken: [DotDotDotToken](../type.DotDotDotToken/README.md) | `undefined`, propertyName: `string` | [PropertyName](../type.PropertyName/README.md) | `undefined`, name: `string` | [BindingName](../type.BindingName/README.md), initializer?: [Expression](../interface.Expression/README.md)): [BindingElement](../interface.BindingElement/README.md)



#### ⚙ updateBindingElement(node: [BindingElement](../interface.BindingElement/README.md), dotDotDotToken: [DotDotDotToken](../type.DotDotDotToken/README.md) | `undefined`, propertyName: [PropertyName](../type.PropertyName/README.md) | `undefined`, name: [BindingName](../type.BindingName/README.md), initializer: [Expression](../interface.Expression/README.md) | `undefined`): [BindingElement](../interface.BindingElement/README.md)



#### ⚙ createArrayLiteralExpression(elements?: readonly [Expression](../interface.Expression/README.md)\[], multiLine?: `boolean`): [ArrayLiteralExpression](../interface.ArrayLiteralExpression/README.md)



#### ⚙ updateArrayLiteralExpression(node: [ArrayLiteralExpression](../interface.ArrayLiteralExpression/README.md), elements: readonly [Expression](../interface.Expression/README.md)\[]): [ArrayLiteralExpression](../interface.ArrayLiteralExpression/README.md)



#### ⚙ createObjectLiteralExpression(properties?: readonly [ObjectLiteralElementLike](../type.ObjectLiteralElementLike/README.md)\[], multiLine?: `boolean`): [ObjectLiteralExpression](../interface.ObjectLiteralExpression/README.md)



#### ⚙ updateObjectLiteralExpression(node: [ObjectLiteralExpression](../interface.ObjectLiteralExpression/README.md), properties: readonly [ObjectLiteralElementLike](../type.ObjectLiteralElementLike/README.md)\[]): [ObjectLiteralExpression](../interface.ObjectLiteralExpression/README.md)



#### ⚙ createPropertyAccessExpression(expression: [Expression](../interface.Expression/README.md), name: `string` | [MemberName](../type.MemberName/README.md)): [PropertyAccessExpression](../interface.PropertyAccessExpression/README.md)



#### ⚙ updatePropertyAccessExpression(node: [PropertyAccessExpression](../interface.PropertyAccessExpression/README.md), expression: [Expression](../interface.Expression/README.md), name: [MemberName](../type.MemberName/README.md)): [PropertyAccessExpression](../interface.PropertyAccessExpression/README.md)



#### ⚙ createPropertyAccessChain(expression: [Expression](../interface.Expression/README.md), questionDotToken: [QuestionDotToken](../type.QuestionDotToken/README.md) | `undefined`, name: `string` | [MemberName](../type.MemberName/README.md)): [PropertyAccessChain](../interface.PropertyAccessChain/README.md)



#### ⚙ updatePropertyAccessChain(node: [PropertyAccessChain](../interface.PropertyAccessChain/README.md), expression: [Expression](../interface.Expression/README.md), questionDotToken: [QuestionDotToken](../type.QuestionDotToken/README.md) | `undefined`, name: [MemberName](../type.MemberName/README.md)): [PropertyAccessChain](../interface.PropertyAccessChain/README.md)



#### ⚙ createElementAccessExpression(expression: [Expression](../interface.Expression/README.md), index: `number` | [Expression](../interface.Expression/README.md)): [ElementAccessExpression](../interface.ElementAccessExpression/README.md)



#### ⚙ updateElementAccessExpression(node: [ElementAccessExpression](../interface.ElementAccessExpression/README.md), expression: [Expression](../interface.Expression/README.md), argumentExpression: [Expression](../interface.Expression/README.md)): [ElementAccessExpression](../interface.ElementAccessExpression/README.md)



#### ⚙ createElementAccessChain(expression: [Expression](../interface.Expression/README.md), questionDotToken: [QuestionDotToken](../type.QuestionDotToken/README.md) | `undefined`, index: `number` | [Expression](../interface.Expression/README.md)): [ElementAccessChain](../interface.ElementAccessChain/README.md)



#### ⚙ updateElementAccessChain(node: [ElementAccessChain](../interface.ElementAccessChain/README.md), expression: [Expression](../interface.Expression/README.md), questionDotToken: [QuestionDotToken](../type.QuestionDotToken/README.md) | `undefined`, argumentExpression: [Expression](../interface.Expression/README.md)): [ElementAccessChain](../interface.ElementAccessChain/README.md)



#### ⚙ createCallExpression(expression: [Expression](../interface.Expression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../interface.Expression/README.md)\[] | `undefined`): [CallExpression](../interface.CallExpression/README.md)



#### ⚙ updateCallExpression(node: [CallExpression](../interface.CallExpression/README.md), expression: [Expression](../interface.Expression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../interface.Expression/README.md)\[]): [CallExpression](../interface.CallExpression/README.md)



#### ⚙ createCallChain(expression: [Expression](../interface.Expression/README.md), questionDotToken: [QuestionDotToken](../type.QuestionDotToken/README.md) | `undefined`, typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../interface.Expression/README.md)\[] | `undefined`): [CallChain](../interface.CallChain/README.md)



#### ⚙ updateCallChain(node: [CallChain](../interface.CallChain/README.md), expression: [Expression](../interface.Expression/README.md), questionDotToken: [QuestionDotToken](../type.QuestionDotToken/README.md) | `undefined`, typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../interface.Expression/README.md)\[]): [CallChain](../interface.CallChain/README.md)



#### ⚙ createNewExpression(expression: [Expression](../interface.Expression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../interface.Expression/README.md)\[] | `undefined`): [NewExpression](../interface.NewExpression/README.md)



#### ⚙ updateNewExpression(node: [NewExpression](../interface.NewExpression/README.md), expression: [Expression](../interface.Expression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../interface.Expression/README.md)\[] | `undefined`): [NewExpression](../interface.NewExpression/README.md)



#### ⚙ createTaggedTemplateExpression(tag: [Expression](../interface.Expression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, template: [TemplateLiteral](../type.TemplateLiteral/README.md)): [TaggedTemplateExpression](../interface.TaggedTemplateExpression/README.md)



#### ⚙ updateTaggedTemplateExpression(node: [TaggedTemplateExpression](../interface.TaggedTemplateExpression/README.md), tag: [Expression](../interface.Expression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, template: [TemplateLiteral](../type.TemplateLiteral/README.md)): [TaggedTemplateExpression](../interface.TaggedTemplateExpression/README.md)



#### ⚙ createTypeAssertion(type: [TypeNode](../interface.TypeNode/README.md), expression: [Expression](../interface.Expression/README.md)): [TypeAssertion](../interface.TypeAssertion/README.md)



#### ⚙ updateTypeAssertion(node: [TypeAssertion](../interface.TypeAssertion/README.md), type: [TypeNode](../interface.TypeNode/README.md), expression: [Expression](../interface.Expression/README.md)): [TypeAssertion](../interface.TypeAssertion/README.md)



#### ⚙ createParenthesizedExpression(expression: [Expression](../interface.Expression/README.md)): [ParenthesizedExpression](../interface.ParenthesizedExpression/README.md)



#### ⚙ updateParenthesizedExpression(node: [ParenthesizedExpression](../interface.ParenthesizedExpression/README.md), expression: [Expression](../interface.Expression/README.md)): [ParenthesizedExpression](../interface.ParenthesizedExpression/README.md)



#### ⚙ createFunctionExpression(modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../type.AsteriskToken/README.md) | `undefined`, name: `string` | [Identifier](../interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[] | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, body: [Block](../interface.Block/README.md)): [FunctionExpression](../interface.FunctionExpression/README.md)



#### ⚙ updateFunctionExpression(node: [FunctionExpression](../interface.FunctionExpression/README.md), modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../type.AsteriskToken/README.md) | `undefined`, name: [Identifier](../interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, body: [Block](../interface.Block/README.md)): [FunctionExpression](../interface.FunctionExpression/README.md)



#### ⚙ createArrowFunction(modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, equalsGreaterThanToken: [EqualsGreaterThanToken](../type.EqualsGreaterThanToken/README.md) | `undefined`, body: [ConciseBody](../type.ConciseBody/README.md)): [ArrowFunction](../interface.ArrowFunction/README.md)



#### ⚙ updateArrowFunction(node: [ArrowFunction](../interface.ArrowFunction/README.md), modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, equalsGreaterThanToken: [EqualsGreaterThanToken](../type.EqualsGreaterThanToken/README.md), body: [ConciseBody](../type.ConciseBody/README.md)): [ArrowFunction](../interface.ArrowFunction/README.md)



#### ⚙ createDeleteExpression(expression: [Expression](../interface.Expression/README.md)): [DeleteExpression](../interface.DeleteExpression/README.md)



#### ⚙ updateDeleteExpression(node: [DeleteExpression](../interface.DeleteExpression/README.md), expression: [Expression](../interface.Expression/README.md)): [DeleteExpression](../interface.DeleteExpression/README.md)



#### ⚙ createTypeOfExpression(expression: [Expression](../interface.Expression/README.md)): [TypeOfExpression](../interface.TypeOfExpression/README.md)



#### ⚙ updateTypeOfExpression(node: [TypeOfExpression](../interface.TypeOfExpression/README.md), expression: [Expression](../interface.Expression/README.md)): [TypeOfExpression](../interface.TypeOfExpression/README.md)



#### ⚙ createVoidExpression(expression: [Expression](../interface.Expression/README.md)): [VoidExpression](../interface.VoidExpression/README.md)



#### ⚙ updateVoidExpression(node: [VoidExpression](../interface.VoidExpression/README.md), expression: [Expression](../interface.Expression/README.md)): [VoidExpression](../interface.VoidExpression/README.md)



#### ⚙ createAwaitExpression(expression: [Expression](../interface.Expression/README.md)): [AwaitExpression](../interface.AwaitExpression/README.md)



#### ⚙ updateAwaitExpression(node: [AwaitExpression](../interface.AwaitExpression/README.md), expression: [Expression](../interface.Expression/README.md)): [AwaitExpression](../interface.AwaitExpression/README.md)



#### ⚙ createPrefixUnaryExpression(operator: [PrefixUnaryOperator](../type.PrefixUnaryOperator/README.md), operand: [Expression](../interface.Expression/README.md)): [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md)



#### ⚙ updatePrefixUnaryExpression(node: [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md), operand: [Expression](../interface.Expression/README.md)): [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md)



#### ⚙ createPostfixUnaryExpression(operand: [Expression](../interface.Expression/README.md), operator: [PostfixUnaryOperator](../type.PostfixUnaryOperator/README.md)): [PostfixUnaryExpression](../interface.PostfixUnaryExpression/README.md)



#### ⚙ updatePostfixUnaryExpression(node: [PostfixUnaryExpression](../interface.PostfixUnaryExpression/README.md), operand: [Expression](../interface.Expression/README.md)): [PostfixUnaryExpression](../interface.PostfixUnaryExpression/README.md)



#### ⚙ createBinaryExpression(left: [Expression](../interface.Expression/README.md), operator: [BinaryOperator](../type.BinaryOperator/README.md) | [BinaryOperatorToken](../type.BinaryOperatorToken/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ updateBinaryExpression(node: [BinaryExpression](../interface.BinaryExpression/README.md), left: [Expression](../interface.Expression/README.md), operator: [BinaryOperator](../type.BinaryOperator/README.md) | [BinaryOperatorToken](../type.BinaryOperatorToken/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createConditionalExpression(condition: [Expression](../interface.Expression/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md) | `undefined`, whenTrue: [Expression](../interface.Expression/README.md), colonToken: [ColonToken](../type.ColonToken/README.md) | `undefined`, whenFalse: [Expression](../interface.Expression/README.md)): [ConditionalExpression](../interface.ConditionalExpression/README.md)



#### ⚙ updateConditionalExpression(node: [ConditionalExpression](../interface.ConditionalExpression/README.md), condition: [Expression](../interface.Expression/README.md), questionToken: [QuestionToken](../type.QuestionToken/README.md), whenTrue: [Expression](../interface.Expression/README.md), colonToken: [ColonToken](../type.ColonToken/README.md), whenFalse: [Expression](../interface.Expression/README.md)): [ConditionalExpression](../interface.ConditionalExpression/README.md)



#### ⚙ createTemplateExpression(head: [TemplateHead](../interface.TemplateHead/README.md), templateSpans: readonly [TemplateSpan](../interface.TemplateSpan/README.md)\[]): [TemplateExpression](../interface.TemplateExpression/README.md)



#### ⚙ updateTemplateExpression(node: [TemplateExpression](../interface.TemplateExpression/README.md), head: [TemplateHead](../interface.TemplateHead/README.md), templateSpans: readonly [TemplateSpan](../interface.TemplateSpan/README.md)\[]): [TemplateExpression](../interface.TemplateExpression/README.md)



#### ⚙ createTemplateHead(text: `string`, rawText?: `string`, templateFlags?: [TokenFlags](../enum.TokenFlags/README.md)): [TemplateHead](../interface.TemplateHead/README.md)



#### ⚙ createTemplateHead(text: `string` | `undefined`, rawText: `string`, templateFlags?: [TokenFlags](../enum.TokenFlags/README.md)): [TemplateHead](../interface.TemplateHead/README.md)



#### ⚙ createTemplateMiddle(text: `string`, rawText?: `string`, templateFlags?: [TokenFlags](../enum.TokenFlags/README.md)): [TemplateMiddle](../interface.TemplateMiddle/README.md)



#### ⚙ createTemplateMiddle(text: `string` | `undefined`, rawText: `string`, templateFlags?: [TokenFlags](../enum.TokenFlags/README.md)): [TemplateMiddle](../interface.TemplateMiddle/README.md)



#### ⚙ createTemplateTail(text: `string`, rawText?: `string`, templateFlags?: [TokenFlags](../enum.TokenFlags/README.md)): [TemplateTail](../interface.TemplateTail/README.md)



#### ⚙ createTemplateTail(text: `string` | `undefined`, rawText: `string`, templateFlags?: [TokenFlags](../enum.TokenFlags/README.md)): [TemplateTail](../interface.TemplateTail/README.md)



#### ⚙ createNoSubstitutionTemplateLiteral(text: `string`, rawText?: `string`): [NoSubstitutionTemplateLiteral](../interface.NoSubstitutionTemplateLiteral/README.md)



#### ⚙ createNoSubstitutionTemplateLiteral(text: `string` | `undefined`, rawText: `string`): [NoSubstitutionTemplateLiteral](../interface.NoSubstitutionTemplateLiteral/README.md)



#### ⚙ createYieldExpression(asteriskToken: [AsteriskToken](../type.AsteriskToken/README.md), expression: [Expression](../interface.Expression/README.md)): [YieldExpression](../interface.YieldExpression/README.md)



#### ⚙ createYieldExpression(asteriskToken: `undefined`, expression: [Expression](../interface.Expression/README.md) | `undefined`): [YieldExpression](../interface.YieldExpression/README.md)



#### ⚙ updateYieldExpression(node: [YieldExpression](../interface.YieldExpression/README.md), asteriskToken: [AsteriskToken](../type.AsteriskToken/README.md) | `undefined`, expression: [Expression](../interface.Expression/README.md) | `undefined`): [YieldExpression](../interface.YieldExpression/README.md)



#### ⚙ createSpreadElement(expression: [Expression](../interface.Expression/README.md)): [SpreadElement](../interface.SpreadElement/README.md)



#### ⚙ updateSpreadElement(node: [SpreadElement](../interface.SpreadElement/README.md), expression: [Expression](../interface.Expression/README.md)): [SpreadElement](../interface.SpreadElement/README.md)



#### ⚙ createClassExpression(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [ClassElement](../interface.ClassElement/README.md)\[]): [ClassExpression](../interface.ClassExpression/README.md)



#### ⚙ updateClassExpression(node: [ClassExpression](../interface.ClassExpression/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [ClassElement](../interface.ClassElement/README.md)\[]): [ClassExpression](../interface.ClassExpression/README.md)



#### ⚙ createOmittedExpression(): [OmittedExpression](../interface.OmittedExpression/README.md)



#### ⚙ createExpressionWithTypeArguments(expression: [Expression](../interface.Expression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`): [ExpressionWithTypeArguments](../interface.ExpressionWithTypeArguments/README.md)



#### ⚙ updateExpressionWithTypeArguments(node: [ExpressionWithTypeArguments](../interface.ExpressionWithTypeArguments/README.md), expression: [Expression](../interface.Expression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`): [ExpressionWithTypeArguments](../interface.ExpressionWithTypeArguments/README.md)



#### ⚙ createAsExpression(expression: [Expression](../interface.Expression/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [AsExpression](../interface.AsExpression/README.md)



#### ⚙ updateAsExpression(node: [AsExpression](../interface.AsExpression/README.md), expression: [Expression](../interface.Expression/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [AsExpression](../interface.AsExpression/README.md)



#### ⚙ createNonNullExpression(expression: [Expression](../interface.Expression/README.md)): [NonNullExpression](../interface.NonNullExpression/README.md)



#### ⚙ updateNonNullExpression(node: [NonNullExpression](../interface.NonNullExpression/README.md), expression: [Expression](../interface.Expression/README.md)): [NonNullExpression](../interface.NonNullExpression/README.md)



#### ⚙ createNonNullChain(expression: [Expression](../interface.Expression/README.md)): [NonNullChain](../interface.NonNullChain/README.md)



#### ⚙ updateNonNullChain(node: [NonNullChain](../interface.NonNullChain/README.md), expression: [Expression](../interface.Expression/README.md)): [NonNullChain](../interface.NonNullChain/README.md)



#### ⚙ createMetaProperty(keywordToken: [MetaProperty](../interface.MetaProperty/README.md)\[<mark>"keywordToken"</mark>], name: [Identifier](../interface.Identifier/README.md)): [MetaProperty](../interface.MetaProperty/README.md)



#### ⚙ updateMetaProperty(node: [MetaProperty](../interface.MetaProperty/README.md), name: [Identifier](../interface.Identifier/README.md)): [MetaProperty](../interface.MetaProperty/README.md)



#### ⚙ createSatisfiesExpression(expression: [Expression](../interface.Expression/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [SatisfiesExpression](../interface.SatisfiesExpression/README.md)



#### ⚙ updateSatisfiesExpression(node: [SatisfiesExpression](../interface.SatisfiesExpression/README.md), expression: [Expression](../interface.Expression/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [SatisfiesExpression](../interface.SatisfiesExpression/README.md)



#### ⚙ createTemplateSpan(expression: [Expression](../interface.Expression/README.md), literal: [TemplateMiddle](../interface.TemplateMiddle/README.md) | [TemplateTail](../interface.TemplateTail/README.md)): [TemplateSpan](../interface.TemplateSpan/README.md)



#### ⚙ updateTemplateSpan(node: [TemplateSpan](../interface.TemplateSpan/README.md), expression: [Expression](../interface.Expression/README.md), literal: [TemplateMiddle](../interface.TemplateMiddle/README.md) | [TemplateTail](../interface.TemplateTail/README.md)): [TemplateSpan](../interface.TemplateSpan/README.md)



#### ⚙ createSemicolonClassElement(): [SemicolonClassElement](../interface.SemicolonClassElement/README.md)



#### ⚙ createBlock(statements: readonly [Statement](../interface.Statement/README.md)\[], multiLine?: `boolean`): [Block](../interface.Block/README.md)



#### ⚙ updateBlock(node: [Block](../interface.Block/README.md), statements: readonly [Statement](../interface.Statement/README.md)\[]): [Block](../interface.Block/README.md)



#### ⚙ createVariableStatement(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, declarationList: [VariableDeclarationList](../interface.VariableDeclarationList/README.md) | readonly [VariableDeclaration](../interface.VariableDeclaration/README.md)\[]): [VariableStatement](../interface.VariableStatement/README.md)



#### ⚙ updateVariableStatement(node: [VariableStatement](../interface.VariableStatement/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, declarationList: [VariableDeclarationList](../interface.VariableDeclarationList/README.md)): [VariableStatement](../interface.VariableStatement/README.md)



#### ⚙ createEmptyStatement(): [EmptyStatement](../interface.EmptyStatement/README.md)



#### ⚙ createExpressionStatement(expression: [Expression](../interface.Expression/README.md)): [ExpressionStatement](../interface.ExpressionStatement/README.md)



#### ⚙ updateExpressionStatement(node: [ExpressionStatement](../interface.ExpressionStatement/README.md), expression: [Expression](../interface.Expression/README.md)): [ExpressionStatement](../interface.ExpressionStatement/README.md)



#### ⚙ createIfStatement(expression: [Expression](../interface.Expression/README.md), thenStatement: [Statement](../interface.Statement/README.md), elseStatement?: [Statement](../interface.Statement/README.md)): [IfStatement](../interface.IfStatement/README.md)



#### ⚙ updateIfStatement(node: [IfStatement](../interface.IfStatement/README.md), expression: [Expression](../interface.Expression/README.md), thenStatement: [Statement](../interface.Statement/README.md), elseStatement: [Statement](../interface.Statement/README.md) | `undefined`): [IfStatement](../interface.IfStatement/README.md)



#### ⚙ createDoStatement(statement: [Statement](../interface.Statement/README.md), expression: [Expression](../interface.Expression/README.md)): [DoStatement](../interface.DoStatement/README.md)



#### ⚙ updateDoStatement(node: [DoStatement](../interface.DoStatement/README.md), statement: [Statement](../interface.Statement/README.md), expression: [Expression](../interface.Expression/README.md)): [DoStatement](../interface.DoStatement/README.md)



#### ⚙ createWhileStatement(expression: [Expression](../interface.Expression/README.md), statement: [Statement](../interface.Statement/README.md)): [WhileStatement](../interface.WhileStatement/README.md)



#### ⚙ updateWhileStatement(node: [WhileStatement](../interface.WhileStatement/README.md), expression: [Expression](../interface.Expression/README.md), statement: [Statement](../interface.Statement/README.md)): [WhileStatement](../interface.WhileStatement/README.md)



#### ⚙ createForStatement(initializer: [ForInitializer](../type.ForInitializer/README.md) | `undefined`, condition: [Expression](../interface.Expression/README.md) | `undefined`, incrementor: [Expression](../interface.Expression/README.md) | `undefined`, statement: [Statement](../interface.Statement/README.md)): [ForStatement](../interface.ForStatement/README.md)



#### ⚙ updateForStatement(node: [ForStatement](../interface.ForStatement/README.md), initializer: [ForInitializer](../type.ForInitializer/README.md) | `undefined`, condition: [Expression](../interface.Expression/README.md) | `undefined`, incrementor: [Expression](../interface.Expression/README.md) | `undefined`, statement: [Statement](../interface.Statement/README.md)): [ForStatement](../interface.ForStatement/README.md)



#### ⚙ createForInStatement(initializer: [ForInitializer](../type.ForInitializer/README.md), expression: [Expression](../interface.Expression/README.md), statement: [Statement](../interface.Statement/README.md)): [ForInStatement](../interface.ForInStatement/README.md)



#### ⚙ updateForInStatement(node: [ForInStatement](../interface.ForInStatement/README.md), initializer: [ForInitializer](../type.ForInitializer/README.md), expression: [Expression](../interface.Expression/README.md), statement: [Statement](../interface.Statement/README.md)): [ForInStatement](../interface.ForInStatement/README.md)



#### ⚙ createForOfStatement(awaitModifier: [AwaitKeyword](../type.AwaitKeyword/README.md) | `undefined`, initializer: [ForInitializer](../type.ForInitializer/README.md), expression: [Expression](../interface.Expression/README.md), statement: [Statement](../interface.Statement/README.md)): [ForOfStatement](../interface.ForOfStatement/README.md)



#### ⚙ updateForOfStatement(node: [ForOfStatement](../interface.ForOfStatement/README.md), awaitModifier: [AwaitKeyword](../type.AwaitKeyword/README.md) | `undefined`, initializer: [ForInitializer](../type.ForInitializer/README.md), expression: [Expression](../interface.Expression/README.md), statement: [Statement](../interface.Statement/README.md)): [ForOfStatement](../interface.ForOfStatement/README.md)



#### ⚙ createContinueStatement(label?: `string` | [Identifier](../interface.Identifier/README.md)): [ContinueStatement](../interface.ContinueStatement/README.md)



#### ⚙ updateContinueStatement(node: [ContinueStatement](../interface.ContinueStatement/README.md), label: [Identifier](../interface.Identifier/README.md) | `undefined`): [ContinueStatement](../interface.ContinueStatement/README.md)



#### ⚙ createBreakStatement(label?: `string` | [Identifier](../interface.Identifier/README.md)): [BreakStatement](../interface.BreakStatement/README.md)



#### ⚙ updateBreakStatement(node: [BreakStatement](../interface.BreakStatement/README.md), label: [Identifier](../interface.Identifier/README.md) | `undefined`): [BreakStatement](../interface.BreakStatement/README.md)



#### ⚙ createReturnStatement(expression?: [Expression](../interface.Expression/README.md)): [ReturnStatement](../interface.ReturnStatement/README.md)



#### ⚙ updateReturnStatement(node: [ReturnStatement](../interface.ReturnStatement/README.md), expression: [Expression](../interface.Expression/README.md) | `undefined`): [ReturnStatement](../interface.ReturnStatement/README.md)



#### ⚙ createWithStatement(expression: [Expression](../interface.Expression/README.md), statement: [Statement](../interface.Statement/README.md)): [WithStatement](../interface.WithStatement/README.md)



#### ⚙ updateWithStatement(node: [WithStatement](../interface.WithStatement/README.md), expression: [Expression](../interface.Expression/README.md), statement: [Statement](../interface.Statement/README.md)): [WithStatement](../interface.WithStatement/README.md)



#### ⚙ createSwitchStatement(expression: [Expression](../interface.Expression/README.md), caseBlock: [CaseBlock](../interface.CaseBlock/README.md)): [SwitchStatement](../interface.SwitchStatement/README.md)



#### ⚙ updateSwitchStatement(node: [SwitchStatement](../interface.SwitchStatement/README.md), expression: [Expression](../interface.Expression/README.md), caseBlock: [CaseBlock](../interface.CaseBlock/README.md)): [SwitchStatement](../interface.SwitchStatement/README.md)



#### ⚙ createLabeledStatement(label: `string` | [Identifier](../interface.Identifier/README.md), statement: [Statement](../interface.Statement/README.md)): [LabeledStatement](../interface.LabeledStatement/README.md)



#### ⚙ updateLabeledStatement(node: [LabeledStatement](../interface.LabeledStatement/README.md), label: [Identifier](../interface.Identifier/README.md), statement: [Statement](../interface.Statement/README.md)): [LabeledStatement](../interface.LabeledStatement/README.md)



#### ⚙ createThrowStatement(expression: [Expression](../interface.Expression/README.md)): [ThrowStatement](../interface.ThrowStatement/README.md)



#### ⚙ updateThrowStatement(node: [ThrowStatement](../interface.ThrowStatement/README.md), expression: [Expression](../interface.Expression/README.md)): [ThrowStatement](../interface.ThrowStatement/README.md)



#### ⚙ createTryStatement(tryBlock: [Block](../interface.Block/README.md), catchClause: [CatchClause](../interface.CatchClause/README.md) | `undefined`, finallyBlock: [Block](../interface.Block/README.md) | `undefined`): [TryStatement](../interface.TryStatement/README.md)



#### ⚙ updateTryStatement(node: [TryStatement](../interface.TryStatement/README.md), tryBlock: [Block](../interface.Block/README.md), catchClause: [CatchClause](../interface.CatchClause/README.md) | `undefined`, finallyBlock: [Block](../interface.Block/README.md) | `undefined`): [TryStatement](../interface.TryStatement/README.md)



#### ⚙ createDebuggerStatement(): [DebuggerStatement](../interface.DebuggerStatement/README.md)



#### ⚙ createVariableDeclaration(name: `string` | [BindingName](../type.BindingName/README.md), exclamationToken?: [ExclamationToken](../type.ExclamationToken/README.md), type?: [TypeNode](../interface.TypeNode/README.md), initializer?: [Expression](../interface.Expression/README.md)): [VariableDeclaration](../interface.VariableDeclaration/README.md)



#### ⚙ updateVariableDeclaration(node: [VariableDeclaration](../interface.VariableDeclaration/README.md), name: [BindingName](../type.BindingName/README.md), exclamationToken: [ExclamationToken](../type.ExclamationToken/README.md) | `undefined`, type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, initializer: [Expression](../interface.Expression/README.md) | `undefined`): [VariableDeclaration](../interface.VariableDeclaration/README.md)



#### ⚙ createVariableDeclarationList(declarations: readonly [VariableDeclaration](../interface.VariableDeclaration/README.md)\[], flags?: [NodeFlags](../enum.NodeFlags/README.md)): [VariableDeclarationList](../interface.VariableDeclarationList/README.md)



#### ⚙ updateVariableDeclarationList(node: [VariableDeclarationList](../interface.VariableDeclarationList/README.md), declarations: readonly [VariableDeclaration](../interface.VariableDeclaration/README.md)\[]): [VariableDeclarationList](../interface.VariableDeclarationList/README.md)



#### ⚙ createFunctionDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../type.AsteriskToken/README.md) | `undefined`, name: `string` | [Identifier](../interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, body: [Block](../interface.Block/README.md) | `undefined`): [FunctionDeclaration](../interface.FunctionDeclaration/README.md)



#### ⚙ updateFunctionDeclaration(node: [FunctionDeclaration](../interface.FunctionDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../type.AsteriskToken/README.md) | `undefined`, name: [Identifier](../interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`, body: [Block](../interface.Block/README.md) | `undefined`): [FunctionDeclaration](../interface.FunctionDeclaration/README.md)



#### ⚙ createClassDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [ClassElement](../interface.ClassElement/README.md)\[]): [ClassDeclaration](../interface.ClassDeclaration/README.md)



#### ⚙ updateClassDeclaration(node: [ClassDeclaration](../interface.ClassDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [ClassElement](../interface.ClassElement/README.md)\[]): [ClassDeclaration](../interface.ClassDeclaration/README.md)



#### ⚙ createInterfaceDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../interface.Identifier/README.md), typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [TypeElement](../interface.TypeElement/README.md)\[]): [InterfaceDeclaration](../interface.InterfaceDeclaration/README.md)



#### ⚙ updateInterfaceDeclaration(node: [InterfaceDeclaration](../interface.InterfaceDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../interface.Identifier/README.md), typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [TypeElement](../interface.TypeElement/README.md)\[]): [InterfaceDeclaration](../interface.InterfaceDeclaration/README.md)



#### ⚙ createTypeAliasDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../interface.Identifier/README.md), typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, type: [TypeNode](../interface.TypeNode/README.md)): [TypeAliasDeclaration](../interface.TypeAliasDeclaration/README.md)



#### ⚙ updateTypeAliasDeclaration(node: [TypeAliasDeclaration](../interface.TypeAliasDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../interface.Identifier/README.md), typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[] | `undefined`, type: [TypeNode](../interface.TypeNode/README.md)): [TypeAliasDeclaration](../interface.TypeAliasDeclaration/README.md)



#### ⚙ createEnumDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../interface.Identifier/README.md), members: readonly [EnumMember](../interface.EnumMember/README.md)\[]): [EnumDeclaration](../interface.EnumDeclaration/README.md)



#### ⚙ updateEnumDeclaration(node: [EnumDeclaration](../interface.EnumDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../interface.Identifier/README.md), members: readonly [EnumMember](../interface.EnumMember/README.md)\[]): [EnumDeclaration](../interface.EnumDeclaration/README.md)



#### ⚙ createModuleDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [ModuleName](../type.ModuleName/README.md), body: [ModuleBody](../type.ModuleBody/README.md) | `undefined`, flags?: [NodeFlags](../enum.NodeFlags/README.md)): [ModuleDeclaration](../interface.ModuleDeclaration/README.md)



#### ⚙ updateModuleDeclaration(node: [ModuleDeclaration](../interface.ModuleDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, name: [ModuleName](../type.ModuleName/README.md), body: [ModuleBody](../type.ModuleBody/README.md) | `undefined`): [ModuleDeclaration](../interface.ModuleDeclaration/README.md)



#### ⚙ createModuleBlock(statements: readonly [Statement](../interface.Statement/README.md)\[]): [ModuleBlock](../interface.ModuleBlock/README.md)



#### ⚙ updateModuleBlock(node: [ModuleBlock](../interface.ModuleBlock/README.md), statements: readonly [Statement](../interface.Statement/README.md)\[]): [ModuleBlock](../interface.ModuleBlock/README.md)



#### ⚙ createCaseBlock(clauses: readonly [CaseOrDefaultClause](../type.CaseOrDefaultClause/README.md)\[]): [CaseBlock](../interface.CaseBlock/README.md)



#### ⚙ updateCaseBlock(node: [CaseBlock](../interface.CaseBlock/README.md), clauses: readonly [CaseOrDefaultClause](../type.CaseOrDefaultClause/README.md)\[]): [CaseBlock](../interface.CaseBlock/README.md)



#### ⚙ createNamespaceExportDeclaration(name: `string` | [Identifier](../interface.Identifier/README.md)): [NamespaceExportDeclaration](../interface.NamespaceExportDeclaration/README.md)



#### ⚙ updateNamespaceExportDeclaration(node: [NamespaceExportDeclaration](../interface.NamespaceExportDeclaration/README.md), name: [Identifier](../interface.Identifier/README.md)): [NamespaceExportDeclaration](../interface.NamespaceExportDeclaration/README.md)



#### ⚙ createImportEqualsDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, isTypeOnly: `boolean`, name: `string` | [Identifier](../interface.Identifier/README.md), moduleReference: [ModuleReference](../type.ModuleReference/README.md)): [ImportEqualsDeclaration](../interface.ImportEqualsDeclaration/README.md)



#### ⚙ updateImportEqualsDeclaration(node: [ImportEqualsDeclaration](../interface.ImportEqualsDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, isTypeOnly: `boolean`, name: [Identifier](../interface.Identifier/README.md), moduleReference: [ModuleReference](../type.ModuleReference/README.md)): [ImportEqualsDeclaration](../interface.ImportEqualsDeclaration/README.md)



#### ⚙ createImportDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, importClause: [ImportClause](../interface.ImportClause/README.md) | `undefined`, moduleSpecifier: [Expression](../interface.Expression/README.md), attributes?: [ImportAttributes](../interface.ImportAttributes/README.md)): [ImportDeclaration](../interface.ImportDeclaration/README.md)



#### ⚙ updateImportDeclaration(node: [ImportDeclaration](../interface.ImportDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, importClause: [ImportClause](../interface.ImportClause/README.md) | `undefined`, moduleSpecifier: [Expression](../interface.Expression/README.md), attributes: [ImportAttributes](../interface.ImportAttributes/README.md) | `undefined`): [ImportDeclaration](../interface.ImportDeclaration/README.md)



#### ⚙ createImportClause(isTypeOnly: `boolean`, name: [Identifier](../interface.Identifier/README.md) | `undefined`, namedBindings: [NamedImportBindings](../type.NamedImportBindings/README.md) | `undefined`): [ImportClause](../interface.ImportClause/README.md)



#### ⚙ updateImportClause(node: [ImportClause](../interface.ImportClause/README.md), isTypeOnly: `boolean`, name: [Identifier](../interface.Identifier/README.md) | `undefined`, namedBindings: [NamedImportBindings](../type.NamedImportBindings/README.md) | `undefined`): [ImportClause](../interface.ImportClause/README.md)



#### ⚙ createImportAttributes(elements: [NodeArray](../interface.NodeArray/README.md)\<[ImportAttribute](../interface.ImportAttribute/README.md)>, multiLine?: `boolean`): [ImportAttributes](../interface.ImportAttributes/README.md)



#### ⚙ updateImportAttributes(node: [ImportAttributes](../interface.ImportAttributes/README.md), elements: [NodeArray](../interface.NodeArray/README.md)\<[ImportAttribute](../interface.ImportAttribute/README.md)>, multiLine?: `boolean`): [ImportAttributes](../interface.ImportAttributes/README.md)



#### ⚙ createImportAttribute(name: [ImportAttributeName](../type.ImportAttributeName/README.md), value: [Expression](../interface.Expression/README.md)): [ImportAttribute](../interface.ImportAttribute/README.md)



#### ⚙ updateImportAttribute(node: [ImportAttribute](../interface.ImportAttribute/README.md), name: [ImportAttributeName](../type.ImportAttributeName/README.md), value: [Expression](../interface.Expression/README.md)): [ImportAttribute](../interface.ImportAttribute/README.md)



#### ⚙ createNamespaceImport(name: [Identifier](../interface.Identifier/README.md)): [NamespaceImport](../interface.NamespaceImport/README.md)



#### ⚙ updateNamespaceImport(node: [NamespaceImport](../interface.NamespaceImport/README.md), name: [Identifier](../interface.Identifier/README.md)): [NamespaceImport](../interface.NamespaceImport/README.md)



#### ⚙ createNamespaceExport(name: [ModuleExportName](../type.ModuleExportName/README.md)): [NamespaceExport](../interface.NamespaceExport/README.md)



#### ⚙ updateNamespaceExport(node: [NamespaceExport](../interface.NamespaceExport/README.md), name: [ModuleExportName](../type.ModuleExportName/README.md)): [NamespaceExport](../interface.NamespaceExport/README.md)



#### ⚙ createNamedImports(elements: readonly [ImportSpecifier](../interface.ImportSpecifier/README.md)\[]): [NamedImports](../interface.NamedImports/README.md)



#### ⚙ updateNamedImports(node: [NamedImports](../interface.NamedImports/README.md), elements: readonly [ImportSpecifier](../interface.ImportSpecifier/README.md)\[]): [NamedImports](../interface.NamedImports/README.md)



#### ⚙ createImportSpecifier(isTypeOnly: `boolean`, propertyName: [ModuleExportName](../type.ModuleExportName/README.md) | `undefined`, name: [Identifier](../interface.Identifier/README.md)): [ImportSpecifier](../interface.ImportSpecifier/README.md)



#### ⚙ updateImportSpecifier(node: [ImportSpecifier](../interface.ImportSpecifier/README.md), isTypeOnly: `boolean`, propertyName: [ModuleExportName](../type.ModuleExportName/README.md) | `undefined`, name: [Identifier](../interface.Identifier/README.md)): [ImportSpecifier](../interface.ImportSpecifier/README.md)



#### ⚙ createExportAssignment(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, isExportEquals: `boolean` | `undefined`, expression: [Expression](../interface.Expression/README.md)): [ExportAssignment](../interface.ExportAssignment/README.md)



#### ⚙ updateExportAssignment(node: [ExportAssignment](../interface.ExportAssignment/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, expression: [Expression](../interface.Expression/README.md)): [ExportAssignment](../interface.ExportAssignment/README.md)



#### ⚙ createExportDeclaration(modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, isTypeOnly: `boolean`, exportClause: [NamedExportBindings](../type.NamedExportBindings/README.md) | `undefined`, moduleSpecifier?: [Expression](../interface.Expression/README.md), attributes?: [ImportAttributes](../interface.ImportAttributes/README.md)): [ExportDeclaration](../interface.ExportDeclaration/README.md)



#### ⚙ updateExportDeclaration(node: [ExportDeclaration](../interface.ExportDeclaration/README.md), modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`, isTypeOnly: `boolean`, exportClause: [NamedExportBindings](../type.NamedExportBindings/README.md) | `undefined`, moduleSpecifier: [Expression](../interface.Expression/README.md) | `undefined`, attributes: [ImportAttributes](../interface.ImportAttributes/README.md) | `undefined`): [ExportDeclaration](../interface.ExportDeclaration/README.md)



#### ⚙ createNamedExports(elements: readonly [ExportSpecifier](../interface.ExportSpecifier/README.md)\[]): [NamedExports](../interface.NamedExports/README.md)



#### ⚙ updateNamedExports(node: [NamedExports](../interface.NamedExports/README.md), elements: readonly [ExportSpecifier](../interface.ExportSpecifier/README.md)\[]): [NamedExports](../interface.NamedExports/README.md)



#### ⚙ createExportSpecifier(isTypeOnly: `boolean`, propertyName: `string` | [ModuleExportName](../type.ModuleExportName/README.md) | `undefined`, name: `string` | [ModuleExportName](../type.ModuleExportName/README.md)): [ExportSpecifier](../interface.ExportSpecifier/README.md)



#### ⚙ updateExportSpecifier(node: [ExportSpecifier](../interface.ExportSpecifier/README.md), isTypeOnly: `boolean`, propertyName: [ModuleExportName](../type.ModuleExportName/README.md) | `undefined`, name: [ModuleExportName](../type.ModuleExportName/README.md)): [ExportSpecifier](../interface.ExportSpecifier/README.md)



#### ⚙ createExternalModuleReference(expression: [Expression](../interface.Expression/README.md)): [ExternalModuleReference](../interface.ExternalModuleReference/README.md)



#### ⚙ updateExternalModuleReference(node: [ExternalModuleReference](../interface.ExternalModuleReference/README.md), expression: [Expression](../interface.Expression/README.md)): [ExternalModuleReference](../interface.ExternalModuleReference/README.md)



#### ⚙ createJSDocAllType(): [JSDocAllType](../interface.JSDocAllType/README.md)



#### ⚙ createJSDocUnknownType(): [JSDocUnknownType](../interface.JSDocUnknownType/README.md)



#### ⚙ createJSDocNonNullableType(type: [TypeNode](../interface.TypeNode/README.md), postfix?: `boolean`): [JSDocNonNullableType](../interface.JSDocNonNullableType/README.md)



#### ⚙ updateJSDocNonNullableType(node: [JSDocNonNullableType](../interface.JSDocNonNullableType/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [JSDocNonNullableType](../interface.JSDocNonNullableType/README.md)



#### ⚙ createJSDocNullableType(type: [TypeNode](../interface.TypeNode/README.md), postfix?: `boolean`): [JSDocNullableType](../interface.JSDocNullableType/README.md)



#### ⚙ updateJSDocNullableType(node: [JSDocNullableType](../interface.JSDocNullableType/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [JSDocNullableType](../interface.JSDocNullableType/README.md)



#### ⚙ createJSDocOptionalType(type: [TypeNode](../interface.TypeNode/README.md)): [JSDocOptionalType](../interface.JSDocOptionalType/README.md)



#### ⚙ updateJSDocOptionalType(node: [JSDocOptionalType](../interface.JSDocOptionalType/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [JSDocOptionalType](../interface.JSDocOptionalType/README.md)



#### ⚙ createJSDocFunctionType(parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [JSDocFunctionType](../interface.JSDocFunctionType/README.md)



#### ⚙ updateJSDocFunctionType(node: [JSDocFunctionType](../interface.JSDocFunctionType/README.md), parameters: readonly [ParameterDeclaration](../interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../interface.TypeNode/README.md) | `undefined`): [JSDocFunctionType](../interface.JSDocFunctionType/README.md)



#### ⚙ createJSDocVariadicType(type: [TypeNode](../interface.TypeNode/README.md)): [JSDocVariadicType](../interface.JSDocVariadicType/README.md)



#### ⚙ updateJSDocVariadicType(node: [JSDocVariadicType](../interface.JSDocVariadicType/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [JSDocVariadicType](../interface.JSDocVariadicType/README.md)



#### ⚙ createJSDocNamepathType(type: [TypeNode](../interface.TypeNode/README.md)): [JSDocNamepathType](../interface.JSDocNamepathType/README.md)



#### ⚙ updateJSDocNamepathType(node: [JSDocNamepathType](../interface.JSDocNamepathType/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [JSDocNamepathType](../interface.JSDocNamepathType/README.md)



#### ⚙ createJSDocTypeExpression(type: [TypeNode](../interface.TypeNode/README.md)): [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md)



#### ⚙ updateJSDocTypeExpression(node: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), type: [TypeNode](../interface.TypeNode/README.md)): [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md)



#### ⚙ createJSDocNameReference(name: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md)): [JSDocNameReference](../interface.JSDocNameReference/README.md)



#### ⚙ updateJSDocNameReference(node: [JSDocNameReference](../interface.JSDocNameReference/README.md), name: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md)): [JSDocNameReference](../interface.JSDocNameReference/README.md)



#### ⚙ createJSDocMemberName(left: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md), right: [Identifier](../interface.Identifier/README.md)): [JSDocMemberName](../interface.JSDocMemberName/README.md)



#### ⚙ updateJSDocMemberName(node: [JSDocMemberName](../interface.JSDocMemberName/README.md), left: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md), right: [Identifier](../interface.Identifier/README.md)): [JSDocMemberName](../interface.JSDocMemberName/README.md)



#### ⚙ createJSDocLink(name: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLink](../interface.JSDocLink/README.md)



#### ⚙ updateJSDocLink(node: [JSDocLink](../interface.JSDocLink/README.md), name: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLink](../interface.JSDocLink/README.md)



#### ⚙ createJSDocLinkCode(name: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLinkCode](../interface.JSDocLinkCode/README.md)



#### ⚙ updateJSDocLinkCode(node: [JSDocLinkCode](../interface.JSDocLinkCode/README.md), name: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLinkCode](../interface.JSDocLinkCode/README.md)



#### ⚙ createJSDocLinkPlain(name: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLinkPlain](../interface.JSDocLinkPlain/README.md)



#### ⚙ updateJSDocLinkPlain(node: [JSDocLinkPlain](../interface.JSDocLinkPlain/README.md), name: [EntityName](../type.EntityName/README.md) | [JSDocMemberName](../interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLinkPlain](../interface.JSDocLinkPlain/README.md)



#### ⚙ createJSDocTypeLiteral(jsDocPropertyTags?: readonly [JSDocPropertyLikeTag](../interface.JSDocPropertyLikeTag/README.md)\[], isArrayType?: `boolean`): [JSDocTypeLiteral](../interface.JSDocTypeLiteral/README.md)



#### ⚙ updateJSDocTypeLiteral(node: [JSDocTypeLiteral](../interface.JSDocTypeLiteral/README.md), jsDocPropertyTags: readonly [JSDocPropertyLikeTag](../interface.JSDocPropertyLikeTag/README.md)\[] | `undefined`, isArrayType: `boolean` | `undefined`): [JSDocTypeLiteral](../interface.JSDocTypeLiteral/README.md)



#### ⚙ createJSDocSignature(typeParameters: readonly [JSDocTemplateTag](../interface.JSDocTemplateTag/README.md)\[] | `undefined`, parameters: readonly [JSDocParameterTag](../interface.JSDocParameterTag/README.md)\[], type?: [JSDocReturnTag](../interface.JSDocReturnTag/README.md)): [JSDocSignature](../interface.JSDocSignature/README.md)



#### ⚙ updateJSDocSignature(node: [JSDocSignature](../interface.JSDocSignature/README.md), typeParameters: readonly [JSDocTemplateTag](../interface.JSDocTemplateTag/README.md)\[] | `undefined`, parameters: readonly [JSDocParameterTag](../interface.JSDocParameterTag/README.md)\[], type: [JSDocReturnTag](../interface.JSDocReturnTag/README.md) | `undefined`): [JSDocSignature](../interface.JSDocSignature/README.md)



#### ⚙ createJSDocTemplateTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, constraint: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[], comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocTemplateTag](../interface.JSDocTemplateTag/README.md)



#### ⚙ updateJSDocTemplateTag(node: [JSDocTemplateTag](../interface.JSDocTemplateTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, constraint: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../interface.TypeParameterDeclaration/README.md)\[], comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocTemplateTag](../interface.JSDocTemplateTag/README.md)



#### ⚙ createJSDocTypedefTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression?: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | [JSDocTypeLiteral](../interface.JSDocTypeLiteral/README.md), fullName?: [Identifier](../interface.Identifier/README.md) | [JSDocNamespaceDeclaration](../interface.JSDocNamespaceDeclaration/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocTypedefTag](../interface.JSDocTypedefTag/README.md)



#### ⚙ updateJSDocTypedefTag(node: [JSDocTypedefTag](../interface.JSDocTypedefTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | [JSDocTypeLiteral](../interface.JSDocTypeLiteral/README.md) | `undefined`, fullName: [Identifier](../interface.Identifier/README.md) | [JSDocNamespaceDeclaration](../interface.JSDocNamespaceDeclaration/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocTypedefTag](../interface.JSDocTypedefTag/README.md)



#### ⚙ createJSDocParameterTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, name: [EntityName](../type.EntityName/README.md), isBracketed: `boolean`, typeExpression?: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), isNameFirst?: `boolean`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocParameterTag](../interface.JSDocParameterTag/README.md)



#### ⚙ updateJSDocParameterTag(node: [JSDocParameterTag](../interface.JSDocParameterTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, name: [EntityName](../type.EntityName/README.md), isBracketed: `boolean`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | `undefined`, isNameFirst: `boolean`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocParameterTag](../interface.JSDocParameterTag/README.md)



#### ⚙ createJSDocPropertyTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, name: [EntityName](../type.EntityName/README.md), isBracketed: `boolean`, typeExpression?: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), isNameFirst?: `boolean`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocPropertyTag](../interface.JSDocPropertyTag/README.md)



#### ⚙ updateJSDocPropertyTag(node: [JSDocPropertyTag](../interface.JSDocPropertyTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, name: [EntityName](../type.EntityName/README.md), isBracketed: `boolean`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | `undefined`, isNameFirst: `boolean`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocPropertyTag](../interface.JSDocPropertyTag/README.md)



#### ⚙ createJSDocTypeTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocTypeTag](../interface.JSDocTypeTag/README.md)



#### ⚙ updateJSDocTypeTag(node: [JSDocTypeTag](../interface.JSDocTypeTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocTypeTag](../interface.JSDocTypeTag/README.md)



#### ⚙ createJSDocSeeTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, nameExpression: [JSDocNameReference](../interface.JSDocNameReference/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocSeeTag](../interface.JSDocSeeTag/README.md)



#### ⚙ updateJSDocSeeTag(node: [JSDocSeeTag](../interface.JSDocSeeTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, nameExpression: [JSDocNameReference](../interface.JSDocNameReference/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocSeeTag](../interface.JSDocSeeTag/README.md)



#### ⚙ createJSDocReturnTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression?: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocReturnTag](../interface.JSDocReturnTag/README.md)



#### ⚙ updateJSDocReturnTag(node: [JSDocReturnTag](../interface.JSDocReturnTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocReturnTag](../interface.JSDocReturnTag/README.md)



#### ⚙ createJSDocThisTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocThisTag](../interface.JSDocThisTag/README.md)



#### ⚙ updateJSDocThisTag(node: [JSDocThisTag](../interface.JSDocThisTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocThisTag](../interface.JSDocThisTag/README.md)



#### ⚙ createJSDocEnumTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocEnumTag](../interface.JSDocEnumTag/README.md)



#### ⚙ updateJSDocEnumTag(node: [JSDocEnumTag](../interface.JSDocEnumTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocEnumTag](../interface.JSDocEnumTag/README.md)



#### ⚙ createJSDocCallbackTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocSignature](../interface.JSDocSignature/README.md), fullName?: [Identifier](../interface.Identifier/README.md) | [JSDocNamespaceDeclaration](../interface.JSDocNamespaceDeclaration/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocCallbackTag](../interface.JSDocCallbackTag/README.md)



#### ⚙ updateJSDocCallbackTag(node: [JSDocCallbackTag](../interface.JSDocCallbackTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocSignature](../interface.JSDocSignature/README.md), fullName: [Identifier](../interface.Identifier/README.md) | [JSDocNamespaceDeclaration](../interface.JSDocNamespaceDeclaration/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocCallbackTag](../interface.JSDocCallbackTag/README.md)



#### ⚙ createJSDocOverloadTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocSignature](../interface.JSDocSignature/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocOverloadTag](../interface.JSDocOverloadTag/README.md)



#### ⚙ updateJSDocOverloadTag(node: [JSDocOverloadTag](../interface.JSDocOverloadTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocSignature](../interface.JSDocSignature/README.md), comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocOverloadTag](../interface.JSDocOverloadTag/README.md)



#### ⚙ createJSDocAugmentsTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, className: [JSDocAugmentsTag](../interface.JSDocAugmentsTag/README.md)\[<mark>"class"</mark>], comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocAugmentsTag](../interface.JSDocAugmentsTag/README.md)



#### ⚙ updateJSDocAugmentsTag(node: [JSDocAugmentsTag](../interface.JSDocAugmentsTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, className: [JSDocAugmentsTag](../interface.JSDocAugmentsTag/README.md)\[<mark>"class"</mark>], comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocAugmentsTag](../interface.JSDocAugmentsTag/README.md)



#### ⚙ createJSDocImplementsTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, className: [JSDocImplementsTag](../interface.JSDocImplementsTag/README.md)\[<mark>"class"</mark>], comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocImplementsTag](../interface.JSDocImplementsTag/README.md)



#### ⚙ updateJSDocImplementsTag(node: [JSDocImplementsTag](../interface.JSDocImplementsTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, className: [JSDocImplementsTag](../interface.JSDocImplementsTag/README.md)\[<mark>"class"</mark>], comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocImplementsTag](../interface.JSDocImplementsTag/README.md)



#### ⚙ createJSDocAuthorTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocAuthorTag](../interface.JSDocAuthorTag/README.md)



#### ⚙ updateJSDocAuthorTag(node: [JSDocAuthorTag](../interface.JSDocAuthorTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocAuthorTag](../interface.JSDocAuthorTag/README.md)



#### ⚙ createJSDocClassTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocClassTag](../interface.JSDocClassTag/README.md)



#### ⚙ updateJSDocClassTag(node: [JSDocClassTag](../interface.JSDocClassTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocClassTag](../interface.JSDocClassTag/README.md)



#### ⚙ createJSDocPublicTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocPublicTag](../interface.JSDocPublicTag/README.md)



#### ⚙ updateJSDocPublicTag(node: [JSDocPublicTag](../interface.JSDocPublicTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocPublicTag](../interface.JSDocPublicTag/README.md)



#### ⚙ createJSDocPrivateTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocPrivateTag](../interface.JSDocPrivateTag/README.md)



#### ⚙ updateJSDocPrivateTag(node: [JSDocPrivateTag](../interface.JSDocPrivateTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocPrivateTag](../interface.JSDocPrivateTag/README.md)



#### ⚙ createJSDocProtectedTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocProtectedTag](../interface.JSDocProtectedTag/README.md)



#### ⚙ updateJSDocProtectedTag(node: [JSDocProtectedTag](../interface.JSDocProtectedTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocProtectedTag](../interface.JSDocProtectedTag/README.md)



#### ⚙ createJSDocReadonlyTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocReadonlyTag](../interface.JSDocReadonlyTag/README.md)



#### ⚙ updateJSDocReadonlyTag(node: [JSDocReadonlyTag](../interface.JSDocReadonlyTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocReadonlyTag](../interface.JSDocReadonlyTag/README.md)



#### ⚙ createJSDocUnknownTag(tagName: [Identifier](../interface.Identifier/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocUnknownTag](../interface.JSDocUnknownTag/README.md)



#### ⚙ updateJSDocUnknownTag(node: [JSDocUnknownTag](../interface.JSDocUnknownTag/README.md), tagName: [Identifier](../interface.Identifier/README.md), comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocUnknownTag](../interface.JSDocUnknownTag/README.md)



#### ⚙ createJSDocDeprecatedTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocDeprecatedTag](../interface.JSDocDeprecatedTag/README.md)



#### ⚙ updateJSDocDeprecatedTag(node: [JSDocDeprecatedTag](../interface.JSDocDeprecatedTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocDeprecatedTag](../interface.JSDocDeprecatedTag/README.md)



#### ⚙ createJSDocOverrideTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocOverrideTag](../interface.JSDocOverrideTag/README.md)



#### ⚙ updateJSDocOverrideTag(node: [JSDocOverrideTag](../interface.JSDocOverrideTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocOverrideTag](../interface.JSDocOverrideTag/README.md)



#### ⚙ createJSDocThrowsTag(tagName: [Identifier](../interface.Identifier/README.md), typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocThrowsTag](../interface.JSDocThrowsTag/README.md)



#### ⚙ updateJSDocThrowsTag(node: [JSDocThrowsTag](../interface.JSDocThrowsTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md) | `undefined`, comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocThrowsTag](../interface.JSDocThrowsTag/README.md)



#### ⚙ createJSDocSatisfiesTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocSatisfiesTag](../interface.JSDocSatisfiesTag/README.md)



#### ⚙ updateJSDocSatisfiesTag(node: [JSDocSatisfiesTag](../interface.JSDocSatisfiesTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../interface.JSDocTypeExpression/README.md), comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocSatisfiesTag](../interface.JSDocSatisfiesTag/README.md)



#### ⚙ createJSDocImportTag(tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, importClause: [ImportClause](../interface.ImportClause/README.md) | `undefined`, moduleSpecifier: [Expression](../interface.Expression/README.md), attributes?: [ImportAttributes](../interface.ImportAttributes/README.md), comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>): [JSDocImportTag](../interface.JSDocImportTag/README.md)



#### ⚙ updateJSDocImportTag(node: [JSDocImportTag](../interface.JSDocImportTag/README.md), tagName: [Identifier](../interface.Identifier/README.md) | `undefined`, importClause: [ImportClause](../interface.ImportClause/README.md) | `undefined`, moduleSpecifier: [Expression](../interface.Expression/README.md), attributes: [ImportAttributes](../interface.ImportAttributes/README.md) | `undefined`, comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`): [JSDocImportTag](../interface.JSDocImportTag/README.md)



#### ⚙ createJSDocText(text: `string`): [JSDocText](../interface.JSDocText/README.md)



#### ⚙ updateJSDocText(node: [JSDocText](../interface.JSDocText/README.md), text: `string`): [JSDocText](../interface.JSDocText/README.md)



#### ⚙ createJSDocComment(comment?: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)>, tags?: readonly [JSDocTag](../interface.JSDocTag/README.md)\[]): [JSDoc](../interface.JSDoc/README.md)



#### ⚙ updateJSDocComment(node: [JSDoc](../interface.JSDoc/README.md), comment: `string` | [NodeArray](../interface.NodeArray/README.md)\<[JSDocComment](../type.JSDocComment/README.md)> | `undefined`, tags: readonly [JSDocTag](../interface.JSDocTag/README.md)\[] | `undefined`): [JSDoc](../interface.JSDoc/README.md)



#### ⚙ createJsxElement(openingElement: [JsxOpeningElement](../interface.JsxOpeningElement/README.md), children: readonly [JsxChild](../type.JsxChild/README.md)\[], closingElement: [JsxClosingElement](../interface.JsxClosingElement/README.md)): [JsxElement](../interface.JsxElement/README.md)



#### ⚙ updateJsxElement(node: [JsxElement](../interface.JsxElement/README.md), openingElement: [JsxOpeningElement](../interface.JsxOpeningElement/README.md), children: readonly [JsxChild](../type.JsxChild/README.md)\[], closingElement: [JsxClosingElement](../interface.JsxClosingElement/README.md)): [JsxElement](../interface.JsxElement/README.md)



#### ⚙ createJsxSelfClosingElement(tagName: [JsxTagNameExpression](../type.JsxTagNameExpression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, attributes: [JsxAttributes](../interface.JsxAttributes/README.md)): [JsxSelfClosingElement](../interface.JsxSelfClosingElement/README.md)



#### ⚙ updateJsxSelfClosingElement(node: [JsxSelfClosingElement](../interface.JsxSelfClosingElement/README.md), tagName: [JsxTagNameExpression](../type.JsxTagNameExpression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, attributes: [JsxAttributes](../interface.JsxAttributes/README.md)): [JsxSelfClosingElement](../interface.JsxSelfClosingElement/README.md)



#### ⚙ createJsxOpeningElement(tagName: [JsxTagNameExpression](../type.JsxTagNameExpression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, attributes: [JsxAttributes](../interface.JsxAttributes/README.md)): [JsxOpeningElement](../interface.JsxOpeningElement/README.md)



#### ⚙ updateJsxOpeningElement(node: [JsxOpeningElement](../interface.JsxOpeningElement/README.md), tagName: [JsxTagNameExpression](../type.JsxTagNameExpression/README.md), typeArguments: readonly [TypeNode](../interface.TypeNode/README.md)\[] | `undefined`, attributes: [JsxAttributes](../interface.JsxAttributes/README.md)): [JsxOpeningElement](../interface.JsxOpeningElement/README.md)



#### ⚙ createJsxClosingElement(tagName: [JsxTagNameExpression](../type.JsxTagNameExpression/README.md)): [JsxClosingElement](../interface.JsxClosingElement/README.md)



#### ⚙ updateJsxClosingElement(node: [JsxClosingElement](../interface.JsxClosingElement/README.md), tagName: [JsxTagNameExpression](../type.JsxTagNameExpression/README.md)): [JsxClosingElement](../interface.JsxClosingElement/README.md)



#### ⚙ createJsxFragment(openingFragment: [JsxOpeningFragment](../interface.JsxOpeningFragment/README.md), children: readonly [JsxChild](../type.JsxChild/README.md)\[], closingFragment: [JsxClosingFragment](../interface.JsxClosingFragment/README.md)): [JsxFragment](../interface.JsxFragment/README.md)



#### ⚙ createJsxText(text: `string`, containsOnlyTriviaWhiteSpaces?: `boolean`): [JsxText](../interface.JsxText/README.md)



#### ⚙ updateJsxText(node: [JsxText](../interface.JsxText/README.md), text: `string`, containsOnlyTriviaWhiteSpaces?: `boolean`): [JsxText](../interface.JsxText/README.md)



#### ⚙ createJsxOpeningFragment(): [JsxOpeningFragment](../interface.JsxOpeningFragment/README.md)



#### ⚙ createJsxJsxClosingFragment(): [JsxClosingFragment](../interface.JsxClosingFragment/README.md)



#### ⚙ updateJsxFragment(node: [JsxFragment](../interface.JsxFragment/README.md), openingFragment: [JsxOpeningFragment](../interface.JsxOpeningFragment/README.md), children: readonly [JsxChild](../type.JsxChild/README.md)\[], closingFragment: [JsxClosingFragment](../interface.JsxClosingFragment/README.md)): [JsxFragment](../interface.JsxFragment/README.md)



#### ⚙ createJsxAttribute(name: [JsxAttributeName](../type.JsxAttributeName/README.md), initializer: [JsxAttributeValue](../type.JsxAttributeValue/README.md) | `undefined`): [JsxAttribute](../interface.JsxAttribute/README.md)



#### ⚙ updateJsxAttribute(node: [JsxAttribute](../interface.JsxAttribute/README.md), name: [JsxAttributeName](../type.JsxAttributeName/README.md), initializer: [JsxAttributeValue](../type.JsxAttributeValue/README.md) | `undefined`): [JsxAttribute](../interface.JsxAttribute/README.md)



#### ⚙ createJsxAttributes(properties: readonly [JsxAttributeLike](../type.JsxAttributeLike/README.md)\[]): [JsxAttributes](../interface.JsxAttributes/README.md)



#### ⚙ updateJsxAttributes(node: [JsxAttributes](../interface.JsxAttributes/README.md), properties: readonly [JsxAttributeLike](../type.JsxAttributeLike/README.md)\[]): [JsxAttributes](../interface.JsxAttributes/README.md)



#### ⚙ createJsxSpreadAttribute(expression: [Expression](../interface.Expression/README.md)): [JsxSpreadAttribute](../interface.JsxSpreadAttribute/README.md)



#### ⚙ updateJsxSpreadAttribute(node: [JsxSpreadAttribute](../interface.JsxSpreadAttribute/README.md), expression: [Expression](../interface.Expression/README.md)): [JsxSpreadAttribute](../interface.JsxSpreadAttribute/README.md)



#### ⚙ createJsxExpression(dotDotDotToken: [DotDotDotToken](../type.DotDotDotToken/README.md) | `undefined`, expression: [Expression](../interface.Expression/README.md) | `undefined`): [JsxExpression](../interface.JsxExpression/README.md)



#### ⚙ updateJsxExpression(node: [JsxExpression](../interface.JsxExpression/README.md), expression: [Expression](../interface.Expression/README.md) | `undefined`): [JsxExpression](../interface.JsxExpression/README.md)



#### ⚙ createJsxNamespacedName(namespace: [Identifier](../interface.Identifier/README.md), name: [Identifier](../interface.Identifier/README.md)): [JsxNamespacedName](../interface.JsxNamespacedName/README.md)



#### ⚙ updateJsxNamespacedName(node: [JsxNamespacedName](../interface.JsxNamespacedName/README.md), namespace: [Identifier](../interface.Identifier/README.md), name: [Identifier](../interface.Identifier/README.md)): [JsxNamespacedName](../interface.JsxNamespacedName/README.md)



#### ⚙ createCaseClause(expression: [Expression](../interface.Expression/README.md), statements: readonly [Statement](../interface.Statement/README.md)\[]): [CaseClause](../interface.CaseClause/README.md)



#### ⚙ updateCaseClause(node: [CaseClause](../interface.CaseClause/README.md), expression: [Expression](../interface.Expression/README.md), statements: readonly [Statement](../interface.Statement/README.md)\[]): [CaseClause](../interface.CaseClause/README.md)



#### ⚙ createDefaultClause(statements: readonly [Statement](../interface.Statement/README.md)\[]): [DefaultClause](../interface.DefaultClause/README.md)



#### ⚙ updateDefaultClause(node: [DefaultClause](../interface.DefaultClause/README.md), statements: readonly [Statement](../interface.Statement/README.md)\[]): [DefaultClause](../interface.DefaultClause/README.md)



#### ⚙ createHeritageClause(token: [HeritageClause](../interface.HeritageClause/README.md)\[<mark>"token"</mark>], types: readonly [ExpressionWithTypeArguments](../interface.ExpressionWithTypeArguments/README.md)\[]): [HeritageClause](../interface.HeritageClause/README.md)



#### ⚙ updateHeritageClause(node: [HeritageClause](../interface.HeritageClause/README.md), types: readonly [ExpressionWithTypeArguments](../interface.ExpressionWithTypeArguments/README.md)\[]): [HeritageClause](../interface.HeritageClause/README.md)



#### ⚙ createCatchClause(variableDeclaration: `string` | [BindingName](../type.BindingName/README.md) | [VariableDeclaration](../interface.VariableDeclaration/README.md) | `undefined`, block: [Block](../interface.Block/README.md)): [CatchClause](../interface.CatchClause/README.md)



#### ⚙ updateCatchClause(node: [CatchClause](../interface.CatchClause/README.md), variableDeclaration: [VariableDeclaration](../interface.VariableDeclaration/README.md) | `undefined`, block: [Block](../interface.Block/README.md)): [CatchClause](../interface.CatchClause/README.md)



#### ⚙ createPropertyAssignment(name: `string` | [PropertyName](../type.PropertyName/README.md), initializer: [Expression](../interface.Expression/README.md)): [PropertyAssignment](../interface.PropertyAssignment/README.md)



#### ⚙ updatePropertyAssignment(node: [PropertyAssignment](../interface.PropertyAssignment/README.md), name: [PropertyName](../type.PropertyName/README.md), initializer: [Expression](../interface.Expression/README.md)): [PropertyAssignment](../interface.PropertyAssignment/README.md)



#### ⚙ createShorthandPropertyAssignment(name: `string` | [Identifier](../interface.Identifier/README.md), objectAssignmentInitializer?: [Expression](../interface.Expression/README.md)): [ShorthandPropertyAssignment](../interface.ShorthandPropertyAssignment/README.md)



#### ⚙ updateShorthandPropertyAssignment(node: [ShorthandPropertyAssignment](../interface.ShorthandPropertyAssignment/README.md), name: [Identifier](../interface.Identifier/README.md), objectAssignmentInitializer: [Expression](../interface.Expression/README.md) | `undefined`): [ShorthandPropertyAssignment](../interface.ShorthandPropertyAssignment/README.md)



#### ⚙ createSpreadAssignment(expression: [Expression](../interface.Expression/README.md)): [SpreadAssignment](../interface.SpreadAssignment/README.md)



#### ⚙ updateSpreadAssignment(node: [SpreadAssignment](../interface.SpreadAssignment/README.md), expression: [Expression](../interface.Expression/README.md)): [SpreadAssignment](../interface.SpreadAssignment/README.md)



#### ⚙ createEnumMember(name: `string` | [PropertyName](../type.PropertyName/README.md), initializer?: [Expression](../interface.Expression/README.md)): [EnumMember](../interface.EnumMember/README.md)



#### ⚙ updateEnumMember(node: [EnumMember](../interface.EnumMember/README.md), name: [PropertyName](../type.PropertyName/README.md), initializer: [Expression](../interface.Expression/README.md) | `undefined`): [EnumMember](../interface.EnumMember/README.md)



#### ⚙ createSourceFile(statements: readonly [Statement](../interface.Statement/README.md)\[], endOfFileToken: [EndOfFileToken](../type.EndOfFileToken/README.md), flags: [NodeFlags](../enum.NodeFlags/README.md)): [SourceFile](../interface.SourceFile/README.md)



#### ⚙ updateSourceFile(node: [SourceFile](../interface.SourceFile/README.md), statements: readonly [Statement](../interface.Statement/README.md)\[], isDeclarationFile?: `boolean`, referencedFiles?: readonly [FileReference](../interface.FileReference/README.md)\[], typeReferences?: readonly [FileReference](../interface.FileReference/README.md)\[], hasNoDefaultLib?: `boolean`, libReferences?: readonly [FileReference](../interface.FileReference/README.md)\[]): [SourceFile](../interface.SourceFile/README.md)



#### ⚙ createNotEmittedStatement(original: [Node](../interface.Node/README.md)): [NotEmittedStatement](../interface.NotEmittedStatement/README.md)



#### ⚙ createPartiallyEmittedExpression(expression: [Expression](../interface.Expression/README.md), original?: [Node](../interface.Node/README.md)): [PartiallyEmittedExpression](../interface.PartiallyEmittedExpression/README.md)



#### ⚙ updatePartiallyEmittedExpression(node: [PartiallyEmittedExpression](../interface.PartiallyEmittedExpression/README.md), expression: [Expression](../interface.Expression/README.md)): [PartiallyEmittedExpression](../interface.PartiallyEmittedExpression/README.md)



#### ⚙ createCommaListExpression(elements: readonly [Expression](../interface.Expression/README.md)\[]): [CommaListExpression](../interface.CommaListExpression/README.md)



#### ⚙ updateCommaListExpression(node: [CommaListExpression](../interface.CommaListExpression/README.md), elements: readonly [Expression](../interface.Expression/README.md)\[]): [CommaListExpression](../interface.CommaListExpression/README.md)



#### ⚙ createBundle(sourceFiles: readonly [SourceFile](../interface.SourceFile/README.md)\[]): [Bundle](../interface.Bundle/README.md)



#### ⚙ updateBundle(node: [Bundle](../interface.Bundle/README.md), sourceFiles: readonly [SourceFile](../interface.SourceFile/README.md)\[]): [Bundle](../interface.Bundle/README.md)



#### ⚙ createComma(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createAssignment(left: [ObjectLiteralExpression](../interface.ObjectLiteralExpression/README.md) | [ArrayLiteralExpression](../interface.ArrayLiteralExpression/README.md), right: [Expression](../interface.Expression/README.md)): DestructuringAssignment



#### ⚙ createAssignment(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [AssignmentExpression](../interface.AssignmentExpression/README.md)\<[EqualsToken](../interface.PunctuationToken/README.md)\<[SyntaxKind.EqualsToken](../enum.SyntaxKind/README.md#equalstoken--64)>>



#### ⚙ createLogicalOr(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createLogicalAnd(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createBitwiseOr(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createBitwiseXor(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createBitwiseAnd(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createStrictEquality(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createStrictInequality(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createEquality(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createInequality(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createLessThan(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createLessThanEquals(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createGreaterThan(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createGreaterThanEquals(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createLeftShift(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createRightShift(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createUnsignedRightShift(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createAdd(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createSubtract(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createMultiply(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createDivide(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createModulo(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createExponent(left: [Expression](../interface.Expression/README.md), right: [Expression](../interface.Expression/README.md)): [BinaryExpression](../interface.BinaryExpression/README.md)



#### ⚙ createPrefixPlus(operand: [Expression](../interface.Expression/README.md)): [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md)



#### ⚙ createPrefixMinus(operand: [Expression](../interface.Expression/README.md)): [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md)



#### ⚙ createPrefixIncrement(operand: [Expression](../interface.Expression/README.md)): [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md)



#### ⚙ createPrefixDecrement(operand: [Expression](../interface.Expression/README.md)): [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md)



#### ⚙ createBitwiseNot(operand: [Expression](../interface.Expression/README.md)): [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md)



#### ⚙ createLogicalNot(operand: [Expression](../interface.Expression/README.md)): [PrefixUnaryExpression](../interface.PrefixUnaryExpression/README.md)



#### ⚙ createPostfixIncrement(operand: [Expression](../interface.Expression/README.md)): [PostfixUnaryExpression](../interface.PostfixUnaryExpression/README.md)



#### ⚙ createPostfixDecrement(operand: [Expression](../interface.Expression/README.md)): [PostfixUnaryExpression](../interface.PostfixUnaryExpression/README.md)



#### ⚙ createImmediatelyInvokedFunctionExpression(statements: readonly [Statement](../interface.Statement/README.md)\[]): [CallExpression](../interface.CallExpression/README.md)



#### ⚙ createImmediatelyInvokedFunctionExpression(statements: readonly [Statement](../interface.Statement/README.md)\[], param: [ParameterDeclaration](../interface.ParameterDeclaration/README.md), paramValue: [Expression](../interface.Expression/README.md)): [CallExpression](../interface.CallExpression/README.md)



#### ⚙ createImmediatelyInvokedArrowFunction(statements: readonly [Statement](../interface.Statement/README.md)\[]): ImmediatelyInvokedArrowFunction



#### ⚙ createImmediatelyInvokedArrowFunction(statements: readonly [Statement](../interface.Statement/README.md)\[], param: [ParameterDeclaration](../interface.ParameterDeclaration/README.md), paramValue: [Expression](../interface.Expression/README.md)): ImmediatelyInvokedArrowFunction



#### ⚙ createVoidZero(): [VoidExpression](../interface.VoidExpression/README.md)



#### ⚙ createExportDefault(expression: [Expression](../interface.Expression/README.md)): [ExportAssignment](../interface.ExportAssignment/README.md)



#### ⚙ createExternalModuleExport(exportName: [Identifier](../interface.Identifier/README.md)): [ExportDeclaration](../interface.ExportDeclaration/README.md)



#### ⚙ restoreOuterExpressions(outerExpression: [Expression](../interface.Expression/README.md) | `undefined`, innerExpression: [Expression](../interface.Expression/README.md), kinds?: [OuterExpressionKinds](../enum.OuterExpressionKinds/README.md)): [Expression](../interface.Expression/README.md)



#### ⚙ replaceModifiers\<T `extends` [HasModifiers](../type.HasModifiers/README.md)>(node: T, modifiers: readonly [Modifier](../type.Modifier/README.md)\[] | [ModifierFlags](../enum.ModifierFlags/README.md) | `undefined`): T

> Updates a node that may contain modifiers, replacing only the modifiers of the node.



#### ⚙ replaceDecoratorsAndModifiers\<T `extends` [HasModifiers](../type.HasModifiers/README.md) \& [HasDecorators](../type.HasDecorators/README.md)>(node: T, modifiers: readonly [ModifierLike](../type.ModifierLike/README.md)\[] | `undefined`): T

> Updates a node that may contain decorators or modifiers, replacing only the decorators and modifiers of the node.



#### ⚙ replacePropertyName\<T `extends` [AccessorDeclaration](../type.AccessorDeclaration/README.md) | [MethodDeclaration](../interface.MethodDeclaration/README.md) | [MethodSignature](../interface.MethodSignature/README.md) | [PropertyDeclaration](../interface.PropertyDeclaration/README.md) | [PropertySignature](../interface.PropertySignature/README.md) | [PropertyAssignment](../interface.PropertyAssignment/README.md)>(node: T, name: T\[<mark>"name"</mark>]): T

> Updates a node that contains a property name, replacing only the name of the node.



<div style="opacity:0.6">

#### ⚙ `deprecated` createAssertClause(elements: [NodeArray](../interface.NodeArray/README.md)\<[AssertEntry](../interface.AssertEntry/README.md)>, multiLine?: `boolean`): [AssertClause](../interface.AssertClause/README.md)



#### ⚙ `deprecated` updateAssertClause(node: [AssertClause](../interface.AssertClause/README.md), elements: [NodeArray](../interface.NodeArray/README.md)\<[AssertEntry](../interface.AssertEntry/README.md)>, multiLine?: `boolean`): [AssertClause](../interface.AssertClause/README.md)



#### ⚙ `deprecated` createAssertEntry(name: [AssertionKey](../type.AssertionKey/README.md), value: [Expression](../interface.Expression/README.md)): [AssertEntry](../interface.AssertEntry/README.md)



#### ⚙ `deprecated` updateAssertEntry(node: [AssertEntry](../interface.AssertEntry/README.md), name: [AssertionKey](../type.AssertionKey/README.md), value: [Expression](../interface.Expression/README.md)): [AssertEntry](../interface.AssertEntry/README.md)



#### ⚙ `deprecated` createImportTypeAssertionContainer(clause: [AssertClause](../interface.AssertClause/README.md), multiLine?: `boolean`): [ImportTypeAssertionContainer](../interface.ImportTypeAssertionContainer/README.md)



#### ⚙ `deprecated` updateImportTypeAssertionContainer(node: [ImportTypeAssertionContainer](../interface.ImportTypeAssertionContainer/README.md), clause: [AssertClause](../interface.AssertClause/README.md), multiLine?: `boolean`): [ImportTypeAssertionContainer](../interface.ImportTypeAssertionContainer/README.md)



</div>

