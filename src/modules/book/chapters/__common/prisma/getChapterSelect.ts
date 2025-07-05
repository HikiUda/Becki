import { Prisma } from '@prisma/client';
import { BookChapterId } from 'src/modules/book/_common/model/bookId';
import { getUserLikeBookChaptersId } from 'src/modules/book/_common/model/get-db-table-id/getUserLikeBookChaptersId';
import { getUserViewBookChaptersId } from 'src/modules/book/_common/model/get-db-table-id/getUserViewBookChaptersId';
import { UserId } from 'src/modules/user/auth';
import { Lang } from 'src/shared/dto/langQuery.dto';

export const getChapterSelect = (chapterId: BookChapterId, lang: Lang, userId?: UserId) => {
    return {
        id: true,
        title: { select: { ru: true, en: lang === 'en' } },
        tome: true,
        chapter: true,
        book: {
            select: {
                title: { select: { ru: true, en: lang === 'en' } },
                statistic: { select: { likes: true } },
            },
        },
        usersLike: userId && {
            where: { id: getUserLikeBookChaptersId(userId, chapterId) },
            select: { id: false },
        },
        usersView: userId && {
            where: { id: getUserViewBookChaptersId(userId, chapterId) },
            select: { id: false },
        },
    } satisfies Prisma.BookChaptersSelect;
};
