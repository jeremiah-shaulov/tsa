const ZERO = 0;

export default ZERO;

export class Class1
{	name = '';
}

export type Type1 = string | number;

export enum Numbers
{	One = 1,
	Two = 'TWO',
	Three = 3,
}

export const ONE = 1;

export {EvenNumbers as EvenNumbers2} from './subj2.ts';
import {OddNumbers} from './subj2.ts';
export type OddNumbers2 = OddNumbers;
