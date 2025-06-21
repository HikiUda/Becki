import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { getGenresById } from 'src/modules/manga/mangaCategories';
import { getTagsById } from 'src/modules/manga/mangaCategories';

const EditedMangaInclude = (): Prisma.MangaInclude => {
    return {
        otherTitles: true,
        title: true,
        description: true,
        covers: true,
        authors: true,
        artists: true,
        publishers: true,
    };
};

export const getEditedManga = async (id: number) =>
    await prisma.manga.findUnique({
        where: { id },
        include: EditedMangaInclude(),
    });

export type getEditedMangaReturnType = Prisma.PromiseReturnType<typeof getEditedManga>;

export async function toEditedMangaDto(
    data: getEditedMangaReturnType,
    lang: LangType,
): Promise<EditedMangaDto | null> {
    if (!data) return null;
    const manga: EditedMangaDto = {
        id: data.id,
        urlId: data.urlId,
        title: { ru: '', en: null, origin: null },
        otherTitles: data.otherTitles.map((title) => ({
            id: title.id,
            title: title.title,
        })),
        description: { ru: '', en: '' },
        releaseDate: data.releaseDate,
        status: data.status,
        type: data.type,
        genres: [],
        tags: [],
        covers: data.covers.map((mangaCover) => ({
            id: mangaCover.id,
            cover: mangaCover.cover,
            main: mangaCover.main,
        })),
        banner: data.banner,
        ageRate: data.ageRate,
        authors: data.authors.map((author) => ({ id: author.id, name: author.name })),
        artists: data.artists.map((artist) => ({ id: artist.id, name: artist.name })),
        publishers: data.publishers.map((publisher) => ({
            id: publisher.id,
            name: publisher.name,
        })),
    };
    if (data.description) manga.description = { ru: data.description.ru, en: data.description.en };
    if (data.title)
        manga.title = { ru: data.title.ru, en: data.title.en, origin: data.title.origin };
    if (data.genres.length) {
        manga.genres = (await getGenresById(data.genres)).map((genre) => ({
            id: genre.id,
            title: genre[lang] || genre.ru,
        }));
    }
    if (data.tags.length) {
        manga.tags = (await getTagsById(data.tags)).map((tag) => ({
            id: tag.id,
            title: tag[lang] || tag.ru,
        }));
    }
    return manga;
}
