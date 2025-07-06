import { PrismaClient } from '@prisma/client';
import { MangaChapterId, MangaId, RanobeChapterId, RanobeId } from '../model/bookId';
import { BadRequestException } from '@nestjs/common';

// TODO Add varify throw casl to bookmarks-setBookmark, continue-read-setContinueReadBook, edit-chapter, chapters - getChapter, userChapterActions
export async function verifyMangaChapterRelation(
    prisma: PrismaClient,
    bookId: MangaId,
    chapterId: MangaChapterId | null,
) {
    if (chapterId) {
        const isBooksChapter = await prisma.mangaChapters.findFirst({
            where: { bookId, id: chapterId },
        });
        if (!isBooksChapter)
            throw new BadRequestException(
                `Глава с id=${chapterId} не пренадлежин манге с id=${bookId}`,
            );
    }
}
export async function verifyRanobeChapterRelation(
    prisma: PrismaClient,
    bookId: RanobeId,
    chapterId: RanobeChapterId | null,
) {
    if (chapterId) {
        const isBooksChapter = await prisma.ranobeChapters.findFirst({
            where: { bookId, id: chapterId },
        });
        if (!isBooksChapter)
            throw new BadRequestException(
                `Глава с id=${chapterId} не пренадлежин ранобе с id=${bookId}`,
            );
    }
}
