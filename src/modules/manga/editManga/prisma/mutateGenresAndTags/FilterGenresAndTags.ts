import { MutateManyToManyInMangaType } from '../../dto/mutateManga.dto';

export const FilterGenresAndTags = (
    current: number[],
    mutate: MutateManyToManyInMangaType,
): number[] => {
    const newArray = new Set(
        current
            .concat(mutate.add || [])
            .filter((item) => !mutate.delete || !mutate.delete.includes(item)),
    );
    return [...newArray];
};
