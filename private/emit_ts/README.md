Given the following 2 modules:

```js
// mod1.ts

import {Class2} from './mod2.ts';

export class Class1 extends Class2
{	name1 = 'class1';
}
export const mark1 = 10;
export type OneOrTwo = 1 | 2;

const c = new Class1;
console.log(c);
```

And:

```js
// mod2.ts

import {mark1} from './mod1.ts';

await new Promise(y => setTimeout(y, 100));

export class Class2
{	name2 = 'class2';
	mark1 = mark1;
}
```

This is what i want to achieve:

```ts
// Symbol exporters
let export_Class1: (v: Awaited<ReturnType<typeof mod1>>["Class1"]) => void;
let export_mark1: (v: Awaited<ReturnType<typeof mod1>>["mark1"]) => void;
let export_Class2: (v: Awaited<ReturnType<typeof mod2>>["Class2"]) => void;

// Symbols to be exported
const promise_Class1 = new Promise<Awaited<ReturnType<typeof mod1>>["Class1"]>(y => export_Class1 = y);
const promise_mark1 = new Promise<Awaited<ReturnType<typeof mod1>>["mark1"]>(y => export_mark1 = y);
const promise_Class2 = new Promise<Awaited<ReturnType<typeof mod2>>["Class2"]>(y => export_Class2 = y);

// Load modules
mod1();
mod2();

// Export main
const Class1 = await promise_Class1;
const mark1 = await promise_mark1;
type OneOrTwo = Awaited<ReturnType<typeof mod1>>["OneOrTwo"][0];
export {Class1, mark1, type OneOrTwo};



// _____________________________________________________________________________
/* BEGIN */                async function mod1() {                  /* MODULE */
// _____________________________________________________________________________

await Promise.resolve();
const mark1 = 10; // shift mark1 to the beginning before awaiting
export_mark1(mark1);
const Class2 = await promise_Class2;
class Class1 extends Class2
{	name1 = 'class1';
}
export_Class1(Class1);
type OneOrTwo = 1 | 2;

const c = new Class1;
console.log(c);

return {Class1, mark1, OneOrTwo: new Array<OneOrTwo>};

// _____________________________________________________________________________
/* END */                           }                               /* MODULE */
// _____________________________________________________________________________



// _____________________________________________________________________________
/* BEGIN */                async function mod2() {                  /* MODULE */
// _____________________________________________________________________________

await Promise.resolve();
await new Promise(y => setTimeout(y, 100));

const mark1 = await promise_mark1;
class Class2
{	name2 = 'class2';
	mark1 = mark1;
}
export_Class2(Class2);

return {Class2};

// _____________________________________________________________________________
/* END */                           }                               /* MODULE */
// _____________________________________________________________________________
```
