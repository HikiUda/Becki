import { Prisma } from '@prisma/client';
import { MangaListQuery } from '../../dto/mangaListItem/mangaListItem.dto';

export const getOrderInput = (query: MangaListQuery): Prisma.MangaOrderByWithRelationInput => {
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

    //TODO by view and popularity
    return orderBy;
};
