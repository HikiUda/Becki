import { Prisma } from '@prisma/client';
import { Lang } from 'src/shared/dto/langQuery.dto';

export const getLastUpdatedSelect = (lang: Lang) => {
    return {
        id: true,
        tome: true,
        chapter: true,
        createdAt: true,
        book: {
            select: {
                id: true,
                urlId: true,
                title: { select: { ru: true, en: lang === 'en' } },
                type: true,
                covers: { where: { main: true }, select: { cover: true } },
            },
        },
    } satisfies Prisma.BookChaptersSelect;
};
