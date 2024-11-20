# `interface` ProjectLanguageServiceStateEventBody

[Documentation Index](../README.md)

## This interface has

- 2 properties:
[projectName](#-projectname-string),
[languageServiceEnabled](#-languageserviceenabled-boolean)


#### 📄 projectName: `string`

> Project name that has changes in the state of language service.
> For configured projects this will be the config file path.
> For external projects this will be the name of the projects specified when project was open.
> For inferred projects this event is not raised.



#### 📄 languageServiceEnabled: `boolean`

> True if language service state switched from disabled to enabled
> and false otherwise.



