# `class` Session\<TMessage=`string`> `implements` [EventSender](../interface.EventSender/README.md)

[Documentation Index](../README.md)

## This class has

- [constructor](#-constructoropts-sessionoptions)
- 9 methods:
[logError](#-logerrorerr-error-cmd-string-void),
[send](#-sendmsg-protocolmessage-void),
[event](#-eventt-extends-objectbody-t-eventname-string-void),
[getCanonicalFileName](#-getcanonicalfilenamefilename-string-string),
[exit](#-exit-void),
[addProtocolHandler](#-addprotocolhandlercommand-string-handler-request-protocolrequest--handlerresponse-void),
[executeWithRequestId](#-executewithrequestidtrequestid-number-f---t-t),
[executeCommand](#-executecommandrequest-protocolrequest-handlerresponse),
[onMessage](#-onmessagemessage-tmessage-void)
- 6 protected properties:
[projectService](#-protected-projectservice-projectservice),
[host](#-protected-host-serverhost),
[typingsInstaller](#-protected-readonly-typingsinstaller-itypingsinstaller),
[byteLength](#-protected-bytelength-buf-string-encoding-bufferencoding--number),
[logger](#-protected-logger-logger),
[canUseEvents](#-protected-canuseevents-boolean)
- 3 protected methods:
[writeMessage](#-protected-writemessagemsg-protocolmessage-void),
[parseMessage](#-protected-parsemessagemessage-tmessage-request),
[toStringMessage](#-protected-tostringmessagemessage-tmessage-string)


#### 🔧 `constructor`(opts: [SessionOptions](../interface.SessionOptions/README.md))



#### ⚙ logError(err: Error, cmd: `string`): `void`



#### ⚙ send(msg: [protocol.Message](../interface.Message/README.md)): `void`



#### ⚙ event\<T `extends` `object`>(body: T, eventName: `string`): `void`



#### ⚙ getCanonicalFileName(fileName: `string`): `string`



#### ⚙ exit(): `void`



#### ⚙ addProtocolHandler(command: `string`, handler: (request: [protocol.Request](../interface.Request/README.md)) => [HandlerResponse](../interface.HandlerResponse/README.md)): `void`



#### ⚙ executeWithRequestId\<T>(requestId: `number`, f: () => T): T



#### ⚙ executeCommand(request: [protocol.Request](../interface.Request/README.md)): [HandlerResponse](../interface.HandlerResponse/README.md)



#### ⚙ onMessage(message: TMessage): `void`



#### 📄 `protected` projectService: [ProjectService](../class.ProjectService/README.md)



#### 📄 `protected` host: [ServerHost](../interface.ServerHost/README.md)



#### 📄 `protected` `readonly` typingsInstaller: [ITypingsInstaller](../interface.ITypingsInstaller/README.md)



#### 📄 `protected` byteLength: (buf: `string`, encoding?: [BufferEncoding](../type.BufferEncoding/README.md)) => `number`



#### 📄 `protected` logger: [Logger](../interface.Logger/README.md)



#### 📄 `protected` canUseEvents: `boolean`



#### ⚙ `protected` writeMessage(msg: [protocol.Message](../interface.Message/README.md)): `void`



#### ⚙ `protected` parseMessage(message: TMessage): [Request](../interface.Request/README.md)



#### ⚙ `protected` toStringMessage(message: TMessage): `string`



