import { z } from 'zod';
import { Bookmarks } from '@prisma/client';
import { createStatisticItem, StatisticItemDto } from './statisticItem.Scheme';
import { ApiProperty } from '@nestjs/swagger';

export const BookmarkStatisticScheme = z.object({
    all: z.number().int(),
    bookmarks: z.tuple([
        createStatisticItem(Bookmarks.Reading),
        createStatisticItem(Bookmarks.Planned),
        createStatisticItem(Bookmarks.Readed),
        createStatisticItem(Bookmarks.Abandoned),
        createStatisticItem(Bookmarks.Postponed),
    ]),
});

export type BookmarkStatisticType = z.infer<typeof BookmarkStatisticScheme>;

export class ApiBookmarkStatisticDto implements BookmarkStatisticType {
    @ApiProperty()
    all: number;
    @ApiProperty({
        type: [StatisticItemDto],
        minItems: 5,
        maxItems: 5,
        description:
            'Массив из 5 элементов вида закладок. Порядок Reading, Planned, Readed, Abandoned, Postponed',
    })
    bookmarks: [
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
        StatisticItemDto,
    ];
}
