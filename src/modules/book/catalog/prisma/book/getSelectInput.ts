import { Prisma } from '@prisma/client';
import { UserId } from 'src/modules/user/auth';
import { Lang } from 'src/shared/dto/langQuery.dto';

export const getSelectInput = (lang: Lang, userId?: UserId) => {
    return {
        id: true,
        urlId: true,
        type: true,
        title: { select: { ru: true, en: lang === 'en' } },
        statistic: { select: { chapterCount: true, rate: true } },
        bookmarks: !!userId && { where: { userId }, select: { bookmark: true } },
        covers: { where: { main: true }, select: { cover: true } },
    } satisfies Prisma.BookSelect;
};
