import { prisma } from 'src/common/helpers/prisma';
import { Prisma } from '@prisma/client';
import { LangType } from 'src/common/dto/query/langQuery.dto';
import { EditedChapterListItemDto, EditedChapterListQuery } from '../dto/editedChapterList';

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

export const getEditedChapterList = async (mangaId: number, query: EditedChapterListQuery) => {
    const { search, limit, page, order } = query;
    const skip = limit * (page - 1);

    const data = await prisma.chapters.findMany({
        where: {
            AND: [{ mangaId }, { OR: getChapterListORInput(search) }],
        },
        orderBy: [{ tome: order }, { chapter: order }],
        skip,
        take: limit,
        include: {
            title: true,
        },
    });
    const chapterCount = await prisma.mangaStatistic.findUnique({
        where: { mangaId },
        select: { chapterCount: true },
    });
    return { data, chapterCount: chapterCount?.chapterCount || 0 };
};
export type GetEditedChapterListReturnType = Prisma.PromiseReturnType<typeof getEditedChapterList>;

export function toEditedChapterListItemDto(
    data: GetEditedChapterListReturnType['data'],
    lang: LangType,
): EditedChapterListItemDto[] {
    return data.map((chapter) => ({
        id: chapter.id,
        tome: chapter.tome,
        chapter: chapter.chapter,
        title: chapter.title && (chapter.title[lang] || chapter.title.ru),
        createdAt: chapter.createdAt,
        private: chapter.private,
    }));
}
