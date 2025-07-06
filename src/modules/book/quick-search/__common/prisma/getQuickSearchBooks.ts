import { Prisma, PrismaClient } from '@prisma/client';
import { Lang } from 'src/shared/dto/langQuery.dto';
import { QuickSearchBook } from '../dto/quickSearchBook.dto';

export const getQuickSearchBooksWhereInput = (search: string) => {
    return {
        title: {
            OR: [
                { ru: { contains: search, mode: 'insensitive' } },
                { en: { contains: search, mode: 'insensitive' } },
                { origin: { contains: search, mode: 'insensitive' } },
                { otherTitles: { contains: search, mode: 'insensitive' } },
            ],
        },
    } satisfies Prisma.BookWhereInput;
};

export const getQuickSearchBooksSelectInput = () => {
    return {
        id: true,
        urlId: true,
        type: true,
        title: { select: { ru: true, en: true, origin: true } },
        covers: { where: { main: true }, select: { cover: true } },
        statistic: { select: { viewCount: true, likeCount: true, bookmarkCount: true } },
    } satisfies Prisma.BookSelect;
};

const getQuickSearchBooks = async (prisma: PrismaClient) => {
    return await prisma.book.findMany({
        select: getQuickSearchBooksSelectInput(),
    });
};
type GetQuickSearchBook = Prisma.PromiseReturnType<typeof getQuickSearchBooks>[number];

export function toQuickSearchBooks<T extends string>(
    data: (GetQuickSearchBook & { type: T })[],
    lang: Lang,
): (QuickSearchBook & { type: T })[] {
    return data.map((book) => {
        return {
            id: book.id,
            urlId: book.urlId,
            title: book.title?.[lang] || book.title?.ru || '',
            type: book.type,
            cover: book.covers?.[0].cover || '',
            views: book.statistic?.viewCount || 0,
            likes: book.statistic?.likeCount || 0,
            bookmarks: book.statistic?.bookmarkCount || 0,
        };
    });
}
