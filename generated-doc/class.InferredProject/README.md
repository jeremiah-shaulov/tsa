# `class` InferredProject `extends` [Project](../class.Project/README.md)

[Documentation Index](../README.md)

If a file is opened and no tsconfig (or jsconfig) is found,
the file and its imports/references are put into an InferredProject.

## This class has

- property [projectRootPath](#-readonly-projectrootpath-string--undefined)
- 7 methods:
[toggleJsInferredProject](#-togglejsinferredprojectisjsinferredproject-boolean-void),
[setCompilerOptions](#-override-setcompileroptionsoptions-compileroptions-void),
[addRoot](#-override-addrootinfo-scriptinfo-void),
[removeRoot](#-override-removerootinfo-scriptinfo-void),
[isProjectWithSingleRoot](#-isprojectwithsingleroot-boolean),
[close](#-override-close-void),
[getTypeAcquisition](#-override-gettypeacquisition-typeacquisition)
- 107 inherited members from [Project](../class.Project/README.md)


#### 📄 `readonly` projectRootPath: `string` | `undefined`

> this is canonical project root path



#### ⚙ toggleJsInferredProject(isJsInferredProject: `boolean`): `void`



#### ⚙ `override` setCompilerOptions(options?: [CompilerOptions](../interface.CompilerOptions/README.md)): `void`



#### ⚙ `override` addRoot(info: [ScriptInfo](../class.ScriptInfo/README.md)): `void`



#### ⚙ `override` removeRoot(info: [ScriptInfo](../class.ScriptInfo/README.md)): `void`



#### ⚙ isProjectWithSingleRoot(): `boolean`



#### ⚙ `override` close(): `void`



#### ⚙ `override` getTypeAcquisition(): [TypeAcquisition](../interface.TypeAcquisition/README.md)



