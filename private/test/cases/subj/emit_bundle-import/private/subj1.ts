import fs from 'node:fs/promises';
import {DOT_DOT} from './subj2.ts';

export const pathDotDot = await fs.realpath(DOT_DOT);
export const pathDot = await fs.realpath('.');
