import { prisma } from 'src/common/helpers/prisma';
import { MangaListItemDto, MangaListQuery } from '../dto/mangaListItem.dto';
import { Prisma } from '@prisma/client';
import { LangType } from 'src/common/types/lang';

export const MangaListSelect = (lang: LangType): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        type: true,
        rate: true,
        title: { select: { ru: true, en: lang === 'en' } },
        _count: { select: { chapters: true } },
        mangaCovers: { where: { main: true }, select: { cover: true } },
    };
};

const getSearchOtherTitleInput = (
    query: MangaListQuery,
): Prisma.MangaOtherTitlesListRelationFilter => {
    const { search } = query;
    if (!search) return {};
    return {
        some: { title: { contains: search, mode: 'insensitive' } },
    };
};
const getSearchTitleInput = (query: MangaListQuery): Prisma.MangaTitleWhereInput => {
    const { search } = query;
    if (!search) return {};
    return {
        OR: [
            { ru: { contains: search, mode: 'insensitive' } },
            { en: { contains: search, mode: 'insensitive' } },
            { origin: { contains: search, mode: 'insensitive' } },
        ],
    };
};

const getOrderInput = (query: MangaListQuery): Prisma.MangaOrderByWithRelationInput => {
    const { sortBy, order } = query;
    const orderBy: Prisma.MangaOrderByWithRelationInput = {};
    if (sortBy === 'ruAlphabetically' || sortBy === 'enAlphabetically') {
        orderBy.title = {};
        if (sortBy === 'ruAlphabetically') orderBy.title.ru = order;
        if (sortBy === 'enAlphabetically') orderBy.title.en = order;
    }

    if (sortBy === 'rating') {
        orderBy.rate = order;
    }
    if (sortBy === 'updateDate') {
        orderBy.updatedAt = order;
    }

    return orderBy;
};

export const getMangaList = async (query: MangaListQuery, lang: LangType) => {
    const { limit, page } = query;
    const skip = limit * (page - 1);
    return await prisma.manga.findMany({
        take: limit,
        skip,
        orderBy: getOrderInput(query),
        where: { otherTitles: getSearchOtherTitleInput(query), title: getSearchTitleInput(query) },
        select: MangaListSelect(lang),
    });
};

export type getMangaListReturnType = Prisma.PromiseReturnType<typeof getMangaList>;

export function toMangaListItemDto(
    data: getMangaListReturnType,
    lang: LangType,
): MangaListItemDto[] {
    return data.map((mangaData) => {
        const manga: MangaListItemDto = {
            id: mangaData.id,
            urlId: mangaData.urlId,
            title: '',
            chaptersCount: mangaData._count.chapters,
            rate: mangaData.rate,
            type: mangaData.type,
            cover: null,
            bookmark: null,
        };
        if (mangaData.title) manga.title = mangaData.title[lang] || mangaData.title.ru;
        if (mangaData.mangaCovers.length) manga.cover = mangaData.mangaCovers[0].cover;
        return manga;
    });
}
