import { Prisma } from '@prisma/client';
import { Lang } from 'src/shared/dto/langQuery.dto';

export const getContinueReadBookListSelect = (lang: Lang) => {
    return {
        book: {
            select: {
                id: true,
                urlId: true,
                title: { select: { ru: true, en: lang === 'en' } },
                covers: { where: { main: true }, select: { cover: true } },
            },
        },
        chapter: { select: { chapter: true, tome: true, id: true } },
    } satisfies Prisma.BookBookmarksSelect;
};
