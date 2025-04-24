import { MutateMangaCategoriesType } from '../../dto/mutateManga/mutateManga.dto';

export const FilterGenresAndTags = (
    current: number[],
    mutate: MutateMangaCategoriesType,
): number[] => {
    const newArray = new Set(
        current
            .concat(mutate.add || [])
            .filter((item) => !mutate.delete || !mutate.delete.includes(item)),
    );
    return [...newArray];
};
