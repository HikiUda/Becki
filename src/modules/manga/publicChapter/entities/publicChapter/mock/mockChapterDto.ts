import { ChapterDto } from '../dto/chapter.dto';

export const mockChapterDto: ChapterDto = {
    id: 2,
    tome: 1,
    chapter: 2,
    title: 'chapter title',
    mangaTitle: 'Manga Title',
    likeCount: 100,
    prevChapterId: 1,
    nextChapterId: 3,
    pages: {
        pageCount: 1,
        pages: [{ page: 1, src: 'http://wrong-way.com' }],
    },
    isUserLiked: false,
};
