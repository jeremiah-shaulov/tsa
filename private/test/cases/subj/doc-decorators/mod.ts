/**	Test decorators on various symbols.
	@module
 **/

// deno-lint-ignore no-explicit-any
type Any = any;
// deno-lint-ignore ban-types
type SomeFunction = Function;

function classDecor(_description='')
{	return function(_target: SomeFunction)
	{
	};
}

function propDecor(_description='', _code=0)
{	return function(_target: Any, _prop: string)
	{
	};
}

function methodDecor(_description='', _code=0)
{	return function(_target: Any, _prop: string, _descriptor: PropertyDescriptor)
	{
	};
}

function paramDecor(_description='')
{	return function(_target: Any, _prop: string, _n: number)
	{
	};
}

/**	The Class 1.
	@since 1.0.0
	@see {Interface1}
 **/
@classDecor('The Class 1')
export class Class1
{
	/**	The name field.
	 **/
	@propDecor('The name field.', 1)
	name = 'N';

	/**	The accessor 1.
	 **/
	@propDecor(Error.name + '.', 2)
	get accessor1()
	{	return this.name + '.';
	}

	/**	The accessor 2.
	 **/
	@propDecor('The accessor 2.')
	set accessor2(value: Class1)
	{	this.name = value.name;
	}

	/**	The class constructor.
	 **/
	constructor
	(	//@paramDecor('')
		readonly name5: string,
	)
	{
	}

	/**	The method 1.
	 **/
	@methodDecor('The method 1.')
	method1
	(
		/**	A first argument of method 1.
		 **/
		@paramDecor('A first argument of method 1.')
		arg1: string,

		/**	A second argument of method 1.
		 **/
		@paramDecor('A second argument of method 1.')
		arg2: string,
	)
	{	return arg1 + arg2;
	}

	/**	The method 2.
		@param arg1 - A first argument of method 2.
		@param arg2 - A second argument of method 2, see {@link SomeClass#prop}.
	 **/
	method2
	(	@paramDecor('A first argument of method 2.')
		arg1: string,

		@paramDecor('A second argument of method 2.')
		arg2: string,
	)
	{	return arg1 + arg2;
	}
}
