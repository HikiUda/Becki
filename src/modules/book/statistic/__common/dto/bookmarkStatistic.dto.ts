import { z } from 'zod';
import { Bookmarks } from '@prisma/client';
import { PercentItemSchema } from './percentItem.schema';
import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from '@anatine/zod-nestjs';

export const BookmarkStatisticSchema = z.object({
    [Bookmarks.Reading]: PercentItemSchema,
    [Bookmarks.Planned]: PercentItemSchema,
    [Bookmarks.Readed]: PercentItemSchema,
    [Bookmarks.Abandoned]: PercentItemSchema,
    [Bookmarks.Postponed]: PercentItemSchema,
});
export class BookmarkStatistic extends createZodDto(BookmarkStatisticSchema) {}

export class BookmarkSummaryStatistic {
    @ApiProperty()
    count: number;
    @ApiProperty()
    statistic: BookmarkStatistic;
}
