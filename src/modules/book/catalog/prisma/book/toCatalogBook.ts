import { Prisma, PrismaClient } from '@prisma/client';
import { getSelectInput } from './getSelectInput';
import { CatalogBook } from '../../dto/catalogBook.dto';
import { UserId } from 'src/modules/authorization';

const getCatalogBook = async (prisma: PrismaClient) => {
    return await prisma.book.findMany({
        select: getSelectInput(0 as UserId),
    });
};
type GetCatalogBook = Prisma.PromiseReturnType<typeof getCatalogBook>[number];

export function toCatalogBook<T extends string>(
    data: (GetCatalogBook & { type: T })[],
): (CatalogBook & { type: T })[] {
    return data.map((book) => {
        return {
            id: book.id,
            urlId: book.urlId,
            title: book.title?.main || '',
            chapterCount: book.statistic?.chapterCount || 0,
            rate: book.statistic?.rate || 0,
            type: book.type,
            cover: book.covers?.[0]?.cover || '',
            bookmark: (book.bookmarks && book.bookmarks[0]?.bookmark) || null,
        };
    });
}
