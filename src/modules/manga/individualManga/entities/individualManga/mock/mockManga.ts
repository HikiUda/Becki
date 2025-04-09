import { MangaDto } from '../dto/manga.dto';

export const mockManga: MangaDto = {
    id: 1,
    urlId: 'some-url-id---123',
    title: { ru: 'ru-Title', en: 'en-Title', origin: 'original-Title' },
    otherTitles: ['Другое название', 'otherTitle2', 'otherTitle3'],
    description: 'some manga description',
    chaptersCount: 45,
    rate: 9.8,
    countRate: 201,
    releaseDate: new Date(),
    status: 'Ongoing',
    type: 'Manga',
    genres: [
        { id: 1, title: 'Horror' },
        { id: 2, title: 'Романтика' },
    ],
    tags: [{ id: 1, title: 'Магия' }],
    cover: 'http://wrong-way.com',
    banner: 'http://wrong-way.com',
    owner: {
        id: 1,
        name: 'wendsew',
        avatar: 'http://wrong-way.com',
    },
    authors: ['wendsew'],
    artists: ['wendsew'],
    publishers: ['HikiUda'],
    bookmark: null,
};
