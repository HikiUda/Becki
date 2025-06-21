import { Prisma } from '@prisma/client';
import { MangaListQueryDto } from '../../dto/getMangaListQuery';

export const getOrderInput = (query: MangaListQueryDto): Prisma.MangaOrderByWithRelationInput => {
    const { sortBy, order } = query;
    const orderBy: Prisma.MangaOrderByWithRelationInput = {};
    if (sortBy === 'ruAlphabetically' || sortBy === 'enAlphabetically') {
        orderBy.title = {};
        if (sortBy === 'ruAlphabetically') orderBy.title.ru = order;
        if (sortBy === 'enAlphabetically') orderBy.title.en = order;
    }
    if (sortBy === 'rating') {
        orderBy.statistic = {};
        orderBy.statistic.rate = order;
    }
    // ? do other props
    if (sortBy === 'updateDate') {
        orderBy.updatedAt = order;
    }
    if (sortBy === 'createDate') {
        orderBy.createdAt = order;
    }
    if (sortBy === 'views') {
        orderBy.statistic = {};
        orderBy.statistic.views = order;
    }
    if (sortBy === 'likes') {
        orderBy.statistic = {};
        orderBy.statistic.likes = order;
    }
    if (sortBy === 'chapterCount') {
        orderBy.statistic = {};
        orderBy.statistic.chapterCount = order;
    }
    return orderBy;
};
