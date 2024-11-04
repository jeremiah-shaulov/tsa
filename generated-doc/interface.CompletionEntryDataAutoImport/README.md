# `interface` CompletionEntryDataAutoImport

[Documentation Index](../README.md)

## This interface has

- 6 properties:
[exportName](#-exportname-string),
[exportMapKey](#-exportmapkey-exportmapinfokey),
[moduleSpecifier](#-modulespecifier-string),
[fileName](#-filename-string),
[ambientModuleName](#-ambientmodulename-string),
[isPackageJsonImport](#-ispackagejsonimport-true)


#### 📄 exportName: `string`

> The name of the property or export in the module's symbol table. Differs from the completion name
> in the case of InternalSymbolName.ExportEquals and InternalSymbolName.Default.



#### 📄 exportMapKey?: [ExportMapInfoKey](../type.ExportMapInfoKey/README.md)



#### 📄 moduleSpecifier?: `string`



#### 📄 fileName?: `string`

> The file name declaring the export's module symbol, if it was an external module



#### 📄 ambientModuleName?: `string`

> The module name (with quotes stripped) of the export's module symbol, if it was an ambient module



#### 📄 isPackageJsonImport?: `true`

> True if the export was found in the package.json AutoImportProvider



