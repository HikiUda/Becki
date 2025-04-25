import { ChapterListItemDto, ChapterListPagination } from '../dto/chapterList/chapterListItem.dto';

export const mockChapterListItem: ChapterListItemDto = {
    id: 0,
    tome: 1,
    chapter: 2,
    title: null,
    createdAt: new Date(),
    isUserViewed: false,
};

export const mockChapterListPagination: ChapterListPagination = {
    data: [mockChapterListItem, mockChapterListItem, mockChapterListItem],
    prevPage: null,
    nextPage: null,
};
