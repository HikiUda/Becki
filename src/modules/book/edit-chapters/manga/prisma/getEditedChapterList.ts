import { PrismaClient } from '@prisma/client';
import { EditedBookChapterListQuery } from '../../__common/dto/editedBookChapterList';
import { getEditedChapterListWhereInput } from '../../__common/prisma/getEditedChapterListWhereInput';

export const getEditedMangaChapterList = async (
    prisma: PrismaClient,
    bookId: number,
    query: EditedBookChapterListQuery,
) => {
    const { search, limit, page, order } = query;
    const skip = limit * (page - 1);

    const chapters = await prisma.mangaChapters.findMany({
        where: getEditedChapterListWhereInput(bookId, search),
        orderBy: [{ tome: order }, { chapter: order }],
        skip,
        take: limit,
        include: {
            title: true,
        },
    });

    const chapterCount = await prisma.mangaStatistic.findUnique({
        where: { bookId },
        select: { chapterCount: true },
    });
    return [chapters, chapterCount?.chapterCount || 0] as const;
};
