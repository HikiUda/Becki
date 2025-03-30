import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { LangType } from 'src/common/types/lang';
import { MangaListItemStatisticDto } from '../../dto/mangaListItemStatistic.dto';
import { getSearchOtherTitleInput } from '../common/getSearchOtherTitleInput';
import { getSearchTitleInput } from '../common/getSearchTitleInput';

const ChaptersSelect: Prisma.ChaptersSelect = {
    _count: { select: { usersView: true, usersLike: true } },
};

export const MangaSelect = (): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        type: true,
        title: { select: { ru: true, en: true, origin: true } },
        mangaCovers: { where: { main: true }, select: { cover: true } },
        _count: { select: { bookmarks: true } },
    };
};

export const getMangaQuickSearch = async (search: string) => {
    //TODO other query when search is empty
    return await prisma.manga.findMany({
        take: 6,
        where: {
            OR: [
                { otherTitles: getSearchOtherTitleInput(search) },
                { title: getSearchTitleInput(search) },
            ],
        },
        select: { ...MangaSelect(), chapters: { select: ChaptersSelect } },
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
            views: mangaData.chapters.reduce((acc, chapter) => acc + chapter._count.usersView, 0),
            likes: mangaData.chapters.reduce((acc, chapter) => acc + chapter._count.usersLike, 0),
            bookmarks: mangaData._count.bookmarks,
        };
        if (mangaData?.title)
            manga.title = mangaData.title[lang] ? mangaData.title[lang] : mangaData.title.ru;

        if (mangaData.mangaCovers.length) manga.cover = mangaData.mangaCovers[0].cover;

        return manga;
    });
}
