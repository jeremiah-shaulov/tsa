# `interface` SessionOptions

[Documentation Index](../README.md)

## This interface has

- 19 properties:
[host](#-host-serverhost),
[cancellationToken](#-cancellationtoken-servercancellationtoken),
[useSingleInferredProject](#-usesingleinferredproject-boolean),
[useInferredProjectPerProjectRoot](#-useinferredprojectperprojectroot-boolean),
[typingsInstaller](#-typingsinstaller-itypingsinstaller),
[byteLength](#-bytelength-buf-string-encoding-bufferencoding--number),
[hrtime](#-hrtime-start-number-number--number-number),
[logger](#-logger-logger),
[canUseEvents](#-canuseevents-boolean),
[canUseWatchEvents](#-canusewatchevents-boolean),
[eventHandler](#-eventhandler-projectserviceeventhandler),
[suppressDiagnosticEvents](#-suppressdiagnosticevents-boolean),
[serverMode](#-servermode-languageservicemode),
[throttleWaitMilliseconds](#-throttlewaitmilliseconds-number),
[noGetErrOnBackgroundUpdate](#-nogeterronbackgroundupdate-boolean),
[globalPlugins](#-globalplugins-readonly-string),
[pluginProbeLocations](#-pluginprobelocations-readonly-string),
[allowLocalPluginLoads](#-allowlocalpluginloads-boolean),
[typesMapLocation](#-typesmaplocation-string)


#### 📄 host: [ServerHost](../interface.ServerHost/README.md)



#### 📄 cancellationToken: [ServerCancellationToken](../interface.ServerCancellationToken/README.md)



#### 📄 useSingleInferredProject: `boolean`



#### 📄 useInferredProjectPerProjectRoot: `boolean`



#### 📄 typingsInstaller?: [ITypingsInstaller](../interface.ITypingsInstaller/README.md)



#### 📄 byteLength: (buf: `string`, encoding?: [BufferEncoding](../type.BufferEncoding/README.md)) => `number`



#### 📄 hrtime: (start?: \[`number`, `number`]) => \[`number`, `number`]



#### 📄 logger: [Logger](../interface.Logger/README.md)



#### 📄 canUseEvents: `boolean`

> If falsy, all events are suppressed.



#### 📄 canUseWatchEvents?: `boolean`



#### 📄 eventHandler?: [ProjectServiceEventHandler](../type.ProjectServiceEventHandler/README.md)



#### 📄 suppressDiagnosticEvents?: `boolean`

> Has no effect if eventHandler is also specified.



#### 📄 serverMode?: [LanguageServiceMode](../enum.LanguageServiceMode/README.md)



#### 📄 throttleWaitMilliseconds?: `number`



#### 📄 noGetErrOnBackgroundUpdate?: `boolean`



#### 📄 globalPlugins?: readonly `string`\[]



#### 📄 pluginProbeLocations?: readonly `string`\[]



#### 📄 allowLocalPluginLoads?: `boolean`



#### 📄 typesMapLocation?: `string`



