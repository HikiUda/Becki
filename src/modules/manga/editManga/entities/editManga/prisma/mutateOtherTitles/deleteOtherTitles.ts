import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { TransactionContextType } from 'src/shared/types/prisma';

export const deleteMangaOtherTitles = async (titles: number[], tx?: TransactionContextType) => {
    const context = tx || prisma;

    return await context.mangaOtherTitles.deleteMany({
        where: { id: { in: titles } },
    });
};
export type DeleteMangaOtherTitlesReturnType = Prisma.PromiseReturnType<
    typeof deleteMangaOtherTitles
>;
