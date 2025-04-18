import { Bookmarks, MangaType } from '@prisma/client';

export interface MangaListItemBaseDto {
    id: number;
    urlId: string;
    title: string;
    rate: number;
    type: MangaType;
    cover: string;
    views: number;
    likes: number;
    bookmarks: number;
    //TODO bookmark
    bookmark: Bookmarks | null;
    tome: number;
    chapter: number;
    chapterCreatedAt: Date;
    chapterCount: number;
    readedChapters: number;
}
