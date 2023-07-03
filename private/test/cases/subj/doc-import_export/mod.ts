/**	Tests imports from another module, and reexport.

	@author Johnny
	@module Import
 **/

import ZERO from './private/subj1.ts';
import {Class1, type Type1 as Type2} from './private/subj1.ts';

export const ZERO_2 = ZERO;

export class Class2 extends Class1 {}

export type Type3 = Type2;

export {Numbers, EvenNumbers2 as EvenNumbers3, type OddNumbers2 as OddNumbers3, ONE as CONST_ONE} from './private/subj1.ts';

export * as subj3 from './private/subj3.ts';

export {Client} from 'https://deno.land/x/mysql@v2.11.0/mod.ts';

function defaultHello(a: number) {return a+''}
export default defaultHello;

import data from './private/data.json' assert {type: 'json'};
const JSON_DATA = data;
export {JSON_DATA};
export {JSON_DATA as JSON_DATA_2};
