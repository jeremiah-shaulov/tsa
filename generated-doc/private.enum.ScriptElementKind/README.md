# `enum` ScriptElementKind

[Documentation Index](../README.md)

#### unknown = <mark>""</mark>



#### warning = <mark>"warning"</mark>



#### keyword = <mark>"keyword"</mark>

> predefined type (void) or keyword (class)



#### scriptElement = <mark>"script"</mark>

> top level script node



#### moduleElement = <mark>"module"</mark>

> module foo {}



#### classElement = <mark>"class"</mark>

> class X {}



#### localClassElement = <mark>"local class"</mark>

> var x = class X {}



#### interfaceElement = <mark>"interface"</mark>

> interface Y {}



#### typeElement = <mark>"type"</mark>

> type T = ...



#### enumElement = <mark>"enum"</mark>

> enum E



#### enumMemberElement = <mark>"enum member"</mark>



#### variableElement = <mark>"var"</mark>

> Inside module and script only
> const v = ..



#### localVariableElement = <mark>"local var"</mark>

> Inside function



#### variableUsingElement = <mark>"using"</mark>

> using foo = ...



#### variableAwaitUsingElement = <mark>"await using"</mark>

> await using foo = ...



#### functionElement = <mark>"function"</mark>

> Inside module and script only
> function f() { }



#### localFunctionElement = <mark>"local function"</mark>

> Inside function



#### memberFunctionElement = <mark>"method"</mark>

> class X { [public|private]* foo() {} }



#### memberGetAccessorElement = <mark>"getter"</mark>

> class X { [public|private]* [get|set] foo:number; }



#### memberSetAccessorElement = <mark>"setter"</mark>



#### memberVariableElement = <mark>"property"</mark>

> class X { [public|private]* foo:number; }
> interface Y { foo:number; }



#### memberAccessorVariableElement = <mark>"accessor"</mark>

> class X { [public|private]* accessor foo: number; }



#### constructorImplementationElement = <mark>"constructor"</mark>

> class X { constructor() { } }
> class X { static { } }



#### callSignatureElement = <mark>"call"</mark>

> interface Y { ():number; }



#### indexSignatureElement = <mark>"index"</mark>

> interface Y { []:number; }



#### constructSignatureElement = <mark>"construct"</mark>

> interface Y { new():Y; }



#### parameterElement = <mark>"parameter"</mark>

> function foo(*Y*: string)



#### typeParameterElement = <mark>"type parameter"</mark>



#### primitiveType = <mark>"primitive type"</mark>



#### label = <mark>"label"</mark>



#### alias = <mark>"alias"</mark>



#### constElement = <mark>"const"</mark>



#### letElement = <mark>"let"</mark>



#### directory = <mark>"directory"</mark>



#### externalModuleName = <mark>"external module name"</mark>



#### jsxAttribute = <mark>"JSX attribute"</mark>

> <JsxTagName attribute1 attribute2={0} />



#### string = <mark>"string"</mark>

> String literal



#### link = <mark>"link"</mark>

> Jsdoc



#### linkName = <mark>"link name"</mark>

> Jsdoc



#### linkText = <mark>"link text"</mark>

> Jsdoc



