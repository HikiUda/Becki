import { Prisma } from '@prisma/client';
import { MangaListQuery } from '../../dto/mangaListItem.dto';

export const getSearchTitleInput = (query: MangaListQuery): Prisma.MangaTitleWhereInput => {
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
