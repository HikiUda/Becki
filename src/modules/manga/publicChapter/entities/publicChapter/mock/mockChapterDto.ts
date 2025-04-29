import { ChapterDto } from '../dto/chapter.dto';

export const mockChapterDto: ChapterDto = {
    id: 2,
    tome: 1,
    chapter: 2,
    title: 'chapter title',
    mangaTitle: 'Manga Title',
    likeCount: 100,
    pages: {
        pageCount: 1,
        pages: [{ src: 'pass/pass/pass.jpg', type: 'image' }],
    },
    isUserLiked: false,
    isUserViewed: false,
    prevChapterId: 1,
    nextChapterId: 3,
};
