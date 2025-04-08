import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { MangaListItemStatisticDto } from '../../dto/mangaListItem/mangaListItemStatistic.dto';
import { getSearchOtherTitleInput } from '../common/getSearchOtherTitleInput';
import { getSearchTitleInput } from '../common/getSearchTitleInput';

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

export const getMangaQuickSearch = async (search: string) => {
    return await prisma.manga.findMany({
        take: 6,
        where: {
            OR: [
                { otherTitles: getSearchOtherTitleInput(search) },
                { title: getSearchTitleInput(search) },
            ],
        },
        orderBy: { rate: 'desc' },
        select: MangaSelect(),
    });
};

export type getMangaQuickSearchReturnType = Prisma.PromiseReturnType<typeof getMangaQuickSearch>;

export function toMangaItemListStatisticDto(
    data: getMangaQuickSearchReturnType,
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
