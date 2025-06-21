import { prisma } from 'src/shared/prisma/prisma';
import { MangaListQueryDto } from '../../dto/getMangaListQuery/getMangaListQuery.dto';
import { Prisma } from '@prisma/client';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { getOrderInput } from './getOrderInput';
import { getMangaListWhereInput } from './getMangaListWhereInput';

export const MangaListSelect = (lang: LangType, userId?: number): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        type: true,
        title: { select: { ru: true, en: lang === 'en' } },
        statistic: { select: { chapterCount: true, rate: true } },
        bookmarks: !!userId && { where: { userId }, select: { bookmark: true } },
        covers: { where: { main: true }, select: { cover: true } },
    };
};

export const getMangaList = async (query: MangaListQueryDto, userId?: number) => {
    const { limit, page } = query;
    const skip = limit * (page - 1);

    return await prisma.manga.findMany({
        take: limit,
        skip,
        orderBy: getOrderInput(query),
        where: getMangaListWhereInput(query, userId),
        select: MangaListSelect(query.lang, userId),
    });
};

export type getMangaListReturnType = Prisma.PromiseReturnType<typeof getMangaList>;
