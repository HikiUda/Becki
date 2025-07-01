import { Prisma, PrismaClient } from '@prisma/client';
import { getContinueReadBooksSelectInput } from './getContinueReadBookSelectInput';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { ContinueReadBook } from '../dto/continueReadBook.dto';

const getContinueReadBooks = async (prisma: PrismaClient) => {
    return await prisma.mangaProgressRead.findMany({
        select: getContinueReadBooksSelectInput('ru'),
    });
};
export type GetContinueReadBooks = Prisma.PromiseReturnType<typeof getContinueReadBooks>;

export function toContinueReadBook(data: GetContinueReadBooks, lang: LangType): ContinueReadBook[] {
    return data.map((item) => {
        return {
            id: item.book.id,
            urlId: item.book.urlId,
            title: item.book.title?.[lang] || item.book.title?.ru || '',
            cover: item.book.covers[0]?.cover || '',
            tome: item.chapter.tome,
            chapter: item.chapter.chapter,
            chapterId: item.chapter.id,
        };
    });
}
