import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { MutateChapterDto } from '../../dto/mutateChapter.dto';

export const updateChapter = async (chapterId: number, chapter: MutateChapterDto) => {
    const data: Prisma.ChaptersUpdateInput = {};
    if (chapter.title) {
        data.title = {};
        data.title.update = {};
        if (chapter.title.ru) data.title.update.ru = chapter.title.ru;
        if (chapter.title.en) data.title.update.en = chapter.title.en;
    }
    if (chapter.tome) data.tome = chapter.tome;
    if (chapter.chapter) data.chapter = chapter.chapter;
    if (chapter.private) data.private = chapter.private;

    return await prisma.chapters.update({
        where: { id: chapterId },
        data,
    });
};

export type UpdateChapterReturnType = Prisma.PromiseReturnType<typeof updateChapter>;
