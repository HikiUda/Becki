import { Prisma } from '@prisma/client';
import { MangaListItemStatisticDto } from '../dto/mangaListItemStatistic.dto';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { prisma } from 'src/common/helpers/prisma';

export const MangaSelect = (): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        type: true,
        title: { select: { ru: true, en: true, origin: true } },
        mangaCovers: { where: { main: true }, select: { cover: true } },
        mangaStatistic: { select: { views: true, likes: true } },
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
            views: mangaData.mangaStatistic?.views || 0,
            likes: mangaData.mangaStatistic?.likes || 0,
            bookmarks: mangaData._count.bookmarks,
        };
        if (mangaData?.title)
            manga.title = mangaData.title[lang] ? mangaData.title[lang] : mangaData.title.ru;

        if (mangaData.mangaCovers.length) manga.cover = mangaData.mangaCovers[0].cover;

        return manga;
    });
}
