import { createZodDto } from '@anatine/zod-nestjs';
import { Bookmarks } from '@prisma/client';
import { z } from 'zod';

const PercentItemSchema = z
    .object({
        count: z.number().int(),
        percentage: z.number(),
    })
    .default({
        count: 0,
        percentage: 0,
    });
export type PercentItem = z.infer<typeof PercentItemSchema>;

export const BookmarkStatisticSchema = z.object({
    [Bookmarks.Reading]: PercentItemSchema,
    [Bookmarks.Planned]: PercentItemSchema,
    [Bookmarks.Readed]: PercentItemSchema,
    [Bookmarks.Abandoned]: PercentItemSchema,
    [Bookmarks.Postponed]: PercentItemSchema,
});
export class BookmarkStatistic extends createZodDto(BookmarkStatisticSchema) {}

export const RateStatisticSchema = z.object({
    1: PercentItemSchema,
    2: PercentItemSchema,
    3: PercentItemSchema,
    4: PercentItemSchema,
    5: PercentItemSchema,
    6: PercentItemSchema,
    7: PercentItemSchema,
    8: PercentItemSchema,
    9: PercentItemSchema,
    10: PercentItemSchema,
});
export class RateStatistic extends createZodDto(RateStatisticSchema) {}

export const BookRating = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
} as const;
export type BookRating = ValueOf<typeof BookRating>;
