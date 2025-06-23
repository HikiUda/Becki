import { PrismaClient } from '@prisma/client';
import { BookRelated } from '../../__common/bookRelated';

export const getMangaRelated = async (prisma: PrismaClient, id: number) => {
    const manga = await prisma.manga.findUnique({
        where: { id },
        select: { related: { select: { manga: true, ranobe: true } } },
    });
    if (!manga?.related) return null;
    return BookRelated.parse(manga.related);
};
