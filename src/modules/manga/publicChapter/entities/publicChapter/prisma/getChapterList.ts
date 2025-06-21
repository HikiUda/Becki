import { prisma } from 'src/shared/prisma/prisma';
import { ChapterListQuery } from '../dto/chapterList/chapterListQuery';
import { Prisma } from '@prisma/client';
import { ChapterListItemDto } from '../dto/chapterList/chapterListItem.dto';
import { LangType } from 'src/shared/dto/query/langQuery.dto';

const getChapterListORInput = (search: string): Prisma.ChaptersWhereInput[] => {
    const searchNumber = isNaN(Number(search)) ? undefined : Number(search);
    const OR: Prisma.ChaptersWhereInput[] = [];

    if (search) {
        OR.push(
            { title: { ru: { contains: search, mode: 'insensitive' } } },
            { title: { en: { contains: search, mode: 'insensitive' } } },
        );
    }
    if (searchNumber) {
        OR.push({ chapter: searchNumber }, { tome: searchNumber });
    }
    return OR;
};

export const getChapterList = async (mangaId: number, query: ChapterListQuery, userId?: number) => {
    const { search, limit, page, order } = query;
    const skip = limit * (page - 1);

    const data = await prisma.chapters.findMany({
        where: {
            AND: [{ mangaId }, { OR: getChapterListORInput(search) }, { private: false }],
        },
        orderBy: [{ tome: order }, { chapter: order }],
        skip,
        take: limit,
        include: {
            title: true,
            usersView: !!userId && { where: { userId } },
        },
    });
    const chapterCount = await prisma.chapters.count({
        where: {
            AND: [{ mangaId }, { OR: getChapterListORInput(search) }, { private: false }],
        },
    });
    return { data, chapterCount };
};
export type GetChapterListReturnType = Prisma.PromiseReturnType<typeof getChapterList>;

export function toChapterListItemDto(
    data: GetChapterListReturnType['data'],
    lang: LangType,
): ChapterListItemDto[] {
    return data.map((chapter) => ({
        id: chapter.id,
        tome: chapter.tome,
        chapter: chapter.chapter,
        title: chapter.title && (chapter.title[lang] || chapter.title.ru),
        createdAt: chapter.createdAt,
        isUserViewed: !!chapter?.usersView?.[0]?.isViewed,
    }));
}
