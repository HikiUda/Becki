import { MutateManyToManyInMangaType } from '../../dto/mutateManga.dto';

export const FilterJanresAndTags = (
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
