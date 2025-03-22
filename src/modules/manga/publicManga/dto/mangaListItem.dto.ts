import { Bookmarks, MangaStatus, MangaType } from '@prisma/client';

export interface MangaListItemDto {
    id: number;
    urlId: string;
    title: string;
    description: string;
    chaptersCount: number;
    rate: number;
    type: MangaType;
    cover: string | null;
    bookmark: Bookmarks | null;
}

export interface MangaListQuery {
    search?: string;
    status?: MangaStatus;
    type?: MangaType;
    janres: string[];
    tags: string[];
    order: 'desc' | 'asc';
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
