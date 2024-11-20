# `interface` Response `extends` [Message](../interface.Message/README.md)

[Documentation Index](../README.md)

Response by server to client request message.

## This interface has

- 8 properties:
[type](#-type-response),
[request\_seq](#-request_seq-number),
[success](#-success-boolean),
[command](#-command-string),
[message](#-message-string),
[body](#-body-any),
[metadata](#-metadata-unknown),
[performanceData](#-performancedata-performancedata)
- 1 inherited member from [Message](../interface.Message/README.md)


#### 📄 type: <mark>"response"</mark>

> One of "request", "response", or "event"



#### 📄 request\_seq: `number`

> Sequence number of the request message.



#### 📄 success: `boolean`

> Outcome of the request.



#### 📄 command: `string`

> The command requested.



#### 📄 message?: `string`

> If success === false, this should always be provided.
> Otherwise, may (or may not) contain a success message.



#### 📄 body?: `any`

> Contains message body if success === true.



#### 📄 metadata?: `unknown`

> Contains extra information that plugin can include to be passed on



#### 📄 performanceData?: [PerformanceData](../interface.PerformanceData/README.md)

> Exposes information about the performance of this request-response pair.



