import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { MutateChapterDto } from '../../dto/mutateChapter.dto';
import { ChapterPagesDto } from '../../../editChapterPages/dto/chapterPages.scheme';

export const createChapter = async (mangaId: number, chapter: MutateChapterDto) => {
    const pages: ChapterPagesDto = { pageCount: 0, pages: [], containerMaxWidth: 700 };
    return await prisma.chapters.create({
        data: {
            title: { create: { ru: chapter?.title?.ru || null, en: chapter?.title?.en || null } },
            tome: chapter.tome,
            chapter: chapter.chapter || 1,
            mangaId: mangaId,
            pages: { create: { ru: { ...pages } } },
        },
    });
};

export type CreateChapterReturnType = Prisma.PromiseReturnType<typeof createChapter>;
