import { Prisma } from '@prisma/client';
import { MutateBookDto } from '../dto/mutateBook.dto';

export const createBookInput = (dto: MutateBookDto) => {
    return {
        title: {
            create: {
                ru: dto.title?.ru || 'Название на русском обязательно',
            },
        },
        description: {
            create: {
                ru: dto.description?.ru || '',
            },
        },
        statistic: { create: {} },
        related: { create: {} },

        // TODO add owner from auth
        owner: {
            connect: { id: 1 },
        },
    } satisfies Prisma.BookCreateInput;
};
