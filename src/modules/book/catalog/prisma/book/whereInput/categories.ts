import { WhereInputType } from './whereInput.type';

export const getGenres = (genres: number[]) => {
    return {
        genres: {
            hasEvery: genres,
        },
    } satisfies WhereInputType;
};
export const getNotGenres = (notGenres: number[]) => {
    return {
        NOT: {
            genres: {
                hasSome: notGenres,
            },
        },
    } satisfies WhereInputType;
};

export const getTags = (tags: number[]) => {
    return {
        tags: {
            hasEvery: tags,
        },
    } satisfies WhereInputType;
};
export const getNotTags = (notTags: number[]) => {
    return {
        NOT: {
            tags: {
                hasSome: notTags,
            },
        },
    } satisfies WhereInputType;
};
