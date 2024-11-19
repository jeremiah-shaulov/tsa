/**
	Test doc-comments on various symbols, and links,
	like {@link http://example.com/}, {@linkcode SomeClass.staticProp Click here} and {@linkplain SomeClass#prop|Click here}.

	And also like {@link "One"."@#$"}.

	Also embedded examples:
	```ts
	let it = 'be';
	```

	@version 1.2.3
	@module
 **/

/**	The Class 1.
	@since 1.0.0
	@see Interface1
 **/
export class Class1
{
	/**	The name field.
	 **/
	name = 'N';

	/**	The second name field.
		@ignore
	 **/
	name2 = 'NN';

	/**	The third name field.
	 **/
	protected name3 = 'NNN';

	/**	The fourth name field.
	 **/
	private name4 = 'NNNN';

	/**	The accessor 1.
	 **/
	get accessor1()
	{	return this.name4 + '.';
	}

	/**	The accessor 2.
	 **/
	set accessor2(value: Class1)
	{	this.name4 = value.name4;
	}

	/**	The class constructor.
		@param name5 - A name.
	 **/
	constructor(readonly name5: string)
	{
	}

	/**
	 * The method 1.
	 * @see {@link method2}
	 **/
	method1
	(	/**	A first argument of method 1.
		 **/
		arg1: string,

		/**	A second argument of method 1.
		 **/
		arg2: string,
	)
	{	return arg1 + arg2;
	}

	/**	The method 2.
		@param arg1 - A first argument of method 2.
		@param {string} arg2 - A second argument of method 2, see {@link SomeClass#prop}.
	 **/
	method2(arg1: string, arg2: string)
	{	return arg1 + arg2;
	}
}

/**	The Interface 1.
	@since 1.0.0
	@satisfies {Any} All
 **/
export interface Interface1
{
	/**	The name field.
	 **/
	name: string;

	/**	The second name field.
		@ignore
	 **/
	name2: string;

	/**	The third name field.
	 **/
	readonly name3: string;

	/**	The fourth name field.
	 **/
	name4: string;

	/**	The accessor 1.
	 **/
	get accessor1(): string;

	/**	The accessor 2.
	 **/
	set accessor2(value: Class1);

	/**	The method 1.
	 **/
	method1
	(	/**	A first argument of method 1.
		 **/
		arg1: string,

		/**	A second argument of method 1.
		 **/
		arg2: string,
	): string;

	/**	The method 2.
		@param arg1 - A first argument of method 2.
		@param arg2 - A second argument of method 2, see {@link SomeClass#prop}.
	 **/
	method2(arg1: string, arg2: string): string;

	/**	The method 3 signature 1.
		@param arg1 - A first argument of method 3.1.
		@param arg2 - A second argument of method 3.1, see {@link SomeClass#prop}.
		@returns Concatenation of the arguments.
	 **/
	method3(arg1: string, arg2: string): string;

	/**	The method 3 signature 2.
		@param arg1 - A first argument of method 3.2.
		@param arg2 - A second argument of method 3.2, see {@link SomeClass#prop}.
		@returns Concatenation of the arguments converted to strings.
	 **/
	method3(arg1: number, arg2: number): string;
}

export interface Interface2
{
	/**	The class constructor.
		@param name - Some name.
	 **/
	new(name: string): Class2;

	/**	Call signature 1.
		@param arg - Some arg.
	 **/
	<T>(arg: T): Promise<T>;

	/**	Index signature 1.
		@public
	 **/
	[k: string]: unknown;
}

export class Class2 implements Interface1
{	name = 'N';
	name2 = 'NN';
	name3 = 'NNN';

	/**	Another comment.
	 **/
	name4 = 'NNNN';

	value1 = true;
	value2 = 2;
	value3 = 3n;
	value4 = `...`;
	value5 = `_${Error.name}_`;

	accessor1 = 'A';

	set accessor2(value: Class1)
	{	this.name = value.name;
	}

	method1(arg1='', arg2='')
	{	return arg1 + arg2;
	}

	method2(arg1='', arg2='')
	{	return arg1 + arg2;
	}

	method3(arg1: unknown, arg2: unknown)
	{	return '' + arg1 + arg2;
	}

	/**
		@deprecated See other
	 **/
	method4()
	{
	}
}

/**	The Enum 1.
	@since 1.0.1
 **/
export enum Enum1
{	ZERO,

	/**	Some one.
	 **/
	ONE,

	/**	Some two.
		@ignore
	 **/
	TWO,
}

/**	The Enum 2.
	@since 1.0.1
 **/
export const enum Enum2
{	ZERO,

	/**	Some one.
	 **/
	ONE,

	/**	Some three.
		@since 1.0.2
	 **/
	THREE = 3,

	HELLO = 'hello',

	FOUR = 4,

	/**	Some five.
		@ignore
	 **/
	FIVE,
}

/**	The Type 1.
	See {@link SomeClass#prop}.
 **/
export type Type1 = 'a' | 'b';

/**	The var 1.
	See {@link SomeClass#prop}.
 **/
export let var1: Type1;
