import { Prisma } from '@prisma/client';
import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { prisma } from 'src/shared/prisma/prisma';
import { ChapterDto } from '../../dto/chapter.dto';
import { ChapterPagesScheme } from 'src/modules/manga/editChapter';

//TODO not get chapter with private=true
export const getChapter = async (chapterId: number, userId?: number) => {
    return await prisma.chapters.findUnique({
        where: { id: chapterId },
        select: {
            id: true,
            title: true,
            tome: true,
            chapter: true,
            manga: { select: { title: true } },
            _count: { select: { usersLike: true } },
            usersLike: { where: { userId } },
            usersView: { where: { userId } },
            pages: true,
            mangaId: true,
        },
    });
};
export type GetChapterReturnType = Prisma.PromiseReturnType<typeof getChapter>;

export function toChapterDto(
    chapter: Exclude<GetChapterReturnType, null>,
    prevChapter: number | null,
    nextChapter: number | null,
    lang: LangType,
): ChapterDto {
    return {
        id: chapter.id,
        title: chapter.title && (chapter.title[lang] || chapter.title.ru),
        tome: chapter.tome,
        chapter: chapter.chapter,
        mangaTitle: chapter.manga.title?.[lang] || chapter.manga.title?.ru || '',
        likeCount: chapter._count.usersLike,
        pages: ChapterPagesScheme.parse(chapter.pages?.[lang] || chapter.pages?.ru),
        prevChapterId: prevChapter,
        nextChapterId: nextChapter,
        isUserLiked: !!chapter?.usersLike?.[0]?.isLiked,
        isUserViewed: !!chapter?.usersView?.[0]?.isViewed,
    };
}
