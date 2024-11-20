# `interface` ProjectServiceOptions

[Documentation Index](../README.md)

## This interface has

- 17 properties:
[host](#-host-serverhost),
[logger](#-logger-logger),
[cancellationToken](#-cancellationtoken-hostcancellationtoken),
[useSingleInferredProject](#-usesingleinferredproject-boolean),
[useInferredProjectPerProjectRoot](#-useinferredprojectperprojectroot-boolean),
[typingsInstaller](#-typingsinstaller-itypingsinstaller),
[eventHandler](#-eventhandler-projectserviceeventhandler),
[canUseWatchEvents](#-canusewatchevents-boolean),
[suppressDiagnosticEvents](#-suppressdiagnosticevents-boolean),
[throttleWaitMilliseconds](#-throttlewaitmilliseconds-number),
[globalPlugins](#-globalplugins-readonly-string),
[pluginProbeLocations](#-pluginprobelocations-readonly-string),
[allowLocalPluginLoads](#-allowlocalpluginloads-boolean),
[typesMapLocation](#-typesmaplocation-string),
[serverMode](#-servermode-languageservicemode),
[session](#-session-sessionunknown--undefined),
[jsDocParsingMode](#-jsdocparsingmode-jsdocparsingmode)


#### 📄 host: [ServerHost](../interface.ServerHost/README.md)



#### 📄 logger: [Logger](../interface.Logger/README.md)



#### 📄 cancellationToken: [HostCancellationToken](../interface.HostCancellationToken/README.md)



#### 📄 useSingleInferredProject: `boolean`



#### 📄 useInferredProjectPerProjectRoot: `boolean`



#### 📄 typingsInstaller?: [ITypingsInstaller](../interface.ITypingsInstaller/README.md)



#### 📄 eventHandler?: [ProjectServiceEventHandler](../type.ProjectServiceEventHandler/README.md)



#### 📄 canUseWatchEvents?: `boolean`



#### 📄 suppressDiagnosticEvents?: `boolean`



#### 📄 throttleWaitMilliseconds?: `number`



#### 📄 globalPlugins?: readonly `string`\[]



#### 📄 pluginProbeLocations?: readonly `string`\[]



#### 📄 allowLocalPluginLoads?: `boolean`



#### 📄 typesMapLocation?: `string`



#### 📄 serverMode?: [LanguageServiceMode](../enum.LanguageServiceMode/README.md)



#### 📄 session: [Session](../class.Session/README.md)\<`unknown`> | `undefined`



#### 📄 jsDocParsingMode?: [JSDocParsingMode](../enum.JSDocParsingMode/README.md)



