# `class` ProjectService

[Documentation Index](../README.md)

## This class has

- [constructor](#-constructoropts-projectserviceoptions)
- 18 properties:
[externalProjects](#-readonly-externalprojects-externalproject),
[inferredProjects](#-readonly-inferredprojects-inferredproject),
[configuredProjects](#-readonly-configuredprojects-mapstring-configuredproject),
[openFiles](#-readonly-openfiles-mappath-normalizedpath--undefined),
[currentDirectory](#-readonly-currentdirectory-normalizedpath),
[host](#-readonly-host-serverhost),
[logger](#-readonly-logger-logger),
[cancellationToken](#-readonly-cancellationtoken-hostcancellationtoken),
[useSingleInferredProject](#-readonly-usesingleinferredproject-boolean),
[useInferredProjectPerProjectRoot](#-readonly-useinferredprojectperprojectroot-boolean),
[typingsInstaller](#-readonly-typingsinstaller-itypingsinstaller),
[throttleWaitMilliseconds](#-readonly-throttlewaitmilliseconds-number),
[globalPlugins](#-readonly-globalplugins-readonly-string),
[pluginProbeLocations](#-readonly-pluginprobelocations-readonly-string),
[allowLocalPluginLoads](#-readonly-allowlocalpluginloads-boolean),
[typesMapLocation](#-readonly-typesmaplocation-string--undefined),
[serverMode](#-readonly-servermode-languageservicemode),
[jsDocParsingMode](#-readonly-jsdocparsingmode-jsdocparsingmode--undefined)
- 28 methods:
[toCanonicalFileName](#-tocanonicalfilenamef-string-string),
[toPath](#-topathfilename-string-path),
[updateTypingsForProject](#-updatetypingsforprojectresponse-settypings--invalidatecachedtypings--packageinstalledresponse-void),
[setCompilerOptionsForInferredProjects](#-setcompileroptionsforinferredprojectsprojectcompileroptions-protocolinferredprojectcompileroptions-projectrootpath-string-void),
[findProject](#-findprojectprojectname-string-project),
[getDefaultProjectForFile](#-getdefaultprojectforfilefilename-normalizedpath-ensureproject-boolean-project),
[getScriptInfoEnsuringProjectsUptoDate](#-getscriptinfoensuringprojectsuptodateuncheckedfilename-string-scriptinfo),
[getFormatCodeOptions](#-getformatcodeoptionsfile-normalizedpath-formatcodesettings),
[getPreferences](#-getpreferencesfile-normalizedpath-userpreferences),
[getHostFormatCodeOptions](#-gethostformatcodeoptions-formatcodesettings),
[getHostPreferences](#-gethostpreferences-userpreferences),
[getScriptInfo](#-getscriptinfouncheckedfilename-string-scriptinfo),
[getOrCreateScriptInfoForNormalizedPath](#-getorcreatescriptinfofornormalizedpathfilename-normalizedpath-openedbyclient-boolean-filecontent-string-scriptkind-scriptkind-hasmixedcontent-boolean-hosttoqueryfileexistson-fileexistspath-string-boolean-scriptinfo),
[getScriptInfoForNormalizedPath](#-getscriptinfofornormalizedpathfilename-normalizedpath-scriptinfo),
[getScriptInfoForPath](#-getscriptinfoforpathfilename-path-scriptinfo),
[setHostConfiguration](#-sethostconfigurationargs-protocolconfigurerequestarguments-void),
[closeLog](#-closelog-void),
[reloadProjects](#-reloadprojects-void),
[openClientFile](#-openclientfilefilename-string-filecontent-string-scriptkind-scriptkind-projectrootpath-string-openconfiguredprojectresult),
[openClientFileWithNormalizedPath](#-openclientfilewithnormalizedpathfilename-normalizedpath-filecontent-string-scriptkind-scriptkind-hasmixedcontent-boolean-projectrootpath-normalizedpath-openconfiguredprojectresult),
[closeClientFile](#-closeclientfileuncheckedfilename-string-void),
[closeExternalProject](#-closeexternalprojectuncheckedfilename-string-void),
[openExternalProjects](#-openexternalprojectsprojects-protocolexternalproject-void),
[resetSafeList](#-resetsafelist-void),
[applySafeList](#-applysafelistproj-protocolexternalproject-normalizedpath),
[openExternalProject](#-openexternalprojectproj-protocolexternalproject-void),
[hasDeferredExtension](#-hasdeferredextension-boolean),
[configurePlugin](#-configurepluginargs-protocolconfigurepluginrequestarguments-void)


#### 🔧 `constructor`(opts: [ProjectServiceOptions](../interface.ProjectServiceOptions/README.md))



#### 📄 `readonly` externalProjects: [ExternalProject](../class.ExternalProject/README.md)\[]

> external projects (configuration and list of root files is not controlled by tsserver)



#### 📄 `readonly` inferredProjects: [InferredProject](../class.InferredProject/README.md)\[]

> projects built from openFileRoots



#### 📄 `readonly` configuredProjects: Map\<`string`, [ConfiguredProject](../class.ConfiguredProject/README.md)>

> projects specified by a tsconfig.json file



#### 📄 `readonly` openFiles: Map\<[Path](../type.Path/README.md), [NormalizedPath](../type.NormalizedPath/README.md) | `undefined`>

> Open files: with value being project root path, and key being Path of the file that is open



#### 📄 `readonly` currentDirectory: [NormalizedPath](../type.NormalizedPath/README.md)



#### 📄 `readonly` host: [ServerHost](../interface.ServerHost/README.md)



#### 📄 `readonly` logger: [Logger](../interface.Logger/README.md)



#### 📄 `readonly` cancellationToken: [HostCancellationToken](../interface.HostCancellationToken/README.md)



#### 📄 `readonly` useSingleInferredProject: `boolean`



#### 📄 `readonly` useInferredProjectPerProjectRoot: `boolean`



#### 📄 `readonly` typingsInstaller: [ITypingsInstaller](../interface.ITypingsInstaller/README.md)



#### 📄 `readonly` throttleWaitMilliseconds?: `number`



#### 📄 `readonly` globalPlugins: readonly `string`\[]



#### 📄 `readonly` pluginProbeLocations: readonly `string`\[]



#### 📄 `readonly` allowLocalPluginLoads: `boolean`



#### 📄 `readonly` typesMapLocation: `string` | `undefined`



#### 📄 `readonly` serverMode: [LanguageServiceMode](../enum.LanguageServiceMode/README.md)



#### 📄 `readonly` jsDocParsingMode: [JSDocParsingMode](../enum.JSDocParsingMode/README.md) | `undefined`



#### ⚙ toCanonicalFileName(f: `string`): `string`



#### ⚙ toPath(fileName: `string`): Path



#### ⚙ updateTypingsForProject(response: [SetTypings](../interface.SetTypings/README.md) | [InvalidateCachedTypings](../interface.InvalidateCachedTypings/README.md) | [PackageInstalledResponse](../interface.PackageInstalledResponse/README.md)): `void`



#### ⚙ setCompilerOptionsForInferredProjects(projectCompilerOptions: [protocol.InferredProjectCompilerOptions](../type.InferredProjectCompilerOptions/README.md), projectRootPath?: `string`): `void`



#### ⚙ findProject(projectName: `string`): [Project](../class.Project/README.md)



#### ⚙ getDefaultProjectForFile(fileName: [NormalizedPath](../type.NormalizedPath/README.md), ensureProject: `boolean`): [Project](../class.Project/README.md)



#### ⚙ getScriptInfoEnsuringProjectsUptoDate(uncheckedFileName: `string`): [ScriptInfo](../class.ScriptInfo/README.md)



#### ⚙ getFormatCodeOptions(file: [NormalizedPath](../type.NormalizedPath/README.md)): [FormatCodeSettings](../interface.FormatCodeSettings/README.md)



#### ⚙ getPreferences(file: [NormalizedPath](../type.NormalizedPath/README.md)): [UserPreferences](../interface.UserPreferences/README.md)



#### ⚙ getHostFormatCodeOptions(): [FormatCodeSettings](../interface.FormatCodeSettings/README.md)



#### ⚙ getHostPreferences(): [UserPreferences](../interface.UserPreferences/README.md)



#### ⚙ getScriptInfo(uncheckedFileName: `string`): [ScriptInfo](../class.ScriptInfo/README.md)



#### ⚙ getOrCreateScriptInfoForNormalizedPath(fileName: [NormalizedPath](../type.NormalizedPath/README.md), openedByClient: `boolean`, fileContent?: `string`, scriptKind?: [ScriptKind](../enum.ScriptKind/README.md), hasMixedContent?: `boolean`, hostToQueryFileExistsOn?: \{fileExists(path: `string`): `boolean`}): [ScriptInfo](../class.ScriptInfo/README.md)



#### ⚙ getScriptInfoForNormalizedPath(fileName: [NormalizedPath](../type.NormalizedPath/README.md)): [ScriptInfo](../class.ScriptInfo/README.md)

> This gets the script info for the normalized path. If the path is not rooted disk path then the open script info with project root context is preferred



#### ⚙ getScriptInfoForPath(fileName: [Path](../type.Path/README.md)): [ScriptInfo](../class.ScriptInfo/README.md)



#### ⚙ setHostConfiguration(args: [protocol.ConfigureRequestArguments](../interface.ConfigureRequestArguments/README.md)): `void`



#### ⚙ closeLog(): `void`



#### ⚙ reloadProjects(): `void`

> This function rebuilds the project for every file opened by the client
> This does not reload contents of open files from disk. But we could do that if needed



#### ⚙ openClientFile(fileName: `string`, fileContent?: `string`, scriptKind?: [ScriptKind](../enum.ScriptKind/README.md), projectRootPath?: `string`): [OpenConfiguredProjectResult](../interface.OpenConfiguredProjectResult/README.md)

> Open file whose contents is managed by the client
> 
> 🎚️ Parameter **filename**:
> 
> is absolute pathname
> 
> 🎚️ Parameter **fileContent**:
> 
> is a known version of the file content that is more up to date than the one on disk



#### ⚙ openClientFileWithNormalizedPath(fileName: [NormalizedPath](../type.NormalizedPath/README.md), fileContent?: `string`, scriptKind?: [ScriptKind](../enum.ScriptKind/README.md), hasMixedContent?: `boolean`, projectRootPath?: [NormalizedPath](../type.NormalizedPath/README.md)): [OpenConfiguredProjectResult](../interface.OpenConfiguredProjectResult/README.md)



#### ⚙ closeClientFile(uncheckedFileName: `string`): `void`

> Close file whose contents is managed by the client
> 
> 🎚️ Parameter **filename**:
> 
> is absolute pathname



#### ⚙ closeExternalProject(uncheckedFileName: `string`): `void`



#### ⚙ openExternalProjects(projects: [protocol.ExternalProject](../interface.ExternalProject/README.md)\[]): `void`



#### ⚙ resetSafeList(): `void`



#### ⚙ applySafeList(proj: [protocol.ExternalProject](../interface.ExternalProject/README.md)): NormalizedPath\[]



#### ⚙ openExternalProject(proj: [protocol.ExternalProject](../interface.ExternalProject/README.md)): `void`



#### ⚙ hasDeferredExtension(): `boolean`



#### ⚙ configurePlugin(args: [protocol.ConfigurePluginRequestArguments](../interface.ConfigurePluginRequestArguments/README.md)): `void`



