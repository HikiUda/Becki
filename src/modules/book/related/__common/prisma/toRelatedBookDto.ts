import { Lang } from 'src/shared/dto/langQuery.dto';
import { GetRelatedBook } from './getRelatedBooks';
import { RelatedBookDto } from '../dto/relatedBook.dto';
import { BookRelated, getRelatedId } from '../bookRelated';
import { ParsedRelatedId } from '../bookRelated';

export function toRelatedBookDto(
    data: GetRelatedBook,
    bookRelated: BookRelated,
    bookType: ParsedRelatedId[0],
    lang: Lang,
): RelatedBookDto[] {
    return data.map((book) => {
        return {
            id: book.id,
            urlId: book.urlId,
            title: book.title?.[lang] || book.title?.ru || '',
            cover: book.covers[0]?.cover || '',
            type: book.type,
            status: book.status,
            relationship: bookRelated[bookType][book.id] || 'Other',
            relatedId: getRelatedId(bookType, book.id),
        };
    });
}
