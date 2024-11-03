# `interface` Classifier

[Documentation Index](../README.md)

## This interface has

- method [getEncodedLexicalClassifications](#-getencodedlexicalclassificationstext-string-endoflinestate-endoflinestate-syntacticclassifierabsent-boolean-classifications)
- [deprecated symbol](#-deprecated-getclassificationsforlinetext-string-lexstate-endoflinestate-syntacticclassifierabsent-boolean-classificationresult)


#### ⚙ getEncodedLexicalClassifications(text: `string`, endOfLineState: [EndOfLineState](../enum.EndOfLineState/README.md), syntacticClassifierAbsent: `boolean`): [Classifications](../interface.Classifications/README.md)



<div style="opacity:0.6">

#### ⚙ `deprecated` getClassificationsForLine(text: `string`, lexState: [EndOfLineState](../enum.EndOfLineState/README.md), syntacticClassifierAbsent: `boolean`): [ClassificationResult](../interface.ClassificationResult/README.md)

> Gives lexical classifications of tokens on a line without any syntactic context.
> For instance, a token consisting of the text 'string' can be either an identifier
> named 'string' or the keyword 'string', however, because this classifier is not aware,
> it relies on certain heuristics to give acceptable results. For classifications where
> speed trumps accuracy, this function is preferable; however, for true accuracy, the
> syntactic classifier is ideal. In fact, in certain editing scenarios, combining the
> lexical, syntactic, and semantic classifiers may issue the best user experience.

> `deprecated`
> 
> Use getLexicalClassifications instead.



</div>

