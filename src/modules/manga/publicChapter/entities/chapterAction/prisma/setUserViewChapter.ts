import { prisma } from 'src/shared/prisma/prisma';
import { getActionUserChapterId } from '../helpers/getActionUserChapterId';

export const setUserViewChapter = async (chapterId: number, userId: number) => {
    const id = getActionUserChapterId(chapterId, userId);
    const isAlreadyViewed = await prisma.userViewChapter.findUnique({ where: { id } });
    let data = null;
    if (!isAlreadyViewed) {
        data = await prisma.userViewChapter.create({
            data: { id, chapterId, userId },
            select: { chapter: true },
        });
    } else {
        data = await prisma.userViewChapter.update({
            where: { id },
            data: { isViewed: !isAlreadyViewed.isViewed },
            select: { chapter: true },
        });
    }
    if (!isAlreadyViewed?.isViewed && data) {
        const progressReadId = getActionUserChapterId(data.chapter.mangaId, userId);
        const lastChapter = await prisma.chapters.findFirst({
            where: { mangaId: data.chapter.mangaId },
            orderBy: [{ tome: 'desc' }, { chapter: 'desc' }],
        });
        if (!lastChapter) return;
        const show =
            lastChapter.tome === data.chapter.tome && lastChapter.chapter === data.chapter.chapter
                ? false
                : true;
        await prisma.progressReadManga.upsert({
            where: { id: progressReadId },
            create: {
                id: progressReadId,
                userId,
                lastChapterId: chapterId,
                mangaId: data.chapter.mangaId,
                show,
            },
            update: {
                show,
                lastChapterId: chapterId,
            },
        });
    }
};
