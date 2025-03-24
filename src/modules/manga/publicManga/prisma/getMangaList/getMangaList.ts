import { prisma } from 'src/common/helpers/prisma';
import { MangaListQuery } from '../../dto/mangaListItem.dto';
import { Prisma } from '@prisma/client';
import { LangType } from 'src/common/types/lang';
import { getOrderInput } from './getOrderInput';
import { getMangaListWhereInput } from './getMangaListWhereInput';

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

export const getMangaList = async (query: MangaListQuery, lang: LangType) => {
    const { limit, page } = query;
    const skip = limit * (page - 1);

    return await prisma.manga.findMany({
        take: limit,
        skip,
        orderBy: getOrderInput(query),
        where: getMangaListWhereInput(query),
        select: MangaListSelect(lang),
    });
};

export type getMangaListReturnType = Prisma.PromiseReturnType<typeof getMangaList>;
