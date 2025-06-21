import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { TransactionContextType } from 'src/shared/types/prisma';

export const createMangaOtherTitles = async (
    titles: string[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    const context = tx || prisma;

    return await context.mangaOtherTitles.createMany({
        data: titles.map((title) => ({ title, mangaId })),
    });
};

export type CreateMangaOtherTitlesReturnType = Prisma.PromiseReturnType<
    typeof createMangaOtherTitles
>;
