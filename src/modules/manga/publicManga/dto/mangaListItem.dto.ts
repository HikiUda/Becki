import { Bookmarks, MangaStatus, MangaType } from '@prisma/client';
import { MangaListItemBaseDto } from './mangaListItemBase.dto';

export type OrderType = 'asc' | 'desc';
export type SortByType =
    | 'popularity' //TODO
    | 'rating'
    | 'views'
    | 'updateDate'
    | 'ruAlphabetically'
    | 'enAlphabetically';

export type MangaListItemDto = Pick<
    MangaListItemBaseDto,
    'id' | 'urlId' | 'title' | 'chaptersCount' | 'bookmark' | 'rate' | 'cover' | 'type'
>;

export interface MangaListQuery {
    search?: string;
    status?: MangaStatus;
    type?: MangaType;
    janres: number[];
    tags: number[];
    notJanres: number[];
    notTags: number[];
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
    // TODO bookmark
    bookmarks?: Bookmarks[];
    page: number;
    limit: number;
    order: OrderType;
    sortBy: SortByType;
}

type TypedFields = 'order' | 'sortBy' | 'type' | 'status';
export interface MangaListGetQuery
    extends Pick<MangaListQuery, TypedFields>,
        Record<Exclude<keyof MangaListQuery, TypedFields>, string | undefined> {}
