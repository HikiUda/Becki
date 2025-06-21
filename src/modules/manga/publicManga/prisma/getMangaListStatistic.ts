import { Prisma } from '@prisma/client';
import { MangaListItemStatisticDto } from '../dto/mangaListItemStatistic.dto';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { prisma } from 'src/shared/prisma/prisma';

export const MangaSelect = (): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        type: true,
        title: { select: { ru: true, en: true, origin: true } },
        covers: { where: { main: true }, select: { cover: true } },
        statistic: { select: { views: true, likes: true } },
        _count: { select: { bookmarks: true } },
    };
};

export const getMangaListStatistic = async (args: Prisma.MangaFindManyArgs = {}) => {
    return await prisma.manga.findMany({
        ...args,
        select: MangaSelect(),
    });
};

export type GetMangaListStatisticReturnType = Prisma.PromiseReturnType<
    typeof getMangaListStatistic
>;

export function toMangaListStatisticDto(
    data: GetMangaListStatisticReturnType,
    lang: LangType,
): MangaListItemStatisticDto[] {
    return data.map((mangaData) => {
        const manga: MangaListItemStatisticDto = {
            id: mangaData.id,
            urlId: mangaData.urlId,
            title: '',
            type: mangaData.type,
            cover: '',
            views: mangaData.statistic?.views || 0,
            likes: mangaData.statistic?.likes || 0,
            bookmarks: mangaData._count.bookmarks,
        };
        if (mangaData?.title)
            manga.title = mangaData.title[lang] ? mangaData.title[lang] : mangaData.title.ru;

        if (mangaData.covers.length) manga.cover = mangaData.covers[0].cover;

        return manga;
    });
}
