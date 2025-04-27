import { ChapterPagesDto } from 'src/modules/manga/editChapter';

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
    isUserViewed: boolean;
    pages: ChapterPagesDto;
}
