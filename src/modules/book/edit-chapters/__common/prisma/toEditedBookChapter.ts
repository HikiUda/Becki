import { Prisma, PrismaClient } from '@prisma/client';
import { EditedBookChapterDto } from '../dto/editedBookChapter.dto';

const getEditedBookChapter = async (prisma: PrismaClient) => {
    return await prisma.bookChapters.findUnique({
        where: { id: 0 },
        include: { title: true },
    });
};
type GetEditedBookChapter = Prisma.PromiseReturnType<typeof getEditedBookChapter>;

export function toEditedBookChapterDto(
    data: Exclude<GetEditedBookChapter, null>,
): EditedBookChapterDto {
    return {
        id: data.id,
        title: {
            ru: data.title?.ru || null,
            en: data.title?.en || null,
        },
        tome: data.tome,
        chpater: data.chapter,
        private: data.private,
        bookId: data.bookId,
    };
}
