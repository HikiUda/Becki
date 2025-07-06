import { getChapterListWhereInput } from '../../__common/prisma/getChapterListWhereInput';
import { RanobeId } from 'src/modules/book/_common/model/bookId';
import { BookChapterListQuery } from '../../__common/dto/bookChapterListQuery.dto';
import { UserId } from 'src/modules/user/auth';
import { getChapterListSelect } from '../../__common/prisma/getChapterListSelect';
import { PrismaClient } from '@prisma/client';

export const getRanobeChapterList = async (
    prisma: PrismaClient,
    bookId: RanobeId,
    query: BookChapterListQuery,
    userId?: UserId,
) => {
    const { search, limit, page, order, lang } = query;
    const skip = limit * (page - 1);

    const chapters = await prisma.ranobeChapters.findMany({
        where: getChapterListWhereInput(bookId, search),
        orderBy: [{ tome: order }, { chapter: order }],
        skip,
        take: limit,
        select: getChapterListSelect(lang, userId),
    });

    const book = await prisma.ranobe.findUnique({
        where: { id: bookId },
        select: { statistic: { select: { chapterCount: true } } },
    });

    return [chapters, book?.statistic?.chapterCount || 0] as const;
};
