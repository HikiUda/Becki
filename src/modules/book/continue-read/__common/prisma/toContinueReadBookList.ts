import { Prisma, PrismaClient } from '@prisma/client';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { getContinueReadBookListSelect } from './getContinueReadBookListSelect';
import { ContinueReadBookList, ContinueReadBookListItem } from '../dto/continueReadBookList.dto';

const getContinueReadBookList = async (prisma: PrismaClient) => {
    return await prisma.bookBookmarks.findMany({
        where: { chapter: { isNot: null } },
        select: getContinueReadBookListSelect('ru'),
    });
};
type GetContinueReadBookList = Prisma.PromiseReturnType<typeof getContinueReadBookList>;

export function toContinueReadBookList(
    data: GetContinueReadBookList,
    lang: LangType,
): ContinueReadBookList {
    const books: ContinueReadBookListItem[] = data.map((item) => {
        return {
            id: item.book.id,
            urlId: item.book.urlId,
            title: item.book.title?.[lang] || item.book.title?.ru || '',
            cover: item.book.covers[0]?.cover || '',
            tome: item.chapter?.tome || 0,
            chapter: item.chapter?.chapter || 0,
            chapterId: item.chapter?.id || 0,
        };
    });

    return { data: books };
}
