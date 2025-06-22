import { WhereInputType } from './whereInput.type';

export const getRateFrom = (from: number) => {
    return {
        statistic: { rate: { gte: from } },
    } satisfies WhereInputType;
};

export const getRateTo = (to: number) => {
    return {
        statistic: { rate: { lte: to } },
    } satisfies WhereInputType;
};
