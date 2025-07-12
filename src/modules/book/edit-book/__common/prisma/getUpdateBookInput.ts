import { Prisma } from '@prisma/client';
import { MutateBookDto } from '../dto/mutateBook.dto';

export const getUpdateBookInput = <T extends string>(dto: MutateBookDto & { type?: T }) => {
    return {
        urlId: dto.urlId,
        title: {
            update: {
                main: dto.title?.main,
                en: dto.title?.en,
                origin: dto.title?.origin,
                otherTitles: dto.otherTitles?.join('/n'),
            },
        },
        description: dto.description,
        releaseDate: dto.releaseDate,
        status: dto.status,
        type: dto.type,
        ageRating: dto.ageRating,
        lang: dto.lang,
        banner: dto.banner,
        genres: dto.genres,
        tags: dto.tags,
        authors: dto.authors && {
            set: dto.authors.map((id) => ({ id })),
        },
        artists: dto.artists && {
            set: dto.artists.map((id) => ({ id })),
        },
        publishers: dto.publishers && {
            set: dto.publishers.map((id) => ({ id })),
        },
    } satisfies Prisma.BookUpdateInput;
};
