import { prisma } from 'src/shared/prisma/prisma';
import { getActionUserChapterId } from '../helpers/getActionUserChapterId';

export const setProgressReadManga = async (mangaId: number, chapterId: number, userId: number) => {
    const progressReadId = getActionUserChapterId(mangaId, userId);
    const currentChapter = await prisma.chapters.findUnique({ where: { id: chapterId } });
    const lastChapter = await prisma.chapters.findFirst({
        where: { mangaId: mangaId },
        orderBy: [{ tome: 'desc' }, { chapter: 'desc' }],
    });
    const progressRead = await prisma.progressReadManga.findUnique({
        where: { id: progressReadId },
        select: { lastChapter: true },
    });
    if (!lastChapter || !currentChapter) return;
    if (
        progressRead &&
        progressRead.lastChapter.tome >= currentChapter.tome &&
        progressRead.lastChapter.chapter >= currentChapter.chapter
    )
        return;

    const show =
        lastChapter.tome === currentChapter.tome && lastChapter.chapter === currentChapter.chapter
            ? false
            : true;
    await prisma.progressReadManga.upsert({
        where: { id: progressReadId },
        create: {
            id: progressReadId,
            userId,
            lastChapterId: chapterId,
            mangaId: mangaId,
            show,
        },
        update: {
            show,
            lastChapterId: chapterId,
        },
    });
};
