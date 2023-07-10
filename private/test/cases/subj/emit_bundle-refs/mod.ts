import {Hello} from './private/subj1.ts';

const value =
{	hello: new Hello,
};

export const value2 =
{	value,
};

export class ForValue2
{	static prop = value2;
}
