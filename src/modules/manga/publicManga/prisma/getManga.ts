import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { MangaDto } from '../dto/manga.dto';
import { LangType } from 'src/common/types/lang';
import { MangaIdsType } from '../../common/types/mangaTypes';

export const MangaSelect = (lang: LangType): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        status: true,
        type: true,
        releaseDate: true,
        rate: true,
        description: { select: { ru: true, en: lang === 'en' } },
        titles: { where: { main: true }, select: { ru: true, en: true } },
        _count: { select: { chapters: true, rating: true } },
        janres: { select: { ru: true, en: lang === 'en' } },
        tags: { select: { ru: true, en: lang === 'en' } },
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

export function toMangaDto(data: getMangaReturnType, lang: LangType): MangaDto | null {
    if (!data) return null;
    const manga: MangaDto = {
        id: data.id,
        urlId: data.urlId,
        title: { ru: '', en: '' },
        description: '',
        chaptersCount: data._count.chapters,
        rate: data.rate,
        countRate: data._count.rating,
        releaseDate: data.releaseDate,
        status: data.status,
        type: data.type,
        janres: data.janres.map((janre) => (janre[lang] ? janre[lang] : janre.ru)),
        tags: data.tags.map((tag) => (tag[lang] ? tag[lang] : tag.ru)),
        cover: null,
        banner: data.banner,
        owner: { id: data.owner.id, name: data.owner.name, avatar: data.owner.avatar },
        authors: data.authors.map((author) => author.name),
        artists: data.artists.map((artist) => artist.name),
        publishers: data.publishers.map((publisher) => publisher.name),
        bookmark: null,
    };
    if (data?.titles.length) manga.title = data.titles[0];

    if (data.description)
        manga.description = data.description[lang] ? data.description[lang] : data.description.ru;

    if (data.mangaCovers.length) manga.cover = data.mangaCovers[0].cover;

    return manga;
}
