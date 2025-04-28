import { EditedChapterListItemDto, EditedChapterListPagination } from '../dto/editedChapterList';

export const mockEditedChapterListItem: EditedChapterListItemDto = {
    id: 0,
    tome: 1,
    chapter: 2,
    title: null,
    createdAt: new Date(),
    private: true,
};

export const mockEditedChapterListPagination: EditedChapterListPagination = {
    data: [mockEditedChapterListItem, mockEditedChapterListItem, mockEditedChapterListItem],
    prevPage: null,
    nextPage: null,
};
