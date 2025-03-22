import { prisma } from 'src/common/helpers/prisma';
import { MangaListQuery } from '../dto/mangaListItem.dto';
import { Prisma } from '@prisma/client';

function getSearchInput(query: MangaListQuery): Prisma.MangaTitlesListRelationFilter {
    const { search } = query;
    if (!search) return {};
    return { some: { OR: [{ ru: { contains: search } }, { en: { contains: search } }] } };
}

function getFindManyMangaArgs(query: MangaListQuery): Prisma.MangaFindManyArgs {
    const { limit, page } = query;
    return { take: limit, skip: limit * page, where: { titles: getSearchInput(query) } };
}

export const getMangaList = async (query: MangaListQuery) => {
    return await prisma.manga.findMany(getFindManyMangaArgs(query));
};
