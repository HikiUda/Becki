import {
    MangaListItemStatisticDto,
    MangaListItemStatisticResponseArrayData,
} from '../dto/mangaListItemStatistic.dto';

export const mockMangaListItemStatistic: MangaListItemStatisticDto = {
    id: 1,
    urlId: 'some-manga---1234',
    title: 'Manga title',
    type: 'Manga',
    cover: 'http://wrong-way.com',
    views: 100,
    likes: 10,
    bookmarks: 1,
};

export const mockMangaListItemStatisticArray: MangaListItemStatisticResponseArrayData = {
    data: Array(3).fill(mockMangaListItemStatistic),
};
