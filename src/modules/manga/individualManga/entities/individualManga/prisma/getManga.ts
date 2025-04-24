import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { getGenresById } from 'src/modules/manga/mangaCategories';
import { getTagsById } from 'src/modules/manga/mangaCategories';
import { MangaDto } from '../dto/manga.dto';

export const MangaSelect = (lang: LangType, userId?: number): Prisma.MangaSelect => {
    return {
        id: true,
        urlId: true,
        genres: true,
        tags: true,
        status: true,
        type: true,
        releaseDate: true,
        description: { select: { ru: true, en: lang === 'en' } },
        title: { select: { ru: true, en: true, origin: true } },
        otherTitles: { select: { title: true } },
        mangaStatistic: { select: { chapterCount: true, rateCount: true, rate: true } },
        mangaCovers: { where: { main: true }, select: { cover: true } },
        banner: true,
        owner: { select: { id: true, name: true, avatar: true } },
        authors: { select: { name: true } },
        artists: { select: { name: true } },
        publishers: { select: { name: true } },
        bookmarks: !!userId && { where: { userId }, select: { bookmark: true } },
    };
};

export const getManga = async (id: number, lang: LangType, userId?: number) => {
    const data = await prisma.manga.findUnique({
        where: { id },
        select: MangaSelect(lang, userId),
    });
    return data;
};

export type GetMangaReturnType = Prisma.PromiseReturnType<typeof getManga>;

export async function toMangaDto(
    data: GetMangaReturnType,
    lang: LangType,
): Promise<MangaDto | null> {
    if (!data) return null;
    const manga: MangaDto = {
        id: data.id,
        urlId: data.urlId,
        title: { ru: '', en: null, origin: null },
        otherTitles: data.otherTitles.map((title) => title.title),
        description: '',
        chaptersCount: data.mangaStatistic?.chapterCount || 0,
        rate: data.mangaStatistic?.rate || 0,
        countRate: data.mangaStatistic?.rateCount || 0,
        releaseDate: data.releaseDate,
        status: data.status,
        type: data.type,
        genres: [],
        tags: [],
        cover: null,
        banner: data.banner,
        owner: { id: data.owner.id, name: data.owner.name, avatar: data.owner.avatar },
        authors: data.authors.map((author) => author.name),
        artists: data.artists.map((artist) => artist.name),
        publishers: data.publishers.map((publisher) => publisher.name),
        bookmark: (data.bookmarks && data.bookmarks[0]?.bookmark) || null,
    };
    if (data?.title)
        manga.title = { ru: data.title.ru, en: data.title.en, origin: data.title.origin };

    if (data.description)
        manga.description = data.description[lang] ? data.description[lang] : data.description.ru;

    if (data.mangaCovers.length) manga.cover = data.mangaCovers[0].cover;
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
