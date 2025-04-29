import { ChapterPagesDto, ChapterPageType } from '../dto/chapterPages.scheme';

export const mockChapterPage: ChapterPageType = {
    src: 'pass/pass/pass.jpg',
    type: 'image',
};

export const mockChapterPages: ChapterPagesDto = {
    pageCount: 3,
    pages: [mockChapterPage, mockChapterPage, { ...mockChapterPage, type: 'rive' }],
};
