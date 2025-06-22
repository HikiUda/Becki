import { WhereInputType } from './whereInput.type';

export const getAgeRating = (ageRating: number[]) => {
    return {
        ageRating: { in: ageRating },
    } satisfies WhereInputType;
};
