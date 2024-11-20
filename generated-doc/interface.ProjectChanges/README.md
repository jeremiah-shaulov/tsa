# `interface` ProjectChanges

[Documentation Index](../README.md)

Represents a set of changes that happen in project

## This interface has

- 4 properties:
[added](#-added-string--filewithprojectreferenceredirectinfo),
[removed](#-removed-string--filewithprojectreferenceredirectinfo),
[updated](#-updated-string--filewithprojectreferenceredirectinfo),
[updatedRedirects](#-updatedredirects-filewithprojectreferenceredirectinfo)


#### 📄 added: `string`\[] | [FileWithProjectReferenceRedirectInfo](../interface.FileWithProjectReferenceRedirectInfo/README.md)\[]

> List of added files



#### 📄 removed: `string`\[] | [FileWithProjectReferenceRedirectInfo](../interface.FileWithProjectReferenceRedirectInfo/README.md)\[]

> List of removed files



#### 📄 updated: `string`\[] | [FileWithProjectReferenceRedirectInfo](../interface.FileWithProjectReferenceRedirectInfo/README.md)\[]

> List of updated files



#### 📄 updatedRedirects?: [FileWithProjectReferenceRedirectInfo](../interface.FileWithProjectReferenceRedirectInfo/README.md)\[]

> List of files that have had their project reference redirect status updated
> Only provided when the synchronizeProjectList request has includeProjectReferenceRedirectInfo set to true



