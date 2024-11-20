# `interface` IndentationRequestArgs `extends` [FileLocationRequestArgs](../interface.FileLocationRequestArgs/README.md)

[Documentation Index](../README.md)

Arguments for IndentationRequest request.

## This interface has

- property [options](#-options-editorsettings)
- 2 inherited members from [FileLocationRequestArgs](../interface.FileLocationRequestArgs/README.md), 2 from [FileRequestArgs](../interface.FileRequestArgs/README.md)


#### 📄 options?: [EditorSettings](../type.EditorSettings/README.md)

> An optional set of settings to be used when computing indentation.
> If argument is omitted - then it will use settings for file that were previously set via 'configure' request or global settings.



