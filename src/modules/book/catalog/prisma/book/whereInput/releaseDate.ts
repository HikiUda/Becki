import { WhereInputType } from './whereInput.type';

export const getReleaseDateFrom = (from: Date) => {
    return {
        releaseDate: { gte: from },
    } satisfies WhereInputType;
};

export const getReleaseDateTo = (to: Date) => {
    return {
        releaseDate: { lte: to },
    } satisfies WhereInputType;
};
