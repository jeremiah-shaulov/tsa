// Interfaces:
export interface Inter1
{	name1: string;
}
export interface Inter2
{	readonly name2: string;
	method2(a: number, b: string): void;
}
export interface Inter3<T> extends Inter1, Inter2
{	value3: T;
	get accessor3(): string;
	set setAccessor3(value: string);
}
export interface Inter4<T, U> extends Inter3<T>
{	name4: U;
	that: this;
}
const SymProp = Symbol();
const SymProp2 = Symbol();
export interface Inter5
{	(arg1: unknown): string;
	[k: string]: unknown;
	new(): number[];
	that: this;
	[SymProp]: string;
	[SymProp2](): string;
	['prop']: string;
	['prop2'](): string;

	assert(message: string, val: unknown): asserts val;
	assert2(value: unknown): asserts value is Map<unknown, unknown>;
	assert3(message: string): asserts this;
	assert4(message: string): asserts this is Base1;
	noassert(value: unknown): value is Map<unknown, unknown>;
	noassert2(): this is Base1;
}


// Classes:
export class Base1
{	name1 = '';
}
export class Class2 extends Array<number>
{	name2 = '';
	public prop3 = '';
	protected prop4 = '';
	private prop5 = '';
	readonly prop6 = '';
	#prop7 = '';
	['prop8'] = '';
	[SymProp] = '';
}
export class Class3<T> extends Base1
{	name3 = '';

	constructor(_init: T)
	{	super();
	}
}
export class Class4<T, U> extends Class3<T> implements Inter1, Inter3<bigint>
{	name1 = '';
	name2 = '';
	value3 = 0n;
	accessor3 = '';
	setAccessor3 = '';
	name3 = '';
	name4 = '';
	name5?: string;

	that = this;

	constructor(init: T, readonly init2: U)
	{	super(init);
	}

	method2(_a: number, _b: string)
	{
	}

	assert(message: string, val: unknown): asserts val
	{	if (!val)
		{	throw new Error('Assertion failed: '+message);
		}
	}

	assert2(value: unknown): asserts value is Map<unknown, unknown>
	{	if (!(value instanceof Map))
		{	throw new Error('Assertion failed');
		}
	}

	assert3(message: string): asserts this
	{	if (!this)
		{	throw new Error('Assertion failed: '+message);
		}
	}

	assert4(message: string): asserts this is Base1
	{	if (!(this instanceof Base1))
		{	throw new Error('Assertion failed: '+message);
		}
	}

	noassert(value: unknown): value is Map<unknown, unknown>
	{	return value instanceof Map;
	}

	noassert2(): this is Base1
	{	return this instanceof Base1;
	}

	*gen(_arr=[], _obj={}, _slice=Array.prototype.slice): Generator<number, void, unknown>
	{	yield 1;
		yield 2;
	}

	async fetch()
	{	await Promise.resolve();
		return '';
	}
}


// Functions:
export function func1(_a: number, _b: string): void
{
}
export function func2(a: number, b?: string, _c=1n, _d=''): string
{	return `${a}, ${b}`;
}
export function func3(_a: number, ..._b: string[]): void
{
}
export function func4(_a: number, [_b, _c]: [string, number]): void
{
}
export function func5(_a: number, [_b='b', _c=1]: [string, number]): void
{
}
export function func6(_a: number, [_b, _c]: string[]): void
{
}
export function func7(_a: number, [_b='b', _c='c']: string[]): void
{
}
export function func8(_a: number, {_b, _c}: Record<string, boolean>): void
{
}
export function func9(_a: number, {_b=true, _c=false}: Record<string, boolean>): void
{
}
export function func10(_a: number, {b: _b, c: [_d, _e]}: Record<string, boolean[]>): void
{
}
export function func11(_a: number, {_b, c: [_d, _e]}: Record<string, boolean[]>): void
{
}
export function func12(_a: number, {b: _b=[true, false], c: [_d=true, _e=false]}: Record<string, boolean[]>): void
{
}
export function func13(_a: number, {_b=[true, false], c: [_d=true, _e=false]}: Record<string, boolean[]>): void
{
}


// Enums:
export enum Enum1 {ZERO, ONE, TWO}
export const enum Enum2 {ZERO, ONE, THREE=3, HELLO='hello', FOUR=4, FIVE}


// Types:
export type Type1 = string;
export type Type2 = Error;
export type Type3 = Class2;
export type Type4 = Promise<string>;
export type Type5 = void | undefined | null | true | 'lit' | `tpl` | 1 | 1n;
export type Type6 = string & number;
export type Type7 = string[];
export type Type8 = [string, boolean];
export type Type9 = [s: string, b: boolean];
export type Type10 = {s: string, b: boolean};
export type Type11<T> = {t: T} | undefined;
export type Type12<T> = [number, Error, ...T[]];
export type Type13<T extends Record<string, unknown> = {v: number}> = {t: T};
export type Type14<T, U> = {t: T, u: U};
export type Type15<T> = T extends Promise<infer I> ? I : T;
export type Type16<T> = Awaited<T>;
export type Type17<T> = {[k: string|number]: Promise<T>};
export type Type18<T> = {[k in keyof T]: Promise<T[k]>};
export type Type19<T> = {[k in keyof T]?: Promise<T[k]>};
export type Type20<T> = {[k in keyof T]+?: Promise<T[k]>};
export type Type21<T> = {[k in keyof T]-?: Promise<T[k]>};
export type Type22<T> = {readonly [k in keyof T]: Promise<T[k]>};
export type Type23<T> = {+readonly [k in keyof T]: Promise<T[k]>};
export type Type24<T> = {-readonly [k in keyof T]: Promise<T[k]>};
export type Type25<T> = {[k in keyof T as `pr_${k extends string ? k : ''}`]: Promise<T[k]>};
export type Type26<T extends string> = `pr_${T}`;
export type Type27<T extends string> = `${T}_sf`;
export type Type28<T extends string> = `pr_${T}_${string}_sf`;
export type Type29 = typeof func1;
export type Type30 = ReturnType<typeof func2>;
export type Type31 = Enum1 | Enum2;
export type Type32 = Enum1.ONE | Enum2.HELLO;
export type Type33 = Enum1 | Enum2.THREE | Promise<Enum2.HELLO> | Inter3<Enum2> | 'ok'[];
export type Type34<T> = {new(): T; (arg: string): void; func1: (arg: number[]) => never};
export type Type35 = {[SymProp]: string; [SymProp2]: () => string};
