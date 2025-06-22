import { z } from 'zod';

export const StringToStringArray = z
    .string()
    .default('')
    .describe('Comma-separated list, e.g. "el1,el2,el3"')
    .transform((val) => (val ? val.split(',') : []));

export const StringToNumberArray = z
    .string()
    .default('')
    .describe('Comma-separated list of number, e.g. "1,2,3"')
    .transform((val) => (val ? val.split(',').map((v) => parseInt(v)) : []))
    .pipe(z.number().int().array());
