import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';
import { MutateMangaCategoriesType } from '../../dto/mutateManga/mutateManga.dto';
import { FilterGenresAndTags } from './FilterGenresAndTags';

export const mutateMangaTags = async (
    mutateTags: MutateMangaCategoriesType,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<number[]> => {
    const context = tx || prisma;
    const manga = await context.manga.findUnique({
        where: { id: mangaId },
        select: { tags: true },
    });

    const updatedTags = FilterGenresAndTags(manga?.tags || [], mutateTags);
    await context.manga.update({
        where: { id: mangaId },
        data: {
            tags: { set: updatedTags },
        },
    });
    return updatedTags;
};
