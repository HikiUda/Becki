import { Prisma } from '@prisma/client';

export const getBookSelect = () => {
    return {
        id: true,
        urlId: true,
        genres: true,
        tags: true,
        status: true,
        type: true,
        releaseDate: true,
        ageRating: true,
        description: true,
        lang: true,
        title: { select: { main: true, en: true, origin: true, otherTitles: true } },
        statistic: { select: { rateCount: true, rate: true } },
        covers: { where: { main: true }, select: { cover: true } },
        banner: true,
        owner: { select: { id: true, name: true, avatar: true } },
        authors: { select: { id: true, name: true, avatar: true } },
        artists: { select: { id: true, name: true, avatar: true } },
        publishers: { select: { id: true, name: true, avatar: true } },
    } satisfies Prisma.BookSelect;
};
