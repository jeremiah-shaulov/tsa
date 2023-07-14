export {default as subj1Export} from './private/subj1.ts'; // exports `subj1Export` (`function subj1Func(subj1Arg: string): void`)
export {default as subj2Export} from './private/subj2.ts'; // exports `subj2Export` (`class Subj2Class`)
export {default as subj3Export} from './private/subj3.ts'; // exports `subj3Export` (`function default(subj3Arg: string): string`)
export {def} from './private/subj4.ts'; // exports `def` (`function(subj4Arg: string): string`)
export {default as subj5Export} from './private/subj5.ts'; // exports `subj5Export` (`function subj6Func(subj6Arg: string): string`)
export {default as subj7Export} from './private/subj7.ts'; // exports `subj7Export` (`function subj8Func(subj8Arg: string): string`)

export default function modFunc() // exports `modFunc`
{
}
