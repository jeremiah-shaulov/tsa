# `interface` DefaultConfiguredProjectInfo

[Documentation Index](../README.md)

Details about the default project for the file if tsconfig file is found

## This interface has

- 3 properties:
[notMatchedByConfig](#-notmatchedbyconfig-readonly-string),
[notInProject](#-notinproject-readonly-string),
[defaultProject](#-defaultproject-string)


#### 📄 notMatchedByConfig?: readonly `string`\[]

> List of config files looked and did not match because file was not part of root file names



#### 📄 notInProject?: readonly `string`\[]

> List of projects which were loaded but file was not part of the project or is file from referenced project



#### 📄 defaultProject?: `string`

> Configured project used as default



