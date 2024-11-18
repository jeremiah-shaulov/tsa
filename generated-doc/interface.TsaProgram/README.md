# `interface` TsaProgram `extends` [Program](../interface.Program/README.md)

[Documentation Index](../README.md)

## This interface has

- 2 methods:
[emitDoc](#-emitdocoptions-emitdocoptions-docnodes),
[emitTsaBundle](#-emittsabundle-tsabundle)


#### ⚙ emitDoc(options?: [EmitDocOptions](../type.EmitDocOptions/README.md)): [DocNodes](../class.DocNodes/README.md)

> Generate
> [DocNode](../type.DocNode/README.md) object for each symbol in the source code, which is subject to documentation.
> 
> By default it works as [x/deno\_doc@0.62.0](https://deno.land/x/deno_doc@0.62.0), that is, it generates
> nodes for each toplevel (exported or not) symbol in the module, and also for `import` statements.
> 
> `options` allow to adjust the behavior.
> - [EmitDocOptions.noImportNodes](../type.EmitDocOptions/README.md#-noimportnodes-boolean) allows to exclude nodes that represent `import` statements.
> - [EmitDocOptions.includeReferenced](../type.EmitDocOptions/README.md#-includereferenced-boolean) allows to generate nodes also for symbols referenced from other generated nodes.
> For example to include symbols that appear in function return types, class properties, etc.
> 
> ```ts
> // To download and run this example:
> // curl 'https://raw.githubusercontent.com/jeremiah-shaulov/tsa/v0.0.42/generated-doc/interface.TsaProgram/README.md' | perl -ne '$y=$1 if /^```(.)?/;  print $_ if $y&&$m;  $m=$y&&($m||m~<example-g8c4>~)' > /tmp/example-g8c4.ts
> // deno run --allow-env --allow-net --allow-read --allow-write /tmp/example-g8c4.ts
> 
> import {tsa, printDiagnostics} from 'https://deno.land/x/tsa@v0.0.42/mod.ts';
> 
> const SUBJ = 'https://deno.land/x/dir@1.5.1/mod.ts'; // Can be local file (`file:///...`)
> 
> // Create typescript program
> const program = await tsa.createTsaProgram([SUBJ], {declaration: true, emitDeclarationOnly: true});
> 
> // Print errors and warnings (if any)
> printDiagnostics(tsa.getPreEmitDiagnostics(program));
> 
> // Generate doc
> const docNodes = program.emitDoc({includeReferenced: true, noImportNodes: true});
> 
> // Print the resulting nodes (`tsa doc` command saves these nodes to a JSON file)
> console.log(docNodes.nodes);
> ```



#### ⚙ emitTsaBundle(): [TsaBundle](../class.TsaBundle/README.md)

> Produces sequence of statements taken from source files, that can be put to a single file.



