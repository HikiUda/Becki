import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const PercentItemScheme = z.object({
    count: z.number().int(),
    percentage: z.number(),
});
export const createStatisticItem = (stat: string) =>
    z.object({ title: z.literal(stat) }).merge(PercentItemScheme);

export class StatisticItemDto extends createZodDto(
    PercentItemScheme.extend({ title: z.string() }),
) {}
