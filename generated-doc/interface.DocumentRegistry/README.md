# `interface` DocumentRegistry

[Documentation Index](../README.md)

The document registry represents a store of SourceFile objects that can be shared between
multiple LanguageService instances. A LanguageService instance holds on the SourceFile (AST)
of files in the context.
SourceFile objects account for most of the memory usage by the language service. Sharing
the same DocumentRegistry instance between different instances of LanguageService allow
for more efficient memory utilization since all projects will share at least the library
file (lib.d.ts).

A more advanced use of the document registry is to serialize sourceFile objects to disk
and re-hydrate them when needed.

To create a default DocumentRegistry, use createDocumentRegistry to create one, and pass it
to all subsequent createLanguageService calls.

## This interface has

- 8 methods:
[acquireDocument](#-acquiredocumentfilename-string-compilationsettingsorhost-compileroptions--minimalresolutioncachehost-scriptsnapshot-iscriptsnapshot-version-string-scriptkind-scriptkind-sourcefileoptions-createsourcefileoptions--scripttarget-sourcefile),
[acquireDocumentWithKey](#-acquiredocumentwithkeyfilename-string-path-path-compilationsettingsorhost-compileroptions--minimalresolutioncachehost-key-documentregistrybucketkey-scriptsnapshot-iscriptsnapshot-version-string-scriptkind-scriptkind-sourcefileoptions-createsourcefileoptions--scripttarget-sourcefile),
[updateDocument](#-updatedocumentfilename-string-compilationsettingsorhost-compileroptions--minimalresolutioncachehost-scriptsnapshot-iscriptsnapshot-version-string-scriptkind-scriptkind-sourcefileoptions-createsourcefileoptions--scripttarget-sourcefile),
[updateDocumentWithKey](#-updatedocumentwithkeyfilename-string-path-path-compilationsettingsorhost-compileroptions--minimalresolutioncachehost-key-documentregistrybucketkey-scriptsnapshot-iscriptsnapshot-version-string-scriptkind-scriptkind-sourcefileoptions-createsourcefileoptions--scripttarget-sourcefile),
[getKeyForCompilationSettings](#-getkeyforcompilationsettingssettings-compileroptions-documentregistrybucketkey),
[releaseDocument](#-releasedocumentfilename-string-compilationsettings-compileroptions-scriptkind-scriptkind-impliednodeformat-resolutionmode-void),
[releaseDocumentWithKey](#-releasedocumentwithkeypath-path-key-documentregistrybucketkey-scriptkind-scriptkind-impliednodeformat-resolutionmode-void),
[reportStats](#-reportstats-string)
- [2 deprecated symbols](#-deprecated-releasedocumentfilename-string-compilationsettings-compileroptions-scriptkind-scriptkind-void)


#### ⚙ acquireDocument(fileName: `string`, compilationSettingsOrHost: [CompilerOptions](../interface.CompilerOptions/README.md) | [MinimalResolutionCacheHost](../interface.MinimalResolutionCacheHost/README.md), scriptSnapshot: [IScriptSnapshot](../interface.IScriptSnapshot/README.md), version: `string`, scriptKind?: [ScriptKind](../enum.ScriptKind/README.md), sourceFileOptions?: [CreateSourceFileOptions](../interface.CreateSourceFileOptions/README.md) | [ScriptTarget](../enum.ScriptTarget/README.md)): [SourceFile](../interface.SourceFile/README.md)

> Request a stored SourceFile with a given fileName and compilationSettings.
> The first call to acquire will call createLanguageServiceSourceFile to generate
> the SourceFile if was not found in the registry.
> 
> 🎚️ Parameter **fileName**:
> 
> The name of the file requested
> 
> 🎚️ Parameter **compilationSettingsOrHost**:
> 
> Some compilation settings like target affects the
> shape of a the resulting SourceFile. This allows the DocumentRegistry to store
> multiple copies of the same file for different compilation settings. A minimal
> resolution cache is needed to fully define a source file's shape when
> the compilation settings include `module: node16`+, so providing a cache host
> object should be preferred. A common host is a language service `ConfiguredProject`.
> 
> 🎚️ Parameter **scriptSnapshot**:
> 
> Text of the file. Only used if the file was not found
> in the registry and a new one was created.
> 
> 🎚️ Parameter **version**:
> 
> Current version of the file. Only used if the file was not found
> in the registry and a new one was created.



#### ⚙ acquireDocumentWithKey(fileName: `string`, path: [Path](../type.Path/README.md), compilationSettingsOrHost: [CompilerOptions](../interface.CompilerOptions/README.md) | [MinimalResolutionCacheHost](../interface.MinimalResolutionCacheHost/README.md), key: [DocumentRegistryBucketKey](../type.DocumentRegistryBucketKey/README.md), scriptSnapshot: [IScriptSnapshot](../interface.IScriptSnapshot/README.md), version: `string`, scriptKind?: [ScriptKind](../enum.ScriptKind/README.md), sourceFileOptions?: [CreateSourceFileOptions](../interface.CreateSourceFileOptions/README.md) | [ScriptTarget](../enum.ScriptTarget/README.md)): [SourceFile](../interface.SourceFile/README.md)



#### ⚙ updateDocument(fileName: `string`, compilationSettingsOrHost: [CompilerOptions](../interface.CompilerOptions/README.md) | [MinimalResolutionCacheHost](../interface.MinimalResolutionCacheHost/README.md), scriptSnapshot: [IScriptSnapshot](../interface.IScriptSnapshot/README.md), version: `string`, scriptKind?: [ScriptKind](../enum.ScriptKind/README.md), sourceFileOptions?: [CreateSourceFileOptions](../interface.CreateSourceFileOptions/README.md) | [ScriptTarget](../enum.ScriptTarget/README.md)): [SourceFile](../interface.SourceFile/README.md)

> Request an updated version of an already existing SourceFile with a given fileName
> and compilationSettings. The update will in-turn call updateLanguageServiceSourceFile
> to get an updated SourceFile.
> 
> 🎚️ Parameter **fileName**:
> 
> The name of the file requested
> 
> 🎚️ Parameter **compilationSettingsOrHost**:
> 
> Some compilation settings like target affects the
> shape of a the resulting SourceFile. This allows the DocumentRegistry to store
> multiple copies of the same file for different compilation settings. A minimal
> resolution cache is needed to fully define a source file's shape when
> the compilation settings include `module: node16`+, so providing a cache host
> object should be preferred. A common host is a language service `ConfiguredProject`.
> 
> 🎚️ Parameter **scriptSnapshot**:
> 
> Text of the file.
> 
> 🎚️ Parameter **version**:
> 
> Current version of the file.



#### ⚙ updateDocumentWithKey(fileName: `string`, path: [Path](../type.Path/README.md), compilationSettingsOrHost: [CompilerOptions](../interface.CompilerOptions/README.md) | [MinimalResolutionCacheHost](../interface.MinimalResolutionCacheHost/README.md), key: [DocumentRegistryBucketKey](../type.DocumentRegistryBucketKey/README.md), scriptSnapshot: [IScriptSnapshot](../interface.IScriptSnapshot/README.md), version: `string`, scriptKind?: [ScriptKind](../enum.ScriptKind/README.md), sourceFileOptions?: [CreateSourceFileOptions](../interface.CreateSourceFileOptions/README.md) | [ScriptTarget](../enum.ScriptTarget/README.md)): [SourceFile](../interface.SourceFile/README.md)



#### ⚙ getKeyForCompilationSettings(settings: [CompilerOptions](../interface.CompilerOptions/README.md)): DocumentRegistryBucketKey



#### ⚙ releaseDocument(fileName: `string`, compilationSettings: [CompilerOptions](../interface.CompilerOptions/README.md), scriptKind: [ScriptKind](../enum.ScriptKind/README.md), impliedNodeFormat: [ResolutionMode](../type.ResolutionMode/README.md)): `void`

> Informs the DocumentRegistry that a file is not needed any longer.
> 
> Note: It is not allowed to call release on a SourceFile that was not acquired from
> this registry originally.
> 
> 🎚️ Parameter **fileName**:
> 
> The name of the file to be released
> 
> 🎚️ Parameter **compilationSettings**:
> 
> The compilation settings used to acquire the file
> 
> 🎚️ Parameter **scriptKind**:
> 
> The script kind of the file to be released
> 
> 🎚️ Parameter **impliedNodeFormat**:
> 
> The implied source file format of the file to be released



#### ⚙ releaseDocumentWithKey(path: [Path](../type.Path/README.md), key: [DocumentRegistryBucketKey](../type.DocumentRegistryBucketKey/README.md), scriptKind: [ScriptKind](../enum.ScriptKind/README.md), impliedNodeFormat: [ResolutionMode](../type.ResolutionMode/README.md)): `void`



#### ⚙ reportStats(): `string`



<div style="opacity:0.6">

#### ⚙ `deprecated` releaseDocument(fileName: `string`, compilationSettings: [CompilerOptions](../interface.CompilerOptions/README.md), scriptKind?: [ScriptKind](../enum.ScriptKind/README.md)): `void`

> Informs the DocumentRegistry that a file is not needed any longer.
> 
> Note: It is not allowed to call release on a SourceFile that was not acquired from
> this registry originally.
> 
> 🎚️ Parameter **fileName**:
> 
> The name of the file to be released
> 
> 🎚️ Parameter **compilationSettings**:
> 
> The compilation settings used to acquire the file
> 
> 🎚️ Parameter **scriptKind**:
> 
> The script kind of the file to be released
> 
> `deprecated`
> 
> pass scriptKind and impliedNodeFormat for correctness



#### ⚙ `deprecated` releaseDocumentWithKey(path: [Path](../type.Path/README.md), key: [DocumentRegistryBucketKey](../type.DocumentRegistryBucketKey/README.md), scriptKind?: [ScriptKind](../enum.ScriptKind/README.md)): `void`

> `deprecated`
> 
> pass scriptKind for and impliedNodeFormat correctness



</div>

