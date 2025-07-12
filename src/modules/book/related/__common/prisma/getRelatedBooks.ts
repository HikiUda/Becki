import { Prisma, PrismaClient } from '@prisma/client';
import { BookRelated } from '../bookRelated';

const getRelatedBooksSelect = () => {
    return {
        id: true,
        urlId: true,
        title: { select: { main: true } },
        covers: { where: { main: true }, select: { cover: true } },
        type: true,
        status: true,
    } satisfies Prisma.MangaSelect;
};

export const getRelatedBooks = async (prisma: PrismaClient, boolRelated: BookRelated) => {
    const mangaIds = Object.keys(boolRelated.manga).map((key) => Number(key));
    const ranobeIds = Object.keys(boolRelated.ranobe).map((key) => Number(key));

    const manga = await prisma.manga.findMany({
        where: { id: { in: mangaIds } },
        select: getRelatedBooksSelect(),
    });

    const ranobe = await prisma.ranobe.findMany({
        where: { id: { in: ranobeIds } },
        select: getRelatedBooksSelect(),
    });

    return { manga, ranobe } as const;
};

export type GetRelatedBook =
    | Prisma.PromiseReturnType<typeof getRelatedBooks>['manga']
    | Prisma.PromiseReturnType<typeof getRelatedBooks>['ranobe'];
