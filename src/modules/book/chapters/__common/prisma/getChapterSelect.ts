import { Prisma } from '@prisma/client';
import { UserId } from 'src/modules/user/auth';
import { Lang } from 'src/shared/dto/langQuery.dto';

export const getChapterSelect = (lang: Lang, userId?: UserId) => {
    return {
        id: true,
        title: { select: { ru: true, en: lang === 'en' } },
        tome: true,
        chapter: true,
        book: {
            select: {
                title: { select: { ru: true, en: lang === 'en' } },
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
