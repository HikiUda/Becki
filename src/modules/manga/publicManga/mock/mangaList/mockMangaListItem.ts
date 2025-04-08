import {
    MangaListItemDto,
    MangaListItemPagination,
} from '../../dto/mangaListItem/mangaListItem.dto';

export const mockMangaListItemContinueRead: MangaListItemDto = {
    id: 1,
    urlId: 'same-manga---1234',
    title: 'Manga Title',
    cover: 'http://wrong-way.com',
    chapterCount: 45,
    bookmark: null,
    rate: 10,
    type: 'Manga',
};

export const mockMangaListItemArray: MangaListItemPagination = {
    data: Array(3).fill(mockMangaListItemContinueRead),
    prevPage: null,
    nextPage: null,
};
