import { prisma } from 'src/shared/prisma/prisma';
import { TransactionContextType } from 'src/shared/types/prisma';
import { MutateMangaCategoriesType } from '../../dto/mutateManga/mutateManga.dto';
import { FilterGenresAndTags } from './FilterGenresAndTags';

export const mutateMangaGenres = async (
    mutateGenres: MutateMangaCategoriesType,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<number[]> => {
    const context = tx || prisma;

    const manga = await context.manga.findUnique({
        where: { id: mangaId },
        select: { genres: true },
    });

    const updatedGenres = FilterGenresAndTags(manga?.genres || [], mutateGenres);
    await context.manga.update({
        where: { id: mangaId },
        data: {
            genres: { set: updatedGenres },
        },
    });
    return updatedGenres;
};
