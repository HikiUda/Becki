import {
    MangaListItemContinueReadDto,
    MangaListItemContinueReadResponseArrayData,
} from '../dto/mangaListItemContinueRead.dto';

export const mockMangaListItemContinueRead: MangaListItemContinueReadDto = {
    id: 1,
    urlId: 'same-manga---1234',
    title: 'Manga Title',
    chapter: 5,
    chapterCount: 88,
    tome: 1,
    readedChapters: 5,
    cover: 'http://wrong-way.com',
};

export const mockMangaListItemContinueReadArray: MangaListItemContinueReadResponseArrayData = {
    data: Array(3).fill(mockMangaListItemContinueRead),
};
