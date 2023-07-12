import * as subj1 from './private/subj1.ts'; // imports: subj1.subj2.subj3.subj1.*, subj1.subj2.subj3.ONE, subj1.subj2.subj3.TWO, subj1.subj2.subj3.THREE, subj1.subj2.FOUR

const subj2 = subj1.subj2.subj3.subj1.subj2.subj3.subj1.subj2;
export default subj2.FOUR;
