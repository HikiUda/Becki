import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';

function deleteMangaCoversInput(id: number): Prisma.MangaCoversDeleteArgs {
    return {
        where: {
            id,
        },
        select: { id: true, cover: true, main: true },
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
