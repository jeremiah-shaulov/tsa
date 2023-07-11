export const A = 'a';
export const B = 'b';
export const C = 'c';

export type ABC = 'a' | 'b' | 'c';

export * as num from './subj2.ts';

export {join as joinPath} from './subj2.ts';

export default function defaultFuncName()
{
}

import fn from './subj2.ts';
console.log(fn());
