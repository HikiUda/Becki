import { WhereInputType } from './whereInput.type';

export const getSearch = (search: string) => {
    return {
        title: {
            OR: [
                { main: { contains: search, mode: 'insensitive' } },
                { en: { contains: search, mode: 'insensitive' } },
                { origin: { contains: search, mode: 'insensitive' } },
                { otherTitles: { contains: search, mode: 'insensitive' } },
            ],
        },
    } satisfies WhereInputType;
};
