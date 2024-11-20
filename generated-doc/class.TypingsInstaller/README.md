# `abstract` `class` TypingsInstaller

[Documentation Index](../README.md)

## This class has

- [constructor](#-constructorinstalltypinghost-installtypinghost-globalcachepath-string-safelistpath-path-typesmaplocation-path-throttlelimit-number-log-log)
- property [typesRegistry](#-abstract-readonly-typesregistry-mapstring-maplikestring)
- 2 methods:
[closeProject](#-closeprojectreq-closeproject-void),
[install](#-installreq-discovertypings-void)
- 3 protected properties:
[installTypingHost](#-protected-readonly-installtypinghost-installtypinghost),
[log](#-protected-readonly-log-log),
[latestDistTag](#-protected-readonly-latestdisttag-latest)
- 3 protected methods:
[ensurePackageDirectoryExists](#-protected-ensurepackagedirectoryexistsdirectory-string-void),
[installWorker](#-protected-abstract-installworkerrequestid-number-packagenames-string-cwd-string-onrequestcompleted-requestcompletedaction-void),
[sendResponse](#-protected-abstract-sendresponseresponse-settypings--invalidatecachedtypings--begininstalltypes--endinstalltypes--watchtypinglocations-void)


#### 🔧 `constructor`(installTypingHost: [InstallTypingHost](../interface.InstallTypingHost/README.md), globalCachePath: `string`, safeListPath: [Path](../type.Path/README.md), typesMapLocation: [Path](../type.Path/README.md), throttleLimit: `number`, log?: [Log](../interface.Log/README.md))



#### 📄 `abstract` `readonly` typesRegistry: Map\<`string`, [MapLike](../interface.MapLike/README.md)\<`string`>>



#### ⚙ closeProject(req: [CloseProject](../interface.CloseProject/README.md)): `void`



#### ⚙ install(req: [DiscoverTypings](../interface.DiscoverTypings/README.md)): `void`



#### 📄 `protected` `readonly` installTypingHost: [InstallTypingHost](../interface.InstallTypingHost/README.md)



#### 📄 `protected` `readonly` log: [Log](../interface.Log/README.md)



#### 📄 `protected` `readonly` latestDistTag: <mark>"latest"</mark>



#### ⚙ `protected` ensurePackageDirectoryExists(directory: `string`): `void`



#### ⚙ `protected` `abstract` installWorker(requestId: `number`, packageNames: `string`\[], cwd: `string`, onRequestCompleted: [RequestCompletedAction](../type.RequestCompletedAction/README.md)): `void`



#### ⚙ `protected` `abstract` sendResponse(response: [SetTypings](../interface.SetTypings/README.md) | [InvalidateCachedTypings](../interface.InvalidateCachedTypings/README.md) | [BeginInstallTypes](../interface.BeginInstallTypes/README.md) | [EndInstallTypes](../interface.EndInstallTypes/README.md) | [WatchTypingLocations](../interface.WatchTypingLocations/README.md)): `void`



