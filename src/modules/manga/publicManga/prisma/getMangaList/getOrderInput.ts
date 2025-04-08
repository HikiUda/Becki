import { Prisma } from '@prisma/client';
import { MangaListQueryDto } from '../../dto/publicManga/getMangaListQuery';

export const getOrderInput = (query: MangaListQueryDto): Prisma.MangaOrderByWithRelationInput => {
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
    if (sortBy === 'views') {
        orderBy.mangaStatistic = {};
        orderBy.mangaStatistic.views = order;
    }
    if (sortBy === 'likes') {
        orderBy.mangaStatistic = {};
        orderBy.mangaStatistic.likes = order;
    }
    if (sortBy === 'chapterCount') {
        orderBy.mangaStatistic = {};
        orderBy.mangaStatistic.chapterCount = order;
    }
    return orderBy;
};
