# `interface` LoadResponseModule

[Documentation Index](../README.md)

## This interface has

- 4 properties:
[kind](#-kind-module),
[specifier](#-specifier-string),
[headers](#-headers-recordstring-string),
[content](#-content-string)


#### 📄 kind: <mark>"module"</mark>

> A module with code has been loaded.



#### 📄 specifier: `string`

> The string URL of the resource. If there were redirects, the final
> specifier should be set here, otherwise the requested specifier.



#### 📄 headers?: Record\<`string`, `string`>

> For remote resources, a record of headers should be set, where the key's
> have been normalized to be lower case values.



#### 📄 content: `string`

> The string value of the loaded resources.



