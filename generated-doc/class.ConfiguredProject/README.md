# `class` ConfiguredProject `extends` [Project](../class.Project/README.md)

[Documentation Index](../README.md)

If a file is opened, the server will look for a tsconfig (or jsconfig)
and if successful create a ConfiguredProject for it.
Otherwise it will create an InferredProject.

## This class has

- property [canonicalConfigFilePath](#-readonly-canonicalconfigfilepath-normalizedpath)
- 9 methods:
[updateGraph](#-override-updategraph-boolean),
[getConfigFilePath](#-getconfigfilepath-normalizedpath),
[getProjectReferences](#-override-getprojectreferences-readonly-projectreference),
[updateReferences](#-updatereferencesrefs-readonly-projectreference--undefined-void),
[getGlobalProjectErrors](#-override-getglobalprojecterrors-readonly-diagnostic),
[getAllProjectErrors](#-override-getallprojecterrors-readonly-diagnostic),
[setProjectErrors](#-override-setprojecterrorsprojecterrors-diagnostic-void),
[close](#-override-close-void),
[getEffectiveTypeRoots](#-geteffectivetyperoots-string)
- 106 inherited members from [Project](../class.Project/README.md)


#### 📄 `readonly` canonicalConfigFilePath: [NormalizedPath](../type.NormalizedPath/README.md)



#### ⚙ `override` updateGraph(): `boolean`

> If the project has reload from disk pending, it reloads (and then updates graph as part of that) instead of just updating the graph
> 
> ✔️ Return value:
> 
> : true if set of files in the project stays the same and false - otherwise.



#### ⚙ getConfigFilePath(): NormalizedPath



#### ⚙ `override` getProjectReferences(): readonly ProjectReference\[]



#### ⚙ updateReferences(refs: readonly [ProjectReference](../interface.ProjectReference/README.md)\[] | `undefined`): `void`



#### ⚙ `override` getGlobalProjectErrors(): readonly Diagnostic\[]

> Get the errors that dont have any file name associated



#### ⚙ `override` getAllProjectErrors(): readonly Diagnostic\[]

> Get all the project errors



#### ⚙ `override` setProjectErrors(projectErrors: [Diagnostic](../interface.Diagnostic/README.md)\[]): `void`



#### ⚙ `override` close(): `void`



#### ⚙ getEffectiveTypeRoots(): `string`\[]



