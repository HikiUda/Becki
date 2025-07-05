import { getChapterListWhereInput } from '../../__common/prisma/getChapterListWhereInput';
import { MangaId } from 'src/modules/book/_common/model/bookId';
import { BookChapterListQuery } from '../../__common/dto/bookChapterListQuery.dto';
import { UserId } from 'src/modules/user/auth';
import { getChapterListSelect } from '../../__common/prisma/getChapterListSelect';
import { PrismaClient } from '@prisma/client';

export const getMangaChapterList = async (
    prisma: PrismaClient,
    bookId: MangaId,
    query: BookChapterListQuery,
    userId?: UserId,
) => {
    const { search, limit, page, order, lang } = query;
    const skip = limit * (page - 1);

    const chapters = await prisma.mangaChapters.findMany({
        where: getChapterListWhereInput(bookId, search),
        orderBy: [{ tome: order }, { chapter: order }],
        skip,
        take: limit,
        select: getChapterListSelect(lang, userId),
    });

    const chapterCount = await prisma.mangaChapters.count({
        where: getChapterListWhereInput(bookId, search),
    });

    return [chapters, chapterCount] as const;
};
