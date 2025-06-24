import { PrismaClient } from '@prisma/client';
import { BookRelated } from '../../__common/bookRelated';

export const setMangaRelated = async (
    prisma: PrismaClient,
    mangaId: number,
    bookRelated: Partial<BookRelated>,
) => {
    const manga = await prisma.manga.update({
        where: { id: mangaId },
        data: { related: { update: { data: bookRelated } } },
        select: { related: { select: { manga: true, ranobe: true } } },
    });
    if (!manga?.related) return { manga: {}, ranobe: {} };
    return BookRelated.parse(manga.related);
};
