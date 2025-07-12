import { GetRelatedBook } from './getRelatedBooks';
import { RelatedBookDto } from '../dto/relatedBook.dto';
import { BookRelated, getRelatedId } from '../bookRelated';
import { ParsedRelatedId } from '../bookRelated';

export function toRelatedBookDto(
    data: GetRelatedBook,
    bookRelated: BookRelated,
    bookType: ParsedRelatedId[0],
): RelatedBookDto[] {
    return data.map((book) => {
        return {
            id: book.id,
            urlId: book.urlId,
            title: book.title?.main || '',
            cover: book.covers[0]?.cover || '',
            type: book.type,
            status: book.status,
            relationship: bookRelated[bookType][book.id] || 'Other',
            relatedId: getRelatedId(bookType, book.id),
        };
    });
}
