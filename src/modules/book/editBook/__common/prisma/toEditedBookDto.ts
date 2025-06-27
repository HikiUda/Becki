import { EditedBookDto } from '../dto/editedBook.dto';
import { GetEditedBookReturnType } from './getEditedBook';
import { AgeRatingEnum } from 'src/modules/book/_common/types/ageRating';
import { GetEditedBookCategories } from './getEditedBookCategories';

const getOtherTitles = (otherTitles: string | undefined) => {
    if (!otherTitles) return [];
    return otherTitles.split('/n');
};

export function toEditedMangaDto<T extends string>(
    data: Omit<Exclude<GetEditedBookReturnType, null>, 'type'> & { type: T },
    categories: GetEditedBookCategories,
): Omit<EditedBookDto, 'type'> & { type: T } {
    const manga: Omit<EditedBookDto, 'type'> & { type: T } = {
        id: data.id,
        urlId: data.urlId,
        title: {
            ru: data.title?.ru || '',
            en: data.title?.en || null,
            origin: data.title?.origin || null,
        },
        otherTitles: getOtherTitles(data.title?.otherTitles),
        description: { ru: data.title?.ru || '', en: data.title?.en || null },
        releaseDate: data.releaseDate,
        status: data.status,
        type: data.type,
        genres: categories.genres,
        tags: categories.tags,
        banner: data.banner,
        ageRating: AgeRatingEnum.parse(data.ageRating),
    };

    return manga;
}
