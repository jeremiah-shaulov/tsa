# `interface` CompileOnSaveAffectedFileListRequest `extends` [FileRequest](../interface.FileRequest/README.md)

[Documentation Index](../README.md)

Request to obtain the list of files that should be regenerated if target file is recompiled.
NOTE: this us query-only operation and does not generate any output on disk.

## This interface has

- property [command](#-command-commandtypescompileonsaveaffectedfilelist)
- 1 inherited member from [FileRequest](../interface.FileRequest/README.md), 1 from [Request](../interface.Request/README.md), 1 from [Message](../interface.Message/README.md)


#### 📄 command: [CommandTypes.CompileOnSaveAffectedFileList](../enum.CommandTypes/README.md#compileonsaveaffectedfilelist--compileonsaveaffectedfilelist)

> The command to execute



