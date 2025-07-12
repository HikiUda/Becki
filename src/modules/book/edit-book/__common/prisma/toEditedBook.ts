import { EditedBook } from '../dto/editedBook.dto';
import { AgeRating } from 'src/modules/book/_common/model/ageRating';
import { GetEditedBookCategories } from './getEditedBookCategories';
import { Prisma, PrismaClient } from '@prisma/client';
import { getEditedBookIncludeInput } from './getEditedBookIncludeInput';

const getEditedBook = async (prisma: PrismaClient) =>
    await prisma.book.findUnique({
        where: { id: 0 },
        include: getEditedBookIncludeInput(),
    });
type GetEditedBook = Exclude<Prisma.PromiseReturnType<typeof getEditedBook>, null>;

export function toEditedBook<T extends string>(
    book: GetEditedBook & { type: T },
    categories: GetEditedBookCategories,
): EditedBook & { type: T } {
    return {
        id: book.id,
        urlId: book.urlId,
        title: {
            main: book.title?.main || '',
            en: book.title?.en || null,
            origin: book.title?.origin || null,
        },
        otherTitles: book.title?.otherTitles ? book.title.otherTitles.split('/n') : [],
        description: book.description,
        releaseDate: book.releaseDate,
        status: book.status,
        type: book.type,
        genres: categories.genres,
        tags: categories.tags,
        banner: book.banner,
        ageRating: book.ageRating as AgeRating,
        lang: book.lang,
        authors: book.authors,
        artists: book.artists,
        publishers: book.publishers,
    };
}
