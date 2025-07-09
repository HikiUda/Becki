import { WhereInputType } from './whereInput.type';

export const getPeople = (name: string) => {
    return {
        OR: [
            { authors: { some: { people: { name } } } },
            { artists: { some: { people: { name } } } },
            { publishers: { some: { people: { name } } } },
        ],
    } satisfies WhereInputType;
};
