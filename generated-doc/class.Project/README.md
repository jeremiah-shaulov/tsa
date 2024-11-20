# `abstract` `class` Project `implements` [LanguageServiceHost](../interface.LanguageServiceHost/README.md), [ModuleResolutionHost](../interface.ModuleResolutionHost/README.md)

[Documentation Index](../README.md)

## This class has

- static method [resolveModule](#-static-resolvemodulemodulename-string-initialdir-string-host-serverhost-log-message-string--void-)
- 5 properties:
[projectKind](#-readonly-projectkind-projectkind),
[projectService](#-readonly-projectservice-projectservice),
[compileOnSaveEnabled](#-compileonsaveenabled-boolean),
[languageServiceEnabled](#-languageserviceenabled-boolean),
[jsDocParsingMode](#-readonly-jsdocparsingmode-jsdocparsingmode--undefined)
- 62 methods:
[trace](#-traces-string-void),
[realpath](#-realpathpath-string-string),
[isNonTsProject](#-isnontsproject-boolean),
[isJsOnlyProject](#-isjsonlyproject-boolean),
[isKnownTypesPackageName](#-isknowntypespackagenamename-string-boolean),
[installPackage](#-installpackageoptions-installpackageoptions-promiseapplycodeactioncommandresult),
[getCompilationSettings](#-getcompilationsettings-compileroptions),
[getCompilerOptions](#-getcompileroptions-compileroptions),
[getNewLine](#-getnewline-string),
[getProjectVersion](#-getprojectversion-string),
[getProjectReferences](#-getprojectreferences-readonly-projectreference),
[getScriptFileNames](#-getscriptfilenames-string),
[getScriptKind](#-getscriptkindfilename-string-scriptkind),
[getScriptVersion](#-getscriptversionfilename-string-string),
[getScriptSnapshot](#-getscriptsnapshotfilename-string-iscriptsnapshot),
[getCancellationToken](#-getcancellationtoken-hostcancellationtoken),
[getCurrentDirectory](#-getcurrentdirectory-string),
[getDefaultLibFileName](#-getdefaultlibfilename-string),
[useCaseSensitiveFileNames](#-usecasesensitivefilenames-boolean),
[readDirectory](#-readdirectorypath-string-extensions-readonly-string-exclude-readonly-string-include-readonly-string-depth-number-string),
[readFile](#-readfilefilename-string-string),
[writeFile](#-writefilefilename-string-content-string-void),
[fileExists](#-fileexistsfile-string-boolean),
[directoryExists](#-directoryexistspath-string-boolean),
[getDirectories](#-getdirectoriespath-string-string),
[log](#-logs-string-void),
[error](#-errors-string-void),
[getGlobalProjectErrors](#-getglobalprojecterrors-readonly-diagnostic),
[getAllProjectErrors](#-getallprojecterrors-readonly-diagnostic),
[setProjectErrors](#-setprojecterrorsprojecterrors-diagnostic--undefined-void),
[getLanguageService](#-getlanguageserviceensuresynchronized-boolean-languageservice),
[getCompileOnSaveAffectedFileList](#-getcompileonsaveaffectedfilelistscriptinfo-scriptinfo-string),
[emitFile](#-emitfilescriptinfo-scriptinfo-writefile-path-string-data-string-writebyteordermark-boolean--void-emitresult),
[enableLanguageService](#-enablelanguageservice-void),
[disableLanguageService](#-disablelanguageservicelastfileexceededprogramsize-string-void),
[getProjectName](#-getprojectname-string),
[getExternalFiles](#-getexternalfilesupdatelevel-programupdatelevel-sortedreadonlyarraystring),
[getSourceFile](#-getsourcefilepath-path-sourcefile),
[close](#-close-void),
[isClosed](#-isclosed-boolean),
[hasRoots](#-hasroots-boolean),
[getRootFiles](#-getrootfiles-normalizedpath),
[getRootScriptInfos](#-getrootscriptinfos-scriptinfo),
[getScriptInfos](#-getscriptinfos-scriptinfo),
[getExcludedFiles](#-getexcludedfiles-readonly-normalizedpath),
[getFileNames](#-getfilenamesexcludefilesfromexternallibraries-boolean-excludeconfigfiles-boolean-normalizedpath),
[hasConfigFile](#-hasconfigfileconfigfilepath-normalizedpath-boolean),
[containsScriptInfo](#-containsscriptinfoinfo-scriptinfo-boolean),
[containsFile](#-containsfilefilename-normalizedpath-requireopen-boolean-boolean),
[isRoot](#-isrootinfo-scriptinfo-boolean),
[addRoot](#-addrootinfo-scriptinfo-filename-normalizedpath-void),
[addMissingFileRoot](#-addmissingfilerootfilename-normalizedpath-void),
[removeFile](#-removefileinfo-scriptinfo-fileexists-boolean-detachfromproject-boolean-void),
[registerFileUpdate](#-registerfileupdatefilename-string-void),
[updateGraph](#-updategraph-boolean),
[getScriptInfoForNormalizedPath](#-getscriptinfofornormalizedpathfilename-normalizedpath-scriptinfo),
[getScriptInfo](#-getscriptinfouncheckedfilename-string-scriptinfo),
[filesToString](#-filestostringwriteprojectfilenames-boolean-string),
[setCompilerOptions](#-setcompileroptionscompileroptions-compileroptions-void),
[setTypeAcquisition](#-settypeacquisitionnewtypeacquisition-typeacquisition--undefined-void),
[getTypeAcquisition](#-gettypeacquisition-typeacquisition),
[refreshDiagnostics](#-refreshdiagnostics-void)
- 4 protected properties:
[watchOptions](#-protected-watchoptions-watchoptions--undefined),
[languageService](#-protected-languageservice-languageservice),
[projectErrors](#-protected-projecterrors-diagnostic--undefined),
[isInitialLoadPending](#-protected-isinitialloadpending---boolean)
- 5 protected methods:
[removeLocalTypingsFromTypeAcquisition](#-protected-removelocaltypingsfromtypeacquisitionnewtypeacquisition-typeacquisition-typeacquisition),
[removeExistingTypings](#-protected-removeexistingtypingsinclude-string-string),
[removeRoot](#-protected-removerootinfo-scriptinfo-void),
[enableGlobalPlugins](#-protected-enableglobalpluginsoptions-compileroptions-void),
[enablePlugin](#-protected-enablepluginpluginconfigentry-pluginimport-searchpaths-string-void)


## Static members

#### ⚙ `static` resolveModule(moduleName: `string`, initialDir: `string`, host: [ServerHost](../interface.ServerHost/README.md), log: (message: `string`) => `void`): \{}



## Instance members

#### 📄 `readonly` projectKind: [ProjectKind](../enum.ProjectKind/README.md)



#### 📄 `readonly` projectService: [ProjectService](../class.ProjectService/README.md)



#### 📄 compileOnSaveEnabled: `boolean`



#### 📄 languageServiceEnabled: `boolean`



#### 📄 `readonly` jsDocParsingMode: [JSDocParsingMode](../enum.JSDocParsingMode/README.md) | `undefined`



#### ⚙ trace?(s: `string`): `void`



#### ⚙ realpath?(path: `string`): `string`

> Resolve a symbolic link.



#### ⚙ isNonTsProject(): `boolean`



#### ⚙ isJsOnlyProject(): `boolean`



#### ⚙ isKnownTypesPackageName(name: `string`): `boolean`



#### ⚙ installPackage(options: [InstallPackageOptions](../interface.InstallPackageOptions/README.md)): Promise\<[ApplyCodeActionCommandResult](../interface.ApplyCodeActionCommandResult/README.md)>



#### ⚙ getCompilationSettings(): [CompilerOptions](../interface.CompilerOptions/README.md)



#### ⚙ getCompilerOptions(): [CompilerOptions](../interface.CompilerOptions/README.md)



#### ⚙ getNewLine(): `string`



#### ⚙ getProjectVersion(): `string`



#### ⚙ getProjectReferences(): readonly ProjectReference\[]



#### ⚙ getScriptFileNames(): `string`\[]



#### ⚙ getScriptKind(fileName: `string`): [ScriptKind](../enum.ScriptKind/README.md)



#### ⚙ getScriptVersion(filename: `string`): `string`



#### ⚙ getScriptSnapshot(filename: `string`): [IScriptSnapshot](../interface.IScriptSnapshot/README.md)



#### ⚙ getCancellationToken(): [HostCancellationToken](../interface.HostCancellationToken/README.md)



#### ⚙ getCurrentDirectory(): `string`



#### ⚙ getDefaultLibFileName(): `string`



#### ⚙ useCaseSensitiveFileNames(): `boolean`



#### ⚙ readDirectory(path: `string`, extensions?: readonly `string`\[], exclude?: readonly `string`\[], include?: readonly `string`\[], depth?: `number`): `string`\[]



#### ⚙ readFile(fileName: `string`): `string`



#### ⚙ writeFile(fileName: `string`, content: `string`): `void`



#### ⚙ fileExists(file: `string`): `boolean`



#### ⚙ directoryExists(path: `string`): `boolean`



#### ⚙ getDirectories(path: `string`): `string`\[]



#### ⚙ log(s: `string`): `void`



#### ⚙ error(s: `string`): `void`



#### ⚙ getGlobalProjectErrors(): readonly Diagnostic\[]

> Get the errors that dont have any file name associated



#### ⚙ getAllProjectErrors(): readonly Diagnostic\[]

> Get all the project errors



#### ⚙ setProjectErrors(projectErrors: [Diagnostic](../interface.Diagnostic/README.md)\[] | `undefined`): `void`



#### ⚙ getLanguageService(ensureSynchronized?: `boolean`): [LanguageService](../interface.LanguageService/README.md)



#### ⚙ getCompileOnSaveAffectedFileList(scriptInfo: [ScriptInfo](../class.ScriptInfo/README.md)): `string`\[]



#### ⚙ emitFile(scriptInfo: [ScriptInfo](../class.ScriptInfo/README.md), writeFile: (path: `string`, data: `string`, writeByteOrderMark?: `boolean`) => `void`): [EmitResult](../interface.EmitResult/README.md)

> Returns true if emit was conducted



#### ⚙ enableLanguageService(): `void`



#### ⚙ disableLanguageService(lastFileExceededProgramSize?: `string`): `void`



#### ⚙ getProjectName(): `string`



#### ⚙ getExternalFiles(updateLevel?: [ProgramUpdateLevel](../enum.ProgramUpdateLevel/README.md)): [SortedReadonlyArray](../interface.SortedReadonlyArray/README.md)\<`string`>



#### ⚙ getSourceFile(path: [Path](../type.Path/README.md)): [SourceFile](../interface.SourceFile/README.md)



#### ⚙ close(): `void`



#### ⚙ isClosed(): `boolean`



#### ⚙ hasRoots(): `boolean`



#### ⚙ getRootFiles(): NormalizedPath\[]



#### ⚙ getRootScriptInfos(): [ScriptInfo](../class.ScriptInfo/README.md)\[]



#### ⚙ getScriptInfos(): [ScriptInfo](../class.ScriptInfo/README.md)\[]



#### ⚙ getExcludedFiles(): readonly NormalizedPath\[]



#### ⚙ getFileNames(excludeFilesFromExternalLibraries?: `boolean`, excludeConfigFiles?: `boolean`): NormalizedPath\[]



#### ⚙ hasConfigFile(configFilePath: [NormalizedPath](../type.NormalizedPath/README.md)): `boolean`



#### ⚙ containsScriptInfo(info: [ScriptInfo](../class.ScriptInfo/README.md)): `boolean`



#### ⚙ containsFile(filename: [NormalizedPath](../type.NormalizedPath/README.md), requireOpen?: `boolean`): `boolean`



#### ⚙ isRoot(info: [ScriptInfo](../class.ScriptInfo/README.md)): `boolean`



#### ⚙ addRoot(info: [ScriptInfo](../class.ScriptInfo/README.md), fileName?: [NormalizedPath](../type.NormalizedPath/README.md)): `void`



#### ⚙ addMissingFileRoot(fileName: [NormalizedPath](../type.NormalizedPath/README.md)): `void`



#### ⚙ removeFile(info: [ScriptInfo](../class.ScriptInfo/README.md), fileExists: `boolean`, detachFromProject: `boolean`): `void`



#### ⚙ registerFileUpdate(fileName: `string`): `void`



#### ⚙ updateGraph(): `boolean`

> Updates set of files that contribute to this project
> 
> ✔️ Return value:
> 
> : true if set of files in the project stays the same and false - otherwise.



#### ⚙ getScriptInfoForNormalizedPath(fileName: [NormalizedPath](../type.NormalizedPath/README.md)): [ScriptInfo](../class.ScriptInfo/README.md)



#### ⚙ getScriptInfo(uncheckedFileName: `string`): [ScriptInfo](../class.ScriptInfo/README.md)



#### ⚙ filesToString(writeProjectFileNames: `boolean`): `string`



#### ⚙ setCompilerOptions(compilerOptions: [CompilerOptions](../interface.CompilerOptions/README.md)): `void`



#### ⚙ setTypeAcquisition(newTypeAcquisition: [TypeAcquisition](../interface.TypeAcquisition/README.md) | `undefined`): `void`



#### ⚙ getTypeAcquisition(): [TypeAcquisition](../interface.TypeAcquisition/README.md)



#### ⚙ refreshDiagnostics(): `void`

> Starts a new check for diagnostics. Call this if some file has updated that would cause diagnostics to be changed.



#### 📄 `protected` watchOptions: [WatchOptions](../interface.WatchOptions/README.md) | `undefined`



#### 📄 `protected` languageService: [LanguageService](../interface.LanguageService/README.md)



#### 📄 `protected` projectErrors: [Diagnostic](../interface.Diagnostic/README.md)\[] | `undefined`



#### 📄 `protected` isInitialLoadPending: () => `boolean`



#### ⚙ `protected` removeLocalTypingsFromTypeAcquisition(newTypeAcquisition: [TypeAcquisition](../interface.TypeAcquisition/README.md)): [TypeAcquisition](../interface.TypeAcquisition/README.md)



#### ⚙ `protected` removeExistingTypings(include: `string`\[]): `string`\[]



#### ⚙ `protected` removeRoot(info: [ScriptInfo](../class.ScriptInfo/README.md)): `void`



#### ⚙ `protected` enableGlobalPlugins(options: [CompilerOptions](../interface.CompilerOptions/README.md)): `void`



#### ⚙ `protected` enablePlugin(pluginConfigEntry: [PluginImport](../interface.PluginImport/README.md), searchPaths: `string`\[]): `void`



