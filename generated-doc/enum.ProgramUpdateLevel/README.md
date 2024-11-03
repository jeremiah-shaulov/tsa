# `enum` ProgramUpdateLevel

[Documentation Index](../README.md)

#### Update = <mark>0</mark>

> Program is updated with same root file names and options



#### RootNamesAndUpdate = <mark>1</mark>

> Loads program after updating root file names from the disk



#### Full = <mark>2</mark>

> Loads program completely, including:
> - re-reading contents of config file from disk
> - calculating root file names for the program
> - Updating the program



