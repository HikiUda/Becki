import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { EditedMangaCovers } from '../dto/editedmanga.dto';
import { TransactionContextType } from 'src/common/types/prisma';

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
    });
};
export type addMangaCoversReturnType = Prisma.PromiseReturnType<typeof addMangaCovers>;

function deleteMangaCoversInput(id: number): Prisma.MangaCoversDeleteArgs {
    return {
        where: {
            id,
        },
    };
}
export const deleteMangaCovers = async (coversId: number[], tx?: TransactionContextType) => {
    if (tx) {
        return await prisma.$transaction(
            coversId.map((id) => tx.mangaCovers.delete(deleteMangaCoversInput(id))),
        );
    }
    return await prisma.$transaction(
        coversId.map((id) => prisma.mangaCovers.delete(deleteMangaCoversInput(id))),
    );
};
export type deleteMangaCoversReturnType = Prisma.PromiseReturnType<typeof deleteMangaCovers>;

export function toEditedCoversDto(covers: addMangaCoversReturnType): EditedMangaCovers[] | null {
    if (!covers) return null;
    return covers.map((cover) => ({ id: cover.id, cover: cover.cover }));
}
