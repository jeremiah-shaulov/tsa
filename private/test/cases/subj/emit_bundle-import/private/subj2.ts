import {pathDotDot} from './subj1.ts';
import fs from 'node:fs/promises';

export const DOT_DOT = '..';
export const pathDotDotSlash = pathDotDot + '/';
export const pathDot2 = await fs.realpath('.');
