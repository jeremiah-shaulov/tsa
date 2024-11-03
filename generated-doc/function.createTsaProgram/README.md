# `function` createTsaProgram

[Documentation Index](../README.md)

### Configuration options for the Typescript Compiler (tsa.CompilerOptions)

You can pass [tsa.CompilerOptions](../interface.CompilerOptions/README.md) to `tsa.createTsaProgram()`. It works in the same fashion as `typescript.CompilerOptions` for [typescript.createProgram()](../function.createProgram/README.md), with the following differences:
- `lib` has 2 additional options that you can provide: `lib.deno.ns.d.ts` and `lib.deno.unstable.d.ts`. If you don't specify `lib` explicitly, the default is `lib.deno.ns.d.ts`.
- default value for [tsa.CompilerOptions.allowJs](../interface.CompilerOptions/README.md#-allowjs-boolean) is `true`.
- default value for [tsa.CompilerOptions.resolveJsonModule](../interface.CompilerOptions/README.md#-resolvejsonmodule-boolean) is `true`.
- default value for [tsa.CompilerOptions.allowSyntheticDefaultImports](../interface.CompilerOptions/README.md#-allowsyntheticdefaultimports-boolean) is `true`.
- default value for [tsa.CompilerOptions.target](../interface.CompilerOptions/README.md#-target-scripttarget) is [tsa.ScriptTarget.ESNext](../enum.ScriptTarget/README.md#esnext--99).
- default value for [tsa.CompilerOptions.module](../interface.CompilerOptions/README.md#-module-modulekind) is [tsa.ModuleKind.ESNext](../enum.ModuleKind/README.md#esnext--99).
- default value for [tsa.CompilerOptions.moduleResolution](../interface.CompilerOptions/README.md#-moduleresolution-moduleresolutionkind) is [tsa.ModuleResolutionKind.NodeNext](../enum.ModuleResolutionKind/README.md#nodenext--99).
- regardless of [tsa.CompilerOptions.allowImportingTsExtensions](../interface.CompilerOptions/README.md#-allowimportingtsextensions-boolean) value, module specifiers must include `.ts` (or different) extension.

If the goal is to generate docs, you usually need to set [tsa.CompilerOptions.declaration](../interface.CompilerOptions/README.md#-declaration-boolean) and [tsa.CompilerOptions.emitDeclarationOnly](../interface.CompilerOptions/README.md#-emitdeclarationonly-boolean) to true.
Else the compiler will not know that you're not going to write Javascript files, and can complain.

To produce bundle no special options are needed, and you can leave the options blank.

`function` createTsaProgram(entryPoints: ReadonlyArray\<`string` | URL>, compilerOptions?: [CompilerOptions](../interface.CompilerOptions/README.md), loadOptions?: [LoadOptions](../type.LoadOptions/README.md)): Promise\<[TsaProgram](../interface.TsaProgram/README.md)>