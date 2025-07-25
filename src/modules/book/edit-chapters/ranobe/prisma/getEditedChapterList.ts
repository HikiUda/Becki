import { PrismaClient } from '@prisma/client';
import { EditedBookChapterListQuery } from '../../__common/dto/editedBookChapterList';
import { getEditedChapterListWhereInput } from '../../__common/prisma/getEditedChapterListWhereInput';
import { RanobeId } from 'src/modules/book/_common/model/bookId';

export const getEditedRanobeChapterList = async (
    prisma: PrismaClient,
    bookId: RanobeId,
    query: EditedBookChapterListQuery,
) => {
    const { search, limit, page, order } = query;
    const skip = limit * (page - 1);

    const chapters = await prisma.ranobeChapters.findMany({
        where: getEditedChapterListWhereInput(bookId, search),
        orderBy: [{ tome: order }, { chapter: order }],
        skip,
        take: limit,
    });

    const chapterCount = await prisma.ranobeChapters.count({
        where: getEditedChapterListWhereInput(bookId, search),
    });
    return [chapters, chapterCount] as const;
};
