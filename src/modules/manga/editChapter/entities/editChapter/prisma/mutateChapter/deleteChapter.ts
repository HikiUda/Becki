import { prisma } from 'src/shared/prisma/prisma';

export const deleteChapter = async (chapterId: number) => {
    await prisma.chapterPages.delete({
        where: { id: chapterId },
    });
    await prisma.chapterTitle.delete({
        where: { id: chapterId },
    });
    await prisma.chapters.delete({
        where: { id: chapterId },
    });
};
