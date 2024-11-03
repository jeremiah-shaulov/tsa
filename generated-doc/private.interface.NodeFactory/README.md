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
[createAssignment](#-createassignmentleft-expression-right-expression-assignmentexpressionequalstoken),
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


#### ⚙ createNodeArray\<T `extends` [Node](../private.interface.Node/README.md)>(elements?: readonly T\[], hasTrailingComma?: `boolean`): [NodeArray](../private.interface.NodeArray/README.md)\<T>



#### ⚙ createNumericLiteral(value: `string` | `number`, numericLiteralFlags?: [TokenFlags](../private.enum.TokenFlags/README.md)): [NumericLiteral](../private.interface.NumericLiteral/README.md)



#### ⚙ createBigIntLiteral(value: `string` | [PseudoBigInt](../private.interface.PseudoBigInt/README.md)): [BigIntLiteral](../private.interface.BigIntLiteral/README.md)



#### ⚙ createStringLiteral(text: `string`, isSingleQuote?: `boolean`): [StringLiteral](../private.interface.StringLiteral/README.md)



#### ⚙ createStringLiteralFromNode(sourceNode: [PropertyNameLiteral](../private.type.PropertyNameLiteral/README.md) | [PrivateIdentifier](../private.interface.PrivateIdentifier/README.md), isSingleQuote?: `boolean`): [StringLiteral](../private.interface.StringLiteral/README.md)



#### ⚙ createRegularExpressionLiteral(text: `string`): [RegularExpressionLiteral](../private.interface.RegularExpressionLiteral/README.md)



#### ⚙ createIdentifier(text: `string`): [Identifier](../private.interface.Identifier/README.md)



#### ⚙ createTempVariable(recordTempVariable: ((node: [Identifier](../private.interface.Identifier/README.md)) => `void`) | `undefined`, reservedInNestedScopes?: `boolean`): [Identifier](../private.interface.Identifier/README.md)

> Create a unique temporary variable.



#### ⚙ createLoopVariable(reservedInNestedScopes?: `boolean`): [Identifier](../private.interface.Identifier/README.md)

> Create a unique temporary variable for use in a loop.



#### ⚙ createUniqueName(text: `string`, flags?: [GeneratedIdentifierFlags](../private.enum.GeneratedIdentifierFlags/README.md)): [Identifier](../private.interface.Identifier/README.md)

> Create a unique name based on the supplied text.



#### ⚙ getGeneratedNameForNode(node: [Node](../private.interface.Node/README.md) | `undefined`, flags?: [GeneratedIdentifierFlags](../private.enum.GeneratedIdentifierFlags/README.md)): [Identifier](../private.interface.Identifier/README.md)

> Create a unique name generated for a node.



#### ⚙ createPrivateIdentifier(text: `string`): [PrivateIdentifier](../private.interface.PrivateIdentifier/README.md)



#### ⚙ createUniquePrivateName(text?: `string`): [PrivateIdentifier](../private.interface.PrivateIdentifier/README.md)



#### ⚙ getGeneratedPrivateNameForNode(node: [Node](../private.interface.Node/README.md)): [PrivateIdentifier](../private.interface.PrivateIdentifier/README.md)



#### ⚙ createToken(token: [SyntaxKind.SuperKeyword](../private.enum.SyntaxKind/README.md#superkeyword--108)): [SuperExpression](../private.interface.SuperExpression/README.md)



#### ⚙ createToken(token: [SyntaxKind.ThisKeyword](../private.enum.SyntaxKind/README.md#thiskeyword--110)): [ThisExpression](../private.interface.ThisExpression/README.md)



#### ⚙ createToken(token: [SyntaxKind.NullKeyword](../private.enum.SyntaxKind/README.md#nullkeyword--106)): [NullLiteral](../private.interface.NullLiteral/README.md)



#### ⚙ createToken(token: [SyntaxKind.TrueKeyword](../private.enum.SyntaxKind/README.md#truekeyword--112)): [TrueLiteral](../private.interface.TrueLiteral/README.md)



#### ⚙ createToken(token: [SyntaxKind.FalseKeyword](../private.enum.SyntaxKind/README.md#falsekeyword--97)): [FalseLiteral](../private.interface.FalseLiteral/README.md)



#### ⚙ createToken(token: [SyntaxKind.EndOfFileToken](../private.enum.SyntaxKind/README.md#endoffiletoken--1)): EndOfFileToken



#### ⚙ createToken(token: [SyntaxKind.Unknown](../private.enum.SyntaxKind/README.md#unknown--0)): [Token](../private.interface.Token/README.md)\<SyntaxKind.Unknown>



#### ⚙ createToken\<TKind `extends` [PunctuationSyntaxKind](../private.type.PunctuationSyntaxKind/README.md)>(token: TKind): [PunctuationToken](../private.interface.PunctuationToken/README.md)\<TKind>



#### ⚙ createToken\<TKind `extends` [KeywordTypeSyntaxKind](../private.type.KeywordTypeSyntaxKind/README.md)>(token: TKind): [KeywordTypeNode](../private.interface.KeywordTypeNode/README.md)\<TKind>



#### ⚙ createToken\<TKind `extends` [ModifierSyntaxKind](../private.type.ModifierSyntaxKind/README.md)>(token: TKind): [ModifierToken](../private.interface.ModifierToken/README.md)\<TKind>



#### ⚙ createToken\<TKind `extends` [KeywordSyntaxKind](../private.type.KeywordSyntaxKind/README.md)>(token: TKind): [KeywordToken](../private.interface.KeywordToken/README.md)\<TKind>



#### ⚙ createSuper(): [SuperExpression](../private.interface.SuperExpression/README.md)



#### ⚙ createThis(): [ThisExpression](../private.interface.ThisExpression/README.md)



#### ⚙ createNull(): [NullLiteral](../private.interface.NullLiteral/README.md)



#### ⚙ createTrue(): [TrueLiteral](../private.interface.TrueLiteral/README.md)



#### ⚙ createFalse(): [FalseLiteral](../private.interface.FalseLiteral/README.md)



#### ⚙ createModifier\<T `extends` [ModifierSyntaxKind](../private.type.ModifierSyntaxKind/README.md)>(kind: T): [ModifierToken](../private.interface.ModifierToken/README.md)\<T>



#### ⚙ createModifiersFromModifierFlags(flags: [ModifierFlags](../private.enum.ModifierFlags/README.md)): Modifier\[]



#### ⚙ createQualifiedName(left: [EntityName](../private.type.EntityName/README.md), right: `string` | [Identifier](../private.interface.Identifier/README.md)): [QualifiedName](../private.interface.QualifiedName/README.md)



#### ⚙ updateQualifiedName(node: [QualifiedName](../private.interface.QualifiedName/README.md), left: [EntityName](../private.type.EntityName/README.md), right: [Identifier](../private.interface.Identifier/README.md)): [QualifiedName](../private.interface.QualifiedName/README.md)



#### ⚙ createComputedPropertyName(expression: [Expression](../private.interface.Expression/README.md)): [ComputedPropertyName](../private.interface.ComputedPropertyName/README.md)



#### ⚙ updateComputedPropertyName(node: [ComputedPropertyName](../private.interface.ComputedPropertyName/README.md), expression: [Expression](../private.interface.Expression/README.md)): [ComputedPropertyName](../private.interface.ComputedPropertyName/README.md)



#### ⚙ createTypeParameterDeclaration(modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, name: `string` | [Identifier](../private.interface.Identifier/README.md), constraint?: [TypeNode](../private.interface.TypeNode/README.md), defaultType?: [TypeNode](../private.interface.TypeNode/README.md)): [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)



#### ⚙ updateTypeParameterDeclaration(node: [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md), modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, name: [Identifier](../private.interface.Identifier/README.md), constraint: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, defaultType: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)



#### ⚙ createParameterDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, dotDotDotToken: [DotDotDotToken](../private.type.DotDotDotToken/README.md) | `undefined`, name: `string` | [BindingName](../private.type.BindingName/README.md), questionToken?: [QuestionToken](../private.type.QuestionToken/README.md), type?: [TypeNode](../private.interface.TypeNode/README.md), initializer?: [Expression](../private.interface.Expression/README.md)): [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)



#### ⚙ updateParameterDeclaration(node: [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, dotDotDotToken: [DotDotDotToken](../private.type.DotDotDotToken/README.md) | `undefined`, name: `string` | [BindingName](../private.type.BindingName/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, initializer: [Expression](../private.interface.Expression/README.md) | `undefined`): [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)



#### ⚙ createDecorator(expression: [Expression](../private.interface.Expression/README.md)): [Decorator](../private.interface.Decorator/README.md)



#### ⚙ updateDecorator(node: [Decorator](../private.interface.Decorator/README.md), expression: [Expression](../private.interface.Expression/README.md)): [Decorator](../private.interface.Decorator/README.md)



#### ⚙ createPropertySignature(modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, name: [PropertyName](../private.type.PropertyName/README.md) | `string`, questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [PropertySignature](../private.interface.PropertySignature/README.md)



#### ⚙ updatePropertySignature(node: [PropertySignature](../private.interface.PropertySignature/README.md), modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, name: [PropertyName](../private.type.PropertyName/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [PropertySignature](../private.interface.PropertySignature/README.md)



#### ⚙ createPropertyDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [PropertyName](../private.type.PropertyName/README.md), questionOrExclamationToken: [QuestionToken](../private.type.QuestionToken/README.md) | [ExclamationToken](../private.type.ExclamationToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, initializer: [Expression](../private.interface.Expression/README.md) | `undefined`): [PropertyDeclaration](../private.interface.PropertyDeclaration/README.md)



#### ⚙ updatePropertyDeclaration(node: [PropertyDeclaration](../private.interface.PropertyDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [PropertyName](../private.type.PropertyName/README.md), questionOrExclamationToken: [QuestionToken](../private.type.QuestionToken/README.md) | [ExclamationToken](../private.type.ExclamationToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, initializer: [Expression](../private.interface.Expression/README.md) | `undefined`): [PropertyDeclaration](../private.interface.PropertyDeclaration/README.md)



#### ⚙ createMethodSignature(modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, name: `string` | [PropertyName](../private.type.PropertyName/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [MethodSignature](../private.interface.MethodSignature/README.md)



#### ⚙ updateMethodSignature(node: [MethodSignature](../private.interface.MethodSignature/README.md), modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, name: [PropertyName](../private.type.PropertyName/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, typeParameters: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../private.interface.NodeArray/README.md)\<[ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)>, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [MethodSignature](../private.interface.MethodSignature/README.md)



#### ⚙ createMethodDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../private.type.AsteriskToken/README.md) | `undefined`, name: `string` | [PropertyName](../private.type.PropertyName/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, body: [Block](../private.interface.Block/README.md) | `undefined`): [MethodDeclaration](../private.interface.MethodDeclaration/README.md)



#### ⚙ updateMethodDeclaration(node: [MethodDeclaration](../private.interface.MethodDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../private.type.AsteriskToken/README.md) | `undefined`, name: [PropertyName](../private.type.PropertyName/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, body: [Block](../private.interface.Block/README.md) | `undefined`): [MethodDeclaration](../private.interface.MethodDeclaration/README.md)



#### ⚙ createConstructorDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], body: [Block](../private.interface.Block/README.md) | `undefined`): [ConstructorDeclaration](../private.interface.ConstructorDeclaration/README.md)



#### ⚙ updateConstructorDeclaration(node: [ConstructorDeclaration](../private.interface.ConstructorDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], body: [Block](../private.interface.Block/README.md) | `undefined`): [ConstructorDeclaration](../private.interface.ConstructorDeclaration/README.md)



#### ⚙ createGetAccessorDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [PropertyName](../private.type.PropertyName/README.md), parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, body: [Block](../private.interface.Block/README.md) | `undefined`): [GetAccessorDeclaration](../private.interface.GetAccessorDeclaration/README.md)



#### ⚙ updateGetAccessorDeclaration(node: [GetAccessorDeclaration](../private.interface.GetAccessorDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [PropertyName](../private.type.PropertyName/README.md), parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, body: [Block](../private.interface.Block/README.md) | `undefined`): [GetAccessorDeclaration](../private.interface.GetAccessorDeclaration/README.md)



#### ⚙ createSetAccessorDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [PropertyName](../private.type.PropertyName/README.md), parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], body: [Block](../private.interface.Block/README.md) | `undefined`): [SetAccessorDeclaration](../private.interface.SetAccessorDeclaration/README.md)



#### ⚙ updateSetAccessorDeclaration(node: [SetAccessorDeclaration](../private.interface.SetAccessorDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [PropertyName](../private.type.PropertyName/README.md), parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], body: [Block](../private.interface.Block/README.md) | `undefined`): [SetAccessorDeclaration](../private.interface.SetAccessorDeclaration/README.md)



#### ⚙ createCallSignature(typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [CallSignatureDeclaration](../private.interface.CallSignatureDeclaration/README.md)



#### ⚙ updateCallSignature(node: [CallSignatureDeclaration](../private.interface.CallSignatureDeclaration/README.md), typeParameters: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../private.interface.NodeArray/README.md)\<[ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)>, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [CallSignatureDeclaration](../private.interface.CallSignatureDeclaration/README.md)



#### ⚙ createConstructSignature(typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [ConstructSignatureDeclaration](../private.interface.ConstructSignatureDeclaration/README.md)



#### ⚙ updateConstructSignature(node: [ConstructSignatureDeclaration](../private.interface.ConstructSignatureDeclaration/README.md), typeParameters: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../private.interface.NodeArray/README.md)\<[ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)>, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [ConstructSignatureDeclaration](../private.interface.ConstructSignatureDeclaration/README.md)



#### ⚙ createIndexSignature(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md)): [IndexSignatureDeclaration](../private.interface.IndexSignatureDeclaration/README.md)



#### ⚙ updateIndexSignature(node: [IndexSignatureDeclaration](../private.interface.IndexSignatureDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md)): [IndexSignatureDeclaration](../private.interface.IndexSignatureDeclaration/README.md)



#### ⚙ createTemplateLiteralTypeSpan(type: [TypeNode](../private.interface.TypeNode/README.md), literal: [TemplateMiddle](../private.interface.TemplateMiddle/README.md) | [TemplateTail](../private.interface.TemplateTail/README.md)): [TemplateLiteralTypeSpan](../private.interface.TemplateLiteralTypeSpan/README.md)



#### ⚙ updateTemplateLiteralTypeSpan(node: [TemplateLiteralTypeSpan](../private.interface.TemplateLiteralTypeSpan/README.md), type: [TypeNode](../private.interface.TypeNode/README.md), literal: [TemplateMiddle](../private.interface.TemplateMiddle/README.md) | [TemplateTail](../private.interface.TemplateTail/README.md)): [TemplateLiteralTypeSpan](../private.interface.TemplateLiteralTypeSpan/README.md)



#### ⚙ createClassStaticBlockDeclaration(body: [Block](../private.interface.Block/README.md)): [ClassStaticBlockDeclaration](../private.interface.ClassStaticBlockDeclaration/README.md)



#### ⚙ updateClassStaticBlockDeclaration(node: [ClassStaticBlockDeclaration](../private.interface.ClassStaticBlockDeclaration/README.md), body: [Block](../private.interface.Block/README.md)): [ClassStaticBlockDeclaration](../private.interface.ClassStaticBlockDeclaration/README.md)



#### ⚙ createKeywordTypeNode\<TKind `extends` [KeywordTypeSyntaxKind](../private.type.KeywordTypeSyntaxKind/README.md)>(kind: TKind): [KeywordTypeNode](../private.interface.KeywordTypeNode/README.md)\<TKind>



#### ⚙ createTypePredicateNode(assertsModifier: [AssertsKeyword](../private.type.AssertsKeyword/README.md) | `undefined`, parameterName: [Identifier](../private.interface.Identifier/README.md) | [ThisTypeNode](../private.interface.ThisTypeNode/README.md) | `string`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [TypePredicateNode](../private.interface.TypePredicateNode/README.md)



#### ⚙ updateTypePredicateNode(node: [TypePredicateNode](../private.interface.TypePredicateNode/README.md), assertsModifier: [AssertsKeyword](../private.type.AssertsKeyword/README.md) | `undefined`, parameterName: [Identifier](../private.interface.Identifier/README.md) | [ThisTypeNode](../private.interface.ThisTypeNode/README.md), type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [TypePredicateNode](../private.interface.TypePredicateNode/README.md)



#### ⚙ createTypeReferenceNode(typeName: `string` | [EntityName](../private.type.EntityName/README.md), typeArguments?: readonly [TypeNode](../private.interface.TypeNode/README.md)\[]): [TypeReferenceNode](../private.interface.TypeReferenceNode/README.md)



#### ⚙ updateTypeReferenceNode(node: [TypeReferenceNode](../private.interface.TypeReferenceNode/README.md), typeName: [EntityName](../private.type.EntityName/README.md), typeArguments: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeNode](../private.interface.TypeNode/README.md)> | `undefined`): [TypeReferenceNode](../private.interface.TypeReferenceNode/README.md)



#### ⚙ createFunctionTypeNode(typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md)): [FunctionTypeNode](../private.interface.FunctionTypeNode/README.md)



#### ⚙ updateFunctionTypeNode(node: [FunctionTypeNode](../private.interface.FunctionTypeNode/README.md), typeParameters: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../private.interface.NodeArray/README.md)\<[ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)>, type: [TypeNode](../private.interface.TypeNode/README.md)): [FunctionTypeNode](../private.interface.FunctionTypeNode/README.md)



#### ⚙ createConstructorTypeNode(modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md)): [ConstructorTypeNode](../private.interface.ConstructorTypeNode/README.md)



#### ⚙ updateConstructorTypeNode(node: [ConstructorTypeNode](../private.interface.ConstructorTypeNode/README.md), modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, typeParameters: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)> | `undefined`, parameters: [NodeArray](../private.interface.NodeArray/README.md)\<[ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)>, type: [TypeNode](../private.interface.TypeNode/README.md)): [ConstructorTypeNode](../private.interface.ConstructorTypeNode/README.md)



#### ⚙ createTypeQueryNode(exprName: [EntityName](../private.type.EntityName/README.md), typeArguments?: readonly [TypeNode](../private.interface.TypeNode/README.md)\[]): [TypeQueryNode](../private.interface.TypeQueryNode/README.md)



#### ⚙ updateTypeQueryNode(node: [TypeQueryNode](../private.interface.TypeQueryNode/README.md), exprName: [EntityName](../private.type.EntityName/README.md), typeArguments?: readonly [TypeNode](../private.interface.TypeNode/README.md)\[]): [TypeQueryNode](../private.interface.TypeQueryNode/README.md)



#### ⚙ createTypeLiteralNode(members: readonly [TypeElement](../private.interface.TypeElement/README.md)\[] | `undefined`): [TypeLiteralNode](../private.interface.TypeLiteralNode/README.md)



#### ⚙ updateTypeLiteralNode(node: [TypeLiteralNode](../private.interface.TypeLiteralNode/README.md), members: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeElement](../private.interface.TypeElement/README.md)>): [TypeLiteralNode](../private.interface.TypeLiteralNode/README.md)



#### ⚙ createArrayTypeNode(elementType: [TypeNode](../private.interface.TypeNode/README.md)): [ArrayTypeNode](../private.interface.ArrayTypeNode/README.md)



#### ⚙ updateArrayTypeNode(node: [ArrayTypeNode](../private.interface.ArrayTypeNode/README.md), elementType: [TypeNode](../private.interface.TypeNode/README.md)): [ArrayTypeNode](../private.interface.ArrayTypeNode/README.md)



#### ⚙ createTupleTypeNode(elements: readonly ([TypeNode](../private.interface.TypeNode/README.md) | [NamedTupleMember](../private.interface.NamedTupleMember/README.md))\[]): [TupleTypeNode](../private.interface.TupleTypeNode/README.md)



#### ⚙ updateTupleTypeNode(node: [TupleTypeNode](../private.interface.TupleTypeNode/README.md), elements: readonly ([TypeNode](../private.interface.TypeNode/README.md) | [NamedTupleMember](../private.interface.NamedTupleMember/README.md))\[]): [TupleTypeNode](../private.interface.TupleTypeNode/README.md)



#### ⚙ createNamedTupleMember(dotDotDotToken: [DotDotDotToken](../private.type.DotDotDotToken/README.md) | `undefined`, name: [Identifier](../private.interface.Identifier/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md)): [NamedTupleMember](../private.interface.NamedTupleMember/README.md)



#### ⚙ updateNamedTupleMember(node: [NamedTupleMember](../private.interface.NamedTupleMember/README.md), dotDotDotToken: [DotDotDotToken](../private.type.DotDotDotToken/README.md) | `undefined`, name: [Identifier](../private.interface.Identifier/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md)): [NamedTupleMember](../private.interface.NamedTupleMember/README.md)



#### ⚙ createOptionalTypeNode(type: [TypeNode](../private.interface.TypeNode/README.md)): [OptionalTypeNode](../private.interface.OptionalTypeNode/README.md)



#### ⚙ updateOptionalTypeNode(node: [OptionalTypeNode](../private.interface.OptionalTypeNode/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [OptionalTypeNode](../private.interface.OptionalTypeNode/README.md)



#### ⚙ createRestTypeNode(type: [TypeNode](../private.interface.TypeNode/README.md)): [RestTypeNode](../private.interface.RestTypeNode/README.md)



#### ⚙ updateRestTypeNode(node: [RestTypeNode](../private.interface.RestTypeNode/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [RestTypeNode](../private.interface.RestTypeNode/README.md)



#### ⚙ createUnionTypeNode(types: readonly [TypeNode](../private.interface.TypeNode/README.md)\[]): [UnionTypeNode](../private.interface.UnionTypeNode/README.md)



#### ⚙ updateUnionTypeNode(node: [UnionTypeNode](../private.interface.UnionTypeNode/README.md), types: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeNode](../private.interface.TypeNode/README.md)>): [UnionTypeNode](../private.interface.UnionTypeNode/README.md)



#### ⚙ createIntersectionTypeNode(types: readonly [TypeNode](../private.interface.TypeNode/README.md)\[]): [IntersectionTypeNode](../private.interface.IntersectionTypeNode/README.md)



#### ⚙ updateIntersectionTypeNode(node: [IntersectionTypeNode](../private.interface.IntersectionTypeNode/README.md), types: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeNode](../private.interface.TypeNode/README.md)>): [IntersectionTypeNode](../private.interface.IntersectionTypeNode/README.md)



#### ⚙ createConditionalTypeNode(checkType: [TypeNode](../private.interface.TypeNode/README.md), extendsType: [TypeNode](../private.interface.TypeNode/README.md), trueType: [TypeNode](../private.interface.TypeNode/README.md), falseType: [TypeNode](../private.interface.TypeNode/README.md)): [ConditionalTypeNode](../private.interface.ConditionalTypeNode/README.md)



#### ⚙ updateConditionalTypeNode(node: [ConditionalTypeNode](../private.interface.ConditionalTypeNode/README.md), checkType: [TypeNode](../private.interface.TypeNode/README.md), extendsType: [TypeNode](../private.interface.TypeNode/README.md), trueType: [TypeNode](../private.interface.TypeNode/README.md), falseType: [TypeNode](../private.interface.TypeNode/README.md)): [ConditionalTypeNode](../private.interface.ConditionalTypeNode/README.md)



#### ⚙ createInferTypeNode(typeParameter: [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)): [InferTypeNode](../private.interface.InferTypeNode/README.md)



#### ⚙ updateInferTypeNode(node: [InferTypeNode](../private.interface.InferTypeNode/README.md), typeParameter: [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)): [InferTypeNode](../private.interface.InferTypeNode/README.md)



#### ⚙ createImportTypeNode(argument: [TypeNode](../private.interface.TypeNode/README.md), attributes?: [ImportAttributes](../private.interface.ImportAttributes/README.md), qualifier?: [EntityName](../private.type.EntityName/README.md), typeArguments?: readonly [TypeNode](../private.interface.TypeNode/README.md)\[], isTypeOf?: `boolean`): [ImportTypeNode](../private.interface.ImportTypeNode/README.md)



#### ⚙ updateImportTypeNode(node: [ImportTypeNode](../private.interface.ImportTypeNode/README.md), argument: [TypeNode](../private.interface.TypeNode/README.md), attributes: [ImportAttributes](../private.interface.ImportAttributes/README.md) | `undefined`, qualifier: [EntityName](../private.type.EntityName/README.md) | `undefined`, typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, isTypeOf?: `boolean`): [ImportTypeNode](../private.interface.ImportTypeNode/README.md)



#### ⚙ createParenthesizedType(type: [TypeNode](../private.interface.TypeNode/README.md)): [ParenthesizedTypeNode](../private.interface.ParenthesizedTypeNode/README.md)



#### ⚙ updateParenthesizedType(node: [ParenthesizedTypeNode](../private.interface.ParenthesizedTypeNode/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [ParenthesizedTypeNode](../private.interface.ParenthesizedTypeNode/README.md)



#### ⚙ createThisTypeNode(): [ThisTypeNode](../private.interface.ThisTypeNode/README.md)



#### ⚙ createTypeOperatorNode(operator: [SyntaxKind.KeyOfKeyword](../private.enum.SyntaxKind/README.md#keyofkeyword--143) | [SyntaxKind.UniqueKeyword](../private.enum.SyntaxKind/README.md#uniquekeyword--158) | [SyntaxKind.ReadonlyKeyword](../private.enum.SyntaxKind/README.md#readonlykeyword--148), type: [TypeNode](../private.interface.TypeNode/README.md)): [TypeOperatorNode](../private.interface.TypeOperatorNode/README.md)



#### ⚙ updateTypeOperatorNode(node: [TypeOperatorNode](../private.interface.TypeOperatorNode/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [TypeOperatorNode](../private.interface.TypeOperatorNode/README.md)



#### ⚙ createIndexedAccessTypeNode(objectType: [TypeNode](../private.interface.TypeNode/README.md), indexType: [TypeNode](../private.interface.TypeNode/README.md)): [IndexedAccessTypeNode](../private.interface.IndexedAccessTypeNode/README.md)



#### ⚙ updateIndexedAccessTypeNode(node: [IndexedAccessTypeNode](../private.interface.IndexedAccessTypeNode/README.md), objectType: [TypeNode](../private.interface.TypeNode/README.md), indexType: [TypeNode](../private.interface.TypeNode/README.md)): [IndexedAccessTypeNode](../private.interface.IndexedAccessTypeNode/README.md)



#### ⚙ createMappedTypeNode(readonlyToken: [ReadonlyKeyword](../private.type.ReadonlyKeyword/README.md) | [PlusToken](../private.type.PlusToken/README.md) | [MinusToken](../private.type.MinusToken/README.md) | `undefined`, typeParameter: [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md), nameType: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | [PlusToken](../private.type.PlusToken/README.md) | [MinusToken](../private.type.MinusToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, members: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeElement](../private.interface.TypeElement/README.md)> | `undefined`): [MappedTypeNode](../private.interface.MappedTypeNode/README.md)



#### ⚙ updateMappedTypeNode(node: [MappedTypeNode](../private.interface.MappedTypeNode/README.md), readonlyToken: [ReadonlyKeyword](../private.type.ReadonlyKeyword/README.md) | [PlusToken](../private.type.PlusToken/README.md) | [MinusToken](../private.type.MinusToken/README.md) | `undefined`, typeParameter: [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md), nameType: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | [PlusToken](../private.type.PlusToken/README.md) | [MinusToken](../private.type.MinusToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, members: [NodeArray](../private.interface.NodeArray/README.md)\<[TypeElement](../private.interface.TypeElement/README.md)> | `undefined`): [MappedTypeNode](../private.interface.MappedTypeNode/README.md)



#### ⚙ createLiteralTypeNode(literal: [LiteralTypeNode](../private.interface.LiteralTypeNode/README.md)\[<mark>"literal"</mark>]): [LiteralTypeNode](../private.interface.LiteralTypeNode/README.md)



#### ⚙ updateLiteralTypeNode(node: [LiteralTypeNode](../private.interface.LiteralTypeNode/README.md), literal: [LiteralTypeNode](../private.interface.LiteralTypeNode/README.md)\[<mark>"literal"</mark>]): [LiteralTypeNode](../private.interface.LiteralTypeNode/README.md)



#### ⚙ createTemplateLiteralType(head: [TemplateHead](../private.interface.TemplateHead/README.md), templateSpans: readonly [TemplateLiteralTypeSpan](../private.interface.TemplateLiteralTypeSpan/README.md)\[]): [TemplateLiteralTypeNode](../private.interface.TemplateLiteralTypeNode/README.md)



#### ⚙ updateTemplateLiteralType(node: [TemplateLiteralTypeNode](../private.interface.TemplateLiteralTypeNode/README.md), head: [TemplateHead](../private.interface.TemplateHead/README.md), templateSpans: readonly [TemplateLiteralTypeSpan](../private.interface.TemplateLiteralTypeSpan/README.md)\[]): [TemplateLiteralTypeNode](../private.interface.TemplateLiteralTypeNode/README.md)



#### ⚙ createObjectBindingPattern(elements: readonly [BindingElement](../private.interface.BindingElement/README.md)\[]): [ObjectBindingPattern](../private.interface.ObjectBindingPattern/README.md)



#### ⚙ updateObjectBindingPattern(node: [ObjectBindingPattern](../private.interface.ObjectBindingPattern/README.md), elements: readonly [BindingElement](../private.interface.BindingElement/README.md)\[]): [ObjectBindingPattern](../private.interface.ObjectBindingPattern/README.md)



#### ⚙ createArrayBindingPattern(elements: readonly [ArrayBindingElement](../private.type.ArrayBindingElement/README.md)\[]): [ArrayBindingPattern](../private.interface.ArrayBindingPattern/README.md)



#### ⚙ updateArrayBindingPattern(node: [ArrayBindingPattern](../private.interface.ArrayBindingPattern/README.md), elements: readonly [ArrayBindingElement](../private.type.ArrayBindingElement/README.md)\[]): [ArrayBindingPattern](../private.interface.ArrayBindingPattern/README.md)



#### ⚙ createBindingElement(dotDotDotToken: [DotDotDotToken](../private.type.DotDotDotToken/README.md) | `undefined`, propertyName: `string` | [PropertyName](../private.type.PropertyName/README.md) | `undefined`, name: `string` | [BindingName](../private.type.BindingName/README.md), initializer?: [Expression](../private.interface.Expression/README.md)): [BindingElement](../private.interface.BindingElement/README.md)



#### ⚙ updateBindingElement(node: [BindingElement](../private.interface.BindingElement/README.md), dotDotDotToken: [DotDotDotToken](../private.type.DotDotDotToken/README.md) | `undefined`, propertyName: [PropertyName](../private.type.PropertyName/README.md) | `undefined`, name: [BindingName](../private.type.BindingName/README.md), initializer: [Expression](../private.interface.Expression/README.md) | `undefined`): [BindingElement](../private.interface.BindingElement/README.md)



#### ⚙ createArrayLiteralExpression(elements?: readonly [Expression](../private.interface.Expression/README.md)\[], multiLine?: `boolean`): [ArrayLiteralExpression](../private.interface.ArrayLiteralExpression/README.md)



#### ⚙ updateArrayLiteralExpression(node: [ArrayLiteralExpression](../private.interface.ArrayLiteralExpression/README.md), elements: readonly [Expression](../private.interface.Expression/README.md)\[]): [ArrayLiteralExpression](../private.interface.ArrayLiteralExpression/README.md)



#### ⚙ createObjectLiteralExpression(properties?: readonly [ObjectLiteralElementLike](../private.type.ObjectLiteralElementLike/README.md)\[], multiLine?: `boolean`): [ObjectLiteralExpression](../private.interface.ObjectLiteralExpression/README.md)



#### ⚙ updateObjectLiteralExpression(node: [ObjectLiteralExpression](../private.interface.ObjectLiteralExpression/README.md), properties: readonly [ObjectLiteralElementLike](../private.type.ObjectLiteralElementLike/README.md)\[]): [ObjectLiteralExpression](../private.interface.ObjectLiteralExpression/README.md)



#### ⚙ createPropertyAccessExpression(expression: [Expression](../private.interface.Expression/README.md), name: `string` | [MemberName](../private.type.MemberName/README.md)): [PropertyAccessExpression](../private.interface.PropertyAccessExpression/README.md)



#### ⚙ updatePropertyAccessExpression(node: [PropertyAccessExpression](../private.interface.PropertyAccessExpression/README.md), expression: [Expression](../private.interface.Expression/README.md), name: [MemberName](../private.type.MemberName/README.md)): [PropertyAccessExpression](../private.interface.PropertyAccessExpression/README.md)



#### ⚙ createPropertyAccessChain(expression: [Expression](../private.interface.Expression/README.md), questionDotToken: [QuestionDotToken](../private.type.QuestionDotToken/README.md) | `undefined`, name: `string` | [MemberName](../private.type.MemberName/README.md)): [PropertyAccessChain](../private.interface.PropertyAccessChain/README.md)



#### ⚙ updatePropertyAccessChain(node: [PropertyAccessChain](../private.interface.PropertyAccessChain/README.md), expression: [Expression](../private.interface.Expression/README.md), questionDotToken: [QuestionDotToken](../private.type.QuestionDotToken/README.md) | `undefined`, name: [MemberName](../private.type.MemberName/README.md)): [PropertyAccessChain](../private.interface.PropertyAccessChain/README.md)



#### ⚙ createElementAccessExpression(expression: [Expression](../private.interface.Expression/README.md), index: `number` | [Expression](../private.interface.Expression/README.md)): [ElementAccessExpression](../private.interface.ElementAccessExpression/README.md)



#### ⚙ updateElementAccessExpression(node: [ElementAccessExpression](../private.interface.ElementAccessExpression/README.md), expression: [Expression](../private.interface.Expression/README.md), argumentExpression: [Expression](../private.interface.Expression/README.md)): [ElementAccessExpression](../private.interface.ElementAccessExpression/README.md)



#### ⚙ createElementAccessChain(expression: [Expression](../private.interface.Expression/README.md), questionDotToken: [QuestionDotToken](../private.type.QuestionDotToken/README.md) | `undefined`, index: `number` | [Expression](../private.interface.Expression/README.md)): [ElementAccessChain](../private.interface.ElementAccessChain/README.md)



#### ⚙ updateElementAccessChain(node: [ElementAccessChain](../private.interface.ElementAccessChain/README.md), expression: [Expression](../private.interface.Expression/README.md), questionDotToken: [QuestionDotToken](../private.type.QuestionDotToken/README.md) | `undefined`, argumentExpression: [Expression](../private.interface.Expression/README.md)): [ElementAccessChain](../private.interface.ElementAccessChain/README.md)



#### ⚙ createCallExpression(expression: [Expression](../private.interface.Expression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../private.interface.Expression/README.md)\[] | `undefined`): [CallExpression](../private.interface.CallExpression/README.md)



#### ⚙ updateCallExpression(node: [CallExpression](../private.interface.CallExpression/README.md), expression: [Expression](../private.interface.Expression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../private.interface.Expression/README.md)\[]): [CallExpression](../private.interface.CallExpression/README.md)



#### ⚙ createCallChain(expression: [Expression](../private.interface.Expression/README.md), questionDotToken: [QuestionDotToken](../private.type.QuestionDotToken/README.md) | `undefined`, typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../private.interface.Expression/README.md)\[] | `undefined`): [CallChain](../private.interface.CallChain/README.md)



#### ⚙ updateCallChain(node: [CallChain](../private.interface.CallChain/README.md), expression: [Expression](../private.interface.Expression/README.md), questionDotToken: [QuestionDotToken](../private.type.QuestionDotToken/README.md) | `undefined`, typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../private.interface.Expression/README.md)\[]): [CallChain](../private.interface.CallChain/README.md)



#### ⚙ createNewExpression(expression: [Expression](../private.interface.Expression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../private.interface.Expression/README.md)\[] | `undefined`): [NewExpression](../private.interface.NewExpression/README.md)



#### ⚙ updateNewExpression(node: [NewExpression](../private.interface.NewExpression/README.md), expression: [Expression](../private.interface.Expression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, argumentsArray: readonly [Expression](../private.interface.Expression/README.md)\[] | `undefined`): [NewExpression](../private.interface.NewExpression/README.md)



#### ⚙ createTaggedTemplateExpression(tag: [Expression](../private.interface.Expression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, template: [TemplateLiteral](../private.type.TemplateLiteral/README.md)): [TaggedTemplateExpression](../private.interface.TaggedTemplateExpression/README.md)



#### ⚙ updateTaggedTemplateExpression(node: [TaggedTemplateExpression](../private.interface.TaggedTemplateExpression/README.md), tag: [Expression](../private.interface.Expression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, template: [TemplateLiteral](../private.type.TemplateLiteral/README.md)): [TaggedTemplateExpression](../private.interface.TaggedTemplateExpression/README.md)



#### ⚙ createTypeAssertion(type: [TypeNode](../private.interface.TypeNode/README.md), expression: [Expression](../private.interface.Expression/README.md)): [TypeAssertion](../private.interface.TypeAssertion/README.md)



#### ⚙ updateTypeAssertion(node: [TypeAssertion](../private.interface.TypeAssertion/README.md), type: [TypeNode](../private.interface.TypeNode/README.md), expression: [Expression](../private.interface.Expression/README.md)): [TypeAssertion](../private.interface.TypeAssertion/README.md)



#### ⚙ createParenthesizedExpression(expression: [Expression](../private.interface.Expression/README.md)): [ParenthesizedExpression](../private.interface.ParenthesizedExpression/README.md)



#### ⚙ updateParenthesizedExpression(node: [ParenthesizedExpression](../private.interface.ParenthesizedExpression/README.md), expression: [Expression](../private.interface.Expression/README.md)): [ParenthesizedExpression](../private.interface.ParenthesizedExpression/README.md)



#### ⚙ createFunctionExpression(modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../private.type.AsteriskToken/README.md) | `undefined`, name: `string` | [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[] | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, body: [Block](../private.interface.Block/README.md)): [FunctionExpression](../private.interface.FunctionExpression/README.md)



#### ⚙ updateFunctionExpression(node: [FunctionExpression](../private.interface.FunctionExpression/README.md), modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../private.type.AsteriskToken/README.md) | `undefined`, name: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, body: [Block](../private.interface.Block/README.md)): [FunctionExpression](../private.interface.FunctionExpression/README.md)



#### ⚙ createArrowFunction(modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, equalsGreaterThanToken: [EqualsGreaterThanToken](../private.type.EqualsGreaterThanToken/README.md) | `undefined`, body: [ConciseBody](../private.type.ConciseBody/README.md)): [ArrowFunction](../private.interface.ArrowFunction/README.md)



#### ⚙ updateArrowFunction(node: [ArrowFunction](../private.interface.ArrowFunction/README.md), modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, equalsGreaterThanToken: [EqualsGreaterThanToken](../private.type.EqualsGreaterThanToken/README.md), body: [ConciseBody](../private.type.ConciseBody/README.md)): [ArrowFunction](../private.interface.ArrowFunction/README.md)



#### ⚙ createDeleteExpression(expression: [Expression](../private.interface.Expression/README.md)): [DeleteExpression](../private.interface.DeleteExpression/README.md)



#### ⚙ updateDeleteExpression(node: [DeleteExpression](../private.interface.DeleteExpression/README.md), expression: [Expression](../private.interface.Expression/README.md)): [DeleteExpression](../private.interface.DeleteExpression/README.md)



#### ⚙ createTypeOfExpression(expression: [Expression](../private.interface.Expression/README.md)): [TypeOfExpression](../private.interface.TypeOfExpression/README.md)



#### ⚙ updateTypeOfExpression(node: [TypeOfExpression](../private.interface.TypeOfExpression/README.md), expression: [Expression](../private.interface.Expression/README.md)): [TypeOfExpression](../private.interface.TypeOfExpression/README.md)



#### ⚙ createVoidExpression(expression: [Expression](../private.interface.Expression/README.md)): [VoidExpression](../private.interface.VoidExpression/README.md)



#### ⚙ updateVoidExpression(node: [VoidExpression](../private.interface.VoidExpression/README.md), expression: [Expression](../private.interface.Expression/README.md)): [VoidExpression](../private.interface.VoidExpression/README.md)



#### ⚙ createAwaitExpression(expression: [Expression](../private.interface.Expression/README.md)): [AwaitExpression](../private.interface.AwaitExpression/README.md)



#### ⚙ updateAwaitExpression(node: [AwaitExpression](../private.interface.AwaitExpression/README.md), expression: [Expression](../private.interface.Expression/README.md)): [AwaitExpression](../private.interface.AwaitExpression/README.md)



#### ⚙ createPrefixUnaryExpression(operator: [PrefixUnaryOperator](../private.type.PrefixUnaryOperator/README.md), operand: [Expression](../private.interface.Expression/README.md)): [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md)



#### ⚙ updatePrefixUnaryExpression(node: [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md), operand: [Expression](../private.interface.Expression/README.md)): [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md)



#### ⚙ createPostfixUnaryExpression(operand: [Expression](../private.interface.Expression/README.md), operator: [PostfixUnaryOperator](../private.type.PostfixUnaryOperator/README.md)): [PostfixUnaryExpression](../private.interface.PostfixUnaryExpression/README.md)



#### ⚙ updatePostfixUnaryExpression(node: [PostfixUnaryExpression](../private.interface.PostfixUnaryExpression/README.md), operand: [Expression](../private.interface.Expression/README.md)): [PostfixUnaryExpression](../private.interface.PostfixUnaryExpression/README.md)



#### ⚙ createBinaryExpression(left: [Expression](../private.interface.Expression/README.md), operator: [BinaryOperator](../private.type.BinaryOperator/README.md) | [BinaryOperatorToken](../private.type.BinaryOperatorToken/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ updateBinaryExpression(node: [BinaryExpression](../private.interface.BinaryExpression/README.md), left: [Expression](../private.interface.Expression/README.md), operator: [BinaryOperator](../private.type.BinaryOperator/README.md) | [BinaryOperatorToken](../private.type.BinaryOperatorToken/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createConditionalExpression(condition: [Expression](../private.interface.Expression/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md) | `undefined`, whenTrue: [Expression](../private.interface.Expression/README.md), colonToken: [ColonToken](../private.type.ColonToken/README.md) | `undefined`, whenFalse: [Expression](../private.interface.Expression/README.md)): [ConditionalExpression](../private.interface.ConditionalExpression/README.md)



#### ⚙ updateConditionalExpression(node: [ConditionalExpression](../private.interface.ConditionalExpression/README.md), condition: [Expression](../private.interface.Expression/README.md), questionToken: [QuestionToken](../private.type.QuestionToken/README.md), whenTrue: [Expression](../private.interface.Expression/README.md), colonToken: [ColonToken](../private.type.ColonToken/README.md), whenFalse: [Expression](../private.interface.Expression/README.md)): [ConditionalExpression](../private.interface.ConditionalExpression/README.md)



#### ⚙ createTemplateExpression(head: [TemplateHead](../private.interface.TemplateHead/README.md), templateSpans: readonly [TemplateSpan](../private.interface.TemplateSpan/README.md)\[]): [TemplateExpression](../private.interface.TemplateExpression/README.md)



#### ⚙ updateTemplateExpression(node: [TemplateExpression](../private.interface.TemplateExpression/README.md), head: [TemplateHead](../private.interface.TemplateHead/README.md), templateSpans: readonly [TemplateSpan](../private.interface.TemplateSpan/README.md)\[]): [TemplateExpression](../private.interface.TemplateExpression/README.md)



#### ⚙ createTemplateHead(text: `string`, rawText?: `string`, templateFlags?: [TokenFlags](../private.enum.TokenFlags/README.md)): [TemplateHead](../private.interface.TemplateHead/README.md)



#### ⚙ createTemplateHead(text: `string` | `undefined`, rawText: `string`, templateFlags?: [TokenFlags](../private.enum.TokenFlags/README.md)): [TemplateHead](../private.interface.TemplateHead/README.md)



#### ⚙ createTemplateMiddle(text: `string`, rawText?: `string`, templateFlags?: [TokenFlags](../private.enum.TokenFlags/README.md)): [TemplateMiddle](../private.interface.TemplateMiddle/README.md)



#### ⚙ createTemplateMiddle(text: `string` | `undefined`, rawText: `string`, templateFlags?: [TokenFlags](../private.enum.TokenFlags/README.md)): [TemplateMiddle](../private.interface.TemplateMiddle/README.md)



#### ⚙ createTemplateTail(text: `string`, rawText?: `string`, templateFlags?: [TokenFlags](../private.enum.TokenFlags/README.md)): [TemplateTail](../private.interface.TemplateTail/README.md)



#### ⚙ createTemplateTail(text: `string` | `undefined`, rawText: `string`, templateFlags?: [TokenFlags](../private.enum.TokenFlags/README.md)): [TemplateTail](../private.interface.TemplateTail/README.md)



#### ⚙ createNoSubstitutionTemplateLiteral(text: `string`, rawText?: `string`): [NoSubstitutionTemplateLiteral](../private.interface.NoSubstitutionTemplateLiteral/README.md)



#### ⚙ createNoSubstitutionTemplateLiteral(text: `string` | `undefined`, rawText: `string`): [NoSubstitutionTemplateLiteral](../private.interface.NoSubstitutionTemplateLiteral/README.md)



#### ⚙ createYieldExpression(asteriskToken: [AsteriskToken](../private.type.AsteriskToken/README.md), expression: [Expression](../private.interface.Expression/README.md)): [YieldExpression](../private.interface.YieldExpression/README.md)



#### ⚙ createYieldExpression(asteriskToken: `undefined`, expression: [Expression](../private.interface.Expression/README.md) | `undefined`): [YieldExpression](../private.interface.YieldExpression/README.md)



#### ⚙ updateYieldExpression(node: [YieldExpression](../private.interface.YieldExpression/README.md), asteriskToken: [AsteriskToken](../private.type.AsteriskToken/README.md) | `undefined`, expression: [Expression](../private.interface.Expression/README.md) | `undefined`): [YieldExpression](../private.interface.YieldExpression/README.md)



#### ⚙ createSpreadElement(expression: [Expression](../private.interface.Expression/README.md)): [SpreadElement](../private.interface.SpreadElement/README.md)



#### ⚙ updateSpreadElement(node: [SpreadElement](../private.interface.SpreadElement/README.md), expression: [Expression](../private.interface.Expression/README.md)): [SpreadElement](../private.interface.SpreadElement/README.md)



#### ⚙ createClassExpression(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../private.interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [ClassElement](../private.interface.ClassElement/README.md)\[]): [ClassExpression](../private.interface.ClassExpression/README.md)



#### ⚙ updateClassExpression(node: [ClassExpression](../private.interface.ClassExpression/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../private.interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [ClassElement](../private.interface.ClassElement/README.md)\[]): [ClassExpression](../private.interface.ClassExpression/README.md)



#### ⚙ createOmittedExpression(): [OmittedExpression](../private.interface.OmittedExpression/README.md)



#### ⚙ createExpressionWithTypeArguments(expression: [Expression](../private.interface.Expression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`): [ExpressionWithTypeArguments](../private.interface.ExpressionWithTypeArguments/README.md)



#### ⚙ updateExpressionWithTypeArguments(node: [ExpressionWithTypeArguments](../private.interface.ExpressionWithTypeArguments/README.md), expression: [Expression](../private.interface.Expression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`): [ExpressionWithTypeArguments](../private.interface.ExpressionWithTypeArguments/README.md)



#### ⚙ createAsExpression(expression: [Expression](../private.interface.Expression/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [AsExpression](../private.interface.AsExpression/README.md)



#### ⚙ updateAsExpression(node: [AsExpression](../private.interface.AsExpression/README.md), expression: [Expression](../private.interface.Expression/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [AsExpression](../private.interface.AsExpression/README.md)



#### ⚙ createNonNullExpression(expression: [Expression](../private.interface.Expression/README.md)): [NonNullExpression](../private.interface.NonNullExpression/README.md)



#### ⚙ updateNonNullExpression(node: [NonNullExpression](../private.interface.NonNullExpression/README.md), expression: [Expression](../private.interface.Expression/README.md)): [NonNullExpression](../private.interface.NonNullExpression/README.md)



#### ⚙ createNonNullChain(expression: [Expression](../private.interface.Expression/README.md)): [NonNullChain](../private.interface.NonNullChain/README.md)



#### ⚙ updateNonNullChain(node: [NonNullChain](../private.interface.NonNullChain/README.md), expression: [Expression](../private.interface.Expression/README.md)): [NonNullChain](../private.interface.NonNullChain/README.md)



#### ⚙ createMetaProperty(keywordToken: [MetaProperty](../private.interface.MetaProperty/README.md)\[<mark>"keywordToken"</mark>], name: [Identifier](../private.interface.Identifier/README.md)): [MetaProperty](../private.interface.MetaProperty/README.md)



#### ⚙ updateMetaProperty(node: [MetaProperty](../private.interface.MetaProperty/README.md), name: [Identifier](../private.interface.Identifier/README.md)): [MetaProperty](../private.interface.MetaProperty/README.md)



#### ⚙ createSatisfiesExpression(expression: [Expression](../private.interface.Expression/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [SatisfiesExpression](../private.interface.SatisfiesExpression/README.md)



#### ⚙ updateSatisfiesExpression(node: [SatisfiesExpression](../private.interface.SatisfiesExpression/README.md), expression: [Expression](../private.interface.Expression/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [SatisfiesExpression](../private.interface.SatisfiesExpression/README.md)



#### ⚙ createTemplateSpan(expression: [Expression](../private.interface.Expression/README.md), literal: [TemplateMiddle](../private.interface.TemplateMiddle/README.md) | [TemplateTail](../private.interface.TemplateTail/README.md)): [TemplateSpan](../private.interface.TemplateSpan/README.md)



#### ⚙ updateTemplateSpan(node: [TemplateSpan](../private.interface.TemplateSpan/README.md), expression: [Expression](../private.interface.Expression/README.md), literal: [TemplateMiddle](../private.interface.TemplateMiddle/README.md) | [TemplateTail](../private.interface.TemplateTail/README.md)): [TemplateSpan](../private.interface.TemplateSpan/README.md)



#### ⚙ createSemicolonClassElement(): [SemicolonClassElement](../private.interface.SemicolonClassElement/README.md)



#### ⚙ createBlock(statements: readonly [Statement](../private.interface.Statement/README.md)\[], multiLine?: `boolean`): [Block](../private.interface.Block/README.md)



#### ⚙ updateBlock(node: [Block](../private.interface.Block/README.md), statements: readonly [Statement](../private.interface.Statement/README.md)\[]): [Block](../private.interface.Block/README.md)



#### ⚙ createVariableStatement(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, declarationList: [VariableDeclarationList](../private.interface.VariableDeclarationList/README.md) | readonly [VariableDeclaration](../private.interface.VariableDeclaration/README.md)\[]): [VariableStatement](../private.interface.VariableStatement/README.md)



#### ⚙ updateVariableStatement(node: [VariableStatement](../private.interface.VariableStatement/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, declarationList: [VariableDeclarationList](../private.interface.VariableDeclarationList/README.md)): [VariableStatement](../private.interface.VariableStatement/README.md)



#### ⚙ createEmptyStatement(): [EmptyStatement](../private.interface.EmptyStatement/README.md)



#### ⚙ createExpressionStatement(expression: [Expression](../private.interface.Expression/README.md)): [ExpressionStatement](../private.interface.ExpressionStatement/README.md)



#### ⚙ updateExpressionStatement(node: [ExpressionStatement](../private.interface.ExpressionStatement/README.md), expression: [Expression](../private.interface.Expression/README.md)): [ExpressionStatement](../private.interface.ExpressionStatement/README.md)



#### ⚙ createIfStatement(expression: [Expression](../private.interface.Expression/README.md), thenStatement: [Statement](../private.interface.Statement/README.md), elseStatement?: [Statement](../private.interface.Statement/README.md)): [IfStatement](../private.interface.IfStatement/README.md)



#### ⚙ updateIfStatement(node: [IfStatement](../private.interface.IfStatement/README.md), expression: [Expression](../private.interface.Expression/README.md), thenStatement: [Statement](../private.interface.Statement/README.md), elseStatement: [Statement](../private.interface.Statement/README.md) | `undefined`): [IfStatement](../private.interface.IfStatement/README.md)



#### ⚙ createDoStatement(statement: [Statement](../private.interface.Statement/README.md), expression: [Expression](../private.interface.Expression/README.md)): [DoStatement](../private.interface.DoStatement/README.md)



#### ⚙ updateDoStatement(node: [DoStatement](../private.interface.DoStatement/README.md), statement: [Statement](../private.interface.Statement/README.md), expression: [Expression](../private.interface.Expression/README.md)): [DoStatement](../private.interface.DoStatement/README.md)



#### ⚙ createWhileStatement(expression: [Expression](../private.interface.Expression/README.md), statement: [Statement](../private.interface.Statement/README.md)): [WhileStatement](../private.interface.WhileStatement/README.md)



#### ⚙ updateWhileStatement(node: [WhileStatement](../private.interface.WhileStatement/README.md), expression: [Expression](../private.interface.Expression/README.md), statement: [Statement](../private.interface.Statement/README.md)): [WhileStatement](../private.interface.WhileStatement/README.md)



#### ⚙ createForStatement(initializer: [ForInitializer](../private.type.ForInitializer/README.md) | `undefined`, condition: [Expression](../private.interface.Expression/README.md) | `undefined`, incrementor: [Expression](../private.interface.Expression/README.md) | `undefined`, statement: [Statement](../private.interface.Statement/README.md)): [ForStatement](../private.interface.ForStatement/README.md)



#### ⚙ updateForStatement(node: [ForStatement](../private.interface.ForStatement/README.md), initializer: [ForInitializer](../private.type.ForInitializer/README.md) | `undefined`, condition: [Expression](../private.interface.Expression/README.md) | `undefined`, incrementor: [Expression](../private.interface.Expression/README.md) | `undefined`, statement: [Statement](../private.interface.Statement/README.md)): [ForStatement](../private.interface.ForStatement/README.md)



#### ⚙ createForInStatement(initializer: [ForInitializer](../private.type.ForInitializer/README.md), expression: [Expression](../private.interface.Expression/README.md), statement: [Statement](../private.interface.Statement/README.md)): [ForInStatement](../private.interface.ForInStatement/README.md)



#### ⚙ updateForInStatement(node: [ForInStatement](../private.interface.ForInStatement/README.md), initializer: [ForInitializer](../private.type.ForInitializer/README.md), expression: [Expression](../private.interface.Expression/README.md), statement: [Statement](../private.interface.Statement/README.md)): [ForInStatement](../private.interface.ForInStatement/README.md)



#### ⚙ createForOfStatement(awaitModifier: [AwaitKeyword](../private.type.AwaitKeyword/README.md) | `undefined`, initializer: [ForInitializer](../private.type.ForInitializer/README.md), expression: [Expression](../private.interface.Expression/README.md), statement: [Statement](../private.interface.Statement/README.md)): [ForOfStatement](../private.interface.ForOfStatement/README.md)



#### ⚙ updateForOfStatement(node: [ForOfStatement](../private.interface.ForOfStatement/README.md), awaitModifier: [AwaitKeyword](../private.type.AwaitKeyword/README.md) | `undefined`, initializer: [ForInitializer](../private.type.ForInitializer/README.md), expression: [Expression](../private.interface.Expression/README.md), statement: [Statement](../private.interface.Statement/README.md)): [ForOfStatement](../private.interface.ForOfStatement/README.md)



#### ⚙ createContinueStatement(label?: `string` | [Identifier](../private.interface.Identifier/README.md)): [ContinueStatement](../private.interface.ContinueStatement/README.md)



#### ⚙ updateContinueStatement(node: [ContinueStatement](../private.interface.ContinueStatement/README.md), label: [Identifier](../private.interface.Identifier/README.md) | `undefined`): [ContinueStatement](../private.interface.ContinueStatement/README.md)



#### ⚙ createBreakStatement(label?: `string` | [Identifier](../private.interface.Identifier/README.md)): [BreakStatement](../private.interface.BreakStatement/README.md)



#### ⚙ updateBreakStatement(node: [BreakStatement](../private.interface.BreakStatement/README.md), label: [Identifier](../private.interface.Identifier/README.md) | `undefined`): [BreakStatement](../private.interface.BreakStatement/README.md)



#### ⚙ createReturnStatement(expression?: [Expression](../private.interface.Expression/README.md)): [ReturnStatement](../private.interface.ReturnStatement/README.md)



#### ⚙ updateReturnStatement(node: [ReturnStatement](../private.interface.ReturnStatement/README.md), expression: [Expression](../private.interface.Expression/README.md) | `undefined`): [ReturnStatement](../private.interface.ReturnStatement/README.md)



#### ⚙ createWithStatement(expression: [Expression](../private.interface.Expression/README.md), statement: [Statement](../private.interface.Statement/README.md)): [WithStatement](../private.interface.WithStatement/README.md)



#### ⚙ updateWithStatement(node: [WithStatement](../private.interface.WithStatement/README.md), expression: [Expression](../private.interface.Expression/README.md), statement: [Statement](../private.interface.Statement/README.md)): [WithStatement](../private.interface.WithStatement/README.md)



#### ⚙ createSwitchStatement(expression: [Expression](../private.interface.Expression/README.md), caseBlock: [CaseBlock](../private.interface.CaseBlock/README.md)): [SwitchStatement](../private.interface.SwitchStatement/README.md)



#### ⚙ updateSwitchStatement(node: [SwitchStatement](../private.interface.SwitchStatement/README.md), expression: [Expression](../private.interface.Expression/README.md), caseBlock: [CaseBlock](../private.interface.CaseBlock/README.md)): [SwitchStatement](../private.interface.SwitchStatement/README.md)



#### ⚙ createLabeledStatement(label: `string` | [Identifier](../private.interface.Identifier/README.md), statement: [Statement](../private.interface.Statement/README.md)): [LabeledStatement](../private.interface.LabeledStatement/README.md)



#### ⚙ updateLabeledStatement(node: [LabeledStatement](../private.interface.LabeledStatement/README.md), label: [Identifier](../private.interface.Identifier/README.md), statement: [Statement](../private.interface.Statement/README.md)): [LabeledStatement](../private.interface.LabeledStatement/README.md)



#### ⚙ createThrowStatement(expression: [Expression](../private.interface.Expression/README.md)): [ThrowStatement](../private.interface.ThrowStatement/README.md)



#### ⚙ updateThrowStatement(node: [ThrowStatement](../private.interface.ThrowStatement/README.md), expression: [Expression](../private.interface.Expression/README.md)): [ThrowStatement](../private.interface.ThrowStatement/README.md)



#### ⚙ createTryStatement(tryBlock: [Block](../private.interface.Block/README.md), catchClause: [CatchClause](../private.interface.CatchClause/README.md) | `undefined`, finallyBlock: [Block](../private.interface.Block/README.md) | `undefined`): [TryStatement](../private.interface.TryStatement/README.md)



#### ⚙ updateTryStatement(node: [TryStatement](../private.interface.TryStatement/README.md), tryBlock: [Block](../private.interface.Block/README.md), catchClause: [CatchClause](../private.interface.CatchClause/README.md) | `undefined`, finallyBlock: [Block](../private.interface.Block/README.md) | `undefined`): [TryStatement](../private.interface.TryStatement/README.md)



#### ⚙ createDebuggerStatement(): [DebuggerStatement](../private.interface.DebuggerStatement/README.md)



#### ⚙ createVariableDeclaration(name: `string` | [BindingName](../private.type.BindingName/README.md), exclamationToken?: [ExclamationToken](../private.type.ExclamationToken/README.md), type?: [TypeNode](../private.interface.TypeNode/README.md), initializer?: [Expression](../private.interface.Expression/README.md)): [VariableDeclaration](../private.interface.VariableDeclaration/README.md)



#### ⚙ updateVariableDeclaration(node: [VariableDeclaration](../private.interface.VariableDeclaration/README.md), name: [BindingName](../private.type.BindingName/README.md), exclamationToken: [ExclamationToken](../private.type.ExclamationToken/README.md) | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, initializer: [Expression](../private.interface.Expression/README.md) | `undefined`): [VariableDeclaration](../private.interface.VariableDeclaration/README.md)



#### ⚙ createVariableDeclarationList(declarations: readonly [VariableDeclaration](../private.interface.VariableDeclaration/README.md)\[], flags?: [NodeFlags](../private.enum.NodeFlags/README.md)): [VariableDeclarationList](../private.interface.VariableDeclarationList/README.md)



#### ⚙ updateVariableDeclarationList(node: [VariableDeclarationList](../private.interface.VariableDeclarationList/README.md), declarations: readonly [VariableDeclaration](../private.interface.VariableDeclaration/README.md)\[]): [VariableDeclarationList](../private.interface.VariableDeclarationList/README.md)



#### ⚙ createFunctionDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../private.type.AsteriskToken/README.md) | `undefined`, name: `string` | [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, body: [Block](../private.interface.Block/README.md) | `undefined`): [FunctionDeclaration](../private.interface.FunctionDeclaration/README.md)



#### ⚙ updateFunctionDeclaration(node: [FunctionDeclaration](../private.interface.FunctionDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, asteriskToken: [AsteriskToken](../private.type.AsteriskToken/README.md) | `undefined`, name: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`, body: [Block](../private.interface.Block/README.md) | `undefined`): [FunctionDeclaration](../private.interface.FunctionDeclaration/README.md)



#### ⚙ createClassDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../private.interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [ClassElement](../private.interface.ClassElement/README.md)\[]): [ClassDeclaration](../private.interface.ClassDeclaration/README.md)



#### ⚙ updateClassDeclaration(node: [ClassDeclaration](../private.interface.ClassDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../private.interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [ClassElement](../private.interface.ClassElement/README.md)\[]): [ClassDeclaration](../private.interface.ClassDeclaration/README.md)



#### ⚙ createInterfaceDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../private.interface.Identifier/README.md), typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../private.interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [TypeElement](../private.interface.TypeElement/README.md)\[]): [InterfaceDeclaration](../private.interface.InterfaceDeclaration/README.md)



#### ⚙ updateInterfaceDeclaration(node: [InterfaceDeclaration](../private.interface.InterfaceDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../private.interface.Identifier/README.md), typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, heritageClauses: readonly [HeritageClause](../private.interface.HeritageClause/README.md)\[] | `undefined`, members: readonly [TypeElement](../private.interface.TypeElement/README.md)\[]): [InterfaceDeclaration](../private.interface.InterfaceDeclaration/README.md)



#### ⚙ createTypeAliasDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../private.interface.Identifier/README.md), typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md)): [TypeAliasDeclaration](../private.interface.TypeAliasDeclaration/README.md)



#### ⚙ updateTypeAliasDeclaration(node: [TypeAliasDeclaration](../private.interface.TypeAliasDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../private.interface.Identifier/README.md), typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[] | `undefined`, type: [TypeNode](../private.interface.TypeNode/README.md)): [TypeAliasDeclaration](../private.interface.TypeAliasDeclaration/README.md)



#### ⚙ createEnumDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: `string` | [Identifier](../private.interface.Identifier/README.md), members: readonly [EnumMember](../private.interface.EnumMember/README.md)\[]): [EnumDeclaration](../private.interface.EnumDeclaration/README.md)



#### ⚙ updateEnumDeclaration(node: [EnumDeclaration](../private.interface.EnumDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [Identifier](../private.interface.Identifier/README.md), members: readonly [EnumMember](../private.interface.EnumMember/README.md)\[]): [EnumDeclaration](../private.interface.EnumDeclaration/README.md)



#### ⚙ createModuleDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [ModuleName](../private.type.ModuleName/README.md), body: [ModuleBody](../private.type.ModuleBody/README.md) | `undefined`, flags?: [NodeFlags](../private.enum.NodeFlags/README.md)): [ModuleDeclaration](../private.interface.ModuleDeclaration/README.md)



#### ⚙ updateModuleDeclaration(node: [ModuleDeclaration](../private.interface.ModuleDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, name: [ModuleName](../private.type.ModuleName/README.md), body: [ModuleBody](../private.type.ModuleBody/README.md) | `undefined`): [ModuleDeclaration](../private.interface.ModuleDeclaration/README.md)



#### ⚙ createModuleBlock(statements: readonly [Statement](../private.interface.Statement/README.md)\[]): [ModuleBlock](../private.interface.ModuleBlock/README.md)



#### ⚙ updateModuleBlock(node: [ModuleBlock](../private.interface.ModuleBlock/README.md), statements: readonly [Statement](../private.interface.Statement/README.md)\[]): [ModuleBlock](../private.interface.ModuleBlock/README.md)



#### ⚙ createCaseBlock(clauses: readonly [CaseOrDefaultClause](../private.type.CaseOrDefaultClause/README.md)\[]): [CaseBlock](../private.interface.CaseBlock/README.md)



#### ⚙ updateCaseBlock(node: [CaseBlock](../private.interface.CaseBlock/README.md), clauses: readonly [CaseOrDefaultClause](../private.type.CaseOrDefaultClause/README.md)\[]): [CaseBlock](../private.interface.CaseBlock/README.md)



#### ⚙ createNamespaceExportDeclaration(name: `string` | [Identifier](../private.interface.Identifier/README.md)): [NamespaceExportDeclaration](../private.interface.NamespaceExportDeclaration/README.md)



#### ⚙ updateNamespaceExportDeclaration(node: [NamespaceExportDeclaration](../private.interface.NamespaceExportDeclaration/README.md), name: [Identifier](../private.interface.Identifier/README.md)): [NamespaceExportDeclaration](../private.interface.NamespaceExportDeclaration/README.md)



#### ⚙ createImportEqualsDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, isTypeOnly: `boolean`, name: `string` | [Identifier](../private.interface.Identifier/README.md), moduleReference: [ModuleReference](../private.type.ModuleReference/README.md)): [ImportEqualsDeclaration](../private.interface.ImportEqualsDeclaration/README.md)



#### ⚙ updateImportEqualsDeclaration(node: [ImportEqualsDeclaration](../private.interface.ImportEqualsDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, isTypeOnly: `boolean`, name: [Identifier](../private.interface.Identifier/README.md), moduleReference: [ModuleReference](../private.type.ModuleReference/README.md)): [ImportEqualsDeclaration](../private.interface.ImportEqualsDeclaration/README.md)



#### ⚙ createImportDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, importClause: [ImportClause](../private.interface.ImportClause/README.md) | `undefined`, moduleSpecifier: [Expression](../private.interface.Expression/README.md), attributes?: [ImportAttributes](../private.interface.ImportAttributes/README.md)): [ImportDeclaration](../private.interface.ImportDeclaration/README.md)



#### ⚙ updateImportDeclaration(node: [ImportDeclaration](../private.interface.ImportDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, importClause: [ImportClause](../private.interface.ImportClause/README.md) | `undefined`, moduleSpecifier: [Expression](../private.interface.Expression/README.md), attributes: [ImportAttributes](../private.interface.ImportAttributes/README.md) | `undefined`): [ImportDeclaration](../private.interface.ImportDeclaration/README.md)



#### ⚙ createImportClause(isTypeOnly: `boolean`, name: [Identifier](../private.interface.Identifier/README.md) | `undefined`, namedBindings: [NamedImportBindings](../private.type.NamedImportBindings/README.md) | `undefined`): [ImportClause](../private.interface.ImportClause/README.md)



#### ⚙ updateImportClause(node: [ImportClause](../private.interface.ImportClause/README.md), isTypeOnly: `boolean`, name: [Identifier](../private.interface.Identifier/README.md) | `undefined`, namedBindings: [NamedImportBindings](../private.type.NamedImportBindings/README.md) | `undefined`): [ImportClause](../private.interface.ImportClause/README.md)



#### ⚙ createImportAttributes(elements: [NodeArray](../private.interface.NodeArray/README.md)\<[ImportAttribute](../private.interface.ImportAttribute/README.md)>, multiLine?: `boolean`): [ImportAttributes](../private.interface.ImportAttributes/README.md)



#### ⚙ updateImportAttributes(node: [ImportAttributes](../private.interface.ImportAttributes/README.md), elements: [NodeArray](../private.interface.NodeArray/README.md)\<[ImportAttribute](../private.interface.ImportAttribute/README.md)>, multiLine?: `boolean`): [ImportAttributes](../private.interface.ImportAttributes/README.md)



#### ⚙ createImportAttribute(name: [ImportAttributeName](../private.type.ImportAttributeName/README.md), value: [Expression](../private.interface.Expression/README.md)): [ImportAttribute](../private.interface.ImportAttribute/README.md)



#### ⚙ updateImportAttribute(node: [ImportAttribute](../private.interface.ImportAttribute/README.md), name: [ImportAttributeName](../private.type.ImportAttributeName/README.md), value: [Expression](../private.interface.Expression/README.md)): [ImportAttribute](../private.interface.ImportAttribute/README.md)



#### ⚙ createNamespaceImport(name: [Identifier](../private.interface.Identifier/README.md)): [NamespaceImport](../private.interface.NamespaceImport/README.md)



#### ⚙ updateNamespaceImport(node: [NamespaceImport](../private.interface.NamespaceImport/README.md), name: [Identifier](../private.interface.Identifier/README.md)): [NamespaceImport](../private.interface.NamespaceImport/README.md)



#### ⚙ createNamespaceExport(name: [ModuleExportName](../private.type.ModuleExportName/README.md)): [NamespaceExport](../private.interface.NamespaceExport/README.md)



#### ⚙ updateNamespaceExport(node: [NamespaceExport](../private.interface.NamespaceExport/README.md), name: [ModuleExportName](../private.type.ModuleExportName/README.md)): [NamespaceExport](../private.interface.NamespaceExport/README.md)



#### ⚙ createNamedImports(elements: readonly [ImportSpecifier](../private.interface.ImportSpecifier/README.md)\[]): [NamedImports](../private.interface.NamedImports/README.md)



#### ⚙ updateNamedImports(node: [NamedImports](../private.interface.NamedImports/README.md), elements: readonly [ImportSpecifier](../private.interface.ImportSpecifier/README.md)\[]): [NamedImports](../private.interface.NamedImports/README.md)



#### ⚙ createImportSpecifier(isTypeOnly: `boolean`, propertyName: [ModuleExportName](../private.type.ModuleExportName/README.md) | `undefined`, name: [Identifier](../private.interface.Identifier/README.md)): [ImportSpecifier](../private.interface.ImportSpecifier/README.md)



#### ⚙ updateImportSpecifier(node: [ImportSpecifier](../private.interface.ImportSpecifier/README.md), isTypeOnly: `boolean`, propertyName: [ModuleExportName](../private.type.ModuleExportName/README.md) | `undefined`, name: [Identifier](../private.interface.Identifier/README.md)): [ImportSpecifier](../private.interface.ImportSpecifier/README.md)



#### ⚙ createExportAssignment(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, isExportEquals: `boolean` | `undefined`, expression: [Expression](../private.interface.Expression/README.md)): [ExportAssignment](../private.interface.ExportAssignment/README.md)



#### ⚙ updateExportAssignment(node: [ExportAssignment](../private.interface.ExportAssignment/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, expression: [Expression](../private.interface.Expression/README.md)): [ExportAssignment](../private.interface.ExportAssignment/README.md)



#### ⚙ createExportDeclaration(modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, isTypeOnly: `boolean`, exportClause: [NamedExportBindings](../private.type.NamedExportBindings/README.md) | `undefined`, moduleSpecifier?: [Expression](../private.interface.Expression/README.md), attributes?: [ImportAttributes](../private.interface.ImportAttributes/README.md)): [ExportDeclaration](../private.interface.ExportDeclaration/README.md)



#### ⚙ updateExportDeclaration(node: [ExportDeclaration](../private.interface.ExportDeclaration/README.md), modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`, isTypeOnly: `boolean`, exportClause: [NamedExportBindings](../private.type.NamedExportBindings/README.md) | `undefined`, moduleSpecifier: [Expression](../private.interface.Expression/README.md) | `undefined`, attributes: [ImportAttributes](../private.interface.ImportAttributes/README.md) | `undefined`): [ExportDeclaration](../private.interface.ExportDeclaration/README.md)



#### ⚙ createNamedExports(elements: readonly [ExportSpecifier](../private.interface.ExportSpecifier/README.md)\[]): [NamedExports](../private.interface.NamedExports/README.md)



#### ⚙ updateNamedExports(node: [NamedExports](../private.interface.NamedExports/README.md), elements: readonly [ExportSpecifier](../private.interface.ExportSpecifier/README.md)\[]): [NamedExports](../private.interface.NamedExports/README.md)



#### ⚙ createExportSpecifier(isTypeOnly: `boolean`, propertyName: `string` | [ModuleExportName](../private.type.ModuleExportName/README.md) | `undefined`, name: `string` | [ModuleExportName](../private.type.ModuleExportName/README.md)): [ExportSpecifier](../private.interface.ExportSpecifier/README.md)



#### ⚙ updateExportSpecifier(node: [ExportSpecifier](../private.interface.ExportSpecifier/README.md), isTypeOnly: `boolean`, propertyName: [ModuleExportName](../private.type.ModuleExportName/README.md) | `undefined`, name: [ModuleExportName](../private.type.ModuleExportName/README.md)): [ExportSpecifier](../private.interface.ExportSpecifier/README.md)



#### ⚙ createExternalModuleReference(expression: [Expression](../private.interface.Expression/README.md)): [ExternalModuleReference](../private.interface.ExternalModuleReference/README.md)



#### ⚙ updateExternalModuleReference(node: [ExternalModuleReference](../private.interface.ExternalModuleReference/README.md), expression: [Expression](../private.interface.Expression/README.md)): [ExternalModuleReference](../private.interface.ExternalModuleReference/README.md)



#### ⚙ createJSDocAllType(): [JSDocAllType](../private.interface.JSDocAllType/README.md)



#### ⚙ createJSDocUnknownType(): [JSDocUnknownType](../private.interface.JSDocUnknownType/README.md)



#### ⚙ createJSDocNonNullableType(type: [TypeNode](../private.interface.TypeNode/README.md), postfix?: `boolean`): [JSDocNonNullableType](../private.interface.JSDocNonNullableType/README.md)



#### ⚙ updateJSDocNonNullableType(node: [JSDocNonNullableType](../private.interface.JSDocNonNullableType/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocNonNullableType](../private.interface.JSDocNonNullableType/README.md)



#### ⚙ createJSDocNullableType(type: [TypeNode](../private.interface.TypeNode/README.md), postfix?: `boolean`): [JSDocNullableType](../private.interface.JSDocNullableType/README.md)



#### ⚙ updateJSDocNullableType(node: [JSDocNullableType](../private.interface.JSDocNullableType/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocNullableType](../private.interface.JSDocNullableType/README.md)



#### ⚙ createJSDocOptionalType(type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocOptionalType](../private.interface.JSDocOptionalType/README.md)



#### ⚙ updateJSDocOptionalType(node: [JSDocOptionalType](../private.interface.JSDocOptionalType/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocOptionalType](../private.interface.JSDocOptionalType/README.md)



#### ⚙ createJSDocFunctionType(parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [JSDocFunctionType](../private.interface.JSDocFunctionType/README.md)



#### ⚙ updateJSDocFunctionType(node: [JSDocFunctionType](../private.interface.JSDocFunctionType/README.md), parameters: readonly [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md)\[], type: [TypeNode](../private.interface.TypeNode/README.md) | `undefined`): [JSDocFunctionType](../private.interface.JSDocFunctionType/README.md)



#### ⚙ createJSDocVariadicType(type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocVariadicType](../private.interface.JSDocVariadicType/README.md)



#### ⚙ updateJSDocVariadicType(node: [JSDocVariadicType](../private.interface.JSDocVariadicType/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocVariadicType](../private.interface.JSDocVariadicType/README.md)



#### ⚙ createJSDocNamepathType(type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocNamepathType](../private.interface.JSDocNamepathType/README.md)



#### ⚙ updateJSDocNamepathType(node: [JSDocNamepathType](../private.interface.JSDocNamepathType/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocNamepathType](../private.interface.JSDocNamepathType/README.md)



#### ⚙ createJSDocTypeExpression(type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md)



#### ⚙ updateJSDocTypeExpression(node: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), type: [TypeNode](../private.interface.TypeNode/README.md)): [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md)



#### ⚙ createJSDocNameReference(name: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md)): [JSDocNameReference](../private.interface.JSDocNameReference/README.md)



#### ⚙ updateJSDocNameReference(node: [JSDocNameReference](../private.interface.JSDocNameReference/README.md), name: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md)): [JSDocNameReference](../private.interface.JSDocNameReference/README.md)



#### ⚙ createJSDocMemberName(left: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md), right: [Identifier](../private.interface.Identifier/README.md)): [JSDocMemberName](../private.interface.JSDocMemberName/README.md)



#### ⚙ updateJSDocMemberName(node: [JSDocMemberName](../private.interface.JSDocMemberName/README.md), left: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md), right: [Identifier](../private.interface.Identifier/README.md)): [JSDocMemberName](../private.interface.JSDocMemberName/README.md)



#### ⚙ createJSDocLink(name: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLink](../private.interface.JSDocLink/README.md)



#### ⚙ updateJSDocLink(node: [JSDocLink](../private.interface.JSDocLink/README.md), name: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLink](../private.interface.JSDocLink/README.md)



#### ⚙ createJSDocLinkCode(name: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLinkCode](../private.interface.JSDocLinkCode/README.md)



#### ⚙ updateJSDocLinkCode(node: [JSDocLinkCode](../private.interface.JSDocLinkCode/README.md), name: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLinkCode](../private.interface.JSDocLinkCode/README.md)



#### ⚙ createJSDocLinkPlain(name: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLinkPlain](../private.interface.JSDocLinkPlain/README.md)



#### ⚙ updateJSDocLinkPlain(node: [JSDocLinkPlain](../private.interface.JSDocLinkPlain/README.md), name: [EntityName](../private.type.EntityName/README.md) | [JSDocMemberName](../private.interface.JSDocMemberName/README.md) | `undefined`, text: `string`): [JSDocLinkPlain](../private.interface.JSDocLinkPlain/README.md)



#### ⚙ createJSDocTypeLiteral(jsDocPropertyTags?: readonly [JSDocPropertyLikeTag](../private.interface.JSDocPropertyLikeTag/README.md)\[], isArrayType?: `boolean`): [JSDocTypeLiteral](../private.interface.JSDocTypeLiteral/README.md)



#### ⚙ updateJSDocTypeLiteral(node: [JSDocTypeLiteral](../private.interface.JSDocTypeLiteral/README.md), jsDocPropertyTags: readonly [JSDocPropertyLikeTag](../private.interface.JSDocPropertyLikeTag/README.md)\[] | `undefined`, isArrayType: `boolean` | `undefined`): [JSDocTypeLiteral](../private.interface.JSDocTypeLiteral/README.md)



#### ⚙ createJSDocSignature(typeParameters: readonly [JSDocTemplateTag](../private.interface.JSDocTemplateTag/README.md)\[] | `undefined`, parameters: readonly [JSDocParameterTag](../private.interface.JSDocParameterTag/README.md)\[], type?: [JSDocReturnTag](../private.interface.JSDocReturnTag/README.md)): [JSDocSignature](../private.interface.JSDocSignature/README.md)



#### ⚙ updateJSDocSignature(node: [JSDocSignature](../private.interface.JSDocSignature/README.md), typeParameters: readonly [JSDocTemplateTag](../private.interface.JSDocTemplateTag/README.md)\[] | `undefined`, parameters: readonly [JSDocParameterTag](../private.interface.JSDocParameterTag/README.md)\[], type: [JSDocReturnTag](../private.interface.JSDocReturnTag/README.md) | `undefined`): [JSDocSignature](../private.interface.JSDocSignature/README.md)



#### ⚙ createJSDocTemplateTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, constraint: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[], comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocTemplateTag](../private.interface.JSDocTemplateTag/README.md)



#### ⚙ updateJSDocTemplateTag(node: [JSDocTemplateTag](../private.interface.JSDocTemplateTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, constraint: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | `undefined`, typeParameters: readonly [TypeParameterDeclaration](../private.interface.TypeParameterDeclaration/README.md)\[], comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocTemplateTag](../private.interface.JSDocTemplateTag/README.md)



#### ⚙ createJSDocTypedefTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression?: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | [JSDocTypeLiteral](../private.interface.JSDocTypeLiteral/README.md), fullName?: [Identifier](../private.interface.Identifier/README.md) | [JSDocNamespaceDeclaration](../private.interface.JSDocNamespaceDeclaration/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocTypedefTag](../private.interface.JSDocTypedefTag/README.md)



#### ⚙ updateJSDocTypedefTag(node: [JSDocTypedefTag](../private.interface.JSDocTypedefTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | [JSDocTypeLiteral](../private.interface.JSDocTypeLiteral/README.md) | `undefined`, fullName: [Identifier](../private.interface.Identifier/README.md) | [JSDocNamespaceDeclaration](../private.interface.JSDocNamespaceDeclaration/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocTypedefTag](../private.interface.JSDocTypedefTag/README.md)



#### ⚙ createJSDocParameterTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, name: [EntityName](../private.type.EntityName/README.md), isBracketed: `boolean`, typeExpression?: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), isNameFirst?: `boolean`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocParameterTag](../private.interface.JSDocParameterTag/README.md)



#### ⚙ updateJSDocParameterTag(node: [JSDocParameterTag](../private.interface.JSDocParameterTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, name: [EntityName](../private.type.EntityName/README.md), isBracketed: `boolean`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | `undefined`, isNameFirst: `boolean`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocParameterTag](../private.interface.JSDocParameterTag/README.md)



#### ⚙ createJSDocPropertyTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, name: [EntityName](../private.type.EntityName/README.md), isBracketed: `boolean`, typeExpression?: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), isNameFirst?: `boolean`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocPropertyTag](../private.interface.JSDocPropertyTag/README.md)



#### ⚙ updateJSDocPropertyTag(node: [JSDocPropertyTag](../private.interface.JSDocPropertyTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, name: [EntityName](../private.type.EntityName/README.md), isBracketed: `boolean`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | `undefined`, isNameFirst: `boolean`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocPropertyTag](../private.interface.JSDocPropertyTag/README.md)



#### ⚙ createJSDocTypeTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocTypeTag](../private.interface.JSDocTypeTag/README.md)



#### ⚙ updateJSDocTypeTag(node: [JSDocTypeTag](../private.interface.JSDocTypeTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocTypeTag](../private.interface.JSDocTypeTag/README.md)



#### ⚙ createJSDocSeeTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, nameExpression: [JSDocNameReference](../private.interface.JSDocNameReference/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocSeeTag](../private.interface.JSDocSeeTag/README.md)



#### ⚙ updateJSDocSeeTag(node: [JSDocSeeTag](../private.interface.JSDocSeeTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, nameExpression: [JSDocNameReference](../private.interface.JSDocNameReference/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocSeeTag](../private.interface.JSDocSeeTag/README.md)



#### ⚙ createJSDocReturnTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression?: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocReturnTag](../private.interface.JSDocReturnTag/README.md)



#### ⚙ updateJSDocReturnTag(node: [JSDocReturnTag](../private.interface.JSDocReturnTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocReturnTag](../private.interface.JSDocReturnTag/README.md)



#### ⚙ createJSDocThisTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocThisTag](../private.interface.JSDocThisTag/README.md)



#### ⚙ updateJSDocThisTag(node: [JSDocThisTag](../private.interface.JSDocThisTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocThisTag](../private.interface.JSDocThisTag/README.md)



#### ⚙ createJSDocEnumTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocEnumTag](../private.interface.JSDocEnumTag/README.md)



#### ⚙ updateJSDocEnumTag(node: [JSDocEnumTag](../private.interface.JSDocEnumTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocEnumTag](../private.interface.JSDocEnumTag/README.md)



#### ⚙ createJSDocCallbackTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocSignature](../private.interface.JSDocSignature/README.md), fullName?: [Identifier](../private.interface.Identifier/README.md) | [JSDocNamespaceDeclaration](../private.interface.JSDocNamespaceDeclaration/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocCallbackTag](../private.interface.JSDocCallbackTag/README.md)



#### ⚙ updateJSDocCallbackTag(node: [JSDocCallbackTag](../private.interface.JSDocCallbackTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocSignature](../private.interface.JSDocSignature/README.md), fullName: [Identifier](../private.interface.Identifier/README.md) | [JSDocNamespaceDeclaration](../private.interface.JSDocNamespaceDeclaration/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocCallbackTag](../private.interface.JSDocCallbackTag/README.md)



#### ⚙ createJSDocOverloadTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocSignature](../private.interface.JSDocSignature/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocOverloadTag](../private.interface.JSDocOverloadTag/README.md)



#### ⚙ updateJSDocOverloadTag(node: [JSDocOverloadTag](../private.interface.JSDocOverloadTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocSignature](../private.interface.JSDocSignature/README.md), comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocOverloadTag](../private.interface.JSDocOverloadTag/README.md)



#### ⚙ createJSDocAugmentsTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, className: [JSDocAugmentsTag](../private.interface.JSDocAugmentsTag/README.md)\[<mark>"class"</mark>], comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocAugmentsTag](../private.interface.JSDocAugmentsTag/README.md)



#### ⚙ updateJSDocAugmentsTag(node: [JSDocAugmentsTag](../private.interface.JSDocAugmentsTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, className: [JSDocAugmentsTag](../private.interface.JSDocAugmentsTag/README.md)\[<mark>"class"</mark>], comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocAugmentsTag](../private.interface.JSDocAugmentsTag/README.md)



#### ⚙ createJSDocImplementsTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, className: [JSDocImplementsTag](../private.interface.JSDocImplementsTag/README.md)\[<mark>"class"</mark>], comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocImplementsTag](../private.interface.JSDocImplementsTag/README.md)



#### ⚙ updateJSDocImplementsTag(node: [JSDocImplementsTag](../private.interface.JSDocImplementsTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, className: [JSDocImplementsTag](../private.interface.JSDocImplementsTag/README.md)\[<mark>"class"</mark>], comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocImplementsTag](../private.interface.JSDocImplementsTag/README.md)



#### ⚙ createJSDocAuthorTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocAuthorTag](../private.interface.JSDocAuthorTag/README.md)



#### ⚙ updateJSDocAuthorTag(node: [JSDocAuthorTag](../private.interface.JSDocAuthorTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocAuthorTag](../private.interface.JSDocAuthorTag/README.md)



#### ⚙ createJSDocClassTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocClassTag](../private.interface.JSDocClassTag/README.md)



#### ⚙ updateJSDocClassTag(node: [JSDocClassTag](../private.interface.JSDocClassTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocClassTag](../private.interface.JSDocClassTag/README.md)



#### ⚙ createJSDocPublicTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocPublicTag](../private.interface.JSDocPublicTag/README.md)



#### ⚙ updateJSDocPublicTag(node: [JSDocPublicTag](../private.interface.JSDocPublicTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocPublicTag](../private.interface.JSDocPublicTag/README.md)



#### ⚙ createJSDocPrivateTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocPrivateTag](../private.interface.JSDocPrivateTag/README.md)



#### ⚙ updateJSDocPrivateTag(node: [JSDocPrivateTag](../private.interface.JSDocPrivateTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocPrivateTag](../private.interface.JSDocPrivateTag/README.md)



#### ⚙ createJSDocProtectedTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocProtectedTag](../private.interface.JSDocProtectedTag/README.md)



#### ⚙ updateJSDocProtectedTag(node: [JSDocProtectedTag](../private.interface.JSDocProtectedTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocProtectedTag](../private.interface.JSDocProtectedTag/README.md)



#### ⚙ createJSDocReadonlyTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocReadonlyTag](../private.interface.JSDocReadonlyTag/README.md)



#### ⚙ updateJSDocReadonlyTag(node: [JSDocReadonlyTag](../private.interface.JSDocReadonlyTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocReadonlyTag](../private.interface.JSDocReadonlyTag/README.md)



#### ⚙ createJSDocUnknownTag(tagName: [Identifier](../private.interface.Identifier/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocUnknownTag](../private.interface.JSDocUnknownTag/README.md)



#### ⚙ updateJSDocUnknownTag(node: [JSDocUnknownTag](../private.interface.JSDocUnknownTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md), comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocUnknownTag](../private.interface.JSDocUnknownTag/README.md)



#### ⚙ createJSDocDeprecatedTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocDeprecatedTag](../private.interface.JSDocDeprecatedTag/README.md)



#### ⚙ updateJSDocDeprecatedTag(node: [JSDocDeprecatedTag](../private.interface.JSDocDeprecatedTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocDeprecatedTag](../private.interface.JSDocDeprecatedTag/README.md)



#### ⚙ createJSDocOverrideTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocOverrideTag](../private.interface.JSDocOverrideTag/README.md)



#### ⚙ updateJSDocOverrideTag(node: [JSDocOverrideTag](../private.interface.JSDocOverrideTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocOverrideTag](../private.interface.JSDocOverrideTag/README.md)



#### ⚙ createJSDocThrowsTag(tagName: [Identifier](../private.interface.Identifier/README.md), typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocThrowsTag](../private.interface.JSDocThrowsTag/README.md)



#### ⚙ updateJSDocThrowsTag(node: [JSDocThrowsTag](../private.interface.JSDocThrowsTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md) | `undefined`, comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocThrowsTag](../private.interface.JSDocThrowsTag/README.md)



#### ⚙ createJSDocSatisfiesTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocSatisfiesTag](../private.interface.JSDocSatisfiesTag/README.md)



#### ⚙ updateJSDocSatisfiesTag(node: [JSDocSatisfiesTag](../private.interface.JSDocSatisfiesTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, typeExpression: [JSDocTypeExpression](../private.interface.JSDocTypeExpression/README.md), comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocSatisfiesTag](../private.interface.JSDocSatisfiesTag/README.md)



#### ⚙ createJSDocImportTag(tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, importClause: [ImportClause](../private.interface.ImportClause/README.md) | `undefined`, moduleSpecifier: [Expression](../private.interface.Expression/README.md), attributes?: [ImportAttributes](../private.interface.ImportAttributes/README.md), comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>): [JSDocImportTag](../private.interface.JSDocImportTag/README.md)



#### ⚙ updateJSDocImportTag(node: [JSDocImportTag](../private.interface.JSDocImportTag/README.md), tagName: [Identifier](../private.interface.Identifier/README.md) | `undefined`, importClause: [ImportClause](../private.interface.ImportClause/README.md) | `undefined`, moduleSpecifier: [Expression](../private.interface.Expression/README.md), attributes: [ImportAttributes](../private.interface.ImportAttributes/README.md) | `undefined`, comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`): [JSDocImportTag](../private.interface.JSDocImportTag/README.md)



#### ⚙ createJSDocText(text: `string`): [JSDocText](../private.interface.JSDocText/README.md)



#### ⚙ updateJSDocText(node: [JSDocText](../private.interface.JSDocText/README.md), text: `string`): [JSDocText](../private.interface.JSDocText/README.md)



#### ⚙ createJSDocComment(comment?: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)>, tags?: readonly [JSDocTag](../private.interface.JSDocTag/README.md)\[]): [JSDoc](../private.interface.JSDoc/README.md)



#### ⚙ updateJSDocComment(node: [JSDoc](../private.interface.JSDoc/README.md), comment: `string` | [NodeArray](../private.interface.NodeArray/README.md)\<[JSDocComment](../private.type.JSDocComment/README.md)> | `undefined`, tags: readonly [JSDocTag](../private.interface.JSDocTag/README.md)\[] | `undefined`): [JSDoc](../private.interface.JSDoc/README.md)



#### ⚙ createJsxElement(openingElement: [JsxOpeningElement](../private.interface.JsxOpeningElement/README.md), children: readonly [JsxChild](../private.type.JsxChild/README.md)\[], closingElement: [JsxClosingElement](../private.interface.JsxClosingElement/README.md)): [JsxElement](../private.interface.JsxElement/README.md)



#### ⚙ updateJsxElement(node: [JsxElement](../private.interface.JsxElement/README.md), openingElement: [JsxOpeningElement](../private.interface.JsxOpeningElement/README.md), children: readonly [JsxChild](../private.type.JsxChild/README.md)\[], closingElement: [JsxClosingElement](../private.interface.JsxClosingElement/README.md)): [JsxElement](../private.interface.JsxElement/README.md)



#### ⚙ createJsxSelfClosingElement(tagName: [JsxTagNameExpression](../private.type.JsxTagNameExpression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, attributes: [JsxAttributes](../private.interface.JsxAttributes/README.md)): [JsxSelfClosingElement](../private.interface.JsxSelfClosingElement/README.md)



#### ⚙ updateJsxSelfClosingElement(node: [JsxSelfClosingElement](../private.interface.JsxSelfClosingElement/README.md), tagName: [JsxTagNameExpression](../private.type.JsxTagNameExpression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, attributes: [JsxAttributes](../private.interface.JsxAttributes/README.md)): [JsxSelfClosingElement](../private.interface.JsxSelfClosingElement/README.md)



#### ⚙ createJsxOpeningElement(tagName: [JsxTagNameExpression](../private.type.JsxTagNameExpression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, attributes: [JsxAttributes](../private.interface.JsxAttributes/README.md)): [JsxOpeningElement](../private.interface.JsxOpeningElement/README.md)



#### ⚙ updateJsxOpeningElement(node: [JsxOpeningElement](../private.interface.JsxOpeningElement/README.md), tagName: [JsxTagNameExpression](../private.type.JsxTagNameExpression/README.md), typeArguments: readonly [TypeNode](../private.interface.TypeNode/README.md)\[] | `undefined`, attributes: [JsxAttributes](../private.interface.JsxAttributes/README.md)): [JsxOpeningElement](../private.interface.JsxOpeningElement/README.md)



#### ⚙ createJsxClosingElement(tagName: [JsxTagNameExpression](../private.type.JsxTagNameExpression/README.md)): [JsxClosingElement](../private.interface.JsxClosingElement/README.md)



#### ⚙ updateJsxClosingElement(node: [JsxClosingElement](../private.interface.JsxClosingElement/README.md), tagName: [JsxTagNameExpression](../private.type.JsxTagNameExpression/README.md)): [JsxClosingElement](../private.interface.JsxClosingElement/README.md)



#### ⚙ createJsxFragment(openingFragment: [JsxOpeningFragment](../private.interface.JsxOpeningFragment/README.md), children: readonly [JsxChild](../private.type.JsxChild/README.md)\[], closingFragment: [JsxClosingFragment](../private.interface.JsxClosingFragment/README.md)): [JsxFragment](../private.interface.JsxFragment/README.md)



#### ⚙ createJsxText(text: `string`, containsOnlyTriviaWhiteSpaces?: `boolean`): [JsxText](../private.interface.JsxText/README.md)



#### ⚙ updateJsxText(node: [JsxText](../private.interface.JsxText/README.md), text: `string`, containsOnlyTriviaWhiteSpaces?: `boolean`): [JsxText](../private.interface.JsxText/README.md)



#### ⚙ createJsxOpeningFragment(): [JsxOpeningFragment](../private.interface.JsxOpeningFragment/README.md)



#### ⚙ createJsxJsxClosingFragment(): [JsxClosingFragment](../private.interface.JsxClosingFragment/README.md)



#### ⚙ updateJsxFragment(node: [JsxFragment](../private.interface.JsxFragment/README.md), openingFragment: [JsxOpeningFragment](../private.interface.JsxOpeningFragment/README.md), children: readonly [JsxChild](../private.type.JsxChild/README.md)\[], closingFragment: [JsxClosingFragment](../private.interface.JsxClosingFragment/README.md)): [JsxFragment](../private.interface.JsxFragment/README.md)



#### ⚙ createJsxAttribute(name: [JsxAttributeName](../private.type.JsxAttributeName/README.md), initializer: [JsxAttributeValue](../private.type.JsxAttributeValue/README.md) | `undefined`): [JsxAttribute](../private.interface.JsxAttribute/README.md)



#### ⚙ updateJsxAttribute(node: [JsxAttribute](../private.interface.JsxAttribute/README.md), name: [JsxAttributeName](../private.type.JsxAttributeName/README.md), initializer: [JsxAttributeValue](../private.type.JsxAttributeValue/README.md) | `undefined`): [JsxAttribute](../private.interface.JsxAttribute/README.md)



#### ⚙ createJsxAttributes(properties: readonly [JsxAttributeLike](../private.type.JsxAttributeLike/README.md)\[]): [JsxAttributes](../private.interface.JsxAttributes/README.md)



#### ⚙ updateJsxAttributes(node: [JsxAttributes](../private.interface.JsxAttributes/README.md), properties: readonly [JsxAttributeLike](../private.type.JsxAttributeLike/README.md)\[]): [JsxAttributes](../private.interface.JsxAttributes/README.md)



#### ⚙ createJsxSpreadAttribute(expression: [Expression](../private.interface.Expression/README.md)): [JsxSpreadAttribute](../private.interface.JsxSpreadAttribute/README.md)



#### ⚙ updateJsxSpreadAttribute(node: [JsxSpreadAttribute](../private.interface.JsxSpreadAttribute/README.md), expression: [Expression](../private.interface.Expression/README.md)): [JsxSpreadAttribute](../private.interface.JsxSpreadAttribute/README.md)



#### ⚙ createJsxExpression(dotDotDotToken: [DotDotDotToken](../private.type.DotDotDotToken/README.md) | `undefined`, expression: [Expression](../private.interface.Expression/README.md) | `undefined`): [JsxExpression](../private.interface.JsxExpression/README.md)



#### ⚙ updateJsxExpression(node: [JsxExpression](../private.interface.JsxExpression/README.md), expression: [Expression](../private.interface.Expression/README.md) | `undefined`): [JsxExpression](../private.interface.JsxExpression/README.md)



#### ⚙ createJsxNamespacedName(namespace: [Identifier](../private.interface.Identifier/README.md), name: [Identifier](../private.interface.Identifier/README.md)): [JsxNamespacedName](../private.interface.JsxNamespacedName/README.md)



#### ⚙ updateJsxNamespacedName(node: [JsxNamespacedName](../private.interface.JsxNamespacedName/README.md), namespace: [Identifier](../private.interface.Identifier/README.md), name: [Identifier](../private.interface.Identifier/README.md)): [JsxNamespacedName](../private.interface.JsxNamespacedName/README.md)



#### ⚙ createCaseClause(expression: [Expression](../private.interface.Expression/README.md), statements: readonly [Statement](../private.interface.Statement/README.md)\[]): [CaseClause](../private.interface.CaseClause/README.md)



#### ⚙ updateCaseClause(node: [CaseClause](../private.interface.CaseClause/README.md), expression: [Expression](../private.interface.Expression/README.md), statements: readonly [Statement](../private.interface.Statement/README.md)\[]): [CaseClause](../private.interface.CaseClause/README.md)



#### ⚙ createDefaultClause(statements: readonly [Statement](../private.interface.Statement/README.md)\[]): [DefaultClause](../private.interface.DefaultClause/README.md)



#### ⚙ updateDefaultClause(node: [DefaultClause](../private.interface.DefaultClause/README.md), statements: readonly [Statement](../private.interface.Statement/README.md)\[]): [DefaultClause](../private.interface.DefaultClause/README.md)



#### ⚙ createHeritageClause(token: [HeritageClause](../private.interface.HeritageClause/README.md)\[<mark>"token"</mark>], types: readonly [ExpressionWithTypeArguments](../private.interface.ExpressionWithTypeArguments/README.md)\[]): [HeritageClause](../private.interface.HeritageClause/README.md)



#### ⚙ updateHeritageClause(node: [HeritageClause](../private.interface.HeritageClause/README.md), types: readonly [ExpressionWithTypeArguments](../private.interface.ExpressionWithTypeArguments/README.md)\[]): [HeritageClause](../private.interface.HeritageClause/README.md)



#### ⚙ createCatchClause(variableDeclaration: `string` | [BindingName](../private.type.BindingName/README.md) | [VariableDeclaration](../private.interface.VariableDeclaration/README.md) | `undefined`, block: [Block](../private.interface.Block/README.md)): [CatchClause](../private.interface.CatchClause/README.md)



#### ⚙ updateCatchClause(node: [CatchClause](../private.interface.CatchClause/README.md), variableDeclaration: [VariableDeclaration](../private.interface.VariableDeclaration/README.md) | `undefined`, block: [Block](../private.interface.Block/README.md)): [CatchClause](../private.interface.CatchClause/README.md)



#### ⚙ createPropertyAssignment(name: `string` | [PropertyName](../private.type.PropertyName/README.md), initializer: [Expression](../private.interface.Expression/README.md)): [PropertyAssignment](../private.interface.PropertyAssignment/README.md)



#### ⚙ updatePropertyAssignment(node: [PropertyAssignment](../private.interface.PropertyAssignment/README.md), name: [PropertyName](../private.type.PropertyName/README.md), initializer: [Expression](../private.interface.Expression/README.md)): [PropertyAssignment](../private.interface.PropertyAssignment/README.md)



#### ⚙ createShorthandPropertyAssignment(name: `string` | [Identifier](../private.interface.Identifier/README.md), objectAssignmentInitializer?: [Expression](../private.interface.Expression/README.md)): [ShorthandPropertyAssignment](../private.interface.ShorthandPropertyAssignment/README.md)



#### ⚙ updateShorthandPropertyAssignment(node: [ShorthandPropertyAssignment](../private.interface.ShorthandPropertyAssignment/README.md), name: [Identifier](../private.interface.Identifier/README.md), objectAssignmentInitializer: [Expression](../private.interface.Expression/README.md) | `undefined`): [ShorthandPropertyAssignment](../private.interface.ShorthandPropertyAssignment/README.md)



#### ⚙ createSpreadAssignment(expression: [Expression](../private.interface.Expression/README.md)): [SpreadAssignment](../private.interface.SpreadAssignment/README.md)



#### ⚙ updateSpreadAssignment(node: [SpreadAssignment](../private.interface.SpreadAssignment/README.md), expression: [Expression](../private.interface.Expression/README.md)): [SpreadAssignment](../private.interface.SpreadAssignment/README.md)



#### ⚙ createEnumMember(name: `string` | [PropertyName](../private.type.PropertyName/README.md), initializer?: [Expression](../private.interface.Expression/README.md)): [EnumMember](../private.interface.EnumMember/README.md)



#### ⚙ updateEnumMember(node: [EnumMember](../private.interface.EnumMember/README.md), name: [PropertyName](../private.type.PropertyName/README.md), initializer: [Expression](../private.interface.Expression/README.md) | `undefined`): [EnumMember](../private.interface.EnumMember/README.md)



#### ⚙ createSourceFile(statements: readonly [Statement](../private.interface.Statement/README.md)\[], endOfFileToken: [EndOfFileToken](../private.type.EndOfFileToken/README.md), flags: [NodeFlags](../private.enum.NodeFlags/README.md)): [SourceFile](../private.interface.SourceFile/README.md)



#### ⚙ updateSourceFile(node: [SourceFile](../private.interface.SourceFile/README.md), statements: readonly [Statement](../private.interface.Statement/README.md)\[], isDeclarationFile?: `boolean`, referencedFiles?: readonly [FileReference](../private.interface.FileReference/README.md)\[], typeReferences?: readonly [FileReference](../private.interface.FileReference/README.md)\[], hasNoDefaultLib?: `boolean`, libReferences?: readonly [FileReference](../private.interface.FileReference/README.md)\[]): [SourceFile](../private.interface.SourceFile/README.md)



#### ⚙ createNotEmittedStatement(original: [Node](../private.interface.Node/README.md)): [NotEmittedStatement](../private.interface.NotEmittedStatement/README.md)



#### ⚙ createPartiallyEmittedExpression(expression: [Expression](../private.interface.Expression/README.md), original?: [Node](../private.interface.Node/README.md)): [PartiallyEmittedExpression](../private.interface.PartiallyEmittedExpression/README.md)



#### ⚙ updatePartiallyEmittedExpression(node: [PartiallyEmittedExpression](../private.interface.PartiallyEmittedExpression/README.md), expression: [Expression](../private.interface.Expression/README.md)): [PartiallyEmittedExpression](../private.interface.PartiallyEmittedExpression/README.md)



#### ⚙ createCommaListExpression(elements: readonly [Expression](../private.interface.Expression/README.md)\[]): [CommaListExpression](../private.interface.CommaListExpression/README.md)



#### ⚙ updateCommaListExpression(node: [CommaListExpression](../private.interface.CommaListExpression/README.md), elements: readonly [Expression](../private.interface.Expression/README.md)\[]): [CommaListExpression](../private.interface.CommaListExpression/README.md)



#### ⚙ createBundle(sourceFiles: readonly [SourceFile](../private.interface.SourceFile/README.md)\[]): [Bundle](../private.interface.Bundle/README.md)



#### ⚙ updateBundle(node: [Bundle](../private.interface.Bundle/README.md), sourceFiles: readonly [SourceFile](../private.interface.SourceFile/README.md)\[]): [Bundle](../private.interface.Bundle/README.md)



#### ⚙ createComma(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createAssignment(left: [ObjectLiteralExpression](../private.interface.ObjectLiteralExpression/README.md) | [ArrayLiteralExpression](../private.interface.ArrayLiteralExpression/README.md), right: [Expression](../private.interface.Expression/README.md)): DestructuringAssignment



#### ⚙ createAssignment(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [AssignmentExpression](../private.interface.AssignmentExpression/README.md)\<EqualsToken>



#### ⚙ createLogicalOr(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createLogicalAnd(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createBitwiseOr(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createBitwiseXor(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createBitwiseAnd(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createStrictEquality(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createStrictInequality(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createEquality(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createInequality(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createLessThan(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createLessThanEquals(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createGreaterThan(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createGreaterThanEquals(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createLeftShift(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createRightShift(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createUnsignedRightShift(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createAdd(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createSubtract(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createMultiply(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createDivide(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createModulo(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createExponent(left: [Expression](../private.interface.Expression/README.md), right: [Expression](../private.interface.Expression/README.md)): [BinaryExpression](../private.interface.BinaryExpression/README.md)



#### ⚙ createPrefixPlus(operand: [Expression](../private.interface.Expression/README.md)): [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md)



#### ⚙ createPrefixMinus(operand: [Expression](../private.interface.Expression/README.md)): [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md)



#### ⚙ createPrefixIncrement(operand: [Expression](../private.interface.Expression/README.md)): [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md)



#### ⚙ createPrefixDecrement(operand: [Expression](../private.interface.Expression/README.md)): [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md)



#### ⚙ createBitwiseNot(operand: [Expression](../private.interface.Expression/README.md)): [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md)



#### ⚙ createLogicalNot(operand: [Expression](../private.interface.Expression/README.md)): [PrefixUnaryExpression](../private.interface.PrefixUnaryExpression/README.md)



#### ⚙ createPostfixIncrement(operand: [Expression](../private.interface.Expression/README.md)): [PostfixUnaryExpression](../private.interface.PostfixUnaryExpression/README.md)



#### ⚙ createPostfixDecrement(operand: [Expression](../private.interface.Expression/README.md)): [PostfixUnaryExpression](../private.interface.PostfixUnaryExpression/README.md)



#### ⚙ createImmediatelyInvokedFunctionExpression(statements: readonly [Statement](../private.interface.Statement/README.md)\[]): [CallExpression](../private.interface.CallExpression/README.md)



#### ⚙ createImmediatelyInvokedFunctionExpression(statements: readonly [Statement](../private.interface.Statement/README.md)\[], param: [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md), paramValue: [Expression](../private.interface.Expression/README.md)): [CallExpression](../private.interface.CallExpression/README.md)



#### ⚙ createImmediatelyInvokedArrowFunction(statements: readonly [Statement](../private.interface.Statement/README.md)\[]): ImmediatelyInvokedArrowFunction



#### ⚙ createImmediatelyInvokedArrowFunction(statements: readonly [Statement](../private.interface.Statement/README.md)\[], param: [ParameterDeclaration](../private.interface.ParameterDeclaration/README.md), paramValue: [Expression](../private.interface.Expression/README.md)): ImmediatelyInvokedArrowFunction



#### ⚙ createVoidZero(): [VoidExpression](../private.interface.VoidExpression/README.md)



#### ⚙ createExportDefault(expression: [Expression](../private.interface.Expression/README.md)): [ExportAssignment](../private.interface.ExportAssignment/README.md)



#### ⚙ createExternalModuleExport(exportName: [Identifier](../private.interface.Identifier/README.md)): [ExportDeclaration](../private.interface.ExportDeclaration/README.md)



#### ⚙ restoreOuterExpressions(outerExpression: [Expression](../private.interface.Expression/README.md) | `undefined`, innerExpression: [Expression](../private.interface.Expression/README.md), kinds?: [OuterExpressionKinds](../private.enum.OuterExpressionKinds/README.md)): [Expression](../private.interface.Expression/README.md)



#### ⚙ replaceModifiers\<T `extends` [HasModifiers](../private.type.HasModifiers/README.md)>(node: T, modifiers: readonly [Modifier](../private.type.Modifier/README.md)\[] | [ModifierFlags](../private.enum.ModifierFlags/README.md) | `undefined`): T

> Updates a node that may contain modifiers, replacing only the modifiers of the node.



#### ⚙ replaceDecoratorsAndModifiers\<T `extends` [HasModifiers](../private.type.HasModifiers/README.md) \& [HasDecorators](../private.type.HasDecorators/README.md)>(node: T, modifiers: readonly [ModifierLike](../private.type.ModifierLike/README.md)\[] | `undefined`): T

> Updates a node that may contain decorators or modifiers, replacing only the decorators and modifiers of the node.



#### ⚙ replacePropertyName\<T `extends` [AccessorDeclaration](../private.type.AccessorDeclaration/README.md) | [MethodDeclaration](../private.interface.MethodDeclaration/README.md) | [MethodSignature](../private.interface.MethodSignature/README.md) | [PropertyDeclaration](../private.interface.PropertyDeclaration/README.md) | [PropertySignature](../private.interface.PropertySignature/README.md) | [PropertyAssignment](../private.interface.PropertyAssignment/README.md)>(node: T, name: T\[<mark>"name"</mark>]): T

> Updates a node that contains a property name, replacing only the name of the node.



<div style="opacity:0.6">

#### ⚙ `deprecated` createAssertClause(elements: [NodeArray](../private.interface.NodeArray/README.md)\<[AssertEntry](../private.interface.AssertEntry/README.md)>, multiLine?: `boolean`): [AssertClause](../private.interface.AssertClause/README.md)



#### ⚙ `deprecated` updateAssertClause(node: [AssertClause](../private.interface.AssertClause/README.md), elements: [NodeArray](../private.interface.NodeArray/README.md)\<[AssertEntry](../private.interface.AssertEntry/README.md)>, multiLine?: `boolean`): [AssertClause](../private.interface.AssertClause/README.md)



#### ⚙ `deprecated` createAssertEntry(name: [AssertionKey](../private.type.AssertionKey/README.md), value: [Expression](../private.interface.Expression/README.md)): [AssertEntry](../private.interface.AssertEntry/README.md)



#### ⚙ `deprecated` updateAssertEntry(node: [AssertEntry](../private.interface.AssertEntry/README.md), name: [AssertionKey](../private.type.AssertionKey/README.md), value: [Expression](../private.interface.Expression/README.md)): [AssertEntry](../private.interface.AssertEntry/README.md)



#### ⚙ `deprecated` createImportTypeAssertionContainer(clause: [AssertClause](../private.interface.AssertClause/README.md), multiLine?: `boolean`): [ImportTypeAssertionContainer](../private.interface.ImportTypeAssertionContainer/README.md)



#### ⚙ `deprecated` updateImportTypeAssertionContainer(node: [ImportTypeAssertionContainer](../private.interface.ImportTypeAssertionContainer/README.md), clause: [AssertClause](../private.interface.AssertClause/README.md), multiLine?: `boolean`): [ImportTypeAssertionContainer](../private.interface.ImportTypeAssertionContainer/README.md)



</div>

