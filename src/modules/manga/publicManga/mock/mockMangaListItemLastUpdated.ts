import {
    MangaListItemLastUpdatedDto,
    MangaListItemLastUpdatedPagination,
} from '../dto/mangaListItemLastUpdated.dto';

export const mockMangaListItemLastUpdated: MangaListItemLastUpdatedDto = {
    id: 1,
    urlId: 'some-manga---1234',
    title: 'Manga title',
    type: 'Manga',
    cover: 'http://wrong-way.com',
    tome: 1,
    chapter: 2,
    chapterCreatedAt: new Date(),
};

export const mockMangaListItemLastUpdatedArray: MangaListItemLastUpdatedPagination = {
    data: Array(3).fill(mockMangaListItemLastUpdated),
    prevPage: null,
    nextPage: null,
};
