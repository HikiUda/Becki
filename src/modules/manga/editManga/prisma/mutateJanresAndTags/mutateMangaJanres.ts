import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';
import { MutateManyToManyInMangaType } from '../../dto/mutateManga.dto';
import { FilterJanresAndTags } from './FilterJanresAndTags';

export const mutateMangaJanres = async (
    mutateJanres: MutateManyToManyInMangaType,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<number[]> => {
    if (tx) {
        const manga = await tx.manga.findUnique({
            where: { id: mangaId },
            select: { janres: true },
        });
        if (manga?.janres.length) {
            return FilterJanresAndTags(manga.janres, mutateJanres);
        }
        return FilterJanresAndTags([], mutateJanres);
    }
    const manga = await prisma.manga.findUnique({
        where: { id: mangaId },
        select: { janres: true },
    });
    if (manga?.janres.length) {
        return FilterJanresAndTags(manga.janres, mutateJanres);
    }
    return FilterJanresAndTags([], mutateJanres);
};
