import { Pagination } from 'src/common/types/pagination';

export interface ChapterListItemDto {
    id: number;
    tome: number;
    chapter: number;
    title: string | null;
    createdAt: Date;
    isUserViewed: boolean;
}

export type ChapterListPagination = Pagination<ChapterListItemDto>;
