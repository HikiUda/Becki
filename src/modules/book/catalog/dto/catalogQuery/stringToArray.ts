import { z } from 'zod';

export const StringToStringArray = z
    .string()
    .default('')
    .transform((val) => (val ? val.split(',') : []));

export const StringToNumberArray = z
    .string()
    .default('')
    .transform((val) => (val ? val.split(',').map((v) => parseInt(v)) : []))
    .pipe(z.number().int().array());
