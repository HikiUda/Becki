import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';
import { MutateManyToManyInMangaType } from '../../dto/mutateManga.dto';
import { FilterGenresAndTags } from './FilterGenresAndTags';

export const mutateMangaGenres = async (
    mutateGenres: MutateManyToManyInMangaType,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<number[]> => {
    if (tx) {
        const manga = await tx.manga.findUnique({
            where: { id: mangaId },
            select: { genres: true },
        });
        if (manga?.genres.length) {
            return FilterGenresAndTags(manga.genres, mutateGenres);
        }
        return FilterGenresAndTags([], mutateGenres);
    }
    const manga = await prisma.manga.findUnique({
        where: { id: mangaId },
        select: { genres: true },
    });
    if (manga?.genres.length) {
        return FilterGenresAndTags(manga.genres, mutateGenres);
    }
    return FilterGenresAndTags([], mutateGenres);
};
