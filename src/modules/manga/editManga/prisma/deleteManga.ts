import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';

function deleteMangaArgs(id: number): Prisma.MangaDeleteArgs {
    return { where: { id } };
}
function deleteMangaDescriptionArgs(id: number): Prisma.MangaDescriptionDeleteArgs {
    return { where: { mangaId: id } };
}

export const deleteManga = async (id: number, tx?: TransactionContextType) => {
    if (tx) {
        await tx.mangaDescription.delete(deleteMangaDescriptionArgs(id));
        return await tx.manga.delete(deleteMangaArgs(id));
    }
    await prisma.mangaDescription.delete(deleteMangaDescriptionArgs(id));
    return await prisma.manga.delete(deleteMangaArgs(id));
};

export type deleteMangaReturnType = Prisma.PromiseReturnType<typeof deleteManga>;
