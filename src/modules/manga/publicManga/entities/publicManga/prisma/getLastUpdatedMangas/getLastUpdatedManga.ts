import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { MangaListItemLastUpdatedDto } from '../../../../dto/mangaListItemLastUpdated.dto';
import {
    MangaListItemLastUpdatedQueryDto,
    MangaListItemLastUpdatedScope,
} from '../../dto/lastUpdatedMangaQuery.dto';
import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';

const getLastUpdatedMangasSelect = (): Prisma.ChaptersSelect => {
    return {
        tome: true,
        chapter: true,
        createdAt: true,
        id: true,
    };
};
const getLastUpdatedMangasSelectManga = (lang: LangType): Prisma.MangaSelect => {
    return {
        covers: { where: { main: true }, select: { cover: true } },
        title: { select: { ru: true, en: lang === 'en' } },
        id: true,
        urlId: true,
        type: true,
    };
};

export const getLastUpdatedMangasWhereInput = (
    scope: MangaListItemLastUpdatedScope,
    userId?: number,
): Prisma.ChaptersWhereInput => {
    if (scope === 'popular') {
        return { manga: { statistic: { rate: { gte: 9 } } } };
    }
    if (scope === 'my' && userId) {
        return {
            manga: { bookmarks: { some: { userId, bookmark: { in: ['Reading', 'Readed'] } } } },
        };
    }

    return {};
};

export const getLastUpdatedMangas = async (
    query: MangaListItemLastUpdatedQueryDto,
    userId?: number,
) => {
    const { scope, lang, limit, page } = query;
    const skip = limit * (page - 1);
    return await prisma.chapters.findMany({
        orderBy: { createdAt: 'desc' },
        where: getLastUpdatedMangasWhereInput(scope, userId),
        select: {
            ...getLastUpdatedMangasSelect(),
            manga: { select: getLastUpdatedMangasSelectManga(lang) },
        },
        distinct: scope === 'popular' ? ['mangaId'] : undefined,
        skip,
        take: limit,
    });
};

export type GetLastUpdatedMangasReturnType = Prisma.PromiseReturnType<typeof getLastUpdatedMangas>;

export function toMangaListItemLastUpdatedDto(
    data: GetLastUpdatedMangasReturnType,
    lang: LangType,
): MangaListItemLastUpdatedDto[] {
    return data.map((mangaData) => {
        const manga: MangaListItemLastUpdatedDto = {
            id: mangaData.manga.id,
            urlId: mangaData.manga.urlId,
            title: '',
            cover: mangaData.manga.covers[0]?.cover || '',
            type: mangaData.manga.type,
            tome: mangaData.tome,
            chapter: mangaData.chapter,
            chapterCreatedAt: mangaData.createdAt,
            chapterId: mangaData.id,
        };
        if (mangaData.manga.title) {
            manga.title = mangaData.manga.title[lang]
                ? mangaData.manga.title[lang]
                : mangaData.manga.title.ru;
        }

        return manga;
    });
}
