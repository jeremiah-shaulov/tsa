# `function` collapseTextChangeRangesAcrossMultipleVersions

[Documentation Index](../README.md)

`function` collapseTextChangeRangesAcrossMultipleVersions(changes: readonly [TextChangeRange](../interface.TextChangeRange/README.md)\[]): [TextChangeRange](../interface.TextChangeRange/README.md)

Called to merge all the changes that occurred across several versions of a script snapshot
into a single change.  i.e. if a user keeps making successive edits to a script we will
have a text change from V1 to V2, V2 to V3, ..., Vn.

This function will then merge those changes into a single change range valid between V1 and
Vn.

