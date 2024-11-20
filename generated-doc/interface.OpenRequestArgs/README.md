# `interface` OpenRequestArgs `extends` [FileRequestArgs](../interface.FileRequestArgs/README.md)

[Documentation Index](../README.md)

Information found in an "open" request.

## This interface has

- 3 properties:
[fileContent](#-filecontent-string),
[scriptKindName](#-scriptkindname-scriptkindname),
[projectRootPath](#-projectrootpath-string)
- 2 inherited members from [FileRequestArgs](../interface.FileRequestArgs/README.md)


#### 📄 fileContent?: `string`

> Used when a version of the file content is known to be more up to date than the one on disk.
> Then the known content will be used upon opening instead of the disk copy



#### 📄 scriptKindName?: [ScriptKindName](../type.ScriptKindName/README.md)

> Used to specify the script kind of the file explicitly. It could be one of the following:
> "TS", "JS", "TSX", "JSX"



#### 📄 projectRootPath?: `string`

> Used to limit the searching for project config file. If given the searching will stop at this
> root path; otherwise it will go all the way up to the dist root path.



