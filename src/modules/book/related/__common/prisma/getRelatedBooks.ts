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
    const ranobeIds = Object.keys(boolRelated.ranobe).map((key) => Number(key));

    const manga = await prisma.manga.findMany({
        where: { id: { in: mangaIds } },
        select: getRelatedBooksSelect(lang),
    });

    const ranobe = await prisma.ranobe.findMany({
        where: { id: { in: ranobeIds } },
        select: getRelatedBooksSelect(lang),
    });

    return { manga, ranobe } as const;
};

export type GetRelatedBook =
    | Prisma.PromiseReturnType<typeof getRelatedBooks>['manga']
    | Prisma.PromiseReturnType<typeof getRelatedBooks>['ranobe'];
