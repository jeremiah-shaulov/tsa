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
> 
> 🎚️ Parameter **text**:
> 
> The text of a line to classify.
> 
> 🎚️ Parameter **lexState**:
> 
> The state of the lexical classifier at the end of the previous line.
> 
> 🎚️ Parameter **syntacticClassifierAbsent**:
> 
> Whether the client is *not* using a syntactic classifier.
> If there is no syntactic classifier (syntacticClassifierAbsent=true),
> certain heuristics may be used in its place; however, if there is a
> syntactic classifier (syntacticClassifierAbsent=false), certain
> classifications which may be incorrectly categorized will be given
> back as Identifiers in order to allow the syntactic classifier to
> subsume the classification.

> `deprecated`
> 
> Use getLexicalClassifications instead.



</div>

