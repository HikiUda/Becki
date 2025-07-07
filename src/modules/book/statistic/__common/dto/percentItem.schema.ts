import { z } from 'zod';

export const PercentItemSchema = z
    .object({
        count: z.number().int(),
        percentage: z.number(),
    })
    .default({
        count: 0,
        percentage: 0,
    });

export type PercentItem = z.infer<typeof PercentItemSchema>;
