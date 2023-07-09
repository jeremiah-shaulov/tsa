// subj1.ts

import {Class2 as Class2Alias} from './subj2.ts';

export class Class1 extends Class2Alias
{	name1 = 'class1';
}
const mark1Base = 9;
export const mark1 = mark1Base + 1;
export type OneOrTwo = 1 | 2;

export let Class2 = 0;

const c = new Class1;
console.log(c);
