import { WhereInputType } from './whereInput.type';

export const getPeople = (name: string) => {
    return {
        OR: [
            { authors: { some: { name } } },
            { artists: { some: { name } } },
            { publishers: { some: { name } } },
        ],
    } satisfies WhereInputType;
};
