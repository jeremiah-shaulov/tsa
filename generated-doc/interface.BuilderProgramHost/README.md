# `interface` BuilderProgramHost

[Documentation Index](../README.md)

## This interface has

- 2 properties:
[createHash](#-createhash-data-string--string),
[writeFile](#-writefile-writefilecallback)


#### 📄 createHash?: (data: `string`) => `string`

> If provided this would be used this hash instead of actual file shape text for detecting changes



#### 📄 writeFile?: [WriteFileCallback](../type.WriteFileCallback/README.md)

> When emit or emitNextAffectedFile are called without writeFile,
> this callback if present would be used to write files



