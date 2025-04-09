import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';
import { MutateManyToManyInMangaType } from '../../dto/mutateManga.dto';
import { FilterGenresAndTags } from './FilterGenresAndTags';

export const mutateMangaTags = async (
    mutateTags: MutateManyToManyInMangaType,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<number[]> => {
    if (tx) {
        const manga = await tx.manga.findUnique({
            where: { id: mangaId },
            select: { tags: true },
        });
        if (manga?.tags.length) {
            return FilterGenresAndTags(manga.tags, mutateTags);
        }
        return FilterGenresAndTags([], mutateTags);
    }
    const manga = await prisma.manga.findUnique({
        where: { id: mangaId },
        select: { tags: true },
    });
    if (manga?.tags.length) {
        return FilterGenresAndTags(manga.tags, mutateTags);
    }
    return FilterGenresAndTags([], mutateTags);
};
