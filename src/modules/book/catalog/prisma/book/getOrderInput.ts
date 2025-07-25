import { Prisma } from '@prisma/client';
import { OrderType, SortByType } from '../../dto/catalogQuery/sortByOrder.schema';

type OrderBy = Prisma.BookOrderByWithRelationInput;

export const getOrderInput = ({ sortBy, order }: { sortBy: SortByType; order: OrderType }) => {
    if (sortBy === 'alphabetically') return { title: { main: order } } satisfies OrderBy;
    if (sortBy === 'enAlphabetically') return { title: { en: order } } satisfies OrderBy;
    if (sortBy === 'rating') return { statistic: { rate: order } } satisfies OrderBy;
    if (sortBy === 'views') return { statistic: { viewCount: order } } satisfies OrderBy;
    if (sortBy === 'likes') return { statistic: { likeCount: order } } satisfies OrderBy;
    if (sortBy === 'chapterCount') return { statistic: { chapterCount: order } } satisfies OrderBy;
    if (sortBy === 'updateDate') return { updatedAt: order } satisfies OrderBy;
    if (sortBy === 'createDate') return { createdAt: order } satisfies OrderBy;
    return {};
};
