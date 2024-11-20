# `interface` ITypingsInstaller

[Documentation Index](../README.md)

## This interface has

- property [globalTypingsCacheLocation](#-readonly-globaltypingscachelocation-string--undefined)
- 5 methods:
[isKnownTypesPackageName](#-isknowntypespackagenamename-string-boolean),
[installPackage](#-installpackageoptions-installpackageoptionswithproject-promiseapplycodeactioncommandresult),
[enqueueInstallTypingsRequest](#-enqueueinstalltypingsrequestp-project-typeacquisition-typeacquisition-unresolvedimports-sortedreadonlyarraystring--undefined-void),
[attach](#-attachprojectservice-projectservice-void),
[onProjectClosed](#-onprojectclosedp-project-void)


#### 📄 `readonly` globalTypingsCacheLocation: `string` | `undefined`



#### ⚙ isKnownTypesPackageName(name: `string`): `boolean`



#### ⚙ installPackage(options: [InstallPackageOptionsWithProject](../interface.InstallPackageOptionsWithProject/README.md)): Promise\<[ApplyCodeActionCommandResult](../interface.ApplyCodeActionCommandResult/README.md)>



#### ⚙ enqueueInstallTypingsRequest(p: [Project](../class.Project/README.md), typeAcquisition: [TypeAcquisition](../interface.TypeAcquisition/README.md), unresolvedImports: [SortedReadonlyArray](../interface.SortedReadonlyArray/README.md)\<`string`> | `undefined`): `void`



#### ⚙ attach(projectService: [ProjectService](../class.ProjectService/README.md)): `void`



#### ⚙ onProjectClosed(p: [Project](../class.Project/README.md)): `void`



