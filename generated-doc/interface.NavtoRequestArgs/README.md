# `interface` NavtoRequestArgs

[Documentation Index](../README.md)

Arguments for navto request message.

## This interface has

- 5 properties:
[searchValue](#-searchvalue-string),
[maxResultCount](#-maxresultcount-number),
[file](#-file-string),
[currentFileOnly](#-currentfileonly-boolean),
[projectFileName](#-projectfilename-string)


#### 📄 searchValue: `string`

> Search term to navigate to from current location; term can
> be '.*' or an identifier prefix.



#### 📄 maxResultCount?: `number`

> Optional limit on the number of items to return.



#### 📄 file?: `string`

> The file for the request (absolute pathname required).



#### 📄 currentFileOnly?: `boolean`

> Optional flag to indicate we want results for just the current file
> or the entire project.



#### 📄 projectFileName?: `string`



