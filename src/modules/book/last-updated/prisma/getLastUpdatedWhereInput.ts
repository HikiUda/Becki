import { BookLang, Prisma } from '@prisma/client';
import { LastUpdatedScope } from '../dto/lastUpdatedQuery.dto';
import { UserId } from 'src/modules/user/auth';

type Props = {
    scope: LastUpdatedScope;
    bookLang?: BookLang;
    userId?: UserId;
};

export const getLastUpdatedWhereInput = (props: Props) => {
    const { scope, bookLang, userId } = props;
    const whereBookLang = bookLang ? ({ lang: bookLang } satisfies Prisma.BookWhereInput) : {};

    if (scope === 'popular')
        return {
            book: { ...whereBookLang, statistic: { rate: { gte: 9 } } },
        } satisfies Prisma.BookChaptersWhereInput;

    if (scope === 'my' && userId)
        return {
            book: {
                ...whereBookLang,
                bookmarks: { some: { userId, bookmark: { in: ['Reading', 'Readed'] } } },
            },
        } satisfies Prisma.BookChaptersWhereInput;

    return { book: whereBookLang } satisfies Prisma.BookChaptersWhereInput;
};
