// mod2.ts

import {mark1, OneOrTwo} from './subj1.ts';

await new Promise(y => setTimeout(y, 100));

export class Class2
{	name2 = 'class2';
	mark1 = mark1;
	two: OneOrTwo = 2;
}

export function hello()
{
}
