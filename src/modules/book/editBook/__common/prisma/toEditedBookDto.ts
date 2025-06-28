import { EditedBookDto } from '../dto/editedBook.dto';
import { GetEditedBookReturnType } from './getEditedBook';
import { AgeRatingEnum } from 'src/modules/book/_common/types/ageRating';
import { GetEditedBookCategories } from './getEditedBookCategories';

export function toEditedBookDto<T extends string>(
    data: Exclude<GetEditedBookReturnType, null> & { type: T },
    categories: GetEditedBookCategories,
): EditedBookDto & { type: T } {
    const manga: EditedBookDto & { type: T } = {
        id: data.id,
        urlId: data.urlId,
        title: {
            ru: data.title?.ru || '',
            en: data.title?.en || null,
            origin: data.title?.origin || null,
        },
        otherTitles: data.title?.otherTitles?.split('/n') || [],
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
