import { Prisma, PrismaClient } from '@prisma/client';
import { EditedBookChapter } from '../dto/editedBookChapter.dto';

const getEditedBookChapter = async (prisma: PrismaClient) => {
    return await prisma.bookChapters.findUnique({
        where: { id: 0 },
    });
};
type GetEditedBookChapter = Prisma.PromiseReturnType<typeof getEditedBookChapter>;

export function toEditedBookChapterDto(
    data: Exclude<GetEditedBookChapter, null>,
): EditedBookChapter {
    return {
        id: data.id,
        title: data.title,
        tome: data.tome,
        chpater: data.chapter,
        publish: data.publish,
        bookId: data.bookId,
    };
}
