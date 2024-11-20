# `type` GetEditsForRefactorRequestArgs

[Documentation Index](../README.md)

Request the edits that a particular refactoring action produces.
Callers must specify the name of the refactor and the name of the action.

`type` GetEditsForRefactorRequestArgs = [FileLocationOrRangeRequestArgs](../type.FileLocationOrRangeRequestArgs/README.md) \& \{refactor: `string`, action: `string`, interactiveRefactorArguments?: [InteractiveRefactorArguments](../interface.InteractiveRefactorArguments/README.md)}