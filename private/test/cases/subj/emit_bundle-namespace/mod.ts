export * as letters from './private/subj1.ts';

const ONE = 'one';
const A = null;

import * as num2 from './private/subj2.ts';
import {num, joinPath} from './private/subj1.ts';
console.log(ONE, A, num2.ONE, num.ONE, joinPath());
