export * as letters from './private/subj1.ts'; // exports: A, B, C, type ABC, num={ONE, TWO, THREE, type Numbers, join}, joinPath

const ONE = 'one';
const A = null;

import * as num2 from './private/subj2.ts';
import {num, joinPath} from './private/subj1.ts';
import defaultFunc from  './private/subj1.ts';
console.log(ONE, A, num2.ONE, num.ONE, joinPath(), defaultFunc());
