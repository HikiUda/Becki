import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { TransactionContextType } from 'src/shared/types/prisma';

export const deleteManga = async (id: number, tx?: TransactionContextType) => {
    const context = tx || prisma;

    await context.mangaStatistic.delete({ where: { mangaId: id } });
    await context.mangaTitle.delete({ where: { mangaId: id } });
    await context.mangaDescription.delete({ where: { mangaId: id } });
    return await context.manga.delete({ where: { id } });
};

export type DeleteMangaReturnType = Prisma.PromiseReturnType<typeof deleteManga>;
