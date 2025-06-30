import { RanobeType } from '@prisma/client';
import { WhereInputType } from './whereInput.type';

export const getRanobeType = (type: RanobeType[]) => {
    return {
        type: { in: type },
    } satisfies WhereInputType;
};
