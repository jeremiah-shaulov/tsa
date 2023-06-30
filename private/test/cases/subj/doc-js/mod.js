// Interfaces:

/**
	@typedef {Object} Inter1
	@property {string} name1
 **/

/**
	@typedef {Object} Inter2
	@property {string} name2
	@property {Inter2Method2} method2

	@callback Inter2Method2
	@param {number} a
	@param {string} b
	@returns {void}
 **/


// Classes:

/**
	@class
 **/
export function Base1()
{	this.name1 = '';
}

const SymProp = Symbol();

/**
	@extends {Array<number>}
 **/
export class Class2 extends Array
{	name2 = '';

	/**
		@public
	 **/
	prop3 = '';

	/**
		@protected
	 **/
	prop4 = '';

	/**
		@private
	 **/
	prop5 = '';

	/**
		@readonly
	 **/
	prop6 = '';

	#prop7 = '';

	['prop8'] = '';

	[SymProp] = '';
}

/**
	@template T
 **/
export class Class3 extends Base1
{	name3 = '';

	/**
		@param {T} _init
	 **/
	constructor(_init)
	{	super();
	}
}

/**
	@template T
	@template U
	@extends {Class3<T>}
	@implements {Inter1}
 **/
export class Class4 extends Class3
{	name4 = '';

	/**
		@param {T} init
		@param {U} _init2
	 **/
	constructor(init, _init2)
	{	super(init);
	}
}


// Functions:

/**
	@param {number} _a
	@param {string} _b
	@returns {void}
 **/
export function func1(_a, _b)
{
}

/**
	@param {number} a
	@param {string} [b]
	@param {bigint} [_c=1n]
	@param {string} [_d='']
	@returns {string}
 **/
export function func2(a, b, _c=1n, _d='')
{	return `${a}, ${b}`;
}

/**
	@param {number} _a
	@param {...string} _b
 **/
export function func3(_a, ..._b)
{
}

/**
	@param {number} _a
	@param {[string, number]}
 **/
export function func4(_a, [_b, _c])
{
}

/**
	@param {number} _a
	@param {string[]}
 **/
export function func5(_a, [_b, _c])
{
}

/**
	@param {number} _a
	@param {Record<string, boolean>}
 **/
export function func6(_a, {_b, _c})
{
}

/**
	@param {number} _a
	@param {Record<string, boolean[]>}
 **/
export function func7(_a, {b: _b, c: [_d, _e]})
{
}


// Enums:

/**
	@enum {number}
 **/
export const Enum1 =
{	ZERO: 0,
	ONE: 1,
	TWO: 2,
};

/**
	@enum
 **/
export const Enum2 =
{	ZERO: 0,
	ONE: 1,
	THREE: 3,
	HELLO: 'hello',
	FOUR: 4,
	FIVE: 5,
};


// Types:

/**
	@typedef {string} Type1

	@typedef {Error} Type2

	@typedef {Class2} Type3

	@typedef {Promise<string>} Type4

	@typedef {void | undefined | null | true | 'lit' | `tpl` | 1 | 1n} Type5

	@typedef {string & number} Type6

	@typedef {string[]} Type7

	@typedef {[string, boolean]} Type8

	@typedef {{s: string, b: boolean}} Type10
 **/

/**
	The jsfunc1.
	@template T,U Type params 1 and 2
	@template {Map} [V=Object] Type param3
	@param {string} arg1 Js arg 1.
	@param {T} arg2 Js arg 2. Details: {@link Class2.l2 Click here}.
	@param {Object} arg3 Js arg 3. Details: {@linkplain Class2.l2 Click here}.
	@param {string} arg3.name Arg 3 name. Details: {@linkcode Class2.l2 Click here}.
	@param {Object} arg3.value Arg 3 value.
	@param {number} arg3.value.id Arg 3 value id.
	@param {string} [arg3.value.title] Arg 3 value title.
	@param {Object} [arg3.value2] Arg 3 value2.
	@param {number} arg3.value2.id Arg 3 value2 id.
	@param {string} arg3.value2.title Arg 3 value2 title.
	@param {Object[]} arg4 Js arg 4.
	@param {string} arg4[].name Arg 4 name.
	@param {Object} arg4[].value Arg 4 value.
	@param {number} arg4[].value.id Arg 4 value id.
	@param {string} [arg4[].value.title] Arg 4 value title.
	@param {Object[]} [arg4[].value2] Arg 4 value2.
	@param {number} arg4[].value2[].id Arg 4 value2 id.
	@param {string} arg4[].value2[].title Arg 3 value2 title.
	@this {Array}
	@returns {string} - Message.
 **/
export function jsfunc1(arg1, arg2, arg3, arg4)
{	return arg1 + arg2 + arg3.value.title + arg4[0].value.id;
}

/**
	@typedef {Object} SpecialType - creates a new type named 'SpecialType'
	@property {string} prop1 - a string property of SpecialType
	@property {number} prop2 - a number property of SpecialType
	@prop {number=} prop3 - an optional number property of SpecialType
	@prop {number} [prop4] - an optional number property of SpecialType
	@prop {number} [prop5=42] - an optional number property of SpecialType with default
 **/


// Vars:

/**
	@type {Class2}
 **/
export const var1 = {};
export const var2 = var1[0];

/**
 	@type {SpecialType}
 **/
export let var3;
