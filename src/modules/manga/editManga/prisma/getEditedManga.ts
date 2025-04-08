import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { getJanresById } from '../../mangaJanres/prisma';
import { getTagsById } from '../../mangaTags/prisma';

const EditedMangaInclude = (): Prisma.MangaInclude => {
    return {
        otherTitles: true,
        title: true,
        description: true,
        mangaCovers: true,
        authors: true,
        artists: true,
        publishers: true,
    };
};

export const getEditedManga = async (id: MangaIdsType, lang: LangType) =>
    await prisma.manga.findUnique({
        where: typeof id === 'number' ? { id } : { urlId: id },
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
        janres: [],
        tags: [],
        covers: data.mangaCovers.map((mangaCover) => ({
            id: mangaCover.id,
            cover: mangaCover.cover,
        })),
        banner: data.banner,
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
    if (data.janres.length) {
        manga.janres = (await getJanresById(data.janres)).map((janre) => ({
            id: janre.id,
            title: janre[lang] ? janre[lang] : janre.ru,
        }));
    }
    if (data.tags.length) {
        manga.tags = (await getTagsById(data.tags)).map((tag) => ({
            id: tag.id,
            title: tag[lang] ? tag[lang] : tag.ru,
        }));
    }
    return manga;
}
