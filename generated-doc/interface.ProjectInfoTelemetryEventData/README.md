# `interface` ProjectInfoTelemetryEventData

[Documentation Index](../README.md)

## This interface has

- 13 properties:
[projectId](#-readonly-projectid-string),
[fileStats](#-readonly-filestats-filestats),
[compilerOptions](#-readonly-compileroptions-compileroptions),
[extends](#-readonly-extends-boolean--undefined),
[files](#-readonly-files-boolean--undefined),
[include](#-readonly-include-boolean--undefined),
[exclude](#-readonly-exclude-boolean--undefined),
[compileOnSave](#-readonly-compileonsave-boolean),
[typeAcquisition](#-readonly-typeacquisition-projectinfotypeacquisitiondata),
[configFileName](#-readonly-configfilename-tsconfigjson--jsconfigjson--other),
[projectType](#-readonly-projecttype-external--configured),
[languageServiceEnabled](#-readonly-languageserviceenabled-boolean),
[version](#-readonly-version-string)


#### 📄 `readonly` projectId: `string`

> Cryptographically secure hash of project file location.



#### 📄 `readonly` fileStats: [FileStats](../interface.FileStats/README.md)

> Count of file extensions seen in the project.



#### 📄 `readonly` compilerOptions: [CompilerOptions](../interface.CompilerOptions/README.md)

> Any compiler options that might contain paths will be taken out.
> Enum compiler options will be converted to strings.



#### 📄 `readonly` extends: `boolean` | `undefined`



#### 📄 `readonly` files: `boolean` | `undefined`



#### 📄 `readonly` include: `boolean` | `undefined`



#### 📄 `readonly` exclude: `boolean` | `undefined`



#### 📄 `readonly` compileOnSave: `boolean`



#### 📄 `readonly` typeAcquisition: [ProjectInfoTypeAcquisitionData](../interface.ProjectInfoTypeAcquisitionData/README.md)



#### 📄 `readonly` configFileName: <mark>"tsconfig.json"</mark> | <mark>"jsconfig.json"</mark> | <mark>"other"</mark>



#### 📄 `readonly` projectType: <mark>"external"</mark> | <mark>"configured"</mark>



#### 📄 `readonly` languageServiceEnabled: `boolean`



#### 📄 `readonly` version: `string`

> TypeScript version used by the server.



