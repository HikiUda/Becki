import { MangaType } from '@prisma/client';
import { WhereInputType } from './whereInput.type';

export const getMangaType = (type: MangaType[]) => {
    return {
        type: { in: type },
    } satisfies WhereInputType;
};
