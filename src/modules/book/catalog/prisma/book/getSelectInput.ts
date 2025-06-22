import { Prisma } from '@prisma/client';
import { LangType } from 'src/shared/dto/query/langQuery.dto';

export const getSelectInput = (lang: LangType, userId?: number) => {
    return {
        id: true,
        urlId: true,
        type: true,
        title: { select: { ru: true, en: lang === 'en' } },
        statistic: { select: { chapterCount: true, rate: true } },
        bookmarks: !!userId && { where: { userId }, select: { bookmark: true } },
        covers: { where: { main: true }, select: { cover: true } },
    } satisfies Prisma.MangaSelect;
};
