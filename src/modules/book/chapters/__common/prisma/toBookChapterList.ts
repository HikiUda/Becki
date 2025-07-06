import { Prisma, PrismaClient } from '@prisma/client';
import { getChapterListSelect } from './getChapterListSelect';
import { UserId } from 'src/modules/user/auth';
import { BookChapterList } from '../dto/bookChapterList.dto';
import { BookChapterListQuery } from '../dto/bookChapterListQuery.dto';
import { getPagination } from 'src/shared/dto/pagination.dto';

const getChapterList = async (prisma: PrismaClient) => {
    const chapters = await prisma.bookChapters.findMany({
        select: getChapterListSelect('ru', 0 as UserId),
    });
    const chaptersCount: number = 0;
    return [chapters, chaptersCount] as const;
};
type GetChapterList = Prisma.PromiseReturnType<typeof getChapterList>;

export function toBookChapterList(
    data: GetChapterList,
    query: BookChapterListQuery,
): BookChapterList {
    const chapters = data[0].map((chapter) => ({
        id: chapter.id,
        tome: chapter.tome,
        chapter: chapter.chapter,
        title: chapter.title && (chapter.title[query.lang] || chapter.title.ru),
        createdAt: chapter.createdAt,
        isUserViewed: !!chapter.usersView?.length,
    }));
    return {
        data: chapters,
        ...getPagination(data[1], query.page, query.limit),
    };
}
