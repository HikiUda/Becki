import { Prisma } from '@prisma/client';
import { MangaListQuery } from '../../dto/mangaListItem.dto';

export const getSearchOtherTitleInput = (
    query: MangaListQuery,
): Prisma.MangaOtherTitlesListRelationFilter => {
    const { search } = query;
    if (!search) return {};
    return {
        some: { title: { contains: search, mode: 'insensitive' } },
    };
};
