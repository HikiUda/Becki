import { z } from 'zod';

export const PercentItemScheme = z.object({
    count: z.number().int(),
    percentage: z.number().int(),
});
export const RateStatisticScheme = z.object({
    1: z.object({ name: z.literal(1) }).merge(PercentItemScheme),
    2: z.object({ name: z.literal(2) }).merge(PercentItemScheme),
    3: z.object({ name: z.literal(3) }).merge(PercentItemScheme),
    4: z.object({ name: z.literal(4) }).merge(PercentItemScheme),
    5: z.object({ name: z.literal(5) }).merge(PercentItemScheme),
    6: z.object({ name: z.literal(6) }).merge(PercentItemScheme),
    7: z.object({ name: z.literal(7) }).merge(PercentItemScheme),
    8: z.object({ name: z.literal(8) }).merge(PercentItemScheme),
    9: z.object({ name: z.literal(9) }).merge(PercentItemScheme),
    10: z.object({ name: z.literal(10) }).merge(PercentItemScheme),
});

export type RateStatisticType = z.infer<typeof RateStatisticScheme>;
export interface RateFullStatisticType {
    rate: number;
    rateCount: number;
    rateStatistic: RateStatisticType | Record<PropertyKey, never>;
}
