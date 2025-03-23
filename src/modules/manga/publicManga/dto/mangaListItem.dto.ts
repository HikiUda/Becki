import { Bookmarks, MangaStatus, MangaType } from '@prisma/client';

export type OrderType = 'asc' | 'desc';
export type SortByType =
    | 'popularity' //TODO
    | 'rating'
    | 'views'
    | 'updateDate'
    | 'ruAlphabetically'
    | 'enAlphabetically';

export interface MangaListItemDto {
    id: number;
    urlId: string;
    title: string;
    chaptersCount: number;
    rate: number;
    type: MangaType;
    cover: string | null;
    //TODO bookmark
    bookmark: Bookmarks | null;
}

export interface MangaListQuery {
    search?: string;
    status?: MangaStatus;
    type?: MangaType;
    janres: string[];
    tags: string[];
    order: OrderType;
    sortBy: SortByType;
    chapterCountFrom?: number;
    chapterCountTo?: number;
    releaseDateFrom?: Date;
    releaseDateTo?: Date;
    rateFrom?: number;
    rateTo?: number;
    rateCountFrom?: number;
    rateCountTo?: number;
    ageRateFrom?: number;
    ageRateTo?: number;
    bookmarks?: Bookmarks[];
    page: number;
    limit: number;
}

export interface MangaListGetQuery extends Omit<Partial<MangaListQuery>, 'janres' | 'tags'> {
    janres: string;
    tags: string;
}
