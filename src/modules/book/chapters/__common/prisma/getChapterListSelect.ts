import { Prisma } from '@prisma/client';
import { UserId } from 'src/modules/user/auth';

export const getChapterListSelect = (userId?: UserId) => {
    return {
        id: true,
        title: true,
        tome: true,
        chapter: true,
        createdAt: true,
        usersView: userId && {
            where: { userId },
            select: { userId: true },
        },
    } satisfies Prisma.BookChaptersSelect;
};
