import { Bookmarks } from '@prisma/client';
import { WhereInputType } from './whereInput.type';

export const getBookmarks = (bookmarks: Bookmarks[], userId: number) => {
    return {
        bookmarks: { some: { userId: userId, bookmark: { in: bookmarks } } },
    } satisfies WhereInputType;
};
