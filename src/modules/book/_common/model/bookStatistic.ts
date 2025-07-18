import { createZodDto } from '@anatine/zod-nestjs';
import { ApiProperty } from '@nestjs/swagger';
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

export class PercentItem extends createZodDto(PercentItemSchema) {}

// * BookmarkStatistic
export const BookmarkStatisticSchema = z.object({
    [Bookmarks.Reading]: PercentItemSchema,
    [Bookmarks.Planned]: PercentItemSchema,
    [Bookmarks.Readed]: PercentItemSchema,
    [Bookmarks.Abandoned]: PercentItemSchema,
    [Bookmarks.Postponed]: PercentItemSchema,
});

export class BookmarkStatistic implements z.infer<typeof BookmarkStatisticSchema> {
    @ApiProperty()
    Reading: PercentItem;
    @ApiProperty()
    Planned: PercentItem;
    @ApiProperty()
    Readed: PercentItem;
    @ApiProperty()
    Abandoned: PercentItem;
    @ApiProperty()
    Postponed: PercentItem;
}

// * RateStatistic
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

export class RateStatistic implements z.infer<typeof RateStatisticSchema> {
    @ApiProperty()
    1: PercentItem;
    @ApiProperty()
    2: PercentItem;
    @ApiProperty()
    3: PercentItem;
    @ApiProperty()
    4: PercentItem;
    @ApiProperty()
    5: PercentItem;
    @ApiProperty()
    6: PercentItem;
    @ApiProperty()
    7: PercentItem;
    @ApiProperty()
    8: PercentItem;
    @ApiProperty()
    9: PercentItem;
    @ApiProperty()
    10: PercentItem;
}

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
