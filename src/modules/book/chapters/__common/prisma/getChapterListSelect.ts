import { Prisma } from '@prisma/client';
import { UserId } from 'src/modules/user/auth';
import { Lang } from 'src/shared/dto/langQuery.dto';

export const getChapterListSelect = (lang: Lang, userId?: UserId) => {
    return {
        id: true,
        title: { select: { ru: true, en: lang === 'en' } },
        tome: true,
        chapter: true,
        createdAt: true,
        usersView: userId && {
            where: { userId },
            select: { id: false },
        },
    } satisfies Prisma.BookChaptersSelect;
};
