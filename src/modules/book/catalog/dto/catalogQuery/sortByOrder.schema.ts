import { z } from 'zod';

export const SortByEnum = z.enum([
    'rating',
    'updateDate',
    'createDate',
    'ruAlphabetically',
    'enAlphabetically',
    'views',
    'likes',
    'chapterCount',
]);
export type SortByType = z.infer<typeof SortByEnum>;

export const OrderEnum = z.enum(['asc', 'desc']);
export type OrderType = z.infer<typeof OrderEnum>;
