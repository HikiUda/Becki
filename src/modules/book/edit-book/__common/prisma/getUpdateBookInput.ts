import { Prisma } from '@prisma/client';
import { MutateBookDto } from '../dto/mutateBook.dto';

export const getUpdateBookInput = <T extends string>(dto: MutateBookDto & { type?: T }) => {
    return {
        urlId: dto.urlId,
        title: {
            update: {
                ru: dto.title?.ru,
                en: dto.title?.en,
                origin: dto.title?.origin,
                otherTitles: dto.otherTitles?.join('/n'),
            },
        },
        description: {
            update: {
                ru: dto.description?.ru,
                en: dto.description?.en,
            },
        },
        releaseDate: dto.releaseDate,
        status: dto.status,
        type: dto.type,
        ageRating: dto.ageRating,
        banner: dto.banner,
        genres: dto.genres,
        tags: dto.tags,
    } satisfies Prisma.BookUpdateInput;
};
