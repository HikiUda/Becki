import { BookStatus } from '@prisma/client';
import { WhereInputType } from './whereInput.type';

export const getStatus = (status: BookStatus[]) => {
    return {
        status: { in: status },
    } satisfies WhereInputType;
};
