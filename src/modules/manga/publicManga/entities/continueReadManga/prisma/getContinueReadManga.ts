import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { MangaListItemContinueReadDto } from '../../../dto/mangaListItemContinueRead.dto';

export const getContinueReadManga = async (userId: number, lang: LangType) => {
    const data = await prisma.progressReadManga.findMany({
        where: { userId, show: true },
        orderBy: { updatedAt: 'desc' },
        take: 10,
        select: {
            manga: {
                select: {
                    id: true,
                    urlId: true,
                    title: { select: { ru: true, en: lang === 'en' } },
                    covers: { where: { main: true }, select: { cover: true } },
                    statistic: { select: { chapterCount: true } },
                },
            },
            lastChapter: { select: { chapter: true, tome: true, id: true } },
        },
    });
    return data;
};

export type GetContinueReadMangaReturnType = Prisma.PromiseReturnType<typeof getContinueReadManga>;

export async function toMangaListItemContinueReadDto(
    data: GetContinueReadMangaReturnType,
    lang: LangType,
): Promise<MangaListItemContinueReadDto[]> {
    return await Promise.all(
        data.map(async (mangaData) => {
            const manga: MangaListItemContinueReadDto = {
                id: mangaData.manga.id,
                urlId: mangaData.manga.urlId,
                title: '',
                cover: mangaData.manga.covers[0]?.cover || '',
                tome: mangaData.lastChapter.tome,
                chapter: mangaData.lastChapter.chapter,
                chapterCount: mangaData.manga.statistic?.chapterCount || 0,
                readedChapters: await prisma.chapters.count({
                    where: {
                        AND: [
                            { tome: { lte: mangaData.lastChapter.tome } },
                            { chapter: { lte: mangaData.lastChapter.chapter } },
                            { mangaId: mangaData.manga.id },
                        ],
                    },
                }),
                chapterId: mangaData.lastChapter.id,
            };
            if (mangaData.manga.title) {
                manga.title = mangaData.manga.title[lang]
                    ? mangaData.manga.title[lang]
                    : mangaData.manga.title.ru;
            }

            return manga;
        }),
    );
}
