import { WhereInputType } from './whereInput.type';

export const getSearch = (search: string) => {
    return {
        OR: [
            { otherTitles: { some: { title: { contains: search, mode: 'insensitive' } } } },
            {
                title: {
                    OR: [
                        { ru: { contains: search, mode: 'insensitive' } },
                        { en: { contains: search, mode: 'insensitive' } },
                        { origin: { contains: search, mode: 'insensitive' } },
                    ],
                },
            },
        ],
    } satisfies WhereInputType;
};
