import { ChapterPagesType } from './chapterPages.scheme';

export interface ChapterDto {
    id: number;
    tome: number;
    chapter: number;
    title: string | null;
    mangaTitle: string;
    likeCount: number;
    prevChapterId: number | null;
    nextChapterId: number | null;
    isUserLiked: boolean;
    pages: ChapterPagesType;
}
