import { WhereInputType } from './whereInput.type';

export const getChapterCountFrom = (from: number) => {
    return {
        statistic: { chapterCount: { gte: from } },
    } satisfies WhereInputType;
};

export const getChapterCountTo = (to: number) => {
    return {
        statistic: { chapterCount: { lte: to } },
    } satisfies WhereInputType;
};
