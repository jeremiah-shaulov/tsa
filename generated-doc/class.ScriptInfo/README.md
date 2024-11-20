# `class` ScriptInfo

[Documentation Index](../README.md)

## This class has

- [constructor](#-constructorhost-serverhost-filename-normalizedpath-scriptkind-scriptkind-hasmixedcontent-boolean-path-path-initialversion-number)
- 5 properties:
[fileName](#-readonly-filename-normalizedpath),
[scriptKind](#-readonly-scriptkind-scriptkind),
[hasMixedContent](#-readonly-hasmixedcontent-boolean),
[path](#-readonly-path-path),
[containingProjects](#-readonly-containingprojects-project)
- 23 methods:
[isScriptOpen](#-isscriptopen-boolean),
[open](#-opennewtext-string--undefined-void),
[close](#-closefileexists-boolean-void),
[getSnapshot](#-getsnapshot-iscriptsnapshot),
[getFormatCodeSettings](#-getformatcodesettings-formatcodesettings),
[getPreferences](#-getpreferences-userpreferences),
[attachToProject](#-attachtoprojectproject-project-boolean),
[isAttached](#-isattachedproject-project-boolean),
[detachFromProject](#-detachfromprojectproject-project-void),
[detachAllProjects](#-detachallprojects-void),
[getDefaultProject](#-getdefaultproject-project),
[registerFileUpdate](#-registerfileupdate-void),
[setOptions](#-setoptionsformatsettings-formatcodesettings-preferences-protocoluserpreferences--undefined-void),
[getLatestVersion](#-getlatestversion-string),
[saveTo](#-savetofilename-string-void),
[reloadFromFile](#-reloadfromfiletempfilename-normalizedpath-boolean),
[editContent](#-editcontentstart-number-end-number-newtext-string-void),
[markContainingProjectsAsDirty](#-markcontainingprojectsasdirty-void),
[isOrphan](#-isorphan-boolean),
[lineToTextSpan](#-linetotextspanline-number-textspan),
[lineOffsetToPosition](#-lineoffsettopositionline-number-offset-number-number),
[positionToLineOffset](#-positiontolineoffsetposition-number-location),
[isJavaScript](#-isjavascript-boolean)


#### 🔧 `constructor`(host: [ServerHost](../interface.ServerHost/README.md), fileName: [NormalizedPath](../type.NormalizedPath/README.md), scriptKind: [ScriptKind](../enum.ScriptKind/README.md), hasMixedContent: `boolean`, path: [Path](../type.Path/README.md), initialVersion?: `number`)



#### 📄 `readonly` fileName: [NormalizedPath](../type.NormalizedPath/README.md)



#### 📄 `readonly` scriptKind: [ScriptKind](../enum.ScriptKind/README.md)



#### 📄 `readonly` hasMixedContent: `boolean`



#### 📄 `readonly` path: [Path](../type.Path/README.md)



#### 📄 `readonly` containingProjects: [Project](../class.Project/README.md)\[]

> All projects that include this file



#### ⚙ isScriptOpen(): `boolean`



#### ⚙ open(newText: `string` | `undefined`): `void`



#### ⚙ close(fileExists?: `boolean`): `void`



#### ⚙ getSnapshot(): [IScriptSnapshot](../interface.IScriptSnapshot/README.md)



#### ⚙ getFormatCodeSettings(): [FormatCodeSettings](../interface.FormatCodeSettings/README.md)



#### ⚙ getPreferences(): [UserPreferences](../interface.UserPreferences/README.md)



#### ⚙ attachToProject(project: [Project](../class.Project/README.md)): `boolean`



#### ⚙ isAttached(project: [Project](../class.Project/README.md)): `boolean`



#### ⚙ detachFromProject(project: [Project](../class.Project/README.md)): `void`



#### ⚙ detachAllProjects(): `void`



#### ⚙ getDefaultProject(): [Project](../class.Project/README.md)



#### ⚙ registerFileUpdate(): `void`



#### ⚙ setOptions(formatSettings: [FormatCodeSettings](../interface.FormatCodeSettings/README.md), preferences: [protocol.UserPreferences](../interface.UserPreferences/README.md) | `undefined`): `void`



#### ⚙ getLatestVersion(): `string`



#### ⚙ saveTo(fileName: `string`): `void`



#### ⚙ reloadFromFile(tempFileName?: [NormalizedPath](../type.NormalizedPath/README.md)): `boolean`



#### ⚙ editContent(start: `number`, end: `number`, newText: `string`): `void`



#### ⚙ markContainingProjectsAsDirty(): `void`



#### ⚙ isOrphan(): `boolean`



#### ⚙ lineToTextSpan(line: `number`): [TextSpan](../interface.TextSpan/README.md)

> 🎚️ Parameter **line**:
> 
> 1 based index



#### ⚙ lineOffsetToPosition(line: `number`, offset: `number`): `number`

> 🎚️ Parameter **line**:
> 
> 1 based index
> 
> 🎚️ Parameter **offset**:
> 
> 1 based index



#### ⚙ positionToLineOffset(position: `number`): [Location](../interface.Location.2/README.md)



#### ⚙ isJavaScript(): `boolean`



