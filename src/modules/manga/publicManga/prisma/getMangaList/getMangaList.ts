import { prisma } from 'src/common/helpers/prisma';
import { MangaListQueryDto } from '../../dto/publicManga/getMangaListQuery/getMangaListQuery.dto';
import { Prisma } from '@prisma/client';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { getOrderInput } from './getOrderInput';
import { getMangaListWhereInput } from './getMangaListWhereInput';

export const MangaListSelect = (lang: LangType, userId?: number): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        type: true,
        rate: true,
        title: { select: { ru: true, en: lang === 'en' } },
        mangaStatistic: { select: { chapterCount: true } },
        bookmarks: { where: { userId }, select: { bookmark: true } },
        mangaCovers: { where: { main: true }, select: { cover: true } },
    };
};

export const getMangaList = async (query: MangaListQueryDto, userId?: number) => {
    const { limit, page } = query;
    const skip = limit * (page - 1);

    return await prisma.manga.findMany({
        take: limit,
        skip,
        orderBy: getOrderInput(query),
        where: getMangaListWhereInput(query),
        select: MangaListSelect(query.lang, userId),
    });
};

export type getMangaListReturnType = Prisma.PromiseReturnType<typeof getMangaList>;
