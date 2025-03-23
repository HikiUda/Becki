import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { LangType } from 'src/common/types/lang';
import { EditedMangaDto } from '../dto/editedmanga.dto';
import { MangaIdsType } from '../../common/types/mangaTypes';

const EditedMangaInclude = (lang: LangType): Prisma.MangaInclude => {
    return {
        otherTitles: true,
        title: true,
        description: true,
        janres: { select: { id: true, ru: true, en: lang === 'en' } },
        tags: { select: { id: true, ru: true, en: lang === 'en' } },
        mangaCovers: true,
        authors: true,
        artists: true,
        publishers: true,
    };
};

export const getEditedManga = async (id: MangaIdsType, lang: LangType) =>
    await prisma.manga.findUnique({
        where: typeof id === 'number' ? { id } : { urlId: id },
        include: EditedMangaInclude(lang),
    });

export type getEditedMangaReturnType = Prisma.PromiseReturnType<typeof getEditedManga>;

export function toEditedMangaDto(
    data: getEditedMangaReturnType,
    lang: LangType,
): EditedMangaDto | null {
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
        janres: data.janres.map((janre) => ({
            id: janre.id,
            title: janre[lang] ? janre[lang] : janre.ru,
        })),
        tags: data.tags.map((tag) => ({ id: tag.id, title: tag[lang] ? tag[lang] : tag.ru })),
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
    return manga;
}
