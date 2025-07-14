import { Bookmarks } from '@prisma/client';
import { WhereInputType } from './whereInput.type';
import { UserId } from 'src/modules/authorization';

export const getBookmarks = (bookmarks: Bookmarks[], userId: UserId) => {
    return {
        bookmarks: { some: { userId: userId, bookmark: { in: bookmarks } } },
    } satisfies WhereInputType;
};
