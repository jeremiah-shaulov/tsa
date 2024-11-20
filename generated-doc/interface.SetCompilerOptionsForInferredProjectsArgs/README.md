# `interface` SetCompilerOptionsForInferredProjectsArgs

[Documentation Index](../README.md)

Argument for SetCompilerOptionsForInferredProjectsRequest request.

## This interface has

- 2 properties:
[options](#-options-inferredprojectcompileroptions),
[projectRootPath](#-projectrootpath-string)


#### 📄 options: [InferredProjectCompilerOptions](../type.InferredProjectCompilerOptions/README.md)

> Compiler options to be used with inferred projects.



#### 📄 projectRootPath?: `string`

> Specifies the project root path used to scope compiler options.
> It is an error to provide this property if the server has not been started with
> `useInferredProjectPerProjectRoot` enabled.



