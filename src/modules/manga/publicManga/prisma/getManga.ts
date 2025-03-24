import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { MangaDto } from '../dto/manga.dto';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../../common/types/mangaTypes';
import { getJanresById } from '../../mangaJanres/prisma';
import { getTagsById } from '../../mangaTags/prisma';

export const MangaSelect = (lang: LangType): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        janres: true,
        tags: true,
        status: true,
        type: true,
        releaseDate: true,
        rate: true,
        description: { select: { ru: true, en: lang === 'en' } },
        title: { select: { ru: true, en: true, origin: true } },
        otherTitles: { select: { title: true } },
        _count: { select: { chapters: true, rating: true } },
        mangaCovers: { where: { main: true }, select: { cover: true } },
        banner: true,
        owner: { select: { id: true, name: true, avatar: true } },
        authors: { select: { name: true } },
        artists: { select: { name: true } },
        publishers: { select: { name: true } },
    };
};

export const getManga = async (id: MangaIdsType, lang: LangType) =>
    await prisma.manga.findUnique({
        where: typeof id === 'number' ? { id } : { urlId: id },
        select: MangaSelect(lang),
    });

export type getMangaReturnType = Prisma.PromiseReturnType<typeof getManga>;

export async function toMangaDto(
    data: getMangaReturnType,
    lang: LangType,
): Promise<MangaDto | null> {
    if (!data) return null;
    const manga: MangaDto = {
        id: data.id,
        urlId: data.urlId,
        title: { ru: '', en: null, origin: null },
        otherTitles: data.otherTitles.map((title) => title.title),
        description: '',
        chaptersCount: data._count.chapters,
        rate: data.rate,
        countRate: data._count.rating,
        releaseDate: data.releaseDate,
        status: data.status,
        type: data.type,
        //TODO now
        janres: [],
        tags: [],
        cover: null,
        banner: data.banner,
        owner: { id: data.owner.id, name: data.owner.name, avatar: data.owner.avatar },
        authors: data.authors.map((author) => author.name),
        artists: data.artists.map((artist) => artist.name),
        publishers: data.publishers.map((publisher) => publisher.name),
        bookmark: null,
    };
    if (data?.title)
        manga.title = { ru: data.title.ru, en: data.title.en, origin: data.title.origin };

    if (data.description)
        manga.description = data.description[lang] ? data.description[lang] : data.description.ru;

    if (data.mangaCovers.length) manga.cover = data.mangaCovers[0].cover;
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
