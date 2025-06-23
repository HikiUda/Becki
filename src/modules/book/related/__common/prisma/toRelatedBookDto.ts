import { LangType } from 'src/shared/dto/query/langQuery.dto';
import { GetRelatedBooksReturnType } from './getRelatedBooks';
import { RelatedBookDto } from '../dto/relatedBook.dto';
import { BookRelated } from '../bookRelated';

export function toRelatedBookDto(
    data: GetRelatedBooksReturnType[0],
    bookRelated: BookRelated,
    lang: LangType,
): RelatedBookDto[] {
    return data.map((mangaData) => {
        const manga: RelatedBookDto = {
            id: mangaData.id,
            urlId: mangaData.urlId,
            title: mangaData.title?.[lang] || mangaData.title?.ru || '',
            cover: mangaData.covers[0]?.cover || '',
            type: mangaData.type,
            status: mangaData.status,
            relationship: bookRelated.manga[mangaData.id] || 'Other',
        };

        return manga;
    });
}
