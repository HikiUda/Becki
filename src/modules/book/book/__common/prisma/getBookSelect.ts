import { Prisma } from '@prisma/client';
import { Lang } from 'src/shared/dto/langQuery.dto';

export const getBookSelect = (lang: Lang) => {
    return {
        id: true,
        urlId: true,
        genres: true,
        tags: true,
        status: true,
        type: true,
        releaseDate: true,
        ageRating: true,
        description: { select: { ru: true, en: lang === 'en' } },
        title: { select: { ru: true, en: true, origin: true, otherTitles: true } },
        statistic: { select: { rateCount: true, rate: true } },
        covers: { where: { main: true }, select: { cover: true } },
        banner: true,
        owner: { select: { id: true, name: true, avatar: true } },
    } satisfies Prisma.BookSelect;
};
