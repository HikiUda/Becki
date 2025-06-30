import { EditedBook } from '../dto/editedBook.dto';
import { GetEditedBookReturnType } from './getEditedBook';
import { AgeRatingEnum } from 'src/modules/book/_common/types/ageRating';
import { GetEditedBookCategories } from './getEditedBookCategories';

export function toEditedBook<T extends string>(
    book: Exclude<GetEditedBookReturnType, null> & { type: T },
    categories: GetEditedBookCategories,
): EditedBook & { type: T } {
    return {
        id: book.id,
        urlId: book.urlId,
        title: {
            ru: book.title?.ru || '',
            en: book.title?.en || null,
            origin: book.title?.origin || null,
        },
        otherTitles: book.title?.otherTitles ? book.title.otherTitles.split('/n') : [],
        description: { ru: book.description?.ru || '', en: book.description?.en || null },
        releaseDate: book.releaseDate,
        status: book.status,
        type: book.type,
        genres: categories.genres,
        tags: categories.tags,
        banner: book.banner,
        ageRating: AgeRatingEnum.parse(book.ageRating),
    };
}
