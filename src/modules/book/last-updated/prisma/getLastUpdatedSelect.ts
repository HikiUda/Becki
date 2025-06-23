import { Prisma } from '@prisma/client';
import { LangType } from 'src/shared/dto/query/langQuery.dto';

export const getLastUpdatedSelect = (lang: LangType) => {
    return {
        id: true,
        tome: true,
        chapter: true,
        createdAt: true,
        manga: {
            select: {
                id: true,
                urlId: true,
                title: { select: { ru: true, en: lang === 'en' } },
                type: true,
                covers: { where: { main: true }, select: { cover: true } },
            },
        },
    } satisfies Prisma.ChaptersSelect;
};
