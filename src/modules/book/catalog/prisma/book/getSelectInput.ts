import { Prisma } from '@prisma/client';
import { UserId } from 'src/modules/authorization';

export const getSelectInput = (userId?: UserId) => {
    return {
        id: true,
        urlId: true,
        type: true,
        title: { select: { main: true } },
        statistic: { select: { chapterCount: true, rate: true } },
        bookmarks: !!userId && { where: { userId }, select: { bookmark: true } },
        covers: { where: { main: true }, select: { cover: true } },
    } satisfies Prisma.BookSelect;
};
