import { Prisma, PrismaClient } from '@prisma/client';
import { EditedBookChapterList, EditedBookChapterListQuery } from '../dto/editedBookChapterList';
import { getPagination } from 'src/shared/dto/pagination.dto';

const getEditedBookChapterList = async (prisma: PrismaClient) => {
    const chapters = await prisma.bookChapters.findMany({
        include: {
            title: true,
        },
    });

    const count: number = 0;
    return [chapters, count] as const;
};

type GetEditedBookChapterList = Prisma.PromiseReturnType<typeof getEditedBookChapterList>;

export function toEditedBookChapterList(
    data: GetEditedBookChapterList,
    query: EditedBookChapterListQuery,
): EditedBookChapterList {
    const { lang, limit, page } = query;
    const chapters = data[0].map((chapter) => ({
        id: chapter.id,
        tome: chapter.tome,
        chapter: chapter.chapter,
        title: chapter.title && (chapter.title[lang] || chapter.title.ru),
        createdAt: chapter.createdAt,
        publish: chapter.publish,
    }));

    return { data: chapters, ...getPagination(data[1], page, limit) };
}
