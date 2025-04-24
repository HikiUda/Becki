import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

function createMangaCoversInput(
    cover: string,
    mangaId: number,
    main: boolean,
): Prisma.MangaCoversCreateManyInput {
    return {
        cover,
        mangaId,
        main,
    };
}

export const addMangaCovers = async (covers: string[], mangaId: number) => {
    const haveCovers = await prisma.mangaCovers.findFirst({ where: { mangaId } });
    return await prisma.mangaCovers.createManyAndReturn({
        data: covers.map((cover, ind) =>
            createMangaCoversInput(cover, mangaId, !ind && !haveCovers),
        ),
        select: {
            id: true,
            cover: true,
            main: true,
        },
    });
};
export type addMangaCoversReturnType = Prisma.PromiseReturnType<typeof addMangaCovers>;
