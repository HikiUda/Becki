import { Prisma } from '@prisma/client';
import { UserId } from 'src/modules/authorization';

export const getChapterSelect = (userId?: UserId) => {
    return {
        id: true,
        title: true,
        tome: true,
        chapter: true,
        book: {
            select: {
                title: { select: { main: true } },
            },
        },
        usersLike: userId && {
            where: { userId },
            select: { userId: true },
        },
        usersView: userId && {
            where: { userId },
            select: { userId: true },
        },
    } satisfies Prisma.BookChaptersSelect;
};
