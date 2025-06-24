import { Prisma, PrismaClient } from '@prisma/client';
import { BookRelated } from '../bookRelated';
import { LangType } from 'src/shared/dto/query/langQuery.dto';

const getRelatedBooksSelect = (lang: LangType) => {
    return {
        id: true,
        urlId: true,
        title: { select: { ru: true, en: lang === 'en' } },
        covers: { where: { main: true }, select: { cover: true } },
        type: true,
        status: true,
    } satisfies Prisma.MangaSelect;
};

export const getRelatedBooks = async (
    prisma: PrismaClient,
    boolRelated: BookRelated,
    lang: LangType,
) => {
    const mangaIds = Object.keys(boolRelated.manga).map((key) => Number(key));
    //const ranobeIds = Object.keys(boolRelated.ranobe).map((key) => Number(key));

    const manga = await prisma.manga.findMany({
        where: { id: { in: mangaIds } },
        select: getRelatedBooksSelect(lang),
    });

    return { manga } as const;
};

export type GetRelatedBooksReturnType = Prisma.PromiseReturnType<typeof getRelatedBooks>;
