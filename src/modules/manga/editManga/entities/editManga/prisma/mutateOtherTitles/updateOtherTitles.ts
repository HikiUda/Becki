import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { TransactionContextType } from 'src/shared/types/prisma';
import { UpdateMangaOtherTitleType } from '../../dto/mutateManga/mutateTitles';

export const updateMangaOtherTitles = async (
    titles: UpdateMangaOtherTitleType[],
    tx?: TransactionContextType,
) => {
    const context = tx || prisma;

    return await prisma.$transaction(
        titles.map((title) =>
            context.mangaOtherTitles.update({
                where: { id: title.id },
                data: { title: title.title },
            }),
        ),
    );
};
export type UpdateMangaOtherTitlesReturnType = Prisma.PromiseReturnType<
    typeof updateMangaOtherTitles
>;
