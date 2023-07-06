Given the following 2 modules:

```js
// mod1.ts

import {Class2 as Class2Alias} from './mod2.ts';

export class Class1 extends Class2Alias
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

import {mark1, OneOrTwo} from './mod1.ts';

await new Promise(y => setTimeout(y, 100));

export class Class2
{	name2 = 'class2';
	mark1 = mark1;
	two: OneOrTwo = 2;
}
```

This is what i want to achieve:

```ts
// Types
type modTypeOneOrTwo = Awaited<ReturnType<typeof mod1>>["OneOrTwo"][0];

// Symbol exporters
let modExportClass1: (v: Awaited<ReturnType<typeof mod1>>["Class1"]) => void;
let modExportMark1: (v: Awaited<ReturnType<typeof mod1>>["mark1"]) => void;
let modExportClass2: (v: Awaited<ReturnType<typeof mod2>>["Class2"]) => void;

// Symbols to be exported (futures)
const modPromiseClass1 = new Promise<Awaited<ReturnType<typeof mod1>>["Class1"]>(y => modExportClass1 = y);
const modPromiseMark1 = new Promise<Awaited<ReturnType<typeof mod1>>["mark1"]>(y => modExportMark1 = y);
const modPromiseClass2 = new Promise<Awaited<ReturnType<typeof mod2>>["Class2"]>(y => modExportClass2 = y);

// Load modules
mod1();
mod2();

// What this module exports
const Class1 = await modPromiseClass1;
const mark1 = await modPromiseMark1;
type OneOrTwo = modTypeOneOrTwo;
export {Class1, mark1, type OneOrTwo};



// _____________________________________________________________________________
/* BEGIN */                async function mod1() {                  /* MODULE */
// _____________________________________________________________________________

await Promise.resolve();
const mark1 = 10; // shift mark1 to the beginning before awaiting
modExportMark1(mark1);
const Class2Alias = await modPromiseClass2;
class Class1 extends Class2Alias
{	name1 = 'class1';
}
modExportClass1(Class1);
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

const mark1 = await modPromiseMark1;
type OneOrTwo = modTypeOneOrTwo;
class Class2
{	name2 = 'class2';
	mark1 = mark1;
	two: OneOrTwo = 2;
}
modExportClass2(Class2);

return {Class2};

// _____________________________________________________________________________
/* END */                           }                               /* MODULE */
// _____________________________________________________________________________
```
