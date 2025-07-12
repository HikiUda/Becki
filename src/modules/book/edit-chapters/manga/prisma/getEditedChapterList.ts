import { PrismaClient } from '@prisma/client';
import { EditedBookChapterListQuery } from '../../__common/dto/editedBookChapterList';
import { getEditedChapterListWhereInput } from '../../__common/prisma/getEditedChapterListWhereInput';
import { MangaId } from 'src/modules/book/_common/model/bookId';

export const getEditedMangaChapterList = async (
    prisma: PrismaClient,
    bookId: MangaId,
    query: EditedBookChapterListQuery,
) => {
    const { search, limit, page, order } = query;
    const skip = limit * (page - 1);

    const chapters = await prisma.mangaChapters.findMany({
        where: getEditedChapterListWhereInput(bookId, search),
        orderBy: [{ tome: order }, { chapter: order }],
        skip,
        take: limit,
    });

    const chapterCount = await prisma.mangaChapters.count({
        where: getEditedChapterListWhereInput(bookId, search),
    });

    return [chapters, chapterCount] as const;
};
