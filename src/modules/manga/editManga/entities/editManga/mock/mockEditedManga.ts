import { EditedMangaDto } from '../dto/editedmanga.dto';

export const mockEditedManga: EditedMangaDto = {
    id: 0,
    urlId: 'some-url-id---0',
    title: { ru: 'undefined', en: null, origin: null },
    otherTitles: [{ id: 1, title: 'title1' }],
    description: { ru: 'description', en: null },
    releaseDate: null,
    status: 'Ongoing',
    type: 'Manga',
    genres: [{ id: 1, title: 'Horror' }],
    tags: [{ id: 1, title: 'Magic' }],
    covers: [{ id: 1, cover: 'http://wrong-way.com', main: true }],
    banner: 'http://wrong-way.com',
    ageRate: 0,
    authors: [{ id: 1, name: 'author' }],
    artists: [{ id: 1, name: 'artist' }],
    publishers: [{ id: 1, name: 'publisher' }],
};
