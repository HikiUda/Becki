import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { EditedChpaterDto } from '../dto/editedChapter.dto';

export const getEditedChapter = async (chapterId: number) => {
    return await prisma.chapters.findUnique({ where: { id: chapterId }, include: { title: true } });
};

export type GetEditedChapterReturnType = Prisma.PromiseReturnType<typeof getEditedChapter>;

export function toEditedChapterDto(
    data: Exclude<GetEditedChapterReturnType, null>,
): EditedChpaterDto {
    return {
        id: data.id,
        title: {
            ru: data.title?.ru || null,
            en: data.title?.en || null,
        },
        tome: data.tome,
        chpater: data.chapter,
        private: data.private,
        mangaId: data.mangaId,
    };
}
