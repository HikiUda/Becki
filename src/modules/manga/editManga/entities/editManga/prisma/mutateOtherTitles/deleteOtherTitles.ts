import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';

export const deleteMangaOtherTitles = async (titles: number[], tx?: TransactionContextType) => {
    const context = tx || prisma;

    return await context.mangaOtherTitles.deleteMany({
        where: { id: { in: titles } },
    });
};
export type DeleteMangaOtherTitlesReturnType = Prisma.PromiseReturnType<
    typeof deleteMangaOtherTitles
>;
