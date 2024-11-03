# `type` ResolvedConfigFileName

[Documentation Index](../README.md)

Branded string for keeping track of when we've turned an ambiguous path
specified like "./blah" to an absolute path to an actual
tsconfig file, e.g. "/root/blah/tsconfig.json"

`type` ResolvedConfigFileName = `string` \& \{\_isResolvedConfigFileName: `never`}