import { Prisma, PrismaClient } from '@prisma/client';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { QuickSearchMangaDto } from '../dto/quickSearchManga';

export const getQuickSearchManga = async (
    prisma: PrismaClient,
    props: { search: string; limit: number },
) => {
    const { search, limit } = props;
    return await prisma.manga.findMany({
        take: limit,
        where: {
            OR: [
                { otherTitles: { some: { title: { contains: search, mode: 'insensitive' } } } },
                {
                    title: {
                        OR: [
                            { ru: { contains: search, mode: 'insensitive' } },
                            { en: { contains: search, mode: 'insensitive' } },
                            { origin: { contains: search, mode: 'insensitive' } },
                        ],
                    },
                },
            ],
        },
        orderBy: { statistic: { rate: 'desc' } },
        select: {
            id: true,
            urlId: true,
            type: true,
            title: { select: { ru: true, en: true, origin: true } },
            covers: { where: { main: true }, select: { cover: true } },
            statistic: { select: { views: true, likes: true } },
            _count: { select: { bookmarks: true } },
        },
    });
};

export type GetQuickSearchMangaReturnType = Prisma.PromiseReturnType<typeof getQuickSearchManga>;

export function toQuickSearchMangaDto(
    data: GetQuickSearchMangaReturnType,
    lang: LangType,
): QuickSearchMangaDto[] {
    return data.map((mangaData) => {
        const manga: QuickSearchMangaDto = {
            id: mangaData.id,
            urlId: mangaData.urlId,
            title: '',
            type: mangaData.type,
            cover: '',
            views: mangaData.statistic?.views || 0,
            likes: mangaData.statistic?.likes || 0,
            // TODO add field "bookmarkCount" in mangaStatistic
            bookmarks: mangaData._count.bookmarks,
        };
        if (mangaData?.title) manga.title = mangaData.title[lang] || mangaData.title.ru;

        if (mangaData.covers.length) manga.cover = mangaData.covers[0].cover;

        return manga;
    });
}
