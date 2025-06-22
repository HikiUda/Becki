import { WhereInputType } from './whereInput.type';

export const getRateCountFrom = (from: number) => {
    return {
        statistic: { rateCount: { gte: from } },
    } satisfies WhereInputType;
};

export const getRateCountTo = (to: number) => {
    return {
        statistic: { rateCount: { lte: to } },
    } satisfies WhereInputType;
};
