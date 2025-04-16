import { z } from 'zod';
import { Bookmarks } from '@prisma/client';
import { createStatisticItem } from './statisticItem.Scheme';

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
