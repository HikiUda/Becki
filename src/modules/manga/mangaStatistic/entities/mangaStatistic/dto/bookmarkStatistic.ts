import { z } from 'zod';
import { PercentItemScheme } from './rateStatistic';

export const BookmarkStatisticScheme = z.object({
    all: z.number().int(),
    Reading: z.object({ name: z.literal('Reading') }).merge(PercentItemScheme),
    Planned: z.object({ name: z.literal('Planned') }).merge(PercentItemScheme),
    Readed: z.object({ name: z.literal('Readed') }).merge(PercentItemScheme),
    Abandoned: z.object({ name: z.literal('Abandoned') }).merge(PercentItemScheme),
    Postponed: z.object({ name: z.literal('Postponed') }).merge(PercentItemScheme),
});

export type BookmarkStatisticType =
    | z.infer<typeof BookmarkStatisticScheme>
    | Record<PropertyKey, never>;
