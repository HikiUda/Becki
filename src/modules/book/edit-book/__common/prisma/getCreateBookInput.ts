import { Prisma } from '@prisma/client';
import { MutateBookDto } from '../dto/mutateBook.dto';

export const createBookInput = (dto: MutateBookDto) => {
    return {
        title: {
            create: {
                main: dto.title?.main || 'Название на русском обязательно',
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
